import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateChatbotTables1777200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('chatbot_phien'))) {
      await queryRunner.createTable(
        new Table({
          name: 'chatbot_phien',
          columns: [
            { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'id_nguoi_dung', type: 'bigint', unsigned: true, isNullable: true },
            { name: 'tieu_de', type: 'varchar', length: '255', isNullable: true },
            { name: 'ngay_tao', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
            { name: 'ngay_cap_nhat', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          ],
        }),
      );

      await queryRunner.createForeignKeys('chatbot_phien', [
        new TableForeignKey({
          columnNames: ['id_nguoi_dung'],
          referencedTableName: 'nguoi_dung',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      ]);

      await queryRunner.createIndex(
        'chatbot_phien',
        new TableIndex({
          name: 'idx_chatbot_phien_nguoi_dung',
          columnNames: ['id_nguoi_dung', 'ngay_cap_nhat'],
        }),
      );
    }

    if (!(await queryRunner.hasTable('chatbot_tin_nhan'))) {
      await queryRunner.createTable(
        new Table({
          name: 'chatbot_tin_nhan',
          columns: [
            { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'id_phien', type: 'bigint', unsigned: true },
            { name: 'vai_tro', type: 'varchar', length: '20' },
            { name: 'noi_dung', type: 'mediumtext', isNullable: true },
            { name: 'ten_tool', type: 'varchar', length: '64', isNullable: true },
            { name: 'thoi_gian', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          ],
        }),
      );

      await queryRunner.createForeignKeys('chatbot_tin_nhan', [
        new TableForeignKey({
          columnNames: ['id_phien'],
          referencedTableName: 'chatbot_phien',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      ]);

      await queryRunner.createIndex(
        'chatbot_tin_nhan',
        new TableIndex({
          name: 'idx_chatbot_tin_nhan_phien_thoi_gian',
          columnNames: ['id_phien', 'thoi_gian'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('chatbot_tin_nhan')) {
      await queryRunner.dropTable('chatbot_tin_nhan', true);
    }
    if (await queryRunner.hasTable('chatbot_phien')) {
      await queryRunner.dropTable('chatbot_phien', true);
    }
  }
}
