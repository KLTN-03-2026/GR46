import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chatbot_phien')
export class ChatbotPhienEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  id_nguoi_dung: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tieu_de: string | null;

  @Column({ type: 'datetime' })
  ngay_tao: Date;

  @Column({ type: 'datetime' })
  ngay_cap_nhat: Date;
}
