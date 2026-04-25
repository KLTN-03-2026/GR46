import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("nguoi_dung")
export class NguoiDungEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  ten_dang_nhap: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  so_dien_thoai: string | null;

  @Column({ type: "text" })
  mat_khau_bam: string;

  @Column({ type: "varchar", length: 120 })
  ten_hien_thi: string;

  @Column({ type: "text", nullable: true })
  anh_dai_dien: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  gioi_tinh: string | null;

  @Column({ type: "date", nullable: true })
  ngay_sinh: Date | null;

  @Column({ type: "text", nullable: true })
  tieu_su: string | null;

  @Column({ type: "text", nullable: true })
  dia_chi: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  khu_vuc: string | null;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  vi_do: number | null;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  kinh_do: number | null;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
  diem_uy_tin: number;

  @Column({ type: "tinyint", width: 1, default: 1 })
  cho_hien_thi_huy_hieu: boolean;

  @Column({ type: "tinyint", width: 1, default: 1 })
  cho_hien_thi_diem_uy_tin: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  la_tai_khoan_rieng_tu: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  la_admin: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  la_nha_sang_tao: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  la_chu_cua_hang: boolean;

  @Column({ type: "varchar", length: 20, default: "hoat_dong" })
  trang_thai_tai_khoan: string;

  @Column({ type: "text", nullable: true })
  ly_do_khoa_hien_tai: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  kieu_khoa_tai_khoan: string | null;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_mo_khoa: Date | null;

  @Column({ type: "varchar", length: 20, default: "email" })
  nguon_dang_ky: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  ma_nguon_ngoai: string | null;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_xac_thuc_email: Date | null;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_xac_thuc_so_dien_thoai: Date | null;

  @Column({ type: "datetime", nullable: true })
  lan_dang_nhap_cuoi: Date | null;

  @CreateDateColumn({ type: "datetime" })
  ngay_tao: Date;

  @UpdateDateColumn({ type: "datetime" })
  ngay_cap_nhat: Date;
}
