import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tai_khoan_rut_tien')
export class TaiKhoanRutTienEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: 'varchar', length: 120 })
  ten_ngan_hang: string;

  @Column({ type: 'varchar', length: 40 })
  so_tai_khoan: string;

  @Column({ type: 'varchar', length: 120 })
  ten_chu_tai_khoan: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  la_mac_dinh: boolean;

  @Column({ type: 'varchar', length: 20, default: 'hieu_luc' })
  trang_thai: string;

  @Column({ type: 'datetime' })
  ngay_tao: Date;

  @Column({ type: 'datetime' })
  ngay_cap_nhat: Date;
}

