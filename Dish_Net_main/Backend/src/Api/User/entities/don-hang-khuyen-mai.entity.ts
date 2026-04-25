import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('don_hang_khuyen_mai')
export class DonHangKhuyenMaiEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_don_hang: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_khuyen_mai: number | null;

  @Column({ type: 'varchar', length: 50 })
  ma_khuyen_mai_snapshot: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  so_tien_giam: number;
}
