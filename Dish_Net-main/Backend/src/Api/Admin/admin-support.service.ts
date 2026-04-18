import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import { TepDinhKemEntity } from "./entities/tep-dinh-kem.entity";
import { YeuCauHoTroEntity } from "./entities/yeu-cau-ho-tro.entity";

@Injectable()
export class AdminSupportService {
  constructor(
    @InjectRepository(YeuCauHoTroEntity)
    private readonly yeuCauHoTroRepo: Repository<YeuCauHoTroEntity>,
    @InjectRepository(TepDinhKemEntity)
    private readonly tepDinhKemRepo: Repository<TepDinhKemEntity>,
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

    const qb = this.yeuCauHoTroRepo
      .createQueryBuilder("yc")
      .leftJoinAndSelect("yc.nguoi_gui", "nd")
      .where("nd.la_admin = :laAdmin", { laAdmin: false })
      .orderBy("yc.thoi_gian_gui", "DESC")
      .addOrderBy("yc.id", "DESC")
      .skip(skip)
      .take(soLuong);

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        "(yc.ma_yeu_cau LIKE :search OR nd.ten_hien_thi LIKE :search)",
        {
          search: `%${query.tim_kiem.trim()}%`,
        },
      );
    }

    if (query.trang_thai) {
      qb.andWhere("yc.trang_thai = :trangThai", {
        trangThai: query.trang_thai,
      });
    }

    this.apDungLocLoaiTaiKhoan(qb, query.loai_tai_khoan);

    const [items, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: item.id,
        ma_yeu_cau: item.ma_yeu_cau,
        nguoi_gui: item.nguoi_gui.ten_hien_thi,
        loai_tai_khoan: this.xacDinhLoaiTaiKhoan(item.nguoi_gui),
        chu_de: item.chu_de,
        trang_thai: item.trang_thai,
        thoi_gian_gui: item.thoi_gian_gui,
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async layChiTiet(id: number) {
    const yeuCau = await this.yeuCauHoTroRepo.findOne({
      where: { id },
      relations: {
        nguoi_gui: true,
        admin_phan_hoi: true,
      },
    });

    if (!yeuCau) {
      throw new NotFoundException("Yeu cau ho tro khong ton tai");
    }

    const tepDinhKem = await this.tepDinhKemRepo.find({
      where: {
        loai_doi_tuong: "yeu_cau_ho_tro",
        id_doi_tuong: id,
      },
      order: {
        thu_tu_hien_thi: "ASC",
        id: "ASC",
      },
    });

    return {
      id: yeuCau.id,
      ma_yeu_cau: yeuCau.ma_yeu_cau,
      thong_tin_nguoi_gui: {
        id: yeuCau.nguoi_gui.id,
        ten_nguoi_dung: yeuCau.nguoi_gui.ten_hien_thi,
        email: yeuCau.nguoi_gui.email,
        so_dien_thoai: yeuCau.nguoi_gui.so_dien_thoai,
        loai_tai_khoan: this.xacDinhLoaiTaiKhoan(yeuCau.nguoi_gui),
      },
      thong_tin_yeu_cau: {
        chu_de: yeuCau.chu_de,
        noi_dung_yeu_cau: yeuCau.noi_dung_yeu_cau,
        trang_thai: yeuCau.trang_thai,
        thoi_gian_gui: yeuCau.thoi_gian_gui,
      },
      thong_tin_phan_hoi:
        yeuCau.trang_thai === "da_phan_hoi"
          ? {
              noi_dung_phan_hoi: yeuCau.noi_dung_phan_hoi,
              thoi_gian_phan_hoi: yeuCau.thoi_gian_phan_hoi,
              admin_phan_hoi: yeuCau.admin_phan_hoi?.email ?? "Admin",
            }
          : null,
      tep_dinh_kem: tepDinhKem.map((tep) => ({
        id: tep.id,
        loai_tep: tep.loai_tep,
        url: tep.duong_dan_tep,
        ghi_chu: tep.ghi_chu,
      })),
    };
  }

  async phanHoi(id: number, noiDung: string, idAdmin: number) {
    if (!noiDung.trim()) {
      throw new BadRequestException("Noi dung phan hoi khong duoc de trong");
    }

    const yeuCau = await this.yeuCauHoTroRepo.findOne({
      where: { id },
    });

    if (!yeuCau) {
      throw new NotFoundException("Yeu cau ho tro khong ton tai");
    }

    if (yeuCau.trang_thai === "da_phan_hoi") {
      throw new BadRequestException("Yeu cau ho tro da duoc phan hoi");
    }

    yeuCau.noi_dung_phan_hoi = noiDung.trim();
    yeuCau.id_admin_phan_hoi = idAdmin;
    yeuCau.trang_thai = "da_phan_hoi";
    yeuCau.thoi_gian_phan_hoi = new Date();

    await this.yeuCauHoTroRepo.save(yeuCau);

    return { message: "Phan hoi yeu cau ho tro thanh cong" };
  }

  private apDungLocLoaiTaiKhoan(
    qb: SelectQueryBuilder<YeuCauHoTroEntity>,
    loaiTaiKhoan?: string,
  ) {
    switch (loaiTaiKhoan) {
      case "nguoi_dung":
        qb.andWhere("nd.la_nha_sang_tao = :laNhaSangTao", {
          laNhaSangTao: false,
        }).andWhere("nd.la_chu_cua_hang = :laChuCuaHang", {
          laChuCuaHang: false,
        });
        break;
      case "nha_sang_tao":
        qb.andWhere("nd.la_nha_sang_tao = :laNhaSangTao", {
          laNhaSangTao: true,
        }).andWhere("nd.la_chu_cua_hang = :laChuCuaHang", {
          laChuCuaHang: false,
        });
        break;
      case "chu_cua_hang":
        qb.andWhere("nd.la_chu_cua_hang = :laChuCuaHang", {
          laChuCuaHang: true,
        });
        break;
      default:
        break;
    }
  }

  private xacDinhLoaiTaiKhoan(nguoiDung: NguoiDungEntity) {
    if (nguoiDung.la_chu_cua_hang) return "chu_cua_hang";
    if (nguoiDung.la_nha_sang_tao) return "nha_sang_tao";
    return "nguoi_dung";
  }
}
