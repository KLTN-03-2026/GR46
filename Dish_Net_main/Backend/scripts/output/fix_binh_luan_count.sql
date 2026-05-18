-- Fix: reset tong_luot_binh_luan về 0 cho bài viết seeded
-- (không có binh_luan thật nên số đếm phải là 0 cho đúng)

SET SQL_SAFE_UPDATES = 0;

UPDATE bai_viet bv
JOIN nguoi_dung nd ON nd.id = bv.id_nguoi_dang
SET bv.tong_luot_binh_luan = 0
WHERE nd.ten_dang_nhap IN (
  -- 20 TikToker reviewers
  'tuandidau','ghiendanang','haiwanderlust','danangangii','ansapdanang',
  'danangfoodtour','danangfoodie','anvatdanang','mammamdanang','reviewdanangcotam',
  'bungdoidanang','hoinghienandanang','angidaydn','foodtourdathanh','nghienhaisandanang',
  'localfooddanang','danangchilleat','anngapmatdanang','danangstreetfood','dianvoimi',
  -- 20 reviewers bài trước
  'ledinnhatnam','trankimngan','nguyenhoangson','vothithanhtrucc','phamdductoan',
  'huynhbichphuong','dangminhkhoa','buithithuha','dinhvantai','caohongnhung',
  'truongminhtuan','luongthilananh','ngovanduc','trinhthuyduong','phanthanhnhan',
  'dothimyhanh','lyminhquan','hovankien','chungocbich','maidinhphuc'
);

SET SQL_SAFE_UPDATES = 1;

-- Kiểm tra
SELECT COUNT(*) AS bai_viet_da_fix,
       SUM(tong_luot_binh_luan) AS tong_binh_luan_sau_fix
FROM bai_viet bv
JOIN nguoi_dung nd ON nd.id = bv.id_nguoi_dang
WHERE nd.ten_dang_nhap IN (
  'tuandidau','ghiendanang','haiwanderlust','danangangii','ansapdanang',
  'danangfoodtour','danangfoodie','anvatdanang','mammamdanang','reviewdanangcotam',
  'bungdoidanang','hoinghienandanang','angidaydn','foodtourdathanh','nghienhaisandanang',
  'localfooddanang','danangchilleat','anngapmatdanang','danangstreetfood','dianvoimi',
  'ledinnhatnam','trankimngan','nguyenhoangson','vothithanhtrucc','phamdductoan',
  'huynhbichphuong','dangminhkhoa','buithithuha','dinhvantai','caohongnhung',
  'truongminhtuan','luongthilananh','ngovanduc','trinhthuyduong','phanthanhnhan',
  'dothimyhanh','lyminhquan','hovankien','chungocbich','maidinhphuc'
);
