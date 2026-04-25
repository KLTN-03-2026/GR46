import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gio_hang_chi_tiet')
export class GioHangChiTietEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: 'bigint', unsigned: true })
  id_cua_hang: number;

  @Column({ type: 'bigint', unsigned: true })
  id_mon_an: number;

  @Column({ type: 'int' })
  so_luong: number;

  @Column({ type: 'text', nullable: true })
  ghi_chu: string | null;

  @Column({
    type: 'text',
    nullable: true,
    insert: false,
    update: false,
    select: false,
  })
  topping_da_chon: string | null;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  duoc_chon: boolean;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  gia_tai_thoi_diem_them: number;

  @Column({ type: 'datetime' })
  ngay_tao: Date;

  @Column({ type: 'datetime' })
  ngay_cap_nhat: Date;
}
