import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStoreAvatarToCuaHang1775812000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasAnhDaiDien = await queryRunner.hasColumn(
      "cua_hang",
      "anh_dai_dien",
    );

    if (!hasAnhDaiDien) {
      await queryRunner.query(`
        ALTER TABLE cua_hang
        ADD COLUMN anh_dai_dien TEXT NULL AFTER mo_ta
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasAnhDaiDien = await queryRunner.hasColumn(
      "cua_hang",
      "anh_dai_dien",
    );

    if (hasAnhDaiDien) {
      await queryRunner.query(`
        ALTER TABLE cua_hang
        DROP COLUMN anh_dai_dien
      `);
    }
  }
}
