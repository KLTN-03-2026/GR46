import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";

@Entity("nhat_ky_he_thong")
export class NhatKyHeThongEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_nguoi_thuc_hien: number | null;

  @Column({ type: "varchar", length: 30 })
  loai_doi_tuong: string;

  @Column({ type: "bigint", unsigned: true })
  id_doi_tuong: number;

  @Column({ type: "varchar", length: 100 })
  hanh_dong: string;

  @Column({ type: "text", nullable: true })
  noi_dung: string | null;

  @Column({ type: "json", nullable: true })
  du_lieu_cu: Record<string, unknown> | null;

  @Column({ type: "json", nullable: true })
  du_lieu_moi: Record<string, unknown> | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  dia_chi_ip: string | null;

  @Column({ type: "datetime" })
  ngay_tao: Date;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_nguoi_thuc_hien" })
  nguoi_thuc_hien: NguoiDungEntity | null;
}
