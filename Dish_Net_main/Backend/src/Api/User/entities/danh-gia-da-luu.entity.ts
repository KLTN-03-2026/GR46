import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('danh_gia_da_luu')
export class DanhGiaDaLuuEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: 'bigint', unsigned: true })
  id_danh_gia: number;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}
