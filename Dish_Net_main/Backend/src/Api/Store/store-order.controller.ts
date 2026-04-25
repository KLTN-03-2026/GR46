import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { StoreOrderService } from './store-order.service';
import {
  DanhSachDonHangStoreQueryDto,
  GiaHanDonHangDto,
  HoanTienDto,
  TuChoiDonHangDto,
  TuChoiHoanTienDto,
  XacNhanDonHangDto,
} from './dto/store-order.dto';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('store/don-hang')
@Roles('chu_cua_hang')
export class StoreOrderController {
  constructor(private readonly storeOrderService: StoreOrderService) {}

  /**
   * PB27 - Lấy danh sách đơn hàng của cửa hàng
   * GET /api/store/don-hang
   */
  @Get()
  async layDanhSach(
    @Req() req: AuthenticatedRequest,
    @Query() query: DanhSachDonHangStoreQueryDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.layDanhSach(userId, query);
  }

  /**
   * PB27 - Chi tiết đơn hàng
   * GET /api/store/don-hang/:maDonHang
   */
  @Get(':maDonHang')
  async layChiTiet(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.layChiTiet(userId, maDonHang);
  }

  /**
   * PB27 - Xác nhận đơn hàng
   * PATCH /api/store/don-hang/:maDonHang/xac-nhan
   */
  @Patch(':maDonHang/xac-nhan')
  async xacNhanDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: XacNhanDonHangDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.xacNhanDonHang(userId, maDonHang, dto);
  }

  /**
   * PB27 - Từ chối đơn hàng
   * PATCH /api/store/don-hang/:maDonHang/tu-choi
   */
  @Patch(':maDonHang/tu-choi')
  async tuChoiDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: TuChoiDonHangDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.tuChoiDonHang(userId, maDonHang, dto);
  }

  /**
   * PB27 - Giao đơn hàng (chuyển sang Đang giao)
   * PATCH /api/store/don-hang/:maDonHang/giao
   */
  @Patch(':maDonHang/giao')
  async giaoDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.giaoDonHang(userId, maDonHang);
  }

  /**
   * PB27 - Gia hạn thời gian chuẩn bị
   * PATCH /api/store/don-hang/:maDonHang/gia-han
   */
  @Patch(':maDonHang/gia-han')
  async giaHanDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: GiaHanDonHangDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.giaHanDonHang(userId, maDonHang, dto);
  }

  /**
   * PB27 - Duyệt hoàn tiền
   * PATCH /api/store/don-hang/:maDonHang/hoan-tien
   */
  @Patch(':maDonHang/hoan-tien')
  async duyetHoanTien(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: HoanTienDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.duyetHoanTien(userId, maDonHang, dto);
  }

  /**
   * PB27 - Từ chối hoàn tiền
   * PATCH /api/store/don-hang/:maDonHang/tu-choi-hoan-tien
   */
  @Patch(':maDonHang/tu-choi-hoan-tien')
  async tuChoiHoanTien(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: TuChoiHoanTienDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOrderService.tuChoiHoanTien(userId, maDonHang, dto);
  }
}
