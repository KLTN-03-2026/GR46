import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thanh_toan')
export class ThanhToanEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_don_hang: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  cong_thanh_toan: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  ma_giao_dich: string | null;

  @Column({ type: 'varchar', length: 30 })
  phuong_thuc_thanh_toan: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  so_tien: number;

  @Column({ type: 'varchar', length: 20, default: 'cho_thanh_toan' })
  trang_thai_thanh_toan: string;

  @Column({ type: 'datetime', nullable: true })
  thoi_gian_thanh_toan: Date | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  so_tien_hoan_tien: number | null;

  @Column({ type: 'datetime', nullable: true })
  thoi_gian_hoan_tien: Date | null;

  @Column({ type: 'text', nullable: true })
  noi_dung_loi: string | null;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}
