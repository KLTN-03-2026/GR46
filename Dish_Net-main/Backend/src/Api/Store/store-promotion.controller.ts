import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { StorePromotionService } from './store-promotion.service';
import {
  CapNhatKhuyenMaiDto,
  DanhSachKhuyenMaiQueryDto,
  TaoKhuyenMaiDto,
} from './dto/store-promotion.dto';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('store/khuyen-mai')
@Roles('chu_cua_hang')
export class StorePromotionController {
  constructor(private readonly storePromotionService: StorePromotionService) {}

  /**
   * PB28 - Lấy danh sách khuyến mãi của cửa hàng
   * GET /api/store/khuyen-mai
   */
  @Get()
  async layDanhSach(
    @Req() req: AuthenticatedRequest,
    @Query() query: DanhSachKhuyenMaiQueryDto,
  ) {
    const userId = req.user!.sub;
    return this.storePromotionService.layDanhSach(userId, query);
  }

  /**
   * PB28 - Tạo khuyến mãi mới
   * POST /api/store/khuyen-mai
   */
  @Post()
  async taoKhuyenMai(
    @Req() req: AuthenticatedRequest,
    @Body() dto: TaoKhuyenMaiDto,
  ) {
    const userId = req.user!.sub;
    return this.storePromotionService.tao(userId, dto);
  }

  /**
   * PB28 - Cập nhật khuyến mãi
   * PATCH /api/store/khuyen-mai/:id
   */
  @Patch(':id')
  async capNhatKhuyenMai(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatKhuyenMaiDto,
  ) {
    const userId = req.user!.sub;
    return this.storePromotionService.capNhat(userId, id, dto);
  }

  /**
   * PB28 - Xóa khuyến mãi
   * DELETE /api/store/khuyen-mai/:id
   */
  @Delete(':id')
  async xoaKhuyenMai(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user!.sub;
    return this.storePromotionService.xoa(userId, id);
  }

  /**
   * PB28 - Tạm dừng khuyến mãi
   * PATCH /api/store/khuyen-mai/:id/tam-dung
   */
  @Patch(':id/tam-dung')
  async tamDungKhuyenMai(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user!.sub;
    return this.storePromotionService.tamDung(userId, id);
  }

  /**
   * PB28 - Kích hoạt khuyến mãi (sắp diễn ra → đang diễn ra)
   * PATCH /api/store/khuyen-mai/:id/kich-hoat
   */
  @Patch(':id/kich-hoat')
  async kichHoatKhuyenMai(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user!.sub;
    return this.storePromotionService.kichHoat(userId, id);
  }
}
