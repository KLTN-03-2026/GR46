import { IsIn, IsOptional, IsString } from 'class-validator';

export class StoreRevenueQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsIn(['tat_ca', 'da_giao', 'da_huy', 'dang_giao', 'tra_hang'])
  trang_thai?: 'tat_ca' | 'da_giao' | 'da_huy' | 'dang_giao' | 'tra_hang';

  @IsOptional()
  @IsIn(['today', '7days', '30days', 'custom'])
  bo_loc_thoi_gian?: 'today' | '7days' | '30days' | 'custom';

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
