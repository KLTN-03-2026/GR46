import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("binh_luan")
export class BinhLuanEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_bai_viet: number;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_binh_luan: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_binh_luan_cha: number | null;

  @Column({ type: "text" })
  noi_dung: string;

  @Column({ type: "bigint", default: 0 })
  tong_luot_thich: number;

  @Column({ type: "varchar", length: 20, default: "hien_thi" })
  trang_thai: string;

  @Column({ type: "datetime" })
  ngay_tao: Date;
}
