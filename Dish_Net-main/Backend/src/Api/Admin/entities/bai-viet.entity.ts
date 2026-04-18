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

  @Column({ type: "text", nullable: true })
  noi_dung: string | null;

  @Column({ type: "varchar", length: 20, default: "hien_thi" })
  trang_thai_duyet: string;

  @Column({ type: "bigint", default: 0 })
  tong_luot_xem: number;

  @Column({ type: "datetime" })
  ngay_dang: Date;
}
