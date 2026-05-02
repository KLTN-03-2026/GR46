import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOwnerContactToUpgradeRequest1776500000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE yeu_cau_nang_cap
      ADD COLUMN so_dien_thoai_chu_so_huu VARCHAR(20) NULL AFTER so_dien_thoai_lien_he,
      ADD COLUMN dia_chi_chu_so_huu TEXT NULL AFTER so_dien_thoai_chu_so_huu
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE yeu_cau_nang_cap
      DROP COLUMN dia_chi_chu_so_huu,
      DROP COLUMN so_dien_thoai_chu_so_huu
    `);
  }
}
