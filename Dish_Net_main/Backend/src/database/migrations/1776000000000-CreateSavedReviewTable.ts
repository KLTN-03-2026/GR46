import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSavedReviewTable1776000000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS danh_gia_da_luu (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dung BIGINT UNSIGNED NOT NULL,
        id_danh_gia BIGINT UNSIGNED NOT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_saved_review_user_review (id_nguoi_dung, id_danh_gia),
        KEY idx_saved_review_user_time (id_nguoi_dung, ngay_tao DESC),
        CONSTRAINT fk_saved_review_user FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_saved_review_review FOREIGN KEY (id_danh_gia) REFERENCES danh_gia(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS danh_gia_da_luu');
  }
}
