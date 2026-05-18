/**
 * Seed review cho tất cả cửa hàng
 * Tạo: 25 tài khoản buyer + đơn hàng hoàn tất + review thực tế
 * Chạy: node scripts/seed-reviews.js
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'seed_reviews.sql');
const PASSWORD = 'user123';
const SALT_ROUNDS = 10;

// =============================================
// 25 TÀI KHOẢN MUA HÀNG GIẢ
// =============================================
const BUYERS = [
  { username: 'nguyenthilan', name: 'Nguyễn Thị Lan', phone: '0901234001', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=nguyenthilan' },
  { username: 'tranthanhminh', name: 'Trần Thanh Minh', phone: '0901234002', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=tranthanhminh' },
  { username: 'lephuongthao', name: 'Lê Phương Thảo', phone: '0901234003', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=lephuongthao' },
  { username: 'phamvanhung', name: 'Phạm Văn Hùng', phone: '0901234004', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=phamvanhung' },
  { username: 'hoangmylinh', name: 'Hoàng Mỹ Linh', phone: '0901234005', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=hoangmylinh' },
  { username: 'vutrunghieu', name: 'Vũ Trung Hiếu', phone: '0901234006', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=vutrunghieu' },
  { username: 'doanngochan', name: 'Đoàn Ngọc Hân', phone: '0901234007', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=doanngochan' },
  { username: 'buiducmanh', name: 'Bùi Đức Mạnh', phone: '0901234008', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=buiducmanh' },
  { username: 'ngothikimchi', name: 'Ngô Thị Kim Chi', phone: '0901234009', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=ngothikimchi' },
  { username: 'lyminhduc', name: 'Lý Minh Đức', phone: '0901234010', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=lyminhduc' },
  { username: 'trangthuhuong', name: 'Trang Thu Hương', phone: '0901234011', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=trangthuhuong' },
  { username: 'nguyenquocbao', name: 'Nguyễn Quốc Bảo', phone: '0901234012', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=nguyenquocbao' },
  { username: 'vuongthithu', name: 'Vương Thị Thu', phone: '0901234013', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=vuongthithu' },
  { username: 'dangvietdung', name: 'Đặng Việt Dũng', phone: '0901234014', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=dangvietdung' },
  { username: 'diemquynh2001', name: 'Diễm Quỳnh', phone: '0901234015', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=diemquynh2001' },
  { username: 'haotienwang', name: 'Hào Tiến', phone: '0901234016', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=haotienwang' },
  { username: 'nguyenbichvan', name: 'Nguyễn Bích Vân', phone: '0901234017', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=nguyenbichvan' },
  { username: 'trandinhtoan', name: 'Trần Đình Toàn', phone: '0901234018', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=trandinhtoan' },
  { username: 'maianhtu', name: 'Mai Anh Tú', phone: '0901234019', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=maianhtu' },
  { username: 'phanngocbich', name: 'Phan Ngọc Bích', phone: '0901234020', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=phanngocbich' },
  { username: 'luongvanson', name: 'Lương Văn Sơn', phone: '0901234021', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=luongvanson' },
  { username: 'truongthungan', name: 'Trương Thu Ngân', phone: '0901234022', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=truongthungan' },
  { username: 'caovanha', name: 'Cao Văn Hà', phone: '0901234023', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=caovanha' },
  { username: 'dinhthuyduong', name: 'Đinh Thùy Dương', phone: '0901234024', gender: 'nu', avatar: 'https://i.pravatar.cc/150?u=dinhthuyduong' },
  { username: 'phungminhkhoa', name: 'Phùng Minh Khoa', phone: '0901234025', gender: 'nam', avatar: 'https://i.pravatar.cc/150?u=phungminhkhoa' },
];

// =============================================
// TEMPLATE REVIEW THỰC TẾ
// =============================================
const REVIEWS = {
  5: [
    'Quán ngon tuyệt vời! Mình order lần đầu mà không thể cưỡng lại được, vị đậm đà chuẩn, phục vụ nhanh. Chắc chắn sẽ quay lại ủng hộ 🥰',
    'Đồ ăn ngon lắm luôn, mình đã ăn ở đây nhiều lần rồi chưa bao giờ thất vọng. Giá cả hợp lý, nhân viên thân thiện. 5 sao xứng đáng!',
    'Chuẩn vị quá trời! Mới ăn lần đầu mà thấy ngay tại sao quán này đông khách. Giao hàng cũng nhanh, đồ ăn còn nóng hổi.',
    'Tuyệt vời, mình giới thiệu cho cả nhóm bạn cùng order. Ai cũng khen ngon! Phần ăn đầy đủ, không bị thiếu hay nhầm món.',
    'Quán quen của mình rồi, tuần nào cũng phải ghé ít nhất 1 lần. Ngon, sạch, giá phải chăng. Không có gì để chê hết 😍',
    'Lần đầu thử theo review của bạn bè, ăn xong phải lên đây review ngay. Ngon hơn mình tưởng nhiều! Nhất là nước dùng, rất đậm đà.',
    'Phần ăn to, ngon, giá hợp lý. Giao đúng giờ. Thái độ phục vụ tốt. Chưa thấy gì để phàn nàn cả. Mình sẽ order thêm nhiều lần nữa!',
    'Ăn là ghiền luôn á, mùi thơm từ khi mở hộp ra đã thấy ngon rồi. Gia vị vừa miệng, không quá mặn cũng không nhạt. 10/10!',
  ],
  4: [
    'Ngon, mình thích lắm. Chỉ hơi đông khách nên phải chờ thêm chút nhưng nhìn chung vẫn ok. Sẽ order lại.',
    'Đồ ăn ngon, đúng vị. Hơi tiếc là phần ăn hơi nhỏ so với giá tiền nhưng chất lượng thì ok. 4 sao nhé!',
    'Quán ổn, mình ăn được. Nhân viên vui vẻ, phục vụ nhanh nhẹn. Nếu cải thiện thêm phần đó thì sẽ cho 5 sao liền.',
    'Lần đầu thử, thấy khá ngon. Chưa ăn đủ món để đánh giá hết nhưng món mình chọn hôm nay rất vừa miệng.',
    'Nhìn chung tốt, đặc biệt là đồ ăn tươi ngon. Có lẽ lần sau mình sẽ thử thêm vài món khác xem thế nào.',
    'Cơ bản là ngon và đáng tiền. Giao hàng đúng giờ, đóng gói cẩn thận. Mình hài lòng, sẽ quay lại.',
  ],
  3: [
    'Ăn được, không có gì đặc biệt lắm. Vị bình thường, giá hơi cao so với phần ăn. Phục vụ ok thôi.',
    'Tạm ổn, mình thấy không ngon bằng hôm trước. Có thể hôm nay bếp khác chăng. Sẽ thử thêm lần nữa mới đánh giá.',
    'Trung bình, ăn được nhưng không quá xuất sắc. Giao hàng hơi chậm so với dự kiến nhưng không sao lắm.',
  ],
};

// =============================================
// TẤT CẢ STORE USERNAMES (54 + 30 quán)
// =============================================
const ALL_STORES = [
  'quanbunbohuebatuyet','myquangech1a','phohoangondanang','quanbunchacamamruocbaloan',
  'comgababuoi','nhahanghaisanbeman','comtamsaigondanang','banhxeobaduong',
  'laubonhungdamhoangkim','nemnuongbangahoavang','banhmibalanngonnuctieng',
  'banhcanhcothucaloc','thecoffeehousedanang','gongchadanang','trasuatocotocodanang',
  'pizzahomedanang','garankfcdanangdongda','myquangbamua','caolauhoiangiualongdanang',
  'che3coemchengondanang','chaolongbasaudanang','xoichebahanhngonre','botaichanhsontra',
  'quanocbiendemmykhe','bunthitnuongmientrungcoba','hutieunamvangsaigondanang',
  'sushisashiminhatngondanang','comnieusaigondanang','launamchaytinhtam',
  'banhtrangcuonthitheodanang','bbqnuongbepthanhong','dimsumtrunghoaminhchau',
  'quancombinhdanminhphu','bundaumamtomhanoidanang','goicuontomthitthanhbinh',
  'laudebinhdinhhuongque','banhcuonthanhtribahuong','nuoceptraicaytuoithanhxuan',
  'bunbohuemethuan','kemocquethomlungdanang','vitquaymovangdanang',
  'quantrungnuonghoianpho','phoxaohaisanbiendong','banhtrangnuongbaut',
  'cacomkhonghecotu','bunmamconammientay','ganuongmatongphonglan',
  'tomchuanemchuabanohue','caphetrunghanoigiuadanang','bunthaiboviensaigon',
  'miquangnammientrung','banhmiphuonghoiandanang','lauhaisansontraseaside',
  'bepmemientrungquanngon',
  // Hòa Khánh
  'banhmichilanhoakhanh','bunbomehoahoakhanh','phogabahoalienchieu',
  'banhcuoncothanhhoakhanh','xoisangcongahoakhanh','chaotrangbatulienchieu',
  'myquangcotamhoakhanh','bunrieuconamlienchieu','banhbeochenbasauhoakhanh',
  'hutieubokhosanghoakhanh','banhuotthitnuongcolien','phoboanhtuanlienchieu',
  'comtamsuonbichasanghoakhanh','banhcanhchacabaminhlienchieu','bunchahanoicohuonghoakhanh',
  'bunthitnuongcoduyenhoakhanh','xoigaladuacovan','bunsuamamruoccobalienchieu',
  'caphesangbabayhoakhanh','banhmiquedananghoakhanh','miquangbaphuochoakhanh',
  'comnhabachienlienchieu','bundausangcohahoakhanh','banhtetlachuoibalanh',
  'phoxaosanghoakhanhanhduc','chaolongheobatuyetlienchieu','banhmipatechuhunghoakhanh',
  'bunbonambosanghoakhanh','hutieumybaloanlienchieu','banhitlagaicoxuanlienchieu',
];

function esc(str) {
  if (str == null) return 'NULL';
  return `'${String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function getRandReview(starRating) {
  const pool = REVIEWS[starRating] || REVIEWS[5];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Mỗi quán: 4-6 review, phân bổ sao thực tế (chủ yếu 4-5 sao)
function getStarDistribution() {
  const dist = [];
  const count = 4 + Math.floor(Math.random() * 3); // 4-6
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.5) dist.push(5);
    else if (r < 0.8) dist.push(4);
    else if (r < 0.95) dist.push(3);
    else dist.push(4);
  }
  return dist;
}

// Ngày tạo ngẫu nhiên trong 6 tháng gần đây
function randDate() {
  const now = new Date('2026-05-16');
  const days = Math.floor(Math.random() * 180);
  const d = new Date(now.getTime() - days * 86400000);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Dang hash password cho buyers...');
  const pwHash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  const lines = [];
  lines.push('-- SEED REVIEW: buyers + orders + danh_gia');
  lines.push(`-- Tao luc: ${new Date().toLocaleString('vi-VN')}`);
  lines.push('');
  lines.push('SET NAMES utf8mb4;');
  lines.push('SET FOREIGN_KEY_CHECKS = 0;');
  lines.push('SET SQL_SAFE_UPDATES = 0;');
  lines.push('');

  // ===== 1. TẠO BUYER ACCOUNTS =====
  lines.push('-- ============================================================');
  lines.push('-- 1. TẠO 25 TÀI KHOẢN MUA HÀNG');
  lines.push('-- ============================================================');
  for (const b of BUYERS) {
    lines.push(`INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, anh_dai_dien, gioi_tinh, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin)`);
    lines.push(`VALUES (${esc(b.username)}, ${esc(b.username + '@gmail.com')}, ${esc(b.phone)}, ${esc(pwHash)}, ${esc(b.name)}, ${esc(b.avatar)}, ${esc(b.gender)}, 0, 0, 'hoat_dong', 'email', NOW(), 4.00);`);
  }
  lines.push('');

  // ===== 2. TẠO ĐƠN HÀNG + REVIEW CHO TỪNG QUÁN =====
  lines.push('-- ============================================================');
  lines.push('-- 2. TẠO ĐƠN HÀNG GIẢ + REVIEW CHO TỪNG QUÁN');
  lines.push('-- ============================================================');

  let orderCounter = 90001;
  let buyerIdx = 0;

  for (const storeUsername of ALL_STORES) {
    const stars = getStarDistribution();
    const avgStar = (stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(2);

    lines.push(`-- ----- ${storeUsername} (${stars.length} reviews, avg ${avgStar} sao) -----`);

    const orderIds = [];
    const buyerUsernames = [];

    for (let i = 0; i < stars.length; i++) {
      const buyer = BUYERS[buyerIdx % BUYERS.length];
      buyerIdx++;
      const orderCode = `DH-SEED-${orderCounter++}`;
      const orderDate = randDate();
      const total = (Math.floor(Math.random() * 10) + 1) * 50000 + 30000;

      lines.push(`SET @buyer_id_${orderCounter} = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = ${esc(buyer.username)} LIMIT 1);`);
      lines.push(`SET @store_id_${orderCounter} = (SELECT id FROM cua_hang WHERE id_chu_so_huu = (SELECT id FROM nguoi_dung WHERE ten_dang_nhap = ${esc(storeUsername)} LIMIT 1) LIMIT 1);`);
      lines.push(`INSERT INTO don_hang (ma_don_hang, id_nguoi_mua, id_cua_hang, nguoi_nhan, so_dien_thoai_nhan, dia_chi_giao, phuong_thuc_thanh_toan, trang_thai_don_hang, tam_tinh, phi_van_chuyen, tong_giam_gia, tong_thanh_toan, thu_nhap_cua_hang, hoa_hong_nen_tang, hoa_hong_nha_sang_tao, thoi_gian_dat, thoi_gian_hoan_tat)`);
      lines.push(`VALUES (${esc(orderCode)}, @buyer_id_${orderCounter}, @store_id_${orderCounter}, ${esc(buyer.name)}, ${esc(buyer.phone)}, ${esc('Đà Nẵng')}, 'tien_mat', 'hoan_tat', ${total}, 15000, 0, ${total + 15000}, ${Math.round((total + 15000) * 0.9)}, ${Math.round((total + 15000) * 0.1)}, 0, ${esc(orderDate)}, ${esc(orderDate)});`);
      lines.push(`SET @order_id_${orderCounter} = LAST_INSERT_ID();`);

      const reviewContent = getRandReview(stars[i]);
      lines.push(`INSERT INTO danh_gia (id_don_hang, id_nguoi_danh_gia, id_cua_hang, id_mon_an, so_sao, noi_dung, an_danh, tong_luot_thich, ngay_tao)`);
      lines.push(`VALUES (@order_id_${orderCounter}, @buyer_id_${orderCounter}, @store_id_${orderCounter}, NULL, ${stars[i]}, ${esc(reviewContent)}, 0, FLOOR(RAND()*15), ${esc(orderDate)});`);
      lines.push('');

      orderIds.push(orderCounter);
      buyerUsernames.push(buyer.username);
    }

    lines.push('');
  }

  // ===== 3. ĐỒNG BỘ TỔNG THỂ (dùng JOIN tránh lỗi 1093) =====
  lines.push('-- ============================================================');
  lines.push('-- 3. CẬP NHẬT diem_danh_gia VÀ tong_don_hang (bulk JOIN)');
  lines.push('-- ============================================================');

  // Cập nhật điểm đánh giá
  lines.push(`UPDATE cua_hang ch`);
  lines.push(`JOIN (`);
  lines.push(`  SELECT id_cua_hang, ROUND(AVG(so_sao), 2) AS avg_sao`);
  lines.push(`  FROM danh_gia GROUP BY id_cua_hang`);
  lines.push(`) dg_stats ON dg_stats.id_cua_hang = ch.id`);
  lines.push(`SET ch.diem_danh_gia = dg_stats.avg_sao;`);
  lines.push('');

  // Cập nhật tổng đơn hàng
  lines.push(`UPDATE cua_hang ch`);
  lines.push(`JOIN (`);
  lines.push(`  SELECT id_cua_hang, COUNT(*) AS cnt`);
  lines.push(`  FROM don_hang WHERE trang_thai_don_hang = 'hoan_tat' GROUP BY id_cua_hang`);
  lines.push(`) dh_stats ON dh_stats.id_cua_hang = ch.id`);
  lines.push(`SET ch.tong_don_hang = dh_stats.cnt;`);
  lines.push('');

  lines.push('SET FOREIGN_KEY_CHECKS = 1;');
  lines.push('SET SQL_SAFE_UPDATES = 1;');
  lines.push('');
  lines.push(`SELECT CONCAT('Tong don hang da tao: ', COUNT(*)) AS result FROM don_hang WHERE ma_don_hang LIKE 'DH-SEED-%';`);
  lines.push(`SELECT CONCAT('Tong review da tao: ', COUNT(*)) AS result FROM danh_gia;`);

  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8');
  console.log(`\nHOAN THANH!`);
  console.log(`SQL: ${OUTPUT_FILE}`);
  console.log(`- 25 buyer accounts (password: ${PASSWORD})`);
  console.log(`- ${ALL_STORES.length} quan x 4-6 reviews = ~${ALL_STORES.length * 5} don hang + review`);
}

main().catch(console.error);
