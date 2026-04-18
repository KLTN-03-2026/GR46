import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReportTable1775734800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS bao_cao (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ma_bao_cao VARCHAR(50) NOT NULL,
        id_nguoi_bao_cao BIGINT UNSIGNED NOT NULL,
        loai_doi_tuong_bi_bao_cao VARCHAR(30) NOT NULL,
        id_doi_tuong_bi_bao_cao BIGINT UNSIGNED NOT NULL,
        id_nguoi_vi_pham BIGINT UNSIGNED NULL,
        loai_vi_pham VARCHAR(100) NOT NULL,
        noi_dung_bao_cao TEXT NOT NULL,
        bang_chung_text TEXT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'cho_xu_ly',
        muc_do_vi_pham VARCHAR(20) NULL,
        ket_qua_xu_ly VARCHAR(100) NULL,
        hanh_dong_ap_dung TEXT NULL,
        gui_canh_bao TINYINT(1) NOT NULL DEFAULT 0,
        id_admin_xu_ly BIGINT UNSIGNED NULL,
        thoi_gian_bao_cao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        thoi_gian_xu_ly DATETIME NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uq_bao_cao_ma (ma_bao_cao),
        KEY idx_bao_cao_trang_thai (trang_thai, thoi_gian_bao_cao DESC),
        KEY idx_bao_cao_doi_tuong (loai_doi_tuong_bi_bao_cao, id_doi_tuong_bi_bao_cao),
        CONSTRAINT fk_bao_cao_nguoi_bao_cao FOREIGN KEY (id_nguoi_bao_cao) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_bao_cao_nguoi_vi_pham FOREIGN KEY (id_nguoi_vi_pham) REFERENCES nguoi_dung(id) ON DELETE SET NULL,
        CONSTRAINT fk_bao_cao_admin_xu_ly FOREIGN KEY (id_admin_xu_ly) REFERENCES nguoi_dung(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS bao_cao");
  }
}
