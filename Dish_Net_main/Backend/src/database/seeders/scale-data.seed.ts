import { hash } from 'bcrypt';
import { In } from 'typeorm';

import { BaiVietEntity } from '../../Api/Admin/entities/bai-viet.entity';
import { BaoCaoEntity } from '../../Api/Admin/entities/bao-cao.entity';
import { BinhLuanEntity } from '../../Api/Admin/entities/binh-luan.entity';
import { CuaHangEntity } from '../../Api/Admin/entities/cua-hang.entity';
import { DanhMucMonEntity } from '../../Api/Admin/entities/danh-muc-mon.entity';
import { DonHangChiTietEntity } from '../../Api/Admin/entities/don-hang-chi-tiet.entity';
import { DonHangEntity } from '../../Api/Admin/entities/don-hang.entity';
import { KhuyenMaiEntity } from '../../Api/Admin/entities/khuyen-mai.entity';
import { LichSuDonHangEntity } from '../../Api/Admin/entities/lich-su-don-hang.entity';
import { MonAnEntity } from '../../Api/Admin/entities/mon-an.entity';
import { NhatKyHeThongEntity } from '../../Api/Admin/entities/nhat-ky-he-thong.entity';
import { TepDinhKemEntity } from '../../Api/Admin/entities/tep-dinh-kem.entity';
import { ThongBaoEntity } from '../../Api/Admin/entities/thong-bao.entity';
import { ToppingEntity } from '../../Api/Admin/entities/topping.entity';
import { TuongTacEntity } from '../../Api/Admin/entities/tuong-tac.entity';
import { YeuCauHoTroEntity } from '../../Api/Admin/entities/yeu-cau-ho-tro.entity';
import { YeuCauNangCapEntity } from '../../Api/Admin/entities/yeu-cau-nang-cap.entity';
import { MaXacThucEntity } from '../../Api/Auth/entities/ma-xac-thuc.entity';
import { NguoiDungEntity } from '../../Api/Auth/entities/nguoi-dung.entity';
import { PhienDangNhapEntity } from '../../Api/Auth/entities/phien-dang-nhap.entity';
import { DanhGiaEntity } from '../../Api/Store/entities/danh-gia.entity';
import { CuocTroChuyenEntity } from '../../Api/User/entities/cuoc-tro-chuyen.entity';
import { DonHangKhuyenMaiEntity } from '../../Api/User/entities/don-hang-khuyen-mai.entity';
import { GioHangChiTietEntity } from '../../Api/User/entities/gio-hang-chi-tiet.entity';
import { QuanHeNguoiDungEntity } from '../../Api/User/entities/quan-he-nguoi-dung.entity';
import { ThanhToanEntity } from '../../Api/User/entities/thanh-toan.entity';
import { TinNhanEntity } from '../../Api/User/entities/tin-nhan.entity';
import type { SeederContext } from './context';

const TARGET_MAIN = 60;
const TARGET_SUB = 120;

const REVIEW_LONG_TEXTS = [
  'Mình đặt món vào buổi trưa và nhận khá nhanh, đồ ăn còn nóng, nước dùng giữ được vị thơm tự nhiên. Phần thịt vừa đủ, không bị khô, rau ăn kèm tươi. Điểm cộng lớn là đóng gói rất gọn gàng, có ghi rõ tên món và ghi chú của khách. Nếu cải thiện thêm phần nước chấm đi kèm thì trải nghiệm sẽ trọn vẹn hơn.',
  'Quán chuẩn bị món đúng như mô tả, khẩu phần hợp lý với mức giá. Mình thích nhất là độ ổn định giữa các lần đặt, không bị lúc ngon lúc dở. Tuy nhiên khung giờ cao điểm nên thời gian giao có chậm hơn dự kiến khoảng 10 phút. Tổng thể vẫn đáng quay lại và giới thiệu cho đồng nghiệp.',
  'Món ăn lên hình đúng thực tế, vị nêm nếm vừa phải và dễ ăn. Phần cơm không bị khô, topping đầy đủ, nước sốt tách riêng nên khi nhận vẫn giữ độ giòn. Quán xử lý ghi chú cẩn thận, có gọi xác nhận khi thiếu món. Đây là kiểu dịch vụ mình đánh giá cao vì tạo cảm giác được chăm sóc.',
];

const POST_LONG_TEXTS = [
  'Hôm nay mình thử lại một quán quen trong khu vực giờ trưa. Ấn tượng đầu tiên là tốc độ xác nhận đơn nhanh và món lên khá đều tay. Về hương vị, nước dùng đậm nhưng không gắt, topping tươi và khẩu phần vừa đủ no. Mình đánh giá cao phần đóng gói, có tem niêm phong rõ ràng nên nhận hàng rất yên tâm. Nếu quán giữ được sự ổn định này trong các khung giờ cao điểm thì hoàn toàn có thể nằm top lựa chọn ăn trưa văn phòng.',
  'Cuối tuần mình đi ăn trực tiếp rồi đặt thêm qua app để so sánh trải nghiệm. Điểm mình thích là thông tin món trên DishNet khá sát thực tế, không bị lệch nhiều về hình ảnh và khẩu phần. Tuy vậy, ở lần đặt tối muộn thì thời gian chờ bếp có tăng, giao trễ hơn dự kiến một chút. Bù lại, quán có chủ động nhắn xin lỗi và tặng kèm nước nên cảm nhận dịch vụ vẫn tích cực. Mình nghĩ đây là ví dụ tốt cho việc xử lý tình huống chăm sóc khách hàng.',
  'Mình có thử combo khuyến mãi theo khung giờ trưa và thấy mức giá khá hợp lý so với chất lượng. Phần món chính nêm vừa miệng, món phụ không bị làm qua loa, điểm này nhiều quán thường mắc. Khi nhận hàng, túi đồ ăn được phân ngăn hợp lý nên không bị đổ nước sốt. Về tổng quan, trải nghiệm đủ tốt để mình lưu lại và cân nhắc mua lại trong tuần tới.',
];

const COMMENT_LONG_TEXTS = [
  'Mình đồng ý với đánh giá này ở phần chất lượng món, đặc biệt là độ ổn định giữa các lần đặt. Trước đây mình từng gặp trường hợp cùng một món nhưng hôm ngon hôm dở, quán này thì đỡ hơn hẳn.',
  'Theo mình quán làm tốt khâu đóng gói và xử lý ghi chú của khách. Tuy nhiên ở giờ cao điểm nên cộng thêm 10-15 phút giao hàng thì sẽ sát thực tế hơn.',
  'Mình từng gặp đúng tình huống tương tự, sau đó phản hồi qua hỗ trợ thì được xử lý khá nhanh. Nếu có ảnh minh chứng ngay khi nhận món thì hệ thống hoàn tiền thường duyệt nhanh hơn.',
];

const SUPPORT_TEXTS = [
  'Tôi đặt đơn trong khung giờ trưa, hệ thống hiển thị đã thanh toán thành công nhưng trạng thái đơn chuyển sang chờ xác nhận khá lâu. Sau khoảng 20 phút đơn bị hủy và chưa thấy cập nhật hoàn tiền trong ví. Nhờ đội ngũ hỗ trợ kiểm tra mã giao dịch, trạng thái hoàn tiền và thời gian dự kiến nhận lại tiền.',
  'Tôi là chủ cửa hàng, hôm nay menu đã cập nhật nhưng một số món mới không hiển thị ở app người dùng. Tôi đã thử làm mới trình duyệt và kiểm tra trạng thái món là đang bán. Mong hỗ trợ kiểm tra đồng bộ dữ liệu giữa backend và giao diện để tránh ảnh hưởng doanh thu khung giờ tối.',
  'Tôi gửi yêu cầu vì báo cáo doanh thu theo ngày đang lệch với số đơn đã giao thực tế. Một số đơn trạng thái đã giao nhưng chưa cộng vào tổng thu nhập cửa hàng. Nhờ kiểm tra giúp điều kiện ghi nhận doanh thu và cho biết có cần đồng bộ lại dữ liệu hay không.',
];

const REPORT_TEXTS = [
  'Nội dung bị báo cáo có dấu hiệu gây hiểu nhầm về mức giảm giá và điều kiện áp dụng. Trong bài đăng ghi giảm sâu toàn bộ menu nhưng khi đặt thực tế chỉ áp dụng cho một số món nhất định. Điều này ảnh hưởng trực tiếp tới quyết định mua của người dùng.',
  'Tài khoản này đăng lại cùng một nội dung nhiều lần trong ngày với tần suất dày, kèm bình luận điều hướng sang kênh ngoài nền tảng. Hành vi lặp lại gây nhiễu bảng tin và tạo trải nghiệm không tốt cho người dùng khác.',
  'Bình luận có ngôn từ công kích cá nhân và không tập trung vào chất lượng món hoặc dịch vụ. Nội dung này dễ tạo tranh cãi tiêu cực, không phù hợp quy định cộng đồng về thái độ trao đổi văn minh.',
];

function addMinutes(base: Date, minutes: number) {
  return new Date(base.getTime() + minutes * 60_000);
}

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

function randomPhone(i: number) {
  return `09${String(10000000 + i).slice(-8)}`;
}

export async function seedScaleData(context: SeederContext) {
  const userRepo = context.dataSource.getRepository(NguoiDungEntity);
  const storeRepo = context.dataSource.getRepository(CuaHangEntity);
  const catRepo = context.dataSource.getRepository(DanhMucMonEntity);
  const foodRepo = context.dataSource.getRepository(MonAnEntity);
  const toppingRepo = context.dataSource.getRepository(ToppingEntity);
  const postRepo = context.dataSource.getRepository(BaiVietEntity);
  const commentRepo = context.dataSource.getRepository(BinhLuanEntity);
  const interactionRepo = context.dataSource.getRepository(TuongTacEntity);
  const notifRepo = context.dataSource.getRepository(ThongBaoEntity);
  const orderRepo = context.dataSource.getRepository(DonHangEntity);
  const orderDetailRepo = context.dataSource.getRepository(DonHangChiTietEntity);
  const orderHistoryRepo = context.dataSource.getRepository(LichSuDonHangEntity);
  const paymentRepo = context.dataSource.getRepository(ThanhToanEntity);
  const reviewRepo = context.dataSource.getRepository(DanhGiaEntity);
  const attachmentRepo = context.dataSource.getRepository(TepDinhKemEntity);
  const cartRepo = context.dataSource.getRepository(GioHangChiTietEntity);
  const promoRepo = context.dataSource.getRepository(KhuyenMaiEntity);
  const orderPromoRepo = context.dataSource.getRepository(DonHangKhuyenMaiEntity);
  const supportRepo = context.dataSource.getRepository(YeuCauHoTroEntity);
  const upgradeRepo = context.dataSource.getRepository(YeuCauNangCapEntity);
  const reportRepo = context.dataSource.getRepository(BaoCaoEntity);
  const logRepo = context.dataSource.getRepository(NhatKyHeThongEntity);
  const otpRepo = context.dataSource.getRepository(MaXacThucEntity);
  const sessionRepo = context.dataSource.getRepository(PhienDangNhapEntity);
  const relationRepo = context.dataSource.getRepository(QuanHeNguoiDungEntity);
  const roomRepo = context.dataSource.getRepository(CuocTroChuyenEntity);
  const messageRepo = context.dataSource.getRepository(TinNhanEntity);
  const queryRunner = context.dataSource.createQueryRunner();
  const hasTuongTacTable = await queryRunner.hasTable('tuong_tac');
  await queryRunner.release();

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  const defaultPassword = process.env.SEED_ADMIN_PASSWORD ?? 'admin123';
  const passwordHash = await hash(defaultPassword, saltRounds);
  const now = new Date('2026-04-20T10:00:00');

  // 1) User top-up
  const currentUsers = await userRepo.find({ order: { id: 'ASC' } });
  const needUsers = Math.max(0, 90 - currentUsers.length);
  if (needUsers > 0) {
    const extraUsers = Array.from({ length: needUsers }, (_, i) => {
      const idx = i + 1;
      const isCreator = idx % 7 === 0;
      const isStoreOwner = idx % 3 === 0;
      const status = idx % 19 === 0 ? 'bi_khoa' : idx % 23 === 0 ? 'cho_xac_thuc' : 'hoat_dong';
      const regSource = idx % 4 === 0 ? 'google' : 'email';
      return {
        ten_dang_nhap: `seed_user_${idx}`,
        email: `seed_user_${idx}@dishnet.vn`,
        so_dien_thoai: randomPhone(500 + idx),
        mat_khau_bam: passwordHash,
        ten_hien_thi: `Người dùng Seed ${idx}`,
        anh_dai_dien: `https://i.pravatar.cc/150?img=${(idx % 70) + 1}`,
        gioi_tinh: idx % 3 === 0 ? 'nam' : idx % 3 === 1 ? 'nu' : 'khac',
        ngay_sinh: new Date(1990 + (idx % 15), idx % 12, (idx % 27) + 1),
        tieu_su: `Tài khoản seed ${idx} phục vụ test nghiệp vụ nhiều trạng thái.`,
        dia_chi: `Số ${idx}, đường Seed, Việt Nam`,
        khu_vuc: pick(['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ'], idx),
        vi_do: 10.75 + (idx % 10) * 0.01,
        kinh_do: 106.66 + (idx % 10) * 0.01,
        diem_uy_tin: Number((2.5 + (idx % 30) * 0.08).toFixed(2)),
        cho_hien_thi_huy_hieu: idx % 5 !== 0,
        cho_hien_thi_diem_uy_tin: idx % 6 !== 0,
        la_tai_khoan_rieng_tu: idx % 9 === 0,
        la_admin: false,
        la_nha_sang_tao: isCreator,
        la_chu_cua_hang: isStoreOwner,
        trang_thai_tai_khoan: status,
        ly_do_khoa_hien_tai: status === 'bi_khoa' ? 'Seed khóa tài khoản để kiểm thử' : null,
        nguon_dang_ky: regSource,
        ma_nguon_ngoai: regSource === 'google' ? `google-seed-${idx}` : null,
        thoi_gian_xac_thuc_email: status === 'cho_xac_thuc' ? null : addMinutes(now, -(idx * 60)),
        thoi_gian_xac_thuc_so_dien_thoai: idx % 4 === 0 ? addMinutes(now, -(idx * 30)) : null,
        lan_dang_nhap_cuoi: idx % 2 === 0 ? addMinutes(now, -(idx * 10)) : null,
      };
    });

    await userRepo.upsert(extraUsers, ['email']);
  }

  const users = await userRepo.find({ order: { id: 'ASC' } });
  context.userByEmail = new Map(users.map((user) => [user.email, user]));
  const activeUsers = users.filter((u) => u.trang_thai_tai_khoan === 'hoat_dong' && !u.la_admin);
  const generatedUsers = activeUsers.filter((u) => u.email.startsWith('seed_user_'));
  const actorUsers = generatedUsers.length > 0 ? generatedUsers : activeUsers;
  const actorUserIds = actorUsers.map((u) => Number(u.id));
  const ownerUsers = activeUsers.filter((u) => u.la_chu_cua_hang);

  // 2) Store top-up
  const existingStores = await storeRepo.find({ order: { id: 'ASC' } });
  const needStores = Math.max(0, TARGET_MAIN - existingStores.length);
  if (needStores > 0 && ownerUsers.length > 0) {
    const extraStores = Array.from({ length: needStores }, (_, i) => {
      const idx = i + 1;
      const owner = pick(ownerUsers, i);
      const openStatus = idx % 17 === 0 ? 'bi_khoa' : idx % 11 === 0 ? 'cho_duyet' : idx % 7 === 0 ? 'tam_nghi' : 'hoat_dong';
      return {
        id_chu_so_huu: Number(owner.id),
        ten_cua_hang: `Quán Seed ${idx}`,
        slug: `quan-seed-${idx}`,
        mo_ta: `Cửa hàng seed ${idx}, phục vụ dữ liệu kiểm thử đa nghiệp vụ.`,
        anh_dai_dien: `https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=640&q=80&sig=${idx}`,
        so_dien_thoai_lien_he: randomPhone(1000 + idx),
        dia_chi_kinh_doanh: `${idx} Seed Street, Việt Nam`,
        khu_vuc: pick(['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ'], idx),
        vi_do: 10.7 + (idx % 9) * 0.03,
        kinh_do: 106.6 + (idx % 9) * 0.03,
        gio_mo_cua: '06:30:00',
        gio_dong_cua: '22:00:00',
        tu_nhan_giao_hang: idx % 2 === 0,
        phi_van_chuyen_mac_dinh: 12000 + (idx % 5) * 2000,
        trang_thai_hoat_dong: openStatus,
        diem_danh_gia: Number((3.8 + (idx % 12) * 0.1).toFixed(2)),
        tong_don_hang: 0,
        tong_luot_xem: 50 + idx * 7,
        tong_luot_thich: 20 + idx * 4,
      };
    });

    await storeRepo.upsert(extraStores, ['slug']);
  }

  const stores = await storeRepo.find({ order: { id: 'ASC' } });
  const activeStores = stores.filter((s) => s.trang_thai_hoat_dong === 'hoat_dong');
  context.storeByEmail = new Map(
    stores
      .map((s) => {
        const owner = users.find((u) => Number(u.id) === Number(s.id_chu_so_huu));
        return owner?.email ? [owner.email, Number(s.id)] : null;
      })
      .filter((row): row is [string, number] => row != null),
  );

  // 3) Category top-up
  const catPayload = stores.flatMap((store, i) => [
    {
      id_cua_hang: Number(store.id),
      id_danh_muc_cha: null,
      ten_danh_muc: 'Món chính',
      thu_tu_hien_thi: 1,
      trang_thai: 'hieu_luc',
    },
    {
      id_cua_hang: Number(store.id),
      id_danh_muc_cha: null,
      ten_danh_muc: 'Món phụ',
      thu_tu_hien_thi: 2,
      trang_thai: i % 9 === 0 ? 'an' : 'hieu_luc',
    },
    {
      id_cua_hang: Number(store.id),
      id_danh_muc_cha: null,
      ten_danh_muc: 'Đồ uống',
      thu_tu_hien_thi: 3,
      trang_thai: 'hieu_luc',
    },
  ]);
  await catRepo.upsert(catPayload, ['id_cua_hang', 'ten_danh_muc']);

  const allCats = await catRepo.find({ order: { id: 'ASC' } });
  context.categoryByKey = new Map(allCats.map((c) => [`${c.id_cua_hang}-${c.ten_danh_muc}`, Number(c.id)]));

  // 4) Food + topping top-up
  const foodPayload = stores.flatMap((store, i) => {
    const catMonChinh = allCats.find((c) => Number(c.id_cua_hang) === Number(store.id) && c.ten_danh_muc === 'Món chính');
    const catDoUong = allCats.find((c) => Number(c.id_cua_hang) === Number(store.id) && c.ten_danh_muc === 'Đồ uống');

    return Array.from({ length: 4 }, (_, k) => {
      const idx = i * 4 + k + 1;
      const isDrink = k === 3;
      return {
        id_cua_hang: Number(store.id),
        id_danh_muc: Number((isDrink ? catDoUong : catMonChinh)?.id ?? null),
        ma_mon: `AUTO${String(store.id)}${String(k + 1).padStart(2, '0')}`,
        ten_mon: isDrink ? `Nước Seed ${idx}` : `Món Seed ${idx}`,
        mo_ta: `Mô tả món seed ${idx}, phục vụ kiểm thử nhiều luồng nghiệp vụ.`,
        hinh_anh_dai_dien: `https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=640&q=80&sig=${idx}`,
        gia_ban: isDrink ? 18000 + (idx % 5) * 2000 : 42000 + (idx % 7) * 5000,
        gia_goc: isDrink ? 22000 : 52000 + (idx % 7) * 6000,
        trang_thai_ban: idx % 13 === 0 ? 'het_mon' : idx % 19 === 0 ? 'tam_ngung_ban' : 'dang_ban',
        so_luong_da_ban: 20 + idx * 2,
        diem_danh_gia: Number((3.7 + (idx % 12) * 0.1).toFixed(2)),
        tong_danh_gia: 5 + (idx % 50),
        la_mon_noi_bat: idx % 8 === 0,
      };
    });
  });

  await foodRepo.upsert(foodPayload, ['id_cua_hang', 'ma_mon']);

  const autoFoods = await foodRepo
    .createQueryBuilder('ma')
    .where('ma.ma_mon LIKE :prefix', { prefix: 'AUTO%' })
    .getMany();

  const autoFoodIds = autoFoods.map((f) => Number(f.id));
  if (autoFoodIds.length > 0) {
    await toppingRepo
      .createQueryBuilder()
      .delete()
      .where('id_mon_an IN (:...ids)', { ids: autoFoodIds })
      .andWhere('ten_topping LIKE :name', { name: 'Auto Top%' })
      .execute();

    const toppingRows = autoFoods.flatMap((food, i) => [
      {
        id_mon_an: Number(food.id),
        ten_topping: 'Auto Top Extra',
        gia: 5000 + (i % 4) * 2000,
        trang_thai: 'hieu_luc',
      },
      {
        id_mon_an: Number(food.id),
        ten_topping: 'Auto Top Sauce',
        gia: 3000 + (i % 3) * 1500,
        trang_thai: i % 10 === 0 ? 'an' : 'hieu_luc',
      },
    ]);
    await toppingRepo.save(toppingRows);
  }

  // 5) Post + comment top-up
  const generatedPostStart = new Date('2026-02-01T00:00:00');
  const generatedPostEnd = new Date('2026-03-31T23:59:59');
  await postRepo
    .createQueryBuilder()
    .delete()
    .where(
      '(id_nguoi_dang IN (:...ids) AND ngay_dang BETWEEN :start AND :end) OR noi_dung LIKE :legacyPrefix',
      {
        ids: actorUserIds.length > 0 ? actorUserIds : [0],
        start: generatedPostStart,
        end: generatedPostEnd,
        legacyPrefix: '[AUTO-SEED]%',
      },
    )
    .execute();

  const postRows = Array.from({ length: 240 }, (_, i) => {
    const idx = i + 1;
    const user = pick(actorUsers, i);
    const store = activeStores.length > 0 ? pick(activeStores, i) : null;
    const food = autoFoods.length > 0 ? pick(autoFoods, i) : null;
    const type = idx % 8 === 0 ? 'video' : idx % 5 === 0 ? 'review' : idx % 11 === 0 ? 'khuyen_mai' : 'bai_viet';

    return {
      id_nguoi_dang: Number(user.id),
      id_cua_hang: store ? Number(store.id) : null,
      loai_bai_viet: type,
      id_bai_viet_goc: null,
      id_mon_an: food ? Number(food.id) : null,
      id_don_hang: null,
      noi_dung: `${pick(POST_LONG_TEXTS, i)}\n\nGhi chú trải nghiệm #${idx}: mình đã thử ở cả giờ cao điểm và giờ thấp điểm để so sánh chất lượng dịch vụ.`,
      so_sao: type === 'review' ? Number((3 + (idx % 3) + 0.5).toFixed(1)) : null,
      muc_do_hien_thi: idx % 10 === 0 ? 'nguoi_theo_doi' : 'cong_khai',
      trang_thai_duyet: idx % 27 === 0 ? 'an' : 'hien_thi',
      tong_luot_xem: 50 + idx * 9,
      tong_luot_thich: 15 + idx * 4,
      tong_luot_binh_luan: 8 + idx * 2,
      tong_luot_chia_se: 2 + (idx % 15),
      tong_luot_luu: 1 + (idx % 7),
      ngay_dang: addMinutes(generatedPostStart, idx * 90),
    };
  });
  await postRepo.save(postRows);

  const autoPosts = await postRepo
    .createQueryBuilder('bv')
    .where('bv.id_nguoi_dang IN (:...ids)', {
      ids: actorUserIds.length > 0 ? actorUserIds : [0],
    })
    .andWhere('bv.ngay_dang BETWEEN :start AND :end', {
      start: generatedPostStart,
      end: generatedPostEnd,
    })
    .orderBy('bv.id', 'ASC')
    .getMany();

  await commentRepo
    .createQueryBuilder()
    .delete()
    .where(
      '(id_nguoi_binh_luan IN (:...ids) AND ngay_tao BETWEEN :start AND :end) OR noi_dung LIKE :legacyPrefix',
      {
        ids: actorUserIds.length > 0 ? actorUserIds : [0],
        start: generatedPostStart,
        end: generatedPostEnd,
        legacyPrefix: '[AUTO-SEED]%',
      },
    )
    .execute();

  const baseComments = Array.from({ length: 320 }, (_, i) => {
    const idx = i + 1;
    const post = pick(autoPosts, i);
    const user = pick(actorUsers, i + 9);
    return {
      id_bai_viet: Number(post.id),
      id_nguoi_binh_luan: Number(user.id),
      id_binh_luan_cha: null,
      noi_dung: `${pick(COMMENT_LONG_TEXTS, i)} (tham chiếu bài #${post.id})`,
      tong_luot_thich: idx % 12,
      trang_thai: idx % 31 === 0 ? 'an' : 'hien_thi',
      ngay_tao: addMinutes(generatedPostStart, idx * 50),
    };
  });
  await commentRepo.save(baseComments);

  const autoBaseComments = await commentRepo
    .createQueryBuilder('bl')
    .where('bl.id_nguoi_binh_luan IN (:...ids)', {
      ids: actorUserIds.length > 0 ? actorUserIds : [0],
    })
    .andWhere('bl.id_binh_luan_cha IS NULL')
    .andWhere('bl.ngay_tao BETWEEN :start AND :end', {
      start: generatedPostStart,
      end: generatedPostEnd,
    })
    .orderBy('bl.id', 'ASC')
    .getMany();

  const replyComments = Array.from({ length: 80 }, (_, i) => {
    const parent = pick(autoBaseComments, i);
    const user = pick(actorUsers, i + 17);
    return {
      id_bai_viet: Number(parent.id_bai_viet),
      id_nguoi_binh_luan: Number(user.id),
      id_binh_luan_cha: Number(parent.id),
      noi_dung: `Mình bổ sung thêm góc nhìn thực tế: ${pick(COMMENT_LONG_TEXTS, i + 1).toLowerCase()}`,
      tong_luot_thich: i % 6,
      trang_thai: 'hien_thi',
      ngay_tao: addMinutes(generatedPostStart, i * 45 + 10),
    };
  });
  await commentRepo.save(replyComments);

  const autoComments = await commentRepo
    .createQueryBuilder('bl')
    .where('bl.id_nguoi_binh_luan IN (:...ids)', {
      ids: actorUserIds.length > 0 ? actorUserIds : [0],
    })
    .andWhere('bl.ngay_tao BETWEEN :start AND :end', {
      start: generatedPostStart,
      end: generatedPostEnd,
    })
    .orderBy('bl.id', 'ASC')
    .getMany();

  // 6) Interaction + notification top-up
  if (hasTuongTacTable) {
    const interactionStart = new Date('2026-02-01T00:00:00');
    const interactionEnd = new Date('2026-02-03T00:00:00');
    await interactionRepo
      .createQueryBuilder()
      .delete()
      .where('ngay_tao BETWEEN :start AND :end', {
        start: interactionStart,
        end: interactionEnd,
      })
      .execute();

    const interactionRows = Array.from({ length: 560 }, (_, i) => {
      const idx = i + 1;
      const user = pick(activeUsers, i);
      const post = pick(autoPosts, i);
      const comment = pick(autoComments, i);
      const onComment = idx % 5 === 0;
      return {
        id_nguoi_dung: Number(user.id),
        id_bai_viet: onComment ? null : Number(post.id),
        id_binh_luan: onComment ? Number(comment.id) : null,
        loai_tuong_tac: idx % 7 === 0 ? 'chia_se' : idx % 4 === 0 ? 'luu' : 'thich',
        ngay_tao: addMinutes(interactionStart, idx * 3),
      };
    });
    await interactionRepo.save(interactionRows);
  }

  await notifRepo
    .createQueryBuilder()
    .delete()
    .where('id_nguoi_nhan IN (:...ids) OR tieu_de LIKE :legacyPrefix', {
      ids: actorUserIds.length > 0 ? actorUserIds : [0],
      legacyPrefix: '[AUTO-SEED]%',
    })
    .execute();

  const notifRows = actorUsers.flatMap((u, i) => [
    {
      id_nguoi_nhan: Number(u.id),
      loai_thong_bao: 'tuong_tac_bai_viet',
      loai_doi_tuong: 'bai_viet',
      id_doi_tuong: Number(pick(autoPosts, i).id),
      tieu_de: `Bạn có tương tác mới trên bài viết #${i + 1}`,
      noi_dung: 'Bài viết của bạn vừa nhận thêm lượt thích và bình luận mới.',
      da_doc: i % 2 === 0,
      thoi_gian_doc: i % 2 === 0 ? addMinutes(generatedPostStart, i * 30 + 6) : null,
      ngay_tao: addMinutes(generatedPostStart, i * 30),
    },
    {
      id_nguoi_nhan: Number(u.id),
      loai_thong_bao: 'he_thong',
      loai_doi_tuong: null,
      id_doi_tuong: null,
      tieu_de: `Thông báo hệ thống #${i + 1}`,
      noi_dung: 'Hệ thống vừa cập nhật chính sách vận hành và quy định cộng đồng.',
      da_doc: i % 3 === 0,
      thoi_gian_doc: i % 3 === 0 ? addMinutes(generatedPostStart, i * 30 + 18) : null,
      ngay_tao: addMinutes(generatedPostStart, i * 30 + 12),
    },
  ]);
  await notifRepo.save(notifRows);

  // 7) Order + detail + history + payment + review + cart top-up
  const autoOrderRows = await orderRepo
    .createQueryBuilder('dh')
    .where('dh.ma_don_hang LIKE :prefix', { prefix: 'AUTOORD%' })
    .getMany();
  const autoOrderIds = autoOrderRows.map((o) => Number(o.id));

  if (autoOrderIds.length > 0) {
    await orderPromoRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: autoOrderIds })
      .execute();
    await paymentRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: autoOrderIds })
      .execute();
    await orderHistoryRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: autoOrderIds })
      .execute();
    await orderDetailRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: autoOrderIds })
      .execute();
    await reviewRepo
      .createQueryBuilder()
      .delete()
      .where('id_don_hang IN (:...ids)', { ids: autoOrderIds })
      .execute();
    await orderRepo.delete(autoOrderIds);
  }

  const orderBuyers = activeUsers.filter((u) => !u.la_admin);
  const orderStores = activeStores.length > 0 ? activeStores : stores;
  const orderFoods = autoFoods.length > 0 ? autoFoods : await foodRepo.find({ take: 120 });

  const orderRows = Array.from({ length: 160 }, (_, i) => {
    const idx = i + 1;
    const buyer = pick(orderBuyers, i);
    const store = pick(orderStores, i);
    const status = pick(['cho_xac_nhan', 'dang_chuan_bi', 'dang_giao', 'da_giao', 'da_huy', 'tra_hang'], i);
    const source = pick(['truc_tiep', 'tim_kiem', 'khuyen_mai', 'bai_viet'], i);
    const paymentMethod = pick(['tien_mat', 'vnpay', 'vi_dien_tu', 'the'], i);
    const base = addMinutes(new Date('2026-03-01T08:00:00'), i * 90);
    const subtotal = 65000 + (idx % 6) * 20000;
    const shipping = 12000 + (idx % 4) * 3000;
    const discount = idx % 5 === 0 ? 20000 : idx % 3 === 0 ? 10000 : 0;
    const total = subtotal + shipping - discount;
    const platformFee = status === 'da_huy' || status === 'tra_hang' ? 0 : Math.round(total * 0.15);
    const creatorFee = source === 'bai_viet' && status !== 'da_huy' ? Math.round(total * 0.02) : 0;

    return {
      ma_don_hang: `AUTOORD${String(idx).padStart(4, '0')}`,
      id_nguoi_mua: Number(buyer.id),
      id_cua_hang: Number(store.id),
      nguoi_nhan: buyer.ten_hien_thi,
      so_dien_thoai_nhan: buyer.so_dien_thoai ?? randomPhone(2000 + idx),
      dia_chi_giao: buyer.dia_chi ?? `${idx} Seed Address`,
      nguon_don_hang: source,
      id_bai_viet_nguon: source === 'bai_viet' ? Number(pick(autoPosts, i).id) : null,
      id_nha_sang_tao_nguon: source === 'bai_viet' ? Number(pick(orderBuyers.filter((u) => u.la_nha_sang_tao), i).id) : null,
      phuong_thuc_thanh_toan: paymentMethod,
      trang_thai_don_hang: status,
      ly_do_huy: status === 'da_huy' ? 'Seed: khách đổi ý' : null,
      nguoi_huy: status === 'da_huy' ? (idx % 2 === 0 ? 'nguoi_mua' : 'cua_hang') : null,
      ly_do_tra_hang: status === 'tra_hang' ? 'Seed: hàng không đúng mô tả' : null,
      tam_tinh: subtotal,
      phi_van_chuyen: shipping,
      tong_giam_gia: discount,
      tong_thanh_toan: total,
      thu_nhap_cua_hang: status === 'da_huy' || status === 'tra_hang' ? 0 : total - platformFee - creatorFee,
      hoa_hong_nen_tang: platformFee,
      hoa_hong_nha_sang_tao: creatorFee,
      ghi_chu_tai_xe: idx % 7 === 0 ? 'Giao cổng phụ, gọi trước 5 phút.' : null,
      thoi_gian_dat: base,
      thoi_gian_xac_nhan: ['dang_chuan_bi', 'dang_giao', 'da_giao', 'tra_hang'].includes(status) ? addMinutes(base, 5) : null,
      thoi_gian_giao: ['dang_giao', 'da_giao', 'tra_hang'].includes(status) ? addMinutes(base, 25) : null,
      thoi_gian_hoan_tat: ['da_giao', 'tra_hang'].includes(status) ? addMinutes(base, 40) : null,
      thoi_gian_huy: status === 'da_huy' ? addMinutes(base, 12) : null,
    };
  });
  const autoOrders = await orderRepo.save(orderRows);

  const orderDetailRows = autoOrders.flatMap((order, i) => {
    const food1 = pick(orderFoods, i);
    const food2 = pick(orderFoods, i + 13);
    const qty1 = (i % 3) + 1;
    const qty2 = ((i + 1) % 2) + 1;
    const price1 = Number(food1.gia_ban);
    const price2 = Number(food2.gia_ban);

    return [
      {
        id_don_hang: Number(order.id),
        id_mon_an: Number(food1.id),
        ten_mon_snapshot: food1.ten_mon,
        hinh_anh_snapshot: food1.hinh_anh_dai_dien ?? null,
        don_gia: price1,
        so_luong: qty1,
        thanh_tien: price1 * qty1,
        topping_snapshot: JSON.stringify([{ ten: 'Auto Top Extra', gia: 7000, so_luong: 1 }]),
        ghi_chu: i % 4 === 0 ? 'Ít cay' : null,
      },
      {
        id_don_hang: Number(order.id),
        id_mon_an: Number(food2.id),
        ten_mon_snapshot: food2.ten_mon,
        hinh_anh_snapshot: food2.hinh_anh_dai_dien ?? null,
        don_gia: price2,
        so_luong: qty2,
        thanh_tien: price2 * qty2,
        topping_snapshot: null,
        ghi_chu: null,
      },
    ];
  });
  await orderDetailRepo.save(orderDetailRows);

  const orderHistoryRows = autoOrders.flatMap((order, i) => {
    const base = order.thoi_gian_dat;
    const byStoreOwner = Number(pick(orderStores, i).id_chu_so_huu);
    const rows: Array<Partial<LichSuDonHangEntity>> = [
      {
        id_don_hang: Number(order.id),
        trang_thai_tu: null,
        trang_thai_den: 'cho_xac_nhan',
        noi_dung: 'Tạo đơn hàng',
        id_nguoi_cap_nhat: Number(order.id_nguoi_mua),
        thoi_gian_cap_nhat: base,
      },
    ];

    if (order.trang_thai_don_hang !== 'cho_xac_nhan' && order.thoi_gian_xac_nhan) {
      rows.push({
        id_don_hang: Number(order.id),
        trang_thai_tu: 'cho_xac_nhan',
        trang_thai_den: 'dang_chuan_bi',
        noi_dung: 'Cửa hàng xác nhận và chuẩn bị món',
        id_nguoi_cap_nhat: byStoreOwner,
        thoi_gian_cap_nhat: order.thoi_gian_xac_nhan,
      });
    }

    if (order.trang_thai_don_hang === 'dang_giao' || order.trang_thai_don_hang === 'da_giao' || order.trang_thai_don_hang === 'tra_hang') {
      rows.push({
        id_don_hang: Number(order.id),
        trang_thai_tu: 'dang_chuan_bi',
        trang_thai_den: 'dang_giao',
        noi_dung: 'Shipper đang giao đơn',
        id_nguoi_cap_nhat: byStoreOwner,
        thoi_gian_cap_nhat: order.thoi_gian_giao ?? addMinutes(base, 25),
      });
    }

    if (order.trang_thai_don_hang === 'da_giao') {
      rows.push({
        id_don_hang: Number(order.id),
        trang_thai_tu: 'dang_giao',
        trang_thai_den: 'da_giao',
        noi_dung: 'Đơn giao thành công',
        id_nguoi_cap_nhat: Number(order.id_nguoi_mua),
        thoi_gian_cap_nhat: order.thoi_gian_hoan_tat ?? addMinutes(base, 40),
      });
    }

    if (order.trang_thai_don_hang === 'da_huy') {
      rows.push({
        id_don_hang: Number(order.id),
        trang_thai_tu: 'cho_xac_nhan',
        trang_thai_den: 'da_huy',
        noi_dung: order.ly_do_huy ?? 'Đơn bị hủy',
        id_nguoi_cap_nhat: Number(order.id_nguoi_mua),
        thoi_gian_cap_nhat: order.thoi_gian_huy ?? addMinutes(base, 12),
      });
    }

    if (order.trang_thai_don_hang === 'tra_hang') {
      rows.push({
        id_don_hang: Number(order.id),
        trang_thai_tu: 'da_giao',
        trang_thai_den: 'tra_hang',
        noi_dung: order.ly_do_tra_hang ?? 'Yêu cầu trả hàng',
        id_nguoi_cap_nhat: Number(order.id_nguoi_mua),
        thoi_gian_cap_nhat: addMinutes(order.thoi_gian_hoan_tat ?? addMinutes(base, 40), 30),
      });
    }

    return rows;
  });
  await orderHistoryRepo.save(orderHistoryRows);

  const paymentRows = autoOrders.map((order) => {
    const paidAt = order.thoi_gian_xac_nhan ?? addMinutes(order.thoi_gian_dat, 3);
    const cong = order.phuong_thuc_thanh_toan === 'vnpay' ? 'vnpay' : order.phuong_thuc_thanh_toan === 'vi_dien_tu' ? 'momo' : order.phuong_thuc_thanh_toan === 'the' ? 'khac' : null;
    const status = order.trang_thai_don_hang === 'da_huy' && order.phuong_thuc_thanh_toan === 'tien_mat'
      ? 'that_bai'
      : order.trang_thai_don_hang === 'da_huy' && order.phuong_thuc_thanh_toan !== 'tien_mat'
        ? 'da_hoan_tien'
        : 'thanh_cong';

    return {
      id_don_hang: Number(order.id),
      cong_thanh_toan: cong,
      ma_giao_dich: order.phuong_thuc_thanh_toan === 'tien_mat' ? null : `AUTO-PAY-${order.ma_don_hang}`,
      phuong_thuc_thanh_toan: order.phuong_thuc_thanh_toan,
      so_tien: Number(order.tong_thanh_toan),
      trang_thai_thanh_toan: status,
      thoi_gian_thanh_toan: paidAt,
      so_tien_hoan_tien: status === 'da_hoan_tien' ? Number(order.tong_thanh_toan) : null,
      thoi_gian_hoan_tien: status === 'da_hoan_tien' ? addMinutes(paidAt, 10) : null,
      noi_dung_loi: status === 'that_bai' ? 'Đơn tiền mặt đã hủy trước thanh toán' : null,
      ngay_tao: order.thoi_gian_dat,
    };
  });
  await paymentRepo.save(paymentRows);

  const deliveredOrders = autoOrders.filter((o) => o.trang_thai_don_hang === 'da_giao');
  const reviewRows = deliveredOrders.slice(0, 100).map((order, i) => ({
    id_don_hang: Number(order.id),
    id_nguoi_danh_gia: Number(order.id_nguoi_mua),
    id_cua_hang: Number(order.id_cua_hang),
    id_mon_an: Number(pick(orderFoods, i).id),
    so_sao: Number((3 + (i % 3) + 0.5).toFixed(1)),
    noi_dung: `${pick(REVIEW_LONG_TEXTS, i)}\nMã tham chiếu đơn: ${order.ma_don_hang}.`,
    an_danh: i % 9 === 0 ? 1 : 0,
    tong_luot_thich: i % 25,
    ngay_tao: addMinutes(order.thoi_gian_hoan_tat ?? order.thoi_gian_dat, 60),
  }));
  const savedReviews = await reviewRepo.save(reviewRows);

  await attachmentRepo
    .createQueryBuilder()
    .delete()
    .where('loai_doi_tuong = :loai', { loai: 'danh_gia' })
    .andWhere('ghi_chu LIKE :prefix', { prefix: '[AUTO-SEED]%' })
    .execute();

  const reviewAttachments = savedReviews.map((review, i) => ({
    loai_doi_tuong: 'danh_gia',
    id_doi_tuong: Number(review.id),
    loai_tep: 'hinh_anh',
    duong_dan_tep: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=80&sig=${i + 1}`,
    thu_tu_hien_thi: 1,
    ghi_chu: `[AUTO-SEED] Ảnh minh họa đánh giá ${i + 1}`,
    ngay_tao: review.ngay_tao,
  }));
  await attachmentRepo.save(reviewAttachments);

  await cartRepo
    .createQueryBuilder()
    .delete()
    .where('ghi_chu LIKE :prefix', { prefix: '[AUTO-SEED]%' })
    .execute();

  const cartUsers = actorUsers.slice(0, 60);
  const cartRows = cartUsers.flatMap((user, i) => {
    const foodA = pick(orderFoods, i);
    const foodB = pick(orderFoods, i + 5);
    return [
      {
        id_nguoi_dung: Number(user.id),
        id_cua_hang: Number(foodA.id_cua_hang),
        id_mon_an: Number(foodA.id),
        so_luong: (i % 3) + 1,
    ghi_chu: 'Ít cay, ưu tiên đóng gói riêng nước dùng.',
        duoc_chon: true,
        gia_tai_thoi_diem_them: Number(foodA.gia_ban),
        ngay_tao: addMinutes(now, -(i * 5 + 10)),
        ngay_cap_nhat: addMinutes(now, -(i * 5 + 7)),
      },
      {
        id_nguoi_dung: Number(user.id),
        id_cua_hang: Number(foodB.id_cua_hang),
        id_mon_an: Number(foodB.id),
        so_luong: 1,
        ghi_chu: 'Không hành, thêm muỗng và khăn giấy.',
        duoc_chon: i % 2 === 0,
        gia_tai_thoi_diem_them: Number(foodB.gia_ban),
        ngay_tao: addMinutes(now, -(i * 5 + 9)),
        ngay_cap_nhat: addMinutes(now, -(i * 5 + 6)),
      },
    ];
  });
  const uniqueCartRows = Array.from(
    new Map(
      cartRows.map((row) => [
        `${row.id_nguoi_dung}-${row.id_cua_hang}-${row.id_mon_an}`,
        row,
      ]),
    ).values(),
  );
  await cartRepo.upsert(uniqueCartRows, [
    'id_nguoi_dung',
    'id_cua_hang',
    'id_mon_an',
  ]);

  // 8) Promotion + order-promo top-up
  await promoRepo
    .createQueryBuilder()
    .delete()
    .where('ma_khuyen_mai LIKE :prefix', { prefix: 'AUTOKM%' })
    .execute();

  const promoRows = Array.from({ length: 90 }, (_, i) => {
    const idx = i + 1;
    const isSystem = idx <= 30;
    const store = !isSystem ? pick(orderStores, i) : null;
    const kind = pick(['phan_tram', 'so_tien', 'mien_phi_van_chuyen'], i);
    const start = addMinutes(new Date('2026-03-01T00:00:00'), idx * 120);
    const end = addMinutes(start, 60 * 24 * 10);
    const status = idx % 7 === 0 ? 'tam_dung' : idx % 5 === 0 ? 'da_ket_thuc' : idx % 4 === 0 ? 'sap_dien_ra' : 'dang_dien_ra';

    return {
      pham_vi_ap_dung: isSystem ? 'he_thong' : 'cua_hang',
      id_cua_hang: store ? Number(store.id) : null,
      ten_khuyen_mai: `Ưu đãi theo khung giờ ${idx}`,
      ma_khuyen_mai: `AUTOKM${String(idx).padStart(3, '0')}`,
      loai_khuyen_mai: kind,
      gia_tri_khuyen_mai: kind === 'phan_tram' ? 10 + (idx % 20) : kind === 'so_tien' ? 10000 + (idx % 8) * 5000 : 0,
      gia_tri_toi_da: kind === 'phan_tram' ? 50000 : null,
      don_hang_toi_thieu: 50000 + (idx % 6) * 20000,
      so_luot_toi_da: 100 + (idx % 9) * 20,
      so_luot_da_dung: idx % 60,
      thoi_gian_bat_dau: start,
      thoi_gian_ket_thuc: end,
      trang_thai: status,
      mo_ta: `Chương trình ưu đãi áp dụng theo điều kiện đơn hàng và khu vực phục vụ, cập nhật tự động theo trạng thái chiến dịch.`,
    };
  });
  const promos = await promoRepo.save(promoRows);

  await orderPromoRepo
    .createQueryBuilder()
    .delete()
    .where('ma_khuyen_mai_snapshot LIKE :prefix', { prefix: 'AUTOKM%' })
    .execute();

  const promoLinks = autoOrders.slice(0, 120).map((order, i) => {
    const promo = pick(promos, i);
    return {
      id_don_hang: Number(order.id),
      id_khuyen_mai: Number(promo.id),
      ma_khuyen_mai_snapshot: promo.ma_khuyen_mai,
      so_tien_giam: Number(order.tong_giam_gia || 0),
    };
  });
  await orderPromoRepo.save(promoLinks);

  // 9) Support + upgrade + report + attachment + log top-up
  await supportRepo
    .createQueryBuilder()
    .delete()
    .where('ma_yeu_cau LIKE :prefix', { prefix: 'HTAUTO%' })
    .execute();

  const supportRows = Array.from({ length: 130 }, (_, i) => {
    const idx = i + 1;
    const sender = pick(actorUsers, i);
    const replied = idx % 3 === 0;
    const sentAt = addMinutes(new Date('2026-03-01T09:00:00'), idx * 30);
    return {
      ma_yeu_cau: `HTAUTO${String(idx).padStart(4, '0')}`,
      id_nguoi_gui: Number(sender.id),
      chu_de: pick(['Đơn hàng', 'Thanh toán', 'Khuyến mãi', 'Tài khoản', 'Vận chuyển'], i),
      noi_dung_yeu_cau: pick(SUPPORT_TEXTS, i),
      trang_thai: replied ? 'da_phan_hoi' : 'chua_phan_hoi',
      id_admin_phan_hoi: replied ? Number(pick(users.filter((u) => u.la_admin), 0).id) : null,
      noi_dung_phan_hoi: replied
        ? 'Đội ngũ đã kiểm tra log giao dịch, đối soát dữ liệu và đồng bộ lại trạng thái. Vui lòng kiểm tra lại trong phiên bản mới nhất của ứng dụng.'
        : null,
      thoi_gian_gui: sentAt,
      thoi_gian_phan_hoi: replied ? addMinutes(sentAt, 120) : null,
    };
  });
  await supportRepo.save(supportRows);

  await upgradeRepo
    .createQueryBuilder()
    .delete()
    .where(
      'id_nguoi_gui IN (:...ids) OR ly_do_yeu_cau LIKE :legacyPrefix',
      {
        ids: actorUserIds.length > 0 ? actorUserIds : [0],
        legacyPrefix: '[AUTO-SEED]%',
      },
    )
    .execute();

  const admin = users.find((u) => u.la_admin);
  const upgradeRows = Array.from({ length: 130 }, (_, i) => {
    const idx = i + 1;
    const sender = pick(actorUsers, i);
    const type = idx % 2 === 0 ? 'mo_cua_hang' : 'kiem_tien_noi_dung';
    const status = idx % 5 === 0 ? 'da_tu_choi' : idx % 3 === 0 ? 'da_duyet' : 'cho_duyet';
    const sentAt = addMinutes(new Date('2026-03-05T08:00:00'), idx * 45);

    return {
      id_nguoi_gui: Number(sender.id),
      loai_yeu_cau: type,
      trang_thai: status,
      thoi_gian_gui: sentAt,
      ly_do_yeu_cau:
        type === 'mo_cua_hang'
          ? 'Tôi muốn mở cửa hàng để kinh doanh ổn định trên nền tảng, đã chuẩn bị thông tin pháp lý và kế hoạch vận hành theo khung giờ cao điểm.'
          : 'Tôi muốn tham gia chương trình kiếm tiền từ nội dung, cam kết xuất bản review trung thực, có ảnh/video minh chứng rõ ràng và tuân thủ quy định cộng đồng.',
      so_cccd: type === 'mo_cua_hang' ? `0792${String(100000 + idx)}` : null,
      ten_cua_hang_de_xuat: type === 'mo_cua_hang' ? `Cửa hàng đề xuất ${idx}` : null,
      so_dien_thoai_lien_he: type === 'mo_cua_hang' ? randomPhone(3000 + idx) : null,
      dia_chi_kinh_doanh: type === 'mo_cua_hang' ? `${idx} Seed Business Address` : null,
      danh_muc_kinh_doanh: type === 'mo_cua_hang' ? 'Ẩm thực tổng hợp' : null,
      gio_mo_cua: type === 'mo_cua_hang' ? '07:00:00' : null,
      gio_dong_cua: type === 'mo_cua_hang' ? '22:00:00' : null,
      ten_kenh: type === 'kiem_tien_noi_dung' ? `Kênh seed ${idx}` : null,
      mo_ta_kenh: type === 'kiem_tien_noi_dung' ? 'Kênh tập trung review quán ăn địa phương, so sánh chất lượng món theo nhiều khung giá và chia sẻ trải nghiệm thực tế.' : null,
      tong_bai_dang: type === 'kiem_tien_noi_dung' ? 20 + idx : null,
      tong_nguoi_theo_doi: type === 'kiem_tien_noi_dung' ? 1000 + idx * 8 : null,
      id_admin_xu_ly: status === 'cho_duyet' ? null : Number(admin?.id ?? null),
      ly_do_tu_choi: status === 'da_tu_choi' ? 'Hồ sơ còn thiếu minh chứng hoạt động và thông tin xác thực chưa đồng nhất.' : null,
      thoi_gian_xu_ly: status === 'cho_duyet' ? null : addMinutes(sentAt, 240),
    };
  });
  const upgradeRequests = await upgradeRepo.save(upgradeRows);

  const reportCandidatesPost = autoPosts.slice(0, 60);
  const reportCandidatesComment = autoComments.slice(0, 40);

  await reportRepo
    .createQueryBuilder()
    .delete()
    .where('ma_bao_cao LIKE :prefix', { prefix: 'BCAUTO%' })
    .execute();

  const reportRows = Array.from({ length: 130 }, (_, i) => {
    const idx = i + 1;
    const reporter = pick(orderBuyers, i);
    const offender = pick(orderBuyers, i + 11);
    const type = idx % 3 === 0 ? 'binh_luan' : idx % 2 === 0 ? 'bai_viet' : 'nguoi_dung';
    const target = type === 'bai_viet'
      ? Number(pick(reportCandidatesPost, i).id)
      : type === 'binh_luan'
        ? Number(pick(reportCandidatesComment, i).id)
        : Number(offender.id);
    const status = idx % 4 === 0 ? 'da_xu_ly' : 'cho_xu_ly';
    const reportedAt = addMinutes(new Date('2026-03-10T09:00:00'), idx * 40);

    return {
      ma_bao_cao: `BCAUTO${String(idx).padStart(4, '0')}`,
      id_nguoi_bao_cao: Number(reporter.id),
      loai_doi_tuong_bi_bao_cao: type,
      id_doi_tuong_bi_bao_cao: target,
      id_nguoi_vi_pham: Number(offender.id),
      loai_vi_pham: pick(['Spam', 'Nội dung sai sự thật', 'Ngôn từ công kích', 'Lừa đảo'], i),
      noi_dung_bao_cao: pick(REPORT_TEXTS, i),
      bang_chung_text: idx % 5 === 0 ? null : 'Đã cung cấp ảnh chụp màn hình, thời điểm phát sinh và mã đối tượng để đối soát.',
      trang_thai: status,
      muc_do_vi_pham: status === 'da_xu_ly' ? pick(['nhe', 'trung_binh', 'nghiem_trong'], i) : null,
      ket_qua_xu_ly: status === 'da_xu_ly' ? pick(['Gỡ nội dung', 'Gửi cảnh báo', 'Từ chối báo cáo'], i) : null,
      hanh_dong_ap_dung: status === 'da_xu_ly' ? JSON.stringify(['gui_canh_bao']) : null,
      gui_canh_bao: status === 'da_xu_ly' ? i % 2 === 0 : false,
      id_admin_xu_ly: status === 'da_xu_ly' ? Number(admin?.id ?? null) : null,
      thoi_gian_bao_cao: reportedAt,
      thoi_gian_xu_ly: status === 'da_xu_ly' ? addMinutes(reportedAt, 180) : null,
    };
  });
  const reports = await reportRepo.save(reportRows);

  await attachmentRepo
    .createQueryBuilder()
    .delete()
    .where('loai_doi_tuong = :loai', { loai: 'bao_cao' })
    .andWhere('ghi_chu LIKE :prefix', { prefix: '[AUTO-SEED]%' })
    .execute();

  const reportAttachments = reports.slice(0, 130).map((report, i) => ({
    loai_doi_tuong: 'bao_cao',
    id_doi_tuong: Number(report.id),
    loai_tep: i % 4 === 0 ? 'video' : 'hinh_anh',
    duong_dan_tep: i % 4 === 0
      ? `https://example.com/auto-seed/report-${report.ma_bao_cao}`
      : `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=640&q=80&sig=${i + 1}`,
    thu_tu_hien_thi: 1,
    ghi_chu: `[AUTO-SEED] Minh chứng báo cáo #${i + 1}`,
    ngay_tao: report.thoi_gian_bao_cao,
  }));
  await attachmentRepo.save(reportAttachments);

  await logRepo
    .createQueryBuilder()
    .delete()
    .where('ngay_tao BETWEEN :start AND :end', {
      start: new Date('2026-03-01T00:00:00'),
      end: new Date('2026-05-01T00:00:00'),
    })
    .andWhere('(dia_chi_ip LIKE :ipA OR dia_chi_ip LIKE :ipB)', {
      ipA: '10.10.0.%',
      ipB: '10.20.0.%',
    })
    .execute();

  const logRows = [
    ...upgradeRequests.map((req, i) => ({
      id_nguoi_thuc_hien: Number(req.id_nguoi_gui),
      loai_doi_tuong: 'yeu_cau_nang_cap',
      id_doi_tuong: Number(req.id),
      hanh_dong: req.trang_thai === 'cho_duyet' ? 'gui_yeu_cau' : req.trang_thai === 'da_duyet' ? 'phe_duyet' : 'tu_choi',
      noi_dung: `Hệ thống ghi nhận cập nhật yêu cầu nâng cấp #${i + 1}`,
      du_lieu_cu: null,
      du_lieu_moi: { trang_thai: req.trang_thai },
      dia_chi_ip: `10.10.0.${(i % 200) + 1}`,
      ngay_tao: addMinutes(new Date('2026-03-01T00:00:00'), i * 15),
    })),
    ...reports.map((report, i) => ({
      id_nguoi_thuc_hien: Number(report.id_nguoi_bao_cao),
      loai_doi_tuong: 'bao_cao',
      id_doi_tuong: Number(report.id),
      hanh_dong: report.trang_thai === 'da_xu_ly' ? 'xu_ly_bao_cao' : 'gui_bao_cao',
      noi_dung: `Hệ thống ghi nhận cập nhật báo cáo #${i + 1}`,
      du_lieu_cu: null,
      du_lieu_moi: { trang_thai: report.trang_thai },
      dia_chi_ip: `10.20.0.${(i % 200) + 1}`,
      ngay_tao: addMinutes(new Date('2026-03-02T00:00:00'), i * 12),
    })),
  ];
  await logRepo.save(logRows.slice(0, 320));

  // 10) Auth social/message top-up
  await otpRepo
    .createQueryBuilder()
    .delete()
    .where('dich_danh_nhan LIKE :prefix', { prefix: 'bulk+%' })
    .execute();

  const otpRows = actorUsers.slice(0, 80).flatMap((user, i) => {
    const base = addMinutes(new Date('2026-03-01T07:00:00'), i * 50);
    return [
      {
        id_nguoi_dung: Number(user.id),
        loai_xac_thuc: 'quen_mat_khau',
        kenh_gui: 'email',
        dich_danh_nhan: `bulk+${user.email}`,
        ma_xac_thuc: `${900000 + i}`,
        thoi_gian_het_han: addMinutes(base, 60),
        thoi_gian_xac_nhan: i % 2 === 0 ? addMinutes(base, 5) : null,
        so_lan_gui: 1 + (i % 3),
        trang_thai: i % 2 === 0 ? 'da_dung' : i % 3 === 0 ? 'het_han' : 'hieu_luc',
        ngay_tao: base,
      },
      {
        id_nguoi_dung: Number(user.id),
        loai_xac_thuc: 'xac_thuc_email',
        kenh_gui: 'email',
        dich_danh_nhan: `bulk+${user.email}`,
        ma_xac_thuc: `${910000 + i}`,
        thoi_gian_het_han: addMinutes(base, 120),
        thoi_gian_xac_nhan: i % 4 === 0 ? addMinutes(base, 15) : null,
        so_lan_gui: 2,
        trang_thai: i % 4 === 0 ? 'da_dung' : 'hieu_luc',
        ngay_tao: addMinutes(base, 10),
      },
    ];
  });
  await otpRepo.save(otpRows);

  await sessionRepo
    .createQueryBuilder()
    .delete()
    .where('token_phien LIKE :prefix', { prefix: 'auto-session-%' })
    .orWhere('token_lam_moi LIKE :prefix2', { prefix2: 'auto-refresh-%' })
    .execute();

  const sessionRows = Array.from({ length: 160 }, (_, i) => {
    const user = pick(actorUsers, i);
    return {
      id_nguoi_dung: Number(user.id),
      vai_tro_dang_nhap: user.la_admin
        ? 'admin'
        : user.la_chu_cua_hang
          ? 'chu_cua_hang'
          : user.la_nha_sang_tao
            ? 'nha_sang_tao'
            : 'nguoi_dung',
      token_phien: `auto-session-${user.id}-${i}`,
      token_lam_moi: `auto-refresh-${user.id}-${i}`,
      thiet_bi: i % 2 === 0 ? 'Chrome macOS' : 'iOS Safari',
      dia_chi_ip: `172.16.0.${(i % 200) + 1}`,
      ghi_nho_dang_nhap: i % 2 === 0,
      het_han_luc: addMinutes(now, 60 * 24 * 14),
      lan_hoat_dong_cuoi: addMinutes(now, -(i * 2)),
      ngay_tao: addMinutes(now, -(i * 20 + 60)),
    };
  });
  await sessionRepo.save(sessionRows);

  const relationRows: Array<Partial<QuanHeNguoiDungEntity>> = [];
  const relUsers = actorUsers.slice(0, 80);
  for (let i = 0; i < relUsers.length; i += 1) {
    const a = Number(relUsers[i].id);
    const b = Number(relUsers[(i + 1) % relUsers.length].id);
    const c = Number(relUsers[(i + 2) % relUsers.length].id);
    relationRows.push(
      {
        id_nguoi_tao_quan_he: a,
        id_nguoi_nhan_quan_he: b,
        loai_quan_he: 'theo_doi',
        trang_thai: 'hieu_luc',
        ngay_tao: addMinutes(new Date('2026-03-01T00:00:00'), i * 10),
      },
      {
        id_nguoi_tao_quan_he: b,
        id_nguoi_nhan_quan_he: a,
        loai_quan_he: 'theo_doi',
        trang_thai: 'hieu_luc',
        ngay_tao: addMinutes(new Date('2026-03-01T00:00:00'), i * 10 + 2),
      },
      {
        id_nguoi_tao_quan_he: a,
        id_nguoi_nhan_quan_he: c,
        loai_quan_he: 'chan',
        trang_thai: i % 5 === 0 ? 'hieu_luc' : 'da_tu_choi',
        ngay_tao: addMinutes(new Date('2026-03-01T00:00:00'), i * 10 + 4),
      },
    );
  }
  await relationRepo.upsert(relationRows as QuanHeNguoiDungEntity[], [
    'id_nguoi_tao_quan_he',
    'id_nguoi_nhan_quan_he',
    'loai_quan_he',
  ]);

  const roomPairs = actorUsers.slice(0, 120).map((u, i) => {
    const a = Number(u.id);
    const b = Number(actorUsers[(i + 7) % actorUsers.length].id);
    return a < b ? [a, b] : [b, a];
  });

  await messageRepo
    .createQueryBuilder()
    .delete()
    .where('thoi_gian_gui BETWEEN :start AND :end OR noi_dung LIKE :legacyPrefix', {
      start: generatedPostStart,
      end: generatedPostEnd,
      legacyPrefix: '[AUTO-SEED]%',
    })
    .execute();

  const roomSeedRows = roomPairs.map((pair, i) => ({
    id_nguoi_dung_a: pair[0],
    id_nguoi_dung_b: pair[1],
    tin_nhan_cuoi: `Mình đã gửi thêm thông tin đơn hàng để bạn tiện theo dõi.`,
    thoi_gian_tin_nhan_cuoi: addMinutes(generatedPostStart, i * 30 + 20),
    ngay_tao: addMinutes(generatedPostStart, i * 30),
  }));
  await roomRepo.upsert(roomSeedRows, ['id_nguoi_dung_a', 'id_nguoi_dung_b']);
  const rooms = await roomRepo.find({
    where: roomSeedRows.map((row) => ({
      id_nguoi_dung_a: row.id_nguoi_dung_a,
      id_nguoi_dung_b: row.id_nguoi_dung_b,
    })),
  });

  const messageRows = rooms.flatMap((room, i) => {
    const senderA = Number(room.id_nguoi_dung_a);
    const senderB = Number(room.id_nguoi_dung_b);
    const base = addMinutes(generatedPostStart, i * 30 + 5);

    return [
      {
        id_cuoc_tro_chuyen: Number(room.id),
        id_nguoi_gui: senderA,
        noi_dung: 'Chào bạn, mình vừa xem review và muốn hỏi thêm về khẩu phần thực tế khi đặt giao tận nơi.',
        loai_tin_nhan: 'van_ban',
        thoi_gian_gui: base,
        thoi_gian_xem: addMinutes(base, 2),
        da_thu_hoi: false,
      },
      {
        id_cuoc_tro_chuyen: Number(room.id),
        id_nguoi_gui: senderB,
        noi_dung: 'Mình đã thử 2 lần trong tuần này, chất lượng ổn nhưng giờ cao điểm nên đặt sớm hơn khoảng 20 phút.',
        loai_tin_nhan: i % 5 === 0 ? 'hinh_anh' : 'van_ban',
        thoi_gian_gui: addMinutes(base, 5),
        thoi_gian_xem: i % 3 === 0 ? null : addMinutes(base, 8),
        da_thu_hoi: i % 17 === 0,
      },
      {
        id_cuoc_tro_chuyen: Number(room.id),
        id_nguoi_gui: senderA,
        noi_dung: 'Cảm ơn bạn, mình sẽ cập nhật lại sau khi đặt thêm để đối chiếu chất lượng giữa các khung giờ.',
        loai_tin_nhan: 'van_ban',
        thoi_gian_gui: addMinutes(base, 11),
        thoi_gian_xem: null,
        da_thu_hoi: false,
      },
    ];
  });
  await messageRepo.save(messageRows);

  // Report current size summary for quick visibility in logs.
  const summary = {
    nguoi_dung: await userRepo.count(),
    cua_hang: await storeRepo.count(),
    mon_an: await foodRepo.count(),
    don_hang: await orderRepo.count(),
    bai_viet: await postRepo.count(),
    khuyen_mai: await promoRepo.count(),
    binh_luan: await commentRepo.count(),
    topping: await toppingRepo.count(),
    yeu_cau_ho_tro: await supportRepo.count(),
    yeu_cau_nang_cap: await upgradeRepo.count(),
    bao_cao: await reportRepo.count(),
    ma_xac_thuc: await otpRepo.count(),
    phien_dang_nhap: await sessionRepo.count(),
    tuong_tac: hasTuongTacTable ? await interactionRepo.count() : -1,
    thong_bao: await notifRepo.count(),
    tin_nhan: await messageRepo.count(),
    nhat_ky_he_thong: await logRepo.count(),
  };

  console.log('[seedScaleData] Summary:', summary);
  console.log('[seedScaleData] Targets:', { TARGET_MAIN, TARGET_SUB });
}
