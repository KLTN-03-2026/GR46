import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";
import { randomBytes } from "crypto";
import { NguoiDungEntity } from "./entities/nguoi-dung.entity";
import { MaXacThucEntity } from "./entities/ma-xac-thuc.entity";
import { PhienDangNhapEntity } from "./entities/phien-dang-nhap.entity";
import {
  DangKyDto,
  XacNhanOtpDto,
  DangNhapDto,
  QuenMatKhauDto,
  DatLaiMatKhauDto,
  GuiLaiOtpDto,
  DoiMatKhauDto,
  DangNhapGoogleDto,
} from "./dto/auth.dto";
import { EmailService } from "../../shared/email/email.service";

@Injectable()
export class AuthService {
  private static readonly MAX_LOGIN_ATTEMPTS = 5;
  private static readonly LOGIN_BLOCK_MINUTES = 15;
  private static readonly OTP_EXPIRE_MINUTES = 2;
  constructor(
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectRepository(MaXacThucEntity)
    private readonly maXacThucRepo: Repository<MaXacThucEntity>,
    @InjectRepository(PhienDangNhapEntity)
    private readonly phienDangNhapRepo: Repository<PhienDangNhapEntity>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async dangKy(dto: DangKyDto) {
    if (dto.mat_khau !== dto.xac_nhan_mat_khau) {
      throw new BadRequestException(
        "Mật khẩu và xác nhận mật khẩu không trùng khớp",
      );
    }

    const emailTonTai = await this.nguoiDungRepo.findOne({
      where: { email: dto.email },
    });
    if (emailTonTai) {
      throw new ConflictException("Email đã được sử dụng");
    }

    if (dto.so_dien_thoai) {
      const sdtTonTai = await this.nguoiDungRepo.findOne({
        where: { so_dien_thoai: dto.so_dien_thoai },
      });
      if (sdtTonTai) {
        throw new ConflictException("Số điện thoại đã được sử dụng");
      }
    }

    const tenDangNhap =
      dto.email.split("@")[0] + "_" + Date.now().toString().slice(-4);
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
    const matKhauBam = await hash(dto.mat_khau, saltRounds);

    const nguoiDung = this.nguoiDungRepo.create({
      ten_dang_nhap: tenDangNhap,
      email: dto.email,
      so_dien_thoai: dto.so_dien_thoai ?? null,
      mat_khau_bam: matKhauBam,
      ten_hien_thi: dto.ten_hien_thi,
      khu_vuc: dto.khu_vuc ?? null,
      dia_chi: dto.dia_chi ?? null,
      trang_thai_tai_khoan: "cho_xac_thuc",
      nguon_dang_ky: "email",
    });

    const savedUser = await this.nguoiDungRepo.save(nguoiDung);

    const maOtp = this.taoMaOtp();
    const thoiGianHetHan = new Date(
      Date.now() + AuthService.OTP_EXPIRE_MINUTES * 60 * 1000,
    );

    await this.maXacThucRepo.save({
      id_nguoi_dung: savedUser.id,
      loai_xac_thuc: "dang_ky",
      kenh_gui: "email",
      dich_danh_nhan: dto.email,
      ma_xac_thuc: maOtp,
      thoi_gian_het_han: thoiGianHetHan,
      trang_thai: "hieu_luc",
    });

    await this.emailService.guiOtpDangKy(dto.email, maOtp, dto.ten_hien_thi);

    return {
      message: "Đăng ký thành công. Vui lòng xác nhận OTP đã gửi về email.",
      email: dto.email,
      ten_dang_nhap: tenDangNhap,
    };
  }

  async xacNhanDangKy(dto: XacNhanOtpDto) {
    const nguoiDung = await this.nguoiDungRepo.findOne({
      where: { email: dto.email },
    });
    if (!nguoiDung) {
      throw new NotFoundException("Email không tồn tại");
    }

    const otp = await this.timOtpHieuLuc(nguoiDung.id, "dang_ky", dto.ma_otp);

    nguoiDung.trang_thai_tai_khoan = "hoat_dong";
    nguoiDung.thoi_gian_xac_thuc_email = new Date();
    await this.nguoiDungRepo.save(nguoiDung);

    otp.trang_thai = "da_dung";
    otp.thoi_gian_xac_nhan = new Date();
    await this.maXacThucRepo.save(otp);

    return { message: "Xác nhận đăng ký thành công. Bạn có thể đăng nhập." };
  }

  async dangNhap(dto: DangNhapDto, ip?: string, userAgent?: string) {
    const taiKhoan = dto.tai_khoan.trim();
    const taiKhoanLower = taiKhoan.toLowerCase();
    const nguoiDung = await this.nguoiDungRepo
      .createQueryBuilder("nd")
      .where("LOWER(nd.email) = :email", { email: taiKhoanLower })
      .orWhere("nd.ten_dang_nhap = :username", { username: taiKhoan })
      .getOne();

    if (!nguoiDung) {
      throw new UnauthorizedException(
        "Tên đăng nhập/email hoặc mật khẩu không đúng",
      );
    }

    await this.kiemTraKhoaTamThoiDangNhap(nguoiDung);

    if (nguoiDung.trang_thai_tai_khoan === "bi_khoa") {
      throw new UnauthorizedException("Tài khoản của bạn đã bị khóa");
    }

    if (nguoiDung.trang_thai_tai_khoan === "cho_xac_thuc") {
      throw new UnauthorizedException(
        "Tài khoản chưa được xác thực. Vui lòng xác nhận OTP.",
      );
    }

    const matKhauDung = await compare(dto.mat_khau, nguoiDung.mat_khau_bam);
    if (!matKhauDung) {
      await this.ghiNhanDangNhapThatBai(nguoiDung);
      throw new UnauthorizedException(
        "Tên đăng nhập/email hoặc mật khẩu không đúng",
      );
    }
    await this.resetTrangThaiDangNhapThatBai(nguoiDung);

    const danhSachVaiTro = this.layDanhSachVaiTro(nguoiDung);

    if (danhSachVaiTro.length > 1 && !nguoiDung.la_admin) {
      return {
        can_chon_vai_tro: true,
        email: nguoiDung.email,
        danh_sach_vai_tro: danhSachVaiTro,
        message: "Vui lòng chọn vai trò đăng nhập",
      };
    }

    const vaiTro = nguoiDung.la_admin ? "admin" : danhSachVaiTro[0];
    return this.taoPhienDangNhap(
      nguoiDung,
      vaiTro,
      dto.luu_dang_nhap ?? false,
      ip,
      userAgent,
    );
  }

  async dangNhapVoiVaiTro(
    email: string,
    vaiTro: string,
    ghiNho = false,
    ip?: string,
    userAgent?: string,
  ) {
    const nguoiDung = await this.nguoiDungRepo.findOne({ where: { email } });
    if (!nguoiDung) {
      throw new NotFoundException("Tài khoản không tồn tại");
    }
    await this.kiemTraKhoaTamThoiDangNhap(nguoiDung);

    const danhSachVaiTro = this.layDanhSachVaiTro(nguoiDung);
    if (!danhSachVaiTro.includes(vaiTro)) {
      throw new BadRequestException("Vai trò không hợp lệ");
    }

    return this.taoPhienDangNhap(nguoiDung, vaiTro, ghiNho, ip, userAgent);
  }

  async dangNhapGoogle(
    dto: DangNhapGoogleDto,
    ip?: string,
    userAgent?: string,
  ) {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(dto.credential)}`,
    );
    const tokenInfo = (await response.json().catch(() => null)) as
      | {
          aud?: string;
          email?: string;
          email_verified?: string;
          sub?: string;
          name?: string;
          picture?: string;
        }
      | null;

    if (!response.ok || !tokenInfo?.email || !tokenInfo?.sub) {
      throw new UnauthorizedException("Xác thực Google thất bại");
    }

    const expectedAud = process.env.GOOGLE_CLIENT_ID?.trim();
    if (expectedAud && tokenInfo.aud !== expectedAud) {
      throw new UnauthorizedException("Google Client ID không khớp");
    }
    if (String(tokenInfo.email_verified ?? "false") !== "true") {
      throw new UnauthorizedException("Email Google chưa được xác thực");
    }

    let nguoiDung = await this.nguoiDungRepo.findOne({
      where: { email: tokenInfo.email.toLowerCase() },
    });
    if (!nguoiDung) {
      const tenDangNhapCoSo = tokenInfo.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
      const tenDangNhap =
        `${tenDangNhapCoSo || "google_user"}_${Date.now().toString().slice(-6)}`.slice(0, 50);
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
      nguoiDung = await this.nguoiDungRepo.save(
        this.nguoiDungRepo.create({
          ten_dang_nhap: tenDangNhap,
          email: tokenInfo.email.toLowerCase(),
          so_dien_thoai: null,
          mat_khau_bam: await hash(randomBytes(24).toString("hex"), saltRounds),
          ten_hien_thi: tokenInfo.name?.trim() || tenDangNhap,
          anh_dai_dien: tokenInfo.picture ?? null,
          khu_vuc: null,
          dia_chi: null,
          trang_thai_tai_khoan: "hoat_dong",
          nguon_dang_ky: "google",
          ma_nguon_ngoai: tokenInfo.sub,
          thoi_gian_xac_thuc_email: new Date(),
        }),
      );
    } else {
      if (!nguoiDung.ma_nguon_ngoai && tokenInfo.sub) {
        nguoiDung.ma_nguon_ngoai = tokenInfo.sub;
      }
      if (!nguoiDung.anh_dai_dien && tokenInfo.picture) {
        nguoiDung.anh_dai_dien = tokenInfo.picture;
      }
      if (!nguoiDung.thoi_gian_xac_thuc_email) {
        nguoiDung.thoi_gian_xac_thuc_email = new Date();
      }
      await this.nguoiDungRepo.save(nguoiDung);
    }

    await this.kiemTraKhoaTamThoiDangNhap(nguoiDung);
    const danhSachVaiTro = this.layDanhSachVaiTro(nguoiDung);
    const vaiTro = nguoiDung.la_admin ? "admin" : danhSachVaiTro[0];
    return this.taoPhienDangNhap(
      nguoiDung,
      vaiTro,
      dto.luu_dang_nhap ?? false,
      ip,
      userAgent,
    );
  }

  async quenMatKhau(dto: QuenMatKhauDto) {
    const nguoiDung = await this.nguoiDungRepo.findOne({
      where: { email: dto.email },
    });
    if (!nguoiDung) {
      throw new NotFoundException("Email khong ton tai trong he thong");
    }

    await this.maXacThucRepo.update(
      {
        id_nguoi_dung: nguoiDung.id,
        loai_xac_thuc: "quen_mat_khau",
        trang_thai: "hieu_luc",
      },
      { trang_thai: "da_huy" },
    );

    const maOtp = this.taoMaOtp();
    const thoiGianHetHan = new Date(
      Date.now() + AuthService.OTP_EXPIRE_MINUTES * 60 * 1000,
    );

    await this.maXacThucRepo.save({
      id_nguoi_dung: nguoiDung.id,
      loai_xac_thuc: "quen_mat_khau",
      kenh_gui: "email",
      dich_danh_nhan: dto.email,
      ma_xac_thuc: maOtp,
      thoi_gian_het_han: thoiGianHetHan,
      trang_thai: "hieu_luc",
    });

    await this.emailService.guiOtpQuenMatKhau(
      dto.email,
      maOtp,
      nguoiDung.ten_hien_thi,
    );

    return { message: "Ma OTP da duoc gui ve email cua ban" };
  }

  async xacNhanQuenMatKhau(dto: XacNhanOtpDto) {
    const nguoiDung = await this.nguoiDungRepo.findOne({
      where: { email: dto.email },
    });
    if (!nguoiDung) {
      throw new NotFoundException("Email khong ton tai");
    }

    await this.timOtpHieuLuc(nguoiDung.id, "quen_mat_khau", dto.ma_otp);

    return { message: "Ma OTP hop le" };
  }

  async datLaiMatKhau(dto: DatLaiMatKhauDto) {
    if (dto.mat_khau_moi !== dto.xac_nhan_mat_khau) {
      throw new BadRequestException(
        "Mat khau moi va xac nhan mat khau khong trung khop",
      );
    }

    const nguoiDung = await this.nguoiDungRepo.findOne({
      where: { email: dto.email },
    });
    if (!nguoiDung) {
      throw new NotFoundException("Email khong ton tai");
    }

    const otp = await this.timOtpHieuLuc(
      nguoiDung.id,
      "quen_mat_khau",
      dto.ma_otp,
    );

    const laMatKhauCu = await compare(dto.mat_khau_moi, nguoiDung.mat_khau_bam);
    if (laMatKhauCu) {
      throw new BadRequestException(
        "Mat khau moi khong duoc trung voi mat khau hien tai",
      );
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
    nguoiDung.mat_khau_bam = await hash(dto.mat_khau_moi, saltRounds);
    await this.nguoiDungRepo.save(nguoiDung);

    otp.trang_thai = "da_dung";
    otp.thoi_gian_xac_nhan = new Date();
    await this.maXacThucRepo.save(otp);

    await this.phienDangNhapRepo.delete({ id_nguoi_dung: nguoiDung.id });

    return { message: "Dat lai mat khau thanh cong. Vui long dang nhap lai." };
  }

  async guiLaiOtp(dto: GuiLaiOtpDto) {
    const nguoiDung = await this.nguoiDungRepo.findOne({
      where: { email: dto.email },
    });
    if (!nguoiDung) {
      throw new NotFoundException("Email khong ton tai");
    }

    await this.maXacThucRepo.update(
      {
        id_nguoi_dung: nguoiDung.id,
        loai_xac_thuc: dto.loai_xac_thuc,
        trang_thai: "hieu_luc",
      },
      { trang_thai: "da_huy" },
    );

    const maOtp = this.taoMaOtp();
    const thoiGianHetHan = new Date(
      Date.now() + AuthService.OTP_EXPIRE_MINUTES * 60 * 1000,
    );

    await this.maXacThucRepo.save({
      id_nguoi_dung: nguoiDung.id,
      loai_xac_thuc: dto.loai_xac_thuc,
      kenh_gui: "email",
      dich_danh_nhan: dto.email,
      ma_xac_thuc: maOtp,
      thoi_gian_het_han: thoiGianHetHan,
      trang_thai: "hieu_luc",
    });

    if (dto.loai_xac_thuc === "dang_ky") {
      await this.emailService.guiOtpDangKy(
        dto.email,
        maOtp,
        nguoiDung.ten_hien_thi,
      );
    } else if (dto.loai_xac_thuc === "quen_mat_khau") {
      await this.emailService.guiOtpQuenMatKhau(
        dto.email,
        maOtp,
        nguoiDung.ten_hien_thi,
      );
    }

    return { message: "Ma OTP moi da duoc gui ve email cua ban" };
  }

  async doiMatKhau(
    userId: number,
    dto: DoiMatKhauDto,
    tokenHienTai?: string,
  ) {
    if (dto.mat_khau_moi !== dto.xac_nhan_mat_khau) {
      throw new BadRequestException(
        "Mat khau moi va xac nhan mat khau khong trung khop",
      );
    }

    const nguoiDung = await this.nguoiDungRepo.findOne({ where: { id: userId } });
    if (!nguoiDung) {
      throw new NotFoundException("Nguoi dung khong ton tai");
    }

    const matKhauCuDung = await compare(
      dto.mat_khau_hien_tai,
      nguoiDung.mat_khau_bam,
    );
    if (!matKhauCuDung) {
      throw new BadRequestException("Mat khau hien tai khong dung");
    }

    const laMatKhauCu = await compare(dto.mat_khau_moi, nguoiDung.mat_khau_bam);
    if (laMatKhauCu) {
      throw new BadRequestException(
        "Mat khau moi khong duoc trung voi mat khau hien tai",
      );
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
    nguoiDung.mat_khau_bam = await hash(dto.mat_khau_moi, saltRounds);
    await this.nguoiDungRepo.save(nguoiDung);

    if (dto.dang_xuat_thiet_bi_khac) {
      const qb = this.phienDangNhapRepo
        .createQueryBuilder()
        .delete()
        .from(PhienDangNhapEntity)
        .where("id_nguoi_dung = :userId", { userId });
      if (tokenHienTai) {
        qb.andWhere("token_phien != :token", { token: tokenHienTai });
      }
      await qb.execute();
    }

    return { message: "Doi mat khau thanh cong" };
  }

  async dangXuat(tokenPhien: string) {
    await this.phienDangNhapRepo.delete({ token_phien: tokenPhien });
    return { message: "Dang xuat thanh cong" };
  }

  async layThongTinNguoiDung(userId: number) {
    const nguoiDung = await this.nguoiDungRepo.findOne({
      where: { id: userId },
    });
    if (!nguoiDung) {
      throw new NotFoundException("Nguoi dung khong ton tai");
    }

    const { mat_khau_bam, ...thongTin } = nguoiDung;
    return thongTin;
  }

  private taoMaOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private layDanhSachVaiTro(nguoiDung: NguoiDungEntity): string[] {
    const vaiTro: string[] = ["nguoi_dung"];
    if (nguoiDung.la_nha_sang_tao) vaiTro.push("nha_sang_tao");
    if (nguoiDung.la_chu_cua_hang) vaiTro.push("chu_cua_hang");
    if (nguoiDung.la_admin) vaiTro.push("admin");
    return vaiTro;
  }

  private async timOtpHieuLuc(
    idNguoiDung: number,
    loaiXacThuc: string,
    maOtp: string,
  ): Promise<MaXacThucEntity> {
    const otp = await this.maXacThucRepo.findOne({
      where: {
        id_nguoi_dung: idNguoiDung,
        loai_xac_thuc: loaiXacThuc,
        ma_xac_thuc: maOtp,
        trang_thai: "hieu_luc",
      },
    });

    if (!otp) {
      throw new BadRequestException("Ma OTP khong dung");
    }

    if (new Date() > otp.thoi_gian_het_han) {
      otp.trang_thai = "het_han";
      await this.maXacThucRepo.save(otp);
      throw new BadRequestException("Ma OTP da het han");
    }

    return otp;
  }

  private async taoPhienDangNhap(
    nguoiDung: NguoiDungEntity,
    vaiTro: string,
    ghiNho: boolean,
    ip?: string,
    userAgent?: string,
  ) {
    const payload = {
      sub: nguoiDung.id,
      email: nguoiDung.email,
      vai_tro: vaiTro,
    };

    const expiresIn = ghiNho ? "30d" : (process.env.JWT_EXPIRES_IN ?? "7d");
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET ?? "dishnet-secret",
      expiresIn: expiresIn as any,
    });

    const hetHanMs = ghiNho
      ? 30 * 24 * 60 * 60 * 1000
      : 7 * 24 * 60 * 60 * 1000;
    const hetHanLuc = new Date(Date.now() + hetHanMs);

    await this.phienDangNhapRepo.save({
      id_nguoi_dung: nguoiDung.id,
      vai_tro_dang_nhap: vaiTro,
      token_phien: token,
      thiet_bi: userAgent ?? null,
      dia_chi_ip: ip ?? null,
      ghi_nho_dang_nhap: ghiNho,
      het_han_luc: hetHanLuc,
      lan_hoat_dong_cuoi: new Date(),
    });

    nguoiDung.lan_dang_nhap_cuoi = new Date();
    await this.nguoiDungRepo.save(nguoiDung);

    return {
      access_token: token,
      vai_tro: vaiTro,
      expires_in: expiresIn,
      nguoi_dung: {
        id: nguoiDung.id,
        email: nguoiDung.email,
        ten_hien_thi: nguoiDung.ten_hien_thi,
        anh_dai_dien: nguoiDung.anh_dai_dien,
        ten_dang_nhap: nguoiDung.ten_dang_nhap,
      },
    };
  }

  private parseFailedAttempts(nguoiDung: NguoiDungEntity) {
    const lyDo = nguoiDung.ly_do_khoa_hien_tai ?? "";
    const match = lyDo.match(/\[FAILED_LOGIN_ATTEMPTS:(\d+)\]/);
    return match ? Number(match[1]) || 0 : 0;
  }

  private setFailedAttempts(nguoiDung: NguoiDungEntity, count: number) {
    const cleanReason = (nguoiDung.ly_do_khoa_hien_tai ?? "")
      .replace(/\[FAILED_LOGIN_ATTEMPTS:\d+\]/g, "")
      .trim();
    nguoiDung.ly_do_khoa_hien_tai = `${cleanReason} [FAILED_LOGIN_ATTEMPTS:${count}]`.trim();
  }

  private async ghiNhanDangNhapThatBai(nguoiDung: NguoiDungEntity) {
    const attempts = this.parseFailedAttempts(nguoiDung) + 1;
    this.setFailedAttempts(nguoiDung, attempts);
    if (attempts >= AuthService.MAX_LOGIN_ATTEMPTS) {
      nguoiDung.kieu_khoa_tai_khoan = "tam_thoi";
      nguoiDung.thoi_gian_mo_khoa = new Date(
        Date.now() + AuthService.LOGIN_BLOCK_MINUTES * 60 * 1000,
      );
    }
    await this.nguoiDungRepo.save(nguoiDung);
  }

  private async resetTrangThaiDangNhapThatBai(nguoiDung: NguoiDungEntity) {
    if (
      !this.parseFailedAttempts(nguoiDung) &&
      nguoiDung.kieu_khoa_tai_khoan !== "tam_thoi"
    ) {
      return;
    }
    nguoiDung.kieu_khoa_tai_khoan =
      nguoiDung.kieu_khoa_tai_khoan === "tam_thoi"
        ? null
        : nguoiDung.kieu_khoa_tai_khoan;
    nguoiDung.thoi_gian_mo_khoa =
      nguoiDung.kieu_khoa_tai_khoan === null ? null : nguoiDung.thoi_gian_mo_khoa;
    this.setFailedAttempts(nguoiDung, 0);
    await this.nguoiDungRepo.save(nguoiDung);
  }

  private async kiemTraKhoaTamThoiDangNhap(nguoiDung: NguoiDungEntity) {
    if (nguoiDung.kieu_khoa_tai_khoan !== "tam_thoi") return;
    if (!nguoiDung.thoi_gian_mo_khoa) return;
    if (nguoiDung.thoi_gian_mo_khoa.getTime() <= Date.now()) {
      nguoiDung.kieu_khoa_tai_khoan = null;
      nguoiDung.thoi_gian_mo_khoa = null;
      this.setFailedAttempts(nguoiDung, 0);
      await this.nguoiDungRepo.save(nguoiDung);
      return;
    }
    throw new UnauthorizedException(
      `Bạn đã nhập sai quá ${AuthService.MAX_LOGIN_ATTEMPTS} lần. Vui lòng thử lại sau ${AuthService.LOGIN_BLOCK_MINUTES} phút.`,
    );
  }
}
