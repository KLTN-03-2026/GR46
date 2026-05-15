import { ToolDefinition, OpenAiTool, ChatbotUserContext } from './tool.types';
import { DataSource } from 'typeorm';

const TOOLS: ToolDefinition[] = [
  {
    name: 'tim_kiem_mon_an',
    description:
      'Tim kiem mon an theo tu khoa, khoang gia. Tra ve danh sach mon kem ten cua hang, gia, link.',
    vai_tro_cho_phep: ['guest', 'nguoi_dung', 'chu_cua_hang', 'admin'],
    parameters: {
      type: 'object',
      properties: {
        tu_khoa: { type: 'string', description: 'Tu khoa ten mon, vi du: "bun bo", "tra sua"' },
        gia_min: { type: 'number', description: 'Gia toi thieu (VND)' },
        gia_max: { type: 'number', description: 'Gia toi da (VND)' },
        gioi_han: { type: 'integer', description: 'So mon toi da, mac dinh 5', default: 5 },
      },
      required: ['tu_khoa'],
    },
    handler: async (args, _ctx, ds) => {
      const tuKhoa = String(args.tu_khoa ?? '').trim();
      const gioiHan = Math.min(Number(args.gioi_han ?? 5) || 5, 10);
      const giaMin = args.gia_min != null ? Number(args.gia_min) : null;
      const giaMax = args.gia_max != null ? Number(args.gia_max) : null;
      const params: any[] = [`%${tuKhoa}%`];
      let sql = `
        SELECT m.id, m.ten_mon, m.gia_ban, m.diem_danh_gia, m.so_luong_da_ban,
               c.id AS id_cua_hang, c.ten_cua_hang, c.khu_vuc, c.slug
        FROM mon_an m
        JOIN cua_hang c ON c.id = m.id_cua_hang
        WHERE m.trang_thai_ban = 'dang_ban'
          AND c.trang_thai_hoat_dong = 'da_duyet'
          AND m.ten_mon LIKE ?
      `;
      if (giaMin != null) {
        sql += ' AND m.gia_ban >= ?';
        params.push(giaMin);
      }
      if (giaMax != null) {
        sql += ' AND m.gia_ban <= ?';
        params.push(giaMax);
      }
      sql += ' ORDER BY m.diem_danh_gia DESC, m.so_luong_da_ban DESC LIMIT ?';
      params.push(gioiHan);
      const rows = await ds.query(sql, params);
      return { tong: rows.length, ket_qua: rows };
    },
  },
  {
    name: 'tim_kiem_cua_hang',
    description:
      'Tim cua hang theo ten hoac khu vuc, sap xep theo diem danh gia / so don.',
    vai_tro_cho_phep: ['guest', 'nguoi_dung', 'chu_cua_hang', 'admin'],
    parameters: {
      type: 'object',
      properties: {
        tu_khoa: { type: 'string', description: 'Ten cua hang hoac mon ban' },
        khu_vuc: { type: 'string', description: 'Khu vuc / quan / thanh pho' },
        gioi_han: { type: 'integer', default: 5 },
      },
    },
    handler: async (args, _ctx, ds) => {
      const tuKhoa = args.tu_khoa ? `%${String(args.tu_khoa)}%` : '%';
      const khuVuc = args.khu_vuc ? `%${String(args.khu_vuc)}%` : '%';
      const gioiHan = Math.min(Number(args.gioi_han ?? 5) || 5, 10);
      const rows = await ds.query(
        `SELECT id, ten_cua_hang, slug, khu_vuc, dia_chi_kinh_doanh,
                diem_danh_gia, tong_don_hang, anh_dai_dien
           FROM cua_hang
          WHERE trang_thai_hoat_dong = 'da_duyet'
            AND ten_cua_hang LIKE ?
            AND (khu_vuc LIKE ? OR dia_chi_kinh_doanh LIKE ?)
          ORDER BY diem_danh_gia DESC, tong_don_hang DESC
          LIMIT ?`,
        [tuKhoa, khuVuc, khuVuc, gioiHan],
      );
      return { tong: rows.length, ket_qua: rows };
    },
  },
  {
    name: 'xem_don_hang_cua_toi',
    description:
      'Lay danh sach don hang cua nguoi dung hien tai (5 don gan nhat hoac theo trang thai).',
    vai_tro_cho_phep: ['nguoi_dung', 'chu_cua_hang', 'admin'],
    parameters: {
      type: 'object',
      properties: {
        trang_thai: {
          type: 'string',
          description:
            'Loc theo trang thai: cho_xac_nhan, dang_chuan_bi, dang_giao, da_giao, da_huy. Bo trong de lay tat ca.',
        },
        gioi_han: { type: 'integer', default: 5 },
      },
    },
    handler: async (args, ctx, ds) => {
      if (!ctx.id) return { loi: 'Ban can dang nhap de xem don hang cua minh' };
      const params: any[] = [ctx.id];
      let sql = `
        SELECT d.id, d.ma_don_hang, d.trang_thai_don_hang, d.tong_thanh_toan,
               d.thoi_gian_dat, d.thoi_gian_giao, d.thoi_gian_hoan_tat, d.ly_do_huy,
               c.ten_cua_hang
          FROM don_hang d
          JOIN cua_hang c ON c.id = d.id_cua_hang
         WHERE d.id_nguoi_mua = ?`;
      if (args.trang_thai) {
        sql += ' AND d.trang_thai_don_hang = ?';
        params.push(args.trang_thai);
      }
      sql += ' ORDER BY d.thoi_gian_dat DESC LIMIT ?';
      params.push(Math.min(Number(args.gioi_han ?? 5) || 5, 10));
      const rows = await ds.query(sql, params);
      return { tong: rows.length, ket_qua: rows };
    },
  },
  {
    name: 'xem_voucher_dang_co',
    description: 'Liet ke cac chuong trinh khuyen mai dang dien ra (toan san hoac theo cua hang).',
    vai_tro_cho_phep: ['guest', 'nguoi_dung', 'chu_cua_hang', 'admin'],
    parameters: {
      type: 'object',
      properties: {
        id_cua_hang: { type: 'integer', description: 'Loc theo cua hang. Bo trong de xem khuyen mai toan san.' },
        gioi_han: { type: 'integer', default: 5 },
      },
    },
    handler: async (args, _ctx, ds) => {
      const params: any[] = [];
      let sql = `
        SELECT id, ten_khuyen_mai, ma_khuyen_mai, loai_khuyen_mai, gia_tri_khuyen_mai,
               gia_tri_toi_da, don_hang_toi_thieu, thoi_gian_bat_dau, thoi_gian_ket_thuc,
               id_cua_hang, mo_ta
          FROM khuyen_mai
         WHERE trang_thai = 'dang_dien_ra'
           AND thoi_gian_ket_thuc > NOW()`;
      if (args.id_cua_hang) {
        sql += ' AND id_cua_hang = ?';
        params.push(Number(args.id_cua_hang));
      }
      sql += ' ORDER BY thoi_gian_ket_thuc ASC LIMIT ?';
      params.push(Math.min(Number(args.gioi_han ?? 5) || 5, 10));
      const rows = await ds.query(sql, params);
      return { tong: rows.length, ket_qua: rows };
    },
  },
  {
    name: 'xem_doanh_thu_cua_hang',
    description:
      'Tom tat doanh thu cua hang cua chu cua hang dang dang nhap (hom nay, 7 ngay, 30 ngay).',
    vai_tro_cho_phep: ['chu_cua_hang', 'admin'],
    parameters: {
      type: 'object',
      properties: {
        khoang: {
          type: 'string',
          enum: ['hom_nay', '7_ngay', '30_ngay'],
          default: '7_ngay',
        },
      },
    },
    handler: async (args, ctx, ds) => {
      if (!ctx.id_cua_hang) return { loi: 'Tai khoan chua co cua hang' };
      const khoang = String(args.khoang ?? '7_ngay');
      const ngay = khoang === 'hom_nay' ? 1 : khoang === '30_ngay' ? 30 : 7;
      const rows = await ds.query(
        `SELECT COUNT(*) AS so_don,
                COALESCE(SUM(thu_nhap_cua_hang),0) AS tong_thu_nhap,
                COALESCE(SUM(tong_thanh_toan),0) AS tong_thanh_toan,
                SUM(CASE WHEN trang_thai_don_hang = 'da_huy' THEN 1 ELSE 0 END) AS so_don_huy
           FROM don_hang
          WHERE id_cua_hang = ?
            AND thoi_gian_dat >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
        [ctx.id_cua_hang, ngay],
      );
      return { khoang, ...rows[0] };
    },
  },
  {
    name: 'xem_danh_gia_tieu_cuc',
    description:
      'Lay danh sach 5 danh gia thap nhat cho cua hang cua chu cua hang dang dang nhap (de phan tich).',
    vai_tro_cho_phep: ['chu_cua_hang', 'admin'],
    parameters: { type: 'object', properties: {} },
    handler: async (_args, ctx, ds) => {
      if (!ctx.id_cua_hang) return { loi: 'Tai khoan chua co cua hang' };
      const rows = await ds.query(
        `SELECT dg.id, dg.so_sao, dg.noi_dung, dg.ngay_tao, n.ten_hien_thi
           FROM danh_gia dg
           JOIN don_hang d ON d.id = dg.id_don_hang
           JOIN nguoi_dung n ON n.id = dg.id_nguoi_dung
          WHERE d.id_cua_hang = ?
            AND dg.so_sao <= 3
          ORDER BY dg.ngay_tao DESC
          LIMIT 5`,
        [ctx.id_cua_hang],
      );
      return { tong: rows.length, ket_qua: rows };
    },
  },
];

export function getToolsForRole(vaiTro: ChatbotUserContext['vai_tro']): ToolDefinition[] {
  return TOOLS.filter((t) => t.vai_tro_cho_phep.includes(vaiTro));
}

export function toOpenAiTools(tools: ToolDefinition[]): OpenAiTool[] {
  return tools.map((t) => ({
    type: 'function' as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }));
}

export function findTool(name: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.name === name);
}

export async function executeTool(
  name: string,
  args: Record<string, unknown>,
  ctx: ChatbotUserContext,
  ds: DataSource,
): Promise<unknown> {
  const tool = findTool(name);
  if (!tool) return { loi: `Tool ${name} khong ton tai` };
  if (!tool.vai_tro_cho_phep.includes(ctx.vai_tro)) {
    return { loi: `Ban khong co quyen su dung tool nay` };
  }
  try {
    return await tool.handler(args, ctx, ds);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Loi khong xac dinh';
    return { loi: `Khong the thuc thi tool: ${message}` };
  }
}
