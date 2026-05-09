import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bai_viet")
export class BaiVietEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_dang: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_cua_hang: number | null;

  @Column({ type: "varchar", length: 20 })
  loai_bai_viet: string;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_bai_viet_goc: number | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_mon_an: number | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_don_hang: number | null;

  @Column({ type: "text", nullable: true })
  noi_dung: string | null;

  @Column({ type: "decimal", precision: 2, scale: 1, nullable: true })
  so_sao: number | null;

  @Column({ type: "varchar", length: 20, default: "cong_khai" })
  muc_do_hien_thi: string;

  @Column({ type: "varchar", length: 20, default: "hien_thi" })
  trang_thai_duyet: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  bat_kiem_tien: boolean;

  @Column({ type: "text", nullable: true })
  link_mon_an: string | null;

  @Column({ type: "bigint", default: 0 })
  tong_luot_xem: number;

  @Column({ type: "bigint", default: 0 })
  tong_luot_thich: number;

  @Column({ type: "bigint", default: 0 })
  tong_luot_binh_luan: number;

  @Column({ type: "bigint", default: 0 })
  tong_luot_chia_se: number;

  @Column({ type: "bigint", default: 0 })
  tong_luot_luu: number;

  @Column({ type: "datetime" })
  ngay_dang: Date;
}
