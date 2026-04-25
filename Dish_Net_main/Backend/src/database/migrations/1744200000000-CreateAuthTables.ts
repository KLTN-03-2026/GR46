import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthTables1744200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE nguoi_dung (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ten_dang_nhap VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        so_dien_thoai VARCHAR(20),
        mat_khau_bam TEXT NOT NULL,
        ten_hien_thi VARCHAR(120) NOT NULL,
        anh_dai_dien TEXT,
        gioi_tinh VARCHAR(20),
        ngay_sinh DATE,
        tieu_su TEXT,
        dia_chi TEXT,
        khu_vuc VARCHAR(120),
        vi_do DECIMAL(10, 7),
        kinh_do DECIMAL(10, 7),
        diem_uy_tin DECIMAL(4, 2) NOT NULL DEFAULT 0,
        cho_hien_thi_huy_hieu TINYINT(1) NOT NULL DEFAULT 1,
        cho_hien_thi_diem_uy_tin TINYINT(1) NOT NULL DEFAULT 1,
        la_tai_khoan_rieng_tu TINYINT(1) NOT NULL DEFAULT 0,
        la_admin TINYINT(1) NOT NULL DEFAULT 0,
        la_nha_sang_tao TINYINT(1) NOT NULL DEFAULT 0,
        la_chu_cua_hang TINYINT(1) NOT NULL DEFAULT 0,
        trang_thai_tai_khoan VARCHAR(20) NOT NULL DEFAULT 'hoat_dong',
        ly_do_khoa_hien_tai TEXT,
        nguon_dang_ky VARCHAR(20) NOT NULL DEFAULT 'email',
        ma_nguon_ngoai VARCHAR(255),
        thoi_gian_xac_thuc_email DATETIME,
        thoi_gian_xac_thuc_so_dien_thoai DATETIME,
        lan_dang_nhap_cuoi DATETIME,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_nguoi_dung_ten_dang_nhap (ten_dang_nhap),
        UNIQUE KEY uq_nguoi_dung_email (email),
        UNIQUE KEY uq_nguoi_dung_so_dien_thoai (so_dien_thoai),
        CONSTRAINT ck_nguoi_dung_trang_thai CHECK (trang_thai_tai_khoan IN ('hoat_dong', 'bi_khoa', 'cho_xac_thuc', 'da_xoa')),
        CONSTRAINT ck_nguoi_dung_nguon_dang_ky CHECK (nguon_dang_ky IN ('email', 'google', 'so_dien_thoai', 'admin_tao'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE ma_xac_thuc (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dung BIGINT UNSIGNED,
        loai_xac_thuc VARCHAR(30) NOT NULL,
        kenh_gui VARCHAR(20) NOT NULL,
        dich_danh_nhan VARCHAR(255) NOT NULL,
        ma_xac_thuc VARCHAR(20) NOT NULL,
        thoi_gian_het_han DATETIME NOT NULL,
        thoi_gian_xac_nhan DATETIME,
        so_lan_gui INT NOT NULL DEFAULT 1,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'hieu_luc',
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_ma_xac_thuc_nguoi_dung (id_nguoi_dung),
        CONSTRAINT fk_ma_xac_thuc_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT ck_ma_xac_thuc_loai CHECK (loai_xac_thuc IN ('dang_ky', 'quen_mat_khau', 'xac_thuc_email', 'xac_thuc_so_dien_thoai')),
        CONSTRAINT ck_ma_xac_thuc_kenh CHECK (kenh_gui IN ('email', 'sms')),
        CONSTRAINT ck_ma_xac_thuc_trang_thai CHECK (trang_thai IN ('hieu_luc', 'da_dung', 'het_han', 'da_huy'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE phien_dang_nhap (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dung BIGINT UNSIGNED NOT NULL,
        vai_tro_dang_nhap VARCHAR(20) NOT NULL,
        token_phien VARCHAR(255) NOT NULL,
        token_lam_moi VARCHAR(255),
        thiet_bi VARCHAR(255),
        dia_chi_ip VARCHAR(64),
        ghi_nho_dang_nhap TINYINT(1) NOT NULL DEFAULT 0,
        het_han_luc DATETIME NOT NULL,
        lan_hoat_dong_cuoi DATETIME,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_phien_dang_nhap_token_phien (token_phien),
        UNIQUE KEY uq_phien_dang_nhap_token_lam_moi (token_lam_moi),
        KEY idx_phien_dang_nhap_nguoi_dung (id_nguoi_dung, het_han_luc DESC),
        CONSTRAINT fk_phien_dang_nhap_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT ck_phien_dang_nhap_vai_tro CHECK (vai_tro_dang_nhap IN ('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang', 'admin'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS phien_dang_nhap");
    await queryRunner.query("DROP TABLE IF EXISTS ma_xac_thuc");
    await queryRunner.query("DROP TABLE IF EXISTS nguoi_dung");
  }
}
