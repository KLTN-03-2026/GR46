import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";

@Entity("bao_cao")
export class BaoCaoEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  ma_bao_cao: string;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_bao_cao: number;

  @Column({ type: "varchar", length: 30 })
  loai_doi_tuong_bi_bao_cao: string;

  @Column({ type: "bigint", unsigned: true })
  id_doi_tuong_bi_bao_cao: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_nguoi_vi_pham: number | null;

  @Column({ type: "varchar", length: 100 })
  loai_vi_pham: string;

  @Column({ type: "text" })
  noi_dung_bao_cao: string;

  @Column({ type: "text", nullable: true })
  bang_chung_text: string | null;

  @Column({ type: "varchar", length: 20, default: "cho_xu_ly" })
  trang_thai: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  muc_do_vi_pham: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  ket_qua_xu_ly: string | null;

  @Column({ type: "text", nullable: true })
  hanh_dong_ap_dung: string | null;

  @Column({ type: "tinyint", width: 1, default: 0 })
  gui_canh_bao: boolean;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_admin_xu_ly: number | null;

  @Column({ type: "datetime" })
  thoi_gian_bao_cao: Date;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_xu_ly: Date | null;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_nguoi_bao_cao" })
  nguoi_bao_cao: NguoiDungEntity;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_nguoi_vi_pham" })
  nguoi_vi_pham: NguoiDungEntity | null;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_admin_xu_ly" })
  admin_xu_ly: NguoiDungEntity | null;
}
