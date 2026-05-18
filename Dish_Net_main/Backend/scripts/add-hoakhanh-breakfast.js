/**
 * 30 quán ăn sáng khu vực Hòa Khánh - Liên Chiểu, Đà Nẵng
 * Chạy: node scripts/add-hoakhanh-breakfast.js
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const PASSWORD = 'admin123';
const SALT_ROUNDS = 10;
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'insert_hoakhanh_breakfast.sql');

const restaurants = [
  {
    name: 'Bánh Mì Chị Lan Hòa Khánh',
    address: '45 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0934, lng: 108.1612, phone: '0905111201',
    categories: [
      { name: 'Bánh Mì', dishes: [
        { name: 'Bánh mì đặc biệt', price: 25000, desc: 'Bánh mì pate thịt hỗn hợp' },
        { name: 'Bánh mì thịt nướng', price: 25000 },
        { name: 'Bánh mì trứng ốp la', price: 18000 },
        { name: 'Bánh mì chả lụa', price: 20000 },
        { name: 'Bánh mì bơ mật ong', price: 12000 },
        { name: 'Bánh mì pate không', price: 15000 },
      ]},
      { name: 'Đồ Uống', dishes: [
        { name: 'Cà phê sữa đá', price: 20000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bún Bò Mệ Hoa Hòa Khánh',
    address: '12 Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0871, lng: 108.1598, phone: '0905111202',
    categories: [
      { name: 'Bún Bò Huế', dishes: [
        { name: 'Bún bò đặc biệt', price: 50000, desc: 'Bún bò Huế đặc biệt giò heo chả cua' },
        { name: 'Bún bò thường', price: 38000 },
        { name: 'Bún bò giò heo', price: 45000 },
        { name: 'Bún bò chả cua', price: 45000 },
        { name: 'Bún thịt heo', price: 38000 },
        { name: 'Bún bò nạm gân', price: 45000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Thêm thịt', price: 18000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Phở Gà Bà Hòa - Liên Chiểu',
    address: '78 Trần Thị Lý, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0956, lng: 108.1623, phone: '0905111203',
    categories: [
      { name: 'Phở', dishes: [
        { name: 'Phở gà đặc biệt', price: 50000 },
        { name: 'Phở gà tái', price: 45000 },
        { name: 'Phở bò tái chín', price: 52000 },
        { name: 'Phở bò gầu gân', price: 55000 },
        { name: 'Phở hải sản', price: 60000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Quẩy', price: 5000 }, { name: 'Trứng bắc thảo', price: 10000 },
      ]},
    ],
  },
  {
    name: 'Bánh Cuốn Cô Thanh Hòa Khánh',
    address: '34 Chu Văn An, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0848, lng: 108.1571, phone: '0905111204',
    categories: [
      { name: 'Bánh Cuốn', dishes: [
        { name: 'Bánh cuốn nhân thịt nấm', price: 35000 },
        { name: 'Bánh cuốn nhân tôm thịt', price: 38000 },
        { name: 'Bánh cuốn không nhân', price: 25000 },
        { name: 'Bánh cuốn chiên giòn', price: 38000 },
        { name: 'Bánh ướt chả lụa', price: 30000 },
      ]},
      { name: 'Chả & Phụ', dishes: [
        { name: 'Chả lụa thêm', price: 15000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Xôi Sáng Cô Nga Hòa Khánh',
    address: '56 Hoàng Văn Thái, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0921, lng: 108.1587, phone: '0905111205',
    categories: [
      { name: 'Xôi', dishes: [
        { name: 'Xôi gà xé', price: 30000 },
        { name: 'Xôi xéo đậu xanh', price: 18000 },
        { name: 'Xôi lạp xưởng trứng', price: 28000 },
        { name: 'Xôi gấc', price: 20000 },
        { name: 'Xôi bắp', price: 15000 },
        { name: 'Xôi đậu phộng', price: 15000 },
      ]},
      { name: 'Đồ Uống', dishes: [
        { name: 'Sữa đậu nành', price: 10000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Cháo Trắng Bà Tư Liên Chiểu',
    address: '19 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0862, lng: 108.1543, phone: '0905111206',
    categories: [
      { name: 'Cháo', dishes: [
        { name: 'Cháo trắng heo quay', price: 35000 },
        { name: 'Cháo lòng đặc biệt', price: 38000 },
        { name: 'Cháo gà', price: 35000 },
        { name: 'Cháo cá lóc', price: 38000 },
        { name: 'Cháo tôm thịt', price: 40000 },
        { name: 'Cháo trắng (không nhân)', price: 20000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Quẩy', price: 5000 }, { name: 'Huyết', price: 8000 },
      ]},
    ],
  },
  {
    name: 'Mỳ Quảng Cô Tám Hòa Khánh',
    address: '91 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0948, lng: 108.1619, phone: '0905111207',
    categories: [
      { name: 'Mỳ Quảng', dishes: [
        { name: 'Mỳ quảng tôm thịt', price: 45000 },
        { name: 'Mỳ quảng gà', price: 42000 },
        { name: 'Mỳ quảng sườn', price: 45000 },
        { name: 'Mỳ quảng cá lóc', price: 45000 },
        { name: 'Mỳ quảng đặc biệt', price: 52000 },
        { name: 'Mỳ quảng chay', price: 32000 },
      ]},
      { name: 'Phụ', dishes: [
        { name: 'Bánh đa', price: 5000 }, { name: 'Rau thêm', price: 8000 },
      ]},
    ],
  },
  {
    name: 'Bún Riêu Cô Năm Liên Chiểu',
    address: '22 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0839, lng: 108.1562, phone: '0905111208',
    categories: [
      { name: 'Bún Riêu', dishes: [
        { name: 'Bún riêu cua đặc biệt', price: 45000, desc: 'Bún riêu cua đồng thơm ngon' },
        { name: 'Bún riêu cua thường', price: 35000 },
        { name: 'Bún riêu tôm', price: 42000 },
        { name: 'Bún bò huế + riêu', price: 48000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Đậu hũ chiên thêm', price: 10000 }, { name: 'Huyết thêm', price: 8000 },
      ]},
    ],
  },
  {
    name: 'Bánh Bèo Chén Bà Sáu Hòa Khánh',
    address: '67 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0912, lng: 108.1601, phone: '0905111209',
    categories: [
      { name: 'Bánh Bèo', dishes: [
        { name: 'Bánh bèo chén (8 chén)', price: 35000, desc: 'Bánh bèo Huế truyền thống' },
        { name: 'Bánh bèo lá (đĩa)', price: 30000 },
        { name: 'Bánh ít trần nhân tôm thịt (6 cái)', price: 35000 },
        { name: 'Bánh nậm (đĩa 6 cái)', price: 32000 },
        { name: 'Set hỗn hợp 3 loại', price: 55000 },
      ]},
      { name: 'Đồ Uống', dishes: [
        { name: 'Trà đá', price: 5000 }, { name: 'Nước ngọt', price: 12000 },
      ]},
    ],
  },
  {
    name: 'Hủ Tiếu Bò Kho Sáng Hòa Khánh',
    address: '143 Trần Thị Lý, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0857, lng: 108.1631, phone: '0905111210',
    categories: [
      { name: 'Hủ Tiếu & Bò Kho', dishes: [
        { name: 'Hủ tiếu bò kho', price: 50000, desc: 'Hủ tiếu bò kho đậm đà bánh mì chấm' },
        { name: 'Bánh mì bò kho', price: 35000 },
        { name: 'Hủ tiếu khô tôm thịt', price: 48000 },
        { name: 'Hủ tiếu nước đặc biệt', price: 50000 },
        { name: 'Mỳ bò kho', price: 50000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Thịt bò thêm', price: 20000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bánh Ướt Thịt Nướng Cô Liên',
    address: '38 Chu Văn An, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0937, lng: 108.1577, phone: '0905111211',
    categories: [
      { name: 'Bánh Ướt', dishes: [
        { name: 'Bánh ướt thịt nướng', price: 40000 },
        { name: 'Bánh ướt chả lụa', price: 32000 },
        { name: 'Bánh ướt tôm khô', price: 35000 },
        { name: 'Bánh ướt trứng', price: 30000 },
        { name: 'Bánh ướt hỗn hợp', price: 45000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Thịt nướng thêm', price: 20000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Phở Bò Anh Tuấn Liên Chiểu',
    address: '201 Ngô Gia Tự, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0823, lng: 108.1554, phone: '0905111212',
    categories: [
      { name: 'Phở Bò', dishes: [
        { name: 'Phở bò tái lăn', price: 55000 },
        { name: 'Phở bò tái nạm gân', price: 55000 },
        { name: 'Phở bò chín gầu', price: 52000 },
        { name: 'Phở bò đặc biệt', price: 60000, desc: 'Đầy đủ tái nạm gân gầu' },
        { name: 'Phở bò viên', price: 48000 },
      ]},
      { name: 'Phụ', dishes: [
        { name: 'Quẩy', price: 5000 }, { name: 'Giá trụng', price: 8000 },
      ]},
    ],
  },
  {
    name: 'Cơm Tấm Sườn Bì Chả Sáng Hòa Khánh',
    address: '55 Hoàng Văn Thái, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0919, lng: 108.1593, phone: '0905111213',
    categories: [
      { name: 'Cơm Tấm', dishes: [
        { name: 'Cơm tấm sườn bì chả', price: 50000 },
        { name: 'Cơm tấm sườn nướng', price: 45000 },
        { name: 'Cơm tấm bì chả', price: 40000 },
        { name: 'Cơm tấm sườn trứng', price: 48000 },
        { name: 'Cơm tấm đặc biệt', price: 55000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Trứng ốp la', price: 8000 }, { name: 'Canh khổ qua', price: 12000 },
      ]},
    ],
  },
  {
    name: 'Bánh Canh Chả Cá Bà Minh Liên Chiểu',
    address: '17 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0878, lng: 108.1549, phone: '0905111214',
    categories: [
      { name: 'Bánh Canh', dishes: [
        { name: 'Bánh canh chả cá', price: 42000 },
        { name: 'Bánh canh tôm cua', price: 50000 },
        { name: 'Bánh canh giò heo', price: 48000 },
        { name: 'Bánh canh đặc biệt', price: 52000 },
        { name: 'Bún chả cá', price: 38000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Chả cá thêm', price: 15000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bún Chả Hà Nội Cô Hương Hòa Khánh',
    address: '88 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0943, lng: 108.1607, phone: '0905111215',
    categories: [
      { name: 'Bún Chả', dishes: [
        { name: 'Bún chả Hà Nội', price: 55000, desc: 'Bún chả Hà Nội chả miếng + chả viên' },
        { name: 'Bún chả nem cua bể', price: 65000 },
        { name: 'Chả nướng (5 miếng)', price: 35000 },
        { name: 'Bún chả chay', price: 40000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Nem cua bể (2 cái)', price: 25000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bún Thịt Nướng Cô Duyên Hòa Khánh',
    address: '32 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0844, lng: 108.1568, phone: '0905111216',
    categories: [
      { name: 'Bún Thịt Nướng', dishes: [
        { name: 'Bún thịt nướng chả giò', price: 48000 },
        { name: 'Bún thịt nướng đặc biệt', price: 50000 },
        { name: 'Bún thịt nướng gà', price: 45000 },
        { name: 'Bún bò viên thịt nướng', price: 50000 },
        { name: 'Bún chay nướng', price: 32000 },
      ]},
      { name: 'Phụ', dishes: [
        { name: 'Chả giò (3 cái)', price: 20000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Xôi Gà Lá Dứa Cô Vân',
    address: '72 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0928, lng: 108.1615, phone: '0905111217',
    categories: [
      { name: 'Xôi Lá', dishes: [
        { name: 'Xôi lá dứa gà xé', price: 32000 },
        { name: 'Xôi lá dứa đậu xanh', price: 22000 },
        { name: 'Xôi lá dứa lạp xưởng', price: 28000 },
        { name: 'Xôi trắng muối vừng', price: 15000 },
        { name: 'Xôi chiên phồng', price: 25000 },
      ]},
      { name: 'Sữa & Uống', dishes: [
        { name: 'Sữa đậu nành', price: 10000 }, { name: 'Cà phê đen đá', price: 18000 },
      ]},
    ],
  },
  {
    name: 'Bún Sứa Mắm Ruốc Cô Ba Liên Chiểu',
    address: '115 Trần Thị Lý, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0853, lng: 108.1626, phone: '0905111218',
    categories: [
      { name: 'Bún Sứa & Mắm Nêm', dishes: [
        { name: 'Bún sứa mắm ruốc', price: 40000, desc: 'Đặc sản Đà Nẵng - bún sứa mắm ruốc' },
        { name: 'Bún mắm nêm thịt heo', price: 42000 },
        { name: 'Bún mắm nêm tôm', price: 45000 },
        { name: 'Bún bò đặc biệt', price: 45000 },
        { name: 'Bún chả cá', price: 38000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Rau sống thêm', price: 8000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Cà Phê Sáng Bà Bảy Hòa Khánh',
    address: '48 Chu Văn An, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0915, lng: 108.1579, phone: '0905111219',
    categories: [
      { name: 'Cà Phê', dishes: [
        { name: 'Cà phê sữa đá', price: 22000 },
        { name: 'Cà phê đen đá', price: 18000 },
        { name: 'Bạc xỉu đá', price: 22000 },
        { name: 'Cà phê sữa nóng', price: 20000 },
        { name: 'Cà phê đen nóng', price: 15000 },
      ]},
      { name: 'Ăn Sáng Kèm', dishes: [
        { name: 'Bánh mì bơ', price: 10000 },
        { name: 'Bánh mì trứng', price: 15000 },
        { name: 'Bánh tiêu', price: 8000 },
      ]},
    ],
  },
  {
    name: 'Bánh Mì Que Đà Nẵng Hòa Khánh',
    address: '9 Hoàng Văn Thái, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0867, lng: 108.1590, phone: '0905111220',
    categories: [
      { name: 'Bánh Mì Que', dishes: [
        { name: 'Bánh mì que chả lụa', price: 15000 },
        { name: 'Bánh mì que trứng', price: 15000 },
        { name: 'Bánh mì que phô mai', price: 18000 },
        { name: 'Bánh mì que xúc xích', price: 18000 },
        { name: 'Bánh mì que bơ tỏi', price: 12000 },
      ]},
      { name: 'Đồ Uống', dishes: [
        { name: 'Sữa tươi đóng hộp', price: 12000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Mì Quảng Bà Phước Hòa Khánh',
    address: '163 Ngô Gia Tự, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0962, lng: 108.1635, phone: '0905111221',
    categories: [
      { name: 'Mỳ Quảng', dishes: [
        { name: 'Mỳ quảng gà lá é', price: 45000, desc: 'Mỳ quảng gà nấu lá é thơm đặc trưng' },
        { name: 'Mỳ quảng tôm cua', price: 52000 },
        { name: 'Mỳ quảng thịt heo', price: 42000 },
        { name: 'Mỳ quảng bê', price: 55000 },
        { name: 'Mỳ quảng sứa', price: 50000 },
      ]},
      { name: 'Phụ', dishes: [
        { name: 'Bánh tráng nướng', price: 8000 }, { name: 'Ớt xanh muối', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Cơm Nhà Bà Chiến Liên Chiểu',
    address: '77 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0835, lng: 108.1547, phone: '0905111222',
    categories: [
      { name: 'Cơm Sáng', dishes: [
        { name: 'Cơm sườn kho sả ớt', price: 38000 },
        { name: 'Cơm cá kho tiêu', price: 38000 },
        { name: 'Cơm trứng chiên thịt băm', price: 35000 },
        { name: 'Cơm thịt luộc dưa cải', price: 38000 },
        { name: 'Cơm đặc biệt 2 món', price: 48000 },
      ]},
      { name: 'Canh', dishes: [
        { name: 'Canh rau muống', price: 8000 }, { name: 'Canh bí đỏ', price: 10000 },
      ]},
    ],
  },
  {
    name: 'Bún Đậu Sáng Cô Hà Hòa Khánh',
    address: '29 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0906, lng: 108.1603, phone: '0905111223',
    categories: [
      { name: 'Bún Đậu', dishes: [
        { name: 'Bún đậu mắm tôm set A', price: 55000 },
        { name: 'Bún đậu mắm tôm set B', price: 70000 },
        { name: 'Bún đậu chay', price: 40000 },
        { name: 'Đậu hũ chiên (đĩa)', price: 25000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Nem rán (3 cái)', price: 20000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bánh Tét Lá Chuối Bà Lành',
    address: '53 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0842, lng: 108.1561, phone: '0905111224',
    categories: [
      { name: 'Bánh Truyền Thống', dishes: [
        { name: 'Bánh tét đòn (1 khúc)', price: 18000, desc: 'Bánh tét lá chuối nhân đậu thịt' },
        { name: 'Bánh tét chay (1 khúc)', price: 15000 },
        { name: 'Bánh ú nhân đậu (1 cái)', price: 15000 },
        { name: 'Bánh lọc tôm thịt (6 cái)', price: 35000 },
        { name: 'Bánh lọc chay (6 cái)', price: 28000 },
        { name: 'Bánh bột lọc bọc (6 cái)', price: 35000 },
      ]},
      { name: 'Chè', dishes: [
        { name: 'Chè đậu xanh', price: 15000 }, { name: 'Chè hạt sen', price: 20000 },
      ]},
    ],
  },
  {
    name: 'Phở Xào Sáng Hòa Khánh Anh Đức',
    address: '117 Chu Văn An, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0951, lng: 108.1581, phone: '0905111225',
    categories: [
      { name: 'Phở Xào & Chiên', dishes: [
        { name: 'Phở xào bò', price: 55000 },
        { name: 'Phở xào hải sản', price: 65000 },
        { name: 'Phở chiên giòn trứng bò', price: 60000 },
        { name: 'Cơm chiên dương châu', price: 50000 },
        { name: 'Mỳ xào bò cải', price: 55000 },
      ]},
      { name: 'Đồ Uống', dishes: [
        { name: 'Nước ngọt', price: 12000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Cháo Lòng Heo Bà Tuyết Liên Chiểu',
    address: '84 Trần Thị Lý, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0859, lng: 108.1629, phone: '0905111226',
    categories: [
      { name: 'Cháo Lòng', dishes: [
        { name: 'Cháo lòng đặc biệt', price: 42000, desc: 'Cháo lòng heo đầy đủ tim gan phổi' },
        { name: 'Cháo lòng thường', price: 32000 },
        { name: 'Cháo trắng heo quay', price: 40000 },
        { name: 'Cháo gà sáng', price: 38000 },
        { name: 'Tiết canh (theo mùa)', price: 30000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Lòng thêm', price: 20000 }, { name: 'Quẩy', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bánh Mì Pate Chú Hùng Hòa Khánh',
    address: '41 Hoàng Văn Thái, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0924, lng: 108.1591, phone: '0905111227',
    categories: [
      { name: 'Bánh Mì', dishes: [
        { name: 'Bánh mì pate đặc biệt', price: 22000 },
        { name: 'Bánh mì thịt nguội xúc xích', price: 25000 },
        { name: 'Bánh mì ốp la pate', price: 20000 },
        { name: 'Bánh mì chả cá thu', price: 22000 },
        { name: 'Bánh mì thịt quay', price: 25000 },
      ]},
      { name: 'Cà Phê', dishes: [
        { name: 'Cà phê sữa đá', price: 20000 }, { name: 'Cà phê đen đá', price: 15000 },
      ]},
    ],
  },
  {
    name: 'Bún Bò Nam Bộ Sáng Hòa Khánh',
    address: '66 Phan Văn Định, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0831, lng: 108.1545, phone: '0905111228',
    categories: [
      { name: 'Bún Bò Nam Bộ', dishes: [
        { name: 'Bún bò Nam Bộ đặc biệt', price: 55000, desc: 'Bún bò xào kiểu Nam Bộ rau thơm đa dạng' },
        { name: 'Bún bò Nam Bộ thường', price: 45000 },
        { name: 'Phở bò Nam Bộ', price: 55000 },
        { name: 'Bún gà Nam Bộ', price: 48000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Bò thêm (50g)', price: 20000 }, { name: 'Trà đá', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Hủ Tiếu Mỳ Bà Loan Liên Chiểu',
    address: '139 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    lat: 16.0969, lng: 108.1622, phone: '0905111229',
    categories: [
      { name: 'Hủ Tiếu', dishes: [
        { name: 'Hủ tiếu Nam Vang', price: 52000 },
        { name: 'Hủ tiếu mực tôm', price: 55000 },
        { name: 'Hủ tiếu khô tôm thịt', price: 50000 },
        { name: 'Mỳ wonton tôm thịt', price: 52000 },
        { name: 'Cháo trắng hủ tiếu', price: 38000 },
      ]},
      { name: 'Thêm', dishes: [
        { name: 'Trứng cút', price: 5000 }, { name: 'Quẩy', price: 5000 },
      ]},
    ],
  },
  {
    name: 'Bánh Ít Lá Gai Cô Xuân Liên Chiểu',
    address: '24 Dũng Sĩ Thanh Khê, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    lat: 16.0837, lng: 108.1564, phone: '0905111230',
    categories: [
      { name: 'Bánh Đặc Sản', dishes: [
        { name: 'Bánh ít lá gai nhân đậu (6 cái)', price: 30000, desc: 'Bánh ít lá gai đặc sản miền Trung' },
        { name: 'Bánh ít trần nhân tôm (6 cái)', price: 35000 },
        { name: 'Bánh in (hộp)', price: 45000 },
        { name: 'Bánh tổ (1 cái)', price: 25000 },
        { name: 'Bánh khúc (1 cái)', price: 18000 },
      ]},
      { name: 'Chè Sáng', dishes: [
        { name: 'Chè đậu đen', price: 15000 }, { name: 'Chè trôi nước', price: 18000 },
      ]},
    ],
  },
];

// ===== HELPERS =====
function toSlug(str) {
  if (!str) return '';
  const map = {'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y','đ':'d'};
  return str.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9]/g, '').substring(0, 48);
}
function toSlugDash(str) {
  if (!str) return '';
  const map = {'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y','đ':'d'};
  return str.toLowerCase().split('').map(c => map[c] || (c === ' ' ? '-' : c)).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').substring(0, 100);
}
function esc(str) {
  if (str == null) return 'NULL';
  return `'${String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Dang hash password...`);
  const passwordHash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);
  console.log(`Hash xong.`);

  const lines = [];
  lines.push('-- 30 Quan an sang khu vuc Hoa Khanh - Lien Chieu, Da Nang');
  lines.push(`-- Tao luc: ${new Date().toLocaleString('vi-VN')}`);
  lines.push('');
  lines.push('SET FOREIGN_KEY_CHECKS = 0;');
  lines.push('SET NAMES utf8mb4;');
  lines.push('');

  const credentials = [];

  for (let i = 0; i < restaurants.length; i++) {
    const r = restaurants[i];
    const username = toSlug(r.name) || `quansang${i + 1}`;
    const email = `${username}@dishnet.vn`;
    const slug = `${toSlugDash(r.name)}-hk-${i + 1}`;
    credentials.push(`${r.name} | ${username} | ${PASSWORD}`);

    lines.push(`-- ===== [${i + 1}/${restaurants.length}] ${r.name} =====`);
    lines.push(`INSERT IGNORE INTO nguoi_dung (ten_dang_nhap, email, so_dien_thoai, mat_khau_bam, ten_hien_thi, la_admin, la_chu_cua_hang, trang_thai_tai_khoan, nguon_dang_ky, thoi_gian_xac_thuc_email, diem_uy_tin, ngay_tao, ngay_cap_nhat)`);
    lines.push(`VALUES (${esc(username)}, ${esc(email)}, ${r.phone ? esc(r.phone) : 'NULL'}, ${esc(passwordHash)}, ${esc(r.name)}, 0, 1, 'hoat_dong', 'email', NOW(), 4.30, NOW(), NOW());`);
    lines.push('');
    lines.push(`INSERT INTO cua_hang (id_chu_so_huu, ten_cua_hang, slug, dia_chi_kinh_doanh, khu_vuc, vi_do, kinh_do, so_dien_thoai_lien_he, trang_thai_hoat_dong, diem_danh_gia, tong_don_hang, tong_luot_xem, tong_luot_thich, tu_nhan_giao_hang, phi_van_chuyen_mac_dinh)`);
    lines.push(`SELECT id, ${esc(r.name)}, ${esc(slug)}, ${esc(r.address)}, ${esc('Liên Chiểu, Đà Nẵng')}, ${r.lat ?? 'NULL'}, ${r.lng ?? 'NULL'}, ${r.phone ? esc(r.phone) : 'NULL'}, 'hoat_dong', 4.10, FLOOR(RAND()*300), FLOOR(RAND()*1500), FLOOR(RAND()*600), 0, 12000`);
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
        const ma = `${username.substring(0, 6).toUpperCase()}${ci + 1}-${String(di + 1).padStart(3, '0')}`;
        lines.push(`INSERT INTO mon_an (id_cua_hang, id_danh_muc, ma_mon, ten_mon, mo_ta, gia_ban, trang_thai_ban, so_luong_da_ban, diem_danh_gia, tong_danh_gia, la_mon_noi_bat, ngay_tao, ngay_cap_nhat)`);
        lines.push(`SELECT ch.id, dm.id, ${esc(ma)}, ${esc(dish.name)}, ${dish.desc ? esc(dish.desc) : 'NULL'}, ${dish.price}, 'dang_ban', FLOOR(RAND()*150), 0, 0, ${di === 0 ? 1 : 0}, NOW(), NOW()`);
        lines.push(`FROM cua_hang ch`);
        lines.push(`JOIN danh_muc_mon dm ON dm.id_cua_hang = ch.id AND dm.ten_danh_muc = ${esc(cat.name)} AND dm.thu_tu_hien_thi = ${ci + 1}`);
        lines.push(`JOIN nguoi_dung nd ON nd.id = ch.id_chu_so_huu WHERE nd.ten_dang_nhap = ${esc(username)} LIMIT 1;`);
      }
      lines.push('');
    }
    lines.push('');
  }

  lines.push('SET FOREIGN_KEY_CHECKS = 1;');

  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8');
  const credFile = path.join(OUTPUT_DIR, 'credentials_hoakhanh.txt');
  fs.writeFileSync(credFile, credentials.join('\n'), 'utf8');

  console.log(`\nHOAN THANH!`);
  console.log(`SQL: ${OUTPUT_FILE}`);
  console.log(`Credentials: ${credFile}`);
  console.log(`Tong: ${restaurants.length} quan an sang khu Hoa Khanh\n`);
  console.log('--- Danh sach tai khoan ---');
  credentials.forEach((c, i) => console.log(`${i + 1}. ${c}`));
}

main().catch(console.error);
