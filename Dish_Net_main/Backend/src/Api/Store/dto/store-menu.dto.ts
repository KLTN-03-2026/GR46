import { IsOptional, IsString, IsNumber, Min, IsArray, ValidateNested, MinLength, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

// ─── Query ────────────────────────────────────────────────────────────────────

export class DanhSachMonAnQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsString()
  id_danh_muc?: string;

  @IsOptional()
  @IsString()
  trang_thai?: string;

  @IsOptional()
  @IsString()
  sap_xep?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  trang?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  so_luong?: number;
}

// ─── Topping ──────────────────────────────────────────────────────────────────

export class ToppingPayloadDto {
  @IsString()
  @MinLength(1)
  ten_topping: string;

  @IsNumber()
  @Min(0)
  gia: number;
}

// ─── Tạo món ────────────────────────────────────────────────────────────────

export class TaoMonAnDto {
  @IsString()
  @MinLength(1, { message: 'Tên món không được để trống' })
  ten_mon: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;

  @IsNumber()
  @Min(0, { message: 'Giá bán phải lớn hơn hoặc bằng 0' })
  gia_ban: number;

  @IsOptional()
  @IsNumber()
  gia_goc?: number;

  @IsOptional()
  @IsString()
  id_danh_muc?: string;

  @IsOptional()
  @IsString()
  hinh_anh_dai_dien?: string;

  @IsOptional()
  @IsString()
  trang_thai_ban?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToppingPayloadDto)
  toppings?: ToppingPayloadDto[];
}

// ─── Cập nhật món ────────────────────────────────────────────────────────────

export class CapNhatMonAnDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  ten_mon?: string;

  @IsOptional()
  @IsString()
  mo_ta?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  gia_ban?: number;

  @IsOptional()
  @IsNumber()
  gia_goc?: number;

  @IsOptional()
  @IsString()
  id_danh_muc?: string;

  @IsOptional()
  @IsString()
  hinh_anh_dai_dien?: string;

  @IsOptional()
  @IsString()
  trang_thai_ban?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToppingPayloadDto)
  toppings?: ToppingPayloadDto[];
}

// ─── Cập nhật trạng thái bán ────────────────────────────────────────────────

export class CapNhatTrangThaiBanDto {
  @IsString()
  @IsEnum(['dang_ban', 'het_mon', 'tam_ngung_ban'], {
    message: 'Trạng thái không hợp lệ',
  })
  trang_thai_ban: string;
}

// ─── Tạo danh mục ───────────────────────────────────────────────────────────

export class TaoDanhMucDto {
  @IsString()
  @MinLength(1, { message: 'Tên danh mục không được để trống' })
  ten_danh_muc: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id_danh_muc_cha?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  thu_tu_hien_thi?: number;
}

// ─── Cập nhật danh mục ──────────────────────────────────────────────────────

export class CapNhatDanhMucDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  ten_danh_muc?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id_danh_muc_cha?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  thu_tu_hien_thi?: number;

  @IsOptional()
  @IsString()
  trang_thai?: string;
}
