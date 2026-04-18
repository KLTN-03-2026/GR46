import { IsOptional, IsString } from "class-validator";

export class DanhSachDonHangQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsString()
  id_cua_hang?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  @IsString()
  bo_loc_thoi_gian?: string;

  @IsOptional()
  @IsString()
  tu_ngay?: string;

  @IsOptional()
  @IsString()
  den_ngay?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}
