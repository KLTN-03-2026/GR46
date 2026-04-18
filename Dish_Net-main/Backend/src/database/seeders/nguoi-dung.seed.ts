import { hash } from "bcrypt";
import { NguoiDungEntity } from "../../Api/Auth/entities/nguoi-dung.entity";
import type { SeederContext } from "./context";

export async function seedNguoiDung(context: SeederContext) {
  const repo = context.dataSource.getRepository(NguoiDungEntity);
  const now = new Date();
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  const defaultPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await hash(defaultPassword, saltRounds);

  await repo.upsert(
    [
      {
        ten_dang_nhap: "admin",
        email: "admin@dishnet.vn",
        mat_khau_bam: passwordHash,
        ten_hien_thi: "Admin DishNet",
        la_admin: true,
        la_nha_sang_tao: false,
        la_chu_cua_hang: false,
        trang_thai_tai_khoan: "hoat_dong",
        nguon_dang_ky: "admin_tao",
        thoi_gian_xac_thuc_email: now,
        diem_uy_tin: 5.0,
        anh_dai_dien: "https://i.pravatar.cc/150?img=1",
      },
      {
        ten_dang_nhap: "user_demo",
        email: "user@dishnet.vn",
        mat_khau_bam: passwordHash,
        ten_hien_thi: "Người Dùng Demo",
        la_admin: false,
        la_nha_sang_tao: false,
        la_chu_cua_hang: false,
        trang_thai_tai_khoan: "hoat_dong",
        nguon_dang_ky: "email",
        thoi_gian_xac_thuc_email: now,
        diem_uy_tin: 4.5,
        so_dien_thoai: "0901234567",
        anh_dai_dien: "https://i.pravatar.cc/150?img=2",
      },
      {
        ten_dang_nhap: "khoa_pug_tv",
        email: "creator@dishnet.vn",
        mat_khau_bam: passwordHash,
        ten_hien_thi: "Khoa Pug TV",
        la_admin: false,
        la_nha_sang_tao: true,
        la_chu_cua_hang: false,
        trang_thai_tai_khoan: "hoat_dong",
        nguon_dang_ky: "google",
        thoi_gian_xac_thuc_email: now,
        diem_uy_tin: 4.9,
        anh_dai_dien: "https://i.pravatar.cc/150?img=3",
      },
      {
        ten_dang_nhap: "nethue_store",
        email: "store@dishnet.vn",
        mat_khau_bam: passwordHash,
        ten_hien_thi: "Nét Huế - Hàng Bông",
        la_admin: false,
        la_nha_sang_tao: false,
        la_chu_cua_hang: true,
        trang_thai_tai_khoan: "hoat_dong",
        nguon_dang_ky: "email",
        thoi_gian_xac_thuc_email: now,
        diem_uy_tin: 4.6,
        dia_chi: "40 Nguyễn Như Hạnh, Hòa Khánh, ĐN",
        anh_dai_dien: "https://i.pravatar.cc/150?img=4",
      },
      {
        ten_dang_nhap: "user_locked",
        email: "locked@dishnet.vn",
        mat_khau_bam: passwordHash,
        ten_hien_thi: "Kẻ Gây Rối",
        la_admin: false,
        la_nha_sang_tao: false,
        la_chu_cua_hang: false,
        trang_thai_tai_khoan: "bi_khoa",
        ly_do_khoa_hien_tai: "Vi phạm cộng đồng: spam bình luận",
        nguon_dang_ky: "email",
        thoi_gian_xac_thuc_email: now,
        diem_uy_tin: 1.2,
        anh_dai_dien: "https://i.pravatar.cc/150?img=5",
      },
      {
        ten_dang_nhap: "multi_role",
        email: "multi@dishnet.vn",
        mat_khau_bam: passwordHash,
        ten_hien_thi: "Vừa Review Vừa Bán Đồ Ăn",
        la_admin: false,
        la_nha_sang_tao: true,
        la_chu_cua_hang: true,
        trang_thai_tai_khoan: "hoat_dong",
        nguon_dang_ky: "email",
        thoi_gian_xac_thuc_email: now,
        diem_uy_tin: 4.8,
        anh_dai_dien: "https://i.pravatar.cc/150?img=6",
      },
    ],
    ["email"],
  );

  const users = await repo.find();
  context.userByEmail = new Map(users.map((user) => [user.email, user]));

  return {
    defaultPassword,
  };
}
