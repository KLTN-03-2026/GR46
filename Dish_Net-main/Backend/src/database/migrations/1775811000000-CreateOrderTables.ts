import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTables1775811000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS don_hang (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ma_don_hang VARCHAR(50) NOT NULL,
        id_nguoi_mua BIGINT UNSIGNED NOT NULL,
        id_cua_hang BIGINT UNSIGNED NOT NULL,
        nguoi_nhan VARCHAR(120) NOT NULL,
        so_dien_thoai_nhan VARCHAR(20) NOT NULL,
        dia_chi_giao TEXT NOT NULL,
        nguon_don_hang VARCHAR(20) NOT NULL DEFAULT 'truc_tiep',
        phuong_thuc_thanh_toan VARCHAR(30) NOT NULL,
        trang_thai_don_hang VARCHAR(30) NOT NULL DEFAULT 'cho_xac_nhan',
        tam_tinh DECIMAL(14, 2) NOT NULL DEFAULT 0,
        phi_van_chuyen DECIMAL(14, 2) NOT NULL DEFAULT 0,
        tong_giam_gia DECIMAL(14, 2) NOT NULL DEFAULT 0,
        tong_thanh_toan DECIMAL(14, 2) NOT NULL DEFAULT 0,
        thu_nhap_cua_hang DECIMAL(14, 2) NOT NULL DEFAULT 0,
        hoa_hong_nen_tang DECIMAL(14, 2) NOT NULL DEFAULT 0,
        hoa_hong_nha_sang_tao DECIMAL(14, 2) NOT NULL DEFAULT 0,
        ly_do_huy TEXT NULL,
        ly_do_tra_hang TEXT NULL,
        nguoi_huy VARCHAR(20) NULL,
        thoi_gian_dat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        thoi_gian_xac_nhan DATETIME NULL,
        thoi_gian_giao DATETIME NULL,
        thoi_gian_hoan_tat DATETIME NULL,
        thoi_gian_huy DATETIME NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uq_don_hang_ma (ma_don_hang),
        KEY idx_don_hang_nguoi_mua (id_nguoi_mua, trang_thai_don_hang, thoi_gian_dat),
        KEY idx_don_hang_cua_hang (id_cua_hang, trang_thai_don_hang, thoi_gian_dat),
        CONSTRAINT fk_don_hang_nguoi_mua FOREIGN KEY (id_nguoi_mua) REFERENCES nguoi_dung(id) ON DELETE RESTRICT,
        CONSTRAINT fk_don_hang_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS don_hang_chi_tiet (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_don_hang BIGINT UNSIGNED NOT NULL,
        id_mon_an BIGINT UNSIGNED NULL,
        ten_mon_snapshot VARCHAR(255) NOT NULL,
        hinh_anh_snapshot TEXT NULL,
        don_gia DECIMAL(14, 2) NOT NULL,
        so_luong INT NOT NULL,
        thanh_tien DECIMAL(14, 2) NOT NULL,
        topping_snapshot JSON NULL,
        ghi_chu TEXT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_don_hang_chi_tiet_don_hang FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_don_hang_chi_tiet_mon_an FOREIGN KEY (id_mon_an) REFERENCES mon_an(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS lich_su_don_hang (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_don_hang BIGINT UNSIGNED NOT NULL,
        trang_thai_tu VARCHAR(30) NULL,
        trang_thai_den VARCHAR(30) NOT NULL,
        noi_dung TEXT NULL,
        id_nguoi_cap_nhat BIGINT UNSIGNED NULL,
        thoi_gian_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_lich_su_don_hang (id_don_hang, thoi_gian_cap_nhat),
        CONSTRAINT fk_lich_su_don_hang_don_hang FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_lich_su_don_hang_nguoi_cap_nhat FOREIGN KEY (id_nguoi_cap_nhat) REFERENCES nguoi_dung(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS lich_su_don_hang");
    await queryRunner.query("DROP TABLE IF EXISTS don_hang_chi_tiet");
    await queryRunner.query("DROP TABLE IF EXISTS don_hang");
  }
}
