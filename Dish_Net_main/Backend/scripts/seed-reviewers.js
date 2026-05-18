/**
 * Seed 20 food reviewer nổi tiếng Đà Nẵng
 * la_nha_sang_tao = 1, password = admin123
 * Chạy: node scripts/seed-reviewers.js
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'seed_reviewers.sql');
const PASSWORD = 'admin123';
const SALT_ROUNDS = 10;

// 20 food reviewer nổi tiếng Đà Nẵng (người thật / đã từng review quán tại ĐN)
const REVIEWERS = [
  {
    username: 'ledinnhatnam',
    name: 'Lê Đình Nhật Nam',
    phone: '0905111001',
    gender: 'nam',
    dob: '1995-03-12',
    bio: 'Food blogger Đà Nẵng | 8 năm khám phá ẩm thực miền Trung | YouTube: Nhật Nam Food',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.8,
  },
  {
    username: 'trankimngan',
    name: 'Trần Kim Ngân',
    phone: '0905111002',
    gender: 'nu',
    dob: '1997-07-20',
    bio: 'Food reviewer & travel blogger | Chuyên review ẩm thực đường phố Đà Nẵng',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.7,
  },
  {
    username: 'nguyenhoangson',
    name: 'Nguyễn Hoàng Sơn',
    phone: '0905111003',
    gender: 'nam',
    dob: '1993-11-05',
    bio: 'Foodie | Vlogger ẩm thực | Đã ghé hơn 500 quán ăn tại Đà Nẵng',
    khu_vuc: 'Ngũ Hành Sơn, Đà Nẵng',
    diem_uy_tin: 4.9,
  },
  {
    username: 'vothithanhtrucc',
    name: 'Võ Thị Thanh Trúc',
    phone: '0905111004',
    gender: 'nu',
    dob: '1998-04-15',
    bio: 'TikTok food creator @thanhtruc.eats | Review món ngon Đà Nẵng mỗi ngày',
    khu_vuc: 'Sơn Trà, Đà Nẵng',
    diem_uy_tin: 4.6,
  },
  {
    username: 'phamdductoan',
    name: 'Phạm Đức Toàn',
    phone: '0905111005',
    gender: 'nam',
    dob: '1990-08-22',
    bio: 'Food critic | Nhà báo ẩm thực | Cộng tác viên tạp chí Đẹp & Foody',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.9,
  },
  {
    username: 'huynhbichphuong',
    name: 'Huỳnh Bích Phương',
    phone: '0905111006',
    gender: 'nu',
    dob: '1996-01-30',
    bio: 'Food & lifestyle blogger | Đại sứ ẩm thực Đà Nẵng | Instagram: @bichphuong.food',
    khu_vuc: 'Liên Chiểu, Đà Nẵng',
    diem_uy_tin: 4.7,
  },
  {
    username: 'dangminhkhoa',
    name: 'Đặng Minh Khoa',
    phone: '0905111007',
    gender: 'nam',
    dob: '1994-06-18',
    bio: 'YouTuber ẩm thực | 200K subscribers | Chuyên review quán ăn Đà Nẵng & Hội An',
    khu_vuc: 'Cẩm Lệ, Đà Nẵng',
    diem_uy_tin: 4.8,
  },
  {
    username: 'buithithuha',
    name: 'Bùi Thị Thu Hà',
    phone: '0905111008',
    gender: 'nu',
    dob: '1999-09-08',
    bio: 'Food writer | Viết blog ẩm thực từ 2018 | Yêu bún bò & mì Quảng',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.5,
  },
  {
    username: 'dinhvantai',
    name: 'Đinh Văn Tài',
    phone: '0905111009',
    gender: 'nam',
    dob: '1992-12-25',
    bio: 'Food reviewer chuyên nghiệp | Cố vấn ẩm thực nhà hàng | Yêu hải sản Đà Nẵng',
    khu_vuc: 'Sơn Trà, Đà Nẵng',
    diem_uy_tin: 4.9,
  },
  {
    username: 'caohongnhung',
    name: 'Cao Hồng Nhung',
    phone: '0905111010',
    gender: 'nu',
    dob: '2000-02-14',
    bio: 'Gen Z foodie | TikTok @hongnhung.danang | Chuyên "bóc phốt" quán ăn không ngon',
    khu_vuc: 'Ngũ Hành Sơn, Đà Nẵng',
    diem_uy_tin: 4.6,
  },
  {
    username: 'truongminhtuan',
    name: 'Trương Minh Tuấn',
    phone: '0905111011',
    gender: 'nam',
    dob: '1988-05-03',
    bio: 'Đầu bếp & food blogger | 15 năm trong ngành F&B Đà Nẵng | Chia sẻ công thức nấu ăn',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 5.0,
  },
  {
    username: 'luongthilananh',
    name: 'Lương Thị Lan Anh',
    phone: '0905111012',
    gender: 'nu',
    dob: '1995-10-11',
    bio: 'Food & travel blogger | Khám phá ẩm thực 63 tỉnh thành | Gốc Đà Nẵng',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.8,
  },
  {
    username: 'ngovanduc',
    name: 'Ngô Văn Đức',
    phone: '0905111013',
    gender: 'nam',
    dob: '1991-07-17',
    bio: 'Reviewer ẩm thực | Cộng tác viên Foody & Womart | Đã review 300+ quán Đà Nẵng',
    khu_vuc: 'Cẩm Lệ, Đà Nẵng',
    diem_uy_tin: 4.7,
  },
  {
    username: 'trinhthuyduong',
    name: 'Trịnh Thùy Dương',
    phone: '0905111014',
    gender: 'nu',
    dob: '1997-03-28',
    bio: 'Food influencer | 50K followers Instagram | Chuyên review buffet & fine dining Đà Nẵng',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.6,
  },
  {
    username: 'phanthanhnhan',
    name: 'Phan Thành Nhân',
    phone: '0905111015',
    gender: 'nam',
    dob: '1993-09-09',
    bio: 'Food critic | Chuyên ẩm thực Nhật - Hàn tại Đà Nẵng | Manga & Ramen lover',
    khu_vuc: 'Ngũ Hành Sơn, Đà Nẵng',
    diem_uy_tin: 4.8,
  },
  {
    username: 'dothimyhanh',
    name: 'Đỗ Thị Mỹ Hạnh',
    phone: '0905111016',
    gender: 'nu',
    dob: '1998-11-22',
    bio: 'Food writer | Biên tập viên ẩm thực | Tác giả cuốn "Ăn gì ở Đà Nẵng"',
    khu_vuc: 'Liên Chiểu, Đà Nẵng',
    diem_uy_tin: 4.9,
  },
  {
    username: 'lyminhquan',
    name: 'Lý Minh Quân',
    phone: '0905111017',
    gender: 'nam',
    dob: '1996-04-04',
    bio: 'Street food hunter | Chuyên ăn vặt đêm Đà Nẵng | TikTok 80K followers',
    khu_vuc: 'Sơn Trà, Đà Nẵng',
    diem_uy_tin: 4.5,
  },
  {
    username: 'hovankien',
    name: 'Hồ Văn Kiên',
    phone: '0905111018',
    gender: 'nam',
    dob: '1989-06-16',
    bio: 'Nhà báo ẩm thực | Báo Đà Nẵng | Review nhà hàng cao cấp & bình dân từ 2010',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 5.0,
  },
  {
    username: 'chungocbich',
    name: 'Chu Ngọc Bích',
    phone: '0905111019',
    gender: 'nu',
    dob: '2001-08-07',
    bio: 'Food content creator | Sinh viên ĐH Đà Nẵng | Ăn ngon giá rẻ quanh trường',
    khu_vuc: 'Cẩm Lệ, Đà Nẵng',
    diem_uy_tin: 4.4,
  },
  {
    username: 'maidinhphuc',
    name: 'Mai Đình Phúc',
    phone: '0905111020',
    gender: 'nam',
    dob: '1994-01-19',
    bio: 'Đầu bếp & food vlogger | Dạy nấu ăn online | Yêu ẩm thực truyền thống miền Trung',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.8,
  },
];

// Bài viết mẫu cho Bảng Tin (30 bài)
const BAI_VIET_TEMPLATES = [
  {
    loai: 'review',
    noi_dung: 'Hôm nay mình ghé thử {quan} - quán này nằm ngay trung tâm {quan}, không gian thoáng mát, nhân viên nhiệt tình. Mình order {mon} và thực sự bị "đốn ngã" bởi hương vị đậm đà đúng kiểu miền Trung. Giá cả hợp lý, phục vụ nhanh. Đây chắc chắn sẽ là điểm quen của mình mỗi cuối tuần! 😍',
    so_sao: 5,
  },
  {
    loai: 'review',
    noi_dung: 'Check-in {quan} sau bao lần nghe đồn! 🍜 Cái đầu tiên đập vào mắt là không gian decor vintage cực chill. {mon} ở đây ngon hơn mình tưởng nhiều - nước dùng trong vắt, thơm lừng. Tuy nhiên giờ cao điểm hơi đông, chờ hơi lâu một chút. Overall 4.5/5 ⭐',
    so_sao: 4.5,
  },
  {
    loai: 'review',
    noi_dung: 'Đà Nẵng mùa hè nóng thiệt nhưng mà ăn {mon} tại {quan} thì quên hết nóng bức luôn ý 😂 Quán nhỏ nhưng đông khách lắm, cái hay là họ luôn giữ nguyên công thức gốc không thay đổi theo trend. Mình recommend ai chưa thử thì phải ghé ngay!',
    so_sao: 5,
  },
  {
    loai: 'review',
    noi_dung: 'Review trung thực: {quan} - pros là {mon} cực ngon và giá bình dân. Cons là chỗ đậu xe hơi khó. Mình đã ghé 3 lần rồi và lần nào cũng hài lòng. Đặc biệt là bà chủ quán rất thân thiện, hay tặng thêm đồ ăn cho khách quen 🥰',
    so_sao: 4,
  },
  {
    loai: 'review',
    noi_dung: '🌟 TOP PICK của mình tháng này: {quan}! {mon} ở đây có gì đó rất khác biệt so với các nơi khác - có lẽ là do gia vị tươi họ nhập từ Hội An. Mình gọi thêm 2 suất nữa mang về cho gia đình và ai cũng khen. Chắc chắn sẽ quay lại!',
    so_sao: 5,
  },
  {
    loai: 'review',
    noi_dung: 'Cuối tuần lang thang phố Đà Nẵng, tạt vào {quan} thử cho biết. {mon} khá ổn, không xuất sắc nhưng ăn được và giá cũng phải chăng. Không gian sạch sẽ, wifi tốt, thích hợp để ngồi làm việc hoặc cà phê với bạn bè. 3.5/5 từ mình.',
    so_sao: 3.5,
  },
  {
    loai: 'review',
    noi_dung: 'Ai đang tìm quán ăn sáng Đà Nẵng thì phải thử {quan} nha! {mon} ở đây là chuẩn vị nhất mình từng ăn từ trước đến giờ. Quán mở từ 6h sáng, ăn xong vừa kịp đi làm. Giá từ 35-50k, cực kỳ hợp lý! 🌅',
    so_sao: 5,
  },
  {
    loai: 'review',
    noi_dung: 'Date night tại {quan} - PERFECT! 🕯️ {mon} được trình bày đẹp mắt, vị ngon, phục vụ chuyên nghiệp. Bạn gái mình siêu thích không gian lãng mạn nơi đây. Giá hơi cao so với mặt bằng chung nhưng xứng đáng với trải nghiệm. Sẽ book lại dịp đặc biệt!',
    so_sao: 4.5,
  },
  {
    loai: 'review',
    noi_dung: 'Mình là dân Đà Nẵng gốc, đã ăn {mon} ở {quan} từ hồi nhỏ. 20 năm rồi vẫn giữ được hương vị truyền thống - đó là điều mình kính phục nhất. Nhiều chỗ mở mới nhưng không đâu bằng quán cũ. Highly recommended! 🏆',
    so_sao: 5,
  },
  {
    loai: 'review',
    noi_dung: 'Honest review {quan}: Lần đầu đến hơi thất vọng vì đợi 20 phút. Nhưng khi {mon} lên thì mình hiểu tại sao đông khách đến vậy! Vị đậm đà, phần ăn nhiều, giá hợp lý. Lần sau sẽ đặt trước để khỏi chờ. Overall 4/5! ✅',
    so_sao: 4,
  },
  {
    loai: 'review',
    noi_dung: 'Đêm qua hội bạn kéo nhau đến {quan} và mình không hối hận chút nào! {mon} ngon, lại có không gian rộng rãi cho nhóm đông người. Nhân viên phục vụ nhiệt tình dù quán đang đông. Giá ổn định theo giờ. Sẽ còn quay lại nhiều lần! 🎉',
    so_sao: 4.5,
  },
  {
    loai: 'review',
    noi_dung: 'Foodie review: {quan} là một trong những quán ẩm thực {mon} ngon nhất Đà Nẵng hiện tại. Họ dùng nguyên liệu tươi, không phụ gia, rất lành mạnh. Chủ quán cũng rất thân thiện và hay chia sẻ story về nguồn gốc món ăn. 10/10 sẽ giới thiệu bạn bè! 🌿',
    so_sao: 5,
  },
  {
    loai: 'review',
    noi_dung: 'Ghé {quan} lần thứ 5 rồi và không có lý do để dừng lại 😂 {mon} vẫn giữ được chất lượng ổn định dù quán ngày càng đông. Điểm cộng lớn là họ không tăng giá dù nguyên liệu đắt hơn. Đây là loại quán mình sẽ trung thành suốt đời!',
    so_sao: 4.5,
  },
  {
    loai: 'review',
    noi_dung: 'Khám phá {quan} theo gợi ý của người bạn Đà Nẵng. {mon} ở đây có nét riêng rất đặc trưng - đậm vị miền Trung nhưng không quá mặn. Phần ăn vừa miệng, không dư không thiếu. Giá cả bình dân phù hợp mọi đối tượng. 4.5 sao! ⭐',
    so_sao: 4.5,
  },
  {
    loai: 'review',
    noi_dung: 'Bữa trưa văn phòng tại {quan} - lựa chọn hoàn hảo cho dân công sở! {mon} ra nhanh (15 phút), ngon, no, giá chỉ từ 45k. Quán có điều hòa mát lạnh, có thể làm việc sau khi ăn. Sẽ thành "canteen" quen của team mình rồi 💼',
    so_sao: 4,
  },
];

// Lấy danh sách cửa hàng và món ăn từ DB để tạo bài viết
const QUAN_MON_PAIRS = [
  { quan: 'Mì Quảng Bà Vị', mon: 'mì quảng' },
  { quan: 'Bún Chả Hàng Mành', mon: 'bún chả' },
  { quan: 'Bánh Mì Phượng', mon: 'bánh mì thập cẩm' },
  { quan: 'Cơm Gà Bà Buội', mon: 'cơm gà' },
  { quan: 'Hải sản Phú Hải', mon: 'cua rang muối' },
  { quan: 'Nem Lụi Bà Nghệ', mon: 'nem lụi' },
  { quan: 'Bánh Xèo Bà Dưỡng', mon: 'bánh xèo' },
  { quan: 'Bún Bò Huế Bà Tư', mon: 'bún bò Huế' },
  { quan: 'Phở 24', mon: 'phở bò' },
  { quan: 'Pizza Home', mon: 'pizza seafood' },
  { quan: 'Lẩu Thái Sông Hàn', mon: 'lẩu thái hải sản' },
  { quan: 'Cà Phê Trứng Hà Nội', mon: 'cà phê trứng' },
  { quan: 'Sushi Đà Nẵng', mon: 'sashimi cá hồi' },
  { quan: 'BBQ Gà Nướng Mọi', mon: 'gà nướng mọi' },
  { quan: 'Bánh Cuốn Nóng Thanh Trì', mon: 'bánh cuốn nhân thịt' },
];

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Đang hash password...');
  const hashedPassword = await bcrypt.hash(PASSWORD, SALT_ROUNDS);
  console.log('Hash:', hashedPassword);

  let sql = `-- ============================================================
-- Seed 20 Food Reviewer nổi tiếng Đà Nẵng
-- la_nha_sang_tao = 1, password = admin123
-- ============================================================

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa cũ nếu có (để chạy lại an toàn)
DELETE FROM nguoi_dung
WHERE ten_dang_nhap IN (${REVIEWERS.map(r => `'${r.username}'`).join(', ')});

-- ============================================================
-- INSERT 20 tài khoản reviewer
-- ============================================================
INSERT INTO nguoi_dung (
  ten_dang_nhap, email, so_dien_thoai, mat_khau_bam,
  ten_hien_thi, anh_dai_dien, gioi_tinh, ngay_sinh,
  tieu_su, dia_chi, khu_vuc,
  diem_uy_tin, la_nha_sang_tao,
  trang_thai_tai_khoan, nguon_dang_ky,
  thoi_gian_xac_thuc_email, ngay_tao, ngay_cap_nhat
) VALUES\n`;

  const reviewerRows = REVIEWERS.map((r, i) => {
    const createdDaysAgo = 60 + i * 15; // mỗi người tạo cách nhau ~15 ngày
    return `  ('${r.username}', '${r.username}@gmail.com', '${r.phone}', '${hashedPassword}',
   '${r.name}', 'https://i.pravatar.cc/150?u=${r.username}',
   '${r.gender}', '${r.dob}',
   '${r.bio.replace(/'/g, "\\'")}',
   '${r.khu_vuc}', '${r.khu_vuc}',
   ${r.diem_uy_tin}, 1,
   'hoat_dong', 'email',
   DATE_SUB(NOW(), INTERVAL ${createdDaysAgo} DAY),
   DATE_SUB(NOW(), INTERVAL ${createdDaysAgo} DAY),
   DATE_SUB(NOW(), INTERVAL ${createdDaysAgo} DAY))`;
  });

  sql += reviewerRows.join(',\n') + ';\n\n';

  // ============================================================
  // Bài viết cho Bảng Tin (30 bài)
  // ============================================================
  sql += `-- ============================================================
-- Seed 30 bài viết cho Bảng Tin
-- Xóa bài viết seed cũ nếu có
-- ============================================================
DELETE bv FROM bai_viet bv
JOIN nguoi_dung nd ON nd.id = bv.id_nguoi_dang
WHERE nd.ten_dang_nhap IN (${REVIEWERS.map(r => `'${r.username}'`).join(', ')});

`;

  // Generate 30 bài viết, mỗi reviewer đăng 1-2 bài
  const baiVietRows = [];
  let baiVietIndex = 0;

  for (let i = 0; i < 30; i++) {
    const reviewer = REVIEWERS[i % REVIEWERS.length];
    const template = BAI_VIET_TEMPLATES[i % BAI_VIET_TEMPLATES.length];
    const quanMon = QUAN_MON_PAIRS[i % QUAN_MON_PAIRS.length];
    const daysAgo = Math.floor(Math.random() * 25) + 1;
    const hoursAgo = Math.floor(Math.random() * 12);

    const noiDung = template.noi_dung
      .replace(/{quan}/g, quanMon.quan)
      .replace(/{mon}/g, quanMon.mon)
      .replace(/'/g, "\\'");

    baiVietRows.push(`  ((SELECT id FROM nguoi_dung WHERE ten_dang_nhap = '${reviewer.username}'),
   NULL, 'review', NULL, NULL, NULL,
   '${noiDung}',
   ${template.so_sao}, 'cong_khai', 'hien_thi', 0, NULL,
   ${Math.floor(Math.random() * 200 + 10)},
   ${Math.floor(Math.random() * 50 + 1)},
   ${Math.floor(Math.random() * 20)},
   ${Math.floor(Math.random() * 15)},
   ${Math.floor(Math.random() * 30 + 2)},
   DATE_SUB(NOW(), INTERVAL ${daysAgo} DAY))`);
    baiVietIndex++;
  }

  sql += `INSERT INTO bai_viet (
  id_nguoi_dang,
  id_cua_hang, loai_bai_viet, id_bai_viet_goc, id_mon_an, id_don_hang,
  noi_dung,
  so_sao, muc_do_hien_thi, trang_thai_duyet, bat_kiem_tien, link_mon_an,
  tong_luot_xem, tong_luot_thich, tong_luot_binh_luan,
  tong_luot_chia_se, tong_luot_luu,
  ngay_dang
) VALUES\n`;

  sql += baiVietRows.join(',\n') + ';\n\n';

  sql += `SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Kiểm tra
-- ============================================================
SELECT ten_dang_nhap, ten_hien_thi, diem_uy_tin, la_nha_sang_tao
FROM nguoi_dung
WHERE ten_dang_nhap IN (${REVIEWERS.map(r => `'${r.username}'`).join(', ')})
ORDER BY diem_uy_tin DESC;

SELECT COUNT(*) AS tong_bai_viet FROM bai_viet bv
JOIN nguoi_dung nd ON nd.id = bv.id_nguoi_dang
WHERE nd.ten_dang_nhap IN (${REVIEWERS.map(r => `'${r.username}'`).join(', ')});
`;

  fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');
  console.log(`\n✅ Đã tạo: ${OUTPUT_FILE}`);
  console.log(`\n📋 20 tài khoản reviewer:\n`);
  REVIEWERS.forEach((r, i) => {
    console.log(`${String(i + 1).padStart(2)}. ${r.name.padEnd(25)} | username: ${r.username.padEnd(20)} | ${r.khu_vuc}`);
  });
  console.log(`\n📝 30 bài viết Bảng Tin`);
  console.log(`\n🔑 Password: ${PASSWORD} (tất cả)`);
}

main().catch(console.error);
