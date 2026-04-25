import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, FindOptionsWhere } from "typeorm";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import { PhienDangNhapEntity } from "../Auth/entities/phien-dang-nhap.entity";

@Injectable()
export class AdminAccountService {
  constructor(
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectRepository(PhienDangNhapEntity)
    private readonly phienRepo: Repository<PhienDangNhapEntity>,
  ) {}

  async layDanhSach(query: {
    tim_kiem?: string;
    loai_tai_khoan?: string;
    trang_thai?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const where: FindOptionsWhere<NguoiDungEntity>[] = [];
    const baseWhere: FindOptionsWhere<NguoiDungEntity> = {
      la_admin: false,
    };

    if (query.loai_tai_khoan) {
      switch (query.loai_tai_khoan) {
        case "nguoi_dung":
          baseWhere.la_nha_sang_tao = false;
          baseWhere.la_chu_cua_hang = false;
          baseWhere.la_admin = false;
          break;
        case "nha_sang_tao":
          baseWhere.la_nha_sang_tao = true;
          break;
        case "chu_cua_hang":
          baseWhere.la_chu_cua_hang = true;
          break;
      }
    }

    if (query.trang_thai) {
      baseWhere.trang_thai_tai_khoan = query.trang_thai;
    }

    if (query.tim_kiem) {
      where.push(
        { ...baseWhere, ten_hien_thi: Like(`%${query.tim_kiem}%`) },
        { ...baseWhere, email: Like(`%${query.tim_kiem}%`) },
        { ...baseWhere, ten_dang_nhap: Like(`%${query.tim_kiem}%`) },
      );
    } else {
      where.push(baseWhere);
    }

    const [danhSach, tongSo] = await this.nguoiDungRepo.findAndCount({
      where,
      order: { ngay_tao: "DESC" },
      skip,
      take: soLuong,
      select: [
        "id",
        "ten_dang_nhap",
        "ten_hien_thi",
        "email",
        "so_dien_thoai",
        "anh_dai_dien",
        "la_nha_sang_tao",
        "la_chu_cua_hang",
        "la_admin",
        "trang_thai_tai_khoan",
        "ly_do_khoa_hien_tai",
        "ngay_tao",
      ],
    });

    const items = danhSach.map((nd) => ({
      id: nd.id,
      ten_dang_nhap: nd.ten_dang_nhap,
      ten_hien_thi: nd.ten_hien_thi,
      email: nd.email,
      so_dien_thoai: nd.so_dien_thoai,
      anh_dai_dien: nd.anh_dai_dien,
      loai_tai_khoan: this.xacDinhLoai(nd),
      trang_thai: nd.trang_thai_tai_khoan,
      ly_do_khoa: nd.ly_do_khoa_hien_tai,
      ngay_tao: nd.ngay_tao,
    }));

    return {
      du_lieu: items,
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async layChiTiet(id: number) {
    const nd = await this.nguoiDungRepo.findOne({ where: { id } });
    if (!nd) {
      throw new NotFoundException("Tai khoan khong ton tai");
    }

    if (nd.la_admin) {
      throw new NotFoundException("Tai khoan khong ton tai");
    }

    const { mat_khau_bam, ma_nguon_ngoai, ...thongTin } = nd;
    return {
      ...thongTin,
      loai_tai_khoan: this.xacDinhLoai(nd),
    };
  }

  async khoaTaiKhoan(id: number, lyDo: string) {
    const nd = await this.nguoiDungRepo.findOne({ where: { id } });
    if (!nd) {
      throw new NotFoundException("Tai khoan khong ton tai");
    }

    if (nd.la_admin) {
      throw new BadRequestException("Khong the khoa tai khoan admin");
    }

    if (nd.trang_thai_tai_khoan === "bi_khoa") {
      throw new BadRequestException("Tai khoan da bi khoa");
    }

    nd.trang_thai_tai_khoan = "bi_khoa";
    nd.ly_do_khoa_hien_tai = lyDo;
    await this.nguoiDungRepo.save(nd);

    await this.phienRepo.delete({ id_nguoi_dung: nd.id });

    return { message: "Khoa tai khoan thanh cong" };
  }

  async moKhoaTaiKhoan(id: number) {
    const nd = await this.nguoiDungRepo.findOne({ where: { id } });
    if (!nd) {
      throw new NotFoundException("Tai khoan khong ton tai");
    }

    if (nd.la_admin) {
      throw new BadRequestException("Khong the mo khoa tai khoan admin");
    }

    if (nd.trang_thai_tai_khoan !== "bi_khoa") {
      throw new BadRequestException("Tai khoan khong o trang thai bi khoa");
    }

    nd.trang_thai_tai_khoan = "hoat_dong";
    nd.ly_do_khoa_hien_tai = null;
    await this.nguoiDungRepo.save(nd);

    return { message: "Mo khoa tai khoan thanh cong" };
  }

  private xacDinhLoai(nd: NguoiDungEntity): string {
    if (nd.la_admin) return "admin";
    if (nd.la_chu_cua_hang) return "chu_cua_hang";
    if (nd.la_nha_sang_tao) return "nha_sang_tao";
    return "nguoi_dung";
  }
}
