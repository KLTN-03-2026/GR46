import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  CapNhatGioHangDto,
  DangKyKiemTienNoiDungDto,
  DangKyMoCuaHangDto,
  DanhGiaDonHangDto,
  DanhSachDonHangNguoiDungQueryDto,
  DanhSachHoTroQueryDto,
  DanhSachThongBaoQueryDto,
  DanhSachTinNhanQueryDto,
  DanhSachTroChuyenQueryDto,
  DatDonHangDto,
  GuiTinNhanDto,
  HuyDonHangDto,
  TaoHoTroDto,
  ThemVaoGioHangDto,
  YeuCauHoanTienDto,
} from './dto/user-commerce.dto';
import { UserCommerceService } from './user-commerce.service';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('user')
@Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
export class UserCommerceController {
  constructor(private readonly userCommerceService: UserCommerceService) {}

  // PB14 - Hỗ trợ
  @Post('ho-tro')
  async taoYeuCauHoTro(
    @Req() req: AuthenticatedRequest,
    @Body() dto: TaoHoTroDto,
  ) {
    return this.userCommerceService.taoYeuCauHoTro(req.user!.sub, dto);
  }

  @Get('ho-tro')
  async layDanhSachYeuCauHoTro(
    @Req() req: AuthenticatedRequest,
    @Query() query: DanhSachHoTroQueryDto,
  ) {
    return this.userCommerceService.layDanhSachYeuCauHoTro(req.user!.sub, query);
  }

  @Get('thong-bao')
  async layDanhSachThongBao(
    @Req() req: AuthenticatedRequest,
    @Query() query: DanhSachThongBaoQueryDto,
  ) {
    return this.userCommerceService.layDanhSachThongBao(req.user!.sub, query);
  }

  @Get('ho-tro/:id')
  async layChiTietYeuCauHoTro(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
  ) {
    return this.userCommerceService.layChiTietYeuCauHoTro(req.user!.sub, id);
  }

  // PB15/PB16 - Chế độ chuyên nghiệp
  @Get('che-do-chuyen-nghiep/yeu-cau')
  async layDanhSachYeuCauNangCap(@Req() req: AuthenticatedRequest) {
    return this.userCommerceService.layDanhSachYeuCauNangCap(req.user!.sub);
  }

  @Post('che-do-chuyen-nghiep/kiem-tien-noi-dung')
  async taoYeuCauKiemTienNoiDung(
    @Req() req: AuthenticatedRequest,
    @Body() dto: DangKyKiemTienNoiDungDto,
  ) {
    return this.userCommerceService.taoYeuCauKiemTienNoiDung(req.user!.sub, dto);
  }

  @Post('che-do-chuyen-nghiep/mo-cua-hang')
  async taoYeuCauMoCuaHang(
    @Req() req: AuthenticatedRequest,
    @Body() dto: DangKyMoCuaHangDto,
  ) {
    return this.userCommerceService.taoYeuCauMoCuaHang(req.user!.sub, dto);
  }

  // PB17 - Giỏ hàng
  @Get('gio-hang')
  async layGioHang(@Req() req: AuthenticatedRequest) {
    return this.userCommerceService.layGioHang(req.user!.sub);
  }

  @Post('gio-hang/items')
  async themVaoGioHang(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ThemVaoGioHangDto,
  ) {
    return this.userCommerceService.themVaoGioHang(req.user!.sub, dto);
  }

  @Patch('gio-hang/items/:idItem')
  async capNhatGioHangItem(
    @Req() req: AuthenticatedRequest,
    @Param('idItem') idItem: number,
    @Body() dto: CapNhatGioHangDto,
  ) {
    return this.userCommerceService.capNhatGioHangItem(req.user!.sub, idItem, dto);
  }

  @Delete('gio-hang/items/:idItem')
  async xoaItemGioHang(
    @Req() req: AuthenticatedRequest,
    @Param('idItem') idItem: number,
  ) {
    return this.userCommerceService.xoaItemGioHang(req.user!.sub, idItem);
  }

  @Delete('gio-hang')
  async xoaTatCaGioHang(@Req() req: AuthenticatedRequest) {
    return this.userCommerceService.xoaTatCaGioHang(req.user!.sub);
  }

  // PB18 - Thanh toán
  @Get('thanh-toan/preview')
  async xemTruocThanhToan(
    @Req() req: AuthenticatedRequest,
    @Query('ma_khuyen_mai') maKhuyenMai?: string,
  ) {
    return this.userCommerceService.xemTruocThanhToan(req.user!.sub, maKhuyenMai);
  }

  @Get('thanh-toan/khuyen-mai')
  async layDanhSachKhuyenMaiThanhToan(@Req() req: AuthenticatedRequest) {
    return this.userCommerceService.layDanhSachKhuyenMaiThanhToan(req.user!.sub);
  }

  @Post('thanh-toan/dat-don')
  async datDonHang(
    @Req() req: AuthenticatedRequest,
    @Body() dto: DatDonHangDto,
  ) {
    return this.userCommerceService.datDonHang(
      req.user!.sub,
      dto,
      req.ip ?? null,
    );
  }

  @Public()
  @Get('thanh-toan/vnpay/callback')
  async xuLyCallbackVnpay(@Query() query: Record<string, string>) {
    return this.userCommerceService.xuLyCallbackVnpay(query);
  }

  // PB19-PB23 - Đơn hàng
  @Get('don-hang')
  async layDanhSachDonHang(
    @Req() req: AuthenticatedRequest,
    @Query() query: DanhSachDonHangNguoiDungQueryDto,
  ) {
    return this.userCommerceService.layDanhSachDonHang(req.user!.sub, query);
  }

  @Get('don-hang/:maDonHang')
  async layChiTietDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
  ) {
    return this.userCommerceService.layChiTietDonHang(req.user!.sub, maDonHang);
  }

  @Post('don-hang/:maDonHang/huy')
  async huyDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: HuyDonHangDto,
  ) {
    return this.userCommerceService.huyDonHang(req.user!.sub, maDonHang, dto);
  }

  @Post('don-hang/:maDonHang/hoan-tien')
  async yeuCauHoanTien(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: YeuCauHoanTienDto,
  ) {
    return this.userCommerceService.yeuCauHoanTien(req.user!.sub, maDonHang, dto);
  }

  @Post('don-hang/:maDonHang/mua-lai')
  async muaLaiDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
  ) {
    return this.userCommerceService.muaLaiDonHang(req.user!.sub, maDonHang);
  }

  @Post('don-hang/:maDonHang/danh-gia')
  async danhGiaDonHang(
    @Req() req: AuthenticatedRequest,
    @Param('maDonHang') maDonHang: string,
    @Body() dto: DanhGiaDonHangDto,
  ) {
    return this.userCommerceService.danhGiaDonHang(req.user!.sub, maDonHang, dto);
  }

  // PB10 - Trò chuyện
  @Get('tro-chuyen')
  async layDanhSachTroChuyen(
    @Req() req: AuthenticatedRequest,
    @Query() query: DanhSachTroChuyenQueryDto,
  ) {
    return this.userCommerceService.layDanhSachTroChuyen(req.user!.sub, query);
  }

  @Get('tro-chuyen/:idCuocTroChuyen/tin-nhan')
  async layTinNhan(
    @Req() req: AuthenticatedRequest,
    @Param('idCuocTroChuyen') idCuocTroChuyen: number,
    @Query() query: DanhSachTinNhanQueryDto,
  ) {
    return this.userCommerceService.layTinNhan(
      req.user!.sub,
      idCuocTroChuyen,
      query,
    );
  }

  @Post('tro-chuyen/:idCuocTroChuyen/tin-nhan')
  async guiTinNhan(
    @Req() req: AuthenticatedRequest,
    @Param('idCuocTroChuyen') idCuocTroChuyen: number,
    @Body() dto: GuiTinNhanDto,
  ) {
    return this.userCommerceService.guiTinNhan(
      req.user!.sub,
      idCuocTroChuyen,
      dto,
    );
  }
}
