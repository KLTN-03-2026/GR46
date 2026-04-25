import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NguoiDungEntity } from "../../Auth/entities/nguoi-dung.entity";
import { DonHangEntity } from "./don-hang.entity";

@Entity("lich_su_don_hang")
export class LichSuDonHangEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_don_hang: number;

  @Column({ type: "varchar", length: 30, nullable: true })
  trang_thai_tu: string | null;

  @Column({ type: "varchar", length: 30 })
  trang_thai_den: string;

  @Column({ type: "text", nullable: true })
  noi_dung: string | null;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_nguoi_cap_nhat: number | null;

  @Column({ type: "datetime" })
  thoi_gian_cap_nhat: Date;

  @ManyToOne(() => DonHangEntity, (donHang) => donHang.lich_su, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_don_hang" })
  don_hang: DonHangEntity;

  @ManyToOne(() => NguoiDungEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_nguoi_cap_nhat" })
  nguoi_cap_nhat: NguoiDungEntity | null;
}
