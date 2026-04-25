import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quan_he_nguoi_dung')
export class QuanHeNguoiDungEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_tao_quan_he: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_nhan_quan_he: number;

  @Column({ type: 'varchar', length: 20 })
  loai_quan_he: string;

  @Column({ type: 'varchar', length: 20, default: 'hieu_luc' })
  trang_thai: string;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}
