import { IsOptional, IsString } from "class-validator";

export class ThongKeHeThongQueryDto {
  @IsOptional()
  @IsString()
  bo_loc_thoi_gian?: string;

  @IsOptional()
  @IsString()
  tu_ngay?: string;

  @IsOptional()
  @IsString()
  den_ngay?: string;
}

export class DanhSachHoatDongQueryDto extends ThongKeHeThongQueryDto {
  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}
