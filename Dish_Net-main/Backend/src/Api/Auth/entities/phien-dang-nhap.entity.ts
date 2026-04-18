import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NguoiDungEntity } from "./nguoi-dung.entity";

@Entity("phien_dang_nhap")
export class PhienDangNhapEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: "varchar", length: 20 })
  vai_tro_dang_nhap: string;

  @Column({ type: "varchar", length: 255, unique: true })
  token_phien: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  token_lam_moi: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  thiet_bi: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  dia_chi_ip: string | null;

  @Column({ type: "tinyint", width: 1, default: 0 })
  ghi_nho_dang_nhap: boolean;

  @Column({ type: "datetime" })
  het_han_luc: Date;

  @Column({ type: "datetime", nullable: true })
  lan_hoat_dong_cuoi: Date | null;

  @CreateDateColumn({ type: "datetime" })
  ngay_tao: Date;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_nguoi_dung" })
  nguoi_dung: NguoiDungEntity;
}
