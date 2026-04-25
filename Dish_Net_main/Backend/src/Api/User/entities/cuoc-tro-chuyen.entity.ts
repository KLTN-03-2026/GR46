import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cuoc_tro_chuyen')
export class CuocTroChuyenEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung_a: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung_b: number;

  @Column({ type: 'text', nullable: true })
  tin_nhan_cuoi: string | null;

  @Column({ type: 'datetime', nullable: true })
  thoi_gian_tin_nhan_cuoi: Date | null;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}
