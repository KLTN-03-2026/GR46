import { MaXacThucEntity } from '../../Api/Auth/entities/ma-xac-thuc.entity';
import { PhienDangNhapEntity } from '../../Api/Auth/entities/phien-dang-nhap.entity';
import { BaiVietEntity } from '../../Api/Admin/entities/bai-viet.entity';
import { BinhLuanEntity } from '../../Api/Admin/entities/binh-luan.entity';
import { ThongBaoEntity } from '../../Api/Admin/entities/thong-bao.entity';
import { TuongTacEntity } from '../../Api/Admin/entities/tuong-tac.entity';
import { QuanHeNguoiDungEntity } from '../../Api/User/entities/quan-he-nguoi-dung.entity';
import { getUserId, type SeederContext } from './context';

function addMinutes(base: Date, minutes: number) {
  return new Date(base.getTime() + minutes * 60_000);
}

function pickRole(email: string): string {
  if (email === 'admin@dishnet.vn') return 'admin';
  if (email === 'store@dishnet.vn') return 'chu_cua_hang';
  if (email === 'creator@dishnet.vn') return 'nha_sang_tao';
  if (email === 'multi@dishnet.vn') return 'nha_sang_tao';
  return 'nguoi_dung';
}

export async function seedAuthSocial(context: SeederContext) {
  const maRepo = context.dataSource.getRepository(MaXacThucEntity);
  const phienRepo = context.dataSource.getRepository(PhienDangNhapEntity);
  const quanHeRepo = context.dataSource.getRepository(QuanHeNguoiDungEntity);
  const tuongTacRepo = context.dataSource.getRepository(TuongTacEntity);
  const thongBaoRepo = context.dataSource.getRepository(ThongBaoEntity);
  const baiVietRepo = context.dataSource.getRepository(BaiVietEntity);
  const binhLuanRepo = context.dataSource.getRepository(BinhLuanEntity);
  const queryRunner = context.dataSource.createQueryRunner();
  const hasTuongTacTable = await queryRunner.hasTable('tuong_tac');
  await queryRunner.release();

  const emails = [
    'admin@dishnet.vn',
    'user@dishnet.vn',
    'creator@dishnet.vn',
    'store@dishnet.vn',
    'locked@dishnet.vn',
    'multi@dishnet.vn',
  ];

  const users = emails
    .map((email) => ({ email, id: getUserId(context, email) }))
    .filter((item): item is { email: string; id: number } => Number.isFinite(item.id));

  if (users.length === 0) {
    return;
  }

  const userIds = users.map((item) => Number(item.id));
  const userEmailById = new Map(users.map((item) => [item.id, item.email]));
  const now = new Date('2026-04-20T10:00:00');

  await maRepo
    .createQueryBuilder()
    .delete()
    .where('dich_danh_nhan IN (:...emails)', { emails })
    .execute();

  await phienRepo
    .createQueryBuilder()
    .delete()
    .where('token_phien LIKE :prefix', { prefix: 'seed-session-%' })
    .orWhere('token_lam_moi LIKE :refreshPrefix', { refreshPrefix: 'seed-refresh-%' })
    .execute();

  await quanHeRepo
    .createQueryBuilder()
    .delete()
    .where('id_nguoi_tao_quan_he IN (:...ids)', { ids: userIds })
    .orWhere('id_nguoi_nhan_quan_he IN (:...ids)', { ids: userIds })
    .execute();

  if (hasTuongTacTable) {
    await tuongTacRepo
      .createQueryBuilder()
      .delete()
      .where('id_nguoi_dung IN (:...ids)', { ids: userIds })
      .execute();
  }

  await thongBaoRepo
    .createQueryBuilder()
    .delete()
    .where('id_nguoi_nhan IN (:...ids)', { ids: userIds })
    .andWhere('tieu_de LIKE :titlePrefix', { titlePrefix: '[SEED]%' })
    .execute();

  const otpRows = users.flatMap((item, idx) => {
    const base = addMinutes(now, -(idx * 17 + 15));
    return [
      {
        id_nguoi_dung: item.id,
        loai_xac_thuc: 'dang_ky',
        kenh_gui: 'email',
        dich_danh_nhan: item.email,
        ma_xac_thuc: String(100000 + idx * 3),
        thoi_gian_het_han: addMinutes(base, 10),
        thoi_gian_xac_nhan: addMinutes(base, 3),
        so_lan_gui: 1,
        trang_thai: 'da_dung',
        ngay_tao: base,
      },
      {
        id_nguoi_dung: item.id,
        loai_xac_thuc: 'quen_mat_khau',
        kenh_gui: 'email',
        dich_danh_nhan: item.email,
        ma_xac_thuc: String(200000 + idx * 7),
        thoi_gian_het_han: addMinutes(base, 5),
        thoi_gian_xac_nhan: null,
        so_lan_gui: 2,
        trang_thai: idx % 2 === 0 ? 'hieu_luc' : 'het_han',
        ngay_tao: addMinutes(base, 30),
      },
    ];
  });
  await maRepo.save(otpRows);

  const sessionRows = users.map((item, idx) => {
    const startedAt = addMinutes(now, -(idx * 40 + 20));
    const email = userEmailById.get(item.id) ?? 'user@dishnet.vn';
    return {
      id_nguoi_dung: item.id,
      vai_tro_dang_nhap: pickRole(email),
      token_phien: `seed-session-${item.id}-${idx}`,
      token_lam_moi: `seed-refresh-${item.id}-${idx}`,
      thiet_bi: idx % 2 === 0 ? 'Chrome macOS' : 'Mobile Safari iOS',
      dia_chi_ip: `10.0.0.${20 + idx}`,
      ghi_nho_dang_nhap: idx % 2 === 0,
      het_han_luc: addMinutes(startedAt, 60 * 24 * 7),
      lan_hoat_dong_cuoi: addMinutes(startedAt, 20),
      ngay_tao: startedAt,
    };
  });
  await phienRepo.save(sessionRows);

  const byEmail = Object.fromEntries(users.map((item) => [item.email, item.id]));
  const relationRows: Array<Partial<QuanHeNguoiDungEntity>> = [
    {
      id_nguoi_tao_quan_he: byEmail['user@dishnet.vn'],
      id_nguoi_nhan_quan_he: byEmail['creator@dishnet.vn'],
      loai_quan_he: 'theo_doi',
      trang_thai: 'hieu_luc',
      ngay_tao: addMinutes(now, -600),
    },
    {
      id_nguoi_tao_quan_he: byEmail['user@dishnet.vn'],
      id_nguoi_nhan_quan_he: byEmail['store@dishnet.vn'],
      loai_quan_he: 'theo_doi',
      trang_thai: 'hieu_luc',
      ngay_tao: addMinutes(now, -560),
    },
    {
      id_nguoi_tao_quan_he: byEmail['creator@dishnet.vn'],
      id_nguoi_nhan_quan_he: byEmail['multi@dishnet.vn'],
      loai_quan_he: 'theo_doi',
      trang_thai: 'hieu_luc',
      ngay_tao: addMinutes(now, -520),
    },
    {
      id_nguoi_tao_quan_he: byEmail['multi@dishnet.vn'],
      id_nguoi_nhan_quan_he: byEmail['creator@dishnet.vn'],
      loai_quan_he: 'theo_doi',
      trang_thai: 'hieu_luc',
      ngay_tao: addMinutes(now, -500),
    },
    {
      id_nguoi_tao_quan_he: byEmail['store@dishnet.vn'],
      id_nguoi_nhan_quan_he: byEmail['user@dishnet.vn'],
      loai_quan_he: 'theo_doi',
      trang_thai: 'hieu_luc',
      ngay_tao: addMinutes(now, -480),
    },
    {
      id_nguoi_tao_quan_he: byEmail['locked@dishnet.vn'],
      id_nguoi_nhan_quan_he: byEmail['user@dishnet.vn'],
      loai_quan_he: 'chan',
      trang_thai: 'hieu_luc',
      ngay_tao: addMinutes(now, -460),
    },
  ].filter(
    (item): item is QuanHeNguoiDungEntity =>
      Number.isFinite(Number(item.id_nguoi_tao_quan_he)) &&
      Number.isFinite(Number(item.id_nguoi_nhan_quan_he)),
  );
  await quanHeRepo.save(relationRows);

  const posts = await baiVietRepo.find({ order: { ngay_dang: 'DESC', id: 'DESC' }, take: 12 });
  const comments = await binhLuanRepo.find({ order: { ngay_tao: 'DESC', id: 'DESC' }, take: 12 });

  const interactionRows: Array<Partial<TuongTacEntity>> = [];
  users.forEach((u, idx) => {
    const post = posts[idx % Math.max(posts.length, 1)];
    if (post) {
      interactionRows.push({
        id_nguoi_dung: u.id,
        id_bai_viet: Number(post.id),
        id_binh_luan: null,
        loai_tuong_tac: 'thich',
        ngay_tao: addMinutes(now, -(idx * 9 + 60)),
      });
      interactionRows.push({
        id_nguoi_dung: u.id,
        id_bai_viet: Number(post.id),
        id_binh_luan: null,
        loai_tuong_tac: idx % 2 === 0 ? 'luu' : 'chia_se',
        ngay_tao: addMinutes(now, -(idx * 9 + 54)),
      });
    }

    const comment = comments[idx % Math.max(comments.length, 1)];
    if (comment) {
      interactionRows.push({
        id_nguoi_dung: u.id,
        id_bai_viet: null,
        id_binh_luan: Number(comment.id),
        loai_tuong_tac: 'thich',
        ngay_tao: addMinutes(now, -(idx * 7 + 40)),
      });
    }
  });

  if (hasTuongTacTable && interactionRows.length > 0) {
    await tuongTacRepo.save(interactionRows as TuongTacEntity[]);
  }

  const thongBaoRows = users.flatMap((u, idx) => {
    const targetPost = posts[idx % Math.max(posts.length, 1)];
    return [
      {
        id_nguoi_nhan: u.id,
        loai_thong_bao: 'tuong_tac_bai_viet',
        loai_doi_tuong: targetPost ? 'bai_viet' : null,
        id_doi_tuong: targetPost ? Number(targetPost.id) : null,
        tieu_de: `[SEED] Bạn có tương tác mới #${idx + 1}`,
        noi_dung: 'Bài viết của bạn vừa nhận thêm lượt thích.',
        da_doc: idx % 3 === 0,
        thoi_gian_doc: idx % 3 === 0 ? addMinutes(now, -(idx * 5 + 10)) : null,
        ngay_tao: addMinutes(now, -(idx * 5 + 15)),
      },
      {
        id_nguoi_nhan: u.id,
        loai_thong_bao: 'he_thong',
        loai_doi_tuong: null,
        id_doi_tuong: null,
        tieu_de: `[SEED] Cập nhật chính sách #${idx + 1}`,
        noi_dung: 'DishNet đã cập nhật một số chính sách cộng đồng và vận hành.',
        da_doc: idx % 2 === 0,
        thoi_gian_doc: idx % 2 === 0 ? addMinutes(now, -(idx * 4 + 8)) : null,
        ngay_tao: addMinutes(now, -(idx * 4 + 12)),
      },
    ];
  });

  await thongBaoRepo.save(thongBaoRows);
}
