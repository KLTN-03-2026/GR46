import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, In, Repository } from "typeorm";
import { CuaHangEntity } from "./entities/cua-hang.entity";
import { DonHangChiTietEntity } from "./entities/don-hang-chi-tiet.entity";
import { DonHangEntity } from "./entities/don-hang.entity";
import { LichSuDonHangEntity } from "./entities/lich-su-don-hang.entity";
import { DanhSachDonHangQueryDto } from "./dto/admin-order.dto";

@Injectable()
export class AdminOrderService {
  constructor(
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(DonHangChiTietEntity)
    private readonly donHangChiTietRepo: Repository<DonHangChiTietEntity>,
    @InjectRepository(LichSuDonHangEntity)
    private readonly lichSuDonHangRepo: Repository<LichSuDonHangEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
  ) {}

  async layDanhSach(query: DanhSachDonHangQueryDto) {
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

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        "(dh.ma_don_hang LIKE :search OR nm.ten_hien_thi LIKE :search)",
        { search: `%${query.tim_kiem.trim()}%` },
      );
    }

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

    this.apDungBoLocThoiGian(qb, query);

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
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async layChiTiet(maDonHang: string) {
    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
      relations: {
        nguoi_mua: true,
        cua_hang: true,
      },
    });

    if (!donHang) {
      throw new NotFoundException("Don hang khong ton tai");
    }

    const [chiTiet, lichSu] = await Promise.all([
      this.donHangChiTietRepo.find({
        where: { id_don_hang: donHang.id },
        order: { id: "ASC" },
      }),
      this.lichSuDonHangRepo.find({
        where: { id_don_hang: donHang.id },
        relations: { nguoi_cap_nhat: true },
        order: { thoi_gian_cap_nhat: "ASC", id: "ASC" },
      }),
    ]);

    return {
      ma_don_hang: donHang.ma_don_hang,
      thong_tin_khach_hang: {
        ten_hien_thi: donHang.nguoi_mua.ten_hien_thi,
        email: donHang.nguoi_mua.email,
        so_dien_thoai: donHang.so_dien_thoai_nhan,
        nguoi_nhan: donHang.nguoi_nhan,
        dia_chi_giao: donHang.dia_chi_giao,
      },
      thong_tin_cua_hang: {
        ten_cua_hang: donHang.cua_hang.ten_cua_hang,
        dia_chi: donHang.cua_hang.dia_chi_kinh_doanh,
        trang_thai_hoat_dong: donHang.cua_hang.trang_thai_hoat_dong,
      },
      danh_sach_mon_an: chiTiet.map((item) => ({
        id: Number(item.id),
        ten_mon: item.ten_mon_snapshot,
        hinh_anh: item.hinh_anh_snapshot,
        don_gia: Number(item.don_gia),
        so_luong: Number(item.so_luong),
        thanh_tien: Number(item.thanh_tien),
        ghi_chu: item.ghi_chu,
      })),
      tong_tien_don_hang: {
        tam_tinh: Number(donHang.tam_tinh),
        phi_van_chuyen: Number(donHang.phi_van_chuyen),
        tong_giam_gia: Number(donHang.tong_giam_gia),
        tong_thanh_toan: Number(donHang.tong_thanh_toan),
      },
      trang_thai_don_hang: this.mapDbStatusToDisplay(
        donHang.trang_thai_don_hang,
      ),
      thoi_gian_dat_hang: donHang.thoi_gian_dat,
      lich_su_cap_nhat: lichSu.map((item) => ({
        id: Number(item.id),
        trang_thai_tu: item.trang_thai_tu
          ? this.mapDbStatusToDisplay(item.trang_thai_tu)
          : null,
        trang_thai_den: this.mapDbStatusToDisplay(item.trang_thai_den),
        noi_dung: item.noi_dung,
        nguoi_cap_nhat:
          item.nguoi_cap_nhat?.email ??
          item.nguoi_cap_nhat?.ten_hien_thi ??
          "Hệ thống",
        thoi_gian_cap_nhat: item.thoi_gian_cap_nhat,
      })),
    };
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

  private apDungBoLocThoiGian(
    qb: ReturnType<Repository<DonHangEntity>["createQueryBuilder"]>,
    query: DanhSachDonHangQueryDto,
  ) {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    switch (query.bo_loc_thoi_gian) {
      case "today":
        qb.andWhere("dh.thoi_gian_dat BETWEEN :from AND :to", {
          from: todayStart,
          to: todayEnd,
        });
        break;
      case "7days": {
        const from = new Date(now);
        from.setDate(now.getDate() - 6);
        from.setHours(0, 0, 0, 0);
        qb.andWhere("dh.thoi_gian_dat BETWEEN :from AND :to", {
          from,
          to: todayEnd,
        });
        break;
      }
      case "30days": {
        const from = new Date(now);
        from.setDate(now.getDate() - 29);
        from.setHours(0, 0, 0, 0);
        qb.andWhere("dh.thoi_gian_dat BETWEEN :from AND :to", {
          from,
          to: todayEnd,
        });
        break;
      }
      case "custom": {
        if (!query.tu_ngay || !query.den_ngay) {
          throw new BadRequestException("Can nhap day du tu ngay va den ngay");
        }

        const from = new Date(query.tu_ngay);
        const to = new Date(query.den_ngay);
        if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
          throw new BadRequestException("Khoang thoi gian khong hop le");
        }
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        if (to < from) {
          throw new BadRequestException(
            "Den ngay phai lon hon hoac bang tu ngay",
          );
        }

        qb.andWhere("dh.thoi_gian_dat BETWEEN :from AND :to", { from, to });
        break;
      }
      default:
        break;
    }
  }
}
