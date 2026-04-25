import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { TongQuanCuaHangQueryDto } from './dto/store-overview.dto';
import { StoreOverviewService } from './store-overview.service';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('store/tong-quan')
@Roles('chu_cua_hang')
export class StoreOverviewController {
  constructor(private readonly storeOverviewService: StoreOverviewService) {}

  /**
   * PB24 - Tổng quan cửa hàng
   * GET /api/store/tong-quan
   */
  @Get()
  async layTongQuan(
    @Req() req: AuthenticatedRequest,
    @Query() query: TongQuanCuaHangQueryDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOverviewService.layTongQuan(userId, query);
  }
}
