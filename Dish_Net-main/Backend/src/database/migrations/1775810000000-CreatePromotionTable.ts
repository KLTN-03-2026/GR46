import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePromotionTable1775810000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS khuyen_mai (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_cua_hang BIGINT UNSIGNED NULL,
        pham_vi_ap_dung VARCHAR(20) NOT NULL,
        ten_khuyen_mai VARCHAR(255) NOT NULL,
        ma_khuyen_mai VARCHAR(50) NOT NULL,
        loai_khuyen_mai VARCHAR(30) NOT NULL,
        gia_tri_khuyen_mai DECIMAL(14, 2) NOT NULL DEFAULT 0,
        gia_tri_toi_da DECIMAL(14, 2) NULL,
        don_hang_toi_thieu DECIMAL(14, 2) NOT NULL DEFAULT 0,
        so_luot_toi_da INT NULL,
        so_luot_da_dung INT NOT NULL DEFAULT 0,
        thoi_gian_bat_dau DATETIME NOT NULL,
        thoi_gian_ket_thuc DATETIME NOT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'sap_dien_ra',
        mo_ta TEXT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_khuyen_mai_ma (ma_khuyen_mai),
        KEY idx_khuyen_mai_cua_hang (id_cua_hang, trang_thai, thoi_gian_bat_dau, thoi_gian_ket_thuc),
        CONSTRAINT fk_khuyen_mai_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS khuyen_mai");
  }
}
