import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('luot_xem_bai_viet')
export class LuotXemBaiVietEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_bai_viet: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_nguoi_dung: number | null;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}
