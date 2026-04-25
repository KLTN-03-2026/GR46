import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cua_hang")
export class CuaHangEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_chu_so_huu: number;

  @Column({ type: "varchar", length: 255 })
  ten_cua_hang: string;

  @Column({ type: "varchar", length: 255 })
  slug: string;

  @Column({ type: "text", nullable: true })
  mo_ta: string | null;

  @Column({ type: "text", nullable: true })
  anh_dai_dien: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  so_dien_thoai_lien_he: string | null;

  @Column({ type: "text" })
  dia_chi_kinh_doanh: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  khu_vuc: string | null;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  vi_do: number | null;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  kinh_do: number | null;

  @Column({ type: "time", nullable: true })
  gio_mo_cua: string | null;

  @Column({ type: "time", nullable: true })
  gio_dong_cua: string | null;

  @Column({ type: "tinyint", width: 1, default: 0 })
  tu_nhan_giao_hang: boolean;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  phi_van_chuyen_mac_dinh: number;

  @Column({ type: "varchar", length: 20, default: "cho_duyet" })
  trang_thai_hoat_dong: string;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
  diem_danh_gia: number;

  @Column({ type: "bigint", default: 0 })
  tong_don_hang: number;

  @Column({ type: "bigint", default: 0 })
  tong_luot_xem: number;

  @Column({ type: "bigint", default: 0 })
  tong_luot_thich: number;
}
