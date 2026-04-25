import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tep_dinh_kem")
export class TepDinhKemEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 30 })
  loai_doi_tuong: string;

  @Column({ type: "bigint", unsigned: true })
  id_doi_tuong: number;

  @Column({ type: "varchar", length: 20 })
  loai_tep: string;

  @Column({ type: "text" })
  duong_dan_tep: string;

  @Column({ type: "int", default: 1 })
  thu_tu_hien_thi: number;

  @Column({ type: "text", nullable: true })
  ghi_chu: string | null;

  @Column({ type: "datetime" })
  ngay_tao: Date;
}
