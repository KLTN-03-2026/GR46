import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DonHangEntity } from "./don-hang.entity";

@Entity("don_hang_chi_tiet")
export class DonHangChiTietEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_don_hang: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  id_mon_an: number | null;

  @Column({ type: "varchar", length: 255 })
  ten_mon_snapshot: string;

  @Column({ type: "text", nullable: true })
  hinh_anh_snapshot: string | null;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  don_gia: number;

  @Column({ type: "int" })
  so_luong: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  thanh_tien: number;

  @Column({ type: "text", nullable: true, select: false, insert: false, update: false })
  topping_snapshot: string | null;

  @Column({ type: "text", nullable: true })
  ghi_chu: string | null;

  @ManyToOne(() => DonHangEntity, (donHang) => donHang.chi_tiet, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_don_hang" })
  don_hang: DonHangEntity;
}
