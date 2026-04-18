import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReportActionSupportSchema1775735400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasKieuKhoaTaiKhoan = await queryRunner.hasColumn(
      "nguoi_dung",
      "kieu_khoa_tai_khoan",
    );
    const hasThoiGianMoKhoa = await queryRunner.hasColumn(
      "nguoi_dung",
      "thoi_gian_mo_khoa",
    );

    if (!hasKieuKhoaTaiKhoan) {
      await queryRunner.query(`
        ALTER TABLE nguoi_dung
        ADD COLUMN kieu_khoa_tai_khoan VARCHAR(20) NULL
      `);
    }

    if (!hasThoiGianMoKhoa) {
      await queryRunner.query(`
        ALTER TABLE nguoi_dung
        ADD COLUMN thoi_gian_mo_khoa DATETIME NULL
      `);
    }

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cua_hang (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_chu_so_huu BIGINT UNSIGNED NOT NULL,
        ten_cua_hang VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        mo_ta TEXT NULL,
        so_dien_thoai_lien_he VARCHAR(20) NULL,
        dia_chi_kinh_doanh TEXT NOT NULL,
        khu_vuc VARCHAR(120) NULL,
        vi_do DECIMAL(10, 7) NULL,
        kinh_do DECIMAL(10, 7) NULL,
        gio_mo_cua TIME NULL,
        gio_dong_cua TIME NULL,
        tu_nhan_giao_hang TINYINT(1) NOT NULL DEFAULT 1,
        phi_van_chuyen_mac_dinh DECIMAL(14, 2) NOT NULL DEFAULT 0,
        trang_thai_hoat_dong VARCHAR(20) NOT NULL DEFAULT 'cho_duyet',
        diem_danh_gia DECIMAL(4, 2) NOT NULL DEFAULT 0,
        tong_don_hang BIGINT NOT NULL DEFAULT 0,
        tong_luot_xem BIGINT NOT NULL DEFAULT 0,
        tong_luot_thich BIGINT NOT NULL DEFAULT 0,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_cua_hang_slug (slug),
        KEY idx_cua_hang_khu_vuc (khu_vuc, trang_thai_hoat_dong),
        CONSTRAINT fk_cua_hang_chu_so_huu FOREIGN KEY (id_chu_so_huu) REFERENCES nguoi_dung(id) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS mon_an (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_cua_hang BIGINT UNSIGNED NOT NULL,
        id_danh_muc BIGINT UNSIGNED NULL,
        ma_mon VARCHAR(50) NOT NULL,
        ten_mon VARCHAR(255) NOT NULL,
        mo_ta TEXT NULL,
        hinh_anh_dai_dien TEXT NULL,
        gia_ban DECIMAL(14, 2) NOT NULL,
        gia_goc DECIMAL(14, 2) NULL,
        trang_thai_ban VARCHAR(20) NOT NULL DEFAULT 'dang_ban',
        so_luong_da_ban BIGINT NOT NULL DEFAULT 0,
        diem_danh_gia DECIMAL(4, 2) NOT NULL DEFAULT 0,
        tong_danh_gia BIGINT NOT NULL DEFAULT 0,
        la_mon_noi_bat TINYINT(1) NOT NULL DEFAULT 0,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_mon_an_ma (id_cua_hang, ma_mon),
        KEY idx_mon_an_cua_hang (id_cua_hang, id_danh_muc, trang_thai_ban),
        CONSTRAINT fk_mon_an_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS bai_viet (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dang BIGINT UNSIGNED NOT NULL,
        id_cua_hang BIGINT UNSIGNED NULL,
        loai_bai_viet VARCHAR(20) NOT NULL,
        id_bai_viet_goc BIGINT UNSIGNED NULL,
        id_mon_an BIGINT UNSIGNED NULL,
        id_don_hang BIGINT UNSIGNED NULL,
        noi_dung TEXT NULL,
        so_sao DECIMAL(2, 1) NULL,
        muc_do_hien_thi VARCHAR(20) NOT NULL DEFAULT 'cong_khai',
        trang_thai_duyet VARCHAR(20) NOT NULL DEFAULT 'hien_thi',
        tong_luot_xem BIGINT NOT NULL DEFAULT 0,
        tong_luot_thich BIGINT NOT NULL DEFAULT 0,
        tong_luot_binh_luan BIGINT NOT NULL DEFAULT 0,
        tong_luot_chia_se BIGINT NOT NULL DEFAULT 0,
        tong_luot_luu BIGINT NOT NULL DEFAULT 0,
        ngay_dang DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_bai_viet_nguoi_dang (id_nguoi_dang, ngay_dang DESC),
        KEY idx_bai_viet_cua_hang (id_cua_hang, ngay_dang DESC),
        CONSTRAINT fk_bai_viet_nguoi_dang FOREIGN KEY (id_nguoi_dang) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_bai_viet_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS binh_luan (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_bai_viet BIGINT UNSIGNED NOT NULL,
        id_nguoi_binh_luan BIGINT UNSIGNED NOT NULL,
        id_binh_luan_cha BIGINT UNSIGNED NULL,
        noi_dung TEXT NOT NULL,
        tong_luot_thich BIGINT NOT NULL DEFAULT 0,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'hien_thi',
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_binh_luan_bai_viet (id_bai_viet, ngay_tao DESC),
        CONSTRAINT fk_binh_luan_bai_viet FOREIGN KEY (id_bai_viet) REFERENCES bai_viet(id) ON DELETE CASCADE,
        CONSTRAINT fk_binh_luan_nguoi_binh_luan FOREIGN KEY (id_nguoi_binh_luan) REFERENCES nguoi_dung(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS thong_bao (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_nhan BIGINT UNSIGNED NOT NULL,
        loai_thong_bao VARCHAR(30) NOT NULL,
        loai_doi_tuong VARCHAR(30) NULL,
        id_doi_tuong BIGINT UNSIGNED NULL,
        tieu_de VARCHAR(255) NULL,
        noi_dung TEXT NOT NULL,
        da_doc TINYINT(1) NOT NULL DEFAULT 0,
        thoi_gian_doc DATETIME NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_thong_bao_nguoi_nhan (id_nguoi_nhan, da_doc, ngay_tao DESC),
        CONSTRAINT fk_thong_bao_nguoi_nhan FOREIGN KEY (id_nguoi_nhan) REFERENCES nguoi_dung(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS thong_bao");
    await queryRunner.query("DROP TABLE IF EXISTS binh_luan");
    await queryRunner.query("DROP TABLE IF EXISTS bai_viet");
    await queryRunner.query("DROP TABLE IF EXISTS mon_an");
    await queryRunner.query("DROP TABLE IF EXISTS cua_hang");

    const hasKieuKhoaTaiKhoan = await queryRunner.hasColumn(
      "nguoi_dung",
      "kieu_khoa_tai_khoan",
    );
    const hasThoiGianMoKhoa = await queryRunner.hasColumn(
      "nguoi_dung",
      "thoi_gian_mo_khoa",
    );

    if (hasKieuKhoaTaiKhoan) {
      await queryRunner.query(`
        ALTER TABLE nguoi_dung
        DROP COLUMN kieu_khoa_tai_khoan
      `);
    }

    if (hasThoiGianMoKhoa) {
      await queryRunner.query(`
        ALTER TABLE nguoi_dung
        DROP COLUMN thoi_gian_mo_khoa
      `);
    }
  }
}
