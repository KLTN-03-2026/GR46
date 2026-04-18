import { IsOptional, IsString } from 'class-validator';

export class DanhSachDonHangStoreQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

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

export class XacNhanDonHangDto {
  @IsString()
  thoi_gian_du_kien_chuan_bi: string;
}

export class TuChoiDonHangDto {
  @IsString()
  ly_do: string;
}

export class GiaHanDonHangDto {
  @IsString()
  so_phut_gia_han: string;
}

export class HoanTienDto {
  @IsString()
  ly_do_hoan?: string;
}

export class TuChoiHoanTienDto {
  @IsString()
  ly_do_tu_choi: string;
}