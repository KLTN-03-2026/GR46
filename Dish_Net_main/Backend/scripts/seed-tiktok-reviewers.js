/**
 * Seed 20 kênh TikTok food reviewer nổi tiếng Đà Nẵng
 * la_nha_sang_tao = 1, trang_thai_kiem_tien_noi_dung = 'da_duyet'
 * Mỗi kênh có 3 bài viết review gắn link món thật
 * Chạy: node scripts/seed-tiktok-reviewers.js
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'seed_tiktok_reviewers.sql');
const CREDS_FILE = path.join(OUTPUT_DIR, 'credentials_tiktok.txt');
const PASSWORD = 'admin123';
const SALT_ROUNDS = 10;

// ============================================================
// 20 KÊNH TIKTOK FOOD REVIEWER ĐÀ NẴNG
// ============================================================
const TIKTOKERS = [
  {
    username: 'tuandidau',
    name: 'Tuấn Đi Đâu',
    phone: '0911201001',
    gender: 'nam',
    dob: '1996-05-15',
    bio: 'Ăn vặt, quán local, hải sản Đà Nẵng 🍜 | Nói chuyện gần gũi, review chân thật | TikTok nổi bật khu vực miền Trung',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.9,
    followers: 185000,
  },
  {
    username: 'ghiendanang',
    name: 'Ghiền Đà Nẵng',
    phone: '0911201002',
    gender: 'nu',
    dob: '1997-09-22',
    bio: 'Kênh chuyên du lịch + food review Đà Nẵng 🌊 | ~200k followers | Nhiều clip viral về quán ăn địa phương',
    khu_vuc: 'Sơn Trà, Đà Nẵng',
    diem_uy_tin: 4.9,
    followers: 203000,
  },
  {
    username: 'haiwanderlust',
    name: 'Hải Wanderlust',
    phone: '0911201003',
    gender: 'nam',
    dob: '1994-03-10',
    bio: 'Review món ăn + quán hot + văn hóa địa phương 🎬 | Nội dung chỉn chu, cinematic | KOLs Booking',
    khu_vuc: 'Ngũ Hành Sơn, Đà Nẵng',
    diem_uy_tin: 4.8,
    followers: 156000,
  },
  {
    username: 'danangangii',
    name: 'Đà Nẵng Ăn Gì',
    phone: '0911201004',
    gender: 'nu',
    dob: '1999-11-03',
    bio: 'Mỗi ngày một quán mới tại Đà Nẵng 🗺️ | Hỏi ăn gì? Tìm đến trang này! | 120k TikTok followers',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.7,
    followers: 122000,
  },
  {
    username: 'ansapdanang',
    name: 'Ăn Sập Đà Nẵng',
    phone: '0911201005',
    gender: 'nam',
    dob: '1995-07-07',
    bio: 'Ăn xuyên ngày đêm tại Đà Nẵng 🔥 | Review không né, chê thẳng khen thật | Top 10 food account ĐN',
    khu_vuc: 'Cẩm Lệ, Đà Nẵng',
    diem_uy_tin: 4.8,
    followers: 98000,
  },
  {
    username: 'danangfoodtour',
    name: 'DaNang Food Tour',
    phone: '0911201006',
    gender: 'nam',
    dob: '1992-01-18',
    bio: 'Dẫn tour ẩm thực Đà Nẵng cho khách du lịch 🧳 | Food tour guide chuyên nghiệp | English & Vietnamese',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.9,
    followers: 87000,
  },
  {
    username: 'danangfoodie',
    name: 'Đà Nẵng Foodie',
    phone: '0911201007',
    gender: 'nu',
    dob: '1998-04-25',
    bio: 'Foodie thuần chủng Đà Nẵng 🍽️ | Review cả quán sang lẫn quán bình dân | Aesthetic content',
    khu_vuc: 'Ngũ Hành Sơn, Đà Nẵng',
    diem_uy_tin: 4.7,
    followers: 73000,
  },
  {
    username: 'anvatdanang',
    name: 'Ăn Vặt Đà Nẵng',
    phone: '0911201008',
    gender: 'nu',
    dob: '2000-06-14',
    bio: 'Chuyên ăn vặt đường phố Đà Nẵng từ 15k-50k 🥡 | Budget food reviewer | Sinh viên friendly',
    khu_vuc: 'Liên Chiểu, Đà Nẵng',
    diem_uy_tin: 4.6,
    followers: 145000,
  },
  {
    username: 'mammamdanang',
    name: 'Mắm Mắm Đà Nẵng',
    phone: '0911201009',
    gender: 'nu',
    dob: '1996-08-30',
    bio: 'Yêu ẩm thực miền Trung, đặc biệt các món có mắm 🦐 | Review authentic, không PR bừa',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.7,
    followers: 61000,
  },
  {
    username: 'reviewdanangcotam',
    name: 'Review Đà Nẵng Có Tâm',
    phone: '0911201010',
    gender: 'nam',
    dob: '1993-12-05',
    bio: 'Review ẩm thực CÓ TÂM, không nhận tiền để review ảo ✅ | Tin tưởng là trang không bán review',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 5.0,
    followers: 178000,
  },
  {
    username: 'bungdoidanang',
    name: 'Bụng Đói Đà Nẵng',
    phone: '0911201011',
    gender: 'nam',
    dob: '1997-02-19',
    bio: 'Luôn ở trạng thái "bụng đói" 😂 | Review lúc đói nên chưa bao giờ thất vọng | Vui là chính',
    khu_vuc: 'Sơn Trà, Đà Nẵng',
    diem_uy_tin: 4.5,
    followers: 54000,
  },
  {
    username: 'hoinghienandanang',
    name: 'Hội Nghiện Ăn Đà Nẵng',
    phone: '0911201012',
    gender: 'nu',
    dob: '1998-10-08',
    bio: 'Cộng đồng yêu ăn tại Đà Nẵng 👥 | Share địa điểm ăn ngon mỗi ngày | 250k thành viên group FB',
    khu_vuc: 'Cẩm Lệ, Đà Nẵng',
    diem_uy_tin: 4.8,
    followers: 220000,
  },
  {
    username: 'angidaydn',
    name: 'Ăn Gì Đây ĐN',
    phone: '0911201013',
    gender: 'nu',
    dob: '2001-03-27',
    bio: 'Không biết ăn gì? Vào đây! 🤔➡️😋 | Gợi ý quán ăn theo từng tâm trạng & ngân sách',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.6,
    followers: 67000,
  },
  {
    username: 'foodtourdathanh',
    name: 'Food Tour Đà Thành',
    phone: '0911201014',
    gender: 'nam',
    dob: '1991-05-11',
    bio: 'Hành trình khám phá ẩm thực Đà Thành từ 2015 🗺️ | Lịch sử & văn hóa sau mỗi món ăn',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.9,
    followers: 93000,
  },
  {
    username: 'nghienhaisandanang',
    name: 'Nghiện Hải Sản Đà Nẵng',
    phone: '0911201015',
    gender: 'nam',
    dob: '1990-07-16',
    bio: 'Nghiện hải sản không cai được 🦞🦀🐟 | Review các quán hải sản Mân Thái, Sơn Trà, Mỹ Khê',
    khu_vuc: 'Sơn Trà, Đà Nẵng',
    diem_uy_tin: 4.8,
    followers: 112000,
  },
  {
    username: 'localfooddanang',
    name: 'Local Food Đà Nẵng',
    phone: '0911201016',
    gender: 'nu',
    dob: '1995-09-01',
    bio: 'Chỉ review quán LOCAL, không nhà hàng chain 🏠 | Ủng hộ quán ăn gia đình Đà Nẵng',
    khu_vuc: 'Liên Chiểu, Đà Nẵng',
    diem_uy_tin: 4.7,
    followers: 84000,
  },
  {
    username: 'danangchilleat',
    name: 'Đà Nẵng Chill & Eat',
    phone: '0911201017',
    gender: 'nu',
    dob: '1999-12-20',
    bio: 'Ăn ngon + không gian chill = combo hoàn hảo ☕🍜 | Review quán vừa ngon vừa có view đẹp',
    khu_vuc: 'Ngũ Hành Sơn, Đà Nẵng',
    diem_uy_tin: 4.6,
    followers: 58000,
  },
  {
    username: 'anngapmatdanang',
    name: 'Ăn Ngập Mặt Đà Nẵng',
    phone: '0911201018',
    gender: 'nam',
    dob: '1993-04-08',
    bio: 'Ăn cho đến khi ngập mặt mới thôi 😅 | Chuyên review quán có phần ăn nhiều, giá rẻ, no lâu',
    khu_vuc: 'Cẩm Lệ, Đà Nẵng',
    diem_uy_tin: 4.5,
    followers: 76000,
  },
  {
    username: 'danangstreetfood',
    name: 'Đà Nẵng Street Food',
    phone: '0911201019',
    gender: 'nam',
    dob: '1994-11-28',
    bio: 'Street food hunter Đà Nẵng 🛵 | Xe đẩy, gánh hàng rong, quán cóc — tất cả đều được review',
    khu_vuc: 'Thanh Khê, Đà Nẵng',
    diem_uy_tin: 4.8,
    followers: 134000,
  },
  {
    username: 'dianvoimi',
    name: 'Đi Ăn Với Mị – Đà Nẵng',
    phone: '0911201020',
    gender: 'nu',
    dob: '2000-01-15',
    bio: 'Đi ăn cùng Mị nha 🥰 | Review theo kiểu kể chuyện, có cảm xúc | Vibe Đà Nẵng chân thật nhất',
    khu_vuc: 'Hải Châu, Đà Nẵng',
    diem_uy_tin: 4.9,
    followers: 167000,
  },
];

// ============================================================
// 60 BÀI VIẾT (3 bài/kênh) — gắn link món thật
// store_id sẽ lấy từ DB thực tế qua subquery
// ============================================================
// Mỗi entry: [store_offset, noi_dung, so_sao, extra_views]
const POST_TEMPLATES = [
  // Ăn sáng
  [
    `Sáng nay mình ghé ăn bún mì Quảng tại một quán quen ở Đà Nẵng và thực sự không thể ngừng ăn 😍 Sợi mì dai, nước dùng trong vắt thơm lừng mùi tôm tươi, thêm chút bánh tráng nướng ăn kèm — ngon đúng điệu miền Trung. Quán giữ nguyên công thức từ những năm 90, không bao giờ thay đổi. Ai đến Đà Nẵng nhớ ghé thử nhé! 🙌`,
    5, 8500
  ],
  [
    `Review quán cơm gà Đà Nẵng này sau 3 lần ghé thử: lần nào cũng đông, lần nào cũng ngon! 🍗 Gà ta thả vườn, da giòn, thịt ngọt tự nhiên. Cơm nấu nước cốt gà, vàng ươm, từng hạt rời. Chấm thêm nước mắm gừng là hết nói. Giá 55k/phần — quá hợp lý với chất lượng này. Có mặt lúc 11h là tốt nhất vì hay hết sớm!`,
    4.5, 6700
  ],
  [
    `Hôm nay thử cơm tấm kiểu miền Nam nhưng có biến tấu đặc trưng của ĐN 🍛 Sườn non nướng than hoa, ăn kèm bì sợi, chả trứng hấp và dưa cải muối chua. Nước mắm pha đậm đà vừa ăn. Phần ăn khá lớn, 65k mà no cả buổi chiều. Quán có điều hòa, phù hợp để ăn trưa văn phòng. Recommend 4.5/5! ⭐`,
    4.5, 5200
  ],
  // Ăn trưa
  [
    `Bún bò Huế mà lại ăn ở Đà Nẵng ngon hơn cả Huế?? 🤔 Nghe lạ nhưng mình dám cam đoan quán này làm nước dùng không thua gì bà nội Huế nấu. Xương heo hầm 12 tiếng, mắm ruốc đúng vị, sợi bún to tròn dai dai. Thêm giò heo, huyết tươi, chả cua là chuẩn vị! Đây là top 3 bún bò ĐN của mình. 🏆`,
    5, 11200
  ],
  [
    `Mì Quảng ĐÚNG CHUẨN phải ăn ở quán này! 🍜 Chả viên làm thủ công mỗi buổi sáng, tôm tươi không đông lạnh, nhân của nước nhưng không loãng. Ăn kèm bánh tráng nướng than, rau sống xanh mướt. 45k một tô đủ no, 60k tô lớn no căng. Đây là hương vị mì Quảng mình tìm kiếm bao năm nay rồi 😭`,
    5, 9800
  ],
  [
    `Ghé thử bánh xèo Đà Nẵng lần đầu mà mê luôn! 🥞 Vỏ bánh mỏng giòn, nhân tôm thịt đầy ắp, ăn kèm lá cải xanh cuốn tròn. Chấm nước mắm chua ngọt pha thêm tỏi ớt — ngon không thể diễn tả bằng lời. Quán nhỏ, chỉ 8 bàn nhưng lúc nào cũng đông khách. Giá 35k/cái, ăn 2 cái là no. Worth every penny! 💯`,
    5, 7600
  ],
  // Hải sản
  [
    `Hải sản Sơn Trà tối qua — bữa ăn đáng nhớ nhất tháng này 🦞 Cua biển to bằng cái nón, nướng mọi vừa chín tới, thịt ngọt bùi. Ghẹ rang muối ớt giòn giòn. Cá mú hấp gừng tươi không tanh một chút nào. Bill 4 người 850k — siêu rẻ so với chất lượng! Địa chỉ mình sẽ quay lại mỗi tuần từ nay 🙏`,
    5, 15600
  ],
  [
    `Review thật lòng quán hải sản giá bình dân ở Đà Nẵng 🦐 Tôm sú hấp bia còn nhảy tanh tách, bạch tuộc nướng mỡ hành thơm nức, mực chiên bơ tỏi giòn tan. Phần ăn 2 người 320k bao no. View nhìn ra sông Hàn lung linh buổi tối. Nhược điểm duy nhất là chỗ ngồi hơi chật khi đông. Overall 4.5/5 ⭐`,
    4.5, 8900
  ],
  [
    `Bữa hải sản cuối tuần cùng gia đình tại Mỹ Khê 🌊 Ba chọn quán này vì quen chủ từ hồi còn nhỏ, và mình hiểu tại sao ổng thích — cua, tôm, ốc tươi rói mua từ thuyền buổi sáng. Ốc hương xào tỏi ăn với bánh mì nóng là combo thần thánh. Giá cả phải chăng, không chặt chém khách. 10/10 sẽ recommend!`,
    5, 7200
  ],
  // Ăn tối / Quán ngon
  [
    `Nếu bạn chỉ có 1 bữa ở Đà Nẵng, hãy ăn ở quán này! 🌟 Nem lụi nướng than, chấm tương đậu phộng béo ngậy, ăn kèm rau sống và bánh tráng mỏng cuốn. Đây là tinh hoa ẩm thực miền Trung mà không phải quán nào cũng làm ngon được. Khi ăn phải nhớ cuốn đủ các loại rau thơm mới đúng điệu nhé! Giá 45k/phần.`,
    5, 12400
  ],
  [
    `Pizza Đà Nẵng mà ngon hơn cả Italy thì sao?? 😂 Đùa thôi nhưng cái pizza này thực sự nằm trong top 5 pizza ngon nhất mình từng ăn. Vỏ mỏng giòn, pho mát kéo sợi ở tầng thứ 3, hải sản tươi không tanh. Quán decor kiểu châu Âu, nhạc acoustic nhẹ nhàng. Date night perfect! Từ 150-280k/cái. Book bàn trước nhé 📞`,
    4.5, 6100
  ],
  [
    `Cuối tuần phải thử buffet lẩu Thái này ở Đà Nẵng 🍲 Nước lẩu Tom Yum chuẩn vị Thái, chua cay vừa phải. Hải sản tươi tự lấy không giới hạn, rau sống đa dạng. Tráng miệng có kem và trái cây. Giá 189k/người (tối cuối tuần). Ăn đủ 2 tiếng mới xứng đáng nhé! Mình ghé lần 3 rồi và vẫn thấy value for money! 🔥`,
    4.5, 8300
  ],
  // Đồ uống / Cà phê
  [
    `Cà phê Đà Nẵng sáng sớm nhìn ra sông Hàn — không nơi nào bằng ☕🌅 Quán này pha cà phê phin truyền thống, đậm đà, không chua, uống xong tỉnh táo cả ngày. Bánh mì kẹp trứng ốp la ăn kèm 25k ngon khỏi bàn. Giá cà phê từ 20-35k. Phục vụ nhanh, thái độ tốt. Đây là quán sáng quen của mình mỗi cuối tuần 🙏`,
    5, 5400
  ],
  [
    `Bún thịt nướng chiều tà 🌇 Mình hay ghé ăn sau giờ làm, quán nhỏ nhưng bà chủ nướng thịt bằng than hoa thơm lừng cả con hẻm. Bún gạo Đà Nẵng dai dai, rau sống tươi, đồ chua ngon, nước mắm pha vừa ăn. 40k một tô no vừa, uống thêm trà đá miễn phí. Đây là định nghĩa của "bữa ăn hoàn hảo sau giờ làm" 😌`,
    4.5, 6800
  ],
  [
    `Bánh canh cá lóc Đà Nẵng — lần đầu ăn nhưng nghiện luôn rồi 🐟 Nước dùng ngọt từ xương cá, sợi bánh canh bột gạo to dày, cá lóc phi lê tươi không có mùi tanh. Thêm chút hành phi và tiêu đen là hoàn hảo. Quán bán từ 6h sáng đến 10h là hết, muốn ăn phải đi sớm. 45k/tô. Highly recommend cho ai thích ăn sáng thanh nhẹ! 🌿`,
    5, 9100
  ],
  // Tổng hợp thêm cho đủ 60
  [
    `Chả cá Đà Nẵng khác Hà Nội ở chỗ này nè 🐠 Cá được ướp nghệ tươi, nướng than, ăn kèm bún, rau thơm và mắm tôm. Không có chảo chiên sôi kiểu Hà Nội nhưng vị nguyên bản hơn, ngọt hơn, ít tanh hơn. Mình review 5 quán chả cá ĐN và đây là quán giữ được hương vị chuẩn nhất. 65k/phần. 5 sao không do dự! 🌟`,
    5, 7700
  ],
  [
    `Cao lầu Hội An nhưng ăn ở Đà Nẵng ngon không kém 🍜 Quán này học nghề từ Hội An về mở, sợi mì vàng sóng sánh với tương ớt, thịt xá xíu mềm tan, bánh đa giòn tan. Nước chan đậm vị ngũ vị hương đặc trưng. 55k/tô. Nếu không có thời gian ra Hội An thì ăn ở đây là giải pháp tuyệt vời! 👌`,
    4.5, 6300
  ],
  [
    `Kem đá bào Đà Nẵng trưa hè — cứu mạng hay gì á 🧊☀️ Mình review quán này vì thấy khách local hay ghé, không phải quán trên Google Maps có nhiều review ảo. Đá bào mịn, topping đa dạng: đậu đỏ, thạch café, chè đậu xanh, sầu riêng. 25-40k/ly to. Ngồi trong quán mát lạnh, nhìn phố xá Đà Nẵng — không muốn về luôn!`,
    4.5, 5900
  ],
  [
    `Gỏi cá Nam Ô — đặc sản Đà Nẵng PHẢI THỬ 🐟 Cá cơm tươi bắt từ biển Nam Ô, gỏi sống với khế chua, vừng rang, bánh tráng, rau thơm. Nước chấm mắm gừng đặc biệt. Ăn một lần là không quên được. Quán nhỏ ngoài làng Nam Ô, không có trên app giao đồ ăn nào hết — phải tự ghé mới ngon! 70k/đĩa.`,
    5, 13500
  ],
  [
    `Phở bò Đà Nẵng kiểu gì mà ăn không thua phố Hà Nội vậy? 🍲 Xương hầm 8 tiếng, nước dùng trong vắt thơm mùi quế hồi, thịt bò tái chín vừa, bánh phở mỏng dai. Hành tây, ngò gai tươi, tương đen tương đỏ ăn kèm. 55k/tô lớn. Quán mở từ 5h30 sáng, gần chợ Cồn. Muốn ăn ngon nhớ đến sớm!`,
    5, 8200
  ],
];

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Đang hash password...');
  const hashedPassword = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  let sql = `-- ============================================================
-- Seed 20 kênh TikTok food reviewer nổi tiếng Đà Nẵng
-- trang_thai_kiem_tien_noi_dung = 'da_duyet'
-- Mỗi kênh 3 bài viết review gắn link món + nút Đặt món
-- ============================================================

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa cũ nếu có (chạy lại an toàn)
DELETE FROM nguoi_dung
WHERE ten_dang_nhap IN (${TIKTOKERS.map(r => `'${r.username}'`).join(', ')});

-- ============================================================
-- INSERT 20 tài khoản TikTok reviewer
-- ============================================================
INSERT INTO nguoi_dung (
  ten_dang_nhap, email, so_dien_thoai, mat_khau_bam,
  ten_hien_thi, anh_dai_dien, gioi_tinh, ngay_sinh,
  tieu_su, dia_chi, khu_vuc,
  diem_uy_tin, la_nha_sang_tao,
  trang_thai_kiem_tien_noi_dung,
  trang_thai_tai_khoan, nguon_dang_ky,
  thoi_gian_xac_thuc_email, ngay_tao, ngay_cap_nhat
) VALUES\n`;

  const accountRows = TIKTOKERS.map((r, i) => {
    const daysAgo = 90 + i * 10;
    return `  ('${r.username}', '${r.username}@gmail.com', '${r.phone}', '${hashedPassword}',
   '${r.name}', 'https://i.pravatar.cc/150?u=${r.username}tiktok',
   '${r.gender}', '${r.dob}',
   '${r.bio.replace(/'/g, "\\'")}',
   '${r.khu_vuc}', '${r.khu_vuc}',
   ${r.diem_uy_tin}, 1,
   'da_duyet',
   'hoat_dong', 'email',
   DATE_SUB(NOW(), INTERVAL ${daysAgo} DAY),
   DATE_SUB(NOW(), INTERVAL ${daysAgo} DAY),
   DATE_SUB(NOW(), INTERVAL ${daysAgo} DAY))`;
  });

  sql += accountRows.join(',\n') + ';\n\n';

  // ============================================================
  // Xóa bài viết cũ của các kênh này (nếu chạy lại)
  // ============================================================
  sql += `-- Xóa bài viết cũ của các kênh này
DELETE bv FROM bai_viet bv
JOIN nguoi_dung nd ON nd.id = bv.id_nguoi_dang
WHERE nd.ten_dang_nhap IN (${TIKTOKERS.map(r => `'${r.username}'`).join(', ')});

`;

  // ============================================================
  // INSERT bài viết — mỗi kênh 3 bài
  // link_mon_an trỏ đến /explore/store/{id} (lấy store thứ N từ DB)
  // ============================================================
  sql += `-- ============================================================
-- INSERT 60 bài viết review gắn link món (3 bài/kênh)
-- Link trỏ đến trang cửa hàng thực tế trong DB
-- ============================================================
INSERT INTO bai_viet (
  id_nguoi_dang,
  id_cua_hang, loai_bai_viet, id_bai_viet_goc, id_mon_an, id_don_hang,
  noi_dung, so_sao, link_mon_an,
  muc_do_hien_thi, trang_thai_duyet, bat_kiem_tien,
  tong_luot_xem, tong_luot_thich, tong_luot_binh_luan,
  tong_luot_chia_se, tong_luot_luu,
  ngay_dang
) VALUES\n`;

  const postRows = [];
  let templateIdx = 0;

  TIKTOKERS.forEach((reviewer, reviewerIdx) => {
    // Mỗi reviewer đăng 3 bài
    for (let postNum = 0; postNum < 3; postNum++) {
      const tmpl = POST_TEMPLATES[templateIdx % POST_TEMPLATES.length];
      templateIdx++;

      const [content, stars, extraViews] = tmpl;
      const storeOffset = (reviewerIdx * 3 + postNum) % 30; // xoay vòng qua 30 store đầu tiên
      const daysAgo = Math.floor(Math.random() * 20) + 1;

      const views = extraViews + Math.floor(Math.random() * 1000);
      const likes = Math.floor(views * 0.15);
      const comments = Math.floor(views * 0.03);
      const shares = Math.floor(views * 0.05);
      const saves = Math.floor(views * 0.08);

      // link_mon_an: dùng subquery lấy store_id thứ N từ DB
      const safeContent = String(content).replace(/'/g, "\\'");

      postRows.push(
        `  ((SELECT id FROM nguoi_dung WHERE ten_dang_nhap = '${reviewer.username}'),
   (SELECT id FROM cua_hang ORDER BY id LIMIT 1 OFFSET ${storeOffset}),
   'review', NULL,
   (SELECT id FROM mon_an WHERE id_cua_hang = (SELECT id FROM cua_hang ORDER BY id LIMIT 1 OFFSET ${storeOffset}) LIMIT 1),
   NULL,
   '${safeContent}',
   ${stars},
   (SELECT CONCAT('/explore/store/', id) FROM cua_hang ORDER BY id LIMIT 1 OFFSET ${storeOffset}),
   'cong_khai', 'hien_thi', 1,
   ${views}, ${likes}, ${comments}, ${shares}, ${saves},
   DATE_SUB(NOW(), INTERVAL ${daysAgo} DAY))`
      );
    }
  });

  sql += postRows.join(',\n') + ';\n\n';

  sql += `SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Kiểm tra
-- ============================================================
SELECT
  nd.ten_dang_nhap,
  nd.ten_hien_thi,
  nd.trang_thai_kiem_tien_noi_dung,
  nd.la_nha_sang_tao,
  COUNT(bv.id) AS so_bai_viet
FROM nguoi_dung nd
LEFT JOIN bai_viet bv ON bv.id_nguoi_dang = nd.id
WHERE nd.ten_dang_nhap IN (${TIKTOKERS.map(r => `'${r.username}'`).join(', ')})
GROUP BY nd.id
ORDER BY nd.diem_uy_tin DESC;
`;

  fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');

  // Credentials file
  let creds = `========================================\n`;
  creds += `20 Kênh TikTok Food Reviewer Đà Nẵng\n`;
  creds += `Password: ${PASSWORD}\n`;
  creds += `========================================\n\n`;
  TIKTOKERS.forEach((r, i) => {
    creds += `${String(i + 1).padStart(2)}. ${r.name}\n`;
    creds += `    Username : ${r.username}\n`;
    creds += `    Email    : ${r.username}@gmail.com\n`;
    creds += `    Password : ${PASSWORD}\n`;
    creds += `    TikTok   : ${r.followers.toLocaleString()} followers\n`;
    creds += `    Bio      : ${r.bio.substring(0, 60)}...\n\n`;
  });

  fs.writeFileSync(CREDS_FILE, creds, 'utf8');

  console.log(`\n✅ Đã tạo: ${OUTPUT_FILE}`);
  console.log(`✅ Credentials: ${CREDS_FILE}`);
  console.log(`\n📋 20 kênh TikTok reviewer:\n`);
  TIKTOKERS.forEach((r, i) => {
    const follow = r.followers >= 100000
      ? `${(r.followers / 1000).toFixed(0)}K` : `${r.followers.toLocaleString()}`;
    console.log(`${String(i + 1).padStart(2)}. ${r.name.padEnd(28)} | @${r.username.padEnd(22)} | ${follow} followers`);
  });
  console.log(`\n📝 60 bài viết review (3 bài/kênh) — gắn link món + nút Đặt món`);
  console.log(`💰 trang_thai_kiem_tien_noi_dung = 'da_duyet' (đã nâng cấp kiếm tiền)`);
  console.log(`🔑 Password: ${PASSWORD}`);
}

main().catch(console.error);
