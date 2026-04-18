import { IsOptional, IsString } from "class-validator";

export class KhoaTaiKhoanDto {
  @IsString()
  ly_do: string;
}

export class DanhSachTaiKhoanQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsString()
  loai_tai_khoan?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}
