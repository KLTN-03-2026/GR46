import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class AddUniquePostViewsTable1777100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasViewTable = await queryRunner.hasTable('luot_xem_bai_viet');
    if (!hasViewTable) {
      await queryRunner.createTable(
        new Table({
          name: 'luot_xem_bai_viet',
          columns: [
            { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'id_bai_viet', type: 'bigint', unsigned: true, isNullable: false },
            { name: 'id_nguoi_dung', type: 'bigint', unsigned: true, isNullable: true },
            { name: 'ngay_tao', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP' },
          ],
        }),
      );

      await queryRunner.createForeignKeys('luot_xem_bai_viet', [
        new TableForeignKey({
          columnNames: ['id_bai_viet'],
          referencedTableName: 'bai_viet',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
        new TableForeignKey({
          columnNames: ['id_nguoi_dung'],
          referencedTableName: 'nguoi_dung',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      ]);

      await queryRunner.createIndex(
        'luot_xem_bai_viet',
        new TableIndex({
          name: 'uq_luot_xem_bai_viet_bai_viet_nguoi_dung',
          columnNames: ['id_bai_viet', 'id_nguoi_dung'],
          isUnique: true,
        }),
      );

      await queryRunner.createIndex(
        'luot_xem_bai_viet',
        new TableIndex({
          name: 'idx_luot_xem_bai_viet_bai_viet_ngay_tao',
          columnNames: ['id_bai_viet', 'ngay_tao'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('luot_xem_bai_viet')) {
      await queryRunner.dropTable('luot_xem_bai_viet', true);
    }
  }
}
