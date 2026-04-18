import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KhuyenMaiEntity } from '../Admin/entities/khuyen-mai.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import {
  CapNhatKhuyenMaiDto,
  DanhSachKhuyenMaiQueryDto,
  TaoKhuyenMaiDto,
} from './dto/store-promotion.dto';

type Actor = { id: number; email: string };

@Injectable()
export class StorePromotionService {
  constructor(
    @InjectRepository(KhuyenMaiEntity)
    private readonly khuyenMaiRepo: Repository<KhuyenMaiEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
  ) {}

  async layDanhSach(nguoiDungId: number, query: DanhSachKhuyenMaiQueryDto) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);
    await this.dongBoTrangThaiCuaHang(cuaHang.id);

    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 9;
    const skip = (trang - 1) * soLuong;

    const qb = this.khuyenMaiRepo
      .createQueryBuilder('km')
      .where('km.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .skip(skip)
      .take(soLuong);

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        '(km.ten_khuyen_mai LIKE :search OR km.ma_khuyen_mai LIKE :search)',
        { search: `%${query.tim_kiem.trim()}%` },
      );
    }

    if (query.trang_thai && query.trang_thai !== 'all') {
      const dbStatus = this.mapFilterStatusToDb(query.trang_thai);
      if (dbStatus) {
        qb.andWhere('km.trang_thai = :trangThai', { trangThai: dbStatus });
      }
    }

    if (query.loai_khuyen_mai && query.loai_khuyen_mai !== 'all') {
      qb.andWhere('km.loai_khuyen_mai = :loaiKhuyenMai', {
        loaiKhuyenMai: query.loai_khuyen_mai,
      });
    }

    this.apDungSapXep(qb, query.sap_xep);

    const [items, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ten_khuyen_mai: item.ten_khuyen_mai,
        ma_khuyen_mai: item.ma_khuyen_mai,
        loai_khuyen_mai: item.loai_khuyen_mai,
        gia_tri_khuyen_mai: Number(item.gia_tri_khuyen_mai),
        gia_tri_toi_da: item.gia_tri_toi_da ? Number(item.gia_tri_toi_da) : null,
        don_hang_toi_thieu: Number(item.don_hang_toi_thieu),
        so_luot_da_dung: Number(item.so_luot_da_dung),
        so_luot_toi_da:
          item.so_luot_toi_da === null ? null : Number(item.so_luot_toi_da),
        thoi_gian_bat_dau: item.thoi_gian_bat_dau,
        thoi_gian_ket_thuc: item.thoi_gian_ket_thuc,
        trang_thai: this.mapDbStatusToUi(item.trang_thai),
        trang_thai_db: item.trang_thai,
        mo_ta: item.mo_ta,
        ngay_tao: item.ngay_tao,
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async tao(nguoiDungId: number, payload: TaoKhuyenMaiDto) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);
    const normalized = this.chuanHoaDuLieu(payload);
    await this.kiemTraMaKhuyenMai(payload.ma_khuyen_mai);

    const entity = this.khuyenMaiRepo.create({
      id_cua_hang: cuaHang.id,
      pham_vi_ap_dung: 'cua_hang',
      ten_khuyen_mai: payload.ten_khuyen_mai.trim(),
      ma_khuyen_mai: normalized.maKhuyenMai,
      loai_khuyen_mai: normalized.loaiKhuyenMai,
      gia_tri_khuyen_mai: normalized.giaTriKhuyenMai,
      gia_tri_toi_da: normalized.giaTriToiDa,
      don_hang_toi_thieu: normalized.donHangToiThieu,
      so_luot_toi_da: normalized.soLuotToiDa,
      so_luot_da_dung: 0,
      thoi_gian_bat_dau: normalized.thoiGianBatDau,
      thoi_gian_ket_thuc: normalized.thoiGianKetThuc,
      trang_thai: this.xacDinhTrangThai(
        normalized.thoiGianBatDau,
        normalized.thoiGianKetThuc,
      ),
      mo_ta: payload.mo_ta?.trim() || null,
      ngay_tao: new Date(),
    });

    const saved = await this.khuyenMaiRepo.save(entity);

    return {
      message: 'Tạo khuyến mãi thành công',
      id: Number(saved.id),
    };
  }

  async capNhat(nguoiDungId: number, id: number, payload: CapNhatKhuyenMaiDto) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });

    if (!khuyenMai) {
      throw new NotFoundException('Khuyến mãi không tồn tại');
    }

    const normalized = this.chuanHoaDuLieu(payload);
    await this.kiemTraMaKhuyenMai(payload.ma_khuyen_mai, id);

    khuyenMai.ten_khuyen_mai = payload.ten_khuyen_mai.trim();
    khuyenMai.ma_khuyen_mai = normalized.maKhuyenMai;
    khuyenMai.loai_khuyen_mai = normalized.loaiKhuyenMai;
    khuyenMai.gia_tri_khuyen_mai = normalized.giaTriKhuyenMai;
    khuyenMai.gia_tri_toi_da = normalized.giaTriToiDa;
    khuyenMai.don_hang_toi_thieu = normalized.donHangToiThieu;
    khuyenMai.so_luot_toi_da = normalized.soLuotToiDa;
    khuyenMai.thoi_gian_bat_dau = normalized.thoiGianBatDau;
    khuyenMai.thoi_gian_ket_thuc = normalized.thoiGianKetThuc;
    khuyenMai.mo_ta = payload.mo_ta?.trim() || null;
    khuyenMai.trang_thai = this.xacDinhTrangThai(
      normalized.thoiGianBatDau,
      normalized.thoiGianKetThuc,
      khuyenMai.trang_thai === 'tam_dung',
    );

    await this.khuyenMaiRepo.save(khuyenMai);

    return { message: 'Cập nhật khuyến mãi thành công' };
  }

  async xoa(nguoiDungId: number, id: number) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });

    if (!khuyenMai) {
      throw new NotFoundException('Khuyến mãi không tồn tại');
    }

    await this.khuyenMaiRepo.delete(id);

    return { message: 'Xóa khuyến mãi thành công' };
  }

  async tamDung(nguoiDungId: number, id: number) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });

    if (!khuyenMai) {
      throw new NotFoundException('Khuyến mãi không tồn tại');
    }

    if (khuyenMai.thoi_gian_ket_thuc < new Date()) {
      throw new BadRequestException('Khuyến mãi đã kết thúc, không thể tạm dừng');
    }

    if (khuyenMai.so_luot_toi_da !== null && khuyenMai.so_luot_da_dung >= khuyenMai.so_luot_toi_da) {
      throw new BadRequestException('Khuyến mãi đã hết lượt sử dụng, không thể tạm dừng');
    }

    if (khuyenMai.trang_thai === 'tam_dung') {
      throw new BadRequestException('Khuyến mãi đã ở trạng thái tạm dừng');
    }

    if (khuyenMai.trang_thai !== 'dang_dien_ra' && khuyenMai.trang_thai !== 'sap_dien_ra') {
      throw new BadRequestException('Chỉ có thể tạm dừng khuyến mãi đang diễn ra hoặc sắp diễn ra');
    }

    khuyenMai.trang_thai = 'tam_dung';
    await this.khuyenMaiRepo.save(khuyenMai);

    return { message: 'Tạm dừng khuyến mãi thành công' };
  }

  async kichHoat(nguoiDungId: number, id: number) {
    const cuaHang = await this.layCuaHangCuaNguoiDung(nguoiDungId);

    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });

    if (!khuyenMai) {
      throw new NotFoundException('Khuyến mãi không tồn tại');
    }

    if (khuyenMai.trang_thai !== 'sap_dien_ra') {
      throw new BadRequestException('Chỉ có thể kích hoạt khuyến mãi ở trạng thái sắp diễn ra');
    }

    khuyenMai.trang_thai = 'dang_dien_ra';
    await this.khuyenMaiRepo.save(khuyenMai);

    return { message: 'Kích hoạt khuyến mãi thành công' };
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private async layCuaHangCuaNguoiDung(nguoiDungId: number): Promise<CuaHangEntity> {
    const cuaHang = await this.cuaHangRepo.findOne({
      where: { id_chu_so_huu: nguoiDungId },
    });

    if (!cuaHang) {
      throw new ForbiddenException('Không tìm thấy cửa hàng của người dùng này');
    }

    if (cuaHang.trang_thai_hoat_dong !== 'hoat_dong') {
      throw new ForbiddenException('Cửa hàng chưa được phê duyệt hoặc đang bị khóa');
    }

    return cuaHang;
  }

  private chuanHoaDuLieu(payload: TaoKhuyenMaiDto | CapNhatKhuyenMaiDto) {
    const loaiKhuyenMai = payload.loai_khuyen_mai.trim();
    const giaTriKhuyenMai = Number(payload.gia_tri_khuyen_mai);
    const giaTriToiDa =
      payload.gia_tri_toi_da !== undefined && payload.gia_tri_toi_da !== null
        ? Number(payload.gia_tri_toi_da)
        : null;
    const donHangToiThieu = Number(payload.don_hang_toi_thieu);
    const soLuotToiDa =
      payload.so_luot_toi_da !== undefined && payload.so_luot_toi_da !== null
        ? Number(payload.so_luot_toi_da)
        : null;
    const thoiGianBatDau = new Date(payload.thoi_gian_bat_dau);
    const thoiGianKetThuc = new Date(payload.thoi_gian_ket_thuc);
    const maKhuyenMai = payload.ma_khuyen_mai.trim().toUpperCase();

    if (!payload.ten_khuyen_mai.trim()) {
      throw new BadRequestException('Tên chương trình không được để trống');
    }

    if (!['phan_tram', 'so_tien', 'mien_phi_van_chuyen'].includes(loaiKhuyenMai)) {
      throw new BadRequestException('Loại khuyến mãi không hợp lệ');
    }

    if (!Number.isFinite(giaTriKhuyenMai) || giaTriKhuyenMai < 0) {
      throw new BadRequestException('Giá trị khuyến mãi không hợp lệ');
    }

    if (loaiKhuyenMai === 'phan_tram' && (giaTriKhuyenMai <= 0 || giaTriKhuyenMai > 100)) {
      throw new BadRequestException('Khuyến mãi phần trăm phải trong khoảng 1 – 100');
    }

    if (loaiKhuyenMai === 'so_tien' && giaTriKhuyenMai <= 0) {
      throw new BadRequestException('Khuyến mãi số tiền phải lớn hơn 0');
    }

    if (loaiKhuyenMai === 'mien_phi_van_chuyen' && giaTriKhuyenMai !== 0) {
      throw new BadRequestException('Miễn phí vận chuyển phải có giá trị bằng 0');
    }

    if (!Number.isFinite(donHangToiThieu) || donHangToiThieu < 0) {
      throw new BadRequestException('Đơn tối thiểu không hợp lệ');
    }

    if (
      Number.isNaN(thoiGianBatDau.getTime()) ||
      Number.isNaN(thoiGianKetThuc.getTime())
    ) {
      throw new BadRequestException('Thời gian không hợp lệ');
    }

    if (thoiGianKetThuc <= thoiGianBatDau) {
      throw new BadRequestException('Thời gian kết thúc phải lớn hơn thời gian bắt đầu');
    }

    return {
      maKhuyenMai,
      loaiKhuyenMai,
      giaTriKhuyenMai,
      giaTriToiDa,
      donHangToiThieu,
      soLuotToiDa,
      thoiGianBatDau,
      thoiGianKetThuc,
    };
  }

  private async kiemTraMaKhuyenMai(maKhuyenMai: string, excludeId?: number) {
    const existed = await this.khuyenMaiRepo.findOne({
      where: { ma_khuyen_mai: maKhuyenMai.trim().toUpperCase() },
    });

    if (existed && Number(existed.id) !== excludeId) {
      throw new BadRequestException('Mã khuyến mãi đã tồn tại trong hệ thống');
    }
  }

  private async dongBoTrangThaiCuaHang(cuaHangId: number) {
    const now = new Date();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: 'da_ket_thuc' })
      .where('id_cua_hang = :cuaHangId', { cuaHangId })
      .andWhere('thoi_gian_ket_thuc < :now', { now })
      .andWhere('trang_thai NOT IN (:...statuses)', {
        statuses: ['da_ket_thuc', 'tam_dung'],
      })
      .execute();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: 'sap_dien_ra' })
      .where('id_cua_hang = :cuaHangId', { cuaHangId })
      .andWhere('thoi_gian_bat_dau > :now', { now })
      .andWhere('thoi_gian_ket_thuc >= :now', { now })
      .andWhere('trang_thai NOT IN (:...statuses)', {
        statuses: ['sap_dien_ra', 'tam_dung'],
      })
      .execute();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: 'dang_dien_ra' })
      .where('id_cua_hang = :cuaHangId', { cuaHangId })
      .andWhere('thoi_gian_bat_dau <= :now', { now })
      .andWhere('thoi_gian_ket_thuc >= :now', { now })
      .andWhere('trang_thai NOT IN (:...statuses)', {
        statuses: ['dang_dien_ra', 'tam_dung'],
      })
      .execute();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: 'da_ket_thuc' })
      .where('id_cua_hang = :cuaHangId', { cuaHangId })
      .andWhere('so_luot_toi_da IS NOT NULL')
      .andWhere('so_luot_da_dung >= so_luot_toi_da')
      .andWhere('trang_thai NOT IN (:...statuses)', {
        statuses: ['da_ket_thuc', 'tam_dung'],
      })
      .execute();
  }

  private xacDinhTrangThai(batDau: Date, ketThuc: Date, dangTamDung = false) {
    const now = new Date();

    if (ketThuc < now) {
      return 'da_ket_thuc';
    }

    if (dangTamDung) {
      return 'tam_dung';
    }

    if (batDau > now) {
      return 'sap_dien_ra';
    }

    return 'dang_dien_ra';
  }

  private mapDbStatusToUi(dbStatus: string): string {
    switch (dbStatus) {
      case 'dang_dien_ra': return 'active';
      case 'sap_dien_ra': return 'upcoming';
      case 'tam_dung': return 'paused';
      case 'da_ket_thuc': return 'ended';
      default: return 'upcoming';
    }
  }

  private mapFilterStatusToDb(uiStatus: string): string | null {
    switch (uiStatus) {
      case 'active': return 'dang_dien_ra';
      case 'upcoming': return 'sap_dien_ra';
      case 'paused': return 'tam_dung';
      case 'ended': return 'da_ket_thuc';
      default: return null;
    }
  }

  private apDungSapXep(
    qb: ReturnType<Repository<KhuyenMaiEntity>['createQueryBuilder']>,
    sapXep?: string,
  ) {
    switch (sapXep) {
      case 'sap_het_han':
        qb.orderBy('km.thoi_gian_ket_thuc', 'ASC').addOrderBy('km.id', 'DESC');
        break;
      case 'hieu_qua_cao_nhat':
        qb.orderBy('km.so_luot_da_dung', 'DESC').addOrderBy('km.id', 'DESC');
        break;
      case 'giam_gia_cao_nhat':
        qb.orderBy('km.gia_tri_khuyen_mai', 'DESC').addOrderBy('km.id', 'DESC');
        break;
      case 'moi_nhat':
      default:
        qb.orderBy('km.ngay_tao', 'DESC').addOrderBy('km.id', 'DESC');
        break;
    }
  }
}
