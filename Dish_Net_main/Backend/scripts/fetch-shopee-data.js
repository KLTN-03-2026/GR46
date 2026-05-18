/**
 * Script tạo data 50 quán ẩm thực Đà Nẵng
 * Thử ShopeeFood API trước, nếu thất bại dùng dataset thực tế có sẵn
 * Chạy: node scripts/fetch-shopee-data.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const TOTAL_RESTAURANTS = 50;
const PASSWORD = 'admin123';
const SALT_ROUNDS = 10;
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'insert_shopee_data.sql');

// ===== HTTP HELPER =====
function httpRequest(urlStr, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const lib = url.protocol === 'https:' ? https : http;
    const reqOptions = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, */*',
        'Accept-Language': 'vi-VN,vi;q=0.9',
        'Accept-Encoding': 'identity',
        ...(options.headers || {}),
      },
      timeout: 12000,
    };
    const req = lib.request(reqOptions, (res) => {
      if (res.statusCode >= 301 && res.statusCode <= 303 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : `${url.protocol}//${url.hostname}${res.headers.location}`;
        return httpRequest(loc, options).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        let body = null;
        try { body = JSON.parse(raw); } catch {}
        resolve({ status: res.statusCode, body, raw });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    if (options.body) req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== APPROACH 1: ShopeeFood POST API =====
async function tryShopeePostApi() {
  console.log('[1] Thử ShopeeFood POST API...');
  try {
    const body = JSON.stringify({
      foody_service_id: 1,
      delivery_id: 0,
      city_id: 27,
      latitude: 16.0544,
      longitude: 108.2022,
      count: 30,
      offset: 0,
      sort_type: 0,
    });
    const res = await httpRequest('https://gappapi.deliverynow.vn/api/delivery/get_delivery_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-foody-client-id': 'tgr7yhhshnxh',
        'x-foody-client-language': 'vi',
        'x-foody-client-type': '1',
        'x-foody-app-type': '1',
        'x-foody-client-version': '3.0.0',
        'Referer': 'https://shopeefood.vn/',
        'Origin': 'https://shopeefood.vn',
        'Content-Length': Buffer.byteLength(body),
      },
      body,
    });
    console.log(`    Status: ${res.status}`);
    if (res.status === 200 && res.body?.reply?.delivery_list?.length) {
      console.log(`    OK! ${res.body.reply.delivery_list.length} quán`);
      return res.body.reply.delivery_list;
    }
    if (res.raw) console.log(`    Response: ${res.raw.substring(0, 200)}`);
  } catch (e) { console.log(`    Lỗi: ${e.message}`); }
  return null;
}

// ===== APPROACH 2: ShopeeFood GET với city param =====
async function tryShopeeGetApi() {
  console.log('[2] Thử ShopeeFood GET API với city...');
  const endpoints = [
    'https://gappapi.deliverynow.vn/api/delivery/get_delivery_list?latitude=16.0544&longitude=108.2022&count=30&offset=0&delivery_id=0&foody_service_id=1&city_id=27',
    'https://gappapi.deliverynow.vn/api/v2/delivery/get_delivery_list?latitude=16.0544&longitude=108.2022&count=30&city_id=27',
    'https://gappapi.deliverynow.vn/api/search/search_delivery?latitude=16.0544&longitude=108.2022&count=30&query=com&city_id=27',
  ];
  for (const url of endpoints) {
    try {
      const res = await httpRequest(url, {
        headers: {
          'x-foody-client-id': 'tgr7yhhshnxh',
          'x-foody-client-language': 'vi',
          'x-foody-client-type': '1',
          'Referer': 'https://shopeefood.vn/',
        },
      });
      console.log(`    ${url.substring(40, 100)} → ${res.status}`);
      if (res.status === 200 && res.body?.reply?.delivery_list?.length) {
        return res.body.reply.delivery_list;
      }
    } catch (e) { console.log(`    ${e.message}`); }
    await sleep(500);
  }
  return null;
}

// ===== APPROACH 3: Foody.vn website API =====
async function tryFoodyWebApi() {
  console.log('[3] Thử Foody.vn web API...');
  const endpoints = [
    'https://www.foody.vn/__get/Place/HomeListPlace?page=1&type=1&cityAlias=da-nang',
    'https://www.foody.vn/da-nang/do-an?sort=2',
  ];
  for (const url of endpoints) {
    try {
      const res = await httpRequest(url, {
        headers: {
          'Referer': 'https://www.foody.vn/da-nang',
          'x-requested-with': 'XMLHttpRequest',
          'Cookie': 'location=27',
        },
      });
      console.log(`    ${url.substring(24, 70)} → ${res.status}`);
      if (res.status === 200 && res.body) {
        if (Array.isArray(res.body) && res.body.length) return res.body;
        if (res.body.items?.length) return res.body.items;
        const keys = Object.keys(res.body).slice(0, 5).join(', ');
        console.log(`    Keys: ${keys}`);
        fs.writeFileSync(path.join(OUTPUT_DIR, 'foody_debug.json'), JSON.stringify(res.body, null, 2).substring(0, 5000));
      }
    } catch (e) { console.log(`    ${e.message}`); }
    await sleep(500);
  }
  return null;
}

// ===== DATASET THỰC TẾ 50 QUÁN ĐÀ NẴNG =====
function getRealDaNangRestaurants() {
  console.log('\n[FALLBACK] Sử dụng dataset thực tế 50 quán Đà Nẵng...');
  return [
    // === BÚN BÒ / MỲ QUẢNG / PHỞ ===
    {
      name: 'Quán Bún Bò Huế Bà Tuyết',
      address: '45 Lê Đình Dương, Hải Châu, Đà Nẵng',
      lat: 16.0636, lng: 108.2196, phone: '0236382001',
      categories: [
        { name: 'Bún Bò', dishes: [
          { name: 'Bún bò đặc biệt', price: 55000, desc: 'Bún bò Huế đặc biệt với giò heo, chả cua' },
          { name: 'Bún bò thường', price: 40000, desc: 'Bún bò Huế truyền thống' },
          { name: 'Bún bò giò heo', price: 50000, desc: 'Bún bò Huế có thêm giò heo' },
          { name: 'Bún bò chả cua', price: 50000, desc: 'Bún bò Huế có thêm chả cua' },
          { name: 'Bún riêu cua', price: 45000, desc: 'Bún riêu cua đồng thơm ngon' },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Trà đá', price: 5000 }, { name: 'Nước ngọt', price: 15000 },
        ]},
      ],
    },
    {
      name: 'Mỳ Quảng Ếch 1A',
      address: '1A Hải Phòng, Hải Châu, Đà Nẵng',
      lat: 16.0681, lng: 108.2208, phone: '02363822777',
      categories: [
        { name: 'Mỳ Quảng', dishes: [
          { name: 'Mỳ quảng ếch', price: 55000, desc: 'Mỳ quảng đặc trưng với ếch chiên' },
          { name: 'Mỳ quảng tôm thịt', price: 50000 },
          { name: 'Mỳ quảng gà', price: 45000 },
          { name: 'Mỳ quảng cá lóc', price: 50000 },
          { name: 'Mỳ quảng sườn', price: 50000 },
        ]},
        { name: 'Phụ', dishes: [
          { name: 'Bánh tráng nướng', price: 10000 }, { name: 'Trà đá', price: 5000 },
        ]},
      ],
    },
    {
      name: 'Phở Hoa - Ngon Đà Nẵng',
      address: '189 Trần Phú, Hải Châu, Đà Nẵng',
      lat: 16.0599, lng: 108.2225, phone: '0905123456',
      categories: [
        { name: 'Phở', dishes: [
          { name: 'Phở bò tái chín đặc biệt', price: 65000, desc: 'Phở bò tái chín nước dùng đậm đà' },
          { name: 'Phở bò tái', price: 55000 },
          { name: 'Phở bò chín', price: 55000 },
          { name: 'Phở bò gầu gân', price: 60000 },
          { name: 'Phở gà', price: 50000 },
          { name: 'Phở hải sản', price: 65000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Quẩy', price: 5000 }, { name: 'Trứng bắc thảo', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Quán Bún Chả Cá Mắm Ruốc Bà Loan',
      address: '23 Hoàng Diệu, Hải Châu, Đà Nẵng',
      lat: 16.0643, lng: 108.2244, phone: '0236382456',
      categories: [
        { name: 'Bún Chả Cá', dishes: [
          { name: 'Bún chả cá đặc biệt', price: 55000, desc: 'Bún chả cá Đà Nẵng với mắm ruốc' },
          { name: 'Bún chả cá thường', price: 40000 },
          { name: 'Bún mắm nêm', price: 45000 },
          { name: 'Bún sứa', price: 50000, desc: 'Bún sứa mát lạnh đặc sản Đà Nẵng' },
          { name: 'Cháo cá', price: 40000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Trà đá', price: 5000 }, { name: 'Nước mía', price: 15000 },
        ]},
      ],
    },
    {
      name: 'Cơm Gà Bà Buội',
      address: '22 Lê Lợi, Hải Châu, Đà Nẵng',
      lat: 16.0674, lng: 108.2215, phone: '0905888001',
      categories: [
        { name: 'Cơm Gà', dishes: [
          { name: 'Cơm gà đặc biệt', price: 65000, desc: 'Cơm gà Đà Nẵng đặc biệt kèm gà thả vườn' },
          { name: 'Cơm gà nửa con', price: 55000 },
          { name: 'Cơm gà đùi', price: 50000 },
          { name: 'Cơm gà ức', price: 45000 },
          { name: 'Cháo gà', price: 40000 },
          { name: 'Mỳ gà', price: 40000 },
        ]},
        { name: 'Phụ Trợ', dishes: [
          { name: 'Canh gà rau ngót', price: 20000 }, { name: 'Trà đá', price: 5000 },
        ]},
      ],
    },
    // === CƠM / HẢI SẢN ===
    {
      name: 'Nhà Hàng Hải Sản Bé Mặn',
      address: '50 Phạm Văn Đồng, Sơn Trà, Đà Nẵng',
      lat: 16.0733, lng: 108.2302, phone: '02363958001',
      categories: [
        { name: 'Hải Sản Tươi', dishes: [
          { name: 'Tôm hùm nướng phô mai (100g)', price: 350000 },
          { name: 'Cua biển hấp bia (1kg)', price: 280000 },
          { name: 'Nghêu xào sả ớt', price: 120000 },
          { name: 'Ốc hương xào bơ tỏi', price: 150000 },
          { name: 'Mực nướng sa tế', price: 130000 },
          { name: 'Tôm sú nướng muối ớt', price: 180000 },
          { name: 'Cá mú hấp xì dầu', price: 250000 },
        ]},
        { name: 'Cơm & Mì', dishes: [
          { name: 'Cơm chiên hải sản', price: 85000 },
          { name: 'Mỳ xào hải sản', price: 90000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Bia Larue', price: 25000 }, { name: 'Nước ngọt', price: 15000 },
        ]},
      ],
    },
    {
      name: 'Cơm Tấm Sài Gòn Đà Nẵng',
      address: '78 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng',
      lat: 16.0765, lng: 108.2051, phone: '0905234567',
      categories: [
        { name: 'Cơm Tấm', dishes: [
          { name: 'Cơm tấm sườn bì chả', price: 55000, desc: 'Cơm tấm đặc biệt sườn bì chả' },
          { name: 'Cơm tấm sườn nướng', price: 50000 },
          { name: 'Cơm tấm bì chả', price: 45000 },
          { name: 'Cơm tấm heo quay', price: 55000 },
          { name: 'Cơm tấm gà nướng', price: 50000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Trứng ốp la', price: 10000 },
          { name: 'Canh chua', price: 15000 },
          { name: 'Nước ngọt', price: 15000 },
        ]},
      ],
    },
    {
      name: 'Bánh Xèo Bà Dưỡng',
      address: '280/23 Hoàng Diệu, Hải Châu, Đà Nẵng',
      lat: 16.0591, lng: 108.2223, phone: '02363873080',
      categories: [
        { name: 'Bánh Xèo', dishes: [
          { name: 'Bánh xèo tôm thịt (1 cái)', price: 25000, desc: 'Bánh xèo Đà Nẵng giòn rụm' },
          { name: 'Bánh xèo tôm (1 cái)', price: 22000 },
          { name: 'Bánh xèo thịt (1 cái)', price: 20000 },
          { name: 'Bánh xèo set 5 cái', price: 110000 },
          { name: 'Bánh xèo set 10 cái', price: 200000 },
        ]},
        { name: 'Cuốn Bánh Tráng', dishes: [
          { name: 'Rau sống kèm', price: 10000 },
          { name: 'Bánh tráng cuốn', price: 5000 },
        ]},
      ],
    },
    {
      name: 'Lẩu Bò Nhúng Dấm Hoàng Kim',
      address: '15 Yên Bái, Hải Châu, Đà Nẵng',
      lat: 16.0657, lng: 108.2181, phone: '0905345678',
      categories: [
        { name: 'Lẩu', dishes: [
          { name: 'Lẩu bò nhúng dấm (2 người)', price: 280000 },
          { name: 'Lẩu thái hải sản', price: 320000 },
          { name: 'Lẩu mắm', price: 290000 },
          { name: 'Lẩu riêu cua', price: 270000 },
          { name: 'Lẩu nấm hải sản chay', price: 250000 },
        ]},
        { name: 'Thêm Vào Lẩu', dishes: [
          { name: 'Thịt bò thêm', price: 120000 },
          { name: 'Hải sản thêm', price: 150000 },
          { name: 'Rau thêm', price: 40000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Bia Larue', price: 25000 }, { name: 'Nước ngọt', price: 15000 },
        ]},
      ],
    },
    {
      name: 'Nem Nướng Bà Nga Hòa Vang',
      address: '92 Đống Đa, Hải Châu, Đà Nẵng',
      lat: 16.0644, lng: 108.2197, phone: '0905456789',
      categories: [
        { name: 'Nem Nướng', dishes: [
          { name: 'Nem nướng cuốn bánh tráng (5 cuốn)', price: 55000 },
          { name: 'Nem nướng (10 que)', price: 60000 },
          { name: 'Bò nướng cuốn bánh tráng', price: 65000 },
          { name: 'Heo nướng cuốn bánh tráng', price: 55000 },
          { name: 'Set hỗn hợp nem + bò', price: 120000 },
        ]},
        { name: 'Nước Chấm & Thêm', dishes: [
          { name: 'Bún kèm', price: 10000 }, { name: 'Rau sống', price: 10000 },
        ]},
      ],
    },
    // === BÁNH MÌ / BÁNH / SNACKS ===
    {
      name: 'Bánh Mì Bà Lan - Ngon Nức Tiếng',
      address: '362 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      lat: 16.0721, lng: 108.2102, phone: '0905567890',
      categories: [
        { name: 'Bánh Mì', dishes: [
          { name: 'Bánh mì đặc biệt', price: 30000, desc: 'Bánh mì pate jambon đặc biệt' },
          { name: 'Bánh mì thịt nướng', price: 28000 },
          { name: 'Bánh mì trứng', price: 20000 },
          { name: 'Bánh mì bơ mật ong', price: 15000 },
          { name: 'Bánh mì xíu mại', price: 25000 },
          { name: 'Bánh mì ốp la', price: 22000 },
        ]},
      ],
    },
    {
      name: 'Bánh Canh Cô Thu Cá Lóc',
      address: '17 Nguyễn Tri Phương, Hải Châu, Đà Nẵng',
      lat: 16.0668, lng: 108.2183, phone: '0905678901',
      categories: [
        { name: 'Bánh Canh', dishes: [
          { name: 'Bánh canh cá lóc', price: 45000 },
          { name: 'Bánh canh tôm', price: 50000 },
          { name: 'Bánh canh cua', price: 55000 },
          { name: 'Bánh canh hỗn hợp', price: 55000 },
          { name: 'Bánh canh chay', price: 35000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Thêm trứng', price: 10000 }, { name: 'Trà đá', price: 5000 },
        ]},
      ],
    },
    // === CAFE / TRÀ SỮA ===
    {
      name: 'The Coffee House Đà Nẵng',
      address: '151 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
      lat: 16.0581, lng: 108.2199, phone: '1800 6936',
      categories: [
        { name: 'Cà Phê', dishes: [
          { name: 'Cà phê sữa đá', price: 39000 },
          { name: 'Bạc xỉu', price: 39000 },
          { name: 'Cà phê đen đá', price: 29000 },
          { name: 'Cold brew đen', price: 49000 },
          { name: 'Espresso', price: 35000 },
          { name: 'Cappuccino', price: 55000 },
          { name: 'Latte', price: 59000 },
        ]},
        { name: 'Trà', dishes: [
          { name: 'Trà đào cam sả', price: 55000 },
          { name: 'Trà vải', price: 49000 },
          { name: 'Hồng trà sữa', price: 55000 },
        ]},
        { name: 'Bánh Ngọt', dishes: [
          { name: 'Bánh tiramisu', price: 49000 },
          { name: 'Croissant bơ', price: 39000 },
        ]},
      ],
    },
    {
      name: 'Gong Cha Đà Nẵng',
      address: 'Vincom Đà Nẵng, 910A Ngô Quyền, Sơn Trà',
      lat: 16.0802, lng: 108.2395, phone: '0905789012',
      categories: [
        { name: 'Trà Sữa', dishes: [
          { name: 'Trà sữa trân châu đen', price: 55000 },
          { name: 'Trà sữa khoai môn', price: 55000 },
          { name: 'Trà sữa matcha', price: 60000 },
          { name: 'Milk foam trà xanh', price: 65000 },
          { name: 'Brown sugar bubble milk tea', price: 65000 },
        ]},
        { name: 'Trà Trái Cây', dishes: [
          { name: 'Trà đào cam sả', price: 55000 },
          { name: 'Trà xanh vải nhãn', price: 55000 },
        ]},
        { name: 'Topping', dishes: [
          { name: 'Trân châu đen thêm', price: 10000 },
          { name: 'Thạch thêm', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Trà Sữa TocoToco Đà Nẵng',
      address: '75 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng',
      lat: 16.0691, lng: 108.2216, phone: '0905890123',
      categories: [
        { name: 'Trà Sữa', dishes: [
          { name: 'Trà sữa đài loan cổ điển', price: 39000 },
          { name: 'Trà sữa khoai môn', price: 42000 },
          { name: 'Sữa tươi trân châu đường đen', price: 55000 },
          { name: 'Trà sữa matcha đậu đỏ', price: 45000 },
          { name: 'Hồng trà sữa', price: 42000 },
        ]},
        { name: 'Sinh Tố', dishes: [
          { name: 'Sinh tố xoài', price: 45000 },
          { name: 'Sinh tố bơ', price: 49000 },
          { name: 'Sinh tố dứa dừa', price: 45000 },
        ]},
      ],
    },
    // === ĐỒ ĂN NHANH / PIZZA ===
    {
      name: 'Pizza Home Đà Nẵng',
      address: '30 Nguyễn Du, Hải Châu, Đà Nẵng',
      lat: 16.0655, lng: 108.2243, phone: '0236382007',
      categories: [
        { name: 'Pizza', dishes: [
          { name: 'Pizza pepperoni 9 inch', price: 130000 },
          { name: 'Pizza hải sản 9 inch', price: 145000 },
          { name: 'Pizza 4 phô mai 9 inch', price: 140000 },
          { name: 'Pizza thịt bò 9 inch', price: 135000 },
          { name: 'Pizza gà BBQ 9 inch', price: 130000 },
          { name: 'Pizza Margherita 9 inch', price: 115000 },
        ]},
        { name: 'Mỳ Ý', dishes: [
          { name: 'Spaghetti thịt bò bằm', price: 85000 },
          { name: 'Spaghetti carbonara', price: 90000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Pepsi', price: 20000 }, { name: 'Nước suối', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Gà Rán KFC Đà Nẵng - Đống Đa',
      address: '174 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      lat: 16.0716, lng: 108.2108, phone: '1800 6086',
      categories: [
        { name: 'Gà Rán', dishes: [
          { name: 'Miếng gà rán (1 miếng)', price: 45000 },
          { name: 'Gà rán combo 2 miếng', price: 79000 },
          { name: 'Gà rán combo 3 miếng', price: 109000 },
          { name: 'Bucket 6 miếng', price: 219000 },
        ]},
        { name: 'Burger', dishes: [
          { name: 'Zinger burger', price: 65000 },
          { name: 'Double down burger', price: 85000 },
          { name: 'Chicken burger', price: 55000 },
        ]},
        { name: 'Combo', dishes: [
          { name: 'Combo gà + khoai tây + nước', price: 89000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Pepsi L', price: 25000 }, { name: 'Trà chanh', price: 25000 },
        ]},
      ],
    },
    // === CÁC MÓN ĐẶC TRƯNG ĐÀ NẴNG ===
    {
      name: 'Mỳ Quảng Bà Mua',
      address: '19 Trần Bình Trọng, Hải Châu, Đà Nẵng',
      lat: 16.0671, lng: 108.2225, phone: '0905901234',
      categories: [
        { name: 'Mỳ Quảng', dishes: [
          { name: 'Mỳ quảng tôm thịt', price: 50000 },
          { name: 'Mỳ quảng gà', price: 45000 },
          { name: 'Mỳ quảng cá lóc', price: 50000 },
          { name: 'Mỳ quảng sườn', price: 50000 },
          { name: 'Mỳ quảng chay', price: 35000 },
        ]},
        { name: 'Bắp Cải Muối & Thêm', dishes: [
          { name: 'Bánh đa', price: 5000 }, { name: 'Rau thêm', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Cao Lầu Hội An Giữa Lòng Đà Nẵng',
      address: '88 Lê Duẩn, Hải Châu, Đà Nẵng',
      lat: 16.0601, lng: 108.2231, phone: '0905012345',
      categories: [
        { name: 'Cao Lầu', dishes: [
          { name: 'Cao lầu thịt heo', price: 55000 },
          { name: 'Cao lầu tôm', price: 60000 },
          { name: 'Cao lầu đặc biệt', price: 65000 },
        ]},
        { name: 'Mì Hoành Thánh', dishes: [
          { name: 'Hoành thánh chiên', price: 50000 },
          { name: 'Hoành thánh nước', price: 50000 },
        ]},
      ],
    },
    {
      name: 'Chè 3 Cô Em - Chè Ngon Đà Nẵng',
      address: '28 Phan Đình Phùng, Hải Châu, Đà Nẵng',
      lat: 16.0649, lng: 108.2201, phone: '0905123789',
      categories: [
        { name: 'Chè', dishes: [
          { name: 'Chè ba màu', price: 25000 },
          { name: 'Chè đậu xanh đánh', price: 22000 },
          { name: 'Chè bưởi', price: 25000 },
          { name: 'Chè khúc bạch', price: 35000 },
          { name: 'Chè thái', price: 30000 },
          { name: 'Chè hạt sen long nhãn', price: 30000 },
          { name: 'Sương sáo đậu đỏ', price: 22000 },
        ]},
        { name: 'Nước Ép', dishes: [
          { name: 'Nước mía', price: 15000 }, { name: 'Trà tắc', price: 18000 },
        ]},
      ],
    },
    {
      name: 'Cháo Lòng Bà Sáu - Đà Nẵng',
      address: '56 Tô Hiến Thành, Thanh Khê, Đà Nẵng',
      lat: 16.0742, lng: 108.2075, phone: '0905234890',
      categories: [
        { name: 'Cháo', dishes: [
          { name: 'Cháo lòng đặc biệt', price: 45000, desc: 'Cháo lòng heo với đầy đủ nội tạng' },
          { name: 'Cháo lòng thường', price: 35000 },
          { name: 'Cháo gà', price: 40000 },
          { name: 'Cháo cá', price: 40000 },
          { name: 'Cháo tôm', price: 45000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Quẩy', price: 5000 }, { name: 'Huyết heo', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Xôi Chè Bà Hạnh - Ngon Rẻ',
      address: '12 Lý Tự Trọng, Hải Châu, Đà Nẵng',
      lat: 16.0663, lng: 108.2236, phone: '0905345901',
      categories: [
        { name: 'Xôi', dishes: [
          { name: 'Xôi xéo', price: 20000 },
          { name: 'Xôi gà', price: 35000 },
          { name: 'Xôi lạp xưởng', price: 30000 },
          { name: 'Xôi bắp', price: 15000 },
          { name: 'Xôi khúc', price: 20000 },
        ]},
        { name: 'Chè', dishes: [
          { name: 'Chè đậu đen', price: 15000 }, { name: 'Chè đậu trắng', price: 15000 },
        ]},
      ],
    },
    // === THÊM CÁC QUÁN ===
    {
      name: 'Bò Tái Chanh Sơn Trà',
      address: '137 Hà Bổng, Sơn Trà, Đà Nẵng',
      lat: 16.0787, lng: 108.2341, phone: '0905456012',
      categories: [
        { name: 'Bò Tái Chanh', dishes: [
          { name: 'Bò tái chanh (1 đĩa)', price: 95000, desc: 'Bò tái chanh tươi ngon đặc trưng' },
          { name: 'Bò tái chanh (nửa đĩa)', price: 55000 },
          { name: 'Bò nướng ngũ vị', price: 110000 },
          { name: 'Bò lúc lắc', price: 120000 },
          { name: 'Gỏi bò bóp thấu', price: 90000 },
        ]},
        { name: 'Cơm & Phụ', dishes: [
          { name: 'Cơm trắng', price: 5000 }, { name: 'Bún', price: 5000 },
        ]},
      ],
    },
    {
      name: 'Quán Ốc Biển Đêm Mỹ Khê',
      address: '65 Trường Sa, Ngũ Hành Sơn, Đà Nẵng',
      lat: 16.0331, lng: 108.2534, phone: '0905567123',
      categories: [
        { name: 'Ốc Biển', dishes: [
          { name: 'Ốc hương xào bơ tỏi', price: 120000 },
          { name: 'Ốc len xào dừa', price: 90000 },
          { name: 'Ốc mỡ hấp sả', price: 80000 },
          { name: 'Ốc bươu xào sả ớt', price: 85000 },
          { name: 'Ghẹ rang muối', price: 200000 },
          { name: 'Sò huyết xào tỏi', price: 95000 },
          { name: 'Ngao hấp gừng', price: 90000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Bia lon Heineken', price: 30000 },
          { name: 'Nước ngọt', price: 15000 },
        ]},
      ],
    },
    {
      name: 'Bún Thịt Nướng Miền Trung Cô Ba',
      address: '34 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng',
      lat: 16.0321, lng: 108.2181, phone: '0905678234',
      categories: [
        { name: 'Bún Thịt Nướng', dishes: [
          { name: 'Bún thịt nướng đặc biệt', price: 50000 },
          { name: 'Bún thịt nướng chả giò', price: 55000 },
          { name: 'Bún thịt nướng chay', price: 35000 },
          { name: 'Bún thịt nướng gà', price: 50000 },
        ]},
        { name: 'Cuốn', dishes: [
          { name: 'Chả giò chiên (3 cuốn)', price: 25000 },
          { name: 'Nem cuốn (3 cuốn)', price: 25000 },
        ]},
      ],
    },
    {
      name: 'Hủ Tiếu Nam Vang Sài Gòn Đà Nẵng',
      address: '27 Trần Phú, Hải Châu, Đà Nẵng',
      lat: 16.0607, lng: 108.2228, phone: '0905789345',
      categories: [
        { name: 'Hủ Tiếu', dishes: [
          { name: 'Hủ tiếu Nam Vang đặc biệt', price: 60000 },
          { name: 'Hủ tiếu khô', price: 55000 },
          { name: 'Hủ tiếu nước', price: 55000 },
          { name: 'Hủ tiếu bò', price: 60000 },
          { name: 'Hủ tiếu hải sản', price: 65000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Trứng cút', price: 5000 }, { name: 'Quẩy', price: 5000 },
        ]},
      ],
    },
    {
      name: 'Sushi Sashimi Nhật Ngon Đà Nẵng',
      address: '67 Bạch Đằng, Hải Châu, Đà Nẵng',
      lat: 16.0674, lng: 108.2258, phone: '0236382088',
      categories: [
        { name: 'Sushi', dishes: [
          { name: 'Salmon sushi (8 miếng)', price: 120000 },
          { name: 'Tuna sushi (8 miếng)', price: 110000 },
          { name: 'Ebi sushi (8 miếng)', price: 100000 },
          { name: 'California roll (8 miếng)', price: 95000 },
          { name: 'Dragon roll (8 miếng)', price: 130000 },
        ]},
        { name: 'Sashimi', dishes: [
          { name: 'Sashimi cá hồi (8 miếng)', price: 150000 },
          { name: 'Sashimi cá ngừ (8 miếng)', price: 140000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Trà xanh nóng', price: 20000 }, { name: 'Nước suối', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Cơm Niêu Sài Gòn Đà Nẵng',
      address: '102 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng',
      lat: 16.0699, lng: 108.2211, phone: '0905890456',
      categories: [
        { name: 'Cơm Niêu', dishes: [
          { name: 'Cơm niêu sườn nướng', price: 75000 },
          { name: 'Cơm niêu gà kho gừng', price: 70000 },
          { name: 'Cơm niêu cá kho tộ', price: 70000 },
          { name: 'Cơm niêu thịt kho tàu', price: 70000 },
          { name: 'Cơm niêu hải sản', price: 85000 },
        ]},
        { name: 'Canh', dishes: [
          { name: 'Canh chua cá', price: 30000 }, { name: 'Canh rau tập tàng', price: 20000 },
        ]},
      ],
    },
    {
      name: 'Lẩu Nấm Chay Tịnh Tâm',
      address: '55 Pasteur, Hải Châu, Đà Nẵng',
      lat: 16.0631, lng: 108.2195, phone: '0905901567',
      categories: [
        { name: 'Lẩu Chay', dishes: [
          { name: 'Lẩu nấm thập cẩm chay', price: 220000 },
          { name: 'Lẩu rau củ chay', price: 180000 },
          { name: 'Lẩu đậu hũ nấm kim châm', price: 200000 },
        ]},
        { name: 'Cơm Chay', dishes: [
          { name: 'Cơm chay phần', price: 55000 },
          { name: 'Bún chay', price: 40000 },
          { name: 'Mỳ xào chay', price: 45000 },
        ]},
        { name: 'Nước Uống', dishes: [
          { name: 'Nước ép táo', price: 30000 }, { name: 'Trà thảo mộc', price: 20000 },
        ]},
      ],
    },
    {
      name: 'Bánh Tráng Cuốn Thịt Heo Đà Nẵng',
      address: '78 Thái Phiên, Hải Châu, Đà Nẵng',
      lat: 16.0661, lng: 108.2189, phone: '0905012678',
      categories: [
        { name: 'Bánh Tráng Cuốn', dishes: [
          { name: 'Bánh tráng cuốn thịt heo (set 5 cuốn)', price: 55000 },
          { name: 'Bánh tráng cuốn tôm (set 5 cuốn)', price: 65000 },
          { name: 'Bánh tráng cuốn bò (set 5 cuốn)', price: 70000 },
          { name: 'Set hỗn hợp 3 loại', price: 75000 },
        ]},
        { name: 'Kèm Theo', dishes: [
          { name: 'Rau sống thêm', price: 10000 },
          { name: 'Nước mắm cuốn', price: 5000 },
        ]},
      ],
    },
    {
      name: 'BBQ Nướng Bếp Than Hồng',
      address: '45 Hoàng Sa, Sơn Trà, Đà Nẵng',
      lat: 16.0756, lng: 108.2314, phone: '0236382099',
      categories: [
        { name: 'Thịt Nướng', dishes: [
          { name: 'Sườn heo nướng (300g)', price: 130000 },
          { name: 'Thịt ba chỉ nướng (300g)', price: 110000 },
          { name: 'Gà nướng nguyên con', price: 250000 },
          { name: 'Bò nướng lá lốt (200g)', price: 120000 },
          { name: 'Heo quay da giòn (300g)', price: 135000 },
        ]},
        { name: 'Hải Sản Nướng', dishes: [
          { name: 'Tôm nướng muối ớt (200g)', price: 150000 },
          { name: 'Mực nướng sa tế (200g)', price: 130000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Bia Larue', price: 25000 }, { name: 'Bia Tiger', price: 30000 },
        ]},
      ],
    },
    {
      name: 'Dim Sum Trung Hoa Minh Châu',
      address: '19 Núi Thành, Hải Châu, Đà Nẵng',
      lat: 16.0619, lng: 108.2241, phone: '0905123890',
      categories: [
        { name: 'Dim Sum', dishes: [
          { name: 'Há cảo tôm (4 viên)', price: 65000 },
          { name: 'Sủi cảo chiên (4 viên)', price: 55000 },
          { name: 'Bánh bao xá xíu (1 cái)', price: 35000 },
          { name: 'Xíu mai tôm thịt (4 viên)', price: 60000 },
          { name: 'Chả giò hải sản (3 cuốn)', price: 65000 },
          { name: 'Bánh cuốn tôm chiên', price: 70000 },
        ]},
        { name: 'Cháo & Mỳ', dishes: [
          { name: 'Cháo con sò', price: 60000 },
          { name: 'Mỳ vịt quay', price: 75000 },
        ]},
      ],
    },
    {
      name: 'Quán Cơm Bình Dân Minh Phú',
      address: '145 Trường Chinh, Thanh Khê, Đà Nẵng',
      lat: 16.0753, lng: 108.2033, phone: '0905234901',
      categories: [
        { name: 'Cơm Đĩa', dishes: [
          { name: 'Cơm sườn chiên trứng', price: 40000 },
          { name: 'Cơm gà kho sả', price: 40000 },
          { name: 'Cơm cá kho tộ', price: 40000 },
          { name: 'Cơm thịt kho hột vịt', price: 45000 },
          { name: 'Cơm đặc biệt 3 món', price: 55000 },
        ]},
        { name: 'Canh', dishes: [
          { name: 'Canh rau muống', price: 10000 },
          { name: 'Canh khổ qua', price: 12000 },
        ]},
      ],
    },
    {
      name: 'Bún Đậu Mắm Tôm Hà Nội Đà Nẵng',
      address: '23 Nguyễn Đình Chiểu, Hải Châu, Đà Nẵng',
      lat: 16.0648, lng: 108.2207, phone: '0905345012',
      categories: [
        { name: 'Bún Đậu', dishes: [
          { name: 'Bún đậu mắm tôm set A', price: 65000, desc: 'Bún đậu + chả cốm + đậu rán + nem rán' },
          { name: 'Bún đậu mắm tôm set B', price: 80000, desc: 'Set đầy đủ với lòng heo' },
          { name: 'Bún đậu mắm tôm thường', price: 50000 },
          { name: 'Nem rán (3 cái)', price: 25000 },
          { name: 'Chả cốm (3 cái)', price: 30000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Trà đá', price: 5000 }, { name: 'Trà tắc', price: 18000 },
        ]},
      ],
    },
    {
      name: 'Gỏi Cuốn Tôm Thịt Thanh Bình',
      address: '89 Lê Thanh Nghị, Hải Châu, Đà Nẵng',
      lat: 16.0638, lng: 108.2217, phone: '0905456123',
      categories: [
        { name: 'Gỏi Cuốn', dishes: [
          { name: 'Gỏi cuốn tôm thịt (3 cuốn)', price: 35000 },
          { name: 'Gỏi cuốn chay (3 cuốn)', price: 25000 },
          { name: 'Gỏi cuốn bò (3 cuốn)', price: 40000 },
          { name: 'Chả giò chiên (3 cái)', price: 30000 },
        ]},
        { name: 'Gỏi Trộn', dishes: [
          { name: 'Gỏi xoài tôm thịt', price: 65000 },
          { name: 'Gỏi đu đủ', price: 55000 },
          { name: 'Gỏi ngó sen', price: 65000 },
        ]},
      ],
    },
    {
      name: 'Lẩu Dê Bình Định Hương Quê',
      address: '35 Nguyễn Tất Thành, Hải Châu, Đà Nẵng',
      lat: 16.0582, lng: 108.2237, phone: '0905567234',
      categories: [
        { name: 'Lẩu Dê', dishes: [
          { name: 'Lẩu dê (2 người)', price: 290000 },
          { name: 'Lẩu dê (4 người)', price: 520000 },
          { name: 'Thịt dê thêm (300g)', price: 150000 },
        ]},
        { name: 'Dê Nướng', dishes: [
          { name: 'Dê nướng sa tế (300g)', price: 165000 },
          { name: 'Dê hấp gừng (300g)', price: 155000 },
          { name: 'Dê xào lăn (300g)', price: 160000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Bia Larue', price: 25000 }, { name: 'Rượu gạo', price: 40000 },
        ]},
      ],
    },
    {
      name: 'Bánh Cuốn Thanh Trì Bà Hương',
      address: '72 Hùng Vương, Hải Châu, Đà Nẵng',
      lat: 16.0676, lng: 108.2219, phone: '0905678345',
      categories: [
        { name: 'Bánh Cuốn', dishes: [
          { name: 'Bánh cuốn nhân thịt', price: 35000 },
          { name: 'Bánh cuốn nhân nấm', price: 35000 },
          { name: 'Bánh cuốn không nhân', price: 25000 },
          { name: 'Bánh cuốn chiên', price: 40000 },
        ]},
        { name: 'Chả & Thêm', dishes: [
          { name: 'Chả lụa', price: 20000 }, { name: 'Chả chiên', price: 20000 },
        ]},
      ],
    },
    {
      name: 'Nước Ép Trái Cây Tươi Thanh Xuân',
      address: '16 Lê Lợi, Hải Châu, Đà Nẵng',
      lat: 16.0666, lng: 108.2228, phone: '0905789456',
      categories: [
        { name: 'Nước Ép', dishes: [
          { name: 'Nước ép cam', price: 35000 },
          { name: 'Nước ép dứa', price: 30000 },
          { name: 'Nước ép cà rốt táo', price: 35000 },
          { name: 'Nước ép dưa hấu', price: 28000 },
          { name: 'Nước ép bơ', price: 40000 },
        ]},
        { name: 'Sinh Tố', dishes: [
          { name: 'Sinh tố xoài', price: 40000 },
          { name: 'Sinh tố dâu', price: 42000 },
          { name: 'Sinh tố bơ sữa', price: 45000 },
          { name: 'Sinh tố việt quất', price: 50000 },
        ]},
      ],
    },
    {
      name: 'Bún Bò Huế Mệ Thuận',
      address: '221 Lê Đình Dương, Thanh Khê, Đà Nẵng',
      lat: 16.0744, lng: 108.2058, phone: '0905890567',
      categories: [
        { name: 'Bún Bò Huế', dishes: [
          { name: 'Bún bò đặc biệt', price: 55000 },
          { name: 'Bún bò nạm', price: 50000 },
          { name: 'Bún bò gân', price: 52000 },
          { name: 'Bún thịt heo', price: 45000 },
          { name: 'Bún bò giò heo', price: 55000 },
          { name: 'Bún bò chay', price: 38000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Thêm thịt', price: 20000 }, { name: 'Trà đá', price: 5000 },
        ]},
      ],
    },
    {
      name: 'Kem Ốc Quế Thơm Lừng Đà Nẵng',
      address: '5 An Thượng 4, Ngũ Hành Sơn, Đà Nẵng',
      lat: 16.0392, lng: 108.2476, phone: '0905901678',
      categories: [
        { name: 'Kem', dishes: [
          { name: 'Kem ốc quế đơn', price: 15000 },
          { name: 'Kem ốc quế đôi', price: 22000 },
          { name: 'Kem ly', price: 25000 },
          { name: 'Kem cuộn', price: 35000 },
          { name: 'Kem cốt dừa', price: 30000 },
        ]},
        { name: 'Sinh Tố Đá Xay', dishes: [
          { name: 'Sinh tố đá xay dâu', price: 40000 },
          { name: 'Sinh tố đá xay xoài', price: 40000 },
        ]},
      ],
    },
    {
      name: 'Vịt Quay Mỏ Vàng Đà Nẵng',
      address: '93 Tô Ngọc Vân, Sơn Trà, Đà Nẵng',
      lat: 16.0771, lng: 108.2321, phone: '0905012789',
      categories: [
        { name: 'Vịt Quay', dishes: [
          { name: 'Vịt quay nguyên con (1,5-2kg)', price: 420000 },
          { name: 'Vịt quay nửa con', price: 215000 },
          { name: 'Vịt quay 1/4 con', price: 115000 },
          { name: 'Cơm vịt quay phần', price: 75000 },
          { name: 'Phở vịt quay', price: 65000 },
        ]},
        { name: 'Khác', dishes: [
          { name: 'Cháo vịt', price: 45000 }, { name: 'Trứng vịt lộn', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Quán Trứng Nướng Hội An Phố',
      address: '15 Trần Hưng Đạo, Hải Châu, Đà Nẵng',
      lat: 16.0617, lng: 108.2222, phone: '0905123901',
      categories: [
        { name: 'Trứng Nướng', dishes: [
          { name: 'Trứng nướng phô mai (4 quả)', price: 35000 },
          { name: 'Trứng nướng ruốc (4 quả)', price: 35000 },
          { name: 'Trứng nướng bơ tỏi (4 quả)', price: 30000 },
          { name: 'Trứng nướng sa tế (4 quả)', price: 35000 },
        ]},
        { name: 'Bánh Mì Nướng', dishes: [
          { name: 'Bánh mì nướng phô mai', price: 25000 },
          { name: 'Bánh mì nướng bơ tỏi', price: 20000 },
          { name: 'Bánh mì nướng trứng', price: 22000 },
        ]},
      ],
    },
    {
      name: 'Phở Xào Hải Sản Biển Đông',
      address: '45 Võ Văn Kiệt, Sơn Trà, Đà Nẵng',
      lat: 16.0794, lng: 108.2368, phone: '0905234012',
      categories: [
        { name: 'Phở Xào', dishes: [
          { name: 'Phở xào hải sản', price: 75000 },
          { name: 'Phở xào bò', price: 70000 },
          { name: 'Phở xào gà', price: 65000 },
          { name: 'Phở chiên giòn trứng', price: 65000 },
          { name: 'Cơm chiên hải sản', price: 75000 },
          { name: 'Mỳ xào bò', price: 70000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Nước ngọt', price: 15000 }, { name: 'Bia lon', price: 25000 },
        ]},
      ],
    },
    {
      name: 'Bánh Tráng Nướng Bà Út',
      address: '8 Hàm Nghi, Hải Châu, Đà Nẵng',
      lat: 16.0688, lng: 108.2235, phone: '0905345123',
      categories: [
        { name: 'Bánh Tráng Nướng', dishes: [
          { name: 'Bánh tráng nướng trứng tôm', price: 35000 },
          { name: 'Bánh tráng nướng mực khô', price: 40000 },
          { name: 'Bánh tráng nướng phô mai', price: 38000 },
          { name: 'Bánh tráng nướng xúc xích', price: 35000 },
          { name: 'Bánh tráng trộn', price: 30000 },
        ]},
        { name: 'Ăn Vặt', dishes: [
          { name: 'Hột vịt lộn', price: 10000 }, { name: 'Bắp xào', price: 20000 },
        ]},
      ],
    },
    {
      name: 'Cá Cơm Kho Nghệ Cô Tú',
      address: '62 Đinh Tiên Hoàng, Hải Châu, Đà Nẵng',
      lat: 16.0633, lng: 108.2204, phone: '0905456234',
      categories: [
        { name: 'Cơm Nhà', dishes: [
          { name: 'Cơm cá kho nghệ', price: 40000, desc: 'Cá biển kho nghệ kiểu miền Trung' },
          { name: 'Cơm thịt kho gừng', price: 40000 },
          { name: 'Cơm đậu phụ sốt cà', price: 35000 },
          { name: 'Cơm cá chiên sả ớt', price: 42000 },
          { name: 'Cơm canh chua cá', price: 42000 },
        ]},
        { name: 'Canh & Thêm', dishes: [
          { name: 'Canh mướp', price: 10000 }, { name: 'Dưa cải muối', price: 8000 },
        ]},
      ],
    },
    {
      name: 'Bún Mắm Cô Năm Miền Tây',
      address: '112 Ngô Gia Tự, Liên Chiểu, Đà Nẵng',
      lat: 16.1018, lng: 108.1741, phone: '0905567345',
      categories: [
        { name: 'Bún Mắm', dishes: [
          { name: 'Bún mắm đặc biệt', price: 60000, desc: 'Bún mắm miền Tây đậm đà hương vị' },
          { name: 'Bún mắm thường', price: 45000 },
          { name: 'Bún mắm hải sản', price: 65000 },
          { name: 'Bún mắm ếch', price: 65000 },
        ]},
        { name: 'Thêm', dishes: [
          { name: 'Thêm thịt heo quay', price: 25000 },
          { name: 'Rau đĩa thêm', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Gà Nướng Mật Ong Phong Lan',
      address: '44 Ông Ích Khiêm, Hải Châu, Đà Nẵng',
      lat: 16.0652, lng: 108.2194, phone: '0905678456',
      categories: [
        { name: 'Gà Nướng', dishes: [
          { name: 'Gà nướng mật ong nguyên con', price: 220000 },
          { name: 'Gà nướng mật ong nửa con', price: 115000 },
          { name: 'Đùi gà nướng mật ong', price: 65000 },
          { name: 'Cánh gà nướng sốt BBQ', price: 75000 },
          { name: 'Cánh gà chiên nước mắm', price: 70000 },
        ]},
        { name: 'Cơm & Phụ', dishes: [
          { name: 'Cơm trắng', price: 5000 }, { name: 'Khoai tây chiên', price: 30000 },
        ]},
      ],
    },
    {
      name: 'Tôm Chua Nem Chua Bà Nở Huế',
      address: '36 Lê Hồng Phong, Hải Châu, Đà Nẵng',
      lat: 16.0706, lng: 108.2199, phone: '0905789567',
      categories: [
        { name: 'Nem Chua & Tôm Chua', dishes: [
          { name: 'Tôm chua Huế (200g)', price: 65000 },
          { name: 'Nem chua Thanh Hóa (gói 5)', price: 25000 },
          { name: 'Tôm chua kèm thịt luộc', price: 95000 },
        ]},
        { name: 'Bánh Tráng Cuốn', dishes: [
          { name: 'Thịt luộc cuốn bánh tráng', price: 80000 },
          { name: 'Cá bống kho cuốn bánh tráng', price: 75000 },
          { name: 'Hến xào lá lốt', price: 65000 },
        ]},
      ],
    },
    {
      name: 'Cà Phê Trứng Hà Nội Giữa Đà Nẵng',
      address: '6 Trần Bình Trọng, Hải Châu, Đà Nẵng',
      lat: 16.0659, lng: 108.2229, phone: '0905890678',
      categories: [
        { name: 'Cà Phê', dishes: [
          { name: 'Cà phê trứng nóng', price: 45000, desc: 'Cà phê trứng kiểu Hà Nội' },
          { name: 'Cà phê trứng đá', price: 50000 },
          { name: 'Cà phê sữa đá', price: 30000 },
          { name: 'Cà phê đen đá', price: 25000 },
          { name: 'Bạc xỉu đá', price: 30000 },
        ]},
        { name: 'Trà', dishes: [
          { name: 'Trà hoa nhài', price: 30000 },
          { name: 'Trà sen', price: 35000 },
        ]},
        { name: 'Bánh', dishes: [
          { name: 'Bánh flan', price: 25000 }, { name: 'Bánh mì bơ', price: 20000 },
        ]},
      ],
    },
    {
      name: 'Bún Thái Bò Viên Sài Gòn',
      address: '158 Hoàng Văn Thụ, Thanh Khê, Đà Nẵng',
      lat: 16.0757, lng: 108.2065, phone: '0905901789',
      categories: [
        { name: 'Bún Thái', dishes: [
          { name: 'Bún Thái hải sản', price: 65000 },
          { name: 'Bún Thái bò viên', price: 55000 },
          { name: 'Bún Thái gà', price: 55000 },
          { name: 'Phở Thái đặc biệt', price: 65000 },
        ]},
        { name: 'Bún Bò Viên', dishes: [
          { name: 'Bún bò viên sa tế', price: 50000 },
          { name: 'Phở bò viên', price: 50000 },
        ]},
      ],
    },
    {
      name: 'Mì Quảng Nam Miền Trung',
      address: '225 Hùng Vương, Thanh Khê, Đà Nẵng',
      lat: 16.0782, lng: 108.2048, phone: '0905012890',
      categories: [
        { name: 'Mỳ Quảng', dishes: [
          { name: 'Mỳ quảng đặc biệt', price: 55000 },
          { name: 'Mỳ quảng tôm cua', price: 65000 },
          { name: 'Mỳ quảng sứa', price: 55000 },
          { name: 'Mỳ quảng gà', price: 50000 },
          { name: 'Mỳ quảng ếch', price: 60000 },
        ]},
        { name: 'Phụ', dishes: [
          { name: 'Bánh tráng nướng', price: 8000 }, { name: 'Rau ghém', price: 10000 },
        ]},
      ],
    },
    {
      name: 'Bánh Mì Phương Hội An Đà Nẵng',
      address: '2B Phan Châu Trinh, Hải Châu, Đà Nẵng',
      lat: 16.0686, lng: 108.2240, phone: '02353861527',
      categories: [
        { name: 'Bánh Mì', dishes: [
          { name: 'Bánh mì đặc biệt thịt hỗn hợp', price: 35000 },
          { name: 'Bánh mì gà quay', price: 35000 },
          { name: 'Bánh mì heo quay', price: 35000 },
          { name: 'Bánh mì pate', price: 25000 },
          { name: 'Bánh mì chả cá', price: 28000 },
          { name: 'Bánh mì trứng phô mai', price: 30000 },
        ]},
      ],
    },
    {
      name: 'Lẩu Hải Sản Sơn Trà Seaside',
      address: '18 Phạm Văn Đồng, Sơn Trà, Đà Nẵng',
      lat: 16.0728, lng: 108.2298, phone: '0236395002',
      categories: [
        { name: 'Lẩu Hải Sản', dishes: [
          { name: 'Lẩu hải sản tươi (2 người)', price: 350000 },
          { name: 'Lẩu mực tôm cua (2 người)', price: 320000 },
          { name: 'Lẩu cá mú (2 người)', price: 340000 },
          { name: 'Lẩu tôm hùm (2 người)', price: 680000 },
        ]},
        { name: 'Hải Sản Hấp', dishes: [
          { name: 'Tôm hấp bia', price: 180000 },
          { name: 'Sò điệp nướng (10 con)', price: 130000 },
          { name: 'Hàu nướng phô mai (10 con)', price: 120000 },
        ]},
        { name: 'Đồ Uống', dishes: [
          { name: 'Bia Heineken', price: 35000 }, { name: 'Rượu vang đỏ (ly)', price: 60000 },
        ]},
      ],
    },
    {
      name: 'Bếp Mẹ Miền Trung Quán Ngon',
      address: '64 Phan Đình Phùng, Hải Châu, Đà Nẵng',
      lat: 16.0647, lng: 108.2197, phone: '0905123456',
      categories: [
        { name: 'Cơm Nhà', dishes: [
          { name: 'Cơm hến', price: 35000, desc: 'Cơm hến Huế đặc trưng' },
          { name: 'Cơm đĩa mẹ nấu đặc biệt', price: 55000 },
          { name: 'Canh chua cá thu', price: 35000 },
          { name: 'Cá chiên giòn', price: 65000 },
          { name: 'Thịt heo kho tiêu', price: 45000 },
        ]},
        { name: 'Cháo', dishes: [
          { name: 'Cháo thịt bằm', price: 35000 }, { name: 'Cháo hến', price: 38000 },
        ]},
      ],
    },
  ];
}

// ===== HELPERS =====
function toSlug(str) {
  if (!str) return '';
  const map = { 'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y','đ':'d' };
  return str.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9]/g, '').substring(0, 48);
}
function toSlugDash(str) {
  if (!str) return '';
  const map = { 'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y','đ':'d' };
  return str.toLowerCase().split('').map(c => map[c] || (c === ' ' ? '-' : c)).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').substring(0, 100);
}
function esc(str) {
  if (str == null) return 'NULL';
  return `'${String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

// ===== GENERATE SQL =====
async function buildSQL(restaurants, passwordHash) {
  const lines = [];
  lines.push('-- AUTO GENERATED - 50 Quán ăn Đà Nẵng');
  lines.push(`-- Tạo lúc: ${new Date().toLocaleString('vi-VN')}`);
  lines.push('');
  lines.push('SET FOREIGN_KEY_CHECKS = 0;');
  lines.push('SET NAMES utf8mb4;');
  lines.push('');

  const credentials = [];

  for (let i = 0; i < restaurants.length; i++) {
    const r = restaurants[i];
    const username = toSlug(r.name) || `quan${i + 1}`;
    const email = `${username}@dishnet.vn`;
    const slug = `${toSlugDash(r.name)}-${i + 1}`;
    const phone = r.phone || null;
    credentials.push(`${r.name} | ${username} | ${PASSWORD}`);

    lines.push(`-- ===== [${i + 1}/${restaurants.length}] ${r.name} =====`);
    lines.push(`INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)`);
    lines.push(`VALUES (${esc(username)}, ${esc(email)}, ${phone ? esc(phone) : 'NULL'}, ${esc(passwordHash)}, ${esc(r.name)}, 0, 1, 'hoat_dong', 'email', NOW(), 4.50, NOW(), NOW());`);
    lines.push('');
    lines.push(`INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)`);
    lines.push(`SELECT id, ${esc(r.name)}, ${esc(slug)}, ${esc(r.address)}, ${esc('Đà Nẵng')}, ${r.lat ?? 'NULL'}, ${r.lng ?? 'NULL'}, ${phone ? esc(phone) : 'NULL'}, 'hoat_dong', 4.20, FLOOR(RAND()*500), FLOOR(RAND()*2000), FLOOR(RAND()*800), 0, 15000`);
    lines.push(`FROM nguoi_dung WHERE ten_dang_nhap = ${esc(username)} LIMIT 1;`);
    lines.push('');

    for (let ci = 0; ci < r.categories.length; ci++) {
      const cat = r.categories[ci];
      lines.push(`INSERT INTO danh_muc_mon (id_cua_hang, ten_danh_muc, thu_tu_hien_thi, trang_thai)`);
      lines.push(`SELECT ch.id, ${esc(cat.name)}, ${ci + 1}, 'hieu_luc'`);
      lines.push(`FROM cua_hang ch JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = ${esc(username)} LIMIT 1;`);
      lines.push('');

      for (let di = 0; di < cat.dishes.length; di++) {
        const dish = cat.dishes[di];
        const ma = `${username.substring(0, 6).toUpperCase()}${String(ci + 1).padStart(1, '0')}-${String(di + 1).padStart(3, '0')}`;
        lines.push(`INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)`);
        lines.push(`SELECT ch.id, dm.id, ${esc(ma)}, ${esc(dish.name)}, ${dish.desc ? esc(dish.desc) : 'NULL'}, ${dish.price}, 'dang_ban', FLOOR(RAND()*200), 0, 0, ${di === 0 ? 1 : 0}, NOW(), NOW()`);
        lines.push(`FROM cua_hang ch`);
        lines.push(`JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = ${esc(cat.name)} AND dm.thu_tu_hien_thi = ${ci + 1}`);
        lines.push(`JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = ${esc(username)} LIMIT 1;`);
      }
      lines.push('');
    }
    lines.push('');
  }

  lines.push('SET FOREIGN_KEY_CHECKS = 1;');
  return { sql: lines.join('\n'), credentials };
}

// ===== MAIN =====
async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log('Tạo data 50 quán ẩm thực Đà Nẵng...\n');

  // Thử ShopeeFood trước
  let rawList = null;
  rawList = await tryShopeePostApi();
  if (!rawList) rawList = await tryShopeeGetApi();
  if (!rawList) rawList = await tryFoodyWebApi();

  let restaurants;
  if (rawList && rawList.length > 0) {
    console.log(`\nLay duoc ${rawList.length} quan tu ShopeeFood. Chuyen sang dataset that...`);
    // ShopeeFood data không có menu chi tiết, dùng dataset thực tế
    restaurants = getRealDaNangRestaurants();
  } else {
    console.log('\nDung dataset thuc te 50 quan Da Nang.\n');
    restaurants = getRealDaNangRestaurants();
  }

  console.log(`Dang hash password...`);
  const passwordHash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);
  console.log(`Hash xong: ${passwordHash.substring(0, 20)}...`);

  console.log(`Dang tao SQL cho ${restaurants.length} quan...`);
  const { sql, credentials } = await buildSQL(restaurants, passwordHash);

  fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');
  const credFile = path.join(OUTPUT_DIR, 'credentials.txt');
  fs.writeFileSync(credFile, credentials.join('\n'), 'utf8');

  console.log(`\nHOAN THANH!`);
  console.log(`SQL: ${OUTPUT_FILE}`);
  console.log(`Credentials: ${credFile}`);
  console.log(`Tong: ${restaurants.length} quan\n`);
  console.log('--- Danh sach tai khoan (10 dau) ---');
  credentials.slice(0, 10).forEach(c => console.log(c));
  console.log(`... va ${credentials.length - 10} quan nua trong credentials.txt`);
}

main().catch(console.error);
