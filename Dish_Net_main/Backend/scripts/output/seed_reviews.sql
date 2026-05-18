-- SEED REVIEW: buyers + orders + danh_gia
-- Tao luc: 03:44:56 16/5/2026

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- Xóa seed data cũ nếu có (danh_gia sẽ bị cascade xóa theo)
DELETE FROM don_hang WHERE ma_don_hang LIKE 'DH-SEED-%';

-- ============================================================
-- 1. TẠO 25 TÀI KHOẢN MUA HÀNG
-- ============================================================
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('nguyenthilan', 'nguyenthilan@gmail.com', '0901234001', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Nguyễn Thị Lan', 'https://i.pravatar.cc/150?u=nguyenthilan', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('tranthanhminh', 'tranthanhminh@gmail.com', '0901234002', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Trần Thanh Minh', 'https://i.pravatar.cc/150?u=tranthanhminh', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('lephuongthao', 'lephuongthao@gmail.com', '0901234003', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Lê Phương Thảo', 'https://i.pravatar.cc/150?u=lephuongthao', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('phamvanhung', 'phamvanhung@gmail.com', '0901234004', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Phạm Văn Hùng', 'https://i.pravatar.cc/150?u=phamvanhung', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('hoangmylinh', 'hoangmylinh@gmail.com', '0901234005', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Hoàng Mỹ Linh', 'https://i.pravatar.cc/150?u=hoangmylinh', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('vutrunghieu', 'vutrunghieu@gmail.com', '0901234006', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Vũ Trung Hiếu', 'https://i.pravatar.cc/150?u=vutrunghieu', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('doanngochan', 'doanngochan@gmail.com', '0901234007', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Đoàn Ngọc Hân', 'https://i.pravatar.cc/150?u=doanngochan', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('buiducmanh', 'buiducmanh@gmail.com', '0901234008', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Bùi Đức Mạnh', 'https://i.pravatar.cc/150?u=buiducmanh', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('ngothikimchi', 'ngothikimchi@gmail.com', '0901234009', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Ngô Thị Kim Chi', 'https://i.pravatar.cc/150?u=ngothikimchi', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('lyminhduc', 'lyminhduc@gmail.com', '0901234010', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Lý Minh Đức', 'https://i.pravatar.cc/150?u=lyminhduc', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('trangthuhuong', 'trangthuhuong@gmail.com', '0901234011', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Trang Thu Hương', 'https://i.pravatar.cc/150?u=trangthuhuong', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('nguyenquocbao', 'nguyenquocbao@gmail.com', '0901234012', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Nguyễn Quốc Bảo', 'https://i.pravatar.cc/150?u=nguyenquocbao', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('vuongthithu', 'vuongthithu@gmail.com', '0901234013', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Vương Thị Thu', 'https://i.pravatar.cc/150?u=vuongthithu', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('dangvietdung', 'dangvietdung@gmail.com', '0901234014', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Đặng Việt Dũng', 'https://i.pravatar.cc/150?u=dangvietdung', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('diemquynh2001', 'diemquynh2001@gmail.com', '0901234015', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Diễm Quỳnh', 'https://i.pravatar.cc/150?u=diemquynh2001', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('haotienwang', 'haotienwang@gmail.com', '0901234016', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Hào Tiến', 'https://i.pravatar.cc/150?u=haotienwang', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('nguyenbichvan', 'nguyenbichvan@gmail.com', '0901234017', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Nguyễn Bích Vân', 'https://i.pravatar.cc/150?u=nguyenbichvan', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('trandinhtoan', 'trandinhtoan@gmail.com', '0901234018', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Trần Đình Toàn', 'https://i.pravatar.cc/150?u=trandinhtoan', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('maianhtu', 'maianhtu@gmail.com', '0901234019', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Mai Anh Tú', 'https://i.pravatar.cc/150?u=maianhtu', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('phanngocbich', 'phanngocbich@gmail.com', '0901234020', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Phan Ngọc Bích', 'https://i.pravatar.cc/150?u=phanngocbich', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('luongvanson', 'luongvanson@gmail.com', '0901234021', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Lương Văn Sơn', 'https://i.pravatar.cc/150?u=luongvanson', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('truongthungan', 'truongthungan@gmail.com', '0901234022', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Trương Thu Ngân', 'https://i.pravatar.cc/150?u=truongthungan', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('caovanha', 'caovanha@gmail.com', '0901234023', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Cao Văn Hà', 'https://i.pravatar.cc/150?u=caovanha', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('dinhthuyduong', 'dinhthuyduong@gmail.com', '0901234024', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Đinh Thùy Dương', 'https://i.pravatar.cc/150?u=dinhthuyduong', 'nu', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);
INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)
VALUES ('phungminhkhoa', 'phungminhkhoa@gmail.com', '0901234025', '$2b$10$V9Kht.q7JJSRsairONOtl.B1.cAQv0G7lEjqEvbbhZmgHhtv/yb8W', 'Phùng Minh Khoa', 'https://i.pravatar.cc/150?u=phungminhkhoa', 'nam', 0, 0, 'hoat_dong', 'email', NOW(), 4.00);

-- ============================================================
-- 2. TẠO ĐƠN HÀNG GIẢ + REVIEW CHO TỪNG QUÁN
-- ============================================================
-- ----- quanbunbohuebatuyet (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90002 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90002 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90001', @buyer_id_90002, @store_id_90002, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-05-16 00:00:00', '2026-05-16 00:00:00');
SET @order_id_90002 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90002, @buyer_id_90002, @store_id_90002, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-05-16 00:00:00');

SET @buyer_id_90003 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90003 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90002', @buyer_id_90003, @store_id_90003, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-06 00:00:00', '2026-04-06 00:00:00');
SET @order_id_90003 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90003, @buyer_id_90003, @store_id_90003, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-04-06 00:00:00');

SET @buyer_id_90004 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90004 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90003', @buyer_id_90004, @store_id_90004, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-12-02 00:00:00', '2025-12-02 00:00:00');
SET @order_id_90004 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90004, @buyer_id_90004, @store_id_90004, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2025-12-02 00:00:00');

SET @buyer_id_90005 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90005 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90004', @buyer_id_90005, @store_id_90005, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-05 00:00:00', '2026-04-05 00:00:00');
SET @order_id_90005 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90005, @buyer_id_90005, @store_id_90005, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-05 00:00:00');

SET @buyer_id_90006 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90006 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90005', @buyer_id_90006, @store_id_90006, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-02 00:00:00', '2026-03-02 00:00:00');
SET @order_id_90006 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90006, @buyer_id_90006, @store_id_90006, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-02 00:00:00');

SET @buyer_id_90007 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90007 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunbohuebatuyet' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90006', @buyer_id_90007, @store_id_90007, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-05-11 00:00:00', '2026-05-11 00:00:00');
SET @order_id_90007 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90007, @buyer_id_90007, @store_id_90007, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-05-11 00:00:00');


-- ----- myquangech1a (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90008 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90008 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangech1a' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90007', @buyer_id_90008, @store_id_90008, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-04-17 00:00:00', '2026-04-17 00:00:00');
SET @order_id_90008 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90008, @buyer_id_90008, @store_id_90008, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-04-17 00:00:00');

SET @buyer_id_90009 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90009 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangech1a' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90008', @buyer_id_90009, @store_id_90009, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-08 00:00:00', '2026-04-08 00:00:00');
SET @order_id_90009 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90009, @buyer_id_90009, @store_id_90009, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-04-08 00:00:00');

SET @buyer_id_90010 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90010 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangech1a' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90009', @buyer_id_90010, @store_id_90010, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-18 00:00:00', '2025-12-18 00:00:00');
SET @order_id_90010 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90010, @buyer_id_90010, @store_id_90010, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-12-18 00:00:00');

SET @buyer_id_90011 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90011 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangech1a' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90010', @buyer_id_90011, @store_id_90011, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-27 00:00:00', '2026-02-27 00:00:00');
SET @order_id_90011 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90011, @buyer_id_90011, @store_id_90011, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-02-27 00:00:00');


-- ----- phohoangondanang (5 reviews, avg 4.40 sao) -----
SET @buyer_id_90012 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90012 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phohoangondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90011', @buyer_id_90012, @store_id_90012, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-25 00:00:00', '2026-03-25 00:00:00');
SET @order_id_90012 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90012, @buyer_id_90012, @store_id_90012, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-03-25 00:00:00');

SET @buyer_id_90013 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90013 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phohoangondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90012', @buyer_id_90013, @store_id_90013, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90013 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90013, @buyer_id_90013, @store_id_90013, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');

SET @buyer_id_90014 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90014 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phohoangondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90013', @buyer_id_90014, @store_id_90014, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-01-11 00:00:00', '2026-01-11 00:00:00');
SET @order_id_90014 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90014, @buyer_id_90014, @store_id_90014, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-01-11 00:00:00');

SET @buyer_id_90015 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90015 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phohoangondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90014', @buyer_id_90015, @store_id_90015, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-11-23 00:00:00', '2025-11-23 00:00:00');
SET @order_id_90015 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90015, @buyer_id_90015, @store_id_90015, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-11-23 00:00:00');

SET @buyer_id_90016 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90016 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phohoangondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90015', @buyer_id_90016, @store_id_90016, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-12-21 00:00:00', '2025-12-21 00:00:00');
SET @order_id_90016 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90016, @buyer_id_90016, @store_id_90016, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-21 00:00:00');


-- ----- quanbunchacamamruocbaloan (5 reviews, avg 4.00 sao) -----
SET @buyer_id_90017 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90017 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90016', @buyer_id_90017, @store_id_90017, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-02-15 00:00:00', '2026-02-15 00:00:00');
SET @order_id_90017 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90017, @buyer_id_90017, @store_id_90017, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-02-15 00:00:00');

SET @buyer_id_90018 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90018 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90017', @buyer_id_90018, @store_id_90018, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-16 00:00:00', '2025-12-16 00:00:00');
SET @order_id_90018 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90018, @buyer_id_90018, @store_id_90018, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-16 00:00:00');

SET @buyer_id_90019 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90019 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90018', @buyer_id_90019, @store_id_90019, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-22 00:00:00', '2025-12-22 00:00:00');
SET @order_id_90019 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90019, @buyer_id_90019, @store_id_90019, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2025-12-22 00:00:00');

SET @buyer_id_90020 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90020 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90019', @buyer_id_90020, @store_id_90020, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-12-02 00:00:00', '2025-12-02 00:00:00');
SET @order_id_90020 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90020, @buyer_id_90020, @store_id_90020, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2025-12-02 00:00:00');

SET @buyer_id_90021 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90021 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanbunchacamamruocbaloan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90020', @buyer_id_90021, @store_id_90021, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90021 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90021, @buyer_id_90021, @store_id_90021, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');


-- ----- comgababuoi (6 reviews, avg 4.50 sao) -----
SET @buyer_id_90022 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90022 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90021', @buyer_id_90022, @store_id_90022, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-12-03 00:00:00', '2025-12-03 00:00:00');
SET @order_id_90022 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90022, @buyer_id_90022, @store_id_90022, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-03 00:00:00');

SET @buyer_id_90023 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90023 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90022', @buyer_id_90023, @store_id_90023, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-10 00:00:00', '2025-12-10 00:00:00');
SET @order_id_90023 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90023, @buyer_id_90023, @store_id_90023, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-12-10 00:00:00');

SET @buyer_id_90024 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90024 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90023', @buyer_id_90024, @store_id_90024, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-15 00:00:00', '2026-01-15 00:00:00');
SET @order_id_90024 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90024, @buyer_id_90024, @store_id_90024, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-01-15 00:00:00');

SET @buyer_id_90025 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90025 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90024', @buyer_id_90025, @store_id_90025, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-05-12 00:00:00', '2026-05-12 00:00:00');
SET @order_id_90025 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90025, @buyer_id_90025, @store_id_90025, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-05-12 00:00:00');

SET @buyer_id_90026 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90026 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90025', @buyer_id_90026, @store_id_90026, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-27 00:00:00', '2025-11-27 00:00:00');
SET @order_id_90026 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90026, @buyer_id_90026, @store_id_90026, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-11-27 00:00:00');

SET @buyer_id_90027 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90027 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comgababuoi' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90026', @buyer_id_90027, @store_id_90027, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-11 00:00:00', '2026-01-11 00:00:00');
SET @order_id_90027 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90027, @buyer_id_90027, @store_id_90027, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-01-11 00:00:00');


-- ----- nhahanghaisanbeman (6 reviews, avg 4.50 sao) -----
SET @buyer_id_90028 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90028 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90027', @buyer_id_90028, @store_id_90028, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-29 00:00:00', '2025-11-29 00:00:00');
SET @order_id_90028 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90028, @buyer_id_90028, @store_id_90028, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-11-29 00:00:00');

SET @buyer_id_90029 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90029 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90028', @buyer_id_90029, @store_id_90029, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-23 00:00:00', '2026-01-23 00:00:00');
SET @order_id_90029 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90029, @buyer_id_90029, @store_id_90029, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-01-23 00:00:00');

SET @buyer_id_90030 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90030 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90029', @buyer_id_90030, @store_id_90030, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-13 00:00:00', '2026-03-13 00:00:00');
SET @order_id_90030 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90030, @buyer_id_90030, @store_id_90030, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-03-13 00:00:00');

SET @buyer_id_90031 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90031 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90030', @buyer_id_90031, @store_id_90031, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-02-25 00:00:00', '2026-02-25 00:00:00');
SET @order_id_90031 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90031, @buyer_id_90031, @store_id_90031, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-02-25 00:00:00');

SET @buyer_id_90032 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90032 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90031', @buyer_id_90032, @store_id_90032, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-18 00:00:00', '2026-01-18 00:00:00');
SET @order_id_90032 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90032, @buyer_id_90032, @store_id_90032, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-01-18 00:00:00');

SET @buyer_id_90033 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90033 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nhahanghaisanbeman' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90032', @buyer_id_90033, @store_id_90033, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-11-21 00:00:00', '2025-11-21 00:00:00');
SET @order_id_90033 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90033, @buyer_id_90033, @store_id_90033, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-11-21 00:00:00');


-- ----- comtamsaigondanang (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90034 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90034 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90033', @buyer_id_90034, @store_id_90034, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90034 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90034, @buyer_id_90034, @store_id_90034, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');

SET @buyer_id_90035 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90035 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90034', @buyer_id_90035, @store_id_90035, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-02 00:00:00', '2026-02-02 00:00:00');
SET @order_id_90035 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90035, @buyer_id_90035, @store_id_90035, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-02-02 00:00:00');

SET @buyer_id_90036 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90036 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90035', @buyer_id_90036, @store_id_90036, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-20 00:00:00', '2026-04-20 00:00:00');
SET @order_id_90036 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90036, @buyer_id_90036, @store_id_90036, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-20 00:00:00');

SET @buyer_id_90037 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90037 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90036', @buyer_id_90037, @store_id_90037, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-02-11 00:00:00', '2026-02-11 00:00:00');
SET @order_id_90037 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90037, @buyer_id_90037, @store_id_90037, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-02-11 00:00:00');


-- ----- banhxeobaduong (4 reviews, avg 5.00 sao) -----
SET @buyer_id_90038 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90038 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhxeobaduong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90037', @buyer_id_90038, @store_id_90038, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-01 00:00:00', '2026-03-01 00:00:00');
SET @order_id_90038 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90038, @buyer_id_90038, @store_id_90038, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-03-01 00:00:00');

SET @buyer_id_90039 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90039 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhxeobaduong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90038', @buyer_id_90039, @store_id_90039, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-18 00:00:00', '2026-04-18 00:00:00');
SET @order_id_90039 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90039, @buyer_id_90039, @store_id_90039, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-04-18 00:00:00');

SET @buyer_id_90040 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90040 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhxeobaduong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90039', @buyer_id_90040, @store_id_90040, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-12 00:00:00', '2026-04-12 00:00:00');
SET @order_id_90040 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90040, @buyer_id_90040, @store_id_90040, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-12 00:00:00');

SET @buyer_id_90041 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90041 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhxeobaduong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90040', @buyer_id_90041, @store_id_90041, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-08 00:00:00', '2025-12-08 00:00:00');
SET @order_id_90041 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90041, @buyer_id_90041, @store_id_90041, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-08 00:00:00');


-- ----- laubonhungdamhoangkim (5 reviews, avg 4.80 sao) -----
SET @buyer_id_90042 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90042 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90041', @buyer_id_90042, @store_id_90042, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-04 00:00:00', '2025-12-04 00:00:00');
SET @order_id_90042 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90042, @buyer_id_90042, @store_id_90042, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2025-12-04 00:00:00');

SET @buyer_id_90043 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90043 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90042', @buyer_id_90043, @store_id_90043, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-25 00:00:00', '2025-12-25 00:00:00');
SET @order_id_90043 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90043, @buyer_id_90043, @store_id_90043, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-12-25 00:00:00');

SET @buyer_id_90044 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90044 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90043', @buyer_id_90044, @store_id_90044, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-05-12 00:00:00', '2026-05-12 00:00:00');
SET @order_id_90044 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90044, @buyer_id_90044, @store_id_90044, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-05-12 00:00:00');

SET @buyer_id_90045 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90045 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90044', @buyer_id_90045, @store_id_90045, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-17 00:00:00', '2026-03-17 00:00:00');
SET @order_id_90045 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90045, @buyer_id_90045, @store_id_90045, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-17 00:00:00');

SET @buyer_id_90046 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90046 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laubonhungdamhoangkim' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90045', @buyer_id_90046, @store_id_90046, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-28 00:00:00', '2025-12-28 00:00:00');
SET @order_id_90046 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90046, @buyer_id_90046, @store_id_90046, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-12-28 00:00:00');


-- ----- nemnuongbangahoavang (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90047 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90047 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90046', @buyer_id_90047, @store_id_90047, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-03-28 00:00:00', '2026-03-28 00:00:00');
SET @order_id_90047 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90047, @buyer_id_90047, @store_id_90047, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-28 00:00:00');

SET @buyer_id_90048 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90048 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90047', @buyer_id_90048, @store_id_90048, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-05-04 00:00:00', '2026-05-04 00:00:00');
SET @order_id_90048 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90048, @buyer_id_90048, @store_id_90048, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-05-04 00:00:00');

SET @buyer_id_90049 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90049 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90048', @buyer_id_90049, @store_id_90049, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-02-17 00:00:00', '2026-02-17 00:00:00');
SET @order_id_90049 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90049, @buyer_id_90049, @store_id_90049, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-02-17 00:00:00');

SET @buyer_id_90050 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90050 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nemnuongbangahoavang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90049', @buyer_id_90050, @store_id_90050, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-31 00:00:00', '2026-03-31 00:00:00');
SET @order_id_90050 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90050, @buyer_id_90050, @store_id_90050, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-31 00:00:00');


-- ----- banhmibalanngonnuctieng (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90051 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90051 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90050', @buyer_id_90051, @store_id_90051, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-07 00:00:00', '2026-01-07 00:00:00');
SET @order_id_90051 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90051, @buyer_id_90051, @store_id_90051, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-01-07 00:00:00');

SET @buyer_id_90052 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90052 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90051', @buyer_id_90052, @store_id_90052, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-23 00:00:00', '2026-04-23 00:00:00');
SET @order_id_90052 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90052, @buyer_id_90052, @store_id_90052, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-04-23 00:00:00');

SET @buyer_id_90053 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90053 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90052', @buyer_id_90053, @store_id_90053, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-28 00:00:00', '2025-12-28 00:00:00');
SET @order_id_90053 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90053, @buyer_id_90053, @store_id_90053, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-12-28 00:00:00');

SET @buyer_id_90054 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90054 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmibalanngonnuctieng' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90053', @buyer_id_90054, @store_id_90054, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-28 00:00:00', '2026-03-28 00:00:00');
SET @order_id_90054 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90054, @buyer_id_90054, @store_id_90054, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-03-28 00:00:00');


-- ----- banhcanhcothucaloc (4 reviews, avg 4.25 sao) -----
SET @buyer_id_90055 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90055 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90054', @buyer_id_90055, @store_id_90055, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-01-08 00:00:00', '2026-01-08 00:00:00');
SET @order_id_90055 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90055, @buyer_id_90055, @store_id_90055, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-01-08 00:00:00');

SET @buyer_id_90056 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90056 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90055', @buyer_id_90056, @store_id_90056, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-04-03 00:00:00', '2026-04-03 00:00:00');
SET @order_id_90056 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90056, @buyer_id_90056, @store_id_90056, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-04-03 00:00:00');

SET @buyer_id_90057 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90057 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90056', @buyer_id_90057, @store_id_90057, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-05-07 00:00:00', '2026-05-07 00:00:00');
SET @order_id_90057 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90057, @buyer_id_90057, @store_id_90057, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-05-07 00:00:00');

SET @buyer_id_90058 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90058 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhcothucaloc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90057', @buyer_id_90058, @store_id_90058, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-01-18 00:00:00', '2026-01-18 00:00:00');
SET @order_id_90058 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90058, @buyer_id_90058, @store_id_90058, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-01-18 00:00:00');


-- ----- thecoffeehousedanang (6 reviews, avg 4.17 sao) -----
SET @buyer_id_90059 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90059 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90058', @buyer_id_90059, @store_id_90059, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-22 00:00:00', '2025-12-22 00:00:00');
SET @order_id_90059 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90059, @buyer_id_90059, @store_id_90059, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2025-12-22 00:00:00');

SET @buyer_id_90060 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90060 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90059', @buyer_id_90060, @store_id_90060, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-18 00:00:00', '2025-12-18 00:00:00');
SET @order_id_90060 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90060, @buyer_id_90060, @store_id_90060, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2025-12-18 00:00:00');

SET @buyer_id_90061 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90061 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90060', @buyer_id_90061, @store_id_90061, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-25 00:00:00', '2026-04-25 00:00:00');
SET @order_id_90061 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90061, @buyer_id_90061, @store_id_90061, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-25 00:00:00');

SET @buyer_id_90062 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90062 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90061', @buyer_id_90062, @store_id_90062, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-02-14 00:00:00', '2026-02-14 00:00:00');
SET @order_id_90062 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90062, @buyer_id_90062, @store_id_90062, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-02-14 00:00:00');

SET @buyer_id_90063 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90063 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90062', @buyer_id_90063, @store_id_90063, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-23 00:00:00', '2026-04-23 00:00:00');
SET @order_id_90063 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90063, @buyer_id_90063, @store_id_90063, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-04-23 00:00:00');

SET @buyer_id_90064 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90064 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'thecoffeehousedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90063', @buyer_id_90064, @store_id_90064, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-15 00:00:00', '2026-03-15 00:00:00');
SET @order_id_90064 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90064, @buyer_id_90064, @store_id_90064, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-03-15 00:00:00');


-- ----- gongchadanang (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90065 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90065 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'gongchadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90064', @buyer_id_90065, @store_id_90065, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-25 00:00:00', '2026-04-25 00:00:00');
SET @order_id_90065 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90065, @buyer_id_90065, @store_id_90065, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-04-25 00:00:00');

SET @buyer_id_90066 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90066 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'gongchadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90065', @buyer_id_90066, @store_id_90066, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-29 00:00:00', '2025-12-29 00:00:00');
SET @order_id_90066 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90066, @buyer_id_90066, @store_id_90066, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-12-29 00:00:00');

SET @buyer_id_90067 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90067 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'gongchadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90066', @buyer_id_90067, @store_id_90067, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-04-11 00:00:00', '2026-04-11 00:00:00');
SET @order_id_90067 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90067, @buyer_id_90067, @store_id_90067, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-04-11 00:00:00');

SET @buyer_id_90068 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90068 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'gongchadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90067', @buyer_id_90068, @store_id_90068, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-23 00:00:00', '2026-01-23 00:00:00');
SET @order_id_90068 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90068, @buyer_id_90068, @store_id_90068, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-01-23 00:00:00');


-- ----- trasuatocotocodanang (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90069 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90069 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90068', @buyer_id_90069, @store_id_90069, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-28 00:00:00', '2026-04-28 00:00:00');
SET @order_id_90069 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90069, @buyer_id_90069, @store_id_90069, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-28 00:00:00');

SET @buyer_id_90070 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90070 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90069', @buyer_id_90070, @store_id_90070, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-03-07 00:00:00', '2026-03-07 00:00:00');
SET @order_id_90070 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90070, @buyer_id_90070, @store_id_90070, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-07 00:00:00');

SET @buyer_id_90071 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90071 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90070', @buyer_id_90071, @store_id_90071, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-11 00:00:00', '2025-12-11 00:00:00');
SET @order_id_90071 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90071, @buyer_id_90071, @store_id_90071, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2025-12-11 00:00:00');

SET @buyer_id_90072 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90072 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trasuatocotocodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90071', @buyer_id_90072, @store_id_90072, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-27 00:00:00', '2026-04-27 00:00:00');
SET @order_id_90072 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90072, @buyer_id_90072, @store_id_90072, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-27 00:00:00');


-- ----- pizzahomedanang (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90073 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90073 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'pizzahomedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90072', @buyer_id_90073, @store_id_90073, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-23 00:00:00', '2026-03-23 00:00:00');
SET @order_id_90073 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90073, @buyer_id_90073, @store_id_90073, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-03-23 00:00:00');

SET @buyer_id_90074 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90074 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'pizzahomedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90073', @buyer_id_90074, @store_id_90074, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-02 00:00:00', '2026-03-02 00:00:00');
SET @order_id_90074 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90074, @buyer_id_90074, @store_id_90074, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-03-02 00:00:00');

SET @buyer_id_90075 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90075 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'pizzahomedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90074', @buyer_id_90075, @store_id_90075, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-03-24 00:00:00', '2026-03-24 00:00:00');
SET @order_id_90075 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90075, @buyer_id_90075, @store_id_90075, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-03-24 00:00:00');

SET @buyer_id_90076 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90076 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'pizzahomedanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90075', @buyer_id_90076, @store_id_90076, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-24 00:00:00', '2026-03-24 00:00:00');
SET @order_id_90076 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90076, @buyer_id_90076, @store_id_90076, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-03-24 00:00:00');


-- ----- garankfcdanangdongda (4 reviews, avg 3.75 sao) -----
SET @buyer_id_90077 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90077 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90076', @buyer_id_90077, @store_id_90077, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-17 00:00:00', '2025-12-17 00:00:00');
SET @order_id_90077 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90077, @buyer_id_90077, @store_id_90077, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-17 00:00:00');

SET @buyer_id_90078 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90078 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90077', @buyer_id_90078, @store_id_90078, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-17 00:00:00', '2026-02-17 00:00:00');
SET @order_id_90078 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90078, @buyer_id_90078, @store_id_90078, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-02-17 00:00:00');

SET @buyer_id_90079 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90079 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90078', @buyer_id_90079, @store_id_90079, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2025-12-09 00:00:00', '2025-12-09 00:00:00');
SET @order_id_90079 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90079, @buyer_id_90079, @store_id_90079, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-09 00:00:00');

SET @buyer_id_90080 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90080 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'garankfcdanangdongda' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90079', @buyer_id_90080, @store_id_90080, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-23 00:00:00', '2026-03-23 00:00:00');
SET @order_id_90080 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90080, @buyer_id_90080, @store_id_90080, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-23 00:00:00');


-- ----- myquangbamua (4 reviews, avg 4.25 sao) -----
SET @buyer_id_90081 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90081 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangbamua' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90080', @buyer_id_90081, @store_id_90081, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-02-14 00:00:00', '2026-02-14 00:00:00');
SET @order_id_90081 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90081, @buyer_id_90081, @store_id_90081, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-02-14 00:00:00');

SET @buyer_id_90082 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90082 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangbamua' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90081', @buyer_id_90082, @store_id_90082, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-02-25 00:00:00', '2026-02-25 00:00:00');
SET @order_id_90082 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90082, @buyer_id_90082, @store_id_90082, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-02-25 00:00:00');

SET @buyer_id_90083 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90083 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangbamua' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90082', @buyer_id_90083, @store_id_90083, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-02 00:00:00', '2026-01-02 00:00:00');
SET @order_id_90083 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90083, @buyer_id_90083, @store_id_90083, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-01-02 00:00:00');

SET @buyer_id_90084 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90084 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangbamua' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90083', @buyer_id_90084, @store_id_90084, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-16 00:00:00', '2026-01-16 00:00:00');
SET @order_id_90084 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90084, @buyer_id_90084, @store_id_90084, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-01-16 00:00:00');


-- ----- caolauhoiangiualongdanang (4 reviews, avg 5.00 sao) -----
SET @buyer_id_90085 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90085 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90084', @buyer_id_90085, @store_id_90085, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-09 00:00:00', '2025-12-09 00:00:00');
SET @order_id_90085 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90085, @buyer_id_90085, @store_id_90085, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-12-09 00:00:00');

SET @buyer_id_90086 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90086 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90085', @buyer_id_90086, @store_id_90086, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-10 00:00:00', '2026-03-10 00:00:00');
SET @order_id_90086 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90086, @buyer_id_90086, @store_id_90086, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-10 00:00:00');

SET @buyer_id_90087 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90087 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90086', @buyer_id_90087, @store_id_90087, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-05-13 00:00:00', '2026-05-13 00:00:00');
SET @order_id_90087 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90087, @buyer_id_90087, @store_id_90087, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-05-13 00:00:00');

SET @buyer_id_90088 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90088 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caolauhoiangiualongdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90087', @buyer_id_90088, @store_id_90088, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-05-08 00:00:00', '2026-05-08 00:00:00');
SET @order_id_90088 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90088, @buyer_id_90088, @store_id_90088, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-05-08 00:00:00');


-- ----- che3coemchengondanang (6 reviews, avg 4.17 sao) -----
SET @buyer_id_90089 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90089 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90088', @buyer_id_90089, @store_id_90089, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-22 00:00:00', '2026-03-22 00:00:00');
SET @order_id_90089 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90089, @buyer_id_90089, @store_id_90089, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-03-22 00:00:00');

SET @buyer_id_90090 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90090 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90089', @buyer_id_90090, @store_id_90090, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-05-14 00:00:00', '2026-05-14 00:00:00');
SET @order_id_90090 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90090, @buyer_id_90090, @store_id_90090, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-05-14 00:00:00');

SET @buyer_id_90091 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90091 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90090', @buyer_id_90091, @store_id_90091, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-02-20 00:00:00', '2026-02-20 00:00:00');
SET @order_id_90091 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90091, @buyer_id_90091, @store_id_90091, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-02-20 00:00:00');

SET @buyer_id_90092 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90092 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90091', @buyer_id_90092, @store_id_90092, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-01 00:00:00', '2026-03-01 00:00:00');
SET @order_id_90092 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90092, @buyer_id_90092, @store_id_90092, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-03-01 00:00:00');

SET @buyer_id_90093 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90093 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90092', @buyer_id_90093, @store_id_90093, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-05 00:00:00', '2026-03-05 00:00:00');
SET @order_id_90093 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90093, @buyer_id_90093, @store_id_90093, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-03-05 00:00:00');

SET @buyer_id_90094 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90094 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'che3coemchengondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90093', @buyer_id_90094, @store_id_90094, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-07 00:00:00', '2026-02-07 00:00:00');
SET @order_id_90094 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90094, @buyer_id_90094, @store_id_90094, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-02-07 00:00:00');


-- ----- chaolongbasaudanang (5 reviews, avg 4.20 sao) -----
SET @buyer_id_90095 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90095 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90094', @buyer_id_90095, @store_id_90095, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90095 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90095, @buyer_id_90095, @store_id_90095, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');

SET @buyer_id_90096 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90096 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90095', @buyer_id_90096, @store_id_90096, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-02-02 00:00:00', '2026-02-02 00:00:00');
SET @order_id_90096 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90096, @buyer_id_90096, @store_id_90096, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-02-02 00:00:00');

SET @buyer_id_90097 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90097 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90096', @buyer_id_90097, @store_id_90097, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-02-16 00:00:00', '2026-02-16 00:00:00');
SET @order_id_90097 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90097, @buyer_id_90097, @store_id_90097, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-02-16 00:00:00');

SET @buyer_id_90098 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90098 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90097', @buyer_id_90098, @store_id_90098, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-02-08 00:00:00', '2026-02-08 00:00:00');
SET @order_id_90098 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90098, @buyer_id_90098, @store_id_90098, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-02-08 00:00:00');

SET @buyer_id_90099 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90099 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongbasaudanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90098', @buyer_id_90099, @store_id_90099, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-05-14 00:00:00', '2026-05-14 00:00:00');
SET @order_id_90099 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90099, @buyer_id_90099, @store_id_90099, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-05-14 00:00:00');


-- ----- xoichebahanhngonre (5 reviews, avg 5.00 sao) -----
SET @buyer_id_90100 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90100 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90099', @buyer_id_90100, @store_id_90100, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-03-19 00:00:00', '2026-03-19 00:00:00');
SET @order_id_90100 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90100, @buyer_id_90100, @store_id_90100, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-03-19 00:00:00');

SET @buyer_id_90101 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90101 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90100', @buyer_id_90101, @store_id_90101, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-31 00:00:00', '2025-12-31 00:00:00');
SET @order_id_90101 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90101, @buyer_id_90101, @store_id_90101, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-12-31 00:00:00');

SET @buyer_id_90102 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90102 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90101', @buyer_id_90102, @store_id_90102, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-02-13 00:00:00', '2026-02-13 00:00:00');
SET @order_id_90102 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90102, @buyer_id_90102, @store_id_90102, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-02-13 00:00:00');

SET @buyer_id_90103 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90103 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90102', @buyer_id_90103, @store_id_90103, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2025-12-27 00:00:00', '2025-12-27 00:00:00');
SET @order_id_90103 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90103, @buyer_id_90103, @store_id_90103, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2025-12-27 00:00:00');

SET @buyer_id_90104 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90104 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoichebahanhngonre' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90103', @buyer_id_90104, @store_id_90104, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-11-19 00:00:00', '2025-11-19 00:00:00');
SET @order_id_90104 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90104, @buyer_id_90104, @store_id_90104, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-11-19 00:00:00');


-- ----- botaichanhsontra (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90105 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90105 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'botaichanhsontra' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90104', @buyer_id_90105, @store_id_90105, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-30 00:00:00', '2026-04-30 00:00:00');
SET @order_id_90105 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90105, @buyer_id_90105, @store_id_90105, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-04-30 00:00:00');

SET @buyer_id_90106 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90106 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'botaichanhsontra' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90105', @buyer_id_90106, @store_id_90106, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-02-21 00:00:00', '2026-02-21 00:00:00');
SET @order_id_90106 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90106, @buyer_id_90106, @store_id_90106, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-02-21 00:00:00');

SET @buyer_id_90107 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90107 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'botaichanhsontra' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90106', @buyer_id_90107, @store_id_90107, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-04-24 00:00:00', '2026-04-24 00:00:00');
SET @order_id_90107 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90107, @buyer_id_90107, @store_id_90107, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-04-24 00:00:00');

SET @buyer_id_90108 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90108 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'botaichanhsontra' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90107', @buyer_id_90108, @store_id_90108, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-03-07 00:00:00', '2026-03-07 00:00:00');
SET @order_id_90108 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90108, @buyer_id_90108, @store_id_90108, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-03-07 00:00:00');


-- ----- quanocbiendemmykhe (6 reviews, avg 4.17 sao) -----
SET @buyer_id_90109 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90109 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90108', @buyer_id_90109, @store_id_90109, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-12-30 00:00:00', '2025-12-30 00:00:00');
SET @order_id_90109 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90109, @buyer_id_90109, @store_id_90109, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2025-12-30 00:00:00');

SET @buyer_id_90110 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90110 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90109', @buyer_id_90110, @store_id_90110, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-19 00:00:00', '2025-12-19 00:00:00');
SET @order_id_90110 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90110, @buyer_id_90110, @store_id_90110, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-19 00:00:00');

SET @buyer_id_90111 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90111 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90110', @buyer_id_90111, @store_id_90111, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-06 00:00:00', '2026-01-06 00:00:00');
SET @order_id_90111 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90111, @buyer_id_90111, @store_id_90111, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-01-06 00:00:00');

SET @buyer_id_90112 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90112 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90111', @buyer_id_90112, @store_id_90112, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-05-07 00:00:00', '2026-05-07 00:00:00');
SET @order_id_90112 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90112, @buyer_id_90112, @store_id_90112, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-05-07 00:00:00');

SET @buyer_id_90113 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90113 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90112', @buyer_id_90113, @store_id_90113, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-12 00:00:00', '2026-01-12 00:00:00');
SET @order_id_90113 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90113, @buyer_id_90113, @store_id_90113, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-01-12 00:00:00');

SET @buyer_id_90114 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90114 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quanocbiendemmykhe' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90113', @buyer_id_90114, @store_id_90114, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-11-21 00:00:00', '2025-11-21 00:00:00');
SET @order_id_90114 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90114, @buyer_id_90114, @store_id_90114, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-11-21 00:00:00');


-- ----- bunthitnuongmientrungcoba (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90115 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90115 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90114', @buyer_id_90115, @store_id_90115, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-12 00:00:00', '2026-04-12 00:00:00');
SET @order_id_90115 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90115, @buyer_id_90115, @store_id_90115, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-12 00:00:00');

SET @buyer_id_90116 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90116 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90115', @buyer_id_90116, @store_id_90116, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-04 00:00:00', '2026-03-04 00:00:00');
SET @order_id_90116 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90116, @buyer_id_90116, @store_id_90116, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-03-04 00:00:00');

SET @buyer_id_90117 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90117 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90116', @buyer_id_90117, @store_id_90117, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-29 00:00:00', '2025-12-29 00:00:00');
SET @order_id_90117 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90117, @buyer_id_90117, @store_id_90117, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-29 00:00:00');

SET @buyer_id_90118 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90118 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongmientrungcoba' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90117', @buyer_id_90118, @store_id_90118, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-26 00:00:00', '2025-12-26 00:00:00');
SET @order_id_90118 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90118, @buyer_id_90118, @store_id_90118, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-12-26 00:00:00');


-- ----- hutieunamvangsaigondanang (6 reviews, avg 3.67 sao) -----
SET @buyer_id_90119 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90119 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90118', @buyer_id_90119, @store_id_90119, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-04-09 00:00:00', '2026-04-09 00:00:00');
SET @order_id_90119 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90119, @buyer_id_90119, @store_id_90119, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-04-09 00:00:00');

SET @buyer_id_90120 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90120 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90119', @buyer_id_90120, @store_id_90120, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-05-09 00:00:00', '2026-05-09 00:00:00');
SET @order_id_90120 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90120, @buyer_id_90120, @store_id_90120, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-05-09 00:00:00');

SET @buyer_id_90121 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90121 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90120', @buyer_id_90121, @store_id_90121, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-01-26 00:00:00', '2026-01-26 00:00:00');
SET @order_id_90121 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90121, @buyer_id_90121, @store_id_90121, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-26 00:00:00');

SET @buyer_id_90122 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90122 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90121', @buyer_id_90122, @store_id_90122, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-11 00:00:00', '2026-01-11 00:00:00');
SET @order_id_90122 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90122, @buyer_id_90122, @store_id_90122, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-01-11 00:00:00');

SET @buyer_id_90123 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90123 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90122', @buyer_id_90123, @store_id_90123, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-01-13 00:00:00', '2026-01-13 00:00:00');
SET @order_id_90123 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90123, @buyer_id_90123, @store_id_90123, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-01-13 00:00:00');

SET @buyer_id_90124 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90124 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieunamvangsaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90123', @buyer_id_90124, @store_id_90124, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-25 00:00:00', '2025-12-25 00:00:00');
SET @order_id_90124 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90124, @buyer_id_90124, @store_id_90124, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2025-12-25 00:00:00');


-- ----- sushisashiminhatngondanang (6 reviews, avg 4.17 sao) -----
SET @buyer_id_90125 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90125 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90124', @buyer_id_90125, @store_id_90125, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-02-15 00:00:00', '2026-02-15 00:00:00');
SET @order_id_90125 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90125, @buyer_id_90125, @store_id_90125, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-02-15 00:00:00');

SET @buyer_id_90126 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90126 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90125', @buyer_id_90126, @store_id_90126, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-22 00:00:00', '2026-01-22 00:00:00');
SET @order_id_90126 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90126, @buyer_id_90126, @store_id_90126, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-01-22 00:00:00');

SET @buyer_id_90127 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90127 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90126', @buyer_id_90127, @store_id_90127, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-22 00:00:00', '2026-03-22 00:00:00');
SET @order_id_90127 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90127, @buyer_id_90127, @store_id_90127, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-03-22 00:00:00');

SET @buyer_id_90128 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90128 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90127', @buyer_id_90128, @store_id_90128, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-19 00:00:00', '2026-01-19 00:00:00');
SET @order_id_90128 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90128, @buyer_id_90128, @store_id_90128, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-01-19 00:00:00');

SET @buyer_id_90129 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90129 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90128', @buyer_id_90129, @store_id_90129, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-11-22 00:00:00', '2025-11-22 00:00:00');
SET @order_id_90129 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90129, @buyer_id_90129, @store_id_90129, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2025-11-22 00:00:00');

SET @buyer_id_90130 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90130 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'sushisashiminhatngondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90129', @buyer_id_90130, @store_id_90130, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-02-12 00:00:00', '2026-02-12 00:00:00');
SET @order_id_90130 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90130, @buyer_id_90130, @store_id_90130, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-02-12 00:00:00');


-- ----- comnieusaigondanang (6 reviews, avg 4.50 sao) -----
SET @buyer_id_90131 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90131 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90130', @buyer_id_90131, @store_id_90131, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-20 00:00:00', '2025-12-20 00:00:00');
SET @order_id_90131 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90131, @buyer_id_90131, @store_id_90131, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-20 00:00:00');

SET @buyer_id_90132 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90132 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90131', @buyer_id_90132, @store_id_90132, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-04-27 00:00:00', '2026-04-27 00:00:00');
SET @order_id_90132 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90132, @buyer_id_90132, @store_id_90132, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-27 00:00:00');

SET @buyer_id_90133 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90133 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90132', @buyer_id_90133, @store_id_90133, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-04 00:00:00', '2026-04-04 00:00:00');
SET @order_id_90133 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90133, @buyer_id_90133, @store_id_90133, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-04-04 00:00:00');

SET @buyer_id_90134 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90134 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90133', @buyer_id_90134, @store_id_90134, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-05-08 00:00:00', '2026-05-08 00:00:00');
SET @order_id_90134 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90134, @buyer_id_90134, @store_id_90134, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-05-08 00:00:00');

SET @buyer_id_90135 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90135 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90134', @buyer_id_90135, @store_id_90135, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-01-27 00:00:00', '2026-01-27 00:00:00');
SET @order_id_90135 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90135, @buyer_id_90135, @store_id_90135, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-01-27 00:00:00');

SET @buyer_id_90136 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90136 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnieusaigondanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90135', @buyer_id_90136, @store_id_90136, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-05 00:00:00', '2025-12-05 00:00:00');
SET @order_id_90136 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90136, @buyer_id_90136, @store_id_90136, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-05 00:00:00');


-- ----- launamchaytinhtam (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90137 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90137 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'launamchaytinhtam' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90136', @buyer_id_90137, @store_id_90137, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-01 00:00:00', '2026-03-01 00:00:00');
SET @order_id_90137 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90137, @buyer_id_90137, @store_id_90137, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-01 00:00:00');

SET @buyer_id_90138 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90138 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'launamchaytinhtam' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90137', @buyer_id_90138, @store_id_90138, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-19 00:00:00', '2025-12-19 00:00:00');
SET @order_id_90138 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90138, @buyer_id_90138, @store_id_90138, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-19 00:00:00');

SET @buyer_id_90139 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90139 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'launamchaytinhtam' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90138', @buyer_id_90139, @store_id_90139, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-10 00:00:00', '2025-12-10 00:00:00');
SET @order_id_90139 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90139, @buyer_id_90139, @store_id_90139, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2025-12-10 00:00:00');

SET @buyer_id_90140 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90140 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'launamchaytinhtam' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90139', @buyer_id_90140, @store_id_90140, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-04 00:00:00', '2026-03-04 00:00:00');
SET @order_id_90140 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90140, @buyer_id_90140, @store_id_90140, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-04 00:00:00');

SET @buyer_id_90141 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90141 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'launamchaytinhtam' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90140', @buyer_id_90141, @store_id_90141, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-20 00:00:00', '2026-02-20 00:00:00');
SET @order_id_90141 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90141, @buyer_id_90141, @store_id_90141, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-02-20 00:00:00');


-- ----- banhtrangcuonthitheodanang (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90142 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90142 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90141', @buyer_id_90142, @store_id_90142, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-31 00:00:00', '2026-01-31 00:00:00');
SET @order_id_90142 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90142, @buyer_id_90142, @store_id_90142, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-31 00:00:00');

SET @buyer_id_90143 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90143 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90142', @buyer_id_90143, @store_id_90143, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-23 00:00:00', '2025-11-23 00:00:00');
SET @order_id_90143 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90143, @buyer_id_90143, @store_id_90143, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2025-11-23 00:00:00');

SET @buyer_id_90144 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90144 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90143', @buyer_id_90144, @store_id_90144, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-02 00:00:00', '2026-03-02 00:00:00');
SET @order_id_90144 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90144, @buyer_id_90144, @store_id_90144, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-03-02 00:00:00');

SET @buyer_id_90145 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90145 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangcuonthitheodanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90144', @buyer_id_90145, @store_id_90145, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2025-11-25 00:00:00', '2025-11-25 00:00:00');
SET @order_id_90145 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90145, @buyer_id_90145, @store_id_90145, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-11-25 00:00:00');


-- ----- bbqnuongbepthanhong (5 reviews, avg 4.20 sao) -----
SET @buyer_id_90146 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90146 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90145', @buyer_id_90146, @store_id_90146, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-24 00:00:00', '2026-03-24 00:00:00');
SET @order_id_90146 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90146, @buyer_id_90146, @store_id_90146, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-03-24 00:00:00');

SET @buyer_id_90147 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90147 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90146', @buyer_id_90147, @store_id_90147, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-11-25 00:00:00', '2025-11-25 00:00:00');
SET @order_id_90147 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90147, @buyer_id_90147, @store_id_90147, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2025-11-25 00:00:00');

SET @buyer_id_90148 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90148 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90147', @buyer_id_90148, @store_id_90148, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-01 00:00:00', '2026-01-01 00:00:00');
SET @order_id_90148 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90148, @buyer_id_90148, @store_id_90148, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-01-01 00:00:00');

SET @buyer_id_90149 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90149 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90148', @buyer_id_90149, @store_id_90149, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-01-12 00:00:00', '2026-01-12 00:00:00');
SET @order_id_90149 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90149, @buyer_id_90149, @store_id_90149, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-01-12 00:00:00');

SET @buyer_id_90150 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90150 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bbqnuongbepthanhong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90149', @buyer_id_90150, @store_id_90150, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-04 00:00:00', '2026-02-04 00:00:00');
SET @order_id_90150 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90150, @buyer_id_90150, @store_id_90150, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-02-04 00:00:00');


-- ----- dimsumtrunghoaminhchau (5 reviews, avg 4.00 sao) -----
SET @buyer_id_90151 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90151 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90150', @buyer_id_90151, @store_id_90151, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-11-30 00:00:00', '2025-11-30 00:00:00');
SET @order_id_90151 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90151, @buyer_id_90151, @store_id_90151, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2025-11-30 00:00:00');

SET @buyer_id_90152 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90152 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90151', @buyer_id_90152, @store_id_90152, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-11-25 00:00:00', '2025-11-25 00:00:00');
SET @order_id_90152 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90152, @buyer_id_90152, @store_id_90152, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2025-11-25 00:00:00');

SET @buyer_id_90153 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90153 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90152', @buyer_id_90153, @store_id_90153, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-20 00:00:00', '2026-04-20 00:00:00');
SET @order_id_90153 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90153, @buyer_id_90153, @store_id_90153, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-04-20 00:00:00');

SET @buyer_id_90154 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90154 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90153', @buyer_id_90154, @store_id_90154, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-15 00:00:00', '2026-01-15 00:00:00');
SET @order_id_90154 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90154, @buyer_id_90154, @store_id_90154, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-15 00:00:00');

SET @buyer_id_90155 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90155 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dimsumtrunghoaminhchau' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90154', @buyer_id_90155, @store_id_90155, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-03 00:00:00', '2026-01-03 00:00:00');
SET @order_id_90155 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90155, @buyer_id_90155, @store_id_90155, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-03 00:00:00');


-- ----- quancombinhdanminhphu (4 reviews, avg 4.25 sao) -----
SET @buyer_id_90156 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90156 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90155', @buyer_id_90156, @store_id_90156, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-06 00:00:00', '2026-01-06 00:00:00');
SET @order_id_90156 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90156, @buyer_id_90156, @store_id_90156, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-01-06 00:00:00');

SET @buyer_id_90157 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90157 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90156', @buyer_id_90157, @store_id_90157, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-13 00:00:00', '2026-03-13 00:00:00');
SET @order_id_90157 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90157, @buyer_id_90157, @store_id_90157, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-03-13 00:00:00');

SET @buyer_id_90158 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90158 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90157', @buyer_id_90158, @store_id_90158, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-23 00:00:00', '2025-11-23 00:00:00');
SET @order_id_90158 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90158, @buyer_id_90158, @store_id_90158, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-11-23 00:00:00');

SET @buyer_id_90159 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90159 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quancombinhdanminhphu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90158', @buyer_id_90159, @store_id_90159, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-01 00:00:00', '2026-04-01 00:00:00');
SET @order_id_90159 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90159, @buyer_id_90159, @store_id_90159, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-04-01 00:00:00');


-- ----- bundaumamtomhanoidanang (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90160 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90160 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90159', @buyer_id_90160, @store_id_90160, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-05-07 00:00:00', '2026-05-07 00:00:00');
SET @order_id_90160 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90160, @buyer_id_90160, @store_id_90160, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-05-07 00:00:00');

SET @buyer_id_90161 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90161 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90160', @buyer_id_90161, @store_id_90161, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-24 00:00:00', '2026-04-24 00:00:00');
SET @order_id_90161 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90161, @buyer_id_90161, @store_id_90161, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-24 00:00:00');

SET @buyer_id_90162 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90162 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90161', @buyer_id_90162, @store_id_90162, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-17 00:00:00', '2026-03-17 00:00:00');
SET @order_id_90162 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90162, @buyer_id_90162, @store_id_90162, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-17 00:00:00');

SET @buyer_id_90163 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90163 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90162', @buyer_id_90163, @store_id_90163, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-12-04 00:00:00', '2025-12-04 00:00:00');
SET @order_id_90163 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90163, @buyer_id_90163, @store_id_90163, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-04 00:00:00');

SET @buyer_id_90164 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90164 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundaumamtomhanoidanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90163', @buyer_id_90164, @store_id_90164, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-26 00:00:00', '2025-12-26 00:00:00');
SET @order_id_90164 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90164, @buyer_id_90164, @store_id_90164, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2025-12-26 00:00:00');


-- ----- goicuontomthitthanhbinh (5 reviews, avg 4.40 sao) -----
SET @buyer_id_90165 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90165 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90164', @buyer_id_90165, @store_id_90165, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-23 00:00:00', '2026-01-23 00:00:00');
SET @order_id_90165 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90165, @buyer_id_90165, @store_id_90165, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-01-23 00:00:00');

SET @buyer_id_90166 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90166 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90165', @buyer_id_90166, @store_id_90166, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-05-10 00:00:00', '2026-05-10 00:00:00');
SET @order_id_90166 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90166, @buyer_id_90166, @store_id_90166, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-05-10 00:00:00');

SET @buyer_id_90167 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90167 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90166', @buyer_id_90167, @store_id_90167, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-11-29 00:00:00', '2025-11-29 00:00:00');
SET @order_id_90167 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90167, @buyer_id_90167, @store_id_90167, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2025-11-29 00:00:00');

SET @buyer_id_90168 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90168 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90167', @buyer_id_90168, @store_id_90168, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-11-26 00:00:00', '2025-11-26 00:00:00');
SET @order_id_90168 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90168, @buyer_id_90168, @store_id_90168, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2025-11-26 00:00:00');

SET @buyer_id_90169 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90169 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'goicuontomthitthanhbinh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90168', @buyer_id_90169, @store_id_90169, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-02-22 00:00:00', '2026-02-22 00:00:00');
SET @order_id_90169 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90169, @buyer_id_90169, @store_id_90169, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-02-22 00:00:00');


-- ----- laudebinhdinhhuongque (6 reviews, avg 4.50 sao) -----
SET @buyer_id_90170 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90170 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90169', @buyer_id_90170, @store_id_90170, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-19 00:00:00', '2026-03-19 00:00:00');
SET @order_id_90170 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90170, @buyer_id_90170, @store_id_90170, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-19 00:00:00');

SET @buyer_id_90171 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90171 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90170', @buyer_id_90171, @store_id_90171, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-03-25 00:00:00', '2026-03-25 00:00:00');
SET @order_id_90171 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90171, @buyer_id_90171, @store_id_90171, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-03-25 00:00:00');

SET @buyer_id_90172 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90172 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90171', @buyer_id_90172, @store_id_90172, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-27 00:00:00', '2026-04-27 00:00:00');
SET @order_id_90172 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90172, @buyer_id_90172, @store_id_90172, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-27 00:00:00');

SET @buyer_id_90173 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90173 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90172', @buyer_id_90173, @store_id_90173, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-21 00:00:00', '2026-04-21 00:00:00');
SET @order_id_90173 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90173, @buyer_id_90173, @store_id_90173, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-04-21 00:00:00');

SET @buyer_id_90174 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90174 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90173', @buyer_id_90174, @store_id_90174, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-25 00:00:00', '2026-03-25 00:00:00');
SET @order_id_90174 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90174, @buyer_id_90174, @store_id_90174, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-03-25 00:00:00');

SET @buyer_id_90175 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90175 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'laudebinhdinhhuongque' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90174', @buyer_id_90175, @store_id_90175, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-25 00:00:00', '2025-12-25 00:00:00');
SET @order_id_90175 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90175, @buyer_id_90175, @store_id_90175, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-25 00:00:00');


-- ----- banhcuonthanhtribahuong (5 reviews, avg 3.60 sao) -----
SET @buyer_id_90176 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90176 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90175', @buyer_id_90176, @store_id_90176, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-01 00:00:00', '2026-02-01 00:00:00');
SET @order_id_90176 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90176, @buyer_id_90176, @store_id_90176, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-02-01 00:00:00');

SET @buyer_id_90177 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90177 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90176', @buyer_id_90177, @store_id_90177, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-13 00:00:00', '2026-01-13 00:00:00');
SET @order_id_90177 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90177, @buyer_id_90177, @store_id_90177, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-01-13 00:00:00');

SET @buyer_id_90178 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90178 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90177', @buyer_id_90178, @store_id_90178, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-05-01 00:00:00', '2026-05-01 00:00:00');
SET @order_id_90178 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90178, @buyer_id_90178, @store_id_90178, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-05-01 00:00:00');

SET @buyer_id_90179 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90179 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90178', @buyer_id_90179, @store_id_90179, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-20 00:00:00', '2026-01-20 00:00:00');
SET @order_id_90179 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90179, @buyer_id_90179, @store_id_90179, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-01-20 00:00:00');

SET @buyer_id_90180 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90180 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuonthanhtribahuong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90179', @buyer_id_90180, @store_id_90180, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-18 00:00:00', '2026-01-18 00:00:00');
SET @order_id_90180 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90180, @buyer_id_90180, @store_id_90180, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-01-18 00:00:00');


-- ----- nuoceptraicaytuoithanhxuan (6 reviews, avg 4.17 sao) -----
SET @buyer_id_90181 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90181 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90180', @buyer_id_90181, @store_id_90181, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-02-09 00:00:00', '2026-02-09 00:00:00');
SET @order_id_90181 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90181, @buyer_id_90181, @store_id_90181, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-02-09 00:00:00');

SET @buyer_id_90182 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90182 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90181', @buyer_id_90182, @store_id_90182, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-05 00:00:00', '2026-03-05 00:00:00');
SET @order_id_90182 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90182, @buyer_id_90182, @store_id_90182, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-03-05 00:00:00');

SET @buyer_id_90183 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90183 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90182', @buyer_id_90183, @store_id_90183, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-11 00:00:00', '2026-02-11 00:00:00');
SET @order_id_90183 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90183, @buyer_id_90183, @store_id_90183, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-02-11 00:00:00');

SET @buyer_id_90184 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90184 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90183', @buyer_id_90184, @store_id_90184, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-27 00:00:00', '2025-12-27 00:00:00');
SET @order_id_90184 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90184, @buyer_id_90184, @store_id_90184, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-27 00:00:00');

SET @buyer_id_90185 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90185 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90184', @buyer_id_90185, @store_id_90185, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-29 00:00:00', '2026-04-29 00:00:00');
SET @order_id_90185 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90185, @buyer_id_90185, @store_id_90185, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-04-29 00:00:00');

SET @buyer_id_90186 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90186 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nuoceptraicaytuoithanhxuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90185', @buyer_id_90186, @store_id_90186, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-01-21 00:00:00', '2026-01-21 00:00:00');
SET @order_id_90186 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90186, @buyer_id_90186, @store_id_90186, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-01-21 00:00:00');


-- ----- bunbohuemethuan (5 reviews, avg 4.40 sao) -----
SET @buyer_id_90187 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90187 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbohuemethuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90186', @buyer_id_90187, @store_id_90187, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-18 00:00:00', '2026-04-18 00:00:00');
SET @order_id_90187 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90187, @buyer_id_90187, @store_id_90187, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-18 00:00:00');

SET @buyer_id_90188 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90188 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbohuemethuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90187', @buyer_id_90188, @store_id_90188, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-01 00:00:00', '2026-02-01 00:00:00');
SET @order_id_90188 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90188, @buyer_id_90188, @store_id_90188, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-02-01 00:00:00');

SET @buyer_id_90189 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90189 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbohuemethuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90188', @buyer_id_90189, @store_id_90189, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-05-10 00:00:00', '2026-05-10 00:00:00');
SET @order_id_90189 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90189, @buyer_id_90189, @store_id_90189, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-05-10 00:00:00');

SET @buyer_id_90190 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90190 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbohuemethuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90189', @buyer_id_90190, @store_id_90190, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-30 00:00:00', '2026-04-30 00:00:00');
SET @order_id_90190 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90190, @buyer_id_90190, @store_id_90190, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-04-30 00:00:00');

SET @buyer_id_90191 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90191 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbohuemethuan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90190', @buyer_id_90191, @store_id_90191, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-22 00:00:00', '2025-11-22 00:00:00');
SET @order_id_90191 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90191, @buyer_id_90191, @store_id_90191, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-11-22 00:00:00');


-- ----- kemocquethomlungdanang (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90192 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90192 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90191', @buyer_id_90192, @store_id_90192, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-19 00:00:00', '2026-04-19 00:00:00');
SET @order_id_90192 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90192, @buyer_id_90192, @store_id_90192, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-04-19 00:00:00');

SET @buyer_id_90193 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90193 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90192', @buyer_id_90193, @store_id_90193, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-01-16 00:00:00', '2026-01-16 00:00:00');
SET @order_id_90193 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90193, @buyer_id_90193, @store_id_90193, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-01-16 00:00:00');

SET @buyer_id_90194 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90194 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90193', @buyer_id_90194, @store_id_90194, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-05-12 00:00:00', '2026-05-12 00:00:00');
SET @order_id_90194 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90194, @buyer_id_90194, @store_id_90194, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-05-12 00:00:00');

SET @buyer_id_90195 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90195 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'kemocquethomlungdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90194', @buyer_id_90195, @store_id_90195, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-02 00:00:00', '2025-12-02 00:00:00');
SET @order_id_90195 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90195, @buyer_id_90195, @store_id_90195, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-02 00:00:00');


-- ----- vitquaymovangdanang (5 reviews, avg 4.40 sao) -----
SET @buyer_id_90196 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90196 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90195', @buyer_id_90196, @store_id_90196, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-12-20 00:00:00', '2025-12-20 00:00:00');
SET @order_id_90196 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90196, @buyer_id_90196, @store_id_90196, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-12-20 00:00:00');

SET @buyer_id_90197 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90197 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90196', @buyer_id_90197, @store_id_90197, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-29 00:00:00', '2026-01-29 00:00:00');
SET @order_id_90197 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90197, @buyer_id_90197, @store_id_90197, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-01-29 00:00:00');

SET @buyer_id_90198 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90198 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90197', @buyer_id_90198, @store_id_90198, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-23 00:00:00', '2026-01-23 00:00:00');
SET @order_id_90198 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90198, @buyer_id_90198, @store_id_90198, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-01-23 00:00:00');

SET @buyer_id_90199 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90199 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90198', @buyer_id_90199, @store_id_90199, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-28 00:00:00', '2026-03-28 00:00:00');
SET @order_id_90199 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90199, @buyer_id_90199, @store_id_90199, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-28 00:00:00');

SET @buyer_id_90200 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90200 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vitquaymovangdanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90199', @buyer_id_90200, @store_id_90200, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-01 00:00:00', '2026-04-01 00:00:00');
SET @order_id_90200 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90200, @buyer_id_90200, @store_id_90200, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-04-01 00:00:00');


-- ----- quantrungnuonghoianpho (4 reviews, avg 3.50 sao) -----
SET @buyer_id_90201 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90201 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90200', @buyer_id_90201, @store_id_90201, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-01-27 00:00:00', '2026-01-27 00:00:00');
SET @order_id_90201 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90201, @buyer_id_90201, @store_id_90201, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-01-27 00:00:00');

SET @buyer_id_90202 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90202 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90201', @buyer_id_90202, @store_id_90202, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-29 00:00:00', '2026-03-29 00:00:00');
SET @order_id_90202 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90202, @buyer_id_90202, @store_id_90202, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-03-29 00:00:00');

SET @buyer_id_90203 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90203 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90202', @buyer_id_90203, @store_id_90203, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-02-03 00:00:00', '2026-02-03 00:00:00');
SET @order_id_90203 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90203, @buyer_id_90203, @store_id_90203, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-02-03 00:00:00');

SET @buyer_id_90204 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90204 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'quantrungnuonghoianpho' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90203', @buyer_id_90204, @store_id_90204, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-05-03 00:00:00', '2026-05-03 00:00:00');
SET @order_id_90204 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90204, @buyer_id_90204, @store_id_90204, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-05-03 00:00:00');


-- ----- phoxaohaisanbiendong (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90205 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90205 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90204', @buyer_id_90205, @store_id_90205, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-18 00:00:00', '2026-04-18 00:00:00');
SET @order_id_90205 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90205, @buyer_id_90205, @store_id_90205, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-04-18 00:00:00');

SET @buyer_id_90206 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90206 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90205', @buyer_id_90206, @store_id_90206, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-02 00:00:00', '2025-12-02 00:00:00');
SET @order_id_90206 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90206, @buyer_id_90206, @store_id_90206, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-02 00:00:00');

SET @buyer_id_90207 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90207 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90206', @buyer_id_90207, @store_id_90207, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-30 00:00:00', '2026-01-30 00:00:00');
SET @order_id_90207 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90207, @buyer_id_90207, @store_id_90207, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-01-30 00:00:00');

SET @buyer_id_90208 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90208 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaohaisanbiendong' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90207', @buyer_id_90208, @store_id_90208, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-31 00:00:00', '2025-12-31 00:00:00');
SET @order_id_90208 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90208, @buyer_id_90208, @store_id_90208, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-31 00:00:00');


-- ----- banhtrangnuongbaut (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90209 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90209 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90208', @buyer_id_90209, @store_id_90209, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-12-19 00:00:00', '2025-12-19 00:00:00');
SET @order_id_90209 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90209, @buyer_id_90209, @store_id_90209, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-12-19 00:00:00');

SET @buyer_id_90210 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90210 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90209', @buyer_id_90210, @store_id_90210, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-23 00:00:00', '2025-12-23 00:00:00');
SET @order_id_90210 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90210, @buyer_id_90210, @store_id_90210, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-12-23 00:00:00');

SET @buyer_id_90211 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90211 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90210', @buyer_id_90211, @store_id_90211, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-03-26 00:00:00', '2026-03-26 00:00:00');
SET @order_id_90211 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90211, @buyer_id_90211, @store_id_90211, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-03-26 00:00:00');

SET @buyer_id_90212 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90212 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtrangnuongbaut' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90211', @buyer_id_90212, @store_id_90212, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-11-29 00:00:00', '2025-11-29 00:00:00');
SET @order_id_90212 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90212, @buyer_id_90212, @store_id_90212, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-11-29 00:00:00');


-- ----- cacomkhonghecotu (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90213 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90213 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90212', @buyer_id_90213, @store_id_90213, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-13 00:00:00', '2026-04-13 00:00:00');
SET @order_id_90213 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90213, @buyer_id_90213, @store_id_90213, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-04-13 00:00:00');

SET @buyer_id_90214 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90214 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90213', @buyer_id_90214, @store_id_90214, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-18 00:00:00', '2026-04-18 00:00:00');
SET @order_id_90214 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90214, @buyer_id_90214, @store_id_90214, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-04-18 00:00:00');

SET @buyer_id_90215 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90215 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90214', @buyer_id_90215, @store_id_90215, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-03-27 00:00:00', '2026-03-27 00:00:00');
SET @order_id_90215 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90215, @buyer_id_90215, @store_id_90215, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-03-27 00:00:00');

SET @buyer_id_90216 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90216 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90215', @buyer_id_90216, @store_id_90216, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-02-16 00:00:00', '2026-02-16 00:00:00');
SET @order_id_90216 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90216, @buyer_id_90216, @store_id_90216, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-02-16 00:00:00');

SET @buyer_id_90217 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90217 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'cacomkhonghecotu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90216', @buyer_id_90217, @store_id_90217, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-17 00:00:00', '2026-03-17 00:00:00');
SET @order_id_90217 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90217, @buyer_id_90217, @store_id_90217, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-03-17 00:00:00');


-- ----- bunmamconammientay (6 reviews, avg 4.50 sao) -----
SET @buyer_id_90218 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90218 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90217', @buyer_id_90218, @store_id_90218, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-04-26 00:00:00', '2026-04-26 00:00:00');
SET @order_id_90218 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90218, @buyer_id_90218, @store_id_90218, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-04-26 00:00:00');

SET @buyer_id_90219 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90219 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90218', @buyer_id_90219, @store_id_90219, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-08 00:00:00', '2026-04-08 00:00:00');
SET @order_id_90219 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90219, @buyer_id_90219, @store_id_90219, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-04-08 00:00:00');

SET @buyer_id_90220 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90220 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90219', @buyer_id_90220, @store_id_90220, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-11-25 00:00:00', '2025-11-25 00:00:00');
SET @order_id_90220 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90220, @buyer_id_90220, @store_id_90220, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2025-11-25 00:00:00');

SET @buyer_id_90221 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90221 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90220', @buyer_id_90221, @store_id_90221, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-01-07 00:00:00', '2026-01-07 00:00:00');
SET @order_id_90221 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90221, @buyer_id_90221, @store_id_90221, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-01-07 00:00:00');

SET @buyer_id_90222 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90222 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90221', @buyer_id_90222, @store_id_90222, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-03-01 00:00:00', '2026-03-01 00:00:00');
SET @order_id_90222 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90222, @buyer_id_90222, @store_id_90222, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-03-01 00:00:00');

SET @buyer_id_90223 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90223 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunmamconammientay' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90222', @buyer_id_90223, @store_id_90223, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-03-09 00:00:00', '2026-03-09 00:00:00');
SET @order_id_90223 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90223, @buyer_id_90223, @store_id_90223, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-03-09 00:00:00');


-- ----- ganuongmatongphonglan (5 reviews, avg 4.40 sao) -----
SET @buyer_id_90224 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90224 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90223', @buyer_id_90224, @store_id_90224, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-04-06 00:00:00', '2026-04-06 00:00:00');
SET @order_id_90224 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90224, @buyer_id_90224, @store_id_90224, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-04-06 00:00:00');

SET @buyer_id_90225 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90225 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90224', @buyer_id_90225, @store_id_90225, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-12-15 00:00:00', '2025-12-15 00:00:00');
SET @order_id_90225 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90225, @buyer_id_90225, @store_id_90225, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2025-12-15 00:00:00');

SET @buyer_id_90226 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90226 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90225', @buyer_id_90226, @store_id_90226, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-03-22 00:00:00', '2026-03-22 00:00:00');
SET @order_id_90226 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90226, @buyer_id_90226, @store_id_90226, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-22 00:00:00');

SET @buyer_id_90227 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90227 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90226', @buyer_id_90227, @store_id_90227, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-05-13 00:00:00', '2026-05-13 00:00:00');
SET @order_id_90227 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90227, @buyer_id_90227, @store_id_90227, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-05-13 00:00:00');

SET @buyer_id_90228 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90228 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ganuongmatongphonglan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90227', @buyer_id_90228, @store_id_90228, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-15 00:00:00', '2026-03-15 00:00:00');
SET @order_id_90228 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90228, @buyer_id_90228, @store_id_90228, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-15 00:00:00');


-- ----- tomchuanemchuabanohue (6 reviews, avg 4.33 sao) -----
SET @buyer_id_90229 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90229 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90228', @buyer_id_90229, @store_id_90229, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-02-26 00:00:00', '2026-02-26 00:00:00');
SET @order_id_90229 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90229, @buyer_id_90229, @store_id_90229, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-02-26 00:00:00');

SET @buyer_id_90230 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90230 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90229', @buyer_id_90230, @store_id_90230, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-12-07 00:00:00', '2025-12-07 00:00:00');
SET @order_id_90230 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90230, @buyer_id_90230, @store_id_90230, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-12-07 00:00:00');

SET @buyer_id_90231 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90231 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90230', @buyer_id_90231, @store_id_90231, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-17 00:00:00', '2026-01-17 00:00:00');
SET @order_id_90231 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90231, @buyer_id_90231, @store_id_90231, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-01-17 00:00:00');

SET @buyer_id_90232 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90232 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90231', @buyer_id_90232, @store_id_90232, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-05-15 00:00:00', '2026-05-15 00:00:00');
SET @order_id_90232 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90232, @buyer_id_90232, @store_id_90232, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-05-15 00:00:00');

SET @buyer_id_90233 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90233 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90232', @buyer_id_90233, @store_id_90233, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-11-23 00:00:00', '2025-11-23 00:00:00');
SET @order_id_90233 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90233, @buyer_id_90233, @store_id_90233, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2025-11-23 00:00:00');

SET @buyer_id_90234 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90234 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tomchuanemchuabanohue' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90233', @buyer_id_90234, @store_id_90234, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-14 00:00:00', '2026-01-14 00:00:00');
SET @order_id_90234 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90234, @buyer_id_90234, @store_id_90234, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-14 00:00:00');


-- ----- caphetrunghanoigiuadanang (4 reviews, avg 5.00 sao) -----
SET @buyer_id_90235 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90235 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90234', @buyer_id_90235, @store_id_90235, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-01-04 00:00:00', '2026-01-04 00:00:00');
SET @order_id_90235 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90235, @buyer_id_90235, @store_id_90235, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-01-04 00:00:00');

SET @buyer_id_90236 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90236 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90235', @buyer_id_90236, @store_id_90236, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-06 00:00:00', '2026-02-06 00:00:00');
SET @order_id_90236 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90236, @buyer_id_90236, @store_id_90236, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-02-06 00:00:00');

SET @buyer_id_90237 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90237 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90236', @buyer_id_90237, @store_id_90237, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-21 00:00:00', '2026-01-21 00:00:00');
SET @order_id_90237 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90237, @buyer_id_90237, @store_id_90237, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-01-21 00:00:00');

SET @buyer_id_90238 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90238 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphetrunghanoigiuadanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90237', @buyer_id_90238, @store_id_90238, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-03-01 00:00:00', '2026-03-01 00:00:00');
SET @order_id_90238 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90238, @buyer_id_90238, @store_id_90238, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-03-01 00:00:00');


-- ----- bunthaiboviensaigon (4 reviews, avg 4.25 sao) -----
SET @buyer_id_90239 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90239 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90238', @buyer_id_90239, @store_id_90239, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-05-09 00:00:00', '2026-05-09 00:00:00');
SET @order_id_90239 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90239, @buyer_id_90239, @store_id_90239, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-05-09 00:00:00');

SET @buyer_id_90240 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90240 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90239', @buyer_id_90240, @store_id_90240, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-20 00:00:00', '2026-03-20 00:00:00');
SET @order_id_90240 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90240, @buyer_id_90240, @store_id_90240, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-20 00:00:00');

SET @buyer_id_90241 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90241 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90240', @buyer_id_90241, @store_id_90241, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-26 00:00:00', '2026-01-26 00:00:00');
SET @order_id_90241 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90241, @buyer_id_90241, @store_id_90241, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-01-26 00:00:00');

SET @buyer_id_90242 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90242 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthaiboviensaigon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90241', @buyer_id_90242, @store_id_90242, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-04-15 00:00:00', '2026-04-15 00:00:00');
SET @order_id_90242 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90242, @buyer_id_90242, @store_id_90242, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-04-15 00:00:00');


-- ----- miquangnammientrung (6 reviews, avg 4.83 sao) -----
SET @buyer_id_90243 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90243 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90242', @buyer_id_90243, @store_id_90243, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-15 00:00:00', '2026-01-15 00:00:00');
SET @order_id_90243 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90243, @buyer_id_90243, @store_id_90243, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-01-15 00:00:00');

SET @buyer_id_90244 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90244 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90243', @buyer_id_90244, @store_id_90244, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-11-27 00:00:00', '2025-11-27 00:00:00');
SET @order_id_90244 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90244, @buyer_id_90244, @store_id_90244, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2025-11-27 00:00:00');

SET @buyer_id_90245 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90245 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90244', @buyer_id_90245, @store_id_90245, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-21 00:00:00', '2026-01-21 00:00:00');
SET @order_id_90245 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90245, @buyer_id_90245, @store_id_90245, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-01-21 00:00:00');

SET @buyer_id_90246 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90246 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90245', @buyer_id_90246, @store_id_90246, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-30 00:00:00', '2026-04-30 00:00:00');
SET @order_id_90246 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90246, @buyer_id_90246, @store_id_90246, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-04-30 00:00:00');

SET @buyer_id_90247 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90247 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90246', @buyer_id_90247, @store_id_90247, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-03 00:00:00', '2025-12-03 00:00:00');
SET @order_id_90247 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90247, @buyer_id_90247, @store_id_90247, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-12-03 00:00:00');

SET @buyer_id_90248 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90248 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangnammientrung' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90247', @buyer_id_90248, @store_id_90248, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-03-01 00:00:00', '2026-03-01 00:00:00');
SET @order_id_90248 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90248, @buyer_id_90248, @store_id_90248, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-03-01 00:00:00');


-- ----- banhmiphuonghoiandanang (5 reviews, avg 4.80 sao) -----
SET @buyer_id_90249 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90249 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90248', @buyer_id_90249, @store_id_90249, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-12 00:00:00', '2026-02-12 00:00:00');
SET @order_id_90249 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90249, @buyer_id_90249, @store_id_90249, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-02-12 00:00:00');

SET @buyer_id_90250 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90250 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90249', @buyer_id_90250, @store_id_90250, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-02-24 00:00:00', '2026-02-24 00:00:00');
SET @order_id_90250 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90250, @buyer_id_90250, @store_id_90250, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-02-24 00:00:00');

SET @buyer_id_90251 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90251 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90250', @buyer_id_90251, @store_id_90251, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-31 00:00:00', '2026-01-31 00:00:00');
SET @order_id_90251 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90251, @buyer_id_90251, @store_id_90251, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-01-31 00:00:00');

SET @buyer_id_90252 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90252 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90251', @buyer_id_90252, @store_id_90252, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-26 00:00:00', '2025-12-26 00:00:00');
SET @order_id_90252 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90252, @buyer_id_90252, @store_id_90252, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-26 00:00:00');

SET @buyer_id_90253 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90253 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiphuonghoiandanang' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90252', @buyer_id_90253, @store_id_90253, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-05-16 00:00:00', '2026-05-16 00:00:00');
SET @order_id_90253 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90253, @buyer_id_90253, @store_id_90253, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-05-16 00:00:00');


-- ----- lauhaisansontraseaside (5 reviews, avg 4.20 sao) -----
SET @buyer_id_90254 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90254 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90253', @buyer_id_90254, @store_id_90254, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-31 00:00:00', '2025-12-31 00:00:00');
SET @order_id_90254 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90254, @buyer_id_90254, @store_id_90254, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2025-12-31 00:00:00');

SET @buyer_id_90255 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90255 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90254', @buyer_id_90255, @store_id_90255, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-03-25 00:00:00', '2026-03-25 00:00:00');
SET @order_id_90255 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90255, @buyer_id_90255, @store_id_90255, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-25 00:00:00');

SET @buyer_id_90256 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90256 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90255', @buyer_id_90256, @store_id_90256, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-12-04 00:00:00', '2025-12-04 00:00:00');
SET @order_id_90256 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90256, @buyer_id_90256, @store_id_90256, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-12-04 00:00:00');

SET @buyer_id_90257 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90257 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90256', @buyer_id_90257, @store_id_90257, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-21 00:00:00', '2025-12-21 00:00:00');
SET @order_id_90257 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90257, @buyer_id_90257, @store_id_90257, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-21 00:00:00');

SET @buyer_id_90258 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90258 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lauhaisansontraseaside' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90257', @buyer_id_90258, @store_id_90258, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90258 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90258, @buyer_id_90258, @store_id_90258, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');


-- ----- bepmemientrungquanngon (5 reviews, avg 4.20 sao) -----
SET @buyer_id_90259 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90259 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90258', @buyer_id_90259, @store_id_90259, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-24 00:00:00', '2026-01-24 00:00:00');
SET @order_id_90259 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90259, @buyer_id_90259, @store_id_90259, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-24 00:00:00');

SET @buyer_id_90260 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90260 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90259', @buyer_id_90260, @store_id_90260, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-11-18 00:00:00', '2025-11-18 00:00:00');
SET @order_id_90260 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90260, @buyer_id_90260, @store_id_90260, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-11-18 00:00:00');

SET @buyer_id_90261 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90261 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90260', @buyer_id_90261, @store_id_90261, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-18 00:00:00', '2025-12-18 00:00:00');
SET @order_id_90261 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90261, @buyer_id_90261, @store_id_90261, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2025-12-18 00:00:00');

SET @buyer_id_90262 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90262 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90261', @buyer_id_90262, @store_id_90262, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-14 00:00:00', '2026-04-14 00:00:00');
SET @order_id_90262 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90262, @buyer_id_90262, @store_id_90262, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-04-14 00:00:00');

SET @buyer_id_90263 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90263 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bepmemientrungquanngon' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90262', @buyer_id_90263, @store_id_90263, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-12-27 00:00:00', '2025-12-27 00:00:00');
SET @order_id_90263 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90263, @buyer_id_90263, @store_id_90263, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-12-27 00:00:00');


-- ----- banhmichilanhoakhanh (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90264 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90264 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90263', @buyer_id_90264, @store_id_90264, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-05-15 00:00:00', '2026-05-15 00:00:00');
SET @order_id_90264 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90264, @buyer_id_90264, @store_id_90264, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-05-15 00:00:00');

SET @buyer_id_90265 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90265 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90264', @buyer_id_90265, @store_id_90265, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-22 00:00:00', '2025-12-22 00:00:00');
SET @order_id_90265 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90265, @buyer_id_90265, @store_id_90265, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-22 00:00:00');

SET @buyer_id_90266 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90266 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90265', @buyer_id_90266, @store_id_90266, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-07 00:00:00', '2026-04-07 00:00:00');
SET @order_id_90266 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90266, @buyer_id_90266, @store_id_90266, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-07 00:00:00');

SET @buyer_id_90267 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90267 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90266', @buyer_id_90267, @store_id_90267, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90267 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90267, @buyer_id_90267, @store_id_90267, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');

SET @buyer_id_90268 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90268 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90267', @buyer_id_90268, @store_id_90268, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-02-20 00:00:00', '2026-02-20 00:00:00');
SET @order_id_90268 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90268, @buyer_id_90268, @store_id_90268, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-02-20 00:00:00');

SET @buyer_id_90269 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90269 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmichilanhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90268', @buyer_id_90269, @store_id_90269, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-05-14 00:00:00', '2026-05-14 00:00:00');
SET @order_id_90269 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90269, @buyer_id_90269, @store_id_90269, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-05-14 00:00:00');


-- ----- bunbomehoahoakhanh (5 reviews, avg 4.00 sao) -----
SET @buyer_id_90270 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90270 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90269', @buyer_id_90270, @store_id_90270, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-19 00:00:00', '2026-03-19 00:00:00');
SET @order_id_90270 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90270, @buyer_id_90270, @store_id_90270, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-19 00:00:00');

SET @buyer_id_90271 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90271 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90270', @buyer_id_90271, @store_id_90271, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-15 00:00:00', '2026-04-15 00:00:00');
SET @order_id_90271 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90271, @buyer_id_90271, @store_id_90271, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-04-15 00:00:00');

SET @buyer_id_90272 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90272 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90271', @buyer_id_90272, @store_id_90272, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-10 00:00:00', '2026-01-10 00:00:00');
SET @order_id_90272 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90272, @buyer_id_90272, @store_id_90272, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-01-10 00:00:00');

SET @buyer_id_90273 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90273 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90272', @buyer_id_90273, @store_id_90273, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-29 00:00:00', '2026-01-29 00:00:00');
SET @order_id_90273 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90273, @buyer_id_90273, @store_id_90273, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-29 00:00:00');

SET @buyer_id_90274 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90274 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbomehoahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90273', @buyer_id_90274, @store_id_90274, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-12-26 00:00:00', '2025-12-26 00:00:00');
SET @order_id_90274 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90274, @buyer_id_90274, @store_id_90274, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-26 00:00:00');


-- ----- phogabahoalienchieu (5 reviews, avg 4.80 sao) -----
SET @buyer_id_90275 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90275 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90274', @buyer_id_90275, @store_id_90275, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-01-18 00:00:00', '2026-01-18 00:00:00');
SET @order_id_90275 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90275, @buyer_id_90275, @store_id_90275, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-01-18 00:00:00');

SET @buyer_id_90276 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90276 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90275', @buyer_id_90276, @store_id_90276, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-26 00:00:00', '2026-03-26 00:00:00');
SET @order_id_90276 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90276, @buyer_id_90276, @store_id_90276, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-26 00:00:00');

SET @buyer_id_90277 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90277 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90276', @buyer_id_90277, @store_id_90277, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-04-30 00:00:00', '2026-04-30 00:00:00');
SET @order_id_90277 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90277, @buyer_id_90277, @store_id_90277, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-04-30 00:00:00');

SET @buyer_id_90278 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90278 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90277', @buyer_id_90278, @store_id_90278, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-30 00:00:00', '2026-04-30 00:00:00');
SET @order_id_90278 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90278, @buyer_id_90278, @store_id_90278, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-04-30 00:00:00');

SET @buyer_id_90279 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90279 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phogabahoalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90278', @buyer_id_90279, @store_id_90279, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-08 00:00:00', '2026-04-08 00:00:00');
SET @order_id_90279 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90279, @buyer_id_90279, @store_id_90279, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-04-08 00:00:00');


-- ----- banhcuoncothanhhoakhanh (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90280 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90280 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90279', @buyer_id_90280, @store_id_90280, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-06 00:00:00', '2025-12-06 00:00:00');
SET @order_id_90280 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90280, @buyer_id_90280, @store_id_90280, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-06 00:00:00');

SET @buyer_id_90281 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90281 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90280', @buyer_id_90281, @store_id_90281, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-16 00:00:00', '2026-01-16 00:00:00');
SET @order_id_90281 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90281, @buyer_id_90281, @store_id_90281, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-01-16 00:00:00');

SET @buyer_id_90282 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90282 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90281', @buyer_id_90282, @store_id_90282, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-10 00:00:00', '2026-04-10 00:00:00');
SET @order_id_90282 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90282, @buyer_id_90282, @store_id_90282, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-10 00:00:00');

SET @buyer_id_90283 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90283 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90282', @buyer_id_90283, @store_id_90283, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-30 00:00:00', '2025-12-30 00:00:00');
SET @order_id_90283 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90283, @buyer_id_90283, @store_id_90283, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-30 00:00:00');

SET @buyer_id_90284 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90284 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90283', @buyer_id_90284, @store_id_90284, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-05-04 00:00:00', '2026-05-04 00:00:00');
SET @order_id_90284 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90284, @buyer_id_90284, @store_id_90284, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-05-04 00:00:00');

SET @buyer_id_90285 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90285 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcuoncothanhhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90284', @buyer_id_90285, @store_id_90285, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-01-12 00:00:00', '2026-01-12 00:00:00');
SET @order_id_90285 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90285, @buyer_id_90285, @store_id_90285, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-01-12 00:00:00');


-- ----- xoisangcongahoakhanh (4 reviews, avg 3.75 sao) -----
SET @buyer_id_90286 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90286 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90285', @buyer_id_90286, @store_id_90286, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-05-14 00:00:00', '2026-05-14 00:00:00');
SET @order_id_90286 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90286, @buyer_id_90286, @store_id_90286, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-05-14 00:00:00');

SET @buyer_id_90287 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90287 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90286', @buyer_id_90287, @store_id_90287, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-04 00:00:00', '2026-04-04 00:00:00');
SET @order_id_90287 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90287, @buyer_id_90287, @store_id_90287, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-04 00:00:00');

SET @buyer_id_90288 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90288 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90287', @buyer_id_90288, @store_id_90288, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-04-08 00:00:00', '2026-04-08 00:00:00');
SET @order_id_90288 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90288, @buyer_id_90288, @store_id_90288, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-04-08 00:00:00');

SET @buyer_id_90289 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90289 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoisangcongahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90288', @buyer_id_90289, @store_id_90289, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-15 00:00:00', '2025-12-15 00:00:00');
SET @order_id_90289 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90289, @buyer_id_90289, @store_id_90289, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2025-12-15 00:00:00');


-- ----- chaotrangbatulienchieu (5 reviews, avg 4.00 sao) -----
SET @buyer_id_90290 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90290 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90289', @buyer_id_90290, @store_id_90290, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-04-13 00:00:00', '2026-04-13 00:00:00');
SET @order_id_90290 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90290, @buyer_id_90290, @store_id_90290, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-04-13 00:00:00');

SET @buyer_id_90291 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90291 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90290', @buyer_id_90291, @store_id_90291, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-15 00:00:00', '2026-04-15 00:00:00');
SET @order_id_90291 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90291, @buyer_id_90291, @store_id_90291, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-04-15 00:00:00');

SET @buyer_id_90292 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90292 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90291', @buyer_id_90292, @store_id_90292, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2025-12-19 00:00:00', '2025-12-19 00:00:00');
SET @order_id_90292 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90292, @buyer_id_90292, @store_id_90292, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-12-19 00:00:00');

SET @buyer_id_90293 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90293 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90292', @buyer_id_90293, @store_id_90293, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-01-25 00:00:00', '2026-01-25 00:00:00');
SET @order_id_90293 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90293, @buyer_id_90293, @store_id_90293, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-01-25 00:00:00');

SET @buyer_id_90294 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90294 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaotrangbatulienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90293', @buyer_id_90294, @store_id_90294, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-22 00:00:00', '2025-12-22 00:00:00');
SET @order_id_90294 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90294, @buyer_id_90294, @store_id_90294, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-22 00:00:00');


-- ----- myquangcotamhoakhanh (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90295 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90295 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90294', @buyer_id_90295, @store_id_90295, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-01-07 00:00:00', '2026-01-07 00:00:00');
SET @order_id_90295 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90295, @buyer_id_90295, @store_id_90295, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-01-07 00:00:00');

SET @buyer_id_90296 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90296 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90295', @buyer_id_90296, @store_id_90296, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-11-23 00:00:00', '2025-11-23 00:00:00');
SET @order_id_90296 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90296, @buyer_id_90296, @store_id_90296, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-11-23 00:00:00');

SET @buyer_id_90297 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90297 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90296', @buyer_id_90297, @store_id_90297, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-22 00:00:00', '2026-03-22 00:00:00');
SET @order_id_90297 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90297, @buyer_id_90297, @store_id_90297, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-22 00:00:00');

SET @buyer_id_90298 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90298 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90297', @buyer_id_90298, @store_id_90298, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-29 00:00:00', '2025-12-29 00:00:00');
SET @order_id_90298 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90298, @buyer_id_90298, @store_id_90298, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2025-12-29 00:00:00');

SET @buyer_id_90299 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90299 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'myquangcotamhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90298', @buyer_id_90299, @store_id_90299, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-12 00:00:00', '2026-04-12 00:00:00');
SET @order_id_90299 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90299, @buyer_id_90299, @store_id_90299, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-12 00:00:00');


-- ----- bunrieuconamlienchieu (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90300 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90300 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90299', @buyer_id_90300, @store_id_90300, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-18 00:00:00', '2025-11-18 00:00:00');
SET @order_id_90300 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90300, @buyer_id_90300, @store_id_90300, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2025-11-18 00:00:00');

SET @buyer_id_90301 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90301 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90300', @buyer_id_90301, @store_id_90301, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2025-11-22 00:00:00', '2025-11-22 00:00:00');
SET @order_id_90301 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90301, @buyer_id_90301, @store_id_90301, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2025-11-22 00:00:00');

SET @buyer_id_90302 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90302 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90301', @buyer_id_90302, @store_id_90302, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-04-05 00:00:00', '2026-04-05 00:00:00');
SET @order_id_90302 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90302, @buyer_id_90302, @store_id_90302, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-04-05 00:00:00');

SET @buyer_id_90303 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90303 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunrieuconamlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90302', @buyer_id_90303, @store_id_90303, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-03-27 00:00:00', '2026-03-27 00:00:00');
SET @order_id_90303 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90303, @buyer_id_90303, @store_id_90303, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-27 00:00:00');


-- ----- banhbeochenbasauhoakhanh (4 reviews, avg 4.25 sao) -----
SET @buyer_id_90304 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90304 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90303', @buyer_id_90304, @store_id_90304, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-29 00:00:00', '2026-03-29 00:00:00');
SET @order_id_90304 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90304, @buyer_id_90304, @store_id_90304, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-03-29 00:00:00');

SET @buyer_id_90305 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90305 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90304', @buyer_id_90305, @store_id_90305, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-08 00:00:00', '2026-03-08 00:00:00');
SET @order_id_90305 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90305, @buyer_id_90305, @store_id_90305, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-03-08 00:00:00');

SET @buyer_id_90306 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90306 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90305', @buyer_id_90306, @store_id_90306, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-08 00:00:00', '2026-01-08 00:00:00');
SET @order_id_90306 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90306, @buyer_id_90306, @store_id_90306, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-01-08 00:00:00');

SET @buyer_id_90307 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90307 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhbeochenbasauhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90306', @buyer_id_90307, @store_id_90307, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-02-20 00:00:00', '2026-02-20 00:00:00');
SET @order_id_90307 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90307, @buyer_id_90307, @store_id_90307, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-02-20 00:00:00');


-- ----- hutieubokhosanghoakhanh (4 reviews, avg 4.75 sao) -----
SET @buyer_id_90308 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90308 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90307', @buyer_id_90308, @store_id_90308, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-05-07 00:00:00', '2026-05-07 00:00:00');
SET @order_id_90308 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90308, @buyer_id_90308, @store_id_90308, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-05-07 00:00:00');

SET @buyer_id_90309 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90309 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90308', @buyer_id_90309, @store_id_90309, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-21 00:00:00', '2026-04-21 00:00:00');
SET @order_id_90309 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90309, @buyer_id_90309, @store_id_90309, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-04-21 00:00:00');

SET @buyer_id_90310 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90310 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90309', @buyer_id_90310, @store_id_90310, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-11 00:00:00', '2026-01-11 00:00:00');
SET @order_id_90310 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90310, @buyer_id_90310, @store_id_90310, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-01-11 00:00:00');

SET @buyer_id_90311 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90311 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieubokhosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90310', @buyer_id_90311, @store_id_90311, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-04 00:00:00', '2026-03-04 00:00:00');
SET @order_id_90311 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90311, @buyer_id_90311, @store_id_90311, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-03-04 00:00:00');


-- ----- banhuotthitnuongcolien (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90312 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90312 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90311', @buyer_id_90312, @store_id_90312, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-12 00:00:00', '2026-01-12 00:00:00');
SET @order_id_90312 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90312, @buyer_id_90312, @store_id_90312, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-01-12 00:00:00');

SET @buyer_id_90313 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90313 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90312', @buyer_id_90313, @store_id_90313, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-10 00:00:00', '2026-04-10 00:00:00');
SET @order_id_90313 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90313, @buyer_id_90313, @store_id_90313, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-04-10 00:00:00');

SET @buyer_id_90314 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90314 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90313', @buyer_id_90314, @store_id_90314, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-03 00:00:00', '2026-02-03 00:00:00');
SET @order_id_90314 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90314, @buyer_id_90314, @store_id_90314, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-02-03 00:00:00');

SET @buyer_id_90315 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90315 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90314', @buyer_id_90315, @store_id_90315, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-05 00:00:00', '2026-02-05 00:00:00');
SET @order_id_90315 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90315, @buyer_id_90315, @store_id_90315, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-02-05 00:00:00');

SET @buyer_id_90316 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90316 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90315', @buyer_id_90316, @store_id_90316, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-01-30 00:00:00', '2026-01-30 00:00:00');
SET @order_id_90316 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90316, @buyer_id_90316, @store_id_90316, NULL, 4, 'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.', 0, FLOOR(RAND()*15), '2026-01-30 00:00:00');

SET @buyer_id_90317 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90317 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhuotthitnuongcolien' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90316', @buyer_id_90317, @store_id_90317, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-19 00:00:00', '2026-01-19 00:00:00');
SET @order_id_90317 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90317, @buyer_id_90317, @store_id_90317, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-01-19 00:00:00');


-- ----- phoboanhtuanlienchieu (4 reviews, avg 4.00 sao) -----
SET @buyer_id_90318 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90318 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90317', @buyer_id_90318, @store_id_90318, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-11-27 00:00:00', '2025-11-27 00:00:00');
SET @order_id_90318 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90318, @buyer_id_90318, @store_id_90318, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-11-27 00:00:00');

SET @buyer_id_90319 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90319 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90318', @buyer_id_90319, @store_id_90319, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-11 00:00:00', '2026-04-11 00:00:00');
SET @order_id_90319 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90319, @buyer_id_90319, @store_id_90319, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-04-11 00:00:00');

SET @buyer_id_90320 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90320 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90319', @buyer_id_90320, @store_id_90320, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-02-01 00:00:00', '2026-02-01 00:00:00');
SET @order_id_90320 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90320, @buyer_id_90320, @store_id_90320, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-02-01 00:00:00');

SET @buyer_id_90321 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90321 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoboanhtuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90320', @buyer_id_90321, @store_id_90321, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-15 00:00:00', '2026-04-15 00:00:00');
SET @order_id_90321 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90321, @buyer_id_90321, @store_id_90321, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-04-15 00:00:00');


-- ----- comtamsuonbichasanghoakhanh (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90322 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90322 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90321', @buyer_id_90322, @store_id_90322, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-02-08 00:00:00', '2026-02-08 00:00:00');
SET @order_id_90322 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90322, @buyer_id_90322, @store_id_90322, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-02-08 00:00:00');

SET @buyer_id_90323 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90323 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90322', @buyer_id_90323, @store_id_90323, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-26 00:00:00', '2026-04-26 00:00:00');
SET @order_id_90323 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90323, @buyer_id_90323, @store_id_90323, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-26 00:00:00');

SET @buyer_id_90324 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90324 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90323', @buyer_id_90324, @store_id_90324, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-12-22 00:00:00', '2025-12-22 00:00:00');
SET @order_id_90324 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90324, @buyer_id_90324, @store_id_90324, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2025-12-22 00:00:00');

SET @buyer_id_90325 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90325 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90324', @buyer_id_90325, @store_id_90325, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-02-10 00:00:00', '2026-02-10 00:00:00');
SET @order_id_90325 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90325, @buyer_id_90325, @store_id_90325, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-02-10 00:00:00');

SET @buyer_id_90326 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90326 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comtamsuonbichasanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90325', @buyer_id_90326, @store_id_90326, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-27 00:00:00', '2026-02-27 00:00:00');
SET @order_id_90326 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90326, @buyer_id_90326, @store_id_90326, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-02-27 00:00:00');


-- ----- banhcanhchacabaminhlienchieu (5 reviews, avg 4.20 sao) -----
SET @buyer_id_90327 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90327 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90326', @buyer_id_90327, @store_id_90327, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-02-09 00:00:00', '2026-02-09 00:00:00');
SET @order_id_90327 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90327, @buyer_id_90327, @store_id_90327, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-02-09 00:00:00');

SET @buyer_id_90328 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90328 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90327', @buyer_id_90328, @store_id_90328, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-11 00:00:00', '2026-03-11 00:00:00');
SET @order_id_90328 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90328, @buyer_id_90328, @store_id_90328, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-03-11 00:00:00');

SET @buyer_id_90329 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90329 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90328', @buyer_id_90329, @store_id_90329, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-11 00:00:00', '2026-01-11 00:00:00');
SET @order_id_90329 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90329, @buyer_id_90329, @store_id_90329, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-11 00:00:00');

SET @buyer_id_90330 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90330 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90329', @buyer_id_90330, @store_id_90330, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-05-04 00:00:00', '2026-05-04 00:00:00');
SET @order_id_90330 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90330, @buyer_id_90330, @store_id_90330, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-05-04 00:00:00');

SET @buyer_id_90331 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90331 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhcanhchacabaminhlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90330', @buyer_id_90331, @store_id_90331, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-03-18 00:00:00', '2026-03-18 00:00:00');
SET @order_id_90331 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90331, @buyer_id_90331, @store_id_90331, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-03-18 00:00:00');


-- ----- bunchahanoicohuonghoakhanh (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90332 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90332 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90331', @buyer_id_90332, @store_id_90332, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-07 00:00:00', '2026-01-07 00:00:00');
SET @order_id_90332 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90332, @buyer_id_90332, @store_id_90332, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-01-07 00:00:00');

SET @buyer_id_90333 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90333 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90332', @buyer_id_90333, @store_id_90333, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-11 00:00:00', '2025-12-11 00:00:00');
SET @order_id_90333 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90333, @buyer_id_90333, @store_id_90333, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-12-11 00:00:00');

SET @buyer_id_90334 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90334 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90333', @buyer_id_90334, @store_id_90334, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-05-13 00:00:00', '2026-05-13 00:00:00');
SET @order_id_90334 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90334, @buyer_id_90334, @store_id_90334, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-05-13 00:00:00');

SET @buyer_id_90335 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90335 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90334', @buyer_id_90335, @store_id_90335, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-05-06 00:00:00', '2026-05-06 00:00:00');
SET @order_id_90335 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90335, @buyer_id_90335, @store_id_90335, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-05-06 00:00:00');

SET @buyer_id_90336 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90336 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90335', @buyer_id_90336, @store_id_90336, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-07 00:00:00', '2025-12-07 00:00:00');
SET @order_id_90336 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90336, @buyer_id_90336, @store_id_90336, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2025-12-07 00:00:00');

SET @buyer_id_90337 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90337 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunchahanoicohuonghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90336', @buyer_id_90337, @store_id_90337, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-02-07 00:00:00', '2026-02-07 00:00:00');
SET @order_id_90337 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90337, @buyer_id_90337, @store_id_90337, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-02-07 00:00:00');


-- ----- bunthitnuongcoduyenhoakhanh (5 reviews, avg 4.40 sao) -----
SET @buyer_id_90338 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90338 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90337', @buyer_id_90338, @store_id_90338, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-04-04 00:00:00', '2026-04-04 00:00:00');
SET @order_id_90338 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90338, @buyer_id_90338, @store_id_90338, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-04-04 00:00:00');

SET @buyer_id_90339 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90339 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90338', @buyer_id_90339, @store_id_90339, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-03-17 00:00:00', '2026-03-17 00:00:00');
SET @order_id_90339 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90339, @buyer_id_90339, @store_id_90339, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-03-17 00:00:00');

SET @buyer_id_90340 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90340 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90339', @buyer_id_90340, @store_id_90340, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-05 00:00:00', '2026-04-05 00:00:00');
SET @order_id_90340 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90340, @buyer_id_90340, @store_id_90340, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2026-04-05 00:00:00');

SET @buyer_id_90341 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90341 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90340', @buyer_id_90341, @store_id_90341, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-21 00:00:00', '2026-04-21 00:00:00');
SET @order_id_90341 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90341, @buyer_id_90341, @store_id_90341, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-04-21 00:00:00');

SET @buyer_id_90342 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90342 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunthitnuongcoduyenhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90341', @buyer_id_90342, @store_id_90342, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-21 00:00:00', '2026-03-21 00:00:00');
SET @order_id_90342 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90342, @buyer_id_90342, @store_id_90342, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-03-21 00:00:00');


-- ----- xoigaladuacovan (6 reviews, avg 4.83 sao) -----
SET @buyer_id_90343 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90343 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90342', @buyer_id_90343, @store_id_90343, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-11-28 00:00:00', '2025-11-28 00:00:00');
SET @order_id_90343 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90343, @buyer_id_90343, @store_id_90343, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-11-28 00:00:00');

SET @buyer_id_90344 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90344 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90343', @buyer_id_90344, @store_id_90344, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-01-31 00:00:00', '2026-01-31 00:00:00');
SET @order_id_90344 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90344, @buyer_id_90344, @store_id_90344, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-01-31 00:00:00');

SET @buyer_id_90345 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90345 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90344', @buyer_id_90345, @store_id_90345, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2025-11-22 00:00:00', '2025-11-22 00:00:00');
SET @order_id_90345 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90345, @buyer_id_90345, @store_id_90345, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-11-22 00:00:00');

SET @buyer_id_90346 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90346 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90345', @buyer_id_90346, @store_id_90346, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-23 00:00:00', '2026-01-23 00:00:00');
SET @order_id_90346 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90346, @buyer_id_90346, @store_id_90346, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-01-23 00:00:00');

SET @buyer_id_90347 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90347 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90346', @buyer_id_90347, @store_id_90347, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-03-16 00:00:00', '2026-03-16 00:00:00');
SET @order_id_90347 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90347, @buyer_id_90347, @store_id_90347, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-03-16 00:00:00');

SET @buyer_id_90348 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90348 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'xoigaladuacovan' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90347', @buyer_id_90348, @store_id_90348, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-21 00:00:00', '2026-01-21 00:00:00');
SET @order_id_90348 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90348, @buyer_id_90348, @store_id_90348, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-01-21 00:00:00');


-- ----- bunsuamamruoccobalienchieu (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90349 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90349 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90348', @buyer_id_90349, @store_id_90349, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-11-27 00:00:00', '2025-11-27 00:00:00');
SET @order_id_90349 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90349, @buyer_id_90349, @store_id_90349, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2025-11-27 00:00:00');

SET @buyer_id_90350 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90350 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90349', @buyer_id_90350, @store_id_90350, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-11-20 00:00:00', '2025-11-20 00:00:00');
SET @order_id_90350 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90350, @buyer_id_90350, @store_id_90350, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-11-20 00:00:00');

SET @buyer_id_90351 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90351 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90350', @buyer_id_90351, @store_id_90351, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-02-06 00:00:00', '2026-02-06 00:00:00');
SET @order_id_90351 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90351, @buyer_id_90351, @store_id_90351, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-02-06 00:00:00');

SET @buyer_id_90352 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90352 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90351', @buyer_id_90352, @store_id_90352, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-14 00:00:00', '2026-03-14 00:00:00');
SET @order_id_90352 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90352, @buyer_id_90352, @store_id_90352, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-03-14 00:00:00');

SET @buyer_id_90353 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90353 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunsuamamruoccobalienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90352', @buyer_id_90353, @store_id_90353, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-27 00:00:00', '2025-12-27 00:00:00');
SET @order_id_90353 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90353, @buyer_id_90353, @store_id_90353, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-12-27 00:00:00');


-- ----- caphesangbabayhoakhanh (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90354 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90354 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90353', @buyer_id_90354, @store_id_90354, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-12 00:00:00', '2026-04-12 00:00:00');
SET @order_id_90354 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90354, @buyer_id_90354, @store_id_90354, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-12 00:00:00');

SET @buyer_id_90355 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90355 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90354', @buyer_id_90355, @store_id_90355, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-11-24 00:00:00', '2025-11-24 00:00:00');
SET @order_id_90355 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90355, @buyer_id_90355, @store_id_90355, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2025-11-24 00:00:00');

SET @buyer_id_90356 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90356 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90355', @buyer_id_90356, @store_id_90356, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-01-19 00:00:00', '2026-01-19 00:00:00');
SET @order_id_90356 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90356, @buyer_id_90356, @store_id_90356, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-01-19 00:00:00');

SET @buyer_id_90357 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90357 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90356', @buyer_id_90357, @store_id_90357, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-01-17 00:00:00', '2026-01-17 00:00:00');
SET @order_id_90357 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90357, @buyer_id_90357, @store_id_90357, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-01-17 00:00:00');

SET @buyer_id_90358 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90358 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90357', @buyer_id_90358, @store_id_90358, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-05-11 00:00:00', '2026-05-11 00:00:00');
SET @order_id_90358 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90358, @buyer_id_90358, @store_id_90358, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-05-11 00:00:00');

SET @buyer_id_90359 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90359 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caphesangbabayhoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90358', @buyer_id_90359, @store_id_90359, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-21 00:00:00', '2026-01-21 00:00:00');
SET @order_id_90359 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90359, @buyer_id_90359, @store_id_90359, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-01-21 00:00:00');


-- ----- banhmiquedananghoakhanh (4 reviews, avg 4.00 sao) -----
SET @buyer_id_90360 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90360 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90359', @buyer_id_90360, @store_id_90360, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-15 00:00:00', '2026-03-15 00:00:00');
SET @order_id_90360 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90360, @buyer_id_90360, @store_id_90360, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-15 00:00:00');

SET @buyer_id_90361 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90361 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90360', @buyer_id_90361, @store_id_90361, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-13 00:00:00', '2026-04-13 00:00:00');
SET @order_id_90361 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90361, @buyer_id_90361, @store_id_90361, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2026-04-13 00:00:00');

SET @buyer_id_90362 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90362 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90361', @buyer_id_90362, @store_id_90362, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-26 00:00:00', '2026-04-26 00:00:00');
SET @order_id_90362 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90362, @buyer_id_90362, @store_id_90362, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-04-26 00:00:00');

SET @buyer_id_90363 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90363 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmiquedananghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90362', @buyer_id_90363, @store_id_90363, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-15 00:00:00', '2026-04-15 00:00:00');
SET @order_id_90363 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90363, @buyer_id_90363, @store_id_90363, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-04-15 00:00:00');


-- ----- miquangbaphuochoakhanh (4 reviews, avg 4.50 sao) -----
SET @buyer_id_90364 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90364 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90363', @buyer_id_90364, @store_id_90364, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-12-20 00:00:00', '2025-12-20 00:00:00');
SET @order_id_90364 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90364, @buyer_id_90364, @store_id_90364, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2025-12-20 00:00:00');

SET @buyer_id_90365 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90365 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90364', @buyer_id_90365, @store_id_90365, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-01-10 00:00:00', '2026-01-10 00:00:00');
SET @order_id_90365 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90365, @buyer_id_90365, @store_id_90365, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-01-10 00:00:00');

SET @buyer_id_90366 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90366 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90365', @buyer_id_90366, @store_id_90366, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2025-11-26 00:00:00', '2025-11-26 00:00:00');
SET @order_id_90366 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90366, @buyer_id_90366, @store_id_90366, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-11-26 00:00:00');

SET @buyer_id_90367 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90367 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'miquangbaphuochoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90366', @buyer_id_90367, @store_id_90367, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-08 00:00:00', '2026-04-08 00:00:00');
SET @order_id_90367 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90367, @buyer_id_90367, @store_id_90367, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-04-08 00:00:00');


-- ----- comnhabachienlienchieu (6 reviews, avg 4.17 sao) -----
SET @buyer_id_90368 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90368 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90367', @buyer_id_90368, @store_id_90368, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-02-19 00:00:00', '2026-02-19 00:00:00');
SET @order_id_90368 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90368, @buyer_id_90368, @store_id_90368, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-02-19 00:00:00');

SET @buyer_id_90369 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90369 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90368', @buyer_id_90369, @store_id_90369, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-02-18 00:00:00', '2026-02-18 00:00:00');
SET @order_id_90369 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90369, @buyer_id_90369, @store_id_90369, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-02-18 00:00:00');

SET @buyer_id_90370 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90370 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90369', @buyer_id_90370, @store_id_90370, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-02-20 00:00:00', '2026-02-20 00:00:00');
SET @order_id_90370 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90370, @buyer_id_90370, @store_id_90370, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-02-20 00:00:00');

SET @buyer_id_90371 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90371 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90370', @buyer_id_90371, @store_id_90371, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-08 00:00:00', '2026-04-08 00:00:00');
SET @order_id_90371 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90371, @buyer_id_90371, @store_id_90371, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-04-08 00:00:00');

SET @buyer_id_90372 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90372 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90371', @buyer_id_90372, @store_id_90372, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-05-08 00:00:00', '2026-05-08 00:00:00');
SET @order_id_90372 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90372, @buyer_id_90372, @store_id_90372, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-05-08 00:00:00');

SET @buyer_id_90373 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90373 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'comnhabachienlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90372', @buyer_id_90373, @store_id_90373, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-01-23 00:00:00', '2026-01-23 00:00:00');
SET @order_id_90373 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90373, @buyer_id_90373, @store_id_90373, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-23 00:00:00');


-- ----- bundausangcohahoakhanh (6 reviews, avg 4.00 sao) -----
SET @buyer_id_90374 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90374 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90373', @buyer_id_90374, @store_id_90374, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-05-01 00:00:00', '2026-05-01 00:00:00');
SET @order_id_90374 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90374, @buyer_id_90374, @store_id_90374, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-05-01 00:00:00');

SET @buyer_id_90375 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90375 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90374', @buyer_id_90375, @store_id_90375, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-01-17 00:00:00', '2026-01-17 00:00:00');
SET @order_id_90375 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90375, @buyer_id_90375, @store_id_90375, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-01-17 00:00:00');

SET @buyer_id_90376 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90376 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90375', @buyer_id_90376, @store_id_90376, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-11-18 00:00:00', '2025-11-18 00:00:00');
SET @order_id_90376 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90376, @buyer_id_90376, @store_id_90376, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2025-11-18 00:00:00');

SET @buyer_id_90377 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90377 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90376', @buyer_id_90377, @store_id_90377, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2026-04-05 00:00:00', '2026-04-05 00:00:00');
SET @order_id_90377 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90377, @buyer_id_90377, @store_id_90377, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-04-05 00:00:00');

SET @buyer_id_90378 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90378 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90377', @buyer_id_90378, @store_id_90378, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-02-02 00:00:00', '2026-02-02 00:00:00');
SET @order_id_90378 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90378, @buyer_id_90378, @store_id_90378, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-02-02 00:00:00');

SET @buyer_id_90379 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90379 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bundausangcohahoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90378', @buyer_id_90379, @store_id_90379, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-17 00:00:00', '2026-04-17 00:00:00');
SET @order_id_90379 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90379, @buyer_id_90379, @store_id_90379, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-04-17 00:00:00');


-- ----- banhtetlachuoibalanh (5 reviews, avg 4.80 sao) -----
SET @buyer_id_90380 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90380 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90379', @buyer_id_90380, @store_id_90380, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2025-12-24 00:00:00', '2025-12-24 00:00:00');
SET @order_id_90380 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90380, @buyer_id_90380, @store_id_90380, NULL, 4, 'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.', 0, FLOOR(RAND()*15), '2025-12-24 00:00:00');

SET @buyer_id_90381 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90381 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90380', @buyer_id_90381, @store_id_90381, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-18 00:00:00', '2026-04-18 00:00:00');
SET @order_id_90381 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90381, @buyer_id_90381, @store_id_90381, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-18 00:00:00');

SET @buyer_id_90382 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90382 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90381', @buyer_id_90382, @store_id_90382, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-12-27 00:00:00', '2025-12-27 00:00:00');
SET @order_id_90382 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90382, @buyer_id_90382, @store_id_90382, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2025-12-27 00:00:00');

SET @buyer_id_90383 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90383 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90382', @buyer_id_90383, @store_id_90383, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2025-12-12 00:00:00', '2025-12-12 00:00:00');
SET @order_id_90383 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90383, @buyer_id_90383, @store_id_90383, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2025-12-12 00:00:00');

SET @buyer_id_90384 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90384 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhtetlachuoibalanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90383', @buyer_id_90384, @store_id_90384, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-05-08 00:00:00', '2026-05-08 00:00:00');
SET @order_id_90384 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90384, @buyer_id_90384, @store_id_90384, NULL, 5, 'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰', 0, FLOOR(RAND()*15), '2026-05-08 00:00:00');


-- ----- phoxaosanghoakhanhanhduc (5 reviews, avg 4.60 sao) -----
SET @buyer_id_90385 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90385 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90384', @buyer_id_90385, @store_id_90385, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-30 00:00:00', '2025-12-30 00:00:00');
SET @order_id_90385 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90385, @buyer_id_90385, @store_id_90385, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-30 00:00:00');

SET @buyer_id_90386 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90386 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90385', @buyer_id_90386, @store_id_90386, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2025-12-16 00:00:00', '2025-12-16 00:00:00');
SET @order_id_90386 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90386, @buyer_id_90386, @store_id_90386, NULL, 5, 'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.', 0, FLOOR(RAND()*15), '2025-12-16 00:00:00');

SET @buyer_id_90387 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90387 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90386', @buyer_id_90387, @store_id_90387, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-03-02 00:00:00', '2026-03-02 00:00:00');
SET @order_id_90387 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90387, @buyer_id_90387, @store_id_90387, NULL, 3, 'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.', 0, FLOOR(RAND()*15), '2026-03-02 00:00:00');

SET @buyer_id_90388 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90388 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90387', @buyer_id_90388, @store_id_90388, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-28 00:00:00', '2026-04-28 00:00:00');
SET @order_id_90388 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90388, @buyer_id_90388, @store_id_90388, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-28 00:00:00');

SET @buyer_id_90389 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90389 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phoxaosanghoakhanhanhduc' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90388', @buyer_id_90389, @store_id_90389, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2026-04-28 00:00:00', '2026-04-28 00:00:00');
SET @order_id_90389 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90389, @buyer_id_90389, @store_id_90389, NULL, 5, 'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.', 0, FLOOR(RAND()*15), '2026-04-28 00:00:00');


-- ----- chaolongheobatuyetlienchieu (4 reviews, avg 4.00 sao) -----
SET @buyer_id_90390 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dangvietdung' LIMIT 1);
SET @store_id_90390 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90389', @buyer_id_90390, @store_id_90390, 'Đặng Việt Dũng', '0901234014', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-04-07 00:00:00', '2026-04-07 00:00:00');
SET @order_id_90390 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90390, @buyer_id_90390, @store_id_90390, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-04-07 00:00:00');

SET @buyer_id_90391 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'diemquynh2001' LIMIT 1);
SET @store_id_90391 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90390', @buyer_id_90391, @store_id_90391, 'Diễm Quỳnh', '0901234015', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 330000, 15000, 0, 345000, 310500, 34500, 0, '2026-02-26 00:00:00', '2026-02-26 00:00:00');
SET @order_id_90391 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90391, @buyer_id_90391, @store_id_90391, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-02-26 00:00:00');

SET @buyer_id_90392 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'haotienwang' LIMIT 1);
SET @store_id_90392 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90391', @buyer_id_90392, @store_id_90392, 'Hào Tiến', '0901234016', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 480000, 15000, 0, 495000, 445500, 49500, 0, '2025-12-18 00:00:00', '2025-12-18 00:00:00');
SET @order_id_90392 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90392, @buyer_id_90392, @store_id_90392, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2025-12-18 00:00:00');

SET @buyer_id_90393 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenbichvan' LIMIT 1);
SET @store_id_90393 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'chaolongheobatuyetlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90392', @buyer_id_90393, @store_id_90393, 'Nguyễn Bích Vân', '0901234017', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-02-21 00:00:00', '2026-02-21 00:00:00');
SET @order_id_90393 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90393, @buyer_id_90393, @store_id_90393, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-02-21 00:00:00');


-- ----- banhmipatechuhunghoakhanh (4 reviews, avg 4.25 sao) -----
SET @buyer_id_90394 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trandinhtoan' LIMIT 1);
SET @store_id_90394 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90393', @buyer_id_90394, @store_id_90394, 'Trần Đình Toàn', '0901234018', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-03-06 00:00:00', '2026-03-06 00:00:00');
SET @order_id_90394 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90394, @buyer_id_90394, @store_id_90394, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2026-03-06 00:00:00');

SET @buyer_id_90395 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'maianhtu' LIMIT 1);
SET @store_id_90395 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90394', @buyer_id_90395, @store_id_90395, 'Mai Anh Tú', '0901234019', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2025-11-24 00:00:00', '2025-11-24 00:00:00');
SET @order_id_90395 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90395, @buyer_id_90395, @store_id_90395, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-11-24 00:00:00');

SET @buyer_id_90396 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phanngocbich' LIMIT 1);
SET @store_id_90396 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90395', @buyer_id_90396, @store_id_90396, 'Phan Ngọc Bích', '0901234020', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-02-16 00:00:00', '2026-02-16 00:00:00');
SET @order_id_90396 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90396, @buyer_id_90396, @store_id_90396, NULL, 4, 'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.', 0, FLOOR(RAND()*15), '2026-02-16 00:00:00');

SET @buyer_id_90397 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'luongvanson' LIMIT 1);
SET @store_id_90397 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhmipatechuhunghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90396', @buyer_id_90397, @store_id_90397, 'Lương Văn Sơn', '0901234021', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-04-02 00:00:00', '2026-04-02 00:00:00');
SET @order_id_90397 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90397, @buyer_id_90397, @store_id_90397, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-04-02 00:00:00');


-- ----- bunbonambosanghoakhanh (6 reviews, avg 3.83 sao) -----
SET @buyer_id_90398 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'truongthungan' LIMIT 1);
SET @store_id_90398 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90397', @buyer_id_90398, @store_id_90398, 'Trương Thu Ngân', '0901234022', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-04-13 00:00:00', '2026-04-13 00:00:00');
SET @order_id_90398 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90398, @buyer_id_90398, @store_id_90398, NULL, 3, 'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.', 0, FLOOR(RAND()*15), '2026-04-13 00:00:00');

SET @buyer_id_90399 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'caovanha' LIMIT 1);
SET @store_id_90399 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90398', @buyer_id_90399, @store_id_90399, 'Cao Văn Hà', '0901234023', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 130000, 15000, 0, 145000, 130500, 14500, 0, '2026-04-24 00:00:00', '2026-04-24 00:00:00');
SET @order_id_90399 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90399, @buyer_id_90399, @store_id_90399, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-04-24 00:00:00');

SET @buyer_id_90400 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'dinhthuyduong' LIMIT 1);
SET @store_id_90400 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90399', @buyer_id_90400, @store_id_90400, 'Đinh Thùy Dương', '0901234024', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-27 00:00:00', '2026-01-27 00:00:00');
SET @order_id_90400 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90400, @buyer_id_90400, @store_id_90400, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-01-27 00:00:00');

SET @buyer_id_90401 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phungminhkhoa' LIMIT 1);
SET @store_id_90401 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90400', @buyer_id_90401, @store_id_90401, 'Phùng Minh Khoa', '0901234025', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-01-11 00:00:00', '2026-01-11 00:00:00');
SET @order_id_90401 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90401, @buyer_id_90401, @store_id_90401, NULL, 4, 'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!', 0, FLOOR(RAND()*15), '2026-01-11 00:00:00');

SET @buyer_id_90402 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenthilan' LIMIT 1);
SET @store_id_90402 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90401', @buyer_id_90402, @store_id_90402, 'Nguyễn Thị Lan', '0901234001', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 80000, 15000, 0, 95000, 85500, 9500, 0, '2026-05-07 00:00:00', '2026-05-07 00:00:00');
SET @order_id_90402 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90402, @buyer_id_90402, @store_id_90402, NULL, 5, 'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍', 0, FLOOR(RAND()*15), '2026-05-07 00:00:00');

SET @buyer_id_90403 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'tranthanhminh' LIMIT 1);
SET @store_id_90403 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'bunbonambosanghoakhanh' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90402', @buyer_id_90403, @store_id_90403, 'Trần Thanh Minh', '0901234002', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 280000, 15000, 0, 295000, 265500, 29500, 0, '2026-03-14 00:00:00', '2026-03-14 00:00:00');
SET @order_id_90403 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90403, @buyer_id_90403, @store_id_90403, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-14 00:00:00');


-- ----- hutieumybaloanlienchieu (6 reviews, avg 4.67 sao) -----
SET @buyer_id_90404 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lephuongthao' LIMIT 1);
SET @store_id_90404 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90403', @buyer_id_90404, @store_id_90404, 'Lê Phương Thảo', '0901234003', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-02-22 00:00:00', '2026-02-22 00:00:00');
SET @order_id_90404 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90404, @buyer_id_90404, @store_id_90404, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-02-22 00:00:00');

SET @buyer_id_90405 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'phamvanhung' LIMIT 1);
SET @store_id_90405 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90404', @buyer_id_90405, @store_id_90405, 'Phạm Văn Hùng', '0901234004', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 530000, 15000, 0, 545000, 490500, 54500, 0, '2026-02-11 00:00:00', '2026-02-11 00:00:00');
SET @order_id_90405 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90405, @buyer_id_90405, @store_id_90405, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-02-11 00:00:00');

SET @buyer_id_90406 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hoangmylinh' LIMIT 1);
SET @store_id_90406 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90405', @buyer_id_90406, @store_id_90406, 'Hoàng Mỹ Linh', '0901234005', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-14 00:00:00', '2026-03-14 00:00:00');
SET @order_id_90406 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90406, @buyer_id_90406, @store_id_90406, NULL, 4, 'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.', 0, FLOOR(RAND()*15), '2026-03-14 00:00:00');

SET @buyer_id_90407 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vutrunghieu' LIMIT 1);
SET @store_id_90407 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90406', @buyer_id_90407, @store_id_90407, 'Vũ Trung Hiếu', '0901234006', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 430000, 15000, 0, 445000, 400500, 44500, 0, '2025-12-16 00:00:00', '2025-12-16 00:00:00');
SET @order_id_90407 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90407, @buyer_id_90407, @store_id_90407, NULL, 5, 'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.', 0, FLOOR(RAND()*15), '2025-12-16 00:00:00');

SET @buyer_id_90408 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'doanngochan' LIMIT 1);
SET @store_id_90408 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90407', @buyer_id_90408, @store_id_90408, 'Đoàn Ngọc Hân', '0901234007', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 380000, 15000, 0, 395000, 355500, 39500, 0, '2026-03-21 00:00:00', '2026-03-21 00:00:00');
SET @order_id_90408 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90408, @buyer_id_90408, @store_id_90408, NULL, 5, 'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!', 0, FLOOR(RAND()*15), '2026-03-21 00:00:00');

SET @buyer_id_90409 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'buiducmanh' LIMIT 1);
SET @store_id_90409 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'hutieumybaloanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90408', @buyer_id_90409, @store_id_90409, 'Bùi Đức Mạnh', '0901234008', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2025-11-26 00:00:00', '2025-11-26 00:00:00');
SET @order_id_90409 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90409, @buyer_id_90409, @store_id_90409, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2025-11-26 00:00:00');


-- ----- banhitlagaicoxuanlienchieu (5 reviews, avg 4.20 sao) -----
SET @buyer_id_90410 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'ngothikimchi' LIMIT 1);
SET @store_id_90410 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90409', @buyer_id_90410, @store_id_90410, 'Ngô Thị Kim Chi', '0901234009', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-17 00:00:00', '2026-03-17 00:00:00');
SET @order_id_90410 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90410, @buyer_id_90410, @store_id_90410, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-17 00:00:00');

SET @buyer_id_90411 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'lyminhduc' LIMIT 1);
SET @store_id_90411 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90410', @buyer_id_90411, @store_id_90411, 'Lý Minh Đức', '0901234010', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-03-19 00:00:00', '2026-03-19 00:00:00');
SET @order_id_90411 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90411, @buyer_id_90411, @store_id_90411, NULL, 4, 'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.', 0, FLOOR(RAND()*15), '2026-03-19 00:00:00');

SET @buyer_id_90412 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'trangthuhuong' LIMIT 1);
SET @store_id_90412 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90411', @buyer_id_90412, @store_id_90412, 'Trang Thu Hương', '0901234011', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 230000, 15000, 0, 245000, 220500, 24500, 0, '2026-01-22 00:00:00', '2026-01-22 00:00:00');
SET @order_id_90412 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90412, @buyer_id_90412, @store_id_90412, NULL, 5, 'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!', 0, FLOOR(RAND()*15), '2026-01-22 00:00:00');

SET @buyer_id_90413 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'nguyenquocbao' LIMIT 1);
SET @store_id_90413 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90412', @buyer_id_90413, @store_id_90413, 'Nguyễn Quốc Bảo', '0901234012', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-01-26 00:00:00', '2026-01-26 00:00:00');
SET @order_id_90413 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90413, @buyer_id_90413, @store_id_90413, NULL, 3, 'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.', 0, FLOOR(RAND()*15), '2026-01-26 00:00:00');

SET @buyer_id_90414 = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'vuongthithu' LIMIT 1);
SET @store_id_90414 = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = 'banhitlagaicoxuanlienchieu' LIMIT 1) LIMIT 1);
INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)
VALUES ('DH-SEED-90413', @buyer_id_90414, @store_id_90414, 'Vương Thị Thu', '0901234013', 'Đà Nẵng', 'tien_mat', 'hoan_tat', 180000, 15000, 0, 195000, 175500, 19500, 0, '2026-04-03 00:00:00', '2026-04-03 00:00:00');
SET @order_id_90414 = LAST_INSERT_ID();
INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)
VALUES (@order_id_90414, @buyer_id_90414, @store_id_90414, NULL, 5, 'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!', 0, FLOOR(RAND()*15), '2026-04-03 00:00:00');


-- ============================================================
-- 3. CẬP NHẬT diem_danh_gia VÀ tong_don_hang (bulk JOIN)
-- ============================================================
UPDATE cua_hang ch
JOIN (
  SELECT id_cua_hang, ROUND(AVG(so_sao), 2) AS avg_sao
  FROM danh_gia GROUP BY id_cua_hang
) dg_stats ON dg_stats.id_cua_hang = ch.id
SET ch.diem_danh_gia = dg_stats.avg_sao;

UPDATE cua_hang ch
JOIN (
  SELECT id_cua_hang, COUNT(*) AS cnt
  FROM don_hang WHERE trang_thai_don_hang = 'hoan_tat' GROUP BY id_cua_hang
) dh_stats ON dh_stats.id_cua_hang = ch.id
SET ch.tong_don_hang = dh_stats.cnt;

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;

SELECT CONCAT('Tong don hang da tao: ', COUNT(*)) AS result FROM don_hang WHERE ma_don_hang LIKE 'DH-SEED-%';
SELECT CONCAT('Tong review da tao: ', COUNT(*)) AS result FROM danh_gia;