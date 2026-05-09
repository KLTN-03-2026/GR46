import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class DangKyDto {
  @IsEmail({}, { message: "Email không hợp lệ" })
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i, {
    message: "Email không đúng định dạng cho phép",
  })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^(0|\+84)(3|5|7|8|9)\d{8}$/, {
    message: "Số điện thoại không hợp lệ (VD: 09xxxxxxxx hoặc +849xxxxxxxx)",
  })
  so_dien_thoai?: string;

  @IsString()
  @IsNotEmpty({ message: "Tên hiển thị không được để trống" })
  @MaxLength(120)
  ten_hien_thi: string;

  @IsString()
  @IsOptional()
  khu_vuc?: string;

  @IsString()
  @IsOptional()
  dia_chi?: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
  mat_khau: string;

  @IsString()
  @IsNotEmpty({ message: "Xác nhận mật khẩu không được để trống" })
  xac_nhan_mat_khau: string;
}

export class XacNhanOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Mã OTP không được để trống" })
  ma_otp: string;
}

export class DangNhapDto {
  @IsString()
  @IsNotEmpty({ message: "Tên đăng nhập hoặc email không được để trống" })
  tai_khoan: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  mat_khau: string;

  @IsOptional()
  luu_dang_nhap?: boolean;
}

export class ChonVaiTroDto {
  @IsString()
  @IsNotEmpty()
  vai_tro: string;

  @IsOptional()
  @IsBoolean()
  luu_dang_nhap?: boolean;
}

export class DangNhapGoogleDto {
  @IsString()
  @IsNotEmpty({ message: "Thiếu thông tin xác thực Google" })
  credential: string;

  @IsOptional()
  @IsBoolean()
  luu_dang_nhap?: boolean;
}

export class QuenMatKhauDto {
  @IsEmail({}, { message: "Email không hợp lệ" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;
}

export class XacNhanQuenMatKhauDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  ma_otp: string;
}

export class DatLaiMatKhauDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  ma_otp: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu mới không được để trống" })
  @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
  mat_khau_moi: string;

  @IsString()
  @IsNotEmpty()
  xac_nhan_mat_khau: string;
}

export class GuiLaiOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  loai_xac_thuc: string;
}

export class DoiMatKhauDto {
  @IsString()
  @IsNotEmpty({ message: "Mật khẩu hiện tại không được để trống" })
  mat_khau_hien_tai: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu mới không được để trống" })
  @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
  mat_khau_moi: string;

  @IsString()
  @IsNotEmpty({ message: "Xác nhận mật khẩu không được để trống" })
  xac_nhan_mat_khau: string;

  @IsOptional()
  @IsBoolean()
  dang_xuat_thiet_bi_khac?: boolean;
}
