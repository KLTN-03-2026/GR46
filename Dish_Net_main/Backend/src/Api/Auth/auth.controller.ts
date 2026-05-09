import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import {
  DangKyDto,
  XacNhanOtpDto,
  DangNhapDto,
  DangNhapGoogleDto,
  ChonVaiTroDto,
  QuenMatKhauDto,
  DatLaiMatKhauDto,
  GuiLaiOtpDto,
  DoiMatKhauDto,
} from "./dto/auth.dto";
import { Public } from "../../common/decorators/public.decorator";
import { AUTH_COOKIE_NAME } from "../../common/constants/auth.constants";

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // PB02: Đăng ký
  @Public()
  @Post("dang-ky")
  async dangKy(@Body() dto: DangKyDto) {
    return this.authService.dangKy(dto);
  }

  // PB02: Xác nhận OTP đăng ký
  @Public()
  @Post("xac-nhan-dang-ky")
  async xacNhanDangKy(@Body() dto: XacNhanOtpDto) {
    return this.authService.xacNhanDangKy(dto);
  }

  // PB01: Đăng nhập
  @Public()
  @Post("dang-nhap")
  @HttpCode(HttpStatus.OK)
  async dangNhap(
    @Body() dto: DangNhapDto,
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const result = await this.authService.dangNhap(dto, ip, userAgent);

    if ("can_chon_vai_tro" in result && result.can_chon_vai_tro) {
      return result;
    }

    if ("access_token" in result) {
      this.setCookie(res, result.access_token, dto.luu_dang_nhap);
    }

    return result;
  }

  // PB01: Chọn vai trò đăng nhập (khi có nhiều vai trò)
  @Public()
  @Post("chon-vai-tro")
  @HttpCode(HttpStatus.OK)
  async chonVaiTro(
    @Body() dto: ChonVaiTroDto & { email: string },
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const result = await this.authService.dangNhapVoiVaiTro(
      dto.email,
      dto.vai_tro,
      dto.luu_dang_nhap ?? false,
      ip,
      userAgent,
    );

    if ("access_token" in result) {
      this.setCookie(res, result.access_token, dto.luu_dang_nhap ?? false);
    }

    return result;
  }

  @Public()
  @Post("google")
  @HttpCode(HttpStatus.OK)
  async dangNhapGoogle(
    @Body() dto: DangNhapGoogleDto,
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const result = await this.authService.dangNhapGoogle(dto, ip, userAgent);
    if ("access_token" in result) {
      this.setCookie(res, result.access_token, dto.luu_dang_nhap);
    }
    return result;
  }

  // PB03: Quên mật khẩu - gửi OTP
  @Public()
  @Post("quen-mat-khau")
  @HttpCode(HttpStatus.OK)
  async quenMatKhau(@Body() dto: QuenMatKhauDto) {
    return this.authService.quenMatKhau(dto);
  }

  @Public()
  @Post("xac-nhan-quen-mat-khau")
  @HttpCode(HttpStatus.OK)
  async xacNhanQuenMatKhau(@Body() dto: XacNhanOtpDto) {
    return this.authService.xacNhanQuenMatKhau(dto);
  }

  // PB03: Đặt lại mật khẩu
  @Public()
  @Post("dat-lai-mat-khau")
  @HttpCode(HttpStatus.OK)
  async datLaiMatKhau(@Body() dto: DatLaiMatKhauDto) {
    return this.authService.datLaiMatKhau(dto);
  }

  // Gửi lại OTP
  @Public()
  @Post("gui-lai-otp")
  @HttpCode(HttpStatus.OK)
  async guiLaiOtp(@Body() dto: GuiLaiOtpDto) {
    return this.authService.guiLaiOtp(dto);
  }

  // Đổi mật khẩu khi đã đăng nhập
  @Post("doi-mat-khau")
  @HttpCode(HttpStatus.OK)
  async doiMatKhau(@Req() req: AuthenticatedRequest, @Body() dto: DoiMatKhauDto) {
    const token = req.cookies?.[AUTH_COOKIE_NAME];
    return this.authService.doiMatKhau(req.user!.sub, dto, token);
  }

  // Đăng xuất
  @Post("dang-xuat")
  @HttpCode(HttpStatus.OK)
  async dangXuat(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const token = req.cookies?.[AUTH_COOKIE_NAME];
    if (token) {
      await this.authService.dangXuat(token);
    }
    res.clearCookie(AUTH_COOKIE_NAME);
    return { message: "Dang xuat thanh cong" };
  }

  // Lấy thông tin người dùng hiện tại
  @Get("toi")
  async layThongTin(@Req() req: any) {
    return this.authService.layThongTinNguoiDung(req.user!.sub);
  }

  private setCookie(res: Response, token: string, ghiNho?: boolean) {
    const maxAge = ghiNho ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge,
    });
  }
}
