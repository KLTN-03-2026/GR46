import { Controller, Get, Query } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { AdminRevenueService } from "./admin-revenue.service";
import { DanhSachDoanhThuDonHangQueryDto } from "./dto/admin-revenue.dto";

@Controller("admin/doanh-thu")
@Roles("admin")
export class AdminRevenueController {
  constructor(private readonly adminRevenueService: AdminRevenueService) {}

  @Get()
  async layTongQuan() {
    return this.adminRevenueService.layTongQuan();
  }

  @Get("don-hang")
  async layDanhSachDonHang(@Query() query: DanhSachDoanhThuDonHangQueryDto) {
    return this.adminRevenueService.layDanhSachDonHang(query);
  }
}
