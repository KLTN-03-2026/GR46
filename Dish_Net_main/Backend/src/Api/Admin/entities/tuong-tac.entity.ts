import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tuong_tac')
export class TuongTacEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_bai_viet: number | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_binh_luan: number | null;

  @Column({ type: 'varchar', length: 20 })
  loai_tuong_tac: string;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}
