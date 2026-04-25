import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSupportRequestTable1775734200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS yeu_cau_ho_tro (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ma_yeu_cau VARCHAR(50) NOT NULL,
        id_nguoi_gui BIGINT UNSIGNED NOT NULL,
        chu_de VARCHAR(255) NOT NULL,
        noi_dung_yeu_cau TEXT NOT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'chua_phan_hoi',
        id_admin_phan_hoi BIGINT UNSIGNED NULL,
        noi_dung_phan_hoi TEXT NULL,
        thoi_gian_gui DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        thoi_gian_phan_hoi DATETIME NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uq_yeu_cau_ho_tro_ma (ma_yeu_cau),
        KEY idx_yeu_cau_ho_tro_nguoi_gui (id_nguoi_gui, trang_thai, thoi_gian_gui DESC),
        CONSTRAINT fk_yeu_cau_ho_tro_nguoi_gui FOREIGN KEY (id_nguoi_gui) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_yeu_cau_ho_tro_admin_phan_hoi FOREIGN KEY (id_admin_phan_hoi) REFERENCES nguoi_dung(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS yeu_cau_ho_tro");
  }
}
