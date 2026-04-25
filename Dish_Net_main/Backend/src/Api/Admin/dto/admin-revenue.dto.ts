import { IsOptional, IsString } from "class-validator";

export class DanhSachDoanhThuDonHangQueryDto {
  @IsOptional()
  @IsString()
  id_cua_hang?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}
