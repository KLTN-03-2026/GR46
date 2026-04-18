import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDungEntity } from '../../Auth/entities/nguoi-dung.entity';
import { DonHangEntity } from '../../Admin/entities/don-hang.entity';
import { CuaHangEntity } from '../../Admin/entities/cua-hang.entity';
import { MonAnEntity } from '../../Admin/entities/mon-an.entity';

@Entity('danh_gia')
export class DanhGiaEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_don_hang: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_danh_gia: number;

  @Column({ type: 'bigint', unsigned: true })
  id_cua_hang: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_mon_an: number | null;

  @Column({ type: 'tinyint', unsigned: true })
  so_sao: number;

  @Column({ type: 'text', nullable: true })
  noi_dung: string | null;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  an_danh: number;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  tong_luot_thich: number;

  @Column({ type: 'datetime' })
  ngay_tao: Date;

  @ManyToOne(() => DonHangEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_don_hang' })
  don_hang: DonHangEntity;

  @ManyToOne(() => NguoiDungEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_nguoi_danh_gia' })
  nguoi_danh_gia: NguoiDungEntity;

  @ManyToOne(() => CuaHangEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cua_hang' })
  cua_hang: CuaHangEntity;

  @ManyToOne(() => MonAnEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_mon_an' })
  mon_an: MonAnEntity | null;
}
