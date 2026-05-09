import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHmac } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { DonHangChiTietEntity } from '../Admin/entities/don-hang-chi-tiet.entity';
import { LichSuDonHangEntity } from '../Admin/entities/lich-su-don-hang.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { MonAnEntity } from '../Admin/entities/mon-an.entity';
import { KhuyenMaiEntity } from '../Admin/entities/khuyen-mai.entity';
import { TepDinhKemEntity } from '../Admin/entities/tep-dinh-kem.entity';
import { ThongBaoEntity } from '../Admin/entities/thong-bao.entity';
import { YeuCauHoTroEntity } from '../Admin/entities/yeu-cau-ho-tro.entity';
import { YeuCauNangCapEntity } from '../Admin/entities/yeu-cau-nang-cap.entity';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';
import { DanhGiaEntity } from '../Store/entities/danh-gia.entity';
import {
  CapNhatGioHangDto,
  DangKyKiemTienNoiDungDto,
  DangKyMoCuaHangDto,
  DanhGiaDonHangDto,
  DanhSachDonHangNguoiDungQueryDto,
  DanhSachHoTroQueryDto,
  DanhSachThongBaoQueryDto,
  DanhSachTinNhanQueryDto,
  DanhSachTroChuyenQueryDto,
  DatDonHangDto,
  GuiTinNhanDto,
  HuyDonHangDto,
  TaoHoTroDto,
  TaoYeuCauRutTienDto,
  ThemVaoGioHangDto,
  YeuCauHoanTienDto,
} from './dto/user-commerce.dto';
import { GioHangChiTietEntity } from './entities/gio-hang-chi-tiet.entity';
import { ThanhToanEntity } from './entities/thanh-toan.entity';
import { DonHangKhuyenMaiEntity } from './entities/don-hang-khuyen-mai.entity';
import { PhienThanhToanEntity } from './entities/phien-thanh-toan.entity';
import { CuocTroChuyenEntity } from './entities/cuoc-tro-chuyen.entity';
import { TinNhanEntity } from './entities/tin-nhan.entity';
import { QuanHeNguoiDungEntity } from './entities/quan-he-nguoi-dung.entity';
import { TaiKhoanRutTienEntity } from './entities/tai-khoan-rut-tien.entity';
import { YeuCauRutTienEntity } from './entities/yeu-cau-rut-tien.entity';

type StatusDonHang =
  | 'cho_xac_nhan'
  | 'da_xac_nhan'
  | 'dang_chuan_bi'
  | 'dang_giao'
  | 'da_giao'
  | 'da_huy'
  | 'tra_hang'
  | 'da_hoan_tien';

type TabDonHang =
  | 'placed'
  | 'purchased'
  | 'cancelled'
  | 'returned'
  | 'review';

type PhienThanhToanSnapshot = {
  nguoi_nhan: string;
  so_dien_thoai_nhan: string;
  dia_chi_giao: string;
  ghi_chu_tai_xe: string | null;
  phuong_thuc_thanh_toan: 'vnpay';
  tong_tien: {
    tam_tinh: number;
    phi_van_chuyen: number;
    giam_gia: number;
    tong_thanh_toan: number;
  };
  khuyen_mai: null | {
    id: number;
    ma_khuyen_mai: string;
    ten_khuyen_mai: string;
    loai_khuyen_mai: string;
  };
  groups: Array<{
    id_cua_hang: number;
    ten_cua_hang: string;
    phi_van_chuyen: number;
    tam_tinh: number;
    items: Array<{
      id_gio_hang: number;
      id_mon_an: number;
      ten_mon: string;
      hinh_anh: string | null;
      so_luong: number;
      don_gia: number;
      thanh_tien: number;
      ghi_chu: string | null;
    }>;
  }>;
};

@Injectable()
export class UserCommerceService {
  private static readonly MAX_DISTINCT_CART_ITEMS = 50;
  private static readonly MAX_QUANTITY_PER_ITEM = 50;
  constructor(
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(DonHangChiTietEntity)
    private readonly donHangChiTietRepo: Repository<DonHangChiTietEntity>,
    @InjectRepository(LichSuDonHangEntity)
    private readonly lichSuDonHangRepo: Repository<LichSuDonHangEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(MonAnEntity)
    private readonly monAnRepo: Repository<MonAnEntity>,
    @InjectRepository(KhuyenMaiEntity)
    private readonly khuyenMaiRepo: Repository<KhuyenMaiEntity>,
    @InjectRepository(TepDinhKemEntity)
    private readonly tepRepo: Repository<TepDinhKemEntity>,
    @InjectRepository(YeuCauHoTroEntity)
    private readonly yeuCauHoTroRepo: Repository<YeuCauHoTroEntity>,
    @InjectRepository(ThongBaoEntity)
    private readonly thongBaoRepo: Repository<ThongBaoEntity>,
    @InjectRepository(YeuCauNangCapEntity)
    private readonly yeuCauNangCapRepo: Repository<YeuCauNangCapEntity>,
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectRepository(DanhGiaEntity)
    private readonly danhGiaRepo: Repository<DanhGiaEntity>,
    @InjectRepository(GioHangChiTietEntity)
    private readonly gioHangRepo: Repository<GioHangChiTietEntity>,
    @InjectRepository(ThanhToanEntity)
    private readonly thanhToanRepo: Repository<ThanhToanEntity>,
    @InjectRepository(DonHangKhuyenMaiEntity)
    private readonly donHangKhuyenMaiRepo: Repository<DonHangKhuyenMaiEntity>,
    @InjectRepository(PhienThanhToanEntity)
    private readonly phienThanhToanRepo: Repository<PhienThanhToanEntity>,
    @InjectRepository(CuocTroChuyenEntity)
    private readonly cuocTroChuyenRepo: Repository<CuocTroChuyenEntity>,
    @InjectRepository(TinNhanEntity)
    private readonly tinNhanRepo: Repository<TinNhanEntity>,
    @InjectRepository(QuanHeNguoiDungEntity)
    private readonly quanHeNguoiDungRepo: Repository<QuanHeNguoiDungEntity>,
    @InjectRepository(TaiKhoanRutTienEntity)
    private readonly taiKhoanRutTienRepo: Repository<TaiKhoanRutTienEntity>,
    @InjectRepository(YeuCauRutTienEntity)
    private readonly yeuCauRutTienRepo: Repository<YeuCauRutTienEntity>,
  ) {}

  private parsePaging(trang?: number, soLuong?: number) {
    const currentPage = Math.max(Number(trang) || 1, 1);
    const pageSize = Math.min(Math.max(Number(soLuong) || 10, 1), 100);
    const skip = (currentPage - 1) * pageSize;
    return { currentPage, pageSize, skip };
  }

  private taoMa(prefix: string) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const i = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const r = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `${prefix}${y}${m}${d}${h}${i}${s}${r}`;
  }

  private layCauHinhVnpay() {
    const tmnCode = process.env.VNPAY_TMN_CODE?.trim() ?? '';
    const hashSecret = process.env.VNPAY_HASH_SECRET?.trim() ?? '';
    const baseUrl =
      process.env.VNPAY_PAYMENT_URL?.trim() ||
      process.env.VNPAY_URL?.trim() ||
      'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const frontendUrl = process.env.FRONTEND_URL?.trim() || 'http://localhost:3000';
    const returnUrl =
      process.env.VNPAY_RETURN_URL?.trim() ||
      `${frontendUrl.replace(/\/$/, '')}/checkout`;

    return { tmnCode, hashSecret, baseUrl, returnUrl };
  }

  // VNPAY expects query style where spaces are encoded as "+".
  private maHoaThamSoVnpay(value: string) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  }

  private taoChuoiTruyVanVnpay(params: Record<string, string>) {
    const sortedKeys = Object.keys(params).sort();
    return sortedKeys
      .map((key) => {
        const encodedKey = this.maHoaThamSoVnpay(key);
        const encodedValue = this.maHoaThamSoVnpay(String(params[key] ?? ''));
        return `${encodedKey}=${encodedValue}`;
      })
      .join('&');
  }

  private dinhDangThoiGianVnpay(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const i = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}${m}${d}${h}${i}${s}`;
  }

  private parseThoiGianVnpay(value?: string) {
    if (!value || !/^\d{14}$/.test(value)) {
      return null;
    }
    const y = Number(value.slice(0, 4));
    const m = Number(value.slice(4, 6)) - 1;
    const d = Number(value.slice(6, 8));
    const h = Number(value.slice(8, 10));
    const i = Number(value.slice(10, 12));
    const s = Number(value.slice(12, 14));
    const parsed = new Date(y, m, d, h, i, s);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private taoChuKyVnpay(
    params: Record<string, string>,
    hashSecret: string,
  ) {
    const signData = this.taoChuoiTruyVanVnpay(params);
    return createHmac('sha512', hashSecret).update(signData).digest('hex');
  }

  private taoLinkThanhToanVnpay(input: {
    txnRef: string;
    amount: number;
    orderInfo: string;
    ipAddr: string;
  }) {
    const config = this.layCauHinhVnpay();
    if (!config.tmnCode || !config.hashSecret || !config.baseUrl) {
      throw new BadRequestException(
        'Cấu hình VNPAY chưa đầy đủ (VNPAY_TMN_CODE/VNPAY_HASH_SECRET/VNPAY_PAYMENT_URL)',
      );
    }

    const now = new Date();
    const expireAt = new Date(now.getTime() + 15 * 60 * 1000);
    const params: Record<string, string> = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: config.tmnCode,
      vnp_Amount: String(Math.round(input.amount * 100)),
      vnp_CurrCode: 'VND',
      vnp_TxnRef: input.txnRef,
      vnp_OrderInfo: input.orderInfo,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: config.returnUrl,
      vnp_IpAddr: input.ipAddr || '127.0.0.1',
      vnp_CreateDate: this.dinhDangThoiGianVnpay(now),
      vnp_ExpireDate: this.dinhDangThoiGianVnpay(expireAt),
    };

    params.vnp_SecureHash = this.taoChuKyVnpay(params, config.hashSecret);
    const search = this.taoChuoiTruyVanVnpay(params);
    return `${config.baseUrl}?${search}`;
  }

  private parseDuLieuPhienThanhToan(raw: unknown): PhienThanhToanSnapshot {
    if (!raw || typeof raw !== 'object') {
      throw new BadRequestException('Dữ liệu phiên thanh toán không hợp lệ');
    }
    const payload = raw as PhienThanhToanSnapshot;
    if (!Array.isArray(payload.groups) || payload.groups.length === 0) {
      throw new BadRequestException('Phiên thanh toán không có dữ liệu đơn hàng');
    }
    return payload;
  }

  private mapTrangThaiHoTro(trangThai: string) {
    return trangThai === 'da_phan_hoi' ? 'da_giai_quyet' : 'dang_xu_ly';
  }

  private mapTrangThaiDonHang(status: string) {
    switch (status) {
      case 'cho_xac_nhan':
        return 'Chờ xác nhận';
      case 'da_xac_nhan':
      case 'dang_chuan_bi':
        return 'Bếp đang chuẩn bị';
      case 'dang_giao':
        return 'Đang trên đường giao';
      case 'da_giao':
        return 'Đã giao đơn hàng';
      case 'da_hoan_tien':
        return 'Đã hoàn tiền';
      case 'da_huy':
        return 'Đã hủy';
      case 'tra_hang':
        return 'Trả hàng';
      default:
        return status;
    }
  }

  private mapTabToStatuses(tab: TabDonHang): StatusDonHang[] {
    switch (tab) {
      case 'placed':
        return ['cho_xac_nhan', 'da_xac_nhan', 'dang_chuan_bi', 'dang_giao'];
      case 'purchased':
        return ['da_giao'];
      case 'cancelled':
        return ['da_huy'];
      case 'returned':
        return ['tra_hang', 'da_hoan_tien'];
      case 'review':
        return ['da_giao'];
      default:
        return ['cho_xac_nhan'];
    }
  }

  private detectLoaiTep(url: string): string {
    const normalized = url.toLowerCase();
    if (
      normalized.endsWith('.png') ||
      normalized.endsWith('.jpg') ||
      normalized.endsWith('.jpeg') ||
      normalized.endsWith('.webp') ||
      normalized.endsWith('.gif')
    ) {
      return 'hinh_anh';
    }
    if (
      normalized.endsWith('.mp4') ||
      normalized.endsWith('.mov') ||
      normalized.endsWith('.avi') ||
      normalized.endsWith('.mkv')
    ) {
      return 'video';
    }
    if (normalized.endsWith('.pdf')) {
      return 'pdf';
    }
    return 'tep_khac';
  }

  private layPhanMoRongTep(url: string) {
    const normalized = url.split('?')[0].split('#')[0].toLowerCase();
    const parts = normalized.split('.');
    if (parts.length < 2) {
      return '';
    }
    return parts[parts.length - 1];
  }

  private kiemTraDanhSachTep(
    urls: string[],
    options: {
      tenTruong: string;
      danhSachDinhDangChoPhep: Set<string>;
    },
  ) {
    for (const url of urls) {
      const ext = this.layPhanMoRongTep(url);
      if (!options.danhSachDinhDangChoPhep.has(ext)) {
        throw new BadRequestException(
          `${options.tenTruong} có định dạng không hợp lệ: ${url}`,
        );
      }
    }
  }

  // ======================== PB14 - HỖ TRỢ ========================
  async taoYeuCauHoTro(userId: number, dto: TaoHoTroDto) {
    const user = await this.nguoiDungRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const record = await this.yeuCauHoTroRepo.save({
      ma_yeu_cau: this.taoMa('HT'),
      id_nguoi_gui: userId,
      chu_de: dto.chu_de.trim(),
      noi_dung_yeu_cau: `Thong tin lien he: ${dto.thong_tin_lien_he.trim()}\n\n${dto.noi_dung.trim()}`,
      trang_thai: 'chua_phan_hoi',
      id_admin_phan_hoi: null,
      noi_dung_phan_hoi: null,
      thoi_gian_gui: new Date(),
      thoi_gian_phan_hoi: null,
    });

    if (dto.tep_dinh_kem?.length) {
      this.kiemTraDanhSachTep(dto.tep_dinh_kem, {
        tenTruong: 'Tệp đính kèm',
        danhSachDinhDangChoPhep: new Set([
          'png',
          'jpg',
          'jpeg',
          'webp',
          'gif',
          'pdf',
          'doc',
          'docx',
          'xls',
          'xlsx',
          'txt',
        ]),
      });

      await this.tepRepo.save(
        dto.tep_dinh_kem.map((url, index) => ({
          loai_doi_tuong: 'yeu_cau_ho_tro',
          id_doi_tuong: Number(record.id),
          loai_tep: this.detectLoaiTep(url),
          duong_dan_tep: url,
          thu_tu_hien_thi: index + 1,
          ghi_chu: null,
          ngay_tao: new Date(),
        })),
      );
    }

    return {
      id: Number(record.id),
      ma_yeu_cau: record.ma_yeu_cau,
      trang_thai: this.mapTrangThaiHoTro(record.trang_thai),
      message: 'Gửi yêu cầu hỗ trợ thành công',
    };
  }

  async layDanhSachYeuCauHoTro(userId: number, query: DanhSachHoTroQueryDto) {
    const { currentPage, pageSize, skip } = this.parsePaging(query.trang, query.so_luong);
    const qb = this.yeuCauHoTroRepo
      .createQueryBuilder('yc')
      .where('yc.id_nguoi_gui = :userId', { userId })
      .orderBy('yc.thoi_gian_gui', 'DESC')
      .addOrderBy('yc.id', 'DESC')
      .skip(skip)
      .take(pageSize);

    if (query.tim_kiem?.trim()) {
      qb.andWhere('(yc.ma_yeu_cau LIKE :kw OR yc.chu_de LIKE :kw OR yc.noi_dung_yeu_cau LIKE :kw)', {
        kw: `%${query.tim_kiem.trim()}%`,
      });
    }

    if (query.trang_thai) {
      qb.andWhere('yc.trang_thai = :trangThai', {
        trangThai: query.trang_thai === 'da_giai_quyet' ? 'da_phan_hoi' : 'chua_phan_hoi',
      });
    }

    const [items, total] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ma_yeu_cau: item.ma_yeu_cau,
        chu_de: item.chu_de,
        noi_dung_tom_tat: item.noi_dung_yeu_cau.slice(0, 140),
        trang_thai: this.mapTrangThaiHoTro(item.trang_thai),
        thoi_gian_gui: item.thoi_gian_gui,
        thoi_gian_phan_hoi: item.thoi_gian_phan_hoi,
      })),
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  async layDanhSachThongBao(userId: number, query: DanhSachThongBaoQueryDto) {
    const { currentPage, pageSize, skip } = this.parsePaging(query.trang, query.so_luong);
    const chiChuaDoc =
      query.chi_chua_doc === '1' || query.chi_chua_doc === 'true';

    const qb = this.thongBaoRepo
      .createQueryBuilder('tb')
      .leftJoinAndSelect('tb.nguoi_nhan', 'nguoi_nhan')
      .where('tb.id_nguoi_nhan = :userId', { userId })
      .orderBy('tb.ngay_tao', 'DESC')
      .addOrderBy('tb.id', 'DESC')
      .skip(skip)
      .take(pageSize);

    if (query.chi_chua_doc != null) {
      qb.andWhere('tb.da_doc = :daDoc', { daDoc: chiChuaDoc ? 0 : 1 });
    }

    const [rows, total] = await qb.getManyAndCount();

    return {
      du_lieu: rows.map((item) => ({
        id: Number(item.id),
        loai_thong_bao: item.loai_thong_bao,
        loai_doi_tuong: item.loai_doi_tuong,
        id_doi_tuong: item.id_doi_tuong != null ? Number(item.id_doi_tuong) : null,
        tieu_de: item.tieu_de,
        noi_dung: item.noi_dung,
        da_doc: Boolean(item.da_doc),
        thoi_gian_doc: item.thoi_gian_doc,
        ngay_tao: item.ngay_tao,
        nguoi_nhan: item.nguoi_nhan
          ? {
              id: Number(item.nguoi_nhan.id),
              ten_hien_thi: item.nguoi_nhan.ten_hien_thi,
              anh_dai_dien: item.nguoi_nhan.anh_dai_dien,
            }
          : null,
      })),
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  async danhDauThongBaoDaDoc(userId: number, thongBaoId: number) {
    const thongBao = await this.thongBaoRepo.findOne({
      where: { id: thongBaoId, id_nguoi_nhan: userId },
    });

    if (!thongBao) {
      throw new NotFoundException('Thông báo không tồn tại');
    }

    if (!thongBao.da_doc) {
      thongBao.da_doc = true;
      thongBao.thoi_gian_doc = new Date();
      await this.thongBaoRepo.save(thongBao);
    }

    return {
      id: Number(thongBao.id),
      da_doc: true,
      thoi_gian_doc: thongBao.thoi_gian_doc,
    };
  }

  async layChiTietYeuCauHoTro(userId: number, id: number) {
    const yc = await this.yeuCauHoTroRepo.findOne({
      where: { id, id_nguoi_gui: userId },
      relations: { admin_phan_hoi: true },
    });

    if (!yc) {
      throw new NotFoundException('Yêu cầu hỗ trợ không tồn tại');
    }

    const files = await this.tepRepo.find({
      where: {
        loai_doi_tuong: 'yeu_cau_ho_tro',
        id_doi_tuong: id,
      },
      order: { thu_tu_hien_thi: 'ASC', id: 'ASC' },
    });

    return {
      id: Number(yc.id),
      ma_yeu_cau: yc.ma_yeu_cau,
      chu_de: yc.chu_de,
      noi_dung_yeu_cau: yc.noi_dung_yeu_cau,
      trang_thai: this.mapTrangThaiHoTro(yc.trang_thai),
      thoi_gian_gui: yc.thoi_gian_gui,
      thong_tin_phan_hoi:
        yc.trang_thai === 'da_phan_hoi'
          ? {
              noi_dung_phan_hoi: yc.noi_dung_phan_hoi,
              thoi_gian_phan_hoi: yc.thoi_gian_phan_hoi,
              admin_phan_hoi:
                yc.admin_phan_hoi?.ten_hien_thi ??
                yc.admin_phan_hoi?.email ??
                'Admin',
            }
          : null,
      tep_dinh_kem: files.map((item) => ({
        id: Number(item.id),
        loai_tep: item.loai_tep,
        url: item.duong_dan_tep,
        ghi_chu: item.ghi_chu,
      })),
    };
  }

  // ======================== PB15/PB16 - NÂNG CẤP ========================
  async layDanhSachYeuCauNangCap(userId: number) {
    const items = await this.yeuCauNangCapRepo.find({
      where: { id_nguoi_gui: userId },
      order: { thoi_gian_gui: 'DESC', id: 'DESC' },
    });

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        loai_yeu_cau: item.loai_yeu_cau,
        trang_thai: item.trang_thai,
        ten_cua_hang_de_xuat: item.ten_cua_hang_de_xuat,
        ten_kenh: item.ten_kenh,
        ly_do_yeu_cau: item.ly_do_yeu_cau,
        ly_do_tu_choi: item.ly_do_tu_choi,
        thoi_gian_gui: item.thoi_gian_gui,
        thoi_gian_xu_ly: item.thoi_gian_xu_ly,
      })),
    };
  }

  async taoYeuCauKiemTienNoiDung(userId: number, dto: DangKyKiemTienNoiDungDto) {
    const user = await this.nguoiDungRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if (user.la_nha_sang_tao) {
      throw new BadRequestException(
        'Tài khoản của bạn đã được phê duyệt kiếm tiền từ nội dung',
      );
    }

    const existingPending = await this.yeuCauNangCapRepo.count({
      where: {
        id_nguoi_gui: userId,
        loai_yeu_cau: 'kiem_tien_noi_dung',
        trang_thai: 'cho_duyet',
      },
    });
    if (existingPending > 0) {
      throw new BadRequestException('Bạn đã có yêu cầu kiếm tiền từ nội dung đang chờ duyệt');
    }

    const payload = {
      ten_tai_khoan: dto.ten_tai_khoan,
      gioi_tinh: dto.gioi_tinh ?? null,
      ngay_sinh: dto.ngay_sinh,
      ngan_hang: dto.ngan_hang,
      so_tai_khoan_ngan_hang: dto.so_tai_khoan_ngan_hang,
      email: dto.email,
      so_dien_thoai: dto.so_dien_thoai,
      dia_chi: dto.dia_chi,
      mo_ta: dto.mo_ta ?? null,
    };

    const request = await this.yeuCauNangCapRepo.save({
      id_nguoi_gui: userId,
      loai_yeu_cau: 'kiem_tien_noi_dung',
      trang_thai: 'cho_duyet',
      ly_do_yeu_cau: JSON.stringify(payload),
      so_cccd: null,
      ten_cua_hang_de_xuat: null,
      so_dien_thoai_lien_he: dto.so_dien_thoai,
      so_dien_thoai_chu_so_huu: null,
      dia_chi_chu_so_huu: null,
      dia_chi_kinh_doanh: dto.dia_chi,
      danh_muc_kinh_doanh: null,
      gio_mo_cua: null,
      gio_dong_cua: null,
      ten_kenh: dto.ten_tai_khoan,
      mo_ta_kenh: dto.mo_ta ?? null,
      tong_bai_dang: null,
      tong_nguoi_theo_doi: null,
      id_admin_xu_ly: null,
      ly_do_tu_choi: null,
      thoi_gian_gui: new Date(),
      thoi_gian_xu_ly: null,
    });

    if (user.trang_thai_kiem_tien_noi_dung !== 'da_duyet') {
      user.trang_thai_kiem_tien_noi_dung = 'cho_duyet';
      await this.nguoiDungRepo.save(user);
    }

    return {
      id: Number(request.id),
      loai_yeu_cau: request.loai_yeu_cau,
      trang_thai: request.trang_thai,
      thoi_gian_gui: request.thoi_gian_gui,
      message: 'Đã gửi đăng ký kiếm tiền từ nội dung',
    };
  }

  async taoYeuCauRutTien(userId: number, dto: TaoYeuCauRutTienDto) {
    const user = await this.nguoiDungRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if (!user.la_nha_sang_tao && user.trang_thai_kiem_tien_noi_dung !== 'da_duyet') {
      throw new ForbiddenException('Tài khoản chưa được phê duyệt kiếm tiền từ nội dung');
    }

    const soTienRut = Number(dto.so_tien || 0);
    if (!Number.isFinite(soTienRut) || soTienRut < 100000) {
      throw new BadRequestException('Số tiền rút tối thiểu phải từ 100.000 VNĐ.');
    }

    const taiKhoan = await this.taiKhoanRutTienRepo.findOne({
      where: {
        id: Number(dto.id_tai_khoan_rut_tien),
        id_nguoi_dung: userId,
        trang_thai: 'hieu_luc',
      },
    });
    if (!taiKhoan) {
      throw new BadRequestException('Tài khoản ngân hàng không hợp lệ');
    }

    const daHoanThanhRaw = await this.donHangRepo
      .createQueryBuilder('dh')
      .select('COALESCE(SUM(dh.hoa_hong_nha_sang_tao), 0)', 'total')
      .where('dh.id_nha_sang_tao_nguon = :userId', { userId })
      .andWhere('dh.trang_thai_don_hang = :status', { status: 'da_giao' })
      .getRawOne<{ total: string }>();
    const tongHoaHongDaGhiNhan = Number(daHoanThanhRaw?.total ?? 0);

    const rutTienRows = await this.yeuCauRutTienRepo.find({
      where: { id_nguoi_dung: userId },
    });
    const dangXuLy = rutTienRows
      .filter((row) => row.trang_thai === 'dang_xu_ly')
      .reduce((sum, row) => sum + Number(row.so_tien), 0);
    const daRutThanhCong = rutTienRows
      .filter((row) => row.trang_thai === 'da_hoan_thanh')
      .reduce((sum, row) => sum + Number(row.so_tien), 0);
    const soDuKhaDung = Math.max(0, tongHoaHongDaGhiNhan - dangXuLy - daRutThanhCong);

    if (soTienRut > soDuKhaDung) {
      throw new BadRequestException('Số dư không đủ');
    }

    const record = await this.yeuCauRutTienRepo.save({
      ma_yeu_cau: this.taoMa('RT'),
      id_nguoi_dung: userId,
      id_tai_khoan_rut_tien: Number(taiKhoan.id),
      so_tien: soTienRut,
      trang_thai: 'dang_xu_ly',
      ly_do_tu_choi: null,
      id_admin_xu_ly: null,
      thoi_gian_yeu_cau: new Date(),
      thoi_gian_xu_ly: null,
    });

    return {
      id: Number(record.id),
      ma_yeu_cau: record.ma_yeu_cau,
      trang_thai: record.trang_thai,
      so_tien: Number(record.so_tien),
      thoi_gian_yeu_cau: record.thoi_gian_yeu_cau,
      message: 'Đã gửi yêu cầu rút tiền. Yêu cầu đang được xử lý.',
    };
  }

  async taoYeuCauMoCuaHang(userId: number, dto: DangKyMoCuaHangDto) {
    if (!dto.dong_y_dieu_khoan) {
      throw new BadRequestException('Bạn phải đồng ý điều khoản trước khi gửi yêu cầu mở cửa hàng');
    }

    const user = await this.nguoiDungRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if (user.la_chu_cua_hang) {
      throw new BadRequestException('Tài khoản của bạn đã được phê duyệt mở cửa hàng');
    }

    const existingPending = await this.yeuCauNangCapRepo.count({
      where: {
        id_nguoi_gui: userId,
        loai_yeu_cau: 'mo_cua_hang',
        trang_thai: 'cho_duyet',
      },
    });
    if (existingPending > 0) {
      throw new BadRequestException('Bạn đã có yêu cầu mở cửa hàng đang chờ duyệt');
    }

    this.kiemTraDanhSachTep(dto.anh_cccd, {
      tenTruong: 'Ảnh CCCD',
      danhSachDinhDangChoPhep: new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']),
    });
    this.kiemTraDanhSachTep(dto.anh_menu, {
      tenTruong: 'Ảnh menu/món ăn',
      danhSachDinhDangChoPhep: new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']),
    });
    this.kiemTraDanhSachTep(dto.minh_chung_thanh_toan, {
      tenTruong: 'Ảnh minh chứng thanh toán',
      danhSachDinhDangChoPhep: new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']),
    });

    const request = await this.yeuCauNangCapRepo.save({
      id_nguoi_gui: userId,
      loai_yeu_cau: 'mo_cua_hang',
      trang_thai: 'cho_duyet',
      ly_do_yeu_cau: `Chu so huu: ${dto.chu_so_huu}`,
      so_cccd: dto.so_cccd,
      ten_cua_hang_de_xuat: dto.ten_cua_hang,
      so_dien_thoai_lien_he: dto.so_dien_thoai_lien_he,
      so_dien_thoai_chu_so_huu: dto.so_dien_thoai,
      dia_chi_chu_so_huu: dto.dia_chi,
      dia_chi_kinh_doanh: dto.dia_chi_kinh_doanh,
      danh_muc_kinh_doanh: dto.danh_muc_kinh_doanh,
      gio_mo_cua: dto.gio_mo_cua,
      gio_dong_cua: dto.gio_dong_cua,
      ten_kenh: null,
      mo_ta_kenh: null,
      tong_bai_dang: null,
      tong_nguoi_theo_doi: null,
      id_admin_xu_ly: null,
      ly_do_tu_choi: null,
      thoi_gian_gui: new Date(),
      thoi_gian_xu_ly: null,
    });

    const attachments = [
      ...dto.anh_cccd,
      ...dto.anh_menu,
      ...dto.minh_chung_thanh_toan,
    ];

    if (attachments.length > 0) {
      await this.tepRepo.save(
        attachments.map((url, index) => ({
          loai_doi_tuong: 'yeu_cau_nang_cap',
          id_doi_tuong: Number(request.id),
          loai_tep: this.detectLoaiTep(url),
          duong_dan_tep: url,
          thu_tu_hien_thi: index + 1,
          ghi_chu: null,
          ngay_tao: new Date(),
        })),
      );
    }

    return {
      id: Number(request.id),
      loai_yeu_cau: request.loai_yeu_cau,
      trang_thai: request.trang_thai,
      thoi_gian_gui: request.thoi_gian_gui,
      message: 'Đã gửi đăng ký mở cửa hàng',
    };
  }

  // ======================== PB17 - GIỎ HÀNG ========================
  private async layDanhSachMonTrongGio(userId: number) {
    return this.gioHangRepo
      .createQueryBuilder('gh')
      .leftJoin(MonAnEntity, 'ma', 'ma.id = gh.id_mon_an')
      .leftJoin(CuaHangEntity, 'ch', 'ch.id = gh.id_cua_hang')
      .select([
        'gh.id AS id',
        'gh.id_cua_hang AS id_cua_hang',
        'gh.id_mon_an AS id_mon_an',
        'gh.so_luong AS so_luong',
        'gh.ghi_chu AS ghi_chu',
        'gh.duoc_chon AS duoc_chon',
        'gh.gia_tai_thoi_diem_them AS gia_tai_thoi_diem_them',
        'gh.ngay_tao AS ngay_tao',
        'gh.ngay_cap_nhat AS ngay_cap_nhat',
        'ma.ten_mon AS ten_mon',
        'ma.hinh_anh_dai_dien AS hinh_anh',
        'ma.gia_ban AS gia_hien_tai',
        'ma.trang_thai_ban AS trang_thai_ban',
        'ch.ten_cua_hang AS ten_cua_hang',
      ])
      .where('gh.id_nguoi_dung = :userId', { userId })
      .orderBy('gh.id_cua_hang', 'ASC')
      .addOrderBy('gh.ngay_tao', 'DESC')
      .getRawMany<{
        id: string;
        id_cua_hang: string;
        id_mon_an: string;
        so_luong: string;
        ghi_chu: string | null;
        duoc_chon: string;
        gia_tai_thoi_diem_them: string;
        ngay_tao: Date;
        ngay_cap_nhat: Date;
        ten_mon: string | null;
        hinh_anh: string | null;
        gia_hien_tai: string | null;
        trang_thai_ban: string | null;
        ten_cua_hang: string | null;
      }>();
  }

  async layGioHang(userId: number) {
    const rows = await this.layDanhSachMonTrongGio(userId);

    const groupMap = new Map<
      number,
      {
        id_cua_hang: number;
        ten_cua_hang: string;
        items: Array<{
          id: number;
          id_mon_an: number;
          ten_mon: string;
          hinh_anh: string | null;
          so_luong: number;
          gia: number;
          thanh_tien: number;
          duoc_chon: boolean;
          ghi_chu: string | null;
          trang_thai_ban: string | null;
        }>;
      }
    >();

    let tongMonDaChon = 0;
    let tamTinh = 0;

    for (const row of rows) {
      const storeId = Number(row.id_cua_hang);
      const group = groupMap.get(storeId) ?? {
        id_cua_hang: storeId,
        ten_cua_hang: row.ten_cua_hang ?? 'Cửa hàng',
        items: [],
      };
      const gia = Number(row.gia_hien_tai ?? row.gia_tai_thoi_diem_them ?? 0);
      const soLuong = Number(row.so_luong);
      const thanhTien = gia * soLuong;
      const selected = Number(row.duoc_chon) === 1;
      if (selected) {
        tongMonDaChon += soLuong;
        tamTinh += thanhTien;
      }

      group.items.push({
        id: Number(row.id),
        id_mon_an: Number(row.id_mon_an),
        ten_mon: row.ten_mon ?? 'Món ăn đã xóa',
        hinh_anh: row.hinh_anh,
        so_luong: soLuong,
        gia,
        thanh_tien: thanhTien,
        duoc_chon: selected,
        ghi_chu: row.ghi_chu,
        trang_thai_ban: row.trang_thai_ban,
      });
      groupMap.set(storeId, group);
    }

    const phiVanChuyen = tongMonDaChon > 0 ? 31000 : 0;
    const tongThanhToan = tamTinh + phiVanChuyen;

    return {
      groups: [...groupMap.values()],
      tong_mon_da_chon: tongMonDaChon,
      tam_tinh: tamTinh,
      phi_van_chuyen: phiVanChuyen,
      tong_thanh_toan: tongThanhToan,
    };
  }

  async themVaoGioHang(userId: number, dto: ThemVaoGioHangDto) {
    const mon = await this.monAnRepo.findOne({ where: { id: dto.id_mon_an } });
    if (!mon) {
      throw new NotFoundException('Món ăn không tồn tại');
    }
    if (mon.trang_thai_ban !== 'dang_ban') {
      throw new BadRequestException('Món ăn hiện không khả dụng để thêm vào giỏ hàng');
    }

    const soLuongThem = Math.max(Number(dto.so_luong) || 1, 1);
    if (soLuongThem > UserCommerceService.MAX_QUANTITY_PER_ITEM) {
      throw new BadRequestException(
        `Mỗi món chỉ được tối đa ${UserCommerceService.MAX_QUANTITY_PER_ITEM} phần`,
      );
    }

    const existing = await this.gioHangRepo.findOne({
      where: {
        id_nguoi_dung: userId,
        id_cua_hang: Number(mon.id_cua_hang),
        id_mon_an: Number(mon.id),
      },
    });

    if (existing) {
      const soLuongMoi = Number(existing.so_luong) + soLuongThem;
      if (soLuongMoi > UserCommerceService.MAX_QUANTITY_PER_ITEM) {
        throw new BadRequestException(
          `Mỗi món chỉ được tối đa ${UserCommerceService.MAX_QUANTITY_PER_ITEM} phần`,
        );
      }
      existing.so_luong = soLuongMoi;
      if (dto.ghi_chu != null) {
        existing.ghi_chu = dto.ghi_chu.trim() || null;
      }
      existing.gia_tai_thoi_diem_them = Number(mon.gia_ban);
      await this.gioHangRepo.save(existing);
    } else {
      const distinctCount = await this.gioHangRepo.count({
        where: { id_nguoi_dung: userId },
      });
      if (distinctCount >= UserCommerceService.MAX_DISTINCT_CART_ITEMS) {
        throw new BadRequestException(
          `Giỏ hàng chỉ chứa tối đa ${UserCommerceService.MAX_DISTINCT_CART_ITEMS} món khác nhau`,
        );
      }
      await this.gioHangRepo.save({
        id_nguoi_dung: userId,
        id_cua_hang: Number(mon.id_cua_hang),
        id_mon_an: Number(mon.id),
        so_luong: soLuongThem,
        ghi_chu: dto.ghi_chu?.trim() || null,
        duoc_chon: true,
        gia_tai_thoi_diem_them: Number(mon.gia_ban),
        ngay_tao: new Date(),
        ngay_cap_nhat: new Date(),
      });
    }

    return this.layGioHang(userId);
  }

  async capNhatGioHangItem(userId: number, idItem: number, dto: CapNhatGioHangDto) {
    const item = await this.gioHangRepo.findOne({
      where: { id: idItem, id_nguoi_dung: userId },
    });
    if (!item) {
      throw new NotFoundException('Không tìm thấy món trong giỏ hàng');
    }

    if (dto.so_luong != null) {
      const soLuongMoi = Math.max(Number(dto.so_luong), 1);
      if (soLuongMoi > UserCommerceService.MAX_QUANTITY_PER_ITEM) {
        throw new BadRequestException(
          `Mỗi món chỉ được tối đa ${UserCommerceService.MAX_QUANTITY_PER_ITEM} phần`,
        );
      }
      item.so_luong = soLuongMoi;
    }
    if (dto.ghi_chu != null) {
      item.ghi_chu = dto.ghi_chu.trim() || null;
    }
    if (dto.duoc_chon != null) {
      item.duoc_chon = dto.duoc_chon;
    }

    await this.gioHangRepo.save(item);
    return this.layGioHang(userId);
  }

  async xoaItemGioHang(userId: number, idItem: number) {
    const result = await this.gioHangRepo.delete({ id: idItem, id_nguoi_dung: userId });
    if (!result.affected) {
      throw new NotFoundException('Không tìm thấy món trong giỏ hàng');
    }
    return this.layGioHang(userId);
  }

  async xoaTatCaGioHang(userId: number) {
    await this.gioHangRepo.delete({ id_nguoi_dung: userId });
    return this.layGioHang(userId);
  }

  private tinhKhuyenMai(
    khuyenMai: KhuyenMaiEntity,
    tongTien: number,
    phiVanChuyen: number,
  ) {
    const giaTri = Number(khuyenMai.gia_tri_khuyen_mai || 0);
    const toiDa =
      khuyenMai.gia_tri_toi_da != null ? Number(khuyenMai.gia_tri_toi_da) : null;

    if (khuyenMai.loai_khuyen_mai === 'mien_phi_van_chuyen') {
      return Math.min(phiVanChuyen, tongTien + phiVanChuyen);
    }

    if (khuyenMai.loai_khuyen_mai === 'so_tien') {
      return Math.min(giaTri, tongTien);
    }

    let value = (tongTien * giaTri) / 100;
    if (toiDa != null) {
      value = Math.min(value, toiDa);
    }
    return Math.min(value, tongTien);
  }

  private async layKhuyenMaiHopLe(maKhuyenMai?: string) {
    if (!maKhuyenMai?.trim()) {
      return null;
    }
    const now = new Date();
    const record = await this.khuyenMaiRepo.findOne({
      where: {
        ma_khuyen_mai: maKhuyenMai.trim(),
      },
    });
    if (!record) {
      throw new BadRequestException('Mã khuyến mãi không hợp lệ');
    }

    if (
      !(record.trang_thai === 'dang_dien_ra' || record.trang_thai === 'sap_dien_ra') ||
      record.thoi_gian_bat_dau > now ||
      record.thoi_gian_ket_thuc < now
    ) {
      throw new BadRequestException('Mã khuyến mãi đã hết hạn hoặc chưa được kích hoạt');
    }

    return record;
  }

  async layDanhSachKhuyenMaiThanhToan(userId: number) {
    let preview: Awaited<ReturnType<UserCommerceService['xemTruocThanhToan']>>;
    try {
      preview = await this.xemTruocThanhToan(userId);
    } catch (error) {
      if (
        error instanceof BadRequestException &&
        String(error.message).includes('Giỏ hàng không có món nào được chọn')
      ) {
        return { du_lieu: [] };
      }
      throw error;
    }

    const now = new Date();
    const records = await this.khuyenMaiRepo
      .createQueryBuilder('km')
      .where('km.trang_thai IN (:...statuses)', {
        statuses: ['dang_dien_ra', 'sap_dien_ra'],
      })
      .andWhere('km.thoi_gian_bat_dau <= :now', { now })
      .andWhere('km.thoi_gian_ket_thuc >= :now', { now })
      .orderBy('km.thoi_gian_ket_thuc', 'ASC')
      .addOrderBy('km.id', 'DESC')
      .getMany();

    const tongTamTinh = preview.tong_tien.tam_tinh;
    const tongPhiVanChuyen = preview.tong_tien.phi_van_chuyen;
    const tongCoPhi = tongTamTinh + tongPhiVanChuyen;

    const duLieu = records
      .filter((km) => {
        if (
          km.so_luot_toi_da != null &&
          Number(km.so_luot_da_dung ?? 0) >= Number(km.so_luot_toi_da)
        ) {
          return false;
        }
        if (tongCoPhi < Number(km.don_hang_toi_thieu ?? 0)) {
          return false;
        }
        if (km.pham_vi_ap_dung === 'cua_hang' && km.id_cua_hang != null) {
          return preview.groups.some(
            (g) => g.id_cua_hang === Number(km.id_cua_hang),
          );
        }
        return true;
      })
      .map((km) => {
        let giamGiaUocTinh = 0;
        if (km.pham_vi_ap_dung === 'cua_hang' && km.id_cua_hang != null) {
          const target = preview.groups.find(
            (g) => g.id_cua_hang === Number(km.id_cua_hang),
          );
          if (target) {
            giamGiaUocTinh = this.tinhKhuyenMai(
              km,
              target.tam_tinh,
              target.phi_van_chuyen,
            );
          }
        } else {
          giamGiaUocTinh = this.tinhKhuyenMai(km, tongTamTinh, tongPhiVanChuyen);
        }

        return {
          id: Number(km.id),
          ma_khuyen_mai: km.ma_khuyen_mai,
          ten_khuyen_mai: km.ten_khuyen_mai,
          loai_khuyen_mai: km.loai_khuyen_mai,
          mo_ta: km.mo_ta,
          pham_vi_ap_dung: km.pham_vi_ap_dung,
          don_hang_toi_thieu: Number(km.don_hang_toi_thieu ?? 0),
          giam_gia_uoc_tinh: giamGiaUocTinh,
          thoi_gian_ket_thuc: km.thoi_gian_ket_thuc,
        };
      })
      .sort((a, b) => b.giam_gia_uoc_tinh - a.giam_gia_uoc_tinh);

    return { du_lieu: duLieu };
  }

  async xemTruocThanhToan(userId: number, maKhuyenMai?: string) {
    const user = await this.nguoiDungRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const rows = await this.layDanhSachMonTrongGio(userId);
    const selectedRows = rows.filter((row) => Number(row.duoc_chon) === 1);

    if (selectedRows.length === 0) {
      throw new BadRequestException('Giỏ hàng không có món nào được chọn để thanh toán');
    }

    const khuyenMai = await this.layKhuyenMaiHopLe(maKhuyenMai);

    const grouped = new Map<
      number,
      {
        id_cua_hang: number;
        ten_cua_hang: string;
        phi_van_chuyen: number;
        items: Array<{
          id_gio_hang: number;
          id_mon_an: number;
          ten_mon: string;
          hinh_anh: string | null;
          so_luong: number;
          don_gia: number;
          thanh_tien: number;
          ghi_chu: string | null;
        }>;
      }
    >();

    const storeIds = [...new Set(selectedRows.map((row) => Number(row.id_cua_hang)))];
    const stores =
      storeIds.length > 0
        ? await this.cuaHangRepo.findBy(storeIds.map((id) => ({ id })))
        : [];
    const storeMap = new Map(stores.map((s) => [Number(s.id), s]));

    for (const row of selectedRows) {
      const storeId = Number(row.id_cua_hang);
      const store = storeMap.get(storeId);
      const current = grouped.get(storeId) ?? {
        id_cua_hang: storeId,
        ten_cua_hang: row.ten_cua_hang ?? store?.ten_cua_hang ?? 'Cửa hàng',
        phi_van_chuyen: Number(store?.phi_van_chuyen_mac_dinh ?? 31000),
        items: [],
      };
      const donGia = Number(row.gia_hien_tai ?? row.gia_tai_thoi_diem_them ?? 0);
      const soLuong = Number(row.so_luong);
      current.items.push({
        id_gio_hang: Number(row.id),
        id_mon_an: Number(row.id_mon_an),
        ten_mon: row.ten_mon ?? 'Món ăn',
        hinh_anh: row.hinh_anh,
        so_luong: soLuong,
        don_gia: donGia,
        thanh_tien: donGia * soLuong,
        ghi_chu: row.ghi_chu,
      });
      grouped.set(storeId, current);
    }

    let tamTinh = 0;
    let phiVanChuyen = 0;
    const groups = [...grouped.values()].map((group) => {
      const tongNhom = group.items.reduce((sum, item) => sum + item.thanh_tien, 0);
      tamTinh += tongNhom;
      phiVanChuyen += group.phi_van_chuyen;
      return {
        ...group,
        tam_tinh: tongNhom,
      };
    });

    let giamGia = 0;
    if (khuyenMai) {
      const tongCoPhi = tamTinh + phiVanChuyen;
      if (tongCoPhi < Number(khuyenMai.don_hang_toi_thieu || 0)) {
        throw new BadRequestException('Đơn hàng chưa đạt giá trị tối thiểu để áp dụng mã khuyến mãi');
      }

      if (khuyenMai.pham_vi_ap_dung === 'cua_hang' && khuyenMai.id_cua_hang != null) {
        const target = groups.find((g) => g.id_cua_hang === Number(khuyenMai.id_cua_hang));
        if (!target) {
          throw new BadRequestException('Mã khuyến mãi không áp dụng cho cửa hàng trong giỏ hàng hiện tại');
        }
        giamGia = this.tinhKhuyenMai(khuyenMai, target.tam_tinh, target.phi_van_chuyen);
      } else {
        giamGia = this.tinhKhuyenMai(khuyenMai, tamTinh, phiVanChuyen);
      }
    }

    return {
      thong_tin_giao_hang_mac_dinh: {
        nguoi_nhan: user.ten_hien_thi,
        so_dien_thoai_nhan: user.so_dien_thoai,
        dia_chi_giao: user.dia_chi,
      },
      groups,
      khuyen_mai:
        khuyenMai == null
          ? null
          : {
              id: Number(khuyenMai.id),
              ma_khuyen_mai: khuyenMai.ma_khuyen_mai,
              ten_khuyen_mai: khuyenMai.ten_khuyen_mai,
              loai_khuyen_mai: khuyenMai.loai_khuyen_mai,
            },
      tong_tien: {
        tam_tinh: tamTinh,
        phi_van_chuyen: phiVanChuyen,
        giam_gia: giamGia,
        tong_thanh_toan: tamTinh + phiVanChuyen - giamGia,
      },
    };
  }

  async datDonHang(userId: number, dto: DatDonHangDto, clientIp?: string | null) {
    if (!dto.nguoi_nhan.trim() || !dto.so_dien_thoai_nhan.trim() || !dto.dia_chi_giao.trim()) {
      throw new BadRequestException('Thiếu thông tin giao hàng bắt buộc');
    }

    const preview = await this.xemTruocThanhToan(userId, dto.ma_khuyen_mai);
    if (preview.groups.length === 0) {
      throw new BadRequestException('Không có dữ liệu đơn hàng để tạo');
    }

    const pendingSession = await this.phienThanhToanRepo.findOne({
      where: {
        id_nguoi_dung: userId,
        trang_thai: 'cho_thanh_toan',
      },
      order: { id: 'DESC' },
    });
    if (pendingSession) {
      const createdAt = pendingSession.ngay_tao?.getTime() ?? 0;
      const isRecent = Date.now() - createdAt <= 10 * 60 * 1000;
      if (isRecent) {
        const paymentUrl = this.taoLinkThanhToanVnpay({
          txnRef: pendingSession.ma_giao_dich,
          amount: Number(pendingSession.tong_tien),
          orderInfo: `Thanh toan don hang DishNet ${pendingSession.ma_giao_dich}`,
          ipAddr: (clientIp ?? '').replace('::ffff:', '') || '127.0.0.1',
        });
        return {
          message: 'Bạn đã có phiên thanh toán đang chờ xử lý',
          don_hang: [],
          tong_tien: preview.tong_tien,
          phuong_thuc_thanh_toan: 'vnpay',
          ma_giao_dich: pendingSession.ma_giao_dich,
          payment_url: paymentUrl,
        };
      }
    }

    const maGiaoDichVnpay = this.taoMa('VNP');
    const paymentUrl = this.taoLinkThanhToanVnpay({
      txnRef: maGiaoDichVnpay,
      amount: preview.tong_tien.tong_thanh_toan,
      orderInfo: `Thanh toan don hang DishNet ${maGiaoDichVnpay}`,
      ipAddr: (clientIp ?? '').replace('::ffff:', '') || '127.0.0.1',
    });

    const now = new Date();
    const snapshot: PhienThanhToanSnapshot = {
      nguoi_nhan: dto.nguoi_nhan.trim(),
      so_dien_thoai_nhan: dto.so_dien_thoai_nhan.trim(),
      dia_chi_giao: dto.dia_chi_giao.trim(),
      ghi_chu_tai_xe: dto.ghi_chu_tai_xe?.trim() || null,
      phuong_thuc_thanh_toan: 'vnpay',
      tong_tien: preview.tong_tien,
      khuyen_mai: preview.khuyen_mai,
      groups: preview.groups.map((group) => ({
        id_cua_hang: group.id_cua_hang,
        ten_cua_hang: group.ten_cua_hang,
        phi_van_chuyen: group.phi_van_chuyen,
        tam_tinh: group.tam_tinh,
        items: group.items.map((item) => ({
          id_gio_hang: item.id_gio_hang,
          id_mon_an: item.id_mon_an,
          ten_mon: item.ten_mon,
          hinh_anh: item.hinh_anh,
          so_luong: item.so_luong,
          don_gia: item.don_gia,
          thanh_tien: item.thanh_tien,
          ghi_chu: item.ghi_chu,
        })),
      })),
    };

    await this.phienThanhToanRepo.save({
      ma_giao_dich: maGiaoDichVnpay,
      id_nguoi_dung: userId,
      trang_thai: 'cho_thanh_toan',
      tong_tien: preview.tong_tien.tong_thanh_toan,
      du_lieu_don_hang: snapshot as unknown as Record<string, unknown>,
      ket_qua_don_hang: null,
      noi_dung_loi: null,
      ngay_tao: now,
      ngay_cap_nhat: now,
    });

    return {
      message: 'Đã tạo phiên thanh toán, vui lòng hoàn tất thanh toán VNPAY',
      don_hang: [],
      tong_tien: preview.tong_tien,
      phuong_thuc_thanh_toan: 'vnpay',
      ma_giao_dich: maGiaoDichVnpay,
      payment_url: paymentUrl,
    };
  }

  async xuLyCallbackVnpay(rawQuery: Record<string, unknown>) {
    const query = Object.entries(rawQuery).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = value.length > 0 ? String(value[0]) : '';
          return acc;
        }
        acc[key] = value == null ? '' : String(value);
        return acc;
      },
      {},
    );

    const txnRef = query.vnp_TxnRef?.trim();
    const secureHash = query.vnp_SecureHash?.trim();
    if (!txnRef || !secureHash) {
      throw new BadRequestException('Thiếu thông tin giao dịch VNPAY');
    }

    const { hashSecret } = this.layCauHinhVnpay();
    if (!hashSecret) {
      throw new BadRequestException('Thiếu cấu hình VNPAY_HASH_SECRET');
    }

    const verifyPayload = { ...query };
    delete verifyPayload.vnp_SecureHash;
    delete verifyPayload.vnp_SecureHashType;

    const expectedHash = this.taoChuKyVnpay(verifyPayload, hashSecret);
    if (secureHash.toLowerCase() !== expectedHash.toLowerCase()) {
      throw new BadRequestException('Chữ ký callback VNPAY không hợp lệ');
    }

    const session = await this.phienThanhToanRepo.findOne({
      where: { ma_giao_dich: txnRef },
      order: { id: 'DESC' },
    });
    if (!session) {
      throw new NotFoundException('Không tìm thấy phiên thanh toán VNPAY');
    }

    const responseCode = query.vnp_ResponseCode ?? '';
    const transactionStatus = query.vnp_TransactionStatus ?? '';
    const thanhCong = responseCode === '00' && transactionStatus === '00';
    const payDate = this.parseThoiGianVnpay(query.vnp_PayDate);
    const now = new Date();

    if (session.trang_thai === 'thanh_cong') {
      const ketQua = (session.ket_qua_don_hang ?? {}) as {
        don_hang?: string[];
      };
      return {
        message: 'Thanh toán VNPAY thành công',
        ma_giao_dich: txnRef,
        thanh_cong: true,
        don_hang: Array.isArray(ketQua.don_hang) ? ketQua.don_hang : [],
      };
    }

    if (!thanhCong) {
      session.trang_thai = 'that_bai';
      session.noi_dung_loi = `VNPAY response: ${responseCode || 'N/A'} - ${transactionStatus || 'N/A'}`;
      session.ngay_cap_nhat = now;
      await this.phienThanhToanRepo.save(session);

      return {
        message: 'Thanh toán VNPAY thất bại',
        ma_giao_dich: txnRef,
        thanh_cong: false,
        don_hang: [],
      };
    }

    const snapshot = this.parseDuLieuPhienThanhToan(session.du_lieu_don_hang);
    const allMonIds = [
      ...new Set(
        snapshot.groups
          .flatMap((group) => group.items.map((item) => Number(item.id_mon_an)))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    ];
    if (allMonIds.length > 0) {
      const monAnList = await this.monAnRepo
        .createQueryBuilder('ma')
        .where('ma.id IN (:...ids)', { ids: allMonIds })
        .getMany();
      const monAnMap = new Map(monAnList.map((item) => [Number(item.id), item]));
      for (const monId of allMonIds) {
        const mon = monAnMap.get(monId);
        if (!mon || mon.trang_thai_ban !== 'dang_ban') {
          session.trang_thai = 'that_bai';
          session.noi_dung_loi = `Món #${monId} đã hết hàng hoặc ngừng bán`;
          session.ngay_cap_nhat = now;
          await this.phienThanhToanRepo.save(session);
          throw new BadRequestException(`Món #${monId} đã hết hàng hoặc ngừng bán`);
        }
      }
    }
    const tongGoc = snapshot.tong_tien.tam_tinh + snapshot.tong_tien.phi_van_chuyen;
    let giamGiaConLai = snapshot.tong_tien.giam_gia;
    const createdOrders: Array<{ id: number; ma_don_hang: string; id_cua_hang: number }> = [];

    for (let index = 0; index < snapshot.groups.length; index += 1) {
      const group = snapshot.groups[index];
      const tongNhom = group.tam_tinh + group.phi_van_chuyen;
      let giamGiaNhom = 0;

      if (snapshot.tong_tien.giam_gia > 0) {
        if (index === snapshot.groups.length - 1) {
          giamGiaNhom = giamGiaConLai;
        } else {
          giamGiaNhom = Number(
            ((tongNhom / Math.max(tongGoc, 1)) * snapshot.tong_tien.giam_gia).toFixed(2),
          );
          giamGiaConLai -= giamGiaNhom;
        }
      }

      const maDonHang = this.taoMa('DH');

      const order = await this.donHangRepo.save({
        ma_don_hang: maDonHang,
        id_nguoi_mua: Number(session.id_nguoi_dung),
        id_cua_hang: group.id_cua_hang,
        nguoi_nhan: snapshot.nguoi_nhan,
        so_dien_thoai_nhan: snapshot.so_dien_thoai_nhan,
        dia_chi_giao: snapshot.dia_chi_giao,
        ghi_chu_tai_xe: snapshot.ghi_chu_tai_xe,
        nguon_don_hang: 'truc_tiep',
        id_bai_viet_nguon: null,
        id_nha_sang_tao_nguon: null,
        phuong_thuc_thanh_toan: 'vnpay',
        trang_thai_don_hang: 'cho_xac_nhan',
        tam_tinh: group.tam_tinh,
        phi_van_chuyen: group.phi_van_chuyen,
        tong_giam_gia: giamGiaNhom,
        tong_thanh_toan: group.tam_tinh + group.phi_van_chuyen - giamGiaNhom,
        thu_nhap_cua_hang: group.tam_tinh - giamGiaNhom,
        hoa_hong_nen_tang: 0,
        hoa_hong_nha_sang_tao: 0,
        ly_do_huy: null,
        ly_do_tra_hang: null,
        nguoi_huy: null,
        thoi_gian_dat: now,
        thoi_gian_xac_nhan: null,
        thoi_gian_giao: null,
        thoi_gian_hoan_tat: null,
        thoi_gian_huy: null,
      });

      await this.donHangChiTietRepo.save(
        group.items.map((item) => ({
          id_don_hang: Number(order.id),
          id_mon_an: item.id_mon_an || null,
          ten_mon_snapshot: item.ten_mon,
          hinh_anh_snapshot: item.hinh_anh,
          don_gia: item.don_gia,
          so_luong: item.so_luong,
          thanh_tien: item.thanh_tien,
          ghi_chu: item.ghi_chu,
        })),
      );

      await this.lichSuDonHangRepo.save({
        id_don_hang: Number(order.id),
        trang_thai_tu: null,
        trang_thai_den: 'cho_xac_nhan',
        noi_dung: 'Tạo đơn hàng sau khi thanh toán VNPAY thành công',
        id_nguoi_cap_nhat: Number(session.id_nguoi_dung),
        thoi_gian_cap_nhat: now,
      });

      await this.thanhToanRepo.save({
        id_don_hang: Number(order.id),
        cong_thanh_toan: 'vnpay',
        ma_giao_dich: txnRef,
        phuong_thuc_thanh_toan: 'vnpay',
        so_tien: Number(order.tong_thanh_toan),
        trang_thai_thanh_toan: 'thanh_cong',
        thoi_gian_thanh_toan: payDate ?? now,
        so_tien_hoan_tien: null,
        thoi_gian_hoan_tien: null,
        noi_dung_loi: null,
        ngay_tao: now,
      });

      if (snapshot.khuyen_mai && giamGiaNhom > 0) {
        await this.donHangKhuyenMaiRepo.save({
          id_don_hang: Number(order.id),
          id_khuyen_mai: snapshot.khuyen_mai.id,
          ma_khuyen_mai_snapshot: snapshot.khuyen_mai.ma_khuyen_mai,
          so_tien_giam: giamGiaNhom,
        });
      }

      createdOrders.push({
        id: Number(order.id),
        ma_don_hang: order.ma_don_hang,
        id_cua_hang: Number(order.id_cua_hang),
      });
    }

    const cartItemIds = [
      ...new Set(
        snapshot.groups
          .flatMap((group) => group.items.map((item) => Number(item.id_gio_hang)))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    ];
    if (cartItemIds.length > 0) {
      await this.gioHangRepo
        .createQueryBuilder()
        .delete()
        .where('id IN (:...ids)', { ids: cartItemIds })
        .andWhere('id_nguoi_dung = :userId', { userId: Number(session.id_nguoi_dung) })
        .execute();
    }

    session.trang_thai = 'thanh_cong';
    session.ket_qua_don_hang = {
      don_hang: createdOrders.map((item) => item.ma_don_hang),
    };
    session.noi_dung_loi = null;
    session.ngay_cap_nhat = now;
    await this.phienThanhToanRepo.save(session);

    return {
      message: 'Thanh toán VNPAY thành công',
      ma_giao_dich: txnRef,
      thanh_cong: true,
      don_hang: createdOrders.map((item) => item.ma_don_hang),
    };
  }

  // ======================== PB19-PB23 - ĐƠN HÀNG NGƯỜI DÙNG ========================
  private async tinhTabCounts(userId: number) {
    const allOrders = await this.donHangRepo.find({ where: { id_nguoi_mua: userId } });

    const reviewedOrderIds = new Set(
      (
        await this.danhGiaRepo.find({
          where: { id_nguoi_danh_gia: userId },
          select: { id_don_hang: true },
        })
      ).map((item) => Number(item.id_don_hang)),
    );

    const counts = {
      placed: 0,
      purchased: 0,
      cancelled: 0,
      returned: 0,
      review: 0,
    };

    for (const order of allOrders) {
      const status = order.trang_thai_don_hang as StatusDonHang;
      if (['cho_xac_nhan', 'da_xac_nhan', 'dang_chuan_bi', 'dang_giao'].includes(status)) {
        counts.placed += 1;
      }
      if (status === 'da_giao') {
        counts.purchased += 1;
        if (!reviewedOrderIds.has(Number(order.id))) {
          counts.review += 1;
        }
      }
      if (status === 'da_huy') {
        counts.cancelled += 1;
      }
      if (status === 'tra_hang' || status === 'da_hoan_tien') {
        counts.returned += 1;
      }
    }

    return counts;
  }

  private async layMonDauTienTheoDon(orderIds: number[]) {
    if (orderIds.length === 0) return new Map<number, DonHangChiTietEntity>();

    const list = await this.donHangChiTietRepo.find({
      where: orderIds.map((id) => ({ id_don_hang: id })),
      order: { id: 'ASC' },
    });

    const map = new Map<number, DonHangChiTietEntity>();
    for (const item of list) {
      const orderId = Number(item.id_don_hang);
      if (!map.has(orderId)) {
        map.set(orderId, item);
      }
    }
    return map;
  }

  private async layThanhToanGanNhatTheoDon(orderIds: number[]) {
    if (orderIds.length === 0) return new Map<number, ThanhToanEntity>();

    const rows = await this.thanhToanRepo.find({
      where: orderIds.map((id) => ({ id_don_hang: id })),
      order: { id: 'DESC' },
    });

    const map = new Map<number, ThanhToanEntity>();
    for (const row of rows) {
      const orderId = Number(row.id_don_hang);
      if (!map.has(orderId)) {
        map.set(orderId, row);
      }
    }
    return map;
  }

  async layDanhSachDonHang(userId: number, query: DanhSachDonHangNguoiDungQueryDto) {
    const tab: TabDonHang = query.tab ?? 'placed';
    const { currentPage, pageSize, skip } = this.parsePaging(query.trang, query.so_luong);
    const statuses = this.mapTabToStatuses(tab);

    const qb = this.donHangRepo
      .createQueryBuilder('dh')
      .leftJoin(CuaHangEntity, 'ch', 'ch.id = dh.id_cua_hang')
      .where('dh.id_nguoi_mua = :userId', { userId })
      .andWhere('dh.trang_thai_don_hang IN (:...statuses)', { statuses })
      .orderBy('dh.thoi_gian_dat', 'DESC')
      .addOrderBy('dh.id', 'DESC');

    if (query.tim_kiem?.trim()) {
      qb.andWhere('(dh.ma_don_hang LIKE :kw OR ch.ten_cua_hang LIKE :kw)', {
        kw: `%${query.tim_kiem.trim()}%`,
      });
    }

    const [ordersRaw, totalRaw] = await qb.getManyAndCount();

    let orders = ordersRaw;
    if (tab === 'review') {
      const reviewedOrderIds = new Set(
        (
          await this.danhGiaRepo.find({
            where: { id_nguoi_danh_gia: userId },
            select: { id_don_hang: true },
          })
        ).map((item) => Number(item.id_don_hang)),
      );
      orders = ordersRaw.filter((item) => !reviewedOrderIds.has(Number(item.id)));
    }

    const total = orders.length;
    const paged = orders.slice(skip, skip + pageSize);
    const orderIds = paged.map((item) => Number(item.id));

    const [firstItems, stores, paymentMap] = await Promise.all([
      this.layMonDauTienTheoDon(orderIds),
      this.cuaHangRepo.findBy(
        [...new Set(paged.map((item) => Number(item.id_cua_hang)))].map((id) => ({ id })),
      ),
      this.layThanhToanGanNhatTheoDon(orderIds),
    ]);
    const storeMap = new Map(stores.map((s) => [Number(s.id), s]));

    const reviewedOrderSet = new Set(
      (
        await this.danhGiaRepo.find({
          where: { id_nguoi_danh_gia: userId },
          select: { id_don_hang: true },
        })
      ).map((item) => Number(item.id_don_hang)),
    );

    const tabCounts = await this.tinhTabCounts(userId);

    return {
      tab,
      tab_counts: tabCounts,
      du_lieu: paged.map((item) => {
        const firstItem = firstItems.get(Number(item.id));
        const store = storeMap.get(Number(item.id_cua_hang));
        const daDanhGia = reviewedOrderSet.has(Number(item.id));
        const payment = paymentMap.get(Number(item.id));
        const laDonHoanTien =
          item.trang_thai_don_hang === 'tra_hang' ||
          item.trang_thai_don_hang === 'da_hoan_tien';
        const laDonDaHuy = item.trang_thai_don_hang === 'da_huy';

        return {
          id: Number(item.id),
          ma_don_hang: item.ma_don_hang,
          ten_cua_hang: store?.ten_cua_hang ?? 'Cửa hàng',
          id_cua_hang: Number(item.id_cua_hang),
          ten_mon: firstItem?.ten_mon_snapshot ?? 'Món ăn',
          hinh_anh_mon: firstItem?.hinh_anh_snapshot ?? null,
          so_luong_mon: firstItem ? Number(firstItem.so_luong) : 0,
          tong_tien_don_hang: Number(item.tong_thanh_toan),
          trang_thai_don_hang: this.mapTrangThaiDonHang(item.trang_thai_don_hang),
          trang_thai_db: item.trang_thai_don_hang,
          thoi_gian_dat: item.thoi_gian_dat,
          thoi_gian_giao: item.thoi_gian_giao,
          co_the_huy: item.trang_thai_don_hang === 'cho_xac_nhan',
          co_the_xac_nhan_da_nhan: item.trang_thai_don_hang === 'dang_giao',
          co_the_hoan_tien: item.trang_thai_don_hang === 'da_giao',
          co_the_danh_gia: item.trang_thai_don_hang === 'da_giao' && !daDanhGia,
          da_danh_gia: daDanhGia,
          trang_thai_hoan_tien:
            laDonHoanTien || laDonDaHuy
              ? payment?.trang_thai_thanh_toan === 'da_hoan_tien'
                ? 'da_hoan_tien'
                : 'chua_hoan_tien'
              : null,
          so_tien_hoan_tien:
            payment?.so_tien_hoan_tien != null ? Number(payment.so_tien_hoan_tien) : null,
        };
      }),
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
      tong_so_raw: totalRaw,
    };
  }

  async layChiTietDonHang(userId: number, maDonHang: string) {
    const order = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang, id_nguoi_mua: userId },
      relations: { nguoi_mua: true },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    const [store, details, history, payment, review] = await Promise.all([
      this.cuaHangRepo.findOne({ where: { id: Number(order.id_cua_hang) } }),
      this.donHangChiTietRepo.find({
        where: { id_don_hang: Number(order.id) },
        order: { id: 'ASC' },
      }),
      this.lichSuDonHangRepo.find({
        where: { id_don_hang: Number(order.id) },
        order: { thoi_gian_cap_nhat: 'ASC', id: 'ASC' },
      }),
      this.thanhToanRepo.findOne({
        where: { id_don_hang: Number(order.id) },
        order: { id: 'DESC' },
      }),
      this.danhGiaRepo.findOne({
        where: {
          id_don_hang: Number(order.id),
          id_nguoi_danh_gia: userId,
        },
      }),
    ]);

    const reviewFiles = review
      ? await this.tepRepo.find({
          where: {
            loai_doi_tuong: 'danh_gia',
            id_doi_tuong: Number(review.id),
          },
          order: { thu_tu_hien_thi: 'ASC', id: 'ASC' },
        })
      : [];

    return {
      id: Number(order.id),
      ma_don_hang: order.ma_don_hang,
      thong_tin_nguoi_nhan: {
        ten_hien_thi: order.nguoi_nhan,
        so_dien_thoai: order.so_dien_thoai_nhan,
        dia_chi_giao: order.dia_chi_giao,
      },
      thong_tin_cua_hang: {
        id: store ? Number(store.id) : Number(order.id_cua_hang),
        ten_cua_hang: store?.ten_cua_hang ?? 'Cửa hàng',
        dia_chi: store?.dia_chi_kinh_doanh ?? null,
      },
      danh_sach_mon: details.map((item) => ({
        id: Number(item.id),
        id_mon_an: item.id_mon_an,
        ten_mon: item.ten_mon_snapshot,
        hinh_anh: item.hinh_anh_snapshot,
        don_gia: Number(item.don_gia),
        so_luong: Number(item.so_luong),
        thanh_tien: Number(item.thanh_tien),
        ghi_chu: item.ghi_chu,
      })),
      tong_tien: {
        tam_tinh: Number(order.tam_tinh),
        phi_van_chuyen: Number(order.phi_van_chuyen),
        tong_giam_gia: Number(order.tong_giam_gia),
        tong_thanh_toan: Number(order.tong_thanh_toan),
      },
      trang_thai_don_hang: this.mapTrangThaiDonHang(order.trang_thai_don_hang),
      trang_thai_db: order.trang_thai_don_hang,
      ly_do_huy: order.ly_do_huy,
      ly_do_tra_hang: order.ly_do_tra_hang,
      nguoi_huy: order.nguoi_huy,
      thoi_gian_dat: order.thoi_gian_dat,
      thoi_gian_xac_nhan: order.thoi_gian_xac_nhan,
      thoi_gian_giao: order.thoi_gian_giao,
      thoi_gian_hoan_tat: order.thoi_gian_hoan_tat,
      thoi_gian_huy: order.thoi_gian_huy,
      co_the_xac_nhan_da_nhan: order.trang_thai_don_hang === 'dang_giao',
      thanh_toan: payment
        ? {
            phuong_thuc: payment.phuong_thuc_thanh_toan,
            cong_thanh_toan: payment.cong_thanh_toan,
            ma_giao_dich: payment.ma_giao_dich,
            trang_thai: payment.trang_thai_thanh_toan,
            so_tien: Number(payment.so_tien),
            thoi_gian_thanh_toan: payment.thoi_gian_thanh_toan,
            so_tien_hoan_tien:
              payment.so_tien_hoan_tien != null ? Number(payment.so_tien_hoan_tien) : null,
            thoi_gian_hoan_tien: payment.thoi_gian_hoan_tien,
          }
        : null,
      lich_su: history.map((item) => ({
        id: Number(item.id),
        trang_thai_tu: item.trang_thai_tu,
        trang_thai_den: item.trang_thai_den,
        noi_dung: item.noi_dung,
        thoi_gian_cap_nhat: item.thoi_gian_cap_nhat,
      })),
      danh_gia_cua_toi: review
        ? {
            id: Number(review.id),
            so_sao: Number(review.so_sao),
            noi_dung: review.noi_dung,
            an_danh: Boolean(review.an_danh),
            ngay_tao: review.ngay_tao,
            tep_dinh_kem: reviewFiles.map((item) => item.duong_dan_tep),
          }
        : null,
    };
  }

  async huyDonHang(userId: number, maDonHang: string, dto: HuyDonHangDto) {
    const order = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang, id_nguoi_mua: userId },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (order.trang_thai_don_hang !== 'cho_xac_nhan') {
      throw new BadRequestException('Chỉ đơn hàng chờ xác nhận mới có thể hủy');
    }

    order.trang_thai_don_hang = 'da_huy';
    order.nguoi_huy = 'nguoi_mua';
    order.ly_do_huy = dto.ly_do.trim();
    order.thoi_gian_huy = new Date();

    await this.donHangRepo.save(order);
    await this.lichSuDonHangRepo.save({
      id_don_hang: Number(order.id),
      trang_thai_tu: 'cho_xac_nhan',
      trang_thai_den: 'da_huy',
      noi_dung: `Nguoi mua huy don: ${dto.ly_do.trim()}`,
      id_nguoi_cap_nhat: userId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đã hủy đơn hàng',
      trang_thai_moi: 'da_huy',
    };
  }

  async yeuCauHoanTien(userId: number, maDonHang: string, dto: YeuCauHoanTienDto) {
    const order = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang, id_nguoi_mua: userId },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (order.trang_thai_don_hang !== 'da_giao') {
      throw new BadRequestException('Chỉ đơn hàng đã giao mới có thể yêu cầu hoàn tiền');
    }

    const payment = await this.thanhToanRepo.findOne({
      where: { id_don_hang: Number(order.id) },
      order: { id: 'DESC' },
    });
    if (!payment || payment.trang_thai_thanh_toan !== 'thanh_cong') {
      throw new BadRequestException('Đơn hàng chưa có thanh toán thành công để yêu cầu hoàn tiền');
    }

    const gioiHanGio = Math.max(
      Number(process.env.ORDER_REFUND_REQUEST_WINDOW_HOURS) || 24,
      1,
    );
    const mocTinh =
      order.thoi_gian_hoan_tat ?? order.thoi_gian_giao ?? order.thoi_gian_dat;
    const hetHan = mocTinh.getTime() + gioiHanGio * 60 * 60 * 1000;
    if (Date.now() > hetHan) {
      throw new BadRequestException(
        `Đã quá thời gian cho phép yêu cầu hoàn tiền (${gioiHanGio} giờ)`,
      );
    }

    const lyDo = `${dto.ly_do.trim()} | Tai khoan hoan tien: ${dto.thong_tin_tai_khoan_hoan_tien.trim()}`;

    order.trang_thai_don_hang = 'tra_hang';
    order.ly_do_tra_hang = lyDo;

    await this.donHangRepo.save(order);
    await this.lichSuDonHangRepo.save({
      id_don_hang: Number(order.id),
      trang_thai_tu: 'da_giao',
      trang_thai_den: 'tra_hang',
      noi_dung: `Nguoi mua yeu cau hoan tien: ${lyDo}`,
      id_nguoi_cap_nhat: userId,
      thoi_gian_cap_nhat: new Date(),
    });

    return {
      message: 'Đã gửi yêu cầu hoàn tiền',
      trang_thai_moi: 'tra_hang',
    };
  }

  async muaLaiDonHang(userId: number, maDonHang: string) {
    const order = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang, id_nguoi_mua: userId },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    const details = await this.donHangChiTietRepo.find({
      where: { id_don_hang: Number(order.id) },
      order: { id: 'ASC' },
    });
    if (details.length === 0) {
      throw new BadRequestException('Đơn hàng không có món để mua lại');
    }

    const monIds = [...new Set(details.map((item) => Number(item.id_mon_an)).filter((id) => Number.isFinite(id) && id > 0))];
    const monList = monIds.length
      ? await this.monAnRepo.findBy(monIds.map((id) => ({ id })))
      : [];
    const monMap = new Map(monList.map((item) => [Number(item.id), item]));

    let soMonDaThem = 0;
    for (const detail of details) {
      const monId = Number(detail.id_mon_an);
      const mon = monMap.get(monId);
      if (!mon || mon.trang_thai_ban !== 'dang_ban') {
        continue;
      }

      const existing = await this.gioHangRepo.findOne({
        where: {
          id_nguoi_dung: userId,
          id_cua_hang: Number(mon.id_cua_hang),
          id_mon_an: Number(mon.id),
        },
      });

      if (existing) {
        existing.so_luong += Number(detail.so_luong);
        existing.gia_tai_thoi_diem_them = Number(mon.gia_ban);
        existing.duoc_chon = true;
        await this.gioHangRepo.save(existing);
        soMonDaThem += 1;
      } else {
        await this.gioHangRepo.save({
          id_nguoi_dung: userId,
          id_cua_hang: Number(mon.id_cua_hang),
          id_mon_an: Number(mon.id),
          so_luong: Number(detail.so_luong),
          ghi_chu: detail.ghi_chu,
          duoc_chon: true,
          gia_tai_thoi_diem_them: Number(mon.gia_ban),
          ngay_tao: new Date(),
          ngay_cap_nhat: new Date(),
        });
        soMonDaThem += 1;
      }
    }

    if (soMonDaThem === 0) {
      throw new BadRequestException(
        'Không thể mua lại vì các món trong đơn không còn khả dụng',
      );
    }

    return {
      message: 'Đã thêm món từ đơn cũ vào giỏ hàng',
      gio_hang: await this.layGioHang(userId),
    };
  }

  async xacNhanDaGiao(userId: number, maDonHang: string) {
    const order = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang, id_nguoi_mua: userId },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (order.trang_thai_don_hang !== 'dang_giao') {
      throw new BadRequestException(
        'Chỉ đơn hàng đang giao mới có thể xác nhận đã nhận hàng',
      );
    }

    const now = new Date();
    order.trang_thai_don_hang = 'da_giao';
    order.thoi_gian_hoan_tat = now;
    if (!order.thoi_gian_giao) {
      order.thoi_gian_giao = now;
    }

    await this.donHangRepo.save(order);
    await this.capNhatSoLuongDaBanMonAn(Number(order.id));
    await this.lichSuDonHangRepo.save({
      id_don_hang: Number(order.id),
      trang_thai_tu: 'dang_giao',
      trang_thai_den: 'da_giao',
      noi_dung: 'Nguoi mua xac nhan da nhan hang',
      id_nguoi_cap_nhat: userId,
      thoi_gian_cap_nhat: now,
    });

    return {
      message: 'Đã xác nhận nhận hàng thành công',
      trang_thai_moi: 'da_giao',
      thoi_gian_hoan_tat: now,
    };
  }

  private async capNhatSoLuongDaBanMonAn(idDonHang: number) {
    const chiTietDon = await this.donHangChiTietRepo.find({
      where: { id_don_hang: idDonHang },
      select: ['id_mon_an', 'so_luong'],
    });

    const tongTheoMon = new Map<number, number>();
    for (const item of chiTietDon) {
      const idMon = Number(item.id_mon_an);
      if (!Number.isFinite(idMon) || idMon <= 0) continue;
      const soLuong = Number(item.so_luong ?? 0);
      if (!Number.isFinite(soLuong) || soLuong <= 0) continue;
      tongTheoMon.set(idMon, (tongTheoMon.get(idMon) ?? 0) + soLuong);
    }

    for (const [idMon, tongSoLuong] of tongTheoMon.entries()) {
      await this.monAnRepo
        .createQueryBuilder()
        .update(MonAnEntity)
        .set({
          so_luong_da_ban: () => `so_luong_da_ban + ${Math.floor(tongSoLuong)}`,
        })
        .where('id = :idMon', { idMon })
        .execute();
    }
  }

  private async capNhatDiemDanhGiaMonVaCuaHang(idMonAn: number | null, idCuaHang: number) {
    if (idMonAn != null) {
      const aggMon = await this.danhGiaRepo
        .createQueryBuilder('dg')
        .select('COALESCE(AVG(dg.so_sao), 0)', 'avg_sao')
        .addSelect('COUNT(dg.id)', 'tong')
        .where('dg.id_mon_an = :idMonAn', { idMonAn })
        .getRawOne<{ avg_sao: string; tong: string }>();

      await this.monAnRepo.update(
        { id: idMonAn },
        {
          diem_danh_gia: Number(Number(aggMon?.avg_sao ?? 0).toFixed(2)),
          tong_danh_gia: Number(aggMon?.tong ?? 0),
        },
      );
    }

    const aggStore = await this.danhGiaRepo
      .createQueryBuilder('dg')
      .select('COALESCE(AVG(dg.so_sao), 0)', 'avg_sao')
      .where('dg.id_cua_hang = :idCuaHang', { idCuaHang })
      .getRawOne<{ avg_sao: string }>();

    await this.cuaHangRepo.update(
      { id: idCuaHang },
      {
        diem_danh_gia: Number(Number(aggStore?.avg_sao ?? 0).toFixed(2)),
      },
    );
  }

  async danhGiaDonHang(userId: number, maDonHang: string, dto: DanhGiaDonHangDto) {
    const order = await this.donHangRepo.findOne({
      where: { ma_don_hang: maDonHang, id_nguoi_mua: userId },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (!['da_giao', 'da_hoan_tien'].includes(order.trang_thai_don_hang)) {
      throw new BadRequestException('Chỉ đơn hàng đã giao mới có thể đánh giá');
    }
    if (!dto.noi_dung?.trim()) {
      throw new BadRequestException('Nội dung đánh giá không được để trống');
    }

    const firstDetail = await this.donHangChiTietRepo.findOne({
      where: { id_don_hang: Number(order.id) },
      order: { id: 'ASC' },
    });

    let review = await this.danhGiaRepo.findOne({
      where: {
        id_don_hang: Number(order.id),
        id_nguoi_danh_gia: userId,
      },
    });

    if (review) {
      review.so_sao = dto.so_sao;
      review.noi_dung = dto.noi_dung?.trim() || null;
      review.an_danh = dto.an_danh ? 1 : 0;
      review = await this.danhGiaRepo.save(review);
    } else {
      review = await this.danhGiaRepo.save({
        id_don_hang: Number(order.id),
        id_nguoi_danh_gia: userId,
        id_cua_hang: Number(order.id_cua_hang),
        id_mon_an: firstDetail?.id_mon_an ?? null,
        so_sao: dto.so_sao,
        noi_dung: dto.noi_dung?.trim() || null,
        an_danh: dto.an_danh ? 1 : 0,
        tong_luot_thich: 0,
        ngay_tao: new Date(),
      });
    }

    if (dto.tep_dinh_kem?.length) {
      await this.tepRepo
        .createQueryBuilder()
        .delete()
        .where('loai_doi_tuong = :loai', { loai: 'danh_gia' })
        .andWhere('id_doi_tuong = :id', { id: Number(review.id) })
        .execute();

      await this.tepRepo.save(
        dto.tep_dinh_kem.map((url, index) => ({
          loai_doi_tuong: 'danh_gia',
          id_doi_tuong: Number(review?.id),
          loai_tep: this.detectLoaiTep(url),
          duong_dan_tep: url,
          thu_tu_hien_thi: index + 1,
          ghi_chu: null,
          ngay_tao: new Date(),
        })),
      );
    }

    await this.capNhatDiemDanhGiaMonVaCuaHang(
      firstDetail?.id_mon_an ?? null,
      Number(order.id_cua_hang),
    );

    return {
      message: 'Đánh giá đơn hàng thành công',
      danh_gia: {
        id: Number(review.id),
        so_sao: Number(review.so_sao),
        noi_dung: review.noi_dung,
        an_danh: Boolean(review.an_danh),
      },
    };
  }

  // ======================== PB10 - TIN NHẮN ========================
  private async assertNguoiDungTrongCuocTroChuyen(userId: number, idCuocTroChuyen: number) {
    const room = await this.cuocTroChuyenRepo.findOne({
      where: { id: idCuocTroChuyen },
    });
    if (!room) {
      throw new NotFoundException('Cuộc trò chuyện không tồn tại');
    }

    if (
      Number(room.id_nguoi_dung_a) !== userId &&
      Number(room.id_nguoi_dung_b) !== userId
    ) {
      throw new ForbiddenException('Bạn không thuộc cuộc trò chuyện này');
    }

    return room;
  }

  async xacThucThanhVienCuocTroChuyen(
    userId: number,
    idCuocTroChuyen: number,
  ) {
    await this.assertNguoiDungTrongCuocTroChuyen(userId, idCuocTroChuyen);
    return { hop_le: true };
  }

  async layDanhSachTroChuyen(userId: number, query: DanhSachTroChuyenQueryDto) {
    const { currentPage, pageSize, skip } = this.parsePaging(query.trang, query.so_luong);

    const allRooms = await this.cuocTroChuyenRepo
      .createQueryBuilder('ctc')
      .where('ctc.id_nguoi_dung_a = :userId OR ctc.id_nguoi_dung_b = :userId', {
        userId,
      })
      .orderBy('ctc.thoi_gian_tin_nhan_cuoi', 'DESC')
      .addOrderBy('ctc.ngay_tao', 'DESC')
      .getMany();

    const doiTacIds = [...new Set(
      allRooms.map((room) =>
        Number(room.id_nguoi_dung_a) === userId
          ? Number(room.id_nguoi_dung_b)
          : Number(room.id_nguoi_dung_a),
      ),
    )];

    const doiTacList = doiTacIds.length
      ? await this.nguoiDungRepo.findBy(doiTacIds.map((id) => ({ id })))
      : [];
    const doiTacMap = new Map(doiTacList.map((item) => [Number(item.id), item]));

    const unreadRows = await this.tinNhanRepo
      .createQueryBuilder('tn')
      .select('tn.id_cuoc_tro_chuyen', 'id_cuoc_tro_chuyen')
      .addSelect('COUNT(tn.id)', 'tong')
      .where('tn.id_cuoc_tro_chuyen IN (:...roomIds)', {
        roomIds: allRooms.map((r) => Number(r.id)).length
          ? allRooms.map((r) => Number(r.id))
          : [0],
      })
      .andWhere('tn.id_nguoi_gui != :userId', { userId })
      .andWhere('tn.thoi_gian_xem IS NULL')
      .groupBy('tn.id_cuoc_tro_chuyen')
      .getRawMany<{ id_cuoc_tro_chuyen: string; tong: string }>();
    const unreadMap = new Map(
      unreadRows.map((item) => [Number(item.id_cuoc_tro_chuyen), Number(item.tong)]),
    );

    const keyword = query.tim_kiem?.trim().toLowerCase();
    const mapped = allRooms
      .map((room) => {
        const partnerId =
          Number(room.id_nguoi_dung_a) === userId
            ? Number(room.id_nguoi_dung_b)
            : Number(room.id_nguoi_dung_a);
        const partner = doiTacMap.get(partnerId);

        return {
          id_cuoc_tro_chuyen: Number(room.id),
          doi_tac: {
            id: partnerId,
            ten_hien_thi: partner?.ten_hien_thi ?? 'Người dùng',
            anh_dai_dien: partner?.anh_dai_dien ?? null,
          },
          tin_nhan_cuoi: room.tin_nhan_cuoi,
          thoi_gian_tin_nhan_cuoi: room.thoi_gian_tin_nhan_cuoi,
          so_tin_chua_doc: unreadMap.get(Number(room.id)) ?? 0,
        };
      })
      .filter((item) => {
        if (!keyword) return true;
        return item.doi_tac.ten_hien_thi.toLowerCase().includes(keyword);
      });

    const total = mapped.length;
    return {
      du_lieu: mapped.slice(skip, skip + pageSize),
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  async layTinNhan(userId: number, idCuocTroChuyen: number, query: DanhSachTinNhanQueryDto) {
    const room = await this.assertNguoiDungTrongCuocTroChuyen(userId, idCuocTroChuyen);
    const { currentPage, pageSize, skip } = this.parsePaging(query.trang, query.so_luong);

    const [items, total] = await this.tinNhanRepo
      .createQueryBuilder('tn')
      .where('tn.id_cuoc_tro_chuyen = :roomId', { roomId: idCuocTroChuyen })
      .orderBy('tn.thoi_gian_gui', 'DESC')
      .addOrderBy('tn.id', 'DESC')
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    await this.tinNhanRepo
      .createQueryBuilder()
      .update(TinNhanEntity)
      .set({ thoi_gian_xem: new Date() })
      .where('id_cuoc_tro_chuyen = :roomId', { roomId: idCuocTroChuyen })
      .andWhere('id_nguoi_gui != :userId', { userId })
      .andWhere('thoi_gian_xem IS NULL')
      .execute();

    const partnerId =
      Number(room.id_nguoi_dung_a) === userId
        ? Number(room.id_nguoi_dung_b)
        : Number(room.id_nguoi_dung_a);

    const partner = await this.nguoiDungRepo.findOne({ where: { id: partnerId } });

    return {
      thong_tin_cuoc_tro_chuyen: {
        id_cuoc_tro_chuyen: Number(room.id),
        doi_tac: {
          id: partnerId,
          ten_hien_thi: partner?.ten_hien_thi ?? 'Người dùng',
          anh_dai_dien: partner?.anh_dai_dien ?? null,
        },
      },
      du_lieu: items
        .slice()
        .reverse()
        .map((item) => ({
          id: Number(item.id),
          id_nguoi_gui: Number(item.id_nguoi_gui),
          noi_dung: item.noi_dung,
          loai_tin_nhan: item.loai_tin_nhan,
          thoi_gian_gui: item.thoi_gian_gui,
          thoi_gian_xem: item.thoi_gian_xem,
          la_tin_cua_toi: Number(item.id_nguoi_gui) === userId,
        })),
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  async guiTinNhan(userId: number, idCuocTroChuyen: number, dto: GuiTinNhanDto) {
    const room = await this.assertNguoiDungTrongCuocTroChuyen(userId, idCuocTroChuyen);

    const partnerId =
      Number(room.id_nguoi_dung_a) === userId
        ? Number(room.id_nguoi_dung_b)
        : Number(room.id_nguoi_dung_a);

    const biChan = await this.quanHeNguoiDungRepo.count({
      where: [
        {
          id_nguoi_tao_quan_he: userId,
          id_nguoi_nhan_quan_he: partnerId,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
        {
          id_nguoi_tao_quan_he: partnerId,
          id_nguoi_nhan_quan_he: userId,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
      ],
    });
    if (biChan > 0) {
      throw new ForbiddenException('Không thể nhắn tin khi một trong hai bên đã chặn nhau');
    }

    const message = await this.tinNhanRepo.save({
      id_cuoc_tro_chuyen: idCuocTroChuyen,
      id_nguoi_gui: userId,
      noi_dung: dto.noi_dung.trim(),
      loai_tin_nhan: 'van_ban',
      thoi_gian_gui: new Date(),
      thoi_gian_xem: null,
      da_thu_hoi: false,
    });

    room.tin_nhan_cuoi = dto.noi_dung.trim();
    room.thoi_gian_tin_nhan_cuoi = new Date();
    await this.cuocTroChuyenRepo.save(room);

    return {
      id: Number(message.id),
      id_cuoc_tro_chuyen: Number(message.id_cuoc_tro_chuyen),
      id_nguoi_gui: Number(message.id_nguoi_gui),
      noi_dung: message.noi_dung,
      loai_tin_nhan: message.loai_tin_nhan,
      thoi_gian_gui: message.thoi_gian_gui,
    };
  }
}
