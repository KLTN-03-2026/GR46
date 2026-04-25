import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserInteractionTables1776100000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS quan_he_nguoi_dung (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_tao_quan_he BIGINT UNSIGNED NOT NULL,
        id_nguoi_nhan_quan_he BIGINT UNSIGNED NOT NULL,
        loai_quan_he VARCHAR(20) NOT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'hieu_luc',
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_quan_he_nguoi_dung (id_nguoi_tao_quan_he, id_nguoi_nhan_quan_he, loai_quan_he),
        KEY idx_quan_he_nhan_loai (id_nguoi_nhan_quan_he, loai_quan_he),
        CONSTRAINT fk_quan_he_nguoi_tao FOREIGN KEY (id_nguoi_tao_quan_he) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_quan_he_nguoi_nhan FOREIGN KEY (id_nguoi_nhan_quan_he) REFERENCES nguoi_dung(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cuoc_tro_chuyen (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dung_a BIGINT UNSIGNED NOT NULL,
        id_nguoi_dung_b BIGINT UNSIGNED NOT NULL,
        tin_nhan_cuoi TEXT NULL,
        thoi_gian_tin_nhan_cuoi DATETIME NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_cuoc_tro_chuyen (id_nguoi_dung_a, id_nguoi_dung_b),
        KEY idx_cuoc_tro_chuyen_b (id_nguoi_dung_b),
        CONSTRAINT fk_cuoc_tro_chuyen_nguoi_dung_a FOREIGN KEY (id_nguoi_dung_a) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_cuoc_tro_chuyen_nguoi_dung_b FOREIGN KEY (id_nguoi_dung_b) REFERENCES nguoi_dung(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS cuoc_tro_chuyen');
    await queryRunner.query('DROP TABLE IF EXISTS quan_he_nguoi_dung');
  }
}
