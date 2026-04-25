import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
} from "class-validator";

export class DangKyDto {
  @IsEmail({}, { message: "Email khong hop le" })
  @IsNotEmpty({ message: "Email khong duoc de trong" })
  email: string;

  @IsString()
  @IsOptional()
  so_dien_thoai?: string;

  @IsString()
  @IsNotEmpty({ message: "Ten hien thi khong duoc de trong" })
  @MaxLength(120)
  ten_hien_thi: string;

  @IsString()
  @IsOptional()
  khu_vuc?: string;

  @IsString()
  @IsOptional()
  dia_chi?: string;

  @IsString()
  @IsNotEmpty({ message: "Mat khau khong duoc de trong" })
  @MinLength(6, { message: "Mat khau phai co it nhat 6 ky tu" })
  mat_khau: string;

  @IsString()
  @IsNotEmpty({ message: "Xac nhan mat khau khong duoc de trong" })
  xac_nhan_mat_khau: string;
}

export class XacNhanOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Ma OTP khong duoc de trong" })
  ma_otp: string;
}

export class DangNhapDto {
  @IsString()
  @IsNotEmpty({ message: "Ten dang nhap hoac email khong duoc de trong" })
  tai_khoan: string;

  @IsString()
  @IsNotEmpty({ message: "Mat khau khong duoc de trong" })
  mat_khau: string;

  @IsOptional()
  luu_dang_nhap?: boolean;
}

export class ChonVaiTroDto {
  @IsString()
  @IsNotEmpty()
  vai_tro: string;
}

export class QuenMatKhauDto {
  @IsEmail({}, { message: "Email khong hop le" })
  @IsNotEmpty({ message: "Email khong duoc de trong" })
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
  @IsNotEmpty({ message: "Mat khau moi khong duoc de trong" })
  @MinLength(6, { message: "Mat khau phai co it nhat 6 ky tu" })
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
  @IsNotEmpty({ message: "Mat khau hien tai khong duoc de trong" })
  mat_khau_hien_tai: string;

  @IsString()
  @IsNotEmpty({ message: "Mat khau moi khong duoc de trong" })
  @MinLength(6, { message: "Mat khau phai co it nhat 6 ky tu" })
  mat_khau_moi: string;

  @IsString()
  @IsNotEmpty({ message: "Xac nhan mat khau khong duoc de trong" })
  xac_nhan_mat_khau: string;

  @IsOptional()
  @IsBoolean()
  dang_xuat_thiet_bi_khac?: boolean;
}
