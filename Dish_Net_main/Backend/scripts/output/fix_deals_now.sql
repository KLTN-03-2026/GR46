-- Fix Deal Hôm Nay: cập nhật để hiển thị ngay bây giờ
-- Backend cần: trang_thai = 'dang_dien_ra' + thoi_gian_bat_dau <= NOW() + thoi_gian_ket_thuc >= NOW()

SET SQL_SAFE_UPDATES = 0;

-- 1. Đặt tất cả deal cũ hết hạn
UPDATE khuyen_mai
SET trang_thai = 'het_han'
WHERE trang_thai IN ('dang_dien_ra', 'sap_dien_ra')
  AND thoi_gian_ket_thuc < NOW();

-- 2. Kích hoạt deal đang trong khung giờ hiện tại (nếu có)
UPDATE khuyen_mai
SET trang_thai = 'dang_dien_ra'
WHERE thoi_gian_bat_dau <= NOW()
  AND thoi_gian_ket_thuc >= NOW()
  AND trang_thai != 'het_han';

-- 3. Nếu chưa có deal nào đang diễn ra (ngoài khung giờ),
--    tạm thời kéo deal gần nhất để test UI:
--    Tìm 10 deal sắp tới gần nhất và cập nhật thành đang diễn ra (2 tiếng từ giờ)
UPDATE khuyen_mai
SET
    thoi_gian_bat_dau = DATE_SUB(NOW(), INTERVAL 30 MINUTE),
    thoi_gian_ket_thuc = DATE_ADD(NOW(), INTERVAL 90 MINUTE),
    trang_thai = 'dang_dien_ra'
WHERE id IN (
    SELECT id FROM (
        SELECT id FROM khuyen_mai
        WHERE trang_thai = 'sap_dien_ra'
          AND DATE(thoi_gian_bat_dau) = CURDATE()
        ORDER BY thoi_gian_bat_dau ASC
        LIMIT 10
    ) tmp
);

SET SQL_SAFE_UPDATES = 1;

-- Kiểm tra kết quả
SELECT
    COUNT(*) AS tong_deal_dang_dien_ra,
    MIN(thoi_gian_bat_dau) AS bat_dau_som_nhat,
    MAX(thoi_gian_ket_thuc) AS ket_thuc_muon_nhat
FROM khuyen_mai
WHERE trang_thai = 'dang_dien_ra';
