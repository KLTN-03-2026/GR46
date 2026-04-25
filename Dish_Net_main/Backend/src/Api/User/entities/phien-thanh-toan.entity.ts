import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phien_thanh_toan')
export class PhienThanhToanEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 120, unique: true })
  ma_giao_dich: string;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: 'varchar', length: 20, default: 'cho_thanh_toan' })
  trang_thai: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  tong_tien: number;

  @Column({ type: 'json' })
  du_lieu_don_hang: Record<string, unknown>;

  @Column({ type: 'json', nullable: true })
  ket_qua_don_hang: Record<string, unknown> | null;

  @Column({ type: 'text', nullable: true })
  noi_dung_loi: string | null;

  @Column({ type: 'datetime' })
  ngay_tao: Date;

  @Column({ type: 'datetime' })
  ngay_cap_nhat: Date;
}
