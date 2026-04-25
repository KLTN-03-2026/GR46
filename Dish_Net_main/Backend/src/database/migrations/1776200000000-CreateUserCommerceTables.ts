import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserCommerceTables1776200000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS gio_hang_chi_tiet (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_nguoi_dung BIGINT UNSIGNED NOT NULL,
        id_cua_hang BIGINT UNSIGNED NOT NULL,
        id_mon_an BIGINT UNSIGNED NOT NULL,
        so_luong INT NOT NULL,
        ghi_chu TEXT NULL,
        topping_da_chon JSON NULL COMMENT 'Snapshot topping da chon [{id, ten, gia}]',
        duoc_chon TINYINT(1) NOT NULL DEFAULT 1,
        gia_tai_thoi_diem_them DECIMAL(14,2) NOT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_gio_hang (id_nguoi_dung, id_cua_hang, id_mon_an),
        KEY idx_gio_hang_nguoi_dung (id_nguoi_dung, id_cua_hang, duoc_chon),
        CONSTRAINT fk_gio_hang_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT fk_gio_hang_cua_hang FOREIGN KEY (id_cua_hang) REFERENCES cua_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_gio_hang_mon_an FOREIGN KEY (id_mon_an) REFERENCES mon_an(id) ON DELETE CASCADE,
        CONSTRAINT ck_gio_hang_so_luong CHECK (so_luong > 0)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS don_hang_khuyen_mai (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_don_hang BIGINT UNSIGNED NOT NULL,
        id_khuyen_mai BIGINT UNSIGNED NULL,
        ma_khuyen_mai_snapshot VARCHAR(50) NOT NULL,
        so_tien_giam DECIMAL(14,2) NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        KEY idx_don_hang_khuyen_mai_don_hang (id_don_hang),
        CONSTRAINT fk_don_hang_khuyen_mai_don_hang FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE,
        CONSTRAINT fk_don_hang_khuyen_mai_khuyen_mai FOREIGN KEY (id_khuyen_mai) REFERENCES khuyen_mai(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS thanh_toan (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_don_hang BIGINT UNSIGNED NOT NULL,
        cong_thanh_toan VARCHAR(30) NULL,
        ma_giao_dich VARCHAR(120) NULL,
        phuong_thuc_thanh_toan VARCHAR(30) NOT NULL,
        so_tien DECIMAL(14,2) NOT NULL,
        trang_thai_thanh_toan VARCHAR(20) NOT NULL DEFAULT 'cho_thanh_toan',
        thoi_gian_thanh_toan DATETIME NULL,
        so_tien_hoan_tien DECIMAL(14,2) NULL,
        thoi_gian_hoan_tien DATETIME NULL,
        noi_dung_loi TEXT NULL,
        ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_thanh_toan_don_hang (id_don_hang, trang_thai_thanh_toan, thoi_gian_thanh_toan),
        CONSTRAINT fk_thanh_toan_don_hang FOREIGN KEY (id_don_hang) REFERENCES don_hang(id) ON DELETE CASCADE,
        CONSTRAINT ck_thanh_toan_cong CHECK (cong_thanh_toan IN ('vnpay', 'momo', 'zalopay', 'noi_bo', 'khac') OR cong_thanh_toan IS NULL),
        CONSTRAINT ck_thanh_toan_phuong_thuc CHECK (phuong_thuc_thanh_toan IN ('tien_mat', 'vnpay', 'vi_dien_tu', 'the')),
        CONSTRAINT ck_thanh_toan_trang_thai CHECK (trang_thai_thanh_toan IN ('cho_thanh_toan', 'thanh_cong', 'that_bai', 'da_hoan_tien'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tin_nhan (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_cuoc_tro_chuyen BIGINT UNSIGNED NOT NULL,
        id_nguoi_gui BIGINT UNSIGNED NOT NULL,
        noi_dung TEXT NULL,
        loai_tin_nhan VARCHAR(20) NOT NULL DEFAULT 'van_ban',
        thoi_gian_gui DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        thoi_gian_xem DATETIME NULL,
        da_thu_hoi TINYINT(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        KEY idx_tin_nhan_cuoc_tro_chuyen (id_cuoc_tro_chuyen, thoi_gian_gui),
        KEY idx_tin_nhan_nguoi_gui (id_nguoi_gui),
        CONSTRAINT fk_tin_nhan_cuoc_tro_chuyen FOREIGN KEY (id_cuoc_tro_chuyen) REFERENCES cuoc_tro_chuyen(id) ON DELETE CASCADE,
        CONSTRAINT fk_tin_nhan_nguoi_gui FOREIGN KEY (id_nguoi_gui) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
        CONSTRAINT ck_tin_nhan_loai CHECK (loai_tin_nhan IN ('van_ban', 'hinh_anh', 'tep', 'he_thong'))
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS tin_nhan');
    await queryRunner.query('DROP TABLE IF EXISTS thanh_toan');
    await queryRunner.query('DROP TABLE IF EXISTS don_hang_khuyen_mai');
    await queryRunner.query('DROP TABLE IF EXISTS gio_hang_chi_tiet');
  }
}
