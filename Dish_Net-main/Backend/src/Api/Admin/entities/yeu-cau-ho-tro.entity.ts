import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";

@Entity("yeu_cau_ho_tro")
export class YeuCauHoTroEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  ma_yeu_cau: string;

  @Column({ type: "bigint", unsigned: true })
  id_nguoi_gui: number;

  @Column({ type: "varchar", length: 255 })
  chu_de: string;

  @Column({ type: "text" })
  noi_dung_yeu_cau: string;

  @Column({ type: "varchar", length: 20, default: "chua_phan_hoi" })
  trang_thai: string;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_admin_phan_hoi: number | null;

  @Column({ type: "text", nullable: true })
  noi_dung_phan_hoi: string | null;

  @Column({ type: "datetime" })
  thoi_gian_gui: Date;

  @Column({ type: "datetime", nullable: true })
  thoi_gian_phan_hoi: Date | null;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_nguoi_gui" })
  nguoi_gui: NguoiDungEntity;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_admin_phan_hoi" })
  admin_phan_hoi: NguoiDungEntity | null;
}
