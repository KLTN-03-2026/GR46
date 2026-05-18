-- Fix: Gán id_mon_an cho các review seed (id_mon_an đang NULL)
-- Phân bổ review vào các món đầu tiên của mỗi quán (xoay vòng qua 4 món)

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;

UPDATE danh_gia dg
JOIN don_hang dh ON dh.id = dg.id_don_hang AND dh.ma_don_hang LIKE 'DH-SEED-%'
JOIN (
    SELECT
        ma.id AS mon_an_id,
        ma.id_cua_hang,
        ROW_NUMBER() OVER (PARTITION BY ma.id_cua_hang ORDER BY ma.id) AS rn
    FROM mon_an ma
) ranked_mon ON ranked_mon.id_cua_hang = dg.id_cua_hang
    AND ranked_mon.rn = ((dg.id % 4) + 1)
SET dg.id_mon_an = ranked_mon.mon_an_id
WHERE dg.id_mon_an IS NULL;

SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- Kiểm tra
SELECT
    COUNT(*) AS tong_review,
    SUM(id_mon_an IS NOT NULL) AS co_mon_an,
    SUM(id_mon_an IS NULL) AS chua_co_mon_an
FROM danh_gia;
