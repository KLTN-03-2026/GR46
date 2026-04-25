import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";

@Entity("yeu_cau_nang_cap")
export class YeuCauNangCapEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_gui: number;

  @Column({ type: "varchar", length: 30 })
  loai_yeu_cau: string;

  @Column({ type: "varchar", length: 20, default: "cho_duyet" })
  trang_thai: string;

  @Column({ type: "text", nullable: true })
  ly_do_yeu_cau: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  so_cccd: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  ten_cua_hang_de_xuat: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  so_dien_thoai_lien_he: string | null;

  @Column({ type: "text", nullable: true })
  dia_chi_kinh_doanh: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  danh_muc_kinh_doanh: string | null;

  @Column({ type: "time", nullable: true })
  gio_mo_cua: string | null;

  @Column({ type: "time", nullable: true })
  gio_dong_cua: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  ten_kenh: string | null;

  @Column({ type: "text", nullable: true })
  mo_ta_kenh: string | null;

  @Column({ type: "int", nullable: true })
  tong_bai_dang: number | null;

  @Column({ type: "int", nullable: true })
  tong_nguoi_theo_doi: number | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_admin_xu_ly: number | null;

  @Column({ type: "text", nullable: true })
  ly_do_tu_choi: string | null;

  @Column({ type: "datetime" })
  thoi_gian_gui: Date;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_xu_ly: Date | null;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_nguoi_gui" })
  nguoi_gui: NguoiDungEntity;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_admin_xu_ly" })
  admin_xu_ly: NguoiDungEntity | null;
}
