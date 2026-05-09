import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('yeu_cau_rut_tien')
export class YeuCauRutTienEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  ma_yeu_cau: string;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_dung: number;

  @Column({ type: 'bigint', unsigned: true })
  id_tai_khoan_rut_tien: number;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  so_tien: number;

  @Column({ type: 'varchar', length: 20, default: 'dang_xu_ly' })
  trang_thai: string;

  @Column({ type: 'text', nullable: true })
  ly_do_tu_choi: string | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_admin_xu_ly: number | null;

  @Column({ type: 'datetime' })
  thoi_gian_yeu_cau: Date;

  @Column({ type: 'datetime', nullable: true })
  thoi_gian_xu_ly: Date | null;
}

