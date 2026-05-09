import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('luot_nhan_link_bai_viet')
export class LuotNhanLinkBaiVietEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_bai_viet: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_nguoi_dung: number | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  dia_chi_ip: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  user_agent: string | null;

  @Column({ type: 'datetime' })
  ngay_tao: Date;
}

