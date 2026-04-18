import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDanhGiaTable1775900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS danh_gia (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_don_hang BIGINT UNSIGNED NOT NULL,
        id_nguoi_danh_gia BIGINT UNSIGNED NOT NULL,
        id_cua_hang BIGINT UNSIGNED NOT NULL,
        id_mon_an BIGINT UNSIGNED,
        so_sao TINYINT UNSIGNED NOT NULL,
        noi_dung TEXT,
        an_danh TINYINT UNSIGNED NOT NULL DEFAULT 0,
        tong_luot_thich BIGINT UNSIGNED NOT NULL DEFAULT 0,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_danh_gia_don_hang (id_don_hang),
        KEY idx_danh_gia_cua_hang (id_cua_hang),
        KEY idx_danh_gia_mon_an (id_mon_an),
        CONSTRAINT fk_danh_gia_don_hang FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_danh_gia_nguoi_danh_gia FOREIGN KEY (id_nguoi_danh_gia) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_danh_gia_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_danh_gia_mon_an FOREIGN KEY (id_mon_an) REFERENCES mon_an(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS danh_gia");
  }
}
