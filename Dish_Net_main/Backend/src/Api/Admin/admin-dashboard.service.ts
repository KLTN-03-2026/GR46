import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import {
  DanhSachHoatDongQueryDto,
  ThongKeHeThongQueryDto,
} from "./dto/admin-dashboard.dto";
import { CuaHangEntity } from "./entities/cua-hang.entity";
import { DonHangChiTietEntity } from "./entities/don-hang-chi-tiet.entity";
import { DonHangEntity } from "./entities/don-hang.entity";
import { KhuyenMaiEntity } from "./entities/khuyen-mai.entity";
import { MonAnEntity } from "./entities/mon-an.entity";
import { YeuCauNangCapEntity } from "./entities/yeu-cau-nang-cap.entity";

type DateRange = {
  bo_loc_thoi_gian: "today" | "7days" | "30days" | "custom";
  tu_ngay: Date;
  den_ngay: Date;
};

type HoatDongItem = {
  id: string;
  loai: "nguoi_dung" | "don_hang" | "khuyen_mai" | "yeu_cau_nang_cap";
  ten_chu_the: string;
  noi_dung: string;
  thoi_gian: Date;
  href: string;
};

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(DonHangChiTietEntity)
    private readonly donHangChiTietRepo: Repository<DonHangChiTietEntity>,
    @InjectRepository(MonAnEntity)
    private readonly monAnRepo: Repository<MonAnEntity>,
    @InjectRepository(YeuCauNangCapEntity)
    private readonly yeuCauNangCapRepo: Repository<YeuCauNangCapEntity>,
    @InjectRepository(KhuyenMaiEntity)
    private readonly khuyenMaiRepo: Repository<KhuyenMaiEntity>,
  ) {}

  async layThongKeTongQuan(query: ThongKeHeThongQueryDto) {
    const range = this.xayDungKhoangThoiGian(query);

    const [
      thongKeTongQuan,
      bieuDoDonHangTheoNgay,
      bieuDoDoanhThuTheoThang,
      topCuaHang,
      topMonAn,
      yeuCauCanXuLy,
      hoatDongGanDay,
    ] = await Promise.all([
      this.layThongKeTongQuanTrongKhoang(range),
      this.layBieuDoDonHangTheoNgay(range),
      this.layBieuDoDoanhThuTheoThang(range),
      this.layTopCuaHang(range),
      this.layTopMonAn(range),
      this.layYeuCauCanXuLy(),
      this.layHoatDongGanDay(range, 5),
    ]);

    return {
      bo_loc: {
        bo_loc_thoi_gian: range.bo_loc_thoi_gian,
        tu_ngay: range.tu_ngay,
        den_ngay: range.den_ngay,
      },
      thong_ke_tong_quan: thongKeTongQuan,
      bieu_do_don_hang_theo_ngay: bieuDoDonHangTheoNgay,
      bieu_do_doanh_thu_theo_thang: bieuDoDoanhThuTheoThang,
      top_cua_hang: topCuaHang,
      top_mon_an: topMonAn,
      yeu_cau_can_xu_ly: yeuCauCanXuLy,
      hoat_dong_gan_day: hoatDongGanDay,
    };
  }

  async layDanhSachHoatDong(query: DanhSachHoatDongQueryDto) {
    const range = this.xayDungKhoangThoiGian(query);
    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const danhSach = await this.layHoatDongGanDay(range);
    const duLieu = danhSach.slice(skip, skip + soLuong);

    return {
      du_lieu: duLieu.map((item) => this.mapHoatDong(item)),
      tong_so: danhSach.length,
      trang,
      so_luong: soLuong,
      tong_trang: Math.max(1, Math.ceil(danhSach.length / soLuong)),
      bo_loc: {
        bo_loc_thoi_gian: range.bo_loc_thoi_gian,
        tu_ngay: range.tu_ngay,
        den_ngay: range.den_ngay,
      },
    };
  }

  private async layThongKeTongQuanTrongKhoang(range: DateRange) {
    const [tongNguoiDung, tongCuaHang, tongDonHang, doanhThuRaw] =
      await Promise.all([
        this.nguoiDungRepo
          .createQueryBuilder("nd")
          .where("nd.la_admin = :laAdmin", { laAdmin: false })
          .andWhere("nd.ngay_tao BETWEEN :tuNgay AND :denNgay", {
            tuNgay: range.tu_ngay,
            denNgay: range.den_ngay,
          })
          .getCount(),
        this.cuaHangRepo
          .createQueryBuilder("ch")
          .where("ch.ngay_tao BETWEEN :tuNgay AND :denNgay", {
            tuNgay: range.tu_ngay,
            denNgay: range.den_ngay,
          })
          .getCount(),
        this.donHangRepo
          .createQueryBuilder("dh")
          .where("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
            tuNgay: range.tu_ngay,
            denNgay: range.den_ngay,
          })
          .getCount(),
        this.donHangRepo
          .createQueryBuilder("dh")
          .select("COALESCE(SUM(dh.tong_thanh_toan), 0)", "tong")
          .where("dh.trang_thai_don_hang = :trangThai", {
            trangThai: "da_giao",
          })
          .andWhere("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
            tuNgay: range.tu_ngay,
            denNgay: range.den_ngay,
          })
          .getRawOne<{ tong: string | number }>(),
      ]);

    return {
      tong_nguoi_dung: tongNguoiDung,
      tong_cua_hang: tongCuaHang,
      tong_don_hang: tongDonHang,
      doanh_thu: Number(doanhThuRaw?.tong ?? 0),
    };
  }

  private async layBieuDoDonHangTheoNgay(range: DateRange) {
    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .select("DATE_FORMAT(dh.thoi_gian_dat, '%Y-%m-%d')", "ngay")
      .addSelect("COUNT(dh.id)", "tong_don_hang")
      .where("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
        tuNgay: range.tu_ngay,
        denNgay: range.den_ngay,
      })
      .groupBy("DATE_FORMAT(dh.thoi_gian_dat, '%Y-%m-%d')")
      .orderBy("DATE_FORMAT(dh.thoi_gian_dat, '%Y-%m-%d')", "ASC")
      .getRawMany<{ ngay: string; tong_don_hang: string }>();

    const byDate = new Map(
      rows.map((item) => [item.ngay, Number(item.tong_don_hang)]),
    );

    const data: Array<{
      ngay: string;
      nhan: string;
      tong_don_hang: number;
    }> = [];

    for (
      const cursor = new Date(range.tu_ngay);
      cursor <= range.den_ngay;
      cursor.setDate(cursor.getDate() + 1)
    ) {
      const ngay = this.formatDateKey(cursor);
      data.push({
        ngay,
        nhan: this.formatDayLabel(cursor),
        tong_don_hang: byDate.get(ngay) ?? 0,
      });
    }

    return data;
  }

  private async layBieuDoDoanhThuTheoThang(range: DateRange) {
    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .select("DATE_FORMAT(dh.thoi_gian_dat, '%Y-%m')", "thang")
      .addSelect("COALESCE(SUM(dh.tong_thanh_toan), 0)", "doanh_thu")
      .where("dh.trang_thai_don_hang = :trangThai", { trangThai: "da_giao" })
      .andWhere("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
        tuNgay: range.tu_ngay,
        denNgay: range.den_ngay,
      })
      .groupBy("DATE_FORMAT(dh.thoi_gian_dat, '%Y-%m')")
      .orderBy("DATE_FORMAT(dh.thoi_gian_dat, '%Y-%m')", "ASC")
      .getRawMany<{ thang: string; doanh_thu: string }>();

    const byMonth = new Map(
      rows.map((item) => [item.thang, Number(item.doanh_thu)]),
    );

    const start = new Date(
      range.tu_ngay.getFullYear(),
      range.tu_ngay.getMonth(),
      1,
    );
    const end = new Date(
      range.den_ngay.getFullYear(),
      range.den_ngay.getMonth(),
      1,
    );
    const data: Array<{
      thang: string;
      nhan: string;
      doanh_thu: number;
    }> = [];

    for (
      const cursor = new Date(start);
      cursor <= end;
      cursor.setMonth(cursor.getMonth() + 1)
    ) {
      const thang = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
      data.push({
        thang,
        nhan: `T${cursor.getMonth() + 1}`,
        doanh_thu: byMonth.get(thang) ?? 0,
      });
    }

    return data;
  }

  private async layTopCuaHang(range: DateRange) {
    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .innerJoin(CuaHangEntity, "ch", "ch.id = dh.id_cua_hang")
      .select("ch.id", "id")
      .addSelect("ch.ten_cua_hang", "ten_cua_hang")
      .addSelect("MAX(ch.anh_dai_dien)", "hinh_anh")
      .addSelect("COUNT(dh.id)", "tong_don_hang")
      .where("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
        tuNgay: range.tu_ngay,
        denNgay: range.den_ngay,
      })
      .andWhere("dh.trang_thai_don_hang NOT IN (:...trangThaiLoaiBo)", {
        trangThaiLoaiBo: ["da_huy", "tra_hang"],
      })
      .groupBy("ch.id")
      .addGroupBy("ch.ten_cua_hang")
      .orderBy("tong_don_hang", "DESC")
      .addOrderBy("ch.ten_cua_hang", "ASC")
      .limit(5)
      .getRawMany<{
        id: string;
        ten_cua_hang: string;
        hinh_anh: string | null;
        tong_don_hang: string;
      }>();

    return rows.map((item, index) => ({
      stt: index + 1,
      id: Number(item.id),
      ten_cua_hang: item.ten_cua_hang,
      hinh_anh: item.hinh_anh,
      tong_don_hang: Number(item.tong_don_hang),
    }));
  }

  private async layTopMonAn(range: DateRange) {
    const rows = await this.donHangChiTietRepo
      .createQueryBuilder("ct")
      .innerJoin(DonHangEntity, "dh", "dh.id = ct.id_don_hang")
      .leftJoin(MonAnEntity, "ma", "ma.id = ct.id_mon_an")
      .select("COALESCE(ma.id, 0)", "id_mon_an")
      .addSelect("ct.ten_mon_snapshot", "ten_mon")
      .addSelect(
        "MAX(COALESCE(ma.hinh_anh_dai_dien, ct.hinh_anh_snapshot))",
        "hinh_anh",
      )
      .addSelect("SUM(ct.so_luong)", "tong_luot_dat")
      .where("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
        tuNgay: range.tu_ngay,
        denNgay: range.den_ngay,
      })
      .andWhere("dh.trang_thai_don_hang NOT IN (:...trangThaiLoaiBo)", {
        trangThaiLoaiBo: ["da_huy", "tra_hang"],
      })
      .groupBy("COALESCE(ma.id, 0)")
      .addGroupBy("ct.ten_mon_snapshot")
      .orderBy("tong_luot_dat", "DESC")
      .addOrderBy("ct.ten_mon_snapshot", "ASC")
      .limit(5)
      .getRawMany<{
        id_mon_an: string;
        ten_mon: string;
        hinh_anh: string | null;
        tong_luot_dat: string;
      }>();

    return rows.map((item, index) => ({
      stt: index + 1,
      id_mon_an: Number(item.id_mon_an),
      ten_mon: item.ten_mon,
      hinh_anh: item.hinh_anh,
      tong_luot_dat: Number(item.tong_luot_dat),
    }));
  }

  private async layYeuCauCanXuLy() {
    const [yeuCauNangCapTaiKhoan, yeuCauDangKyCuaHang] = await Promise.all([
      this.yeuCauNangCapRepo
        .createQueryBuilder("yc")
        .where("yc.trang_thai = :trangThai", { trangThai: "cho_duyet" })
        .andWhere("yc.loai_yeu_cau = :loaiYeuCau", {
          loaiYeuCau: "kiem_tien_noi_dung",
        })
        .getCount(),
      this.yeuCauNangCapRepo
        .createQueryBuilder("yc")
        .where("yc.trang_thai = :trangThai", { trangThai: "cho_duyet" })
        .andWhere("yc.loai_yeu_cau = :loaiYeuCau", {
          loaiYeuCau: "mo_cua_hang",
        })
        .getCount(),
    ]);

    return {
      yeu_cau_nang_cap_tai_khoan: yeuCauNangCapTaiKhoan,
      yeu_cau_dang_ky_cua_hang: yeuCauDangKyCuaHang,
      tong_so: yeuCauNangCapTaiKhoan + yeuCauDangKyCuaHang,
      duong_dan_xu_ly: "/admin/review",
    };
  }

  private async layHoatDongGanDay(range: DateRange, limit?: number) {
    const [
      hoatDongNguoiDung,
      hoatDongDonHang,
      hoatDongKhuyenMai,
      hoatDongYeuCau,
    ] = await Promise.all([
      this.nguoiDungRepo
        .createQueryBuilder("nd")
        .select("nd.id", "id")
        .addSelect("nd.ten_hien_thi", "ten_hien_thi")
        .addSelect("nd.ngay_tao", "thoi_gian")
        .where("nd.la_admin = :laAdmin", { laAdmin: false })
        .andWhere("nd.ngay_tao BETWEEN :tuNgay AND :denNgay", {
          tuNgay: range.tu_ngay,
          denNgay: range.den_ngay,
        })
        .orderBy("nd.ngay_tao", "DESC")
        .limit(limit ?? 200)
        .getRawMany<{ id: string; ten_hien_thi: string; thoi_gian: string }>(),
      this.donHangRepo
        .createQueryBuilder("dh")
        .leftJoin("dh.nguoi_mua", "nm")
        .select("dh.id", "id")
        .addSelect("dh.ma_don_hang", "ma_don_hang")
        .addSelect("dh.tong_thanh_toan", "tong_thanh_toan")
        .addSelect("dh.thoi_gian_dat", "thoi_gian")
        .addSelect("nm.ten_hien_thi", "ten_hien_thi")
        .where("dh.thoi_gian_dat BETWEEN :tuNgay AND :denNgay", {
          tuNgay: range.tu_ngay,
          denNgay: range.den_ngay,
        })
        .orderBy("dh.thoi_gian_dat", "DESC")
        .limit(limit ?? 200)
        .getRawMany<{
          id: string;
          ma_don_hang: string;
          tong_thanh_toan: string;
          thoi_gian: string;
          ten_hien_thi: string;
        }>(),
      this.khuyenMaiRepo
        .createQueryBuilder("km")
        .innerJoin(CuaHangEntity, "ch", "ch.id = km.id_cua_hang")
        .select("km.id", "id")
        .addSelect("km.ma_khuyen_mai", "ma_khuyen_mai")
        .addSelect("km.ngay_tao", "thoi_gian")
        .addSelect("ch.ten_cua_hang", "ten_cua_hang")
        .where("km.id_cua_hang IS NOT NULL")
        .andWhere("km.ngay_tao BETWEEN :tuNgay AND :denNgay", {
          tuNgay: range.tu_ngay,
          denNgay: range.den_ngay,
        })
        .orderBy("km.ngay_tao", "DESC")
        .limit(limit ?? 200)
        .getRawMany<{
          id: string;
          ma_khuyen_mai: string;
          thoi_gian: string;
          ten_cua_hang: string;
        }>(),
      this.yeuCauNangCapRepo
        .createQueryBuilder("yc")
        .leftJoin("yc.nguoi_gui", "nd")
        .select("yc.id", "id")
        .addSelect("yc.loai_yeu_cau", "loai_yeu_cau")
        .addSelect("yc.thoi_gian_gui", "thoi_gian")
        .addSelect("nd.ten_hien_thi", "ten_hien_thi")
        .where("yc.thoi_gian_gui BETWEEN :tuNgay AND :denNgay", {
          tuNgay: range.tu_ngay,
          denNgay: range.den_ngay,
        })
        .orderBy("yc.thoi_gian_gui", "DESC")
        .limit(limit ?? 200)
        .getRawMany<{
          id: string;
          loai_yeu_cau: string;
          thoi_gian: string;
          ten_hien_thi: string;
        }>(),
    ]);

    const merged: HoatDongItem[] = [
      ...hoatDongNguoiDung.map((item) => ({
        id: `nguoi-dung-${item.id}`,
        loai: "nguoi_dung" as const,
        ten_chu_the: item.ten_hien_thi,
        noi_dung: "Đăng ký tài khoản mới",
        thoi_gian: new Date(item.thoi_gian),
        href: "/admin/accounts",
      })),
      ...hoatDongDonHang.map((item) => ({
        id: `don-hang-${item.id}`,
        loai: "don_hang" as const,
        ten_chu_the: item.ten_hien_thi,
        noi_dung: `Đặt đơn #${item.ma_don_hang} - ${this.dinhDangTienTe(Number(item.tong_thanh_toan))}`,
        thoi_gian: new Date(item.thoi_gian),
        href: `/admin/orders/${item.ma_don_hang}`,
      })),
      ...hoatDongKhuyenMai.map((item) => ({
        id: `khuyen-mai-${item.id}`,
        loai: "khuyen_mai" as const,
        ten_chu_the: item.ten_cua_hang,
        noi_dung: `Tạo mã khuyến mãi ${item.ma_khuyen_mai}`,
        thoi_gian: new Date(item.thoi_gian),
        href: "/admin/promotions",
      })),
      ...hoatDongYeuCau.map((item) => ({
        id: `yeu-cau-${item.id}`,
        loai: "yeu_cau_nang_cap" as const,
        ten_chu_the: item.ten_hien_thi,
        noi_dung:
          item.loai_yeu_cau === "mo_cua_hang"
            ? "Gửi yêu cầu đăng ký cửa hàng"
            : "Gửi yêu cầu nâng cấp kiếm tiền nội dung",
        thoi_gian: new Date(item.thoi_gian),
        href: `/admin/review/${item.id}`,
      })),
    ];

    merged.sort((a, b) => b.thoi_gian.getTime() - a.thoi_gian.getTime());
    return typeof limit === "number" ? merged.slice(0, limit) : merged;
  }

  private mapHoatDong(item: HoatDongItem) {
    return {
      id: item.id,
      loai: item.loai,
      ten_chu_the: item.ten_chu_the,
      noi_dung: item.noi_dung,
      thoi_gian: item.thoi_gian,
      href: item.href,
    };
  }

  private xayDungKhoangThoiGian(query: ThongKeHeThongQueryDto): DateRange {
    const boLoc = (query.bo_loc_thoi_gian ||
      "today") as DateRange["bo_loc_thoi_gian"];
    const now = new Date();
    const denNgay = new Date(now);
    denNgay.setHours(23, 59, 59, 999);

    switch (boLoc) {
      case "today": {
        const tuNgay = new Date(now);
        tuNgay.setHours(0, 0, 0, 0);
        return {
          bo_loc_thoi_gian: "today",
          tu_ngay: tuNgay,
          den_ngay: denNgay,
        };
      }
      case "7days": {
        const tuNgay = new Date(now);
        tuNgay.setDate(now.getDate() - 6);
        tuNgay.setHours(0, 0, 0, 0);
        return {
          bo_loc_thoi_gian: "7days",
          tu_ngay: tuNgay,
          den_ngay: denNgay,
        };
      }
      case "30days": {
        const tuNgay = new Date(now);
        tuNgay.setDate(now.getDate() - 29);
        tuNgay.setHours(0, 0, 0, 0);
        return {
          bo_loc_thoi_gian: "30days",
          tu_ngay: tuNgay,
          den_ngay: denNgay,
        };
      }
      case "custom": {
        if (!query.tu_ngay || !query.den_ngay) {
          throw new BadRequestException("Can nhap day du tu ngay va den ngay");
        }

        const tuNgay = new Date(query.tu_ngay);
        const denNgayCustom = new Date(query.den_ngay);
        if (
          Number.isNaN(tuNgay.getTime()) ||
          Number.isNaN(denNgayCustom.getTime())
        ) {
          throw new BadRequestException("Khoang thoi gian khong hop le");
        }

        tuNgay.setHours(0, 0, 0, 0);
        denNgayCustom.setHours(23, 59, 59, 999);
        if (denNgayCustom < tuNgay) {
          throw new BadRequestException(
            "Den ngay phai lon hon hoac bang tu ngay",
          );
        }

        return {
          bo_loc_thoi_gian: "custom",
          tu_ngay: tuNgay,
          den_ngay: denNgayCustom,
        };
      }
      default:
        throw new BadRequestException("Bo loc thoi gian khong hop le");
    }
  }

  private formatDateKey(value: Date) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(
      value.getDate(),
    ).padStart(2, "0")}`;
  }

  private formatDayLabel(value: Date) {
    return value.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  private dinhDangTienTe(value: number) {
    return `${value.toLocaleString("vi-VN")}đ`;
  }
}
