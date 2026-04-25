# Hệ thống DishNet – Nền tảng mạng xã hội kinh doanh ẩm thực

## 1. Giới thiệu

DishNet là hệ thống nền tảng mạng xã hội kết hợp kinh doanh ẩm thực trực tuyến, giúp người dùng khám phá món ăn, chia sẻ trải nghiệm, tương tác cộng đồng và thực hiện giao dịch mua bán đồ ăn trên cùng một nền tảng.

Hệ thống hỗ trợ người dùng đăng bài chia sẻ món ăn, đánh giá cửa hàng, đặt món trực tuyến, thanh toán online và theo dõi đơn hàng. Đồng thời, DishNet còn giúp các chủ cửa hàng quản lý gian hàng, sản phẩm, doanh thu và hoạt động kinh doanh hiệu quả hơn.

Dự án được phát triển phục vụ Khóa luận tốt nghiệp (KLTN) tại Đại học Duy Tân, với mục tiêu xây dựng một hệ sinh thái ẩm thực số hiện đại, kết hợp giữa mạng xã hội và thương mại điện tử.

---

## 2. Thành viên thực hiện

* Lê Văn Cường
* Phạm Đình Vân Ly
* Phan Thị Lệ Thi
* Huỳnh Thị Vy
* Trần Thị Mai Yên

### Giảng viên hướng dẫn

* ThS. Nguyễn Minh Nhật

---

## 3. Mục tiêu

* Hỗ trợ người dùng khám phá, chia sẻ và mua bán món ăn trực tuyến thuận tiện hơn
* Tạo nền tảng kết nối giữa khách hàng và người bán trong lĩnh vực ẩm thực
* Ứng dụng mô hình mạng xã hội vào thương mại điện tử ngành thực phẩm
* Tăng khả năng quảng bá sản phẩm cho các cá nhân và cửa hàng kinh doanh ẩm thực
* Xây dựng hệ thống đánh giá uy tín minh bạch cho tài khoản và gian hàng
* Tự động hóa quản lý đơn hàng, doanh thu và hoạt động vận hành hệ thống

---

## 4. Công nghệ sử dụng

### 🔹 Frontend

* Next.js
* HTML, CSS, JavaScript
* Tailwind CSS

### 🔹 Backend

* Node.js
* NestJS

### 🔹 Database

* MySQL

### 🔹 Thanh toán trực tuyến

* VNPAY Integration

### 🔹 Quản lý mã nguồn

* GitHub

---

## 5. Tính năng chính

### Đối với khách vãng lai

* Xem bài đăng và hình ảnh món ăn
* Tìm kiếm món ăn, cửa hàng
* Xem đánh giá, bình luận và điểm uy tín
* Xem bảng tin xu hướng “Hôm nay ăn gì?”
* Đăng ký tài khoản

### Đối với người dùng

* Đăng nhập và quản lý hồ sơ cá nhân
* Đăng bài chia sẻ trải nghiệm ẩm thực
* Tương tác: thích, bình luận, theo dõi
* Đặt món ăn trực tuyến
* Thanh toán online bằng VNPAY
* Theo dõi đơn hàng và lịch sử giao dịch
* Đánh giá món ăn sau khi hoàn tất đơn hàng
* Đăng ký mở cửa hàng
* Kiếm tiền từ nội dung
* Gửi yêu cầu hỗ trợ

### Đối với chủ cửa hàng

* Quản lý cửa hàng
* Quản lý menu món ăn
* Quản lý đơn hàng
* Quản lý doanh thu
* Tạo và quản lý khuyến mãi

### Đối với Admin

* Quản lý tài khoản người dùng và cửa hàng
* Xét duyệt yêu cầu mở cửa hàng
* Quản lý đơn hàng toàn hệ thống
* Quản lý doanh thu hệ thống
* Quản lý khuyến mãi
* Thống kê hoạt động hệ thống
* Quản lý hỗ trợ, báo cáo và khiếu nại

---

## 6. Cài đặt & chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/KLTN-03-2026/GR46.git
```

---

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

Chạy server:

```bash
npm run start:dev
```

---

### 3. Cài đặt Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 7. Cấu trúc thư mục

```bash id="dishnet-short-structure"
DISHNET/
│
├── Backend/
│   ├── src/
│   │   ├── Api/
│   │   ├── common/
│   │   ├── database/
│   │   └── shared/
│   │
│   └── uploads/
│
├── Frontend/
│   ├── public/
│   └── src/
│
└── README.md
```

---

## 8. Quy trình làm việc với Git

## Các bước push code

### Bước 1 — Cập nhật nhánh dev mới nhất

```bash
git checkout dev
git pull origin dev
```

### Bước 2 — Tạo nhánh mới từ dev

```bash
git checkout -b ten_tinh_nang
```

### Bước 3 — Code và commit thường xuyên

```bash
git add .
git commit -m "mô tả những gì đã làm"
```

### Bước 4 — Push nhánh lên remote

```bash
git push origin ten_tinh_nang
```

---

## Quy tắc chung

❌ KHÔNG push trực tiếp lên main hoặc dev

❌ KHÔNG commit file `.env`

✅ Pull dev mới nhất trước khi bắt đầu làm

✅ Commit nhỏ, thường xuyên

✅ Mỗi tính năng một nhánh riêng

✅ Review code trước khi merge

---

## 9. Định hướng phát triển

* Phát triển ứng dụng mobile trong tương lai
* Tích hợp AI gợi ý món ăn phù hợp theo sở thích người dùng
* Cá nhân hóa bảng tin và đề xuất nội dung
* Tích hợp hệ thống livestream bán hàng
* Mở rộng hệ thống chấm điểm uy tín thông minh
* Tích hợp chatbot hỗ trợ khách hàng tự động

---

## 10. Ghi chú

Đây là phiên bản sơ bộ của hệ thống trong giai đoạn phát triển.

Dự án sẽ tiếp tục được cải thiện và hoàn thiện trong quá trình thực hiện khóa luận tốt nghiệp, hướng tới xây dựng một nền tảng mạng xã hội kinh doanh ẩm thực thực tế, hiệu quả và có khả năng triển khai thương mại.
