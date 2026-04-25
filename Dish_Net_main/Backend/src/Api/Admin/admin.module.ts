import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminAccountController } from "./admin-account.controller";
import { AdminAccountService } from "./admin-account.service";
import { AdminReviewController } from "./admin-review.controller";
import { AdminReviewService } from "./admin-review.service";
import { AdminSupportController } from "./admin-support.controller";
import { AdminSupportService } from "./admin-support.service";
import { AdminReportController } from "./admin-report.controller";
import { AdminReportService } from "./admin-report.service";
import { AdminPromotionController } from "./admin-promotion.controller";
import { AdminPromotionService } from "./admin-promotion.service";
import { AdminOrderController } from "./admin-order.controller";
import { AdminOrderService } from "./admin-order.service";
import { AdminDashboardController } from "./admin-dashboard.controller";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminRevenueController } from "./admin-revenue.controller";
import { AdminRevenueService } from "./admin-revenue.service";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import { PhienDangNhapEntity } from "../Auth/entities/phien-dang-nhap.entity";
import { YeuCauNangCapEntity } from "./entities/yeu-cau-nang-cap.entity";
import { TepDinhKemEntity } from "./entities/tep-dinh-kem.entity";
import { NhatKyHeThongEntity } from "./entities/nhat-ky-he-thong.entity";
import { YeuCauHoTroEntity } from "./entities/yeu-cau-ho-tro.entity";
import { BaoCaoEntity } from "./entities/bao-cao.entity";
import { ThongBaoEntity } from "./entities/thong-bao.entity";
import { CuaHangEntity } from "./entities/cua-hang.entity";
import { MonAnEntity } from "./entities/mon-an.entity";
import { BaiVietEntity } from "./entities/bai-viet.entity";
import { BinhLuanEntity } from "./entities/binh-luan.entity";
import { KhuyenMaiEntity } from "./entities/khuyen-mai.entity";
import { DanhMucMonEntity } from "./entities/danh-muc-mon.entity";
import { ToppingEntity } from "./entities/topping.entity";
import { DonHangEntity } from "./entities/don-hang.entity";
import { DonHangChiTietEntity } from "./entities/don-hang-chi-tiet.entity";
import { LichSuDonHangEntity } from "./entities/lich-su-don-hang.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NguoiDungEntity,
      PhienDangNhapEntity,
      YeuCauNangCapEntity,
      TepDinhKemEntity,
      NhatKyHeThongEntity,
      YeuCauHoTroEntity,
      BaoCaoEntity,
      ThongBaoEntity,
      CuaHangEntity,
      MonAnEntity,
      BaiVietEntity,
      BinhLuanEntity,
      KhuyenMaiEntity,
      DanhMucMonEntity,
      ToppingEntity,
      DonHangEntity,
      DonHangChiTietEntity,
      LichSuDonHangEntity,
    ]),
  ],
  controllers: [
    AdminDashboardController,
    AdminRevenueController,
    AdminAccountController,
    AdminReviewController,
    AdminSupportController,
    AdminReportController,
    AdminPromotionController,
    AdminOrderController,
  ],
  providers: [
    AdminDashboardService,
    AdminRevenueService,
    AdminAccountService,
    AdminReviewService,
    AdminSupportService,
    AdminReportService,
    AdminPromotionService,
    AdminOrderService,
  ],
})
export class AdminModule {}
