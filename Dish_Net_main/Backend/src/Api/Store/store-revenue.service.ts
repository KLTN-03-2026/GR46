import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { DonHangChiTietEntity } from '../Admin/entities/don-hang-chi-tiet.entity';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { StoreRevenueQueryDto } from './dto/store-revenue.dto';

type RevenueByDishRaw = {
  tenMon: string;
  doanhThu: string;
  soLuong: string;
};

@Injectable()
export class StoreRevenueService {
  constructor(
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(DonHangChiTietEntity)
    private readonly donHangChiTietRepo: Repository<DonHangChiTietEntity>,
  ) {}

  async layTongQuan(nguoiDungId: number) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const [thongKeTongQuan, bieuDo30Ngay, doanhThuTheoMonRaw] = await Promise.all([
      this.layThongKeTongQuan(cuaHang.id),
      this.layBieuDoDoanhThu30Ngay(cuaHang.id),
      this.layDoanhThuTheoMon(cuaHang.id),
    ]);

    const tongDoanhThuMon = doanhThuTheoMonRaw.reduce(
      (sum, item) => sum + Number(item.doanhThu ?? 0),
      0,
    );

    const bieuDoDoanhThuTheoMon = doanhThuTheoMonRaw.map((item) => {
      const doanhThu = Number(item.doanhThu ?? 0);
      return {
        ten_mon_an: item.tenMon,
        doanh_thu: doanhThu,
        ty_le: tongDoanhThuMon > 0 ? Math.round((doanhThu / tongDoanhThuMon) * 100) : 0,
      };
    });

    const topMonBanChay = doanhThuTheoMonRaw.slice(0, 5).map((item, index) => ({
      xep_hang: index + 1,
      ten_mon_an: item.tenMon,
      doanh_thu: Number(item.doanhThu ?? 0),
      so_luong_da_ban: Number(item.soLuong ?? 0),
    }));

    return {
      thong_ke_tong_quan: thongKeTongQuan,
      bieu_do_doanh_thu_30_ngay: bieuDo30Ngay,
      bieu_do_doanh_thu_theo_mon: bieuDoDoanhThuTheoMon,
      top_mon_ban_chay: topMonBanChay,
    };
  }

  async layDanhSachDonHang(nguoiDungId: number, query: StoreRevenueQueryDto) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const orderQb = this.donHangRepo
      .createQueryBuilder('dh')
      .leftJoinAndSelect('dh.nguoi_mua', 'nm')
      .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id });

    if (query.tim_kiem?.trim()) {
      const search = `%${query.tim_kiem.trim()}%`;
      orderQb.andWhere(
        '(dh.ma_don_hang LIKE :search OR nm.ten_hien_thi LIKE :search)',
        { search },
      );
    }

    const dbStatuses = this.mapBoLocTrangThai(query.trang_thai);
    if (dbStatuses.length > 0) {
      orderQb.andWhere('dh.trang_thai_don_hang IN (:...dbStatuses)', {
        dbStatuses,
      });
    }

    this.apDungBoLocThoiGian(orderQb, query, true, 'dh');

    orderQb
      .orderBy('dh.thoi_gian_dat', 'DESC')
      .addOrderBy('dh.id', 'DESC')
      .skip(skip)
      .take(soLuong);

    const [orders, tongSoDon] = await orderQb.getManyAndCount();

    return {
      du_lieu: orders.map((item) => ({
        id: Number(item.id),
        ma_don_hang: item.ma_don_hang,
        ten_khach_hang: item.nguoi_mua?.ten_hien_thi ?? 'Khách hàng',
        gia_tri_don_hang: Number(item.tong_thanh_toan),
        giam_gia: Number(item.tong_giam_gia),
        phi_nen_tang: Number(item.hoa_hong_nen_tang),
        thoi_gian_dat: item.thoi_gian_dat,
        trang_thai_don_hang: this.mapDbStatusToDisplay(item.trang_thai_don_hang),
        trang_thai_db: item.trang_thai_don_hang,
        thu_nhap_tu_don_hang: this.tinhThuNhapThucNhanDon(item),
      })),
      tong_so: tongSoDon,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSoDon / soLuong),
    };
  }

  private async layThongKeTongQuan(idCuaHang: number) {
    const todayRange = this.taoKhoangHomNay();

    const [doanhThuHomNayRaw, doanhThuThucNhanRaw, tongDonRaw, donHuyHoanRaw] =
      await Promise.all([
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COALESCE(SUM(dh.tong_thanh_toan), 0)', 'doanhThu')
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
          .andWhere('dh.trang_thai_don_hang = :trangThai', { trangThai: 'da_giao' })
          .andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
            from: todayRange.tuNgay,
            to: todayRange.denNgay,
          })
          .getRawOne<{ doanhThu: string }>(),
        this.donHangRepo
          .createQueryBuilder('dh')
          .select(
            "COALESCE(SUM((dh.tam_tinh - dh.tong_giam_gia) - dh.hoa_hong_nen_tang), 0)",
            'doanhThuThucNhan',
          )
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
          .andWhere('dh.trang_thai_don_hang = :trangThai', { trangThai: 'da_giao' })
          .andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
            from: todayRange.tuNgay,
            to: todayRange.denNgay,
          })
          .getRawOne<{ doanhThuThucNhan: string }>(),
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COUNT(*)', 'tongDon')
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
          .getRawOne<{ tongDon: string }>(),
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COUNT(*)', 'donHuyHoan')
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
          .andWhere("dh.trang_thai_don_hang IN ('da_huy', 'tra_hang')")
          .getRawOne<{ donHuyHoan: string }>(),
      ]);

    const tongDon = Number(tongDonRaw?.tongDon ?? 0);
    const donHuyHoan = Number(donHuyHoanRaw?.donHuyHoan ?? 0);

    return {
      doanh_thu_hom_nay: Number(doanhThuHomNayRaw?.doanhThu ?? 0),
      doanh_thu_thuc_nhan: Number(doanhThuThucNhanRaw?.doanhThuThucNhan ?? 0),
      tong_so_don_hang: tongDon,
      ty_le_huy_hoan: tongDon > 0 ? Number(((donHuyHoan / tongDon) * 100).toFixed(1)) : 0,
    };
  }

  private async layBieuDoDoanhThu30Ngay(idCuaHang: number) {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - 29);
    from.setHours(0, 0, 0, 0);
    const to = new Date(now);
    to.setHours(23, 59, 59, 999);

    const rows = await this.donHangRepo
      .createQueryBuilder('dh')
      .select(
        "DATE_FORMAT(COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat), '%Y-%m-%d')",
        'ngay',
      )
      .addSelect('COALESCE(SUM(dh.tong_thanh_toan), 0)', 'doanhThu')
      .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
      .andWhere('dh.trang_thai_don_hang = :trangThai', { trangThai: 'da_giao' })
      .andWhere(
        'COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat) BETWEEN :from AND :to',
        { from, to },
      )
      .groupBy(
        "DATE_FORMAT(COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat), '%Y-%m-%d')",
      )
      .orderBy(
        "DATE_FORMAT(COALESCE(dh.thoi_gian_hoan_tat, dh.thoi_gian_dat), '%Y-%m-%d')",
        'ASC',
      )
      .getRawMany<{ ngay: string; doanhThu: string }>();

    const byDate = new Map(rows.map((item) => [item.ngay, Number(item.doanhThu)]));
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

  private async layDoanhThuTheoMon(idCuaHang: number) {
    return this.donHangChiTietRepo
      .createQueryBuilder('ct')
      .innerJoin(DonHangEntity, 'dh', 'dh.id = ct.id_don_hang')
      .select('ct.ten_mon_snapshot', 'tenMon')
      .addSelect('COALESCE(SUM(ct.thanh_tien), 0)', 'doanhThu')
      .addSelect('COALESCE(SUM(ct.so_luong), 0)', 'soLuong')
      .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
      .andWhere('dh.trang_thai_don_hang = :trangThai', { trangThai: 'da_giao' })
      .groupBy('ct.ten_mon_snapshot')
      .orderBy('doanhThu', 'DESC')
      .getRawMany<RevenueByDishRaw>();
  }

  private async layCuaHangCuaNguoiDung(
    nguoiDungId: number,
  ): Promise<CuaHangEntity> {
    const cuaHang = await this.cuaHangRepo.findOne({
      where: { id_chu_so_huu: nguoiDungId },
    });
    if (!cuaHang) {
      throw new ForbiddenException(
        'Bạn chưa được duyệt mở cửa hàng hoặc cửa hàng không tồn tại',
      );
    }
    return cuaHang;
  }

  private mapBoLocTrangThai(trangThai?: string): string[] {
    switch (trangThai) {
      case 'da_giao':
        return ['da_giao', 'da_hoan_tien'];
      case 'da_huy':
        return ['da_huy'];
      case 'dang_giao':
        return ['dang_giao'];
      case 'tra_hang':
        return ['tra_hang'];
      default:
        return [];
    }
  }

  private mapDbStatusToDisplay(status: string): string {
    switch (status) {
      case 'cho_xac_nhan':
        return 'Chờ xác nhận';
      case 'da_xac_nhan':
      case 'dang_chuan_bi':
        return 'Đang chuẩn bị';
      case 'dang_giao':
        return 'Đang giao hàng';
      case 'da_giao':
      case 'da_hoan_tien':
        return 'Đã giao';
      case 'da_huy':
        return 'Đã hủy';
      case 'tra_hang':
        return 'Trả hàng';
      default:
        return status;
    }
  }

  private tinhThuNhapThucNhanDon(don: DonHangEntity): number {
    if (['da_huy', 'tra_hang', 'da_hoan_tien'].includes(don.trang_thai_don_hang)) {
      return 0;
    }

    const giaTriDon = Number(don.tam_tinh ?? 0);
    const giamGia = Number(don.tong_giam_gia ?? 0);
    const phiNenTang = Number(don.hoa_hong_nen_tang ?? 0);

    const thuNhap = (giaTriDon - giamGia) - phiNenTang;
    return Number(thuNhap.toFixed(2));
  }

  private apDungBoLocThoiGian(
    qb: SelectQueryBuilder<ObjectLiteral>,
    query: StoreRevenueQueryDto,
    defaultToday = false,
    alias = 'dh',
  ) {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const boLoc = query.bo_loc_thoi_gian ?? (defaultToday ? 'today' : undefined);
    const field = `${alias}.thoi_gian_dat`;

    switch (boLoc) {
      case 'today':
        qb.andWhere(`${field} BETWEEN :from AND :to`, {
          from: todayStart,
          to: todayEnd,
        });
        break;
      case '7days': {
        const from = new Date(now);
        from.setDate(now.getDate() - 6);
        from.setHours(0, 0, 0, 0);
        qb.andWhere(`${field} BETWEEN :from AND :to`, {
          from,
          to: todayEnd,
        });
        break;
      }
      case '30days': {
        const from = new Date(now);
        from.setDate(now.getDate() - 29);
        from.setHours(0, 0, 0, 0);
        qb.andWhere(`${field} BETWEEN :from AND :to`, {
          from,
          to: todayEnd,
        });
        break;
      }
      case 'custom':
        if (query.tu_ngay && query.den_ngay) {
          const from = new Date(query.tu_ngay);
          const to = new Date(query.den_ngay);
          if (!Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime())) {
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            qb.andWhere(`${field} BETWEEN :from AND :to`, {
              from,
              to,
            });
          }
        }
        break;
      default:
        break;
    }
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
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(value.getDate()).padStart(2, '0')}`;
  }

  private formatDayLabel(value: Date) {
    return value.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    });
  }
}
