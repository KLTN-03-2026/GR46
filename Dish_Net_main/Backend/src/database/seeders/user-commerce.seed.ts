import { DonHangEntity } from '../../Api/Admin/entities/don-hang.entity';
import { KhuyenMaiEntity } from '../../Api/Admin/entities/khuyen-mai.entity';
import { MonAnEntity } from '../../Api/Admin/entities/mon-an.entity';
import { DonHangChiTietEntity } from '../../Api/Admin/entities/don-hang-chi-tiet.entity';
import { TepDinhKemEntity } from '../../Api/Admin/entities/tep-dinh-kem.entity';
import { DanhGiaEntity } from '../../Api/Store/entities/danh-gia.entity';
import { CuocTroChuyenEntity } from '../../Api/User/entities/cuoc-tro-chuyen.entity';
import { DonHangKhuyenMaiEntity } from '../../Api/User/entities/don-hang-khuyen-mai.entity';
import { GioHangChiTietEntity } from '../../Api/User/entities/gio-hang-chi-tiet.entity';
import { ThanhToanEntity } from '../../Api/User/entities/thanh-toan.entity';
import { TinNhanEntity } from '../../Api/User/entities/tin-nhan.entity';
import { getUserId, type SeederContext } from './context';

function addMinutes(base: Date, minutes: number) {
  return new Date(base.getTime() + minutes * 60_000);
}

function resolveCongThanhToan(phuongThuc: string) {
  if (phuongThuc === 'vnpay') return 'vnpay';
  if (phuongThuc === 'vi_dien_tu') return 'momo';
  if (phuongThuc === 'the') return 'khac';
  return null;
}

export async function seedUserCommerce(context: SeederContext) {
  const monAnRepo = context.dataSource.getRepository(MonAnEntity);
  const gioHangRepo = context.dataSource.getRepository(GioHangChiTietEntity);
  const donHangRepo = context.dataSource.getRepository(DonHangEntity);
  const donHangChiTietRepo = context.dataSource.getRepository(DonHangChiTietEntity);
  const thanhToanRepo = context.dataSource.getRepository(ThanhToanEntity);
  const danhGiaRepo = context.dataSource.getRepository(DanhGiaEntity);
  const tepRepo = context.dataSource.getRepository(TepDinhKemEntity);
  const khuyenMaiRepo = context.dataSource.getRepository(KhuyenMaiEntity);
  const donHangKhuyenMaiRepo = context.dataSource.getRepository(
    DonHangKhuyenMaiEntity,
  );
  const cuocTroChuyenRepo = context.dataSource.getRepository(CuocTroChuyenEntity);
  const tinNhanRepo = context.dataSource.getRepository(TinNhanEntity);

  const userId = getUserId(context, 'user@dishnet.vn');
  const creatorId = getUserId(context, 'creator@dishnet.vn');
  const multiId = getUserId(context, 'multi@dishnet.vn');

  if (!userId || !creatorId || !multiId) {
    return;
  }

  // Seed PB17 - giỏ hàng
  const monList = await monAnRepo.find({
    where: [{ ma_mon: 'BB001' }, { ma_mon: 'BBH01' }, { ma_mon: 'CB01' }],
  });
  const monByCode = new Map(monList.map((item) => [item.ma_mon, item]));
  const monBB001 = monByCode.get('BB001');
  const monBBH01 = monByCode.get('BBH01');
  const monCB01 = monByCode.get('CB01');

  await gioHangRepo.delete({ id_nguoi_dung: userId });
  if (monBB001 && monBBH01 && monCB01) {
    await gioHangRepo.save([
      {
        id_nguoi_dung: userId,
        id_cua_hang: Number(monBB001.id_cua_hang),
        id_mon_an: Number(monBB001.id),
        so_luong: 1,
        ghi_chu: 'Ít cay',
        duoc_chon: true,
        gia_tai_thoi_diem_them: Number(monBB001.gia_ban),
        ngay_tao: new Date('2026-04-20T08:10:00'),
        ngay_cap_nhat: new Date('2026-04-20T08:10:00'),
      },
      {
        id_nguoi_dung: userId,
        id_cua_hang: Number(monBBH01.id_cua_hang),
        id_mon_an: Number(monBBH01.id),
        so_luong: 2,
        ghi_chu: null,
        duoc_chon: true,
        gia_tai_thoi_diem_them: Number(monBBH01.gia_ban),
        ngay_tao: new Date('2026-04-20T08:11:00'),
        ngay_cap_nhat: new Date('2026-04-20T08:11:00'),
      },
      {
        id_nguoi_dung: userId,
        id_cua_hang: Number(monCB01.id_cua_hang),
        id_mon_an: Number(monCB01.id),
        so_luong: 1,
        ghi_chu: null,
        duoc_chon: false,
        gia_tai_thoi_diem_them: Number(monCB01.gia_ban),
        ngay_tao: new Date('2026-04-20T08:12:00'),
        ngay_cap_nhat: new Date('2026-04-20T08:12:00'),
      },
    ]);
  }

  // Seed PB18/PB19-22 - thanh toán đơn hàng
  const orders = await donHangRepo.find();
  const orderIds = orders.map((item) => Number(item.id));

  if (orderIds.length > 0) {
    await thanhToanRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: orderIds })
      .execute();
  }

  if (orders.length > 0) {
    await thanhToanRepo.save(
      orders.map((order) => {
        const paidAt =
          order.thoi_gian_xac_nhan ??
          addMinutes(order.thoi_gian_dat, 2) ??
          order.thoi_gian_dat;
        const method = order.phuong_thuc_thanh_toan;
        const cong = resolveCongThanhToan(method);

        let status = 'thanh_cong';
        let soTienHoanTien: number | null = null;
        let thoiGianHoanTien: Date | null = null;

        if (order.trang_thai_don_hang === 'da_huy') {
          if (method === 'tien_mat') {
            status = 'that_bai';
          } else {
            status = 'da_hoan_tien';
            soTienHoanTien = Number(order.tong_thanh_toan);
            thoiGianHoanTien = order.thoi_gian_huy ?? addMinutes(paidAt, 5);
          }
        } else if (order.trang_thai_don_hang === 'tra_hang') {
          status = 'thanh_cong';
        } else if (order.trang_thai_don_hang === 'da_hoan_tien') {
          status = 'da_hoan_tien';
          soTienHoanTien = Number(order.tong_thanh_toan);
          thoiGianHoanTien = order.thoi_gian_hoan_tat ?? addMinutes(paidAt, 10);
        }

        return {
          id_don_hang: Number(order.id),
          cong_thanh_toan: cong,
          ma_giao_dich:
            method === 'tien_mat' ? null : `SEED-${order.ma_don_hang}`,
          phuong_thuc_thanh_toan: method,
          so_tien: Number(order.tong_thanh_toan),
          trang_thai_thanh_toan: status,
          thoi_gian_thanh_toan: paidAt,
          so_tien_hoan_tien: soTienHoanTien,
          thoi_gian_hoan_tien: thoiGianHoanTien,
          noi_dung_loi:
            status === 'that_bai'
              ? 'Đơn tiền mặt đã hủy trước khi thanh toán'
              : null,
          ngay_tao: order.thoi_gian_dat,
        };
      }),
    );
  }

  // Seed PB23 - đánh giá đơn hàng (đã đánh giá / chưa đánh giá)
  const orderDaGiaoCuaUser = orders.filter(
    (item) =>
      Number(item.id_nguoi_mua) === userId &&
      item.trang_thai_don_hang === 'da_giao',
  );
  const orderDanhGia = orderDaGiaoCuaUser[0];

  if (orderDanhGia) {
    const reviewsCu = await danhGiaRepo.find({
      where: { id_nguoi_danh_gia: userId, id_don_hang: Number(orderDanhGia.id) },
    });
    if (reviewsCu.length > 0) {
      await tepRepo
        .createQueryBuilder()
        .delete()
        .where('loai_doi_tuong = :loai', { loai: 'danh_gia' })
        .andWhere('id_doi_tuong IN (:...ids)', {
          ids: reviewsCu.map((item) => Number(item.id)),
        })
        .execute();
      await danhGiaRepo.delete(reviewsCu.map((item) => Number(item.id)));
    }

    const firstDetail = await donHangChiTietRepo.findOne({
      where: { id_don_hang: Number(orderDanhGia.id) },
      order: { id: 'ASC' },
    });

    const review = await danhGiaRepo.save({
      id_don_hang: Number(orderDanhGia.id),
      id_nguoi_danh_gia: userId,
      id_cua_hang: Number(orderDanhGia.id_cua_hang),
      id_mon_an: firstDetail?.id_mon_an ?? null,
      so_sao: 5,
      noi_dung: 'Món ngon, giao đúng giờ và đóng gói rất cẩn thận.',
      an_danh: 0,
      tong_luot_thich: 3,
      ngay_tao: addMinutes(orderDanhGia.thoi_gian_dat, 120),
    });

    await tepRepo.save([
      {
        loai_doi_tuong: 'danh_gia',
        id_doi_tuong: Number(review.id),
        loai_tep: 'hinh_anh',
        duong_dan_tep:
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=80',
        thu_tu_hien_thi: 1,
        ghi_chu: null,
        ngay_tao: addMinutes(orderDanhGia.thoi_gian_dat, 120),
      },
    ]);
  }

  // Seed don_hang_khuyen_mai cho các đơn có giảm giá
  const promoCodes = ['HETHONG20', 'NETBUN25', 'LUNCH25K'];
  const promos = await khuyenMaiRepo.find({
    where: promoCodes.map((code) => ({ ma_khuyen_mai: code })),
  });
  const promoByCode = new Map(promos.map((item) => [item.ma_khuyen_mai, item]));
  const orderByCode = new Map(orders.map((item) => [item.ma_don_hang, item]));

  const promoSeeds: Array<{
    maDonHang: string;
    maKhuyenMai: string;
    soTienGiam: number;
  }> = [
    { maDonHang: 'DH2026040707', maKhuyenMai: 'HETHONG20', soTienGiam: 30000 },
    { maDonHang: 'DH2026040804', maKhuyenMai: 'NETBUN25', soTienGiam: 30000 },
    { maDonHang: 'PB24TODAY01', maKhuyenMai: 'LUNCH25K', soTienGiam: 20000 },
  ];

  const targetOrderIds = promoSeeds
    .map((item) => Number(orderByCode.get(item.maDonHang)?.id))
    .filter((id) => Number.isFinite(id) && id > 0);

  if (targetOrderIds.length > 0) {
    await donHangKhuyenMaiRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: targetOrderIds })
      .execute();
  }

  const rows = promoSeeds
    .map((item) => {
      const order = orderByCode.get(item.maDonHang);
      const promo = promoByCode.get(item.maKhuyenMai);
      if (!order || !promo) return null;

      return {
        id_don_hang: Number(order.id),
        id_khuyen_mai: Number(promo.id),
        ma_khuyen_mai_snapshot: promo.ma_khuyen_mai,
        so_tien_giam: item.soTienGiam,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  if (rows.length > 0) {
    await donHangKhuyenMaiRepo.save(rows);
  }

  // Seed PB10 - trò chuyện + tin nhắn
  const ensureRoom = async (a: number, b: number) => {
    const left = Math.min(a, b);
    const right = Math.max(a, b);
    let room = await cuocTroChuyenRepo.findOne({
      where: { id_nguoi_dung_a: left, id_nguoi_dung_b: right },
    });
    if (!room) {
      room = await cuocTroChuyenRepo.save({
        id_nguoi_dung_a: left,
        id_nguoi_dung_b: right,
        tin_nhan_cuoi: null,
        thoi_gian_tin_nhan_cuoi: null,
        ngay_tao: new Date('2026-04-20T08:00:00'),
      });
    }
    return room;
  };

  const roomUserCreator = await ensureRoom(userId, creatorId);
  const roomUserMulti = await ensureRoom(userId, multiId);
  const roomIds = [Number(roomUserCreator.id), Number(roomUserMulti.id)];

  await tinNhanRepo
    .createQueryBuilder()
    .delete()
    .where('id_cuoc_tro_chuyen IN (:...ids)', { ids: roomIds })
    .execute();

  await tinNhanRepo.save([
    {
      id_cuoc_tro_chuyen: Number(roomUserCreator.id),
      id_nguoi_gui: creatorId,
      noi_dung: 'Chào bạn, cảm ơn đã theo dõi review của mình.',
      loai_tin_nhan: 'van_ban',
      thoi_gian_gui: new Date('2026-04-20T08:20:00'),
      thoi_gian_xem: new Date('2026-04-20T08:21:00'),
      da_thu_hoi: false,
    },
    {
      id_cuoc_tro_chuyen: Number(roomUserCreator.id),
      id_nguoi_gui: userId,
      noi_dung: 'Mình thích bài bún bò của bạn, cảm ơn nhé.',
      loai_tin_nhan: 'van_ban',
      thoi_gian_gui: new Date('2026-04-20T08:22:00'),
      thoi_gian_xem: new Date('2026-04-20T08:23:00'),
      da_thu_hoi: false,
    },
    {
      id_cuoc_tro_chuyen: Number(roomUserMulti.id),
      id_nguoi_gui: userId,
      noi_dung: 'Cho mình hỏi quán còn mở tối nay không?',
      loai_tin_nhan: 'van_ban',
      thoi_gian_gui: new Date('2026-04-20T08:26:00'),
      thoi_gian_xem: null,
      da_thu_hoi: false,
    },
  ]);

  await cuocTroChuyenRepo.save([
    {
      ...roomUserCreator,
      tin_nhan_cuoi: 'Mình thích bài bún bò của bạn, cảm ơn nhé.',
      thoi_gian_tin_nhan_cuoi: new Date('2026-04-20T08:22:00'),
    },
    {
      ...roomUserMulti,
      tin_nhan_cuoi: 'Cho mình hỏi quán còn mở tối nay không?',
      thoi_gian_tin_nhan_cuoi: new Date('2026-04-20T08:26:00'),
    },
  ]);
}
