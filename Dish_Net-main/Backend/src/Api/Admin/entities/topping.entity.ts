import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("topping")
export class ToppingEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_mon_an: number;

  @Column({ type: "varchar", length: 120 })
  ten_topping: string;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  gia: number;

  @Column({ type: "varchar", length: 20, default: "hieu_luc" })
  trang_thai: string;

  @Column({ type: "datetime" })
  ngay_tao: Date;
}
