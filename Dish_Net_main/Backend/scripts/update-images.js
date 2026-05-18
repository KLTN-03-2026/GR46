/**
 * Tạo SQL UPDATE ảnh cho cua_hang và mon_an từ Unsplash
 * Chạy: node scripts/update-images.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'update_images.sql');

// =============================================
// MAP ẢNH THEO TỪ KHÓA MÓN ĂN (Unsplash IDs)
// =============================================
const DISH_IMAGES = [
  // PHỞ
  { keywords: ['phở', 'pho'], url: 'https://images.unsplash.com/photo-1582878826629-33b2ad7b3a7a?w=500&q=80' },
  // BÚN BÒ HUẾ
  { keywords: ['bún bò', 'bun bo'], url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&q=80' },
  // BÚN RIÊU / BÚN MẮM / BÚN SỨA / BÚN THÁI
  { keywords: ['bún riêu', 'bún mắm', 'bún sứa', 'bún thái', 'bún chả cá'], url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80' },
  // BÚN THỊT NƯỚNG / BÚN ĐẬU / BÚN CHẢ
  { keywords: ['bún thịt nướng', 'bún đậu', 'bún chả', 'bún nam bộ'], url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80' },
  // MỲ QUẢNG
  { keywords: ['mỳ quảng', 'mì quảng', 'my quang'], url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80' },
  // HỦ TIẾU / MỲ / MÌ
  { keywords: ['hủ tiếu', 'hu tieu', 'mỳ ', 'mì ', 'cao lầu', 'wonton'], url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80' },
  // BÁNH MÌ
  { keywords: ['bánh mì', 'banh mi'], url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=500&q=80' },
  // BÁNH CUỐN / BÁNH ƯỚT / BÁNH BÈO / BÁNH TRÁNG / BÁNH NẬM / BÁNH LỌC
  { keywords: ['bánh cuốn', 'bánh ướt', 'bánh bèo', 'bánh tráng', 'bánh nậm', 'bánh lọc', 'bánh ít', 'bánh canh'], url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80' },
  // BÁNH XÈO
  { keywords: ['bánh xèo'], url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80' },
  // CƠM TẤM
  { keywords: ['cơm tấm', 'com tam', 'sườn nướng', 'sườn bì chả'], url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80' },
  // CƠM GÀ / CƠM NIÊU / CƠM CHIÊN / CƠM NHÀ / CƠM SÁNG
  { keywords: ['cơm gà', 'cơm niêu', 'cơm chiên', 'cơm nhà', 'cơm sáng', 'cơm đĩa', 'cơm đặc biệt', 'cơm hến'], url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80' },
  // GÀ NƯỚNG / GÀ RÁN / GÀ KHO
  { keywords: ['gà nướng', 'gà rán', 'gà kho', 'gà chiên', 'đùi gà', 'cánh gà', 'ức gà', 'vịt quay', 'vịt'], url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=500&q=80' },
  // BÒ NƯỚNG / BÒ TÁI / BÒ LÚC LẮC
  { keywords: ['bò nướng', 'bò tái', 'bò lúc lắc', 'bò viên', 'bò kho', 'thịt bò'], url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80' },
  // HẢI SẢN TƯƠI / TÔM / CUA / MỰC / ỐC
  { keywords: ['tôm hùm', 'cua biển', 'tôm sú', 'cá mú', 'hải sản tươi', 'lẩu hải sản', 'tôm nướng', 'mực nướng', 'sò điệp', 'hàu nướng', 'phở xào hải sản', 'mỳ xào hải sản'], url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80' },
  // ỐC BIỂN
  { keywords: ['ốc hương', 'ốc len', 'ốc mỡ', 'ốc bươu', 'ngao', 'sò huyết', 'ghẹ', 'nghêu'], url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80' },
  // LẨU
  { keywords: ['lẩu', 'lau'], url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80' },
  // BBQ / NƯỚNG
  { keywords: ['nướng', 'bbq', 'sườn heo', 'ba chỉ nướng', 'heo nướng', 'bếp than'], url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' },
  // NEM / GỎI CUỐN / BÁNH TRÁNG CUỐN
  { keywords: ['nem nướng', 'nem cuốn', 'nem rán', 'gỏi cuốn', 'bánh tráng cuốn', 'cuốn bánh tráng'], url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80' },
  // GỎI / SỨA
  { keywords: ['gỏi', 'bò tái chanh'], url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80' },
  // DIM SUM / HÁ CẢO / SỦI CẢO
  { keywords: ['há cảo', 'sủi cảo', 'bánh bao', 'xíu mai', 'dim sum', 'chả giò hải sản'], url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80' },
  // SUSHI / SASHIMI
  { keywords: ['sushi', 'sashimi', 'salmon', 'dragon roll', 'california roll'], url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80' },
  // PIZZA
  { keywords: ['pizza'], url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
  // MỲ Ý / SPAGHETTI
  { keywords: ['spaghetti', 'carbonara', 'mỳ ý'], url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80' },
  // BURGER / GÀ RÁN KFC
  { keywords: ['burger', 'bucket', 'zinger', 'khoai tây chiên'], url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  // TRÀ SỮA / BUBBLE TEA
  { keywords: ['trà sữa', 'milk tea', 'bubble', 'brown sugar', 'trân châu', 'tra sua'], url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80' },
  // TRÀ TRÁI CÂY / TRÀ ĐÀO / TRÀ XANH
  { keywords: ['trà đào', 'trà vải', 'trà xanh', 'hồng trà', 'milk foam'], url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80' },
  // CÀ PHÊ
  { keywords: ['cà phê', 'cappuccino', 'latte', 'espresso', 'americano', 'cold brew', 'bạc xỉu', 'ca phe'], url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80' },
  // CÀ PHÊ TRỨNG
  { keywords: ['cà phê trứng'], url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80' },
  // SINH TỐ / NƯỚC ÉP
  { keywords: ['sinh tố', 'nước ép', 'sinh to', 'nuoc ep'], url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&q=80' },
  // CHÈ / CHÉN / ĐƯỜNG ĐEN
  { keywords: ['chè', 'che ba', 'khúc bạch', 'chè thái', 'chè hạt sen', 'chè đậu', 'sương sáo', 'trôi nước'], url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80' },
  // XÔI
  { keywords: ['xôi', 'xoi'], url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80' },
  // CHÁO
  { keywords: ['cháo', 'chao'], url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80' },
  // KEM
  { keywords: ['kem', 'ice cream'], url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80' },
  // BÁNH TÉT / BÁNH ÍT LÁ GAI / BÁNH IN
  { keywords: ['bánh tét', 'bánh ít lá', 'bánh in', 'bánh tổ', 'bánh khúc'], url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80' },
  // BÁNH TRÁNG NƯỚNG
  { keywords: ['bánh tráng nướng'], url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&q=80' },
  // TRỨNG NƯỚNG
  { keywords: ['trứng nướng'], url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80' },
  // CÁ KHO / CÁ CHIÊN
  { keywords: ['cá kho', 'cá chiên', 'cá cơm', 'cá thu', 'cá lóc'], url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80' },
  // CANH
  { keywords: ['canh chua', 'canh rau', 'canh mướp', 'canh bí', 'canh khổ qua', 'canh gà'], url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80' },
  // TÔM CHUA / NEM CHUA
  { keywords: ['tôm chua', 'nem chua'], url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80' },
  // CÀ PHÊ / TRÀ HOA / NHÀ HÀNG CHAY
  { keywords: ['trà hoa', 'trà thảo mộc', 'trà sen', 'trà nhài', 'nước ép táo', 'chay', 'lẩu chay', 'cơm chay'], url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80' },
  // DÊ NƯỚNG / LẨU DÊ
  { keywords: ['dê'], url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' },
  // ĐỒ UỐNG CHUNG
  { keywords: ['bia', 'nước ngọt', 'pepsi', 'nước suối', 'trà đá', 'rượu'], url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80' },
];

// MAP ẢNH THEO LOẠI CỬA HÀNG
const STORE_IMAGES = [
  { keywords: ['bún bò', 'bún riêu', 'bún chả', 'bún thịt', 'bún mắm', 'bún sứa', 'bún đậu', 'bún thái', 'bún nam bộ'], url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80' },
  { keywords: ['phở'], url: 'https://images.unsplash.com/photo-1582878826629-33b2ad7b3a7a?w=600&q=80' },
  { keywords: ['mỳ quảng', 'mì quảng', 'cao lầu', 'hủ tiếu', 'mỳ ', 'mì '], url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80' },
  { keywords: ['bánh mì'], url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=600&q=80' },
  { keywords: ['bánh xèo', 'bánh cuốn', 'bánh ướt', 'bánh bèo', 'bánh canh', 'bánh tráng', 'bánh ít', 'bánh tét'], url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80' },
  { keywords: ['cơm gà', 'cơm tấm', 'cơm niêu', 'cơm nhà'], url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80' },
  { keywords: ['hải sản', 'ốc biển', 'lẩu hải sản', 'tôm', 'cua'], url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80' },
  { keywords: ['lẩu bò', 'lẩu nấm', 'lẩu dê', 'lẩu mắm', 'lẩu riêu'], url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80' },
  { keywords: ['bbq', 'nướng', 'bếp than', 'gà nướng', 'vịt quay', 'nem nướng'], url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80' },
  { keywords: ['pizza', 'pasta'], url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
  { keywords: ['kfc', 'gà rán', 'burger'], url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
  { keywords: ['coffee house', 'cà phê', 'trứng hà nội', 'caphe', 'cà phê sáng'], url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80' },
  { keywords: ['gong cha', 'tocotoco', 'trà sữa'], url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80' },
  { keywords: ['sushi', 'sashimi', 'nhật'], url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80' },
  { keywords: ['dim sum', 'trung hoa'], url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80' },
  { keywords: ['chè', 'kem', 'xôi chè'], url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
  { keywords: ['cháo', 'chao lòng'], url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80' },
  { keywords: ['gỏi cuốn', 'nem cuốn', 'bánh tráng cuốn', 'bò tái chanh'], url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80' },
  { keywords: ['nước ép', 'sinh tố', 'thanh xuân'], url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80' },
  { keywords: ['chay', 'tịnh tâm'], url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80' },
];

const DEFAULT_DISH_IMG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80';
const DEFAULT_STORE_IMG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80';

function buildWhenClauses(items, field, defaultUrl) {
  const whens = [];
  for (const item of items) {
    for (const kw of item.keywords) {
      const escaped = kw.replace(/'/g, "''");
      whens.push(`  WHEN LOWER(${field}) LIKE LOWER('%${escaped}%') THEN '${item.url}'`);
    }
  }
  whens.push(`  ELSE '${defaultUrl}'`);
  return whens.join('\n');
}

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const lines = [];
  lines.push('-- UPDATE ảnh cho cua_hang và mon_an từ Unsplash');
  lines.push(`-- Tạo lúc: ${new Date().toLocaleString('vi-VN')}`);
  lines.push('-- Chỉ update những record chưa có ảnh (hinh_anh_dai_dien IS NULL)');
  lines.push('');
  lines.push('SET NAMES utf8mb4;');
  lines.push('');

  // ===== UPDATE CỬA HÀNG =====
  lines.push('-- ============================================================');
  lines.push('-- 1. CẬP NHẬT ẢNH CỬA HÀNG (anh_dai_dien)');
  lines.push('-- ============================================================');
  lines.push('UPDATE cua_hang');
  lines.push('SET anh_dai_dien = CASE');
  lines.push(buildWhenClauses(STORE_IMAGES, 'ten_cua_hang', DEFAULT_STORE_IMG));
  lines.push('END');
  lines.push('WHERE anh_dai_dien IS NULL;');
  lines.push('');
  lines.push(`SELECT CONCAT('Đã update ', ROW_COUNT(), ' ảnh cửa hàng') AS result;`);
  lines.push('');

  // ===== UPDATE MÓN ĂN =====
  lines.push('-- ============================================================');
  lines.push('-- 2. CẬP NHẬT ẢNH MÓN ĂN (hinh_anh_dai_dien)');
  lines.push('-- ============================================================');
  lines.push('UPDATE mon_an');
  lines.push('SET hinh_anh_dai_dien = CASE');
  lines.push(buildWhenClauses(DISH_IMAGES, 'ten_mon', DEFAULT_DISH_IMG));
  lines.push('END');
  lines.push('WHERE hinh_anh_dai_dien IS NULL;');
  lines.push('');
  lines.push(`SELECT CONCAT('Đã update ', ROW_COUNT(), ' ảnh món ăn') AS result;`);
  lines.push('');

  // ===== VERIFY =====
  lines.push('-- ============================================================');
  lines.push('-- 3. KIỂM TRA KẾT QUẢ');
  lines.push('-- ============================================================');
  lines.push(`SELECT COUNT(*) AS tong_cua_hang, SUM(anh_dai_dien IS NOT NULL) AS co_anh, SUM(anh_dai_dien IS NULL) AS chua_co_anh FROM cua_hang;`);
  lines.push(`SELECT COUNT(*) AS tong_mon_an, SUM(hinh_anh_dai_dien IS NOT NULL) AS co_anh, SUM(hinh_anh_dai_dien IS NULL) AS chua_co_anh FROM mon_an;`);

  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8');

  console.log('HOAN THANH!');
  console.log(`SQL: ${OUTPUT_FILE}`);
  console.log(`\nSau khi chay SQL nay:`);
  console.log(`- Tat ca cua hang se co anh dai dien`);
  console.log(`- Tat ca mon an se co hinh anh`);
  console.log(`- Anh lay tu Unsplash theo tu khoa ten mon/ten quan`);
}

main();
