import { Controller, Get, Param, Query } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { AdminOrderService } from "./admin-order.service";
import { DanhSachDonHangQueryDto } from "./dto/admin-order.dto";

@Controller("admin/don-hang")
@Roles("admin")
export class AdminOrderController {
  constructor(private readonly adminOrderService: AdminOrderService) {}

  @Get()
  async layDanhSach(@Query() query: DanhSachDonHangQueryDto) {
    return this.adminOrderService.layDanhSach(query);
  }

  @Get(":maDonHang")
  async layChiTiet(@Param("maDonHang") maDonHang: string) {
    return this.adminOrderService.layChiTiet(maDonHang);
  }
}
