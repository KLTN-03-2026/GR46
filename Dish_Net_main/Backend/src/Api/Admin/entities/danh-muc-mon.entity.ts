import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("danh_muc_mon")
export class DanhMucMonEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_cua_hang: number | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_danh_muc_cha: number | null;

  @Column({ type: "varchar", length: 120 })
  ten_danh_muc: string;

  @Column({ type: "int", default: 1 })
  thu_tu_hien_thi: number;

  @Column({ type: "varchar", length: 20, default: "hieu_luc" })
  trang_thai: string;
}
