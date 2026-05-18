import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminWithdrawalService } from './admin-withdrawal.service';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('admin/rut-tien')
@Roles('admin')
export class AdminWithdrawalController {
  constructor(private readonly adminWithdrawalService: AdminWithdrawalService) {}

  @Get()
  async layDanhSach(
    @Query('trang_thai') trangThai?: string,
    @Query('trang') trang?: number,
    @Query('so_luong') soLuong?: number,
  ) {
    return this.adminWithdrawalService.layDanhSach({
      trang_thai: trangThai,
      trang,
      so_luong: soLuong,
    });
  }

  @Patch(':id/duyet')
  async duyetYeuCau(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminWithdrawalService.duyetYeuCau(id, req.user?.sub ?? 0);
  }

  @Patch(':id/tu-choi')
  async tuChoiYeuCau(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { ly_do: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminWithdrawalService.tuChoiYeuCau(
      id,
      req.user?.sub ?? 0,
      body.ly_do,
    );
  }
}
