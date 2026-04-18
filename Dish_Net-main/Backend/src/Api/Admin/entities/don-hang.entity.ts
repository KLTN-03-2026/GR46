import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";
import { CuaHangEntity } from "./cua-hang.entity";
import { DonHangChiTietEntity } from "./don-hang-chi-tiet.entity";
import { LichSuDonHangEntity } from "./lich-su-don-hang.entity";

@Entity("don_hang")
export class DonHangEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  ma_don_hang: string;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_mua: number;

  @Column({ type: "bigint", unsigned: true })
  id_cua_hang: number;

  @Column({ type: "varchar", length: 120 })
  nguoi_nhan: string;

  @Column({ type: "varchar", length: 20 })
  so_dien_thoai_nhan: string;

  @Column({ type: "text" })
  dia_chi_giao: string;

  @Column({ type: "varchar", length: 20, default: "truc_tiep" })
  nguon_don_hang: string;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_bai_viet_nguon: number | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_nha_sang_tao_nguon: number | null;

  @Column({ type: "text", nullable: true, select: false, insert: false, update: false })
  ghi_chu_tai_xe: string | null;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true, select: false, insert: false, update: false })
  vi_do_giao: number | null;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true, select: false, insert: false, update: false })
  kinh_do_giao: number | null;

  @Column({ type: "varchar", length: 30 })
  phuong_thuc_thanh_toan: string;

  @Column({ type: "varchar", length: 30, default: "cho_xac_nhan" })
  trang_thai_don_hang: string;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  tam_tinh: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  phi_van_chuyen: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  tong_giam_gia: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  tong_thanh_toan: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  thu_nhap_cua_hang: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  hoa_hong_nen_tang: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  hoa_hong_nha_sang_tao: number;

  @Column({ type: "text", nullable: true })
  ly_do_huy: string | null;

  @Column({ type: "text", nullable: true })
  ly_do_tra_hang: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  nguoi_huy: string | null;

  @Column({ type: "datetime" })
  thoi_gian_dat: Date;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_xac_nhan: Date | null;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_giao: Date | null;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_hoan_tat: Date | null;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_huy: Date | null;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "id_nguoi_mua" })
  nguoi_mua: NguoiDungEntity;

  @ManyToOne(() => CuaHangEntity, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "id_cua_hang" })
  cua_hang: CuaHangEntity;

  @OneToMany(() => DonHangChiTietEntity, (chiTiet) => chiTiet.don_hang)
  chi_tiet: DonHangChiTietEntity[];

  @OneToMany(() => LichSuDonHangEntity, (lichSu) => lichSu.don_hang)
  lich_su: LichSuDonHangEntity[];
}
