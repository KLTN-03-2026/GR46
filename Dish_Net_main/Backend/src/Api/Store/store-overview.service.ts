import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { DonHangChiTietEntity } from '../Admin/entities/don-hang-chi-tiet.entity';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { TongQuanCuaHangQueryDto } from './dto/store-overview.dto';

type TopMonRaw = {
  idMonAn: string | null;
  tenMon: string;
  hinhAnh: string | null;
  soLuongDaBan: string;
};

type TrangThaiCountRaw = {
  trangThai: string;
  soLuong: string;
};

@Injectable()
export class StoreOverviewService {
  constructor(
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(DonHangChiTietEntity)
    private readonly donHangChiTietRepo: Repository<DonHangChiTietEntity>,
  ) {}

  async layTongQuan(nguoiDungId: number, query: TongQuanCuaHangQueryDto) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);
    const { start: homNayBatDau, end: homNayKetThuc } = this.layKhoangNgayHomNay();

    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const danhSachQb = this.donHangRepo
      .createQueryBuilder('dh')
      .leftJoinAndSelect('dh.nguoi_mua', 'nm')
      .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id });

    if (query.tim_kiem?.trim()) {
      const search = `%${query.tim_kiem.trim()}%`;
      danhSachQb.andWhere(
        '(dh.ma_don_hang LIKE :search OR nm.ten_hien_thi LIKE :search)',
        { search },
      );
    }

    const dbStatuses = this.mapBoLocTrangThai(query.trang_thai);
    if (dbStatuses.length > 0) {
      danhSachQb.andWhere('dh.trang_thai_don_hang IN (:...dbStatuses)', {
        dbStatuses,
      });
    }

    this.apDungBoLocThoiGian(danhSachQb, query, true);

    danhSachQb
      .orderBy('dh.thoi_gian_dat', query.sap_xep === 'cu_nhat' ? 'ASC' : 'DESC')
      .addOrderBy('dh.id', 'DESC')
      .skip(skip)
      .take(soLuong);

    const [danhSachDonHang, tongSoDonHang] = await danhSachQb.getManyAndCount();

    const [thongKeTrangThai, topMonBanChayRaw, tongThuNhapRaw, thongKeHomNayRaw] =
      await Promise.all([
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('dh.trang_thai_don_hang', 'trangThai')
          .addSelect('COUNT(*)', 'soLuong')
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
          .andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
            from: homNayBatDau,
            to: homNayKetThuc,
          })
          .groupBy('dh.trang_thai_don_hang')
          .getRawMany<TrangThaiCountRaw>(),
        this.donHangChiTietRepo
          .createQueryBuilder('ct')
          .innerJoin(DonHangEntity, 'dh', 'dh.id = ct.id_don_hang')
          .select('ct.id_mon_an', 'idMonAn')
          .addSelect('ct.ten_mon_snapshot', 'tenMon')
          .addSelect('MAX(ct.hinh_anh_snapshot)', 'hinhAnh')
          .addSelect('SUM(ct.so_luong)', 'soLuongDaBan')
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
          .andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
            from: homNayBatDau,
            to: homNayKetThuc,
          })
          .andWhere(
            'dh.trang_thai_don_hang IN (:...trangThaiBanDuocTinh)',
            {
              trangThaiBanDuocTinh: [
                'da_xac_nhan',
                'dang_chuan_bi',
                'dang_giao',
                'da_giao',
                'da_hoan_tien',
              ],
            },
          )
          .groupBy('ct.id_mon_an')
          .addGroupBy('ct.ten_mon_snapshot')
          .orderBy('soLuongDaBan', 'DESC')
          .limit(5)
          .getRawMany<TopMonRaw>(),
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COALESCE(SUM(dh.thu_nhap_cua_hang), 0)', 'tongThuNhap')
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
          .andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
            from: homNayBatDau,
            to: homNayKetThuc,
          })
          .andWhere('dh.trang_thai_don_hang = :trangThai', {
            trangThai: 'da_giao',
          })
          .getRawOne<{ tongThuNhap: string }>(),
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COUNT(*)', 'tongDonHang')
          .addSelect(
            "SUM(CASE WHEN dh.trang_thai_don_hang = 'da_huy' THEN 1 ELSE 0 END)",
            'donHuy',
          )
          .addSelect(
            "COALESCE(SUM(CASE WHEN dh.trang_thai_don_hang = 'da_giao' THEN dh.tong_thanh_toan ELSE 0 END), 0)",
            'doanhThu',
          )
          .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
          .andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
            from: homNayBatDau,
            to: homNayKetThuc,
          })
          .getRawOne<{ tongDonHang: string; donHuy: string; doanhThu: string }>(),
      ]);

    const demTrangThai = this.tinhDemTrangThai(thongKeTrangThai);
    const tongTrangThai =
      demTrangThai.da_giao +
      demTrangThai.da_huy +
      demTrangThai.dang_giao +
      demTrangThai.tra_hang;

    const tongThuNhapTrongNgay = Number(tongThuNhapRaw?.tongThuNhap ?? 0);

    return {
      thong_tin_cua_hang: {
        id: Number(cuaHang.id),
        ten_cua_hang: cuaHang.ten_cua_hang,
        anh_dai_dien: cuaHang.anh_dai_dien,
        dia_chi_kinh_doanh: cuaHang.dia_chi_kinh_doanh,
        gio_mo_cua: cuaHang.gio_mo_cua,
        gio_dong_cua: cuaHang.gio_dong_cua,
        trang_thai_hoat_dong: cuaHang.trang_thai_hoat_dong,
        diem_danh_gia: Number(cuaHang.diem_danh_gia ?? 0),
      },
      thong_ke_hom_nay: {
        tong_don_hang: Number(thongKeHomNayRaw?.tongDonHang ?? 0),
        don_huy: Number(thongKeHomNayRaw?.donHuy ?? 0),
        doanh_thu: Number(thongKeHomNayRaw?.doanhThu ?? 0),
        tong_thu_nhap: tongThuNhapTrongNgay,
      },
      thong_ke_trang_thai_don_hang: {
        tong_so_don: tongTrangThai,
        ty_le_hoan_thanh: this.tinhTyLe(demTrangThai.da_giao, tongTrangThai),
        ty_le_huy: this.tinhTyLe(demTrangThai.da_huy, tongTrangThai),
        ty_le_dang_giao: this.tinhTyLe(demTrangThai.dang_giao, tongTrangThai),
        ty_le_tra_hang: this.tinhTyLe(demTrangThai.tra_hang, tongTrangThai),
      },
      top_mon_ban_chay_trong_ngay: topMonBanChayRaw.map((item, index) => ({
        xep_hang: index + 1,
        id_mon_an: item.idMonAn ? Number(item.idMonAn) : null,
        ten_mon_an: item.tenMon,
        hinh_anh_mon_an: item.hinhAnh,
        so_luong_da_ban: Number(item.soLuongDaBan ?? 0),
      })),
      danh_sach_don_hang_trong_ngay: {
        du_lieu: danhSachDonHang.map((item) => ({
          id: Number(item.id),
          ma_don_hang: item.ma_don_hang,
          ten_khach_hang: item.nguoi_mua?.ten_hien_thi ?? 'Khách hàng',
          gia_tri_don_hang: Number(item.tong_thanh_toan),
          giam_gia: Number(item.tong_giam_gia),
          phi_nen_tang: Number(item.hoa_hong_nen_tang),
          thoi_gian_dat: item.thoi_gian_dat,
          trang_thai_don_hang: this.mapDbStatusToDisplay(item.trang_thai_don_hang),
          trang_thai_db: item.trang_thai_don_hang,
          thu_nhap_tu_don_hang: Number(item.thu_nhap_cua_hang),
        })),
        tong_so: tongSoDonHang,
        trang,
        so_luong: soLuong,
        tong_trang: Math.ceil(tongSoDonHang / soLuong),
      },
      tong_thu_nhap_trong_ngay: tongThuNhapTrongNgay,
    };
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

  private apDungBoLocThoiGian(
    qb: SelectQueryBuilder<DonHangEntity>,
    query: TongQuanCuaHangQueryDto,
    defaultToday = false,
  ) {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const boLoc = query.bo_loc_thoi_gian ?? (defaultToday ? 'today' : undefined);

    switch (boLoc) {
      case 'today':
        qb.andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
          from: todayStart,
          to: todayEnd,
        });
        break;
      case '7days': {
        const from = new Date(now);
        from.setDate(now.getDate() - 6);
        from.setHours(0, 0, 0, 0);
        qb.andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
          from,
          to: todayEnd,
        });
        break;
      }
      case '30days': {
        const from = new Date(now);
        from.setDate(now.getDate() - 29);
        from.setHours(0, 0, 0, 0);
        qb.andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
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
            qb.andWhere('dh.thoi_gian_dat BETWEEN :from AND :to', {
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

  private layKhoangNgayHomNay() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  private tinhDemTrangThai(thongKeTrangThai: TrangThaiCountRaw[]) {
    const counts: Record<string, number> = {
      da_giao: 0,
      da_huy: 0,
      dang_giao: 0,
      tra_hang: 0,
      da_hoan_tien: 0,
    };

    for (const item of thongKeTrangThai) {
      counts[item.trangThai] = Number(item.soLuong ?? 0);
    }

    return {
      da_giao: counts.da_giao + counts.da_hoan_tien,
      da_huy: counts.da_huy,
      dang_giao: counts.dang_giao,
      tra_hang: counts.tra_hang,
    };
  }

  private tinhTyLe(soLuong: number, tongSo: number): number {
    if (tongSo <= 0) return 0;
    return Number(((soLuong / tongSo) * 100).toFixed(1));
  }
}
