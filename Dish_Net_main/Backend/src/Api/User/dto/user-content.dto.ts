import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TimKiemQueryDto {
  @IsOptional()
  @IsString()
  tu_khoa?: string;

  @IsOptional()
  @IsString()
  @IsIn(['tat_ca', 'mon_an', 'cua_hang', 'bai_viet', 'nguoi_dung'])
  loai?: string;

  @IsOptional()
  @IsString()
  khu_vuc?: string;

  @IsOptional()
  @IsString()
  dia_diem?: string;

  @IsOptional()
  @IsString()
  @IsIn(['gan_ban', 'quan_huyen', 'dia_diem'])
  bo_loc_khu_vuc?: string;

  @IsOptional()
  vi_do?: number;

  @IsOptional()
  kinh_do?: number;

  @IsOptional()
  ban_kinh_km?: number;

  @IsOptional()
  @IsString()
  @IsIn(['dang_hot', 'nhieu_luot_mua', 'duoc_review_nhieu'])
  do_pho_bien?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}

export class PhanTrangQueryDto {
  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}

export class TaoBinhLuanDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(2000)
  noi_dung: string;

  @IsOptional()
  id_binh_luan_cha?: number;
}

export class TaoBaiVietDto {
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  noi_dung?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tep_dinh_kem?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['cong_khai', 'ban_be'])
  muc_do_hien_thi?: string;

  @IsOptional()
  @IsBoolean()
  bat_kiem_tien?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  link_mon_an?: string;
}

export class CapNhatBaiVietDto extends TaoBaiVietDto {}

export class ChiaSeBaiVietDto {
  @IsOptional()
  @IsString()
  @IsIn(['cong_khai', 'ban_be'])
  muc_do_hien_thi?: string;
}

export class BaoCaoBaiVietDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  loai_vi_pham: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  noi_dung_bao_cao: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  bang_chung_text?: string;
}

export class NoiDungTrangCaNhanQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['bai_viet', 'video', 'bai_dang_lai'])
  tab?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}

export class ChinhSuaTrangCaNhanDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  ten_dang_nhap?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  ten_hien_thi?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  anh_dai_dien?: string;

  @IsOptional()
  @IsString()
  @IsIn(['nam', 'nu', 'khac'])
  gioi_tinh?: string;

  @IsOptional()
  @IsDateString()
  ngay_sinh?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  tieu_su?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  so_dien_thoai?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  dia_chi?: string;

  @IsOptional()
  @IsBoolean()
  cho_hien_thi_huy_hieu?: boolean;

  @IsOptional()
  @IsBoolean()
  cho_hien_thi_diem_uy_tin?: boolean;

  @IsOptional()
  @IsBoolean()
  la_tai_khoan_rieng_tu?: boolean;
}

export class BangXepHangMiniQueryDto {
  @IsOptional()
  so_luong?: number;
}

export class BangXepHangChiTietQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['cua_hang', 'reviewer', 'mon_an'])
  tab?: string;

  @IsOptional()
  @IsString()
  tu_khoa?: string;

  @IsOptional()
  @IsString()
  khu_vuc?: string;

  @IsOptional()
  so_don_hang_tu?: number;

  @IsOptional()
  diem_danh_gia_tu?: number;

  @IsOptional()
  @IsString()
  @IsIn(['hoat_dong', 'tam_dung', 'cho_duyet'])
  trang_thai?: string;

  @IsOptional()
  ty_le_huy_toi_da?: number;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}

export class BaoCaoNguoiDungDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  loai_vi_pham: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  noi_dung_bao_cao: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  bang_chung_text?: string;
}

export class KhamPhaQueryDto {
  @IsOptional()
  @IsString()
  dia_chi_giao?: string;

  @IsOptional()
  @IsString()
  khu_vuc?: string;

  @IsOptional()
  vi_do?: number;

  @IsOptional()
  kinh_do?: number;

  @IsOptional()
  ban_kinh_km?: number;
}

export class MonTheoDanhMucQueryDto {
  @IsOptional()
  @IsString()
  khu_vuc?: string;

  @IsOptional()
  trang?: number;

  @IsOptional()
  so_luong?: number;
}
