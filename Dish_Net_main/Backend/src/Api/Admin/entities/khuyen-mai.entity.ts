import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("khuyen_mai")
export class KhuyenMaiEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_cua_hang: number | null;

  @Column({ type: "varchar", length: 20 })
  pham_vi_ap_dung: string;

  @Column({ type: "varchar", length: 255 })
  ten_khuyen_mai: string;

  @Column({ type: "varchar", length: 50, unique: true })
  ma_khuyen_mai: string;

  @Column({ type: "varchar", length: 30 })
  loai_khuyen_mai: string;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  gia_tri_khuyen_mai: number;

  @Column({ type: "decimal", precision: 14, scale: 2, nullable: true })
  gia_tri_toi_da: number | null;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  don_hang_toi_thieu: number;

  @Column({ type: "int", nullable: true })
  so_luot_toi_da: number | null;

  @Column({ type: "int", default: 0 })
  so_luot_da_dung: number;

  @Column({ type: "datetime" })
  thoi_gian_bat_dau: Date;

  @Column({ type: "datetime" })
  thoi_gian_ket_thuc: Date;

  @Column({ type: "varchar", length: 20, default: "sap_dien_ra" })
  trang_thai: string;

  @Column({ type: "text", nullable: true })
  mo_ta: string | null;

  @Column({ type: "datetime" })
  ngay_tao: Date;
}
