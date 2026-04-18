import { Controller, Get, Query } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import {
  DanhSachHoatDongQueryDto,
  ThongKeHeThongQueryDto,
} from "./dto/admin-dashboard.dto";
import { AdminDashboardService } from "./admin-dashboard.service";

@Controller("admin/thong-ke")
@Roles("admin")
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get()
  async layThongKeTongQuan(@Query() query: ThongKeHeThongQueryDto) {
    return this.adminDashboardService.layThongKeTongQuan(query);
  }

  @Get("hoat-dong")
  async layDanhSachHoatDong(@Query() query: DanhSachHoatDongQueryDto) {
    return this.adminDashboardService.layDanhSachHoatDong(query);
  }
}
