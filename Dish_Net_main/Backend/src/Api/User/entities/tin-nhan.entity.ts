import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tin_nhan')
export class TinNhanEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_cuoc_tro_chuyen: number;

  @Column({ type: 'bigint', unsigned: true })
  id_nguoi_gui: number;

  @Column({ type: 'text', nullable: true })
  noi_dung: string | null;

  @Column({ type: 'varchar', length: 20, default: 'van_ban' })
  loai_tin_nhan: string;

  @Column({ type: 'datetime' })
  thoi_gian_gui: Date;

  @Column({ type: 'datetime', nullable: true })
  thoi_gian_xem: Date | null;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  da_thu_hoi: boolean;
}
