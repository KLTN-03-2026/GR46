import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from "class-validator";

export class DanhSachBaoCaoQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}

export class XuLyBaoCaoDto {
  @IsString()
  ket_qua_xu_ly: string;

  @IsString()
  muc_do_vi_pham: string;

  @IsArray()
  @ArrayMinSize(1)
  hanh_dong_ap_dung: string[];

  @IsBoolean()
  gui_canh_bao: boolean;
}
