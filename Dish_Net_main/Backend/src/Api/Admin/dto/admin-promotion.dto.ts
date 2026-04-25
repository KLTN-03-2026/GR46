import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from "class-validator";

export class DanhSachKhuyenMaiQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  @IsString()
  loai_khuyen_mai?: string;

  @IsOptional()
  @IsString()
  sap_xep?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}

export class TaoKhuyenMaiDto {
  @IsString()
  ten_khuyen_mai: string;

  @IsString()
  @Matches(/^[A-Za-z0-9_-]+$/)
  ma_khuyen_mai: string;

  @IsString()
  loai_khuyen_mai: string;

  @IsNumber()
  @Min(0)
  @Max(1000000000)
  gia_tri_khuyen_mai: number;

  @IsNumber()
  @Min(0)
  @Max(1000000000)
  don_hang_toi_thieu: number;

  @IsDateString()
  thoi_gian_bat_dau: string;

  @IsDateString()
  thoi_gian_ket_thuc: string;

  @IsOptional()
  @IsString()
  mo_ta?: string;
}

export class CapNhatKhuyenMaiDto extends TaoKhuyenMaiDto {}
