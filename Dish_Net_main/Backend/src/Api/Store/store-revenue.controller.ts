import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { StoreRevenueQueryDto } from './dto/store-revenue.dto';
import { StoreRevenueService } from './store-revenue.service';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('store/doanh-thu')
@Roles('chu_cua_hang')
export class StoreRevenueController {
  constructor(private readonly storeRevenueService: StoreRevenueService) {}

  /**
   * PB25 - Quản lý doanh thu cửa hàng
   * GET /api/store/doanh-thu
   */
  @Get()
  async layDoanhThu(@Req() req: AuthenticatedRequest) {
    const userId = req.user!.sub;
    return this.storeRevenueService.layTongQuan(userId);
  }

  /**
   * PB25 - Danh sách đơn hàng doanh thu có lọc
   * GET /api/store/doanh-thu/don-hang
   */
  @Get('don-hang')
  async layDanhSachDonHang(
    @Req() req: AuthenticatedRequest,
    @Query() query: StoreRevenueQueryDto,
  ) {
    const userId = req.user!.sub;
    return this.storeRevenueService.layDanhSachDonHang(userId, query);
  }
}
