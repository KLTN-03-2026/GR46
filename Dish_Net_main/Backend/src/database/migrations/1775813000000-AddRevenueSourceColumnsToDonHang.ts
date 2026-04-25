import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRevenueSourceColumnsToDonHang1775813000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasIdBaiVietNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_bai_viet_nguon",
    );
    const hasIdNhaSangTaoNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_nha_sang_tao_nguon",
    );
    const hasGhiChuTaiXe = await queryRunner.hasColumn(
      "don_hang",
      "ghi_chu_tai_xe",
    );
    const hasViDoGiao = await queryRunner.hasColumn(
      "don_hang",
      "vi_do_giao",
    );
    const hasKinhDoGiao = await queryRunner.hasColumn(
      "don_hang",
      "kinh_do_giao",
    );

    if (!hasIdBaiVietNguon) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN id_bai_viet_nguon BIGINT UNSIGNED NULL AFTER nguon_don_hang
      `);
    }

    if (!hasIdNhaSangTaoNguon) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN id_nha_sang_tao_nguon BIGINT UNSIGNED NULL AFTER id_bai_viet_nguon
      `);
    }

    if (!hasGhiChuTaiXe) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN ghi_chu_tai_xe TEXT NULL AFTER nguon_don_hang
      `);
    }

    if (!hasViDoGiao) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN vi_do_giao DECIMAL(10, 7) NULL AFTER ghi_chu_tai_xe
      `);
    }

    if (!hasKinhDoGiao) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN kinh_do_giao DECIMAL(10, 7) NULL AFTER vi_do_giao
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasIdNhaSangTaoNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_nha_sang_tao_nguon",
    );
    const hasIdBaiVietNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_bai_viet_nguon",
    );
    const hasKinhDoGiao = await queryRunner.hasColumn(
      "don_hang",
      "kinh_do_giao",
    );
    const hasViDoGiao = await queryRunner.hasColumn(
      "don_hang",
      "vi_do_giao",
    );
    const hasGhiChuTaiXe = await queryRunner.hasColumn(
      "don_hang",
      "ghi_chu_tai_xe",
    );

    if (hasKinhDoGiao) {
      await queryRunner.query(`ALTER TABLE don_hang DROP COLUMN kinh_do_giao`);
    }
    if (hasViDoGiao) {
      await queryRunner.query(`ALTER TABLE don_hang DROP COLUMN vi_do_giao`);
    }
    if (hasGhiChuTaiXe) {
      await queryRunner.query(`ALTER TABLE don_hang DROP COLUMN ghi_chu_tai_xe`);
    }
    if (hasIdNhaSangTaoNguon) {
      await queryRunner.query(`ALTER TABLE don_hang DROP COLUMN id_nha_sang_tao_nguon`);
    }
    if (hasIdBaiVietNguon) {
      await queryRunner.query(`ALTER TABLE don_hang DROP COLUMN id_bai_viet_nguon`);
    }
  }
}
