import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class DanhSachHoTroQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsIn(['dang_xu_ly', 'da_giai_quyet'])
  trang_thai?: 'dang_xu_ly' | 'da_giai_quyet';

  @IsOptional()
  @IsInt()
  @Min(1)
  trang?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  so_luong?: number;
}

export class DanhSachThongBaoQueryDto {
  @IsOptional()
  @IsIn(['1', '0', 'true', 'false'])
  chi_chua_doc?: '1' | '0' | 'true' | 'false';

  @IsOptional()
  @IsInt()
  @Min(1)
  trang?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  so_luong?: number;
}

export class TaoHoTroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  chu_de: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  noi_dung: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  thong_tin_lien_he: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  tep_dinh_kem?: string[];
}

export class DangKyKiemTienNoiDungDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  ten_tai_khoan: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  gioi_tinh?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  ngay_sinh: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  ngan_hang: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  so_tai_khoan_ngan_hang: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  so_dien_thoai: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  dia_chi: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  mo_ta?: string;
}

export class DangKyMoCuaHangDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  chu_so_huu: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  so_cccd: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  so_dien_thoai: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  dia_chi: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  ten_cua_hang: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  so_dien_thoai_lien_he: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  danh_muc_kinh_doanh: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  gio_mo_cua: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  gio_dong_cua: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  dia_chi_kinh_doanh: string;

  @IsBoolean()
  dong_y_dieu_khoan: boolean;

  @IsArray()
  @ArrayMinSize(2)
  @IsUrl({}, { each: true })
  anh_cccd: string[];

  @IsArray()
  @ArrayMinSize(5)
  @IsUrl({}, { each: true })
  anh_menu: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  minh_chung_thanh_toan: string[];
}

export class CapNhatGioHangDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  so_luong?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  ghi_chu?: string;

  @IsOptional()
  @IsBoolean()
  duoc_chon?: boolean;
}

export class ThemVaoGioHangDto {
  @IsInt()
  id_mon_an: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  so_luong?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  ghi_chu?: string;
}

export class DatDonHangDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nguoi_nhan: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  so_dien_thoai_nhan: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  dia_chi_giao: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  ghi_chu_tai_xe?: string;

  @IsString()
  @IsIn(['vnpay'])
  phuong_thuc_thanh_toan: 'vnpay';

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ma_khuyen_mai?: string;
}

export class DanhSachDonHangNguoiDungQueryDto {
  @IsOptional()
  @IsIn(['placed', 'purchased', 'cancelled', 'returned', 'review'])
  tab?: 'placed' | 'purchased' | 'cancelled' | 'returned' | 'review';

  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  trang?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  so_luong?: number;
}

export class HuyDonHangDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  ly_do: string;
}

export class YeuCauHoanTienDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  ly_do: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  thong_tin_tai_khoan_hoan_tien: string;
}

export class DanhGiaDonHangDto {
  @IsInt()
  @Min(1)
  @Max(5)
  so_sao: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  noi_dung: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  tep_dinh_kem?: string[];

  @IsOptional()
  @IsBoolean()
  an_danh?: boolean;
}

export class DanhSachTroChuyenQueryDto {
  @IsOptional()
  @IsString()
  tim_kiem?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  trang?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  so_luong?: number;
}

export class DanhSachTinNhanQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  trang?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  so_luong?: number;
}

export class GuiTinNhanDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5000)
  noi_dung: string;
}

export class TaoYeuCauRutTienDto {
  @IsInt()
  id_tai_khoan_rut_tien: number;

  @IsInt()
  @Min(1)
  so_tien: number;
}
