import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NguoiDungEntity } from "./nguoi-dung.entity";

@Entity("ma_xac_thuc")
export class MaXacThucEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_nguoi_dung: number | null;

  @Column({ type: "varchar", length: 30 })
  loai_xac_thuc: string;

  @Column({ type: "varchar", length: 20 })
  kenh_gui: string;

  @Column({ type: "varchar", length: 255 })
  dich_danh_nhan: string;

  @Column({ type: "varchar", length: 20 })
  ma_xac_thuc: string;

  @Column({ type: "datetime" })
  thoi_gian_het_han: Date;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_xac_nhan: Date | null;

  @Column({ type: "int", default: 1 })
  so_lan_gui: number;

  @Column({ type: "varchar", length: 20, default: "hieu_luc" })
  trang_thai: string;

  @CreateDateColumn({ type: "datetime" })
  ngay_tao: Date;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_nguoi_dung" })
  nguoi_dung: NguoiDungEntity;
}
