import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import { DanhSachDoanhThuDonHangQueryDto } from "./dto/admin-revenue.dto";
import { CuaHangEntity } from "./entities/cua-hang.entity";
import { DonHangEntity } from "./entities/don-hang.entity";

@Injectable()
export class AdminRevenueService {
  constructor(
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
  ) {}

  async layTongQuan() {
    const [
      tongQuan,
      bieuDoTheoNgay,
      bieuDoTheoNguon,
      topCuaHang,
      topNhaSangTao,
    ] = await Promise.all([
      this.layThongKeTongQuan(),
      this.layBieuDoDoanhThuTheoNgay(),
      this.layBieuDoDoanhThuTheoNguon(),
      this.layTopCuaHang(),
      this.layTopNhaSangTao(),
    ]);

    return {
      thong_ke_tong_quan: tongQuan,
      bieu_do_doanh_thu_theo_ngay: bieuDoTheoNgay,
      bieu_do_doanh_thu_theo_nguon: bieuDoTheoNguon,
      top_cua_hang: topCuaHang,
      top_nha_sang_tao: topNhaSangTao,
    };
  }

  async layDanhSachDonHang(query: DanhSachDoanhThuDonHangQueryDto) {
    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const qb = this.donHangRepo
      .createQueryBuilder("dh")
      .leftJoinAndSelect("dh.cua_hang", "ch")
      .leftJoinAndSelect("dh.nguoi_mua", "nm")
      .orderBy("dh.thoi_gian_dat", "DESC")
      .addOrderBy("dh.id", "DESC")
      .skip(skip)
      .take(soLuong);

    if (query.id_cua_hang) {
      qb.andWhere("dh.id_cua_hang = :idCuaHang", {
        idCuaHang: Number(query.id_cua_hang),
      });
    }

    if (query.trang_thai) {
      const trangThaiDb = this.mapFilterStatusToDb(query.trang_thai);
      if (trangThaiDb.length > 0) {
        qb.andWhere("dh.trang_thai_don_hang IN (:...trangThaiDb)", {
          trangThaiDb,
        });
      }
    }

    const [items, tongSo] = await qb.getManyAndCount();
    const storeOptions = await this.cuaHangRepo.find({
      order: { ten_cua_hang: "ASC" },
    });

    return {
      du_lieu: items.map((item) => ({
        ma_don_hang: item.ma_don_hang,
        cua_hang: item.cua_hang.ten_cua_hang,
        id_cua_hang: Number(item.id_cua_hang),
        khach_hang: item.nguoi_mua.ten_hien_thi,
        tong_tien_don: Number(item.tong_thanh_toan),
        trang_thai_don: this.mapDbStatusToDisplay(item.trang_thai_don_hang),
        thoi_gian_dat: item.thoi_gian_dat,
      })),
      cua_hang_options: storeOptions.map((store) => ({
        id: Number(store.id),
        ten_cua_hang: store.ten_cua_hang,
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.max(1, Math.ceil(tongSo / soLuong)),
    };
  }

  private async layThongKeTongQuan() {
    const todayRange = this.taoKhoangHomNay();
    const [tongDoanhThuRaw, doanhThuHomNayRaw, tongSoDonHang] =
      await Promise.all([
        this.tinhTongDoanhThu(),
        this.tinhTongDoanhThu(todayRange.tuNgay, todayRange.denNgay),
        this.donHangRepo.count(),
      ]);

    return {
      tong_doanh_thu_he_thong: tongDoanhThuRaw,
      doanh_thu_hom_nay: doanhThuHomNayRaw,
      tong_so_don_hang: tongSoDonHang,
    };
  }

  private async layBieuDoDoanhThuTheoNgay() {
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate() - 29);
    from.setHours(0, 0, 0, 0);
    const to = new Date(today);
    to.setHours(23, 59, 59, 999);

    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .select(
        "DATE_FORMAT(COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat), '%Y-%m-%d')",
        "ngay",
      )
      .addSelect("COALESCE(SUM(dh.tong_thanh_toan), 0)", "doanh_thu")
      .where("dh.trang_thai_don_hang = :trangThai", { trangThai: "da_giao" })
      .andWhere(
        "COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat) BETWEEN :tuNgay AND :denNgay",
        {
          tuNgay: from,
          denNgay: to,
        },
      )
      .groupBy(
        "DATE_FORMAT(COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat), '%Y-%m-%d')",
      )
      .orderBy(
        "DATE_FORMAT(COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat), '%Y-%m-%d')",
        "ASC",
      )
      .getRawMany<{ ngay: string; doanh_thu: string }>();

    const byDate = new Map(
      rows.map((item) => [item.ngay, Number(item.doanh_thu)]),
    );
    const data: Array<{
      ngay: string;
      nhan: string;
      doanh_thu: number;
    }> = [];

    for (
      const cursor = new Date(from);
      cursor <= to;
      cursor.setDate(cursor.getDate() + 1)
    ) {
      const ngay = this.formatDateKey(cursor);
      data.push({
        ngay,
        nhan: this.formatDayLabel(cursor),
        doanh_thu: byDate.get(ngay) ?? 0,
      });
    }

    return data;
  }

  private async layBieuDoDoanhThuTheoNguon() {
    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .select("dh.nguon_don_hang", "nguon_don_hang")
      .addSelect("COALESCE(SUM(dh.tong_thanh_toan), 0)", "doanh_thu")
      .where("dh.trang_thai_don_hang = :trangThai", { trangThai: "da_giao" })
      .groupBy("dh.nguon_don_hang")
      .getRawMany<{ nguon_don_hang: string; doanh_thu: string }>();

    const totals = {
      video_review: 0,
      tim_kiem_mon_an: 0,
      khuyen_mai: 0,
    };

    rows.forEach((item) => {
      const doanhThu = Number(item.doanh_thu);
      if (item.nguon_don_hang === "bai_viet") {
        totals.video_review += doanhThu;
      } else if (item.nguon_don_hang === "tim_kiem") {
        totals.tim_kiem_mon_an += doanhThu;
      } else if (item.nguon_don_hang === "khuyen_mai") {
        totals.khuyen_mai += doanhThu;
      }
    });

    const tong =
      totals.video_review + totals.tim_kiem_mon_an + totals.khuyen_mai;
    return [
      {
        key: "video_review",
        nhan: "Video review",
        doanh_thu: totals.video_review,
        ty_le: tong > 0 ? Math.round((totals.video_review / tong) * 100) : 0,
        mau: "#4DB6AC",
      },
      {
        key: "tim_kiem_mon_an",
        nhan: "Tìm kiếm món ăn",
        doanh_thu: totals.tim_kiem_mon_an,
        ty_le: tong > 0 ? Math.round((totals.tim_kiem_mon_an / tong) * 100) : 0,
        mau: "#29B6F6",
      },
      {
        key: "khuyen_mai",
        nhan: "Khuyến mãi",
        doanh_thu: totals.khuyen_mai,
        ty_le: tong > 0 ? Math.round((totals.khuyen_mai / tong) * 100) : 0,
        mau: "#FFCA28",
      },
    ];
  }

  private async layTopCuaHang() {
    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .innerJoin(CuaHangEntity, "ch", "ch.id = dh.id_cua_hang")
      .select("ch.id", "id")
      .addSelect("ch.ten_cua_hang", "ten_cua_hang")
      .addSelect("COUNT(dh.id)", "tong_don_hang")
      .addSelect("COALESCE(SUM(dh.tong_thanh_toan), 0)", "doanh_thu")
      .where("dh.trang_thai_don_hang = :trangThai", { trangThai: "da_giao" })
      .groupBy("ch.id")
      .addGroupBy("ch.ten_cua_hang")
      .orderBy("doanh_thu", "DESC")
      .addOrderBy("tong_don_hang", "DESC")
      .limit(5)
      .getRawMany<{
        id: string;
        ten_cua_hang: string;
        tong_don_hang: string;
        doanh_thu: string;
      }>();

    return rows.map((item, index) => ({
      stt: index + 1,
      id: Number(item.id),
      ten_cua_hang: item.ten_cua_hang,
      tong_don_hang: Number(item.tong_don_hang),
      doanh_thu: Number(item.doanh_thu),
    }));
  }

  private async layTopNhaSangTao() {
    const rows = await this.donHangRepo
      .createQueryBuilder("dh")
      .innerJoin(NguoiDungEntity, "nd", "nd.id = dh.id_nha_sang_tao_nguon")
      .select("nd.id", "id")
      .addSelect("nd.ten_hien_thi", "ten_hien_thi")
      .addSelect("COALESCE(SUM(dh.tong_thanh_toan), 0)", "doanh_thu_tao_ra")
      .where("dh.trang_thai_don_hang = :trangThai", { trangThai: "da_giao" })
      .andWhere("dh.id_nha_sang_tao_nguon IS NOT NULL")
      .groupBy("nd.id")
      .addGroupBy("nd.ten_hien_thi")
      .orderBy("doanh_thu_tao_ra", "DESC")
      .limit(5)
      .getRawMany<{
        id: string;
        ten_hien_thi: string;
        doanh_thu_tao_ra: string;
      }>();

    return rows.map((item, index) => ({
      stt: index + 1,
      id: Number(item.id),
      ten_hien_thi: item.ten_hien_thi,
      doanh_thu_tao_ra: Number(item.doanh_thu_tao_ra),
    }));
  }

  private async tinhTongDoanhThu(tuNgay?: Date, denNgay?: Date) {
    const qb = this.donHangRepo
      .createQueryBuilder("dh")
      .select("COALESCE(SUM(dh.tong_thanh_toan), 0)", "tong")
      .where("dh.trang_thai_don_hang = :trangThai", { trangThai: "da_giao" });

    if (tuNgay && denNgay) {
      qb.andWhere(
        "COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat) BETWEEN :tuNgay AND :denNgay",
        {
          tuNgay,
          denNgay,
        },
      );
    }

    const result = await qb.getRawOne<{ tong: string | number }>();
    return Number(result?.tong ?? 0);
  }

  private taoKhoangHomNay() {
    const now = new Date();
    const tuNgay = new Date(now);
    tuNgay.setHours(0, 0, 0, 0);
    const denNgay = new Date(now);
    denNgay.setHours(23, 59, 59, 999);
    return { tuNgay, denNgay };
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

  private mapDbStatusToDisplay(status: string) {
    switch (status) {
      case "cho_xac_nhan":
        return "Chờ xác nhận";
      case "da_xac_nhan":
      case "dang_chuan_bi":
        return "Đang chuẩn bị";
      case "dang_giao":
        return "Đang giao";
      case "da_giao":
      case "da_hoan_tien":
        return "Đã giao";
      case "da_huy":
        return "Đã hủy";
      case "tra_hang":
        return "Trả hàng";
      default:
        return status;
    }
  }

  private mapFilterStatusToDb(status: string) {
    switch (status) {
      case "cho_xac_nhan":
        return ["cho_xac_nhan"];
      case "dang_chuan_bi":
        return ["da_xac_nhan", "dang_chuan_bi"];
      case "dang_giao":
        return ["dang_giao"];
      case "da_giao":
        return ["da_giao", "da_hoan_tien"];
      case "da_huy":
        return ["da_huy"];
      case "tra_hang":
        return ["tra_hang"];
      default:
        return [];
    }
  }
}
