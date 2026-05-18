-- 30 Quan an sang khu vuc Hoa Khanh - Lien Chieu, Da Nang
-- Tao luc: 03:27:05 16/5/2026

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

-- ===== [1/30] Bánh Mì Chị Lan Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhmichilanhoakhanh', 'banhmichilanhoakhanh@dishnet.vn', '0905111201', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Mì Chị Lan Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Mì Chị Lan Hòa Khánh', 'banh-mi-chi-lan-hoa-khanh-hk-1', '45 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0934, 108.1612, '0905111201', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Mì', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-001', 'Bánh mì đặc biệt', 'Bánh mì pate thịt hỗn hợp', 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-002', 'Bánh mì thịt nướng', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-003', 'Bánh mì trứng ốp la', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-004', 'Bánh mì chả lụa', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-005', 'Bánh mì bơ mật ong', NULL, 12000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-006', 'Bánh mì pate không', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI2-001', 'Cà phê sữa đá', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1;


-- ===== [2/30] Bún Bò Mệ Hoa Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunbomehoahoakhanh', 'bunbomehoahoakhanh@dishnet.vn', '0905111202', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Bò Mệ Hoa Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Bò Mệ Hoa Hòa Khánh', 'bun-bo-me-hoa-hoa-khanh-hk-2', '12 Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0871, 108.1598, '0905111202', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Bò Huế', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM1-001', 'Bún bò đặc biệt', 'Bún bò Huế đặc biệt giò heo chả cua', 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM1-002', 'Bún bò thường', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM1-003', 'Bún bò giò heo', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM1-004', 'Bún bò chả cua', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM1-005', 'Bún thịt heo', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM1-006', 'Bún bò nạm gân', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Huế' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM2-001', 'Thêm thịt', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBOM2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1;


-- ===== [3/30] Phở Gà Bà Hòa - Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('phogabahoalienchieu', 'phogabahoalienchieu@dishnet.vn', '0905111203', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Phở Gà Bà Hòa - Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Phở Gà Bà Hòa - Liên Chiểu', 'pho-ga-ba-hoa-lien-chieu-hk-3', '78 Trần Thị Lý, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0956, 108.1623, '0905111203', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phở', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB1-001', 'Phở gà đặc biệt', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB1-002', 'Phở gà tái', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB1-003', 'Phở bò tái chín', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB1-004', 'Phở bò gầu gân', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB1-005', 'Phở hải sản', NULL, 60000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB2-001', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOGAB2-002', 'Trứng bắc thảo', NULL, 10000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1;


-- ===== [4/30] Bánh Cuốn Cô Thanh Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhcuoncothanhhoakhanh', 'banhcuoncothanhhoakhanh@dishnet.vn', '0905111204', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Cuốn Cô Thanh Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Cuốn Cô Thanh Hòa Khánh', 'banh-cuon-co-thanh-hoa-khanh-hk-4', '34 Chu Văn An, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0848, 108.1571, '0905111204', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Cuốn', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-001', 'Bánh cuốn nhân thịt nấm', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-002', 'Bánh cuốn nhân tôm thịt', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-003', 'Bánh cuốn không nhân', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-004', 'Bánh cuốn chiên giòn', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU1-005', 'Bánh ướt chả lụa', NULL, 30000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Cuốn' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Chả & Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU2-001', 'Chả lụa thêm', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chả & Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCU2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chả & Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1;


-- ===== [5/30] Xôi Sáng Cô Nga Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('xoisangcongahoakhanh', 'xoisangcongahoakhanh@dishnet.vn', '0905111205', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Xôi Sáng Cô Nga Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Xôi Sáng Cô Nga Hòa Khánh', 'xoi-sang-co-nga-hoa-khanh-hk-5', '56 Hoàng Văn Thái, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0921, 108.1587, '0905111205', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Xôi', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN1-001', 'Xôi gà xé', NULL, 30000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN1-002', 'Xôi xéo đậu xanh', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN1-003', 'Xôi lạp xưởng trứng', NULL, 28000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN1-004', 'Xôi gấc', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN1-005', 'Xôi bắp', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN1-006', 'Xôi đậu phộng', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN2-001', 'Sữa đậu nành', NULL, 10000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOISAN2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1;


-- ===== [6/30] Cháo Trắng Bà Tư Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('chaotrangbatulienchieu', 'chaotrangbatulienchieu@dishnet.vn', '0905111206', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Cháo Trắng Bà Tư Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cháo Trắng Bà Tư Liên Chiểu', 'chao-trang-ba-tu-lien-chieu-hk-6', '19 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0862, 108.1543, '0905111206', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cháo', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR1-001', 'Cháo trắng heo quay', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR1-002', 'Cháo lòng đặc biệt', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR1-003', 'Cháo gà', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR1-004', 'Cháo cá lóc', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR1-005', 'Cháo tôm thịt', NULL, 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR1-006', 'Cháo trắng (không nhân)', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR2-001', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOTR2-002', 'Huyết', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1;


-- ===== [7/30] Mỳ Quảng Cô Tám Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('myquangcotamhoakhanh', 'myquangcotamhoakhanh@dishnet.vn', '0905111207', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Mỳ Quảng Cô Tám Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Mỳ Quảng Cô Tám Hòa Khánh', 'my-quang-co-tam-hoa-khanh-hk-7', '91 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0948, 108.1619, '0905111207', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mỳ Quảng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-001', 'Mỳ quảng tôm thịt', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-002', 'Mỳ quảng gà', NULL, 42000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-003', 'Mỳ quảng sườn', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-004', 'Mỳ quảng cá lóc', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-005', 'Mỳ quảng đặc biệt', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN1-006', 'Mỳ quảng chay', NULL, 32000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN2-001', 'Bánh đa', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MYQUAN2-002', 'Rau thêm', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1;


-- ===== [8/30] Bún Riêu Cô Năm Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunrieuconamlienchieu', 'bunrieuconamlienchieu@dishnet.vn', '0905111208', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Riêu Cô Năm Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Riêu Cô Năm Liên Chiểu', 'bun-rieu-co-nam-lien-chieu-hk-8', '22 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0839, 108.1562, '0905111208', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Riêu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNRIE1-001', 'Bún riêu cua đặc biệt', 'Bún riêu cua đồng thơm ngon', 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Riêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNRIE1-002', 'Bún riêu cua thường', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Riêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNRIE1-003', 'Bún riêu tôm', NULL, 42000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Riêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNRIE1-004', 'Bún bò huế + riêu', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Riêu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNRIE2-001', 'Đậu hũ chiên thêm', NULL, 10000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNRIE2-002', 'Huyết thêm', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1;


-- ===== [9/30] Bánh Bèo Chén Bà Sáu Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhbeochenbasauhoakhanh', 'banhbeochenbasauhoakhanh@dishnet.vn', '0905111209', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Bèo Chén Bà Sáu Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Bèo Chén Bà Sáu Hòa Khánh', 'banh-beo-chen-ba-sau-hoa-khanh-hk-9', '67 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0912, 108.1601, '0905111209', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Bèo', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE1-001', 'Bánh bèo chén (8 chén)', 'Bánh bèo Huế truyền thống', 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Bèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE1-002', 'Bánh bèo lá (đĩa)', NULL, 30000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Bèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE1-003', 'Bánh ít trần nhân tôm thịt (6 cái)', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Bèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE1-004', 'Bánh nậm (đĩa 6 cái)', NULL, 32000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Bèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE1-005', 'Set hỗn hợp 3 loại', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Bèo' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE2-001', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHBE2-002', 'Nước ngọt', NULL, 12000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1;


-- ===== [10/30] Hủ Tiếu Bò Kho Sáng Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('hutieubokhosanghoakhanh', 'hutieubokhosanghoakhanh@dishnet.vn', '0905111210', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Hủ Tiếu Bò Kho Sáng Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Hủ Tiếu Bò Kho Sáng Hòa Khánh', 'hu-tieu-bo-kho-sang-hoa-khanh-hk-10', '143 Trần Thị Lý, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0857, 108.1631, '0905111210', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Hủ Tiếu & Bò Kho', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-001', 'Hủ tiếu bò kho', 'Hủ tiếu bò kho đậm đà bánh mì chấm', 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu & Bò Kho' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-002', 'Bánh mì bò kho', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu & Bò Kho' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-003', 'Hủ tiếu khô tôm thịt', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu & Bò Kho' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-004', 'Hủ tiếu nước đặc biệt', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu & Bò Kho' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-005', 'Mỳ bò kho', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu & Bò Kho' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU2-001', 'Thịt bò thêm', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1;


-- ===== [11/30] Bánh Ướt Thịt Nướng Cô Liên =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhuotthitnuongcolien', 'banhuotthitnuongcolien@dishnet.vn', '0905111211', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Ướt Thịt Nướng Cô Liên', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Ướt Thịt Nướng Cô Liên', 'banh-uot-thit-nuong-co-lien-hk-11', '38 Chu Văn An, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0937, 108.1577, '0905111211', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Ướt', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO1-001', 'Bánh ướt thịt nướng', NULL, 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ướt' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO1-002', 'Bánh ướt chả lụa', NULL, 32000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ướt' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO1-003', 'Bánh ướt tôm khô', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ướt' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO1-004', 'Bánh ướt trứng', NULL, 30000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ướt' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO1-005', 'Bánh ướt hỗn hợp', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Ướt' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO2-001', 'Thịt nướng thêm', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHUO2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1;


-- ===== [12/30] Phở Bò Anh Tuấn Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('phoboanhtuanlienchieu', 'phoboanhtuanlienchieu@dishnet.vn', '0905111212', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Phở Bò Anh Tuấn Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Phở Bò Anh Tuấn Liên Chiểu', 'pho-bo-anh-tuan-lien-chieu-hk-12', '201 Ngô Gia Tự, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0823, 108.1554, '0905111212', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phở Bò', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA1-001', 'Phở bò tái lăn', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA1-002', 'Phở bò tái nạm gân', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA1-003', 'Phở bò chín gầu', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA1-004', 'Phở bò đặc biệt', 'Đầy đủ tái nạm gân gầu', 60000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA1-005', 'Phở bò viên', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Bò' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA2-001', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOBOA2-002', 'Giá trụng', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1;


-- ===== [13/30] Cơm Tấm Sườn Bì Chả Sáng Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('comtamsuonbichasanghoakhanh', 'comtamsuonbichasanghoakhanh@dishnet.vn', '0905111213', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Cơm Tấm Sườn Bì Chả Sáng Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cơm Tấm Sườn Bì Chả Sáng Hòa Khánh', 'com-tam-suon-bi-cha-sang-hoa-khanh-hk-13', '55 Hoàng Văn Thái, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0919, 108.1593, '0905111213', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Tấm', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-001', 'Cơm tấm sườn bì chả', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-002', 'Cơm tấm sườn nướng', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-003', 'Cơm tấm bì chả', NULL, 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-004', 'Cơm tấm sườn trứng', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM1-005', 'Cơm tấm đặc biệt', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Tấm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM2-001', 'Trứng ốp la', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMTAM2-002', 'Canh khổ qua', NULL, 12000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1;


-- ===== [14/30] Bánh Canh Chả Cá Bà Minh Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhcanhchacabaminhlienchieu', 'banhcanhchacabaminhlienchieu@dishnet.vn', '0905111214', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Canh Chả Cá Bà Minh Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Canh Chả Cá Bà Minh Liên Chiểu', 'banh-canh-cha-ca-ba-minh-lien-chieu-hk-14', '17 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0878, 108.1549, '0905111214', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Canh', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-001', 'Bánh canh chả cá', NULL, 42000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-002', 'Bánh canh tôm cua', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-003', 'Bánh canh giò heo', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-004', 'Bánh canh đặc biệt', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA1-005', 'Bún chả cá', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Canh' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA2-001', 'Chả cá thêm', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHCA2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1;


-- ===== [15/30] Bún Chả Hà Nội Cô Hương Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunchahanoicohuonghoakhanh', 'bunchahanoicohuonghoakhanh@dishnet.vn', '0905111215', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Chả Hà Nội Cô Hương Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Chả Hà Nội Cô Hương Hòa Khánh', 'bun-cha-ha-noi-co-huong-hoa-khanh-hk-15', '88 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0943, 108.1607, '0905111215', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Chả', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNCHA1-001', 'Bún chả Hà Nội', 'Bún chả Hà Nội chả miếng + chả viên', 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNCHA1-002', 'Bún chả nem cua bể', NULL, 65000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNCHA1-003', 'Chả nướng (5 miếng)', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNCHA1-004', 'Bún chả chay', NULL, 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Chả' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNCHA2-001', 'Nem cua bể (2 cái)', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNCHA2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1;


-- ===== [16/30] Bún Thịt Nướng Cô Duyên Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunthitnuongcoduyenhoakhanh', 'bunthitnuongcoduyenhoakhanh@dishnet.vn', '0905111216', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Thịt Nướng Cô Duyên Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Thịt Nướng Cô Duyên Hòa Khánh', 'bun-thit-nuong-co-duyen-hoa-khanh-hk-16', '32 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0844, 108.1568, '0905111216', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Thịt Nướng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-001', 'Bún thịt nướng chả giò', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-002', 'Bún thịt nướng đặc biệt', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-003', 'Bún thịt nướng gà', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-004', 'Bún bò viên thịt nướng', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI1-005', 'Bún chay nướng', NULL, 32000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Thịt Nướng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI2-001', 'Chả giò (3 cái)', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNTHI2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1;


-- ===== [17/30] Xôi Gà Lá Dứa Cô Vân =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('xoigaladuacovan', 'xoigaladuacovan@dishnet.vn', '0905111217', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Xôi Gà Lá Dứa Cô Vân', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Xôi Gà Lá Dứa Cô Vân', 'xoi-ga-la-dua-co-van-hk-17', '72 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0928, 108.1615, '0905111217', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Xôi Lá', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL1-001', 'Xôi lá dứa gà xé', NULL, 32000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi Lá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL1-002', 'Xôi lá dứa đậu xanh', NULL, 22000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi Lá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL1-003', 'Xôi lá dứa lạp xưởng', NULL, 28000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi Lá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL1-004', 'Xôi trắng muối vừng', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi Lá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL1-005', 'Xôi chiên phồng', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Xôi Lá' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Sữa & Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL2-001', 'Sữa đậu nành', NULL, 10000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sữa & Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'XOIGAL2-002', 'Cà phê đen đá', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Sữa & Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'xoigaladuacovan' LIMIT 1;


-- ===== [18/30] Bún Sứa Mắm Ruốc Cô Ba Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunsuamamruoccobalienchieu', 'bunsuamamruoccobalienchieu@dishnet.vn', '0905111218', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Sứa Mắm Ruốc Cô Ba Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Sứa Mắm Ruốc Cô Ba Liên Chiểu', 'bun-sua-mam-ruoc-co-ba-lien-chieu-hk-18', '115 Trần Thị Lý, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0853, 108.1626, '0905111218', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Sứa & Mắm Nêm', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA1-001', 'Bún sứa mắm ruốc', 'Đặc sản Đà Nẵng - bún sứa mắm ruốc', 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Sứa & Mắm Nêm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA1-002', 'Bún mắm nêm thịt heo', NULL, 42000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Sứa & Mắm Nêm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA1-003', 'Bún mắm nêm tôm', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Sứa & Mắm Nêm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA1-004', 'Bún bò đặc biệt', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Sứa & Mắm Nêm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA1-005', 'Bún chả cá', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Sứa & Mắm Nêm' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA2-001', 'Rau sống thêm', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNSUA2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1;


-- ===== [19/30] Cà Phê Sáng Bà Bảy Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('caphesangbabayhoakhanh', 'caphesangbabayhoakhanh@dishnet.vn', '0905111219', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Cà Phê Sáng Bà Bảy Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cà Phê Sáng Bà Bảy Hòa Khánh', 'ca-phe-sang-ba-bay-hoa-khanh-hk-19', '48 Chu Văn An, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0915, 108.1579, '0905111219', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cà Phê', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES1-001', 'Cà phê sữa đá', NULL, 22000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES1-002', 'Cà phê đen đá', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES1-003', 'Bạc xỉu đá', NULL, 22000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES1-004', 'Cà phê sữa nóng', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES1-005', 'Cà phê đen nóng', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Ăn Sáng Kèm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES2-001', 'Bánh mì bơ', NULL, 10000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ăn Sáng Kèm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES2-002', 'Bánh mì trứng', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ăn Sáng Kèm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CAPHES2-003', 'Bánh tiêu', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Ăn Sáng Kèm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1;


-- ===== [20/30] Bánh Mì Que Đà Nẵng Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhmiquedananghoakhanh', 'banhmiquedananghoakhanh@dishnet.vn', '0905111220', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Mì Que Đà Nẵng Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Mì Que Đà Nẵng Hòa Khánh', 'banh-mi-que-da-nang-hoa-khanh-hk-20', '9 Hoàng Văn Thái, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0867, 108.159, '0905111220', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Mì Que', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-001', 'Bánh mì que chả lụa', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Que' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-002', 'Bánh mì que trứng', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Que' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-003', 'Bánh mì que phô mai', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Que' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-004', 'Bánh mì que xúc xích', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Que' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-005', 'Bánh mì que bơ tỏi', NULL, 12000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì Que' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI2-001', 'Sữa tươi đóng hộp', NULL, 12000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1;


-- ===== [21/30] Mì Quảng Bà Phước Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('miquangbaphuochoakhanh', 'miquangbaphuochoakhanh@dishnet.vn', '0905111221', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Mì Quảng Bà Phước Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Mì Quảng Bà Phước Hòa Khánh', 'mi-quang-ba-phuoc-hoa-khanh-hk-21', '163 Ngô Gia Tự, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0962, 108.1635, '0905111221', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Mỳ Quảng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-001', 'Mỳ quảng gà lá é', 'Mỳ quảng gà nấu lá é thơm đặc trưng', 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-002', 'Mỳ quảng tôm cua', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-003', 'Mỳ quảng thịt heo', NULL, 42000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-004', 'Mỳ quảng bê', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN1-005', 'Mỳ quảng sứa', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Mỳ Quảng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phụ', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN2-001', 'Bánh tráng nướng', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'MIQUAN2-002', 'Ớt xanh muối', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phụ' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1;


-- ===== [22/30] Cơm Nhà Bà Chiến Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('comnhabachienlienchieu', 'comnhabachienlienchieu@dishnet.vn', '0905111222', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Cơm Nhà Bà Chiến Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cơm Nhà Bà Chiến Liên Chiểu', 'com-nha-ba-chien-lien-chieu-hk-22', '77 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0835, 108.1547, '0905111222', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cơm Sáng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA1-001', 'Cơm sườn kho sả ớt', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Sáng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA1-002', 'Cơm cá kho tiêu', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Sáng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA1-003', 'Cơm trứng chiên thịt băm', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Sáng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA1-004', 'Cơm thịt luộc dưa cải', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Sáng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA1-005', 'Cơm đặc biệt 2 món', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cơm Sáng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Canh', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA2-001', 'Canh rau muống', NULL, 8000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'COMNHA2-002', 'Canh bí đỏ', NULL, 10000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Canh' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1;


-- ===== [23/30] Bún Đậu Sáng Cô Hà Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bundausangcohahoakhanh', 'bundausangcohahoakhanh@dishnet.vn', '0905111223', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Đậu Sáng Cô Hà Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Đậu Sáng Cô Hà Hòa Khánh', 'bun-dau-sang-co-ha-hoa-khanh-hk-23', '29 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0906, 108.1603, '0905111223', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Đậu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-001', 'Bún đậu mắm tôm set A', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-002', 'Bún đậu mắm tôm set B', NULL, 70000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-003', 'Bún đậu chay', NULL, 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU1-004', 'Đậu hũ chiên (đĩa)', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Đậu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU2-001', 'Nem rán (3 cái)', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNDAU2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1;


-- ===== [24/30] Bánh Tét Lá Chuối Bà Lành =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhtetlachuoibalanh', 'banhtetlachuoibalanh@dishnet.vn', '0905111224', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Tét Lá Chuối Bà Lành', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Tét Lá Chuối Bà Lành', 'banh-tet-la-chuoi-ba-lanh-hk-24', '53 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0842, 108.1561, '0905111224', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Truyền Thống', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE1-001', 'Bánh tét đòn (1 khúc)', 'Bánh tét lá chuối nhân đậu thịt', 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Truyền Thống' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE1-002', 'Bánh tét chay (1 khúc)', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Truyền Thống' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE1-003', 'Bánh ú nhân đậu (1 cái)', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Truyền Thống' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE1-004', 'Bánh lọc tôm thịt (6 cái)', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Truyền Thống' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE1-005', 'Bánh lọc chay (6 cái)', NULL, 28000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Truyền Thống' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE1-006', 'Bánh bột lọc bọc (6 cái)', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Truyền Thống' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Chè', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE2-001', 'Chè đậu xanh', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHTE2-002', 'Chè hạt sen', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1;


-- ===== [25/30] Phở Xào Sáng Hòa Khánh Anh Đức =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('phoxaosanghoakhanhanhduc', 'phoxaosanghoakhanhanhduc@dishnet.vn', '0905111225', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Phở Xào Sáng Hòa Khánh Anh Đức', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Phở Xào Sáng Hòa Khánh Anh Đức', 'pho-xao-sang-hoa-khanh-anh-duc-hk-25', '117 Chu Văn An, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0951, 108.1581, '0905111225', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Phở Xào & Chiên', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-001', 'Phở xào bò', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào & Chiên' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-002', 'Phở xào hải sản', NULL, 65000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào & Chiên' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-003', 'Phở chiên giòn trứng bò', NULL, 60000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào & Chiên' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-004', 'Cơm chiên dương châu', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào & Chiên' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO1-005', 'Mỳ xào bò cải', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Phở Xào & Chiên' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Đồ Uống', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO2-001', 'Nước ngọt', NULL, 12000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'PHOXAO2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Đồ Uống' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1;


-- ===== [26/30] Cháo Lòng Heo Bà Tuyết Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('chaolongheobatuyetlienchieu', 'chaolongheobatuyetlienchieu@dishnet.vn', '0905111226', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Cháo Lòng Heo Bà Tuyết Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Cháo Lòng Heo Bà Tuyết Liên Chiểu', 'chao-long-heo-ba-tuyet-lien-chieu-hk-26', '84 Trần Thị Lý, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0859, 108.1629, '0905111226', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cháo Lòng', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-001', 'Cháo lòng đặc biệt', 'Cháo lòng heo đầy đủ tim gan phổi', 42000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo Lòng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-002', 'Cháo lòng thường', NULL, 32000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo Lòng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-003', 'Cháo trắng heo quay', NULL, 40000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo Lòng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-004', 'Cháo gà sáng', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo Lòng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO1-005', 'Tiết canh (theo mùa)', NULL, 30000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cháo Lòng' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO2-001', 'Lòng thêm', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'CHAOLO2-002', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1;


-- ===== [27/30] Bánh Mì Pate Chú Hùng Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhmipatechuhunghoakhanh', 'banhmipatechuhunghoakhanh@dishnet.vn', '0905111227', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Mì Pate Chú Hùng Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Mì Pate Chú Hùng Hòa Khánh', 'banh-mi-pate-chu-hung-hoa-khanh-hk-27', '41 Hoàng Văn Thái, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0924, 108.1591, '0905111227', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Mì', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-001', 'Bánh mì pate đặc biệt', NULL, 22000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-002', 'Bánh mì thịt nguội xúc xích', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-003', 'Bánh mì ốp la pate', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-004', 'Bánh mì chả cá thu', NULL, 22000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI1-005', 'Bánh mì thịt quay', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Mì' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Cà Phê', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI2-001', 'Cà phê sữa đá', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHMI2-002', 'Cà phê đen đá', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Cà Phê' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1;


-- ===== [28/30] Bún Bò Nam Bộ Sáng Hòa Khánh =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('bunbonambosanghoakhanh', 'bunbonambosanghoakhanh@dishnet.vn', '0905111228', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bún Bò Nam Bộ Sáng Hòa Khánh', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bún Bò Nam Bộ Sáng Hòa Khánh', 'bun-bo-nam-bo-sang-hoa-khanh-hk-28', '66 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0831, 108.1545, '0905111228', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bún Bò Nam Bộ', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBON1-001', 'Bún bò Nam Bộ đặc biệt', 'Bún bò xào kiểu Nam Bộ rau thơm đa dạng', 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Nam Bộ' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBON1-002', 'Bún bò Nam Bộ thường', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Nam Bộ' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBON1-003', 'Phở bò Nam Bộ', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Nam Bộ' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBON1-004', 'Bún gà Nam Bộ', NULL, 48000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bún Bò Nam Bộ' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBON2-001', 'Bò thêm (50g)', NULL, 20000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BUNBON2-002', 'Trà đá', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1;


-- ===== [29/30] Hủ Tiếu Mỳ Bà Loan Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('hutieumybaloanlienchieu', 'hutieumybaloanlienchieu@dishnet.vn', '0905111229', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Hủ Tiếu Mỳ Bà Loan Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Hủ Tiếu Mỳ Bà Loan Liên Chiểu', 'hu-tieu-my-ba-loan-lien-chieu-hk-29', '139 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0969, 108.1622, '0905111229', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Hủ Tiếu', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-001', 'Hủ tiếu Nam Vang', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-002', 'Hủ tiếu mực tôm', NULL, 55000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-003', 'Hủ tiếu khô tôm thịt', NULL, 50000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-004', 'Mỳ wonton tôm thịt', NULL, 52000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU1-005', 'Cháo trắng hủ tiếu', NULL, 38000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Hủ Tiếu' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Thêm', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU2-001', 'Trứng cút', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'HUTIEU2-002', 'Quẩy', NULL, 5000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Thêm' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1;


-- ===== [30/30] Bánh Ít Lá Gai Cô Xuân Liên Chiểu =====
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)
VALUES ('banhitlagaicoxuanlienchieu', 'banhitlagaicoxuanlienchieu@dishnet.vn', '0905111230', '$2b$10$IZHkFBFtDt4t1byEtFT95u.zMIzUvcm5un1nP9kgHfCDVxpcL5ahC', 'Bánh Ít Lá Gai Cô Xuân Liên Chiểu', 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());

INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)
SELECT id, 'Bánh Ít Lá Gai Cô Xuân Liên Chiểu', 'banh-it-la-gai-co-xuan-lien-chieu-hk-30', '24 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng', 'Liên Chiểu, Đà Nẵng', 16.0837, 108.1564, '0905111230', 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000
FROM nguoi_dung WHERE ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Bánh Đặc Sản', 1, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT1-001', 'Bánh ít lá gai nhân đậu (6 cái)', 'Bánh ít lá gai đặc sản miền Trung', 30000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Đặc Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT1-002', 'Bánh ít trần nhân tôm (6 cái)', NULL, 35000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Đặc Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT1-003', 'Bánh in (hộp)', NULL, 45000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Đặc Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT1-004', 'Bánh tổ (1 cái)', NULL, 25000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Đặc Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT1-005', 'Bánh khúc (1 cái)', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Bánh Đặc Sản' AND dm.thu_tu_hien_thi = 1
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;

INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)
SELECT ch.id, 'Chè Sáng', 2, 'hieu_luc'
FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;

INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT2-001', 'Chè đậu đen', NULL, 15000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 1, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè Sáng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;
INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)
SELECT ch.id, dm.id, 'BANHIT2-002', 'Chè trôi nước', NULL, 18000, 'dang_ban', FLOOR(RAND()*150), 0, 0, 0, NOW(), NOW()
FROM cua_hang ch
JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = 'Chè Sáng' AND dm.thu_tu_hien_thi = 2
JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1;


SET FOREIGN_KEY_CHECKS = 1;