import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewSchemaTables1775733000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tep_dinh_kem (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        loai_doi_tuong VARCHAR(30) NOT NULL,
        id_doi_tuong BIGINT UNSIGNED NOT NULL,
        loai_tep VARCHAR(20) NOT NULL,
        duong_dan_tep TEXT NOT NULL,
        thu_tu_hien_thi INT NOT NULL DEFAULT 1,
        ghi_chu TEXT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_tep_dinh_kem_doi_tuong (loai_doi_tuong, id_doi_tuong, thu_tu_hien_thi)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS yeu_cau_nang_cap (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_gui BIGINT UNSIGNED NOT NULL,
        loai_yeu_cau VARCHAR(30) NOT NULL,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'cho_duyet',
        ly_do_yeu_cau TEXT NULL,
        so_cccd VARCHAR(20) NULL,
        ten_cua_hang_de_xuat VARCHAR(255) NULL,
        so_dien_thoai_lien_he VARCHAR(20) NULL,
        dia_chi_kinh_doanh TEXT NULL,
        danh_muc_kinh_doanh VARCHAR(255) NULL,
        gio_mo_cua TIME NULL,
        gio_dong_cua TIME NULL,
        ten_kenh VARCHAR(255) NULL,
        mo_ta_kenh TEXT NULL,
        tong_bai_dang INT NULL,
        tong_nguoi_theo_doi INT NULL,
        id_admin_xu_ly BIGINT UNSIGNED NULL,
        ly_do_tu_choi TEXT NULL,
        thoi_gian_gui DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        thoi_gian_xu_ly DATETIME NULL,
        PRIMARY KEY (id),
        KEY idx_yeu_cau_nang_cap_nguoi_gui (id_nguoi_gui, loai_yeu_cau, trang_thai, thoi_gian_gui DESC),
        CONSTRAINT fk_yeu_cau_nang_cap_nguoi_gui FOREIGN KEY (id_nguoi_gui) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_yeu_cau_nang_cap_admin_xu_ly FOREIGN KEY (id_admin_xu_ly) REFERENCES nguoi_dung(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS nhat_ky_he_thong (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_thuc_hien BIGINT UNSIGNED NULL,
        loai_doi_tuong VARCHAR(30) NOT NULL,
        id_doi_tuong BIGINT UNSIGNED NOT NULL,
        hanh_dong VARCHAR(100) NOT NULL,
        noi_dung TEXT NULL,
        du_lieu_cu JSON NULL,
        du_lieu_moi JSON NULL,
        dia_chi_ip VARCHAR(64) NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_nhat_ky_he_thong_doi_tuong (loai_doi_tuong, id_doi_tuong, ngay_tao DESC),
        CONSTRAINT fk_nhat_ky_he_thong_nguoi_thuc_hien FOREIGN KEY (id_nguoi_thuc_hien) REFERENCES nguoi_dung(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS nhat_ky_he_thong");
    await queryRunner.query("DROP TABLE IF EXISTS yeu_cau_nang_cap");
    await queryRunner.query("DROP TABLE IF EXISTS tep_dinh_kem");
  }
}
