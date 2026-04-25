import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAdminReviewTempTables1775733600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS lich_su_kiem_duyet_yeu_cau");
    await queryRunner.query("DROP TABLE IF EXISTS yeu_cau_he_thong");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE yeu_cau_he_thong (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ma_yeu_cau VARCHAR(30) NOT NULL,
        id_nguoi_dung BIGINT UNSIGNED NOT NULL,
        loai_yeu_cau VARCHAR(30) NOT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'cho_duyet',
        ngay_gui_yeu_cau DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_xu_ly DATETIME NULL,
        ly_do_tu_choi TEXT NULL,
        ten_cua_hang VARCHAR(120) NULL,
        dia_chi_cua_hang TEXT NULL,
        so_dien_thoai_lien_he VARCHAR(20) NULL,
        mo_ta_cua_hang TEXT NULL,
        ten_kenh VARCHAR(120) NULL,
        mo_ta_noi_dung_kenh TEXT NULL,
        so_bai_dang INT NULL,
        so_nguoi_theo_doi INT NULL,
        video_noi_bat LONGTEXT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_yeu_cau_he_thong_ma_yeu_cau (ma_yeu_cau),
        KEY idx_yeu_cau_he_thong_nguoi_dung (id_nguoi_dung),
        KEY idx_yeu_cau_he_thong_trang_thai (trang_thai, loai_yeu_cau, ngay_gui_yeu_cau),
        CONSTRAINT fk_yeu_cau_he_thong_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE lich_su_kiem_duyet_yeu_cau (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_yeu_cau BIGINT UNSIGNED NOT NULL,
        hanh_dong VARCHAR(30) NOT NULL,
        thuc_hien_boi VARCHAR(120) NOT NULL,
        ghi_chu TEXT NULL,
        thoi_gian_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_lich_su_kiem_duyet_yeu_cau (id_yeu_cau, thoi_gian_tao),
        CONSTRAINT fk_lich_su_kiem_duyet_yeu_cau FOREIGN KEY (id_yeu_cau) REFERENCES yeu_cau_he_thong(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }
}
