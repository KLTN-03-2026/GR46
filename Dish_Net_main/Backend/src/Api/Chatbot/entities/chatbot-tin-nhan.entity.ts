import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chatbot_tin_nhan')
export class ChatbotTinNhanEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_phien: number;

  @Column({ type: 'varchar', length: 20 })
  vai_tro: 'user' | 'assistant' | 'system' | 'tool';

  @Column({ type: 'mediumtext', nullable: true })
  noi_dung: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ten_tool: string | null;

  @Column({ type: 'datetime' })
  thoi_gian: Date;
}
