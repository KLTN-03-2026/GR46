import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoreMenuTables1775800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cua_hang (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_chu_so_huu BIGINT UNSIGNED NOT NULL,
        ten_cua_hang VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        mo_ta TEXT,
        anh_dai_dien TEXT,
        so_dien_thoai_lien_he VARCHAR(20),
        dia_chi_kinh_doanh TEXT NOT NULL,
        khu_vuc VARCHAR(120),
        vi_do DECIMAL(10, 7),
        kinh_do DECIMAL(10, 7),
        gio_mo_cua TIME,
        gio_dong_cua TIME,
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
      CREATE TABLE IF NOT EXISTS danh_muc_mon (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_cua_hang BIGINT UNSIGNED,
        id_danh_muc_cha BIGINT UNSIGNED,
        ten_danh_muc VARCHAR(120) NOT NULL,
        thu_tu_hien_thi INT NOT NULL DEFAULT 1,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'hieu_luc',
        PRIMARY KEY (id),
        CONSTRAINT fk_danh_muc_mon_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_danh_muc_mon_cha FOREIGN KEY (id_danh_muc_cha) REFERENCES danh_muc_mon(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS mon_an (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_cua_hang BIGINT UNSIGNED NOT NULL,
        id_danh_muc BIGINT UNSIGNED,
        ma_mon VARCHAR(50) NOT NULL,
        ten_mon VARCHAR(255) NOT NULL,
        mo_ta TEXT,
        hinh_anh_dai_dien TEXT,
        gia_ban DECIMAL(14, 2) NOT NULL,
        gia_goc DECIMAL(14, 2),
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
        CONSTRAINT fk_mon_an_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_mon_an_danh_muc FOREIGN KEY (id_danh_muc) REFERENCES danh_muc_mon(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS topping (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_mon_an BIGINT UNSIGNED NOT NULL,
        ten_topping VARCHAR(120) NOT NULL,
        gia DECIMAL(14, 2) NOT NULL DEFAULT 0,
        trang_thai VARCHAR(20) NOT NULL DEFAULT 'hieu_luc',
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_topping_mon_an (id_mon_an),
        CONSTRAINT fk_topping_mon_an FOREIGN KEY (id_mon_an) REFERENCES mon_an(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS topping");
    await queryRunner.query("DROP TABLE IF EXISTS mon_an");
    await queryRunner.query("DROP TABLE IF EXISTS danh_muc_mon");
    await queryRunner.query("DROP TABLE IF EXISTS cua_hang");
  }
}
