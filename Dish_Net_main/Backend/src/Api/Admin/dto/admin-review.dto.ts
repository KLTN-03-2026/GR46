import { IsIn, IsOptional, IsString } from "class-validator";

export class DanhSachYeuCauQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsString()
  loai_yeu_cau?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  @IsString()
  moc_thoi_gian?: string;

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

export class TuChoiYeuCauDto {
  @IsString()
  ly_do: string;
}

export class PheDuyetYeuCauDto {
  @IsOptional()
  @IsString()
  ghi_chu?: string;
}
