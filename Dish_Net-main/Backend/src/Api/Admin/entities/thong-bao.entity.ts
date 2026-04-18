import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";

@Entity("thong_bao")
export class ThongBaoEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_nhan: number;

  @Column({ type: "varchar", length: 30 })
  loai_thong_bao: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  loai_doi_tuong: string | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_doi_tuong: number | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  tieu_de: string | null;

  @Column({ type: "text" })
  noi_dung: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  da_doc: boolean;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_doc: Date | null;

  @Column({ type: "datetime" })
  ngay_tao: Date;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_nguoi_nhan" })
  nguoi_nhan: NguoiDungEntity;
}
