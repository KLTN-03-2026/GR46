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
import { StoreMenuService } from './store-menu.service';
import {
  CapNhatDanhMucDto,
  CapNhatMonAnDto,
  CapNhatTrangThaiBanDto,
  DanhSachMonAnQueryDto,
  TaoDanhMucDto,
  TaoMonAnDto,
} from './dto/store-menu.dto';

type AuthRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('store/menu')
@Roles('chu_cua_hang')
export class StoreMenuController {
  constructor(private readonly storeMenuService: StoreMenuService) {}

  // ═══════════════════════════════════════════════════════════════════════════════
  // DANH MỤC
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * PB26 - Lấy danh sách danh mục
   * GET /api/store/menu/danh-muc
   */
  @Get('danh-muc')
  async layDanhSachDanhMuc(@Req() req: AuthRequest) {
    const userId = req.user!.sub;
    return this.storeMenuService.layDanhSachDanhMuc(userId);
  }

  /**
   * PB26 - Tạo danh mục mới
   * POST /api/store/menu/danh-muc
   */
  @Post('danh-muc')
  async taoDanhMuc(
    @Req() req: AuthRequest,
    @Body() payload: TaoDanhMucDto,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.taoDanhMuc(userId, payload);
  }

  /**
   * PB26 - Cập nhật danh mục
   * PATCH /api/store/menu/danh-muc/:id
   */
  @Patch('danh-muc/:id')
  async capNhatDanhMuc(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CapNhatDanhMucDto,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.capNhatDanhMuc(userId, id, payload);
  }

  /**
   * PB26 - Xóa danh mục
   * DELETE /api/store/menu/danh-muc/:id
   */
  @Delete('danh-muc/:id')
  async xoaDanhMuc(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.xoaDanhMuc(userId, id);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MÓN ĂN
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * PB26 - Lấy danh sách món ăn + top bán chạy + hết món
   * GET /api/store/menu
   */
  @Get()
  async layDanhSach(
    @Req() req: AuthRequest,
    @Query() query: DanhSachMonAnQueryDto,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.layDanhSachMonAn(userId, query);
  }

  /**
   * PB26 - Tạo món ăn mới
   * POST /api/store/menu
   */
  @Post()
  async taoMonAn(
    @Req() req: AuthRequest,
    @Body() payload: TaoMonAnDto,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.taoMonAn(userId, payload);
  }

  /**
   * PB26 - Cập nhật món ăn
   * PATCH /api/store/menu/:id
   */
  @Patch(':id')
  async capNhatMonAn(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CapNhatMonAnDto,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.capNhatMonAn(userId, id, payload);
  }

  /**
   * PB26 - Cập nhật trạng thái bán (nhanh)
   * PATCH /api/store/menu/:id/trang-thai
   */
  @Patch(':id/trang-thai')
  async capNhatTrangThaiBan(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CapNhatTrangThaiBanDto,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.capNhatTrangThaiBan(userId, id, payload);
  }

  /**
   * PB26 - Xóa món ăn
   * DELETE /api/store/menu/:id
   */
  @Delete(':id')
  async xoaMonAn(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.xoaMonAn(userId, id);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // TOPPING
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * PB26 - Thêm topping vào món
   * POST /api/store/menu/:idMonAn/topping
   */
  @Post(':idMonAn/topping')
  async themTopping(
    @Req() req: AuthRequest,
    @Param('idMonAn', ParseIntPipe) idMonAn: number,
    @Body() payload: { ten_topping: string; gia: number },
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.themTopping(userId, idMonAn, payload);
  }

  /**
   * PB26 - Xóa topping
   * DELETE /api/store/menu/topping/:idTopping
   */
  @Delete('topping/:idTopping')
  async xoaTopping(
    @Req() req: AuthRequest,
    @Param('idTopping', ParseIntPipe) idTopping: number,
  ) {
    const userId = req.user!.sub;
    return this.storeMenuService.xoaTopping(userId, idTopping);
  }
}
