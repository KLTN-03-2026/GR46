import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { DonHangChiTietEntity } from '../Admin/entities/don-hang-chi-tiet.entity';
import { LichSuDonHangEntity } from '../Admin/entities/lich-su-don-hang.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { DanhGiaEntity } from './entities/danh-gia.entity';
import {
  DanhSachDonHangStoreQueryDto,
  GiaHanDonHangDto,
  HoanTienDto,
  TuChoiDonHangDto,
  TuChoiHoanTienDto,
  XacNhanDonHangDto,
} from './dto/store-order.dto';

@Injectable()
export class StoreOrderService {
  constructor(
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(DonHangChiTietEntity)
    private readonly donHangChiTietRepo: Repository<DonHangChiTietEntity>,
    @InjectRepository(LichSuDonHangEntity)
    private readonly lichSuDonHangRepo: Repository<LichSuDonHangEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(DanhGiaEntity)
    private readonly danhGiaRepo: Repository<DanhGiaEntity>,
  ) {}

  private mapDbStatusToDisplay(status: string): string {
    switch (status) {
      case 'cho_xac_nhan':
        return 'Chờ xác nhận';
      case 'da_xac_nhan':
      case 'dang_chuan_bi':
        return 'Đang chuẩn bị';
      case 'dang_giao':
        return 'Đang giao';
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

  private mapDisplayStatusToDb(status: string): string | null {
    switch (status) {
      case 'Chờ xác nhận':
        return 'cho_xac_nhan';
      case 'Đang chuẩn bị':
        return 'dang_chuan_bi';
      case 'Đang giao':
        return 'dang_giao';
      case 'Đã giao':
        return 'da_giao';
      case 'Đã hủy':
        return 'da_huy';
      case 'Trả hàng':
        return 'tra_hang';
      default:
        return null;
    }
  }

  private parseMinutes(thoiGian: string): number {
    const match = thoiGian.match(/^(\d+)\s*phut$/i);
    if (match) return parseInt(match[1], 10);
    const num = parseInt(thoiGian, 10);
    return isNaN(num) ? 0 : num;
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

  async layDanhSach(
    nguoiDungId: number,
    query: DanhSachDonHangStoreQueryDto,
  ) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const qb = this.donHangRepo
      .createQueryBuilder('dh')
      .leftJoinAndSelect('dh.nguoi_mua', 'nm')
      .where('dh.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .orderBy('dh.thoi_gian_dat', 'DESC')
      .addOrderBy('dh.id', 'DESC')
      .skip(skip)
      .take(soLuong);

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        '(dh.ma_don_hang LIKE :search OR nm.ten_hien_thi LIKE :search)',
        { search: `%${query.tim_kiem.trim()}%` },
      );
    }

    if (query.trang_thai) {
      const dbStatuses = this.mapFilterStatusToDb(query.trang_thai);
      if (dbStatuses.length > 0) {
        qb.andWhere('dh.trang_thai_don_hang IN (:...dbStatuses)', {
          dbStatuses,
        });
      }
    }

    this.apDungBoLocThoiGian(qb, query);

    const [items, tongSo] = await qb.getManyAndCount();

    const tabCounts = await this.tinhTabCounts(cuaHang.id);

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ma_don_hang: item.ma_don_hang,
        khach_hang: item.nguoi_mua?.ten_hien_thi ?? 'Khách hàng',
        anh_dai_dien_khach: item.nguoi_mua?.anh_dai_dien ?? null,
        so_dien_thoai_khach: item.nguoi_mua?.so_dien_thoai ?? '',
        dia_chi_giao: item.dia_chi_giao,
        tong_tien: Number(item.tong_thanh_toan),
        tam_tinh: Number(item.tam_tinh),
        phi_van_chuyen: Number(item.phi_van_chuyen),
        tong_giam_gia: Number(item.tong_giam_gia),
        phuong_thuc_thanh_toan: item.phuong_thuc_thanh_toan,
        trang_thai_don_hang: this.mapDbStatusToDisplay(item.trang_thai_don_hang),
        trang_thai_db: item.trang_thai_don_hang,
        thoi_gian_dat: item.thoi_gian_dat,
        thoi_gian_xac_nhan: item.thoi_gian_xac_nhan,
        thoi_gian_giao: item.thoi_gian_giao,
        thoi_gian_hoan_tat: item.thoi_gian_hoan_tat,
        thoi_gian_hoan_tien: item.thoi_gian_hoan_tat  // dùng chung cột thoi_gian_hoan_tat làm thời gian hoàn tiền / yêu cầu trả
          ? item.thoi_gian_hoan_tat
          : null,
        thoi_gian_huy: item.thoi_gian_huy,
        ly_do_huy: item.ly_do_huy,
        ly_do_tra_hang: item.ly_do_tra_hang,
        nguoi_huy: item.nguoi_huy,
      })),
      tab_counts: tabCounts,
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async layChiTiet(nguoiDungId: number, maDonHang: string) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
      relations: { nguoi_mua: true },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException('Bạn không có quyền xem đơn hàng này');
    }

    const [chiTiet, lichSu] = await Promise.all([
      this.donHangChiTietRepo.find({
        where: { id_don_hang: donHang.id },
        order: { id: 'ASC' },
      }),
      this.lichSuDonHangRepo.find({
        where: { id_don_hang: donHang.id },
        relations: { nguoi_cap_nhat: true },
        order: { thoi_gian_cap_nhat: 'ASC', id: 'ASC' },
      }),
    ]);

    // Lấy đánh giá của đơn hàng
    const danhGiaList = await this.danhGiaRepo.find({
      where: { id_don_hang: donHang.id },
      relations: { nguoi_danh_gia: true },
    });

    return {
      id: Number(donHang.id),
      ma_don_hang: donHang.ma_don_hang,
      thong_tin_khach_hang: {
        ten_hien_thi: donHang.nguoi_mua?.ten_hien_thi ?? 'Khách hàng',
        email: donHang.nguoi_mua?.email ?? '',
        so_dien_thoai: donHang.so_dien_thoai_nhan,
        nguoi_nhan: donHang.nguoi_nhan,
        dia_chi_giao: donHang.dia_chi_giao,
      },
      thong_tin_cua_hang: {
        ten_cua_hang: cuaHang.ten_cua_hang,
        dia_chi: cuaHang.dia_chi_kinh_doanh,
      },
      danh_sach_mon_an: chiTiet.map((item) => {
        let toppingList: { ten: string; gia: number; so_luong: number }[] = [];
        if (item.topping_snapshot) {
          try {
            toppingList = JSON.parse(item.topping_snapshot as string);
          } catch { toppingList = []; }
        }
        return {
          id: Number(item.id),
          id_mon_an: item.id_mon_an,
          ten_mon: item.ten_mon_snapshot,
          hinh_anh: item.hinh_anh_snapshot,
          don_gia: Number(item.don_gia),
          so_luong: Number(item.so_luong),
          thanh_tien: Number(item.thanh_tien),
          topping: toppingList,
          ghi_chu: item.ghi_chu,
        };
      }),
      tong_tien_don_hang: {
        tam_tinh: Number(donHang.tam_tinh),
        phi_van_chuyen: Number(donHang.phi_van_chuyen),
        tong_giam_gia: Number(donHang.tong_giam_gia),
        tong_thanh_toan: Number(donHang.tong_thanh_toan),
        thu_nhap_cua_hang: Number(donHang.thu_nhap_cua_hang),
        hoa_hong_nen_tang: Number(donHang.hoa_hong_nen_tang),
      },
      trang_thai_don_hang: this.mapDbStatusToDisplay(
        donHang.trang_thai_don_hang,
      ),
      trang_thai_db: donHang.trang_thai_don_hang,
      thoi_gian_dat: donHang.thoi_gian_dat,
      thoi_gian_xac_nhan: donHang.thoi_gian_xac_nhan,
      thoi_gian_giao: donHang.thoi_gian_giao,
      thoi_gian_hoan_tat: donHang.thoi_gian_hoan_tat,
      thoi_gian_huy: donHang.thoi_gian_huy,
      ly_do_huy: donHang.ly_do_huy,
      ly_do_tra_hang: donHang.ly_do_tra_hang,
      nguoi_huy: donHang.nguoi_huy,
      danh_gia: danhGiaList.map((dg) => ({
        id: Number(dg.id),
        ten_nguoi_danh_gia: dg.nguoi_danh_gia?.ten_hien_thi ?? 'Khách hàng',
        anh_nguoi_danh_gia: dg.nguoi_danh_gia?.anh_dai_dien ?? null,
        so_sao: Number(dg.so_sao),
        noi_dung: dg.noi_dung,
        an_danh: dg.an_danh,
        ngay_danh_gia: dg.ngay_tao,
      })),
      lich_su_cap_nhat: lichSu.map((item) => ({
        id: Number(item.id),
        trang_thai_tu: item.trang_thai_tu
          ? this.mapDbStatusToDisplay(item.trang_thai_tu)
          : null,
        trang_thai_den: this.mapDbStatusToDisplay(item.trang_thai_den),
        noi_dung: item.noi_dung,
        nguoi_cap_nhat: item.nguoi_cap_nhat?.ten_hien_thi ?? 'Hệ thống',
        thoi_gian_cap_nhat: item.thoi_gian_cap_nhat,
      })),
    };
  }

  async xacNhanDonHang(
    nguoiDungId: number,
    maDonHang: string,
    dto: XacNhanDonHangDto,
  ) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException('Bạn không có quyền xác nhận đơn hàng này');
    }

    if (donHang.trang_thai_don_hang !== 'cho_xac_nhan') {
      throw new BadRequestException(
        `Không thể xác nhận đơn hàng ở trạng thái "${this.mapDbStatusToDisplay(donHang.trang_thai_don_hang)}"`,
      );
    }

    const soPhut = this.parseMinutes(dto.thoi_gian_du_kien_chuan_bi);

    donHang.trang_thai_don_hang = 'dang_chuan_bi';
    donHang.thoi_gian_xac_nhan = new Date();

    await this.donHangRepo.save(donHang);

    await this.lichSuDonHangRepo.save({
      id_don_hang: donHang.id,
      trang_thai_tu: 'cho_xac_nhan',
      trang_thai_den: 'dang_chuan_bi',
      noi_dung: `Cửa hàng xác nhận đơn. Dự kiến chuẩn bị: ${soPhut} phút`,
      id_nguoi_cap_nhat: nguoiDungId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đơn hàng đã được xác nhận',
      trang_thai_moi: this.mapDbStatusToDisplay('dang_chuan_bi'),
      thoi_gian_du_kien_chuan_bi: soPhut,
    };
  }

  async tuChoiDonHang(
    nguoiDungId: number,
    maDonHang: string,
    dto: TuChoiDonHangDto,
  ) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException('Bạn không có quyền từ chối đơn hàng này');
    }

    if (donHang.trang_thai_don_hang !== 'cho_xac_nhan') {
      throw new BadRequestException(
        `Không thể từ chối đơn hàng ở trạng thái "${this.mapDbStatusToDisplay(donHang.trang_thai_don_hang)}"`,
      );
    }

    donHang.trang_thai_don_hang = 'da_huy';
    donHang.thoi_gian_huy = new Date();
    donHang.ly_do_huy = dto.ly_do;
    donHang.nguoi_huy = 'Chủ cửa hàng';

    await this.donHangRepo.save(donHang);

    await this.lichSuDonHangRepo.save({
      id_don_hang: donHang.id,
      trang_thai_tu: 'cho_xac_nhan',
      trang_thai_den: 'da_huy',
      noi_dung: `Chủ cửa hàng từ chối. Lý do: ${dto.ly_do}`,
      id_nguoi_cap_nhat: nguoiDungId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đơn hàng đã bị từ chối',
      trang_thai_moi: this.mapDbStatusToDisplay('da_huy'),
    };
  }

  async giaoDonHang(nguoiDungId: number, maDonHang: string) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException('Bạn không có quyền cập nhật đơn hàng này');
    }

    if (donHang.trang_thai_don_hang !== 'dang_chuan_bi') {
      throw new BadRequestException(
        `Không thể giao đơn hàng ở trạng thái "${this.mapDbStatusToDisplay(donHang.trang_thai_don_hang)}"`,
      );
    }

    donHang.trang_thai_don_hang = 'dang_giao';
    donHang.thoi_gian_giao = new Date();

    await this.donHangRepo.save(donHang);

    await this.lichSuDonHangRepo.save({
      id_don_hang: donHang.id,
      trang_thai_tu: 'dang_chuan_bi',
      trang_thai_den: 'dang_giao',
      noi_dung: 'Cửa hàng đã giao đơn cho đơn vị vận chuyển',
      id_nguoi_cap_nhat: nguoiDungId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đơn hàng đã được chuyển sang trạng thái đang giao',
      trang_thai_moi: this.mapDbStatusToDisplay('dang_giao'),
    };
  }

  async giaHanDonHang(
    nguoiDungId: number,
    maDonHang: string,
    dto: GiaHanDonHangDto,
  ) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException('Bạn không có quyền cập nhật đơn hàng này');
    }

    if (donHang.trang_thai_don_hang !== 'dang_chuan_bi') {
      throw new BadRequestException(
        `Chỉ có thể gia hạn đơn hàng đang ở trạng thái "Đang chuẩn bị"`,
      );
    }

    const soPhut = this.parseMinutes(dto.so_phut_gia_han);

    await this.lichSuDonHangRepo.save({
      id_don_hang: donHang.id,
      trang_thai_den: 'dang_chuan_bi',
      noi_dung: `Gia hạn thời gian chuẩn bị thêm ${soPhut} phút. Lý do: ${dto.so_phut_gia_han}`,
      id_nguoi_cap_nhat: nguoiDungId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: `Đã gia hạn thêm ${soPhut} phút`,
      so_phut_gia_han: soPhut,
    };
  }

  async duyetHoanTien(
    nguoiDungId: number,
    maDonHang: string,
    _dto: HoanTienDto,
  ) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException(
        'Bạn không có quyền xử lý đơn hàng này',
      );
    }

    if (donHang.trang_thai_don_hang !== 'tra_hang') {
      throw new BadRequestException(
        `Chỉ có thể duyệt hoàn tiền cho đơn hàng ở trạng thái "Trả hàng"`,
      );
    }

    donHang.trang_thai_don_hang = 'da_hoan_tien';
    donHang.thoi_gian_hoan_tat = new Date();

    await this.donHangRepo.save(donHang);

    await this.lichSuDonHangRepo.save({
      id_don_hang: donHang.id,
      trang_thai_den: 'da_hoan_tien',
      noi_dung: 'Chủ cửa hàng duyệt hoàn tiền cho khách hàng',
      id_nguoi_cap_nhat: nguoiDungId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đã duyệt hoàn tiền cho khách hàng',
      trang_thai_moi: 'Đã hoàn tiền',
      so_tien_hoan: Number(donHang.tong_thanh_toan),
      thoi_gian_hoan_tien: donHang.thoi_gian_hoan_tat,
    };
  }

  async tuChoiHoanTien(
    nguoiDungId: number,
    maDonHang: string,
    dto: TuChoiHoanTienDto,
  ) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const donHang = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang },
    });

    if (!donHang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (donHang.id_cua_hang !== cuaHang.id) {
      throw new ForbiddenException(
        'Bạn không có quyền xử lý đơn hàng này',
      );
    }

    if (donHang.trang_thai_don_hang !== 'tra_hang') {
      throw new BadRequestException(
        `Chỉ có thể từ chối hoàn tiền cho đơn hàng ở trạng thái "Trả hàng"`,
      );
    }

    donHang.ly_do_tra_hang = `Từ chối: ${dto.ly_do_tu_choi}`;

    await this.donHangRepo.save(donHang);

    await this.lichSuDonHangRepo.save({
      id_don_hang: donHang.id,
      trang_thai_den: 'tra_hang',
      noi_dung: `Chủ cửa hàng từ chối hoàn tiền. Lý do: ${dto.ly_do_tu_choi}`,
      id_nguoi_cap_nhat: nguoiDungId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đã từ chối yêu cầu hoàn tiền',
      trang_thai_moi: 'Từ chối hoàn tiền',
    };
  }

  private async tinhTabCounts(
    idCuaHang: number,
  ): Promise<Record<string, number>> {
    const results: { trangThai: string; count: string }[] =
      await this.donHangRepo
        .createQueryBuilder('dh')
        .select('dh.trang_thai_don_hang', 'trangThai')
        .addSelect('COUNT(*)', 'count')
        .where('dh.id_cua_hang = :idCuaHang', { idCuaHang })
        .groupBy('dh.trang_thai_don_hang')
        .getRawMany();

    const counts: Record<string, number> = {
      cho_xac_nhan: 0,
      dang_chuan_bi: 0,
      dang_giao: 0,
      da_giao: 0,
      da_huy: 0,
      tra_hang: 0,
    };

    results.forEach((r) => {
      counts[r.trangThai] = parseInt(r.count, 10);
    });

    return {
      cho_xac_nhan: counts['cho_xac_nhan'],
      dang_chuan_bi: counts['dang_chuan_bi'],
      dang_giao: counts['dang_giao'],
      da_giao: counts['da_giao'] + counts['da_hoan_tien'],
      da_huy: counts['da_huy'],
      tra_hang: counts['tra_hang'],
    };
  }

  private mapFilterStatusToDb(
    trangThai: string,
  ): string[] {
    switch (trangThai) {
      case 'cho_xac_nhan':
        return ['cho_xac_nhan'];
      case 'dang_chuan_bi':
        return ['da_xac_nhan', 'dang_chuan_bi'];
      case 'dang_giao':
        return ['dang_giao'];
      case 'da_giao':
        return ['da_giao', 'da_hoan_tien'];
      case 'da_huy':
        return ['da_huy'];
      case 'tra_hang':
        return ['tra_hang'];
      default:
        return [];
    }
  }

  private apDungBoLocThoiGian(
    qb: ReturnType<Repository<DonHangEntity>['createQueryBuilder']>,
    query: DanhSachDonHangStoreQueryDto,
  ) {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    switch (query.bo_loc_thoi_gian) {
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
}
