import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCheckoutSessionTable1776300000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS phien_thanh_toan (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ma_giao_dich VARCHAR(120) NOT NULL,
        id_nguoi_dung BIGINT UNSIGNED NOT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'cho_thanh_toan',
        tong_tien DECIMAL(14,2) NOT NULL,
        du_lieu_don_hang JSON NOT NULL,
        ket_qua_don_hang JSON NULL,
        noi_dung_loi TEXT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_phien_thanh_toan_ma_giao_dich (ma_giao_dich),
        KEY idx_phien_thanh_toan_nguoi_dung (id_nguoi_dung, trang_thai, ngay_tao),
        CONSTRAINT fk_phien_thanh_toan_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT ck_phien_thanh_toan_trang_thai CHECK (trang_thai IN ('cho_thanh_toan', 'thanh_cong', 'that_bai'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS phien_thanh_toan');
  }
}
