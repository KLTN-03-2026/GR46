import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { AdminAccountService } from "./admin-account.service";
import { KhoaTaiKhoanDto } from "./dto/admin-account.dto";
import { Roles } from "../../common/decorators/roles.decorator";

// PB32: Quản lý tài khoản
@Controller("admin/tai-khoan")
@Roles("admin")
export class AdminAccountController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  // PB32: Danh sách tài khoản + tìm kiếm + lọc + phân trang
  @Get()
  async layDanhSach(
    @Query("tim_kiem") timKiem?: string,
    @Query("loai_tai_khoan") loaiTaiKhoan?: string,
    @Query("trang_thai") trangThai?: string,
    @Query("trang") trang?: number,
    @Query("so_luong") soLuong?: number,
  ) {
    return this.adminAccountService.layDanhSach({
      tim_kiem: timKiem,
      loai_tai_khoan: loaiTaiKhoan,
      trang_thai: trangThai,
      trang,
      so_luong: soLuong,
    });
  }

  // PB32: Chi tiết tài khoản
  @Get(":id")
  async layChiTiet(@Param("id", ParseIntPipe) id: number) {
    return this.adminAccountService.layChiTiet(id);
  }

  // PB32: Khóa tài khoản
  @Patch(":id/khoa")
  async khoaTaiKhoan(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: KhoaTaiKhoanDto,
  ) {
    return this.adminAccountService.khoaTaiKhoan(id, dto.ly_do);
  }

  // PB32: Mở khóa tài khoản
  @Patch(":id/mo-khoa")
  async moKhoaTaiKhoan(@Param("id", ParseIntPipe) id: number) {
    return this.adminAccountService.moKhoaTaiKhoan(id);
  }
}
