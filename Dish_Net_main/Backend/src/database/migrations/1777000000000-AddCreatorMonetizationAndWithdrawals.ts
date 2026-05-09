import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddCreatorMonetizationAndWithdrawals1777000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasMonetizationStatus = await queryRunner.hasColumn('nguoi_dung', 'trang_thai_kiem_tien_noi_dung');
    if (!hasMonetizationStatus) {
      await queryRunner.addColumn(
        'nguoi_dung',
        new TableColumn({
          name: 'trang_thai_kiem_tien_noi_dung',
          type: 'varchar',
          length: '20',
          isNullable: false,
          default: "'chua_dang_ky'",
        }),
      );
    }

    const hasPostMonetized = await queryRunner.hasColumn('bai_viet', 'bat_kiem_tien');
    if (!hasPostMonetized) {
      await queryRunner.addColumn(
        'bai_viet',
        new TableColumn({
          name: 'bat_kiem_tien',
          type: 'tinyint',
          width: 1,
          isNullable: false,
          default: '0',
        }),
      );
    }

    const hasPostLink = await queryRunner.hasColumn('bai_viet', 'link_mon_an');
    if (!hasPostLink) {
      await queryRunner.addColumn(
        'bai_viet',
        new TableColumn({
          name: 'link_mon_an',
          type: 'text',
          isNullable: true,
        }),
      );
    }

    const hasPayoutAccountTable = await queryRunner.hasTable('tai_khoan_rut_tien');
    if (!hasPayoutAccountTable) {
      await queryRunner.createTable(
        new Table({
          name: 'tai_khoan_rut_tien',
          columns: [
            { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'id_nguoi_dung', type: 'bigint', unsigned: true, isNullable: false },
            { name: 'ten_ngan_hang', type: 'varchar', length: '120', isNullable: false },
            { name: 'so_tai_khoan', type: 'varchar', length: '40', isNullable: false },
            { name: 'ten_chu_tai_khoan', type: 'varchar', length: '120', isNullable: false },
            { name: 'la_mac_dinh', type: 'tinyint', width: 1, isNullable: false, default: '0' },
            { name: 'trang_thai', type: 'varchar', length: '20', isNullable: false, default: "'hieu_luc'" },
            { name: 'ngay_tao', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP' },
            { name: 'ngay_cap_nhat', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
          ],
        }),
      );
      await queryRunner.createForeignKey(
        'tai_khoan_rut_tien',
        new TableForeignKey({
          columnNames: ['id_nguoi_dung'],
          referencedTableName: 'nguoi_dung',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );
      await queryRunner.createIndex(
        'tai_khoan_rut_tien',
        new TableIndex({
          name: 'idx_tai_khoan_rut_tien_nguoi_dung',
          columnNames: ['id_nguoi_dung', 'trang_thai', 'la_mac_dinh'],
        }),
      );
    }

    const hasWithdrawTable = await queryRunner.hasTable('yeu_cau_rut_tien');
    if (!hasWithdrawTable) {
      await queryRunner.createTable(
        new Table({
          name: 'yeu_cau_rut_tien',
          columns: [
            { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'ma_yeu_cau', type: 'varchar', length: '50', isNullable: false, isUnique: true },
            { name: 'id_nguoi_dung', type: 'bigint', unsigned: true, isNullable: false },
            { name: 'id_tai_khoan_rut_tien', type: 'bigint', unsigned: true, isNullable: false },
            { name: 'so_tien', type: 'decimal', precision: 14, scale: 2, isNullable: false },
            { name: 'trang_thai', type: 'varchar', length: '20', isNullable: false, default: "'dang_xu_ly'" },
            { name: 'ly_do_tu_choi', type: 'text', isNullable: true },
            { name: 'id_admin_xu_ly', type: 'bigint', unsigned: true, isNullable: true },
            { name: 'thoi_gian_yeu_cau', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP' },
            { name: 'thoi_gian_xu_ly', type: 'datetime', isNullable: true },
          ],
        }),
      );
      await queryRunner.createForeignKeys('yeu_cau_rut_tien', [
        new TableForeignKey({
          columnNames: ['id_nguoi_dung'],
          referencedTableName: 'nguoi_dung',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
        new TableForeignKey({
          columnNames: ['id_tai_khoan_rut_tien'],
          referencedTableName: 'tai_khoan_rut_tien',
          referencedColumnNames: ['id'],
          onDelete: 'RESTRICT',
        }),
        new TableForeignKey({
          columnNames: ['id_admin_xu_ly'],
          referencedTableName: 'nguoi_dung',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      ]);
      await queryRunner.createIndex(
        'yeu_cau_rut_tien',
        new TableIndex({
          name: 'idx_yeu_cau_rut_tien_nguoi_dung',
          columnNames: ['id_nguoi_dung', 'trang_thai', 'thoi_gian_yeu_cau'],
        }),
      );
    }

    const hasClickTable = await queryRunner.hasTable('luot_nhan_link_bai_viet');
    if (!hasClickTable) {
      await queryRunner.createTable(
        new Table({
          name: 'luot_nhan_link_bai_viet',
          columns: [
            { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'id_bai_viet', type: 'bigint', unsigned: true, isNullable: false },
            { name: 'id_nguoi_dung', type: 'bigint', unsigned: true, isNullable: true },
            { name: 'dia_chi_ip', type: 'varchar', length: '64', isNullable: true },
            { name: 'user_agent', type: 'varchar', length: '255', isNullable: true },
            { name: 'ngay_tao', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP' },
          ],
        }),
      );
      await queryRunner.createForeignKeys('luot_nhan_link_bai_viet', [
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
        'luot_nhan_link_bai_viet',
        new TableIndex({
          name: 'idx_luot_nhan_link_bai_viet',
          columnNames: ['id_bai_viet', 'ngay_tao'],
        }),
      );
    }

    await queryRunner.query(`
      UPDATE nguoi_dung
      SET trang_thai_kiem_tien_noi_dung = CASE
        WHEN la_nha_sang_tao = 1 THEN 'da_duyet'
        ELSE 'chua_dang_ky'
      END
      WHERE trang_thai_kiem_tien_noi_dung IS NULL OR trang_thai_kiem_tien_noi_dung = ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('luot_nhan_link_bai_viet')) {
      await queryRunner.dropTable('luot_nhan_link_bai_viet', true);
    }
    if (await queryRunner.hasTable('yeu_cau_rut_tien')) {
      await queryRunner.dropTable('yeu_cau_rut_tien', true);
    }
    if (await queryRunner.hasTable('tai_khoan_rut_tien')) {
      await queryRunner.dropTable('tai_khoan_rut_tien', true);
    }
    if (await queryRunner.hasColumn('bai_viet', 'link_mon_an')) {
      await queryRunner.dropColumn('bai_viet', 'link_mon_an');
    }
    if (await queryRunner.hasColumn('bai_viet', 'bat_kiem_tien')) {
      await queryRunner.dropColumn('bai_viet', 'bat_kiem_tien');
    }
    if (await queryRunner.hasColumn('nguoi_dung', 'trang_thai_kiem_tien_noi_dung')) {
      await queryRunner.dropColumn('nguoi_dung', 'trang_thai_kiem_tien_noi_dung');
    }
  }
}

