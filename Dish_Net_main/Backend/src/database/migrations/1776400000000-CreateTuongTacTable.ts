import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTuongTacTable1776400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tuong_tac (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dung BIGINT UNSIGNED NOT NULL,
        id_bai_viet BIGINT UNSIGNED NULL,
        id_binh_luan BIGINT UNSIGNED NULL,
        loai_tuong_tac VARCHAR(20) NOT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_tuong_tac_bai_viet (id_bai_viet, loai_tuong_tac),
        KEY idx_tuong_tac_binh_luan (id_binh_luan, loai_tuong_tac),
        KEY idx_tuong_tac_nguoi_dung (id_nguoi_dung, loai_tuong_tac),
        CONSTRAINT fk_tuong_tac_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_tuong_tac_bai_viet FOREIGN KEY (id_bai_viet) REFERENCES bai_viet(id) ON DELETE CASCADE,
        CONSTRAINT fk_tuong_tac_binh_luan FOREIGN KEY (id_binh_luan) REFERENCES binh_luan(id) ON DELETE CASCADE,
        CONSTRAINT ck_tuong_tac_loai CHECK (loai_tuong_tac IN ('thich', 'luu', 'chia_se'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tuong_tac`);
  }
}
