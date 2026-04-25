import { IsOptional, IsString } from "class-validator";

export class DanhSachYeuCauHoTroQueryDto {
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

export class PhanHoiYeuCauHoTroDto {
  @IsString()
  noi_dung_phan_hoi: string;
}
