import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { DanhMucMonEntity } from "./danh-muc-mon.entity";

@Entity("mon_an")
export class MonAnEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_cua_hang: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_danh_muc: number | null;

  @ManyToOne(() => DanhMucMonEntity, { nullable: true })
  @JoinColumn({ name: "id_danh_muc" })
  danh_muc: DanhMucMonEntity | null;

  @Column({ type: "varchar", length: 50 })
  ma_mon: string;

  @Column({ type: "varchar", length: 255 })
  ten_mon: string;

  @Column({ type: "text", nullable: true })
  mo_ta: string | null;

  @Column({ type: "text", nullable: true })
  hinh_anh_dai_dien: string | null;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  gia_ban: number;

  @Column({ type: "decimal", precision: 14, scale: 2, nullable: true })
  gia_goc: number | null;

  @Column({ type: "varchar", length: 20, default: "dang_ban" })
  trang_thai_ban: string;

  @Column({ type: "bigint", default: 0 })
  so_luong_da_ban: number;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
  diem_danh_gia: number;

  @Column({ type: "bigint", default: 0 })
  tong_danh_gia: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  la_mon_noi_bat: boolean;

  @Column({ type: "datetime" })
  ngay_tao: Date;

  @Column({ type: "datetime" })
  ngay_cap_nhat: Date;
}
