-- AUTO GENERATED - 50 Quán ăn Đà Nẵng
-- Tạo lúc: 03:12:50 16/5/2026

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

-- ===== [1/54] Quán Bún Bò Huế Bà Tuyết =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('quanbunbohuebatuyet', 'quanbunbohuebatuyet@dishnet.vn', '0236382001', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Quán Bún Bò Huế Bà Tuyết', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Quán Bún Bò Huế Bà Tuyết', 'quan-bun-bo-hue-ba-tuyet-1', '45 Lê Đình Dương, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0636, 108.2196, '0236382001', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Bò', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-001', 'Bún bò đặc biệt', 'Bún bò Huế đặc biệt với giò heo, chả cua', 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-002', 'Bún bò thường', 'Bún bò Huế truyền thống', 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-003', 'Bún bò giò heo', 'Bún bò Huế có thêm giò heo', 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-004', 'Bún bò chả cua', 'Bún bò Huế có thêm chả cua', 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-005', 'Bún riêu cua', 'Bún riêu cua đồng thơm ngon', 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU2-001', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU2-002', 'Nước ngọt', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1;


-- ===== [2/54] Mỳ Quảng Ếch 1A =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('myquangech1a', 'myquangech1a@dishnet.vn', '02363822777', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Mỳ Quảng Ếch 1A', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Mỳ Quảng Ếch 1A', 'my-quang-ech-1a-2', '1A Hải Phòng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0681, 108.2208, '02363822777', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'myquangech1a' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mỳ Quảng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-001', 'Mỳ quảng ếch', 'Mỳ quảng đặc trưng với ếch chiên', 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-002', 'Mỳ quảng tôm thịt', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-003', 'Mỳ quảng gà', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-004', 'Mỳ quảng cá lóc', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-005', 'Mỳ quảng sườn', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN2-001', 'Bánh tráng nướng', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangech1a' LIMIT 1;


-- ===== [3/54] Phở Hoa - Ngon Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('phohoangondanang', 'phohoangondanang@dishnet.vn', '0905123456', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Phở Hoa - Ngon Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Phở Hoa - Ngon Đà Nẵng', 'pho-hoa-ngon-da-nang-3', '189 Trần Phú, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0599, 108.2225, '0905123456', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'phohoangondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phở', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA1-001', 'Phở bò tái chín đặc biệt', 'Phở bò tái chín nước dùng đậm đà', 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA1-002', 'Phở bò tái', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA1-003', 'Phở bò chín', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA1-004', 'Phở bò gầu gân', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA1-005', 'Phở gà', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA1-006', 'Phở hải sản', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA2-001', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOHOA2-002', 'Trứng bắc thảo', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phohoangondanang' LIMIT 1;


-- ===== [4/54] Quán Bún Chả Cá Mắm Ruốc Bà Loan =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('quanbunchacamamruocbaloan', 'quanbunchacamamruocbaloan@dishnet.vn', '0236382456', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Quán Bún Chả Cá Mắm Ruốc Bà Loan', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Quán Bún Chả Cá Mắm Ruốc Bà Loan', 'quan-bun-cha-ca-mam-ruoc-ba-loan-4', '23 Hoàng Diệu, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0643, 108.2244, '0236382456', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Chả Cá', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-001', 'Bún chả cá đặc biệt', 'Bún chả cá Đà Nẵng với mắm ruốc', 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả Cá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-002', 'Bún chả cá thường', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả Cá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-003', 'Bún mắm nêm', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả Cá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-004', 'Bún sứa', 'Bún sứa mát lạnh đặc sản Đà Nẵng', 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả Cá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU1-005', 'Cháo cá', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả Cá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU2-001', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANBU2-002', 'Nước mía', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1;


-- ===== [5/54] Cơm Gà Bà Buội =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('comgababuoi', 'comgababuoi@dishnet.vn', '0905888001', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cơm Gà Bà Buội', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cơm Gà Bà Buội', 'com-ga-ba-buoi-5', '22 Lê Lợi, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0674, 108.2215, '0905888001', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Gà', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB1-001', 'Cơm gà đặc biệt', 'Cơm gà Đà Nẵng đặc biệt kèm gà thả vườn', 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Gà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB1-002', 'Cơm gà nửa con', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Gà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB1-003', 'Cơm gà đùi', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Gà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB1-004', 'Cơm gà ức', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Gà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB1-005', 'Cháo gà', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Gà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB1-006', 'Mỳ gà', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Gà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ Trợ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB2-001', 'Canh gà rau ngót', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ Trợ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMGAB2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ Trợ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comgababuoi' LIMIT 1;


-- ===== [6/54] Nhà Hàng Hải Sản Bé Mặn =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('nhahanghaisanbeman', 'nhahanghaisanbeman@dishnet.vn', '02363958001', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Nhà Hàng Hải Sản Bé Mặn', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Nhà Hàng Hải Sản Bé Mặn', 'nha-hang-hai-san-be-man-6', '50 Phạm Văn Đồng, Sơn Trà, Đà Nẵng', 'Đà Nẵng', 16.0733, 108.2302, '02363958001', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Hải Sản Tươi', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-001', 'Tôm hùm nướng phô mai (100g)', NULL, 350000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-002', 'Cua biển hấp bia (1kg)', NULL, 280000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-003', 'Nghêu xào sả ớt', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-004', 'Ốc hương xào bơ tỏi', NULL, 150000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-005', 'Mực nướng sa tế', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-006', 'Tôm sú nướng muối ớt', NULL, 180000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN1-007', 'Cá mú hấp xì dầu', NULL, 250000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Tươi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm & Mì', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN2-001', 'Cơm chiên hải sản', NULL, 85000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm & Mì' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN2-002', 'Mỳ xào hải sản', NULL, 90000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm & Mì' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN3-001', 'Bia Larue', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NHAHAN3-002', 'Nước ngọt', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1;


-- ===== [7/54] Cơm Tấm Sài Gòn Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('comtamsaigondanang', 'comtamsaigondanang@dishnet.vn', '0905234567', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cơm Tấm Sài Gòn Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cơm Tấm Sài Gòn Đà Nẵng', 'com-tam-sai-gon-da-nang-7', '78 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0765, 108.2051, '0905234567', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Tấm', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-001', 'Cơm tấm sườn bì chả', 'Cơm tấm đặc biệt sườn bì chả', 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-002', 'Cơm tấm sườn nướng', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-003', 'Cơm tấm bì chả', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-004', 'Cơm tấm heo quay', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-005', 'Cơm tấm gà nướng', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM2-001', 'Trứng ốp la', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM2-002', 'Canh chua', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM2-003', 'Nước ngọt', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsaigondanang' LIMIT 1;


-- ===== [8/54] Bánh Xèo Bà Dưỡng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhxeobaduong', 'banhxeobaduong@dishnet.vn', '02363873080', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Xèo Bà Dưỡng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Xèo Bà Dưỡng', 'banh-xeo-ba-duong-8', '280/23 Hoàng Diệu, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0591, 108.2223, '02363873080', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhxeobaduong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Xèo', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE1-001', 'Bánh xèo tôm thịt (1 cái)', 'Bánh xèo Đà Nẵng giòn rụm', 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Xèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE1-002', 'Bánh xèo tôm (1 cái)', NULL, 22000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Xèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE1-003', 'Bánh xèo thịt (1 cái)', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Xèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE1-004', 'Bánh xèo set 5 cái', NULL, 110000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Xèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE1-005', 'Bánh xèo set 10 cái', NULL, 200000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Xèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cuốn Bánh Tráng', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE2-001', 'Rau sống kèm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cuốn Bánh Tráng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHXE2-002', 'Bánh tráng cuốn', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cuốn Bánh Tráng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhxeobaduong' LIMIT 1;


-- ===== [9/54] Lẩu Bò Nhúng Dấm Hoàng Kim =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('laubonhungdamhoangkim', 'laubonhungdamhoangkim@dishnet.vn', '0905345678', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Lẩu Bò Nhúng Dấm Hoàng Kim', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Lẩu Bò Nhúng Dấm Hoàng Kim', 'lau-bo-nhung-dam-hoang-kim-9', '15 Yên Bái, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0657, 108.2181, '0905345678', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Lẩu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON1-001', 'Lẩu bò nhúng dấm (2 người)', NULL, 280000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON1-002', 'Lẩu thái hải sản', NULL, 320000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON1-003', 'Lẩu mắm', NULL, 290000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON1-004', 'Lẩu riêu cua', NULL, 270000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON1-005', 'Lẩu nấm hải sản chay', NULL, 250000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm Vào Lẩu', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON2-001', 'Thịt bò thêm', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm Vào Lẩu' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON2-002', 'Hải sản thêm', NULL, 150000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm Vào Lẩu' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON2-003', 'Rau thêm', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm Vào Lẩu' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON3-001', 'Bia Larue', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUBON3-002', 'Nước ngọt', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1;


-- ===== [10/54] Nem Nướng Bà Nga Hòa Vang =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('nemnuongbangahoavang', 'nemnuongbangahoavang@dishnet.vn', '0905456789', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Nem Nướng Bà Nga Hòa Vang', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Nem Nướng Bà Nga Hòa Vang', 'nem-nuong-ba-nga-hoa-vang-10', '92 Đống Đa, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0644, 108.2197, '0905456789', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Nem Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO1-001', 'Nem nướng cuốn bánh tráng (5 cuốn)', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO1-002', 'Nem nướng (10 que)', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO1-003', 'Bò nướng cuốn bánh tráng', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO1-004', 'Heo nướng cuốn bánh tráng', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO1-005', 'Set hỗn hợp nem + bò', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Nước Chấm & Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO2-001', 'Bún kèm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Chấm & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NEMNUO2-002', 'Rau sống', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Chấm & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1;


-- ===== [11/54] Bánh Mì Bà Lan - Ngon Nức Tiếng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhmibalanngonnuctieng', 'banhmibalanngonnuctieng@dishnet.vn', '0905567890', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Mì Bà Lan - Ngon Nức Tiếng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Mì Bà Lan - Ngon Nức Tiếng', 'banh-mi-ba-lan-ngon-nuc-tieng-11', '362 Điện Biên Phủ, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0721, 108.2102, '0905567890', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Mì', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-001', 'Bánh mì đặc biệt', 'Bánh mì pate jambon đặc biệt', 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-002', 'Bánh mì thịt nướng', NULL, 28000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-003', 'Bánh mì trứng', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-004', 'Bánh mì bơ mật ong', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-005', 'Bánh mì xíu mại', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-006', 'Bánh mì ốp la', NULL, 22000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1;


-- ===== [12/54] Bánh Canh Cô Thu Cá Lóc =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhcanhcothucaloc', 'banhcanhcothucaloc@dishnet.vn', '0905678901', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Canh Cô Thu Cá Lóc', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Canh Cô Thu Cá Lóc', 'banh-canh-co-thu-ca-loc-12', '17 Nguyễn Tri Phương, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0668, 108.2183, '0905678901', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Canh', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-001', 'Bánh canh cá lóc', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-002', 'Bánh canh tôm', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-003', 'Bánh canh cua', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-004', 'Bánh canh hỗn hợp', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-005', 'Bánh canh chay', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA2-001', 'Thêm trứng', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1;


-- ===== [13/54] The Coffee House Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('thecoffeehousedanang', 'thecoffeehousedanang@dishnet.vn', '1800 6936', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'The Coffee House Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'The Coffee House Đà Nẵng', 'the-coffee-house-da-nang-13', '151 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0581, 108.2199, '1800 6936', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cà Phê', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-001', 'Cà phê sữa đá', NULL, 39000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-002', 'Bạc xỉu', NULL, 39000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-003', 'Cà phê đen đá', NULL, 29000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-004', 'Cold brew đen', NULL, 49000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-005', 'Espresso', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-006', 'Cappuccino', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF1-007', 'Latte', NULL, 59000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Trà', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF2-001', 'Trà đào cam sả', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF2-002', 'Trà vải', NULL, 49000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF2-003', 'Hồng trà sữa', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Ngọt', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF3-001', 'Bánh tiramisu', NULL, 49000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ngọt' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'THECOF3-002', 'Croissant bơ', NULL, 39000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ngọt' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1;


-- ===== [14/54] Gong Cha Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('gongchadanang', 'gongchadanang@dishnet.vn', '0905789012', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Gong Cha Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Gong Cha Đà Nẵng', 'gong-cha-da-nang-14', 'Vincom Đà Nẵng, 910A Ngô Quyền, Sơn Trà', 'Đà Nẵng', 16.0802, 108.2395, '0905789012', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'gongchadanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Trà Sữa', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH1-001', 'Trà sữa trân châu đen', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH1-002', 'Trà sữa khoai môn', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH1-003', 'Trà sữa matcha', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH1-004', 'Milk foam trà xanh', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH1-005', 'Brown sugar bubble milk tea', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Trà Trái Cây', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH2-001', 'Trà đào cam sả', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Trái Cây' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH2-002', 'Trà xanh vải nhãn', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Trái Cây' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Topping', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH3-001', 'Trân châu đen thêm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Topping' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GONGCH3-002', 'Thạch thêm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Topping' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'gongchadanang' LIMIT 1;


-- ===== [15/54] Trà Sữa TocoToco Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('trasuatocotocodanang', 'trasuatocotocodanang@dishnet.vn', '0905890123', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Trà Sữa TocoToco Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Trà Sữa TocoToco Đà Nẵng', 'tra-sua-tocotoco-da-nang-15', '75 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0691, 108.2216, '0905890123', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Trà Sữa', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA1-001', 'Trà sữa đài loan cổ điển', NULL, 39000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA1-002', 'Trà sữa khoai môn', NULL, 42000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA1-003', 'Sữa tươi trân châu đường đen', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA1-004', 'Trà sữa matcha đậu đỏ', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA1-005', 'Hồng trà sữa', NULL, 42000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà Sữa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Sinh Tố', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA2-001', 'Sinh tố xoài', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA2-002', 'Sinh tố bơ', NULL, 49000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TRASUA2-003', 'Sinh tố dứa dừa', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1;


-- ===== [16/54] Pizza Home Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('pizzahomedanang', 'pizzahomedanang@dishnet.vn', '0236382007', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Pizza Home Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Pizza Home Đà Nẵng', 'pizza-home-da-nang-16', '30 Nguyễn Du, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0655, 108.2243, '0236382007', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'pizzahomedanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Pizza', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH1-001', 'Pizza pepperoni 9 inch', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Pizza' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH1-002', 'Pizza hải sản 9 inch', NULL, 145000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Pizza' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH1-003', 'Pizza 4 phô mai 9 inch', NULL, 140000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Pizza' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH1-004', 'Pizza thịt bò 9 inch', NULL, 135000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Pizza' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH1-005', 'Pizza gà BBQ 9 inch', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Pizza' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH1-006', 'Pizza Margherita 9 inch', NULL, 115000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Pizza' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mỳ Ý', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH2-001', 'Spaghetti thịt bò bằm', NULL, 85000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Ý' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH2-002', 'Spaghetti carbonara', NULL, 90000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Ý' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH3-001', 'Pepsi', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PIZZAH3-002', 'Nước suối', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'pizzahomedanang' LIMIT 1;


-- ===== [17/54] Gà Rán KFC Đà Nẵng - Đống Đa =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('garankfcdanangdongda', 'garankfcdanangdongda@dishnet.vn', '1800 6086', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Gà Rán KFC Đà Nẵng - Đống Đa', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Gà Rán KFC Đà Nẵng - Đống Đa', 'ga-ran-kfc-da-nang-dong-da-17', '174 Điện Biên Phủ, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0716, 108.2108, '1800 6086', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Gà Rán', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK1-001', 'Miếng gà rán (1 miếng)', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Rán' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK1-002', 'Gà rán combo 2 miếng', NULL, 79000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Rán' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK1-003', 'Gà rán combo 3 miếng', NULL, 109000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Rán' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK1-004', 'Bucket 6 miếng', NULL, 219000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Rán' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Burger', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK2-001', 'Zinger burger', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Burger' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK2-002', 'Double down burger', NULL, 85000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Burger' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK2-003', 'Chicken burger', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Burger' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Combo', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK3-001', 'Combo gà + khoai tây + nước', NULL, 89000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Combo' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 4, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK4-001', 'Pepsi L', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 4
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GARANK4-002', 'Trà chanh', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 4
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1;


-- ===== [18/54] Mỳ Quảng Bà Mua =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('myquangbamua', 'myquangbamua@dishnet.vn', '0905901234', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Mỳ Quảng Bà Mua', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Mỳ Quảng Bà Mua', 'my-quang-ba-mua-18', '19 Trần Bình Trọng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0671, 108.2225, '0905901234', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'myquangbamua' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mỳ Quảng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-001', 'Mỳ quảng tôm thịt', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-002', 'Mỳ quảng gà', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-003', 'Mỳ quảng cá lóc', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-004', 'Mỳ quảng sườn', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-005', 'Mỳ quảng chay', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bắp Cải Muối & Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN2-001', 'Bánh đa', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bắp Cải Muối & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN2-002', 'Rau thêm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bắp Cải Muối & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangbamua' LIMIT 1;


-- ===== [19/54] Cao Lầu Hội An Giữa Lòng Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('caolauhoiangiualongdanang', 'caolauhoiangiualongdanang@dishnet.vn', '0905012345', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cao Lầu Hội An Giữa Lòng Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cao Lầu Hội An Giữa Lòng Đà Nẵng', 'cao-lau-hoi-an-giua-long-da-nang-19', '88 Lê Duẩn, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0601, 108.2231, '0905012345', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cao Lầu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAOLAU1-001', 'Cao lầu thịt heo', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cao Lầu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAOLAU1-002', 'Cao lầu tôm', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cao Lầu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAOLAU1-003', 'Cao lầu đặc biệt', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cao Lầu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mì Hoành Thánh', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAOLAU2-001', 'Hoành thánh chiên', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mì Hoành Thánh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAOLAU2-002', 'Hoành thánh nước', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mì Hoành Thánh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1;


-- ===== [20/54] Chè 3 Cô Em - Chè Ngon Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('che3coemchengondanang', 'che3coemchengondanang@dishnet.vn', '0905123789', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Chè 3 Cô Em - Chè Ngon Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Chè 3 Cô Em - Chè Ngon Đà Nẵng', 'che-3-co-em-che-ngon-da-nang-20', '28 Phan Đình Phùng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0649, 108.2201, '0905123789', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Chè', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-001', 'Chè ba màu', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-002', 'Chè đậu xanh đánh', NULL, 22000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-003', 'Chè bưởi', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-004', 'Chè khúc bạch', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-005', 'Chè thái', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-006', 'Chè hạt sen long nhãn', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO1-007', 'Sương sáo đậu đỏ', NULL, 22000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Nước Ép', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO2-001', 'Nước mía', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHE3CO2-002', 'Trà tắc', NULL, 18000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'che3coemchengondanang' LIMIT 1;


-- ===== [21/54] Cháo Lòng Bà Sáu - Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('chaolongbasaudanang', 'chaolongbasaudanang@dishnet.vn', '0905234890', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cháo Lòng Bà Sáu - Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cháo Lòng Bà Sáu - Đà Nẵng', 'chao-long-ba-sau-da-nang-21', '56 Tô Hiến Thành, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0742, 108.2075, '0905234890', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cháo', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-001', 'Cháo lòng đặc biệt', 'Cháo lòng heo với đầy đủ nội tạng', 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-002', 'Cháo lòng thường', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-003', 'Cháo gà', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-004', 'Cháo cá', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-005', 'Cháo tôm', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO2-001', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO2-002', 'Huyết heo', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1;


-- ===== [22/54] Xôi Chè Bà Hạnh - Ngon Rẻ =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('xoichebahanhngonre', 'xoichebahanhngonre@dishnet.vn', '0905345901', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Xôi Chè Bà Hạnh - Ngon Rẻ', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Xôi Chè Bà Hạnh - Ngon Rẻ', 'xoi-che-ba-hanh-ngon-re-22', '12 Lý Tự Trọng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0663, 108.2236, '0905345901', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Xôi', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE1-001', 'Xôi xéo', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE1-002', 'Xôi gà', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE1-003', 'Xôi lạp xưởng', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE1-004', 'Xôi bắp', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE1-005', 'Xôi khúc', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Chè', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE2-001', 'Chè đậu đen', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOICHE2-002', 'Chè đậu trắng', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1;


-- ===== [23/54] Bò Tái Chanh Sơn Trà =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('botaichanhsontra', 'botaichanhsontra@dishnet.vn', '0905456012', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bò Tái Chanh Sơn Trà', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bò Tái Chanh Sơn Trà', 'bo-tai-chanh-son-tra-23', '137 Hà Bổng, Sơn Trà, Đà Nẵng', 'Đà Nẵng', 16.0787, 108.2341, '0905456012', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'botaichanhsontra' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bò Tái Chanh', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC1-001', 'Bò tái chanh (1 đĩa)', 'Bò tái chanh tươi ngon đặc trưng', 95000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bò Tái Chanh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC1-002', 'Bò tái chanh (nửa đĩa)', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bò Tái Chanh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC1-003', 'Bò nướng ngũ vị', NULL, 110000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bò Tái Chanh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC1-004', 'Bò lúc lắc', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bò Tái Chanh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC1-005', 'Gỏi bò bóp thấu', NULL, 90000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bò Tái Chanh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm & Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC2-001', 'Cơm trắng', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm & Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BOTAIC2-002', 'Bún', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm & Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'botaichanhsontra' LIMIT 1;


-- ===== [24/54] Quán Ốc Biển Đêm Mỹ Khê =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('quanocbiendemmykhe', 'quanocbiendemmykhe@dishnet.vn', '0905567123', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Quán Ốc Biển Đêm Mỹ Khê', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Quán Ốc Biển Đêm Mỹ Khê', 'quan-oc-bien-dem-my-khe-24', '65 Trường Sa, Ngũ Hành Sơn, Đà Nẵng', 'Đà Nẵng', 16.0331, 108.2534, '0905567123', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Ốc Biển', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-001', 'Ốc hương xào bơ tỏi', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-002', 'Ốc len xào dừa', NULL, 90000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-003', 'Ốc mỡ hấp sả', NULL, 80000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-004', 'Ốc bươu xào sả ớt', NULL, 85000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-005', 'Ghẹ rang muối', NULL, 200000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-006', 'Sò huyết xào tỏi', NULL, 95000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC1-007', 'Ngao hấp gừng', NULL, 90000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ốc Biển' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC2-001', 'Bia lon Heineken', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANOC2-002', 'Nước ngọt', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1;


-- ===== [25/54] Bún Thịt Nướng Miền Trung Cô Ba =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunthitnuongmientrungcoba', 'bunthitnuongmientrungcoba@dishnet.vn', '0905678234', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bún Thịt Nướng Miền Trung Cô Ba', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Thịt Nướng Miền Trung Cô Ba', 'bun-thit-nuong-mien-trung-co-ba-25', '34 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', 'Đà Nẵng', 16.0321, 108.2181, '0905678234', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Thịt Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-001', 'Bún thịt nướng đặc biệt', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-002', 'Bún thịt nướng chả giò', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-003', 'Bún thịt nướng chay', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-004', 'Bún thịt nướng gà', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cuốn', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI2-001', 'Chả giò chiên (3 cuốn)', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cuốn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI2-002', 'Nem cuốn (3 cuốn)', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cuốn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1;


-- ===== [26/54] Hủ Tiếu Nam Vang Sài Gòn Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('hutieunamvangsaigondanang', 'hutieunamvangsaigondanang@dishnet.vn', '0905789345', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Hủ Tiếu Nam Vang Sài Gòn Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Hủ Tiếu Nam Vang Sài Gòn Đà Nẵng', 'hu-tieu-nam-vang-sai-gon-da-nang-26', '27 Trần Phú, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0607, 108.2228, '0905789345', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Hủ Tiếu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-001', 'Hủ tiếu Nam Vang đặc biệt', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-002', 'Hủ tiếu khô', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-003', 'Hủ tiếu nước', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-004', 'Hủ tiếu bò', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-005', 'Hủ tiếu hải sản', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU2-001', 'Trứng cút', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU2-002', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1;


-- ===== [27/54] Sushi Sashimi Nhật Ngon Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('sushisashiminhatngondanang', 'sushisashiminhatngondanang@dishnet.vn', '0236382088', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Sushi Sashimi Nhật Ngon Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Sushi Sashimi Nhật Ngon Đà Nẵng', 'sushi-sashimi-nhat-ngon-da-nang-27', '67 Bạch Đằng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0674, 108.2258, '0236382088', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Sushi', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS1-001', 'Salmon sushi (8 miếng)', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sushi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS1-002', 'Tuna sushi (8 miếng)', NULL, 110000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sushi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS1-003', 'Ebi sushi (8 miếng)', NULL, 100000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sushi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS1-004', 'California roll (8 miếng)', NULL, 95000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sushi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS1-005', 'Dragon roll (8 miếng)', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sushi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Sashimi', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS2-001', 'Sashimi cá hồi (8 miếng)', NULL, 150000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sashimi' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS2-002', 'Sashimi cá ngừ (8 miếng)', NULL, 140000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sashimi' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS3-001', 'Trà xanh nóng', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'SUSHIS3-002', 'Nước suối', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1;


-- ===== [28/54] Cơm Niêu Sài Gòn Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('comnieusaigondanang', 'comnieusaigondanang@dishnet.vn', '0905890456', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cơm Niêu Sài Gòn Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cơm Niêu Sài Gòn Đà Nẵng', 'com-nieu-sai-gon-da-nang-28', '102 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0699, 108.2211, '0905890456', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Niêu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE1-001', 'Cơm niêu sườn nướng', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Niêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE1-002', 'Cơm niêu gà kho gừng', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Niêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE1-003', 'Cơm niêu cá kho tộ', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Niêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE1-004', 'Cơm niêu thịt kho tàu', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Niêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE1-005', 'Cơm niêu hải sản', NULL, 85000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Niêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Canh', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE2-001', 'Canh chua cá', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNIE2-002', 'Canh rau tập tàng', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnieusaigondanang' LIMIT 1;


-- ===== [29/54] Lẩu Nấm Chay Tịnh Tâm =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('launamchaytinhtam', 'launamchaytinhtam@dishnet.vn', '0905901567', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Lẩu Nấm Chay Tịnh Tâm', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Lẩu Nấm Chay Tịnh Tâm', 'lau-nam-chay-tinh-tam-29', '55 Pasteur, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0631, 108.2195, '0905901567', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Lẩu Chay', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM1-001', 'Lẩu nấm thập cẩm chay', NULL, 220000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Chay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM1-002', 'Lẩu rau củ chay', NULL, 180000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Chay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM1-003', 'Lẩu đậu hũ nấm kim châm', NULL, 200000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Chay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Chay', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM2-001', 'Cơm chay phần', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Chay' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM2-002', 'Bún chay', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Chay' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM2-003', 'Mỳ xào chay', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Chay' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Nước Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM3-001', 'Nước ép táo', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUNAM3-002', 'Trà thảo mộc', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'launamchaytinhtam' LIMIT 1;


-- ===== [30/54] Bánh Tráng Cuốn Thịt Heo Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhtrangcuonthitheodanang', 'banhtrangcuonthitheodanang@dishnet.vn', '0905012678', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Tráng Cuốn Thịt Heo Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Tráng Cuốn Thịt Heo Đà Nẵng', 'banh-trang-cuon-thit-heo-da-nang-30', '78 Thái Phiên, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0661, 108.2189, '0905012678', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Tráng Cuốn', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-001', 'Bánh tráng cuốn thịt heo (set 5 cuốn)', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-002', 'Bánh tráng cuốn tôm (set 5 cuốn)', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-003', 'Bánh tráng cuốn bò (set 5 cuốn)', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-004', 'Set hỗn hợp 3 loại', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Kèm Theo', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR2-001', 'Rau sống thêm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kèm Theo' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR2-002', 'Nước mắm cuốn', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kèm Theo' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1;


-- ===== [31/54] BBQ Nướng Bếp Than Hồng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bbqnuongbepthanhong', 'bbqnuongbepthanhong@dishnet.vn', '0236382099', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'BBQ Nướng Bếp Than Hồng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'BBQ Nướng Bếp Than Hồng', 'bbq-nuong-bep-than-hong-31', '45 Hoàng Sa, Sơn Trà, Đà Nẵng', 'Đà Nẵng', 16.0756, 108.2314, '0236382099', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thịt Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO1-001', 'Sườn heo nướng (300g)', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO1-002', 'Thịt ba chỉ nướng (300g)', NULL, 110000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO1-003', 'Gà nướng nguyên con', NULL, 250000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO1-004', 'Bò nướng lá lốt (200g)', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO1-005', 'Heo quay da giòn (300g)', NULL, 135000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Hải Sản Nướng', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO2-001', 'Tôm nướng muối ớt (200g)', NULL, 150000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO2-002', 'Mực nướng sa tế (200g)', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO3-001', 'Bia Larue', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BBQNUO3-002', 'Bia Tiger', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1;


-- ===== [32/54] Dim Sum Trung Hoa Minh Châu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('dimsumtrunghoaminhchau', 'dimsumtrunghoaminhchau@dishnet.vn', '0905123890', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Dim Sum Trung Hoa Minh Châu', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Dim Sum Trung Hoa Minh Châu', 'dim-sum-trung-hoa-minh-chau-32', '19 Núi Thành, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0619, 108.2241, '0905123890', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Dim Sum', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM1-001', 'Há cảo tôm (4 viên)', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dim Sum' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM1-002', 'Sủi cảo chiên (4 viên)', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dim Sum' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM1-003', 'Bánh bao xá xíu (1 cái)', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dim Sum' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM1-004', 'Xíu mai tôm thịt (4 viên)', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dim Sum' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM1-005', 'Chả giò hải sản (3 cuốn)', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dim Sum' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM1-006', 'Bánh cuốn tôm chiên', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dim Sum' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cháo & Mỳ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM2-001', 'Cháo con sò', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo & Mỳ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'DIMSUM2-002', 'Mỳ vịt quay', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo & Mỳ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1;


-- ===== [33/54] Quán Cơm Bình Dân Minh Phú =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('quancombinhdanminhphu', 'quancombinhdanminhphu@dishnet.vn', '0905234901', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Quán Cơm Bình Dân Minh Phú', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Quán Cơm Bình Dân Minh Phú', 'quan-com-binh-dan-minh-phu-33', '145 Trường Chinh, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0753, 108.2033, '0905234901', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Đĩa', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO1-001', 'Cơm sườn chiên trứng', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Đĩa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO1-002', 'Cơm gà kho sả', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Đĩa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO1-003', 'Cơm cá kho tộ', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Đĩa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO1-004', 'Cơm thịt kho hột vịt', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Đĩa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO1-005', 'Cơm đặc biệt 3 món', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Đĩa' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Canh', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO2-001', 'Canh rau muống', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANCO2-002', 'Canh khổ qua', NULL, 12000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1;


-- ===== [34/54] Bún Đậu Mắm Tôm Hà Nội Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bundaumamtomhanoidanang', 'bundaumamtomhanoidanang@dishnet.vn', '0905345012', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bún Đậu Mắm Tôm Hà Nội Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Đậu Mắm Tôm Hà Nội Đà Nẵng', 'bun-dau-mam-tom-ha-noi-da-nang-34', '23 Nguyễn Đình Chiểu, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0648, 108.2207, '0905345012', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Đậu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-001', 'Bún đậu mắm tôm set A', 'Bún đậu + chả cốm + đậu rán + nem rán', 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-002', 'Bún đậu mắm tôm set B', 'Set đầy đủ với lòng heo', 80000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-003', 'Bún đậu mắm tôm thường', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-004', 'Nem rán (3 cái)', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-005', 'Chả cốm (3 cái)', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU2-001', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU2-002', 'Trà tắc', NULL, 18000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1;


-- ===== [35/54] Gỏi Cuốn Tôm Thịt Thanh Bình =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('goicuontomthitthanhbinh', 'goicuontomthitthanhbinh@dishnet.vn', '0905456123', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Gỏi Cuốn Tôm Thịt Thanh Bình', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Gỏi Cuốn Tôm Thịt Thanh Bình', 'goi-cuon-tom-thit-thanh-binh-35', '89 Lê Thanh Nghị, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0638, 108.2217, '0905456123', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Gỏi Cuốn', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO1-001', 'Gỏi cuốn tôm thịt (3 cuốn)', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO1-002', 'Gỏi cuốn chay (3 cuốn)', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO1-003', 'Gỏi cuốn bò (3 cuốn)', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO1-004', 'Chả giò chiên (3 cái)', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Gỏi Trộn', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO2-001', 'Gỏi xoài tôm thịt', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Trộn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO2-002', 'Gỏi đu đủ', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Trộn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GOICUO2-003', 'Gỏi ngó sen', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gỏi Trộn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1;


-- ===== [36/54] Lẩu Dê Bình Định Hương Quê =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('laudebinhdinhhuongque', 'laudebinhdinhhuongque@dishnet.vn', '0905567234', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Lẩu Dê Bình Định Hương Quê', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Lẩu Dê Bình Định Hương Quê', 'lau-de-binh-dinh-huong-que-36', '35 Nguyễn Tất Thành, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0582, 108.2237, '0905567234', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Lẩu Dê', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB1-001', 'Lẩu dê (2 người)', NULL, 290000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Dê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB1-002', 'Lẩu dê (4 người)', NULL, 520000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Dê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB1-003', 'Thịt dê thêm (300g)', NULL, 150000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Dê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Dê Nướng', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB2-001', 'Dê nướng sa tế (300g)', NULL, 165000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dê Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB2-002', 'Dê hấp gừng (300g)', NULL, 155000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dê Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB2-003', 'Dê xào lăn (300g)', NULL, 160000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Dê Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB3-001', 'Bia Larue', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUDEB3-002', 'Rượu gạo', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1;


-- ===== [37/54] Bánh Cuốn Thanh Trì Bà Hương =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhcuonthanhtribahuong', 'banhcuonthanhtribahuong@dishnet.vn', '0905678345', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Cuốn Thanh Trì Bà Hương', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Cuốn Thanh Trì Bà Hương', 'banh-cuon-thanh-tri-ba-huong-37', '72 Hùng Vương, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0676, 108.2219, '0905678345', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Cuốn', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-001', 'Bánh cuốn nhân thịt', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-002', 'Bánh cuốn nhân nấm', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-003', 'Bánh cuốn không nhân', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-004', 'Bánh cuốn chiên', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Chả & Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU2-001', 'Chả lụa', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chả & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU2-002', 'Chả chiên', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chả & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1;


-- ===== [38/54] Nước Ép Trái Cây Tươi Thanh Xuân =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('nuoceptraicaytuoithanhxuan', 'nuoceptraicaytuoithanhxuan@dishnet.vn', '0905789456', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Nước Ép Trái Cây Tươi Thanh Xuân', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Nước Ép Trái Cây Tươi Thanh Xuân', 'nuoc-ep-trai-cay-tuoi-thanh-xuan-38', '16 Lê Lợi, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0666, 108.2228, '0905789456', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Nước Ép', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP1-001', 'Nước ép cam', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP1-002', 'Nước ép dứa', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP1-003', 'Nước ép cà rốt táo', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP1-004', 'Nước ép dưa hấu', NULL, 28000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP1-005', 'Nước ép bơ', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nước Ép' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Sinh Tố', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP2-001', 'Sinh tố xoài', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP2-002', 'Sinh tố dâu', NULL, 42000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP2-003', 'Sinh tố bơ sữa', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'NUOCEP2-004', 'Sinh tố việt quất', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1;


-- ===== [39/54] Bún Bò Huế Mệ Thuận =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunbohuemethuan', 'bunbohuemethuan@dishnet.vn', '0905890567', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bún Bò Huế Mệ Thuận', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Bò Huế Mệ Thuận', 'bun-bo-hue-me-thuan-39', '221 Lê Đình Dương, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0744, 108.2058, '0905890567', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Bò Huế', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH1-001', 'Bún bò đặc biệt', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH1-002', 'Bún bò nạm', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH1-003', 'Bún bò gân', NULL, 52000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH1-004', 'Bún thịt heo', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH1-005', 'Bún bò giò heo', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH1-006', 'Bún bò chay', NULL, 38000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH2-001', 'Thêm thịt', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOH2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbohuemethuan' LIMIT 1;


-- ===== [40/54] Kem Ốc Quế Thơm Lừng Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('kemocquethomlungdanang', 'kemocquethomlungdanang@dishnet.vn', '0905901678', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Kem Ốc Quế Thơm Lừng Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Kem Ốc Quế Thơm Lừng Đà Nẵng', 'kem-oc-que-thom-lung-da-nang-40', '5 An Thượng 4, Ngũ Hành Sơn, Đà Nẵng', 'Đà Nẵng', 16.0392, 108.2476, '0905901678', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Kem', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ1-001', 'Kem ốc quế đơn', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kem' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ1-002', 'Kem ốc quế đôi', NULL, 22000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kem' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ1-003', 'Kem ly', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kem' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ1-004', 'Kem cuộn', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kem' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ1-005', 'Kem cốt dừa', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Kem' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Sinh Tố Đá Xay', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ2-001', 'Sinh tố đá xay dâu', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố Đá Xay' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'KEMOCQ2-002', 'Sinh tố đá xay xoài', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sinh Tố Đá Xay' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1;


-- ===== [41/54] Vịt Quay Mỏ Vàng Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('vitquaymovangdanang', 'vitquaymovangdanang@dishnet.vn', '0905012789', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Vịt Quay Mỏ Vàng Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Vịt Quay Mỏ Vàng Đà Nẵng', 'vit-quay-mo-vang-da-nang-41', '93 Tô Ngọc Vân, Sơn Trà, Đà Nẵng', 'Đà Nẵng', 16.0771, 108.2321, '0905012789', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Vịt Quay', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA1-001', 'Vịt quay nguyên con (1,5-2kg)', NULL, 420000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Vịt Quay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA1-002', 'Vịt quay nửa con', NULL, 215000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Vịt Quay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA1-003', 'Vịt quay 1/4 con', NULL, 115000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Vịt Quay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA1-004', 'Cơm vịt quay phần', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Vịt Quay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA1-005', 'Phở vịt quay', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Vịt Quay' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Khác', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA2-001', 'Cháo vịt', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Khác' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'VITQUA2-002', 'Trứng vịt lộn', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Khác' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1;


-- ===== [42/54] Quán Trứng Nướng Hội An Phố =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('quantrungnuonghoianpho', 'quantrungnuonghoianpho@dishnet.vn', '0905123901', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Quán Trứng Nướng Hội An Phố', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Quán Trứng Nướng Hội An Phố', 'quan-trung-nuong-hoi-an-pho-42', '15 Trần Hưng Đạo, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0617, 108.2222, '0905123901', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Trứng Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR1-001', 'Trứng nướng phô mai (4 quả)', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trứng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR1-002', 'Trứng nướng ruốc (4 quả)', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trứng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR1-003', 'Trứng nướng bơ tỏi (4 quả)', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trứng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR1-004', 'Trứng nướng sa tế (4 quả)', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trứng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Mì Nướng', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR2-001', 'Bánh mì nướng phô mai', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR2-002', 'Bánh mì nướng bơ tỏi', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'QUANTR2-003', 'Bánh mì nướng trứng', NULL, 22000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Nướng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1;


-- ===== [43/54] Phở Xào Hải Sản Biển Đông =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('phoxaohaisanbiendong', 'phoxaohaisanbiendong@dishnet.vn', '0905234012', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Phở Xào Hải Sản Biển Đông', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Phở Xào Hải Sản Biển Đông', 'pho-xao-hai-san-bien-dong-43', '45 Võ Văn Kiệt, Sơn Trà, Đà Nẵng', 'Đà Nẵng', 16.0794, 108.2368, '0905234012', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phở Xào', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-001', 'Phở xào hải sản', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-002', 'Phở xào bò', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-003', 'Phở xào gà', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-004', 'Phở chiên giòn trứng', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-005', 'Cơm chiên hải sản', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-006', 'Mỳ xào bò', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO2-001', 'Nước ngọt', NULL, 15000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO2-002', 'Bia lon', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1;


-- ===== [44/54] Bánh Tráng Nướng Bà Út =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhtrangnuongbaut', 'banhtrangnuongbaut@dishnet.vn', '0905345123', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Tráng Nướng Bà Út', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Tráng Nướng Bà Út', 'banh-trang-nuong-ba-ut-44', '8 Hàm Nghi, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0688, 108.2235, '0905345123', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Tráng Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-001', 'Bánh tráng nướng trứng tôm', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-002', 'Bánh tráng nướng mực khô', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-003', 'Bánh tráng nướng phô mai', NULL, 38000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-004', 'Bánh tráng nướng xúc xích', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR1-005', 'Bánh tráng trộn', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Ăn Vặt', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR2-001', 'Hột vịt lộn', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ăn Vặt' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTR2-002', 'Bắp xào', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ăn Vặt' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1;


-- ===== [45/54] Cá Cơm Kho Nghệ Cô Tú =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('cacomkhonghecotu', 'cacomkhonghecotu@dishnet.vn', '0905456234', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cá Cơm Kho Nghệ Cô Tú', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cá Cơm Kho Nghệ Cô Tú', 'ca-com-kho-nghe-co-tu-45', '62 Đinh Tiên Hoàng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0633, 108.2204, '0905456234', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Nhà', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK1-001', 'Cơm cá kho nghệ', 'Cá biển kho nghệ kiểu miền Trung', 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK1-002', 'Cơm thịt kho gừng', NULL, 40000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK1-003', 'Cơm đậu phụ sốt cà', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK1-004', 'Cơm cá chiên sả ớt', NULL, 42000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK1-005', 'Cơm canh chua cá', NULL, 42000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Canh & Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK2-001', 'Canh mướp', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CACOMK2-002', 'Dưa cải muối', NULL, 8000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh & Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1;


-- ===== [46/54] Bún Mắm Cô Năm Miền Tây =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunmamconammientay', 'bunmamconammientay@dishnet.vn', '0905567345', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bún Mắm Cô Năm Miền Tây', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Mắm Cô Năm Miền Tây', 'bun-mam-co-nam-mien-tay-46', '112 Ngô Gia Tự, Liên Chiểu, Đà Nẵng', 'Đà Nẵng', 16.1018, 108.1741, '0905567345', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Mắm', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNMAM1-001', 'Bún mắm đặc biệt', 'Bún mắm miền Tây đậm đà hương vị', 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Mắm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNMAM1-002', 'Bún mắm thường', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Mắm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNMAM1-003', 'Bún mắm hải sản', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Mắm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNMAM1-004', 'Bún mắm ếch', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Mắm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNMAM2-001', 'Thêm thịt heo quay', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNMAM2-002', 'Rau đĩa thêm', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunmamconammientay' LIMIT 1;


-- ===== [47/54] Gà Nướng Mật Ong Phong Lan =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('ganuongmatongphonglan', 'ganuongmatongphonglan@dishnet.vn', '0905678456', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Gà Nướng Mật Ong Phong Lan', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Gà Nướng Mật Ong Phong Lan', 'ga-nuong-mat-ong-phong-lan-47', '44 Ông Ích Khiêm, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0652, 108.2194, '0905678456', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Gà Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON1-001', 'Gà nướng mật ong nguyên con', NULL, 220000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON1-002', 'Gà nướng mật ong nửa con', NULL, 115000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON1-003', 'Đùi gà nướng mật ong', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON1-004', 'Cánh gà nướng sốt BBQ', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON1-005', 'Cánh gà chiên nước mắm', NULL, 70000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Gà Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm & Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON2-001', 'Cơm trắng', NULL, 5000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm & Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'GANUON2-002', 'Khoai tây chiên', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm & Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1;


-- ===== [48/54] Tôm Chua Nem Chua Bà Nở Huế =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('tomchuanemchuabanohue', 'tomchuanemchuabanohue@dishnet.vn', '0905789567', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Tôm Chua Nem Chua Bà Nở Huế', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Tôm Chua Nem Chua Bà Nở Huế', 'tom-chua-nem-chua-ba-no-hue-48', '36 Lê Hồng Phong, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0706, 108.2199, '0905789567', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Nem Chua & Tôm Chua', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TOMCHU1-001', 'Tôm chua Huế (200g)', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Chua & Tôm Chua' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TOMCHU1-002', 'Nem chua Thanh Hóa (gói 5)', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Chua & Tôm Chua' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TOMCHU1-003', 'Tôm chua kèm thịt luộc', NULL, 95000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Nem Chua & Tôm Chua' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Tráng Cuốn', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TOMCHU2-001', 'Thịt luộc cuốn bánh tráng', NULL, 80000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TOMCHU2-002', 'Cá bống kho cuốn bánh tráng', NULL, 75000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'TOMCHU2-003', 'Hến xào lá lốt', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Tráng Cuốn' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1;


-- ===== [49/54] Cà Phê Trứng Hà Nội Giữa Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('caphetrunghanoigiuadanang', 'caphetrunghanoigiuadanang@dishnet.vn', '0905890678', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Cà Phê Trứng Hà Nội Giữa Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cà Phê Trứng Hà Nội Giữa Đà Nẵng', 'ca-phe-trung-ha-noi-giua-da-nang-49', '6 Trần Bình Trọng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0659, 108.2229, '0905890678', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cà Phê', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET1-001', 'Cà phê trứng nóng', 'Cà phê trứng kiểu Hà Nội', 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET1-002', 'Cà phê trứng đá', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET1-003', 'Cà phê sữa đá', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET1-004', 'Cà phê đen đá', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET1-005', 'Bạc xỉu đá', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Trà', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET2-001', 'Trà hoa nhài', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET2-002', 'Trà sen', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Trà' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET3-001', 'Bánh flan', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHET3-002', 'Bánh mì bơ', NULL, 20000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1;


-- ===== [50/54] Bún Thái Bò Viên Sài Gòn =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunthaiboviensaigon', 'bunthaiboviensaigon@dishnet.vn', '0905901789', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bún Thái Bò Viên Sài Gòn', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Thái Bò Viên Sài Gòn', 'bun-thai-bo-vien-sai-gon-50', '158 Hoàng Văn Thụ, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0757, 108.2065, '0905901789', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Thái', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHA1-001', 'Bún Thái hải sản', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thái' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHA1-002', 'Bún Thái bò viên', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thái' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHA1-003', 'Bún Thái gà', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thái' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHA1-004', 'Phở Thái đặc biệt', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thái' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Bò Viên', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHA2-001', 'Bún bò viên sa tế', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Viên' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHA2-002', 'Phở bò viên', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Viên' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1;


-- ===== [51/54] Mì Quảng Nam Miền Trung =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('miquangnammientrung', 'miquangnammientrung@dishnet.vn', '0905012890', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Mì Quảng Nam Miền Trung', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Mì Quảng Nam Miền Trung', 'mi-quang-nam-mien-trung-51', '225 Hùng Vương, Thanh Khê, Đà Nẵng', 'Đà Nẵng', 16.0782, 108.2048, '0905012890', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mỳ Quảng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-001', 'Mỳ quảng đặc biệt', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-002', 'Mỳ quảng tôm cua', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-003', 'Mỳ quảng sứa', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-004', 'Mỳ quảng gà', NULL, 50000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-005', 'Mỳ quảng ếch', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN2-001', 'Bánh tráng nướng', NULL, 8000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN2-002', 'Rau ghém', NULL, 10000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangnammientrung' LIMIT 1;


-- ===== [52/54] Bánh Mì Phương Hội An Đà Nẵng =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhmiphuonghoiandanang', 'banhmiphuonghoiandanang@dishnet.vn', '02353861527', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bánh Mì Phương Hội An Đà Nẵng', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Mì Phương Hội An Đà Nẵng', 'banh-mi-phuong-hoi-an-da-nang-52', '2B Phan Châu Trinh, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0686, 108.224, '02353861527', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Mì', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-001', 'Bánh mì đặc biệt thịt hỗn hợp', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-002', 'Bánh mì gà quay', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-003', 'Bánh mì heo quay', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-004', 'Bánh mì pate', NULL, 25000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-005', 'Bánh mì chả cá', NULL, 28000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-006', 'Bánh mì trứng phô mai', NULL, 30000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1;


-- ===== [53/54] Lẩu Hải Sản Sơn Trà Seaside =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('lauhaisansontraseaside', 'lauhaisansontraseaside@dishnet.vn', '0236395002', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Lẩu Hải Sản Sơn Trà Seaside', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Lẩu Hải Sản Sơn Trà Seaside', 'lau-hai-san-son-tra-seaside-53', '18 Phạm Văn Đồng, Sơn Trà, Đà Nẵng', 'Đà Nẵng', 16.0728, 108.2298, '0236395002', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Lẩu Hải Sản', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI1-001', 'Lẩu hải sản tươi (2 người)', NULL, 350000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Hải Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI1-002', 'Lẩu mực tôm cua (2 người)', NULL, 320000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Hải Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI1-003', 'Lẩu cá mú (2 người)', NULL, 340000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Hải Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI1-004', 'Lẩu tôm hùm (2 người)', NULL, 680000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Lẩu Hải Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Hải Sản Hấp', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI2-001', 'Tôm hấp bia', NULL, 180000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Hấp' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI2-002', 'Sò điệp nướng (10 con)', NULL, 130000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Hấp' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI2-003', 'Hàu nướng phô mai (10 con)', NULL, 120000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hải Sản Hấp' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 3, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI3-001', 'Bia Heineken', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'LAUHAI3-002', 'Rượu vang đỏ (ly)', NULL, 60000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 3
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1;


-- ===== [54/54] Bếp Mẹ Miền Trung Quán Ngon =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bepmemientrungquanngon', 'bepmemientrungquanngon@dishnet.vn', '0905123456', '$2b$10$tSjNoj7Tefysb0EtgtwLmeN2BxKCWlzlN0UGc2TWxnJyBaDYDWZhe', 'Bếp Mẹ Miền Trung Quán Ngon', 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bếp Mẹ Miền Trung Quán Ngon', 'bep-me-mien-trung-quan-ngon-54', '64 Phan Đình Phùng, Hải Châu, Đà Nẵng', 'Đà Nẵng', 16.0647, 108.2197, '0905123456', 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000
FROM nguoi_dung WHERE ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Nhà', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM1-001', 'Cơm hến', 'Cơm hến Huế đặc trưng', 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM1-002', 'Cơm đĩa mẹ nấu đặc biệt', NULL, 55000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM1-003', 'Canh chua cá thu', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM1-004', 'Cá chiên giòn', NULL, 65000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM1-005', 'Thịt heo kho tiêu', NULL, 45000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Nhà' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cháo', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM2-001', 'Cháo thịt bằm', NULL, 35000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BEPMEM2-002', 'Cháo hến', NULL, 38000, 'dang_ban', FLOOR(RAND()*200), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1;


SET FOREIGN_KEY_CHECKS = 1;