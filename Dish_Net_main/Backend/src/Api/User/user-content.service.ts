import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MonAnEntity } from '../Admin/entities/mon-an.entity';
import { DanhMucMonEntity } from '../Admin/entities/danh-muc-mon.entity';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { BaiVietEntity } from '../Admin/entities/bai-viet.entity';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';
import { DanhGiaEntity } from '../Store/entities/danh-gia.entity';
import { TepDinhKemEntity } from '../Admin/entities/tep-dinh-kem.entity';
import { KhuyenMaiEntity } from '../Admin/entities/khuyen-mai.entity';
import { BinhLuanEntity } from '../Admin/entities/binh-luan.entity';
import { BaoCaoEntity } from '../Admin/entities/bao-cao.entity';
import { TuongTacEntity } from '../Admin/entities/tuong-tac.entity';
import { YeuCauNangCapEntity } from '../Admin/entities/yeu-cau-nang-cap.entity';
import { DanhGiaDaLuuEntity } from './entities/danh-gia-da-luu.entity';
import { QuanHeNguoiDungEntity } from './entities/quan-he-nguoi-dung.entity';
import { CuocTroChuyenEntity } from './entities/cuoc-tro-chuyen.entity';
import { TaiKhoanRutTienEntity } from './entities/tai-khoan-rut-tien.entity';
import { YeuCauRutTienEntity } from './entities/yeu-cau-rut-tien.entity';
import { LuotNhanLinkBaiVietEntity } from './entities/luot-nhan-link-bai-viet.entity';
import { LuotXemBaiVietEntity } from './entities/luot-xem-bai-viet.entity';
import {
  BangXepHangChiTietQueryDto,
  BangXepHangMiniQueryDto,
  BaoCaoNguoiDungDto,
  BaoCaoBaiVietDto,
  ChinhSuaTrangCaNhanDto,
  KhamPhaQueryDto,
  MonTheoDanhMucQueryDto,
  NoiDungTrangCaNhanQueryDto,
  ChiaSeBaiVietDto,
  TaoBaiVietDto,
  TimKiemQueryDto,
} from './dto/user-content.dto';

@Injectable()
export class UserContentService {
  constructor(
    @InjectRepository(MonAnEntity)
    private readonly monAnRepo: Repository<MonAnEntity>,
    @InjectRepository(DanhMucMonEntity)
    private readonly danhMucMonRepo: Repository<DanhMucMonEntity>,
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(BaiVietEntity)
    private readonly baiVietRepo: Repository<BaiVietEntity>,
    @InjectRepository(BinhLuanEntity)
    private readonly binhLuanRepo: Repository<BinhLuanEntity>,
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectRepository(DanhGiaEntity)
    private readonly danhGiaRepo: Repository<DanhGiaEntity>,
    @InjectRepository(TepDinhKemEntity)
    private readonly tepRepo: Repository<TepDinhKemEntity>,
    @InjectRepository(KhuyenMaiEntity)
    private readonly khuyenMaiRepo: Repository<KhuyenMaiEntity>,
    @InjectRepository(BaoCaoEntity)
    private readonly baoCaoRepo: Repository<BaoCaoEntity>,
    @InjectRepository(TuongTacEntity)
    private readonly tuongTacRepo: Repository<TuongTacEntity>,
    @InjectRepository(YeuCauNangCapEntity)
    private readonly yeuCauNangCapRepo: Repository<YeuCauNangCapEntity>,
    @InjectRepository(DanhGiaDaLuuEntity)
    private readonly danhGiaDaLuuRepo: Repository<DanhGiaDaLuuEntity>,
    @InjectRepository(QuanHeNguoiDungEntity)
    private readonly quanHeNguoiDungRepo: Repository<QuanHeNguoiDungEntity>,
    @InjectRepository(CuocTroChuyenEntity)
    private readonly cuocTroChuyenRepo: Repository<CuocTroChuyenEntity>,
    @InjectRepository(TaiKhoanRutTienEntity)
    private readonly taiKhoanRutTienRepo: Repository<TaiKhoanRutTienEntity>,
    @InjectRepository(YeuCauRutTienEntity)
    private readonly yeuCauRutTienRepo: Repository<YeuCauRutTienEntity>,
    @InjectRepository(LuotNhanLinkBaiVietEntity)
    private readonly luotNhanLinkBaiVietRepo: Repository<LuotNhanLinkBaiVietEntity>,
    @InjectRepository(LuotXemBaiVietEntity)
    private readonly luotXemBaiVietRepo: Repository<LuotXemBaiVietEntity>,
  ) {}

  private parsePaging(trang?: number, soLuong?: number) {
    const currentPage = Math.max(Number(trang) || 1, 1);
    const pageSize = Math.min(Math.max(Number(soLuong) || 10, 1), 50);
    const skip = (currentPage - 1) * pageSize;
    return { currentPage, pageSize, skip };
  }

  private taoMaBaoCao(prefix = 'BCBV') {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const i = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const rand = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `${prefix}${y}${m}${d}${h}${i}${s}${rand}`;
  }

  private parseMonAnIdTuLink(link: string): number | null {
    const trimmed = (link || '').trim();
    if (!trimmed) return null;

    const tuQuery = (() => {
      try {
        const url = new URL(trimmed, 'https://dishnet.local');
        const direct = Number(url.searchParams.get('id_mon_an') || url.searchParams.get('id') || 0);
        if (Number.isFinite(direct) && direct > 0) return direct;
      } catch {
        return null;
      }
      return null;
    })();
    if (tuQuery) return tuQuery;

    const match = trimmed.match(/(?:mon-an|food|dish)\/(\d+)(?:[/?#]|$)/i);
    if (!match) return null;
    const id = Number(match[1]);
    return Number.isFinite(id) && id > 0 ? id : null;
  }

  private tinhKhoangCachKmExpr(alias: string): string {
    return `(6371 * ACOS(COS(RADIANS(:viDo)) * COS(RADIANS(${alias}.vi_do)) * COS(RADIANS(${alias}.kinh_do) - RADIANS(:kinhDo)) + SIN(RADIANS(:viDo)) * SIN(RADIANS(${alias}.vi_do))))`;
  }

  private tinhGiaKhuyenMai(
    giaMon: number,
    khuyenMai: KhuyenMaiEntity,
  ): { gia_sau_giam: number; so_tien_giam: number } {
    const giaTri = Number(khuyenMai.gia_tri_khuyen_mai || 0);
    const giaTriToiDa =
      khuyenMai.gia_tri_toi_da != null ? Number(khuyenMai.gia_tri_toi_da) : null;

    if (khuyenMai.loai_khuyen_mai === 'phan_tram') {
      let soTienGiam = (giaMon * giaTri) / 100;
      if (giaTriToiDa != null) {
        soTienGiam = Math.min(soTienGiam, giaTriToiDa);
      }
      const giaSauGiam = Math.max(giaMon - soTienGiam, 0);
      return { gia_sau_giam: giaSauGiam, so_tien_giam: soTienGiam };
    }

    if (khuyenMai.loai_khuyen_mai === 'so_tien') {
      const soTienGiam = Math.min(giaTri, giaMon);
      return {
        gia_sau_giam: Math.max(giaMon - soTienGiam, 0),
        so_tien_giam: soTienGiam,
      };
    }

    return { gia_sau_giam: giaMon, so_tien_giam: 0 };
  }

  private async buildBaiVietGocMap(
    items: Array<{ id_bai_viet_goc?: number | null }>,
  ) {
    const originalIds = [
      ...new Set(
        items
          .map((item) => Number(item.id_bai_viet_goc ?? 0))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    ];

    if (originalIds.length === 0) {
      return new Map<number, unknown>();
    }

    const originalPosts = await this.baiVietRepo.findBy(
      originalIds.map((id) => ({ id })),
    );
    const originalAuthorIds = [
      ...new Set(originalPosts.map((post) => Number(post.id_nguoi_dang))),
    ];
    const [authors, mediaByOriginalPost] = await Promise.all([
      originalAuthorIds.length > 0
        ? this.nguoiDungRepo.findBy(originalAuthorIds.map((id) => ({ id })))
        : Promise.resolve([]),
      this.mapMediaByObject('bai_viet', originalIds),
    ]);

    const authorById = new Map<number, NguoiDungEntity>();
    authors.forEach((author) => authorById.set(Number(author.id), author));

    const originalMap = new Map<number, unknown>();
    originalPosts.forEach((post) => {
      const author = authorById.get(Number(post.id_nguoi_dang));
      originalMap.set(Number(post.id), {
        id: Number(post.id),
        loai_bai_viet: post.loai_bai_viet,
        noi_dung: post.noi_dung,
        so_sao: post.so_sao != null ? Number(post.so_sao) : null,
        ngay_dang: post.ngay_dang,
        thong_tin_nguoi_dang: {
          id: author ? Number(author.id) : Number(post.id_nguoi_dang),
          ten_hien_thi: author?.ten_hien_thi ?? 'Người dùng',
          anh_dai_dien: author?.anh_dai_dien ?? null,
        },
        tep_dinh_kem: mediaByOriginalPost.get(Number(post.id)) ?? [],
      });
    });

    return originalMap;
  }

  async timKiem(query: TimKiemQueryDto) {
    const loai = query.loai ?? 'tat_ca';
    const keyword = query.tu_khoa?.trim() ?? '';
    const khuVuc = query.khu_vuc?.trim() ?? '';
    const diaDiem = query.dia_diem?.trim() ?? '';
    const boLocKhuVuc = query.bo_loc_khu_vuc;
    const viDo = query.vi_do != null ? Number(query.vi_do) : null;
    const kinhDo = query.kinh_do != null ? Number(query.kinh_do) : null;
    const banKinhKm =
      query.ban_kinh_km != null ? Math.max(Number(query.ban_kinh_km), 1) : 10;
    const khuVucTimKiem = diaDiem || khuVuc;
    const doPhoBien = query.do_pho_bien;

    if (!keyword) {
      throw new BadRequestException(
        'Vui lòng nhập từ khóa tìm kiếm để hiển thị kết quả liên quan',
      );
    }

    if (boLocKhuVuc === 'gan_ban' && (viDo == null || kinhDo == null)) {
      throw new BadRequestException(
        'Bộ lọc "Gần bạn" yêu cầu cung cấp vi_do và kinh_do',
      );
    }

    const { currentPage, pageSize, skip } = this.parsePaging(
      query.trang,
      query.so_luong,
    );

    const include = {
      mon_an: loai === 'tat_ca' || loai === 'mon_an',
      cua_hang: loai === 'tat_ca' || loai === 'cua_hang',
      bai_viet: loai === 'tat_ca' || loai === 'bai_viet',
      nguoi_dung: loai === 'tat_ca' || loai === 'nguoi_dung',
    };

    const [monAn, cuaHang, baiViet, nguoiDung] = await Promise.all([
      include.mon_an
        ? this.timMonAn(
            keyword,
            khuVucTimKiem,
            doPhoBien,
            skip,
            pageSize,
            boLocKhuVuc,
            viDo,
            kinhDo,
            banKinhKm,
          )
        : Promise.resolve({ du_lieu: [], tong_so: 0 }),
      include.cua_hang
        ? this.timCuaHang(
            keyword,
            khuVucTimKiem,
            doPhoBien,
            skip,
            pageSize,
            boLocKhuVuc,
            viDo,
            kinhDo,
            banKinhKm,
          )
        : Promise.resolve({ du_lieu: [], tong_so: 0 }),
      include.bai_viet
        ? this.timBaiViet(
            keyword,
            khuVucTimKiem,
            doPhoBien,
            skip,
            pageSize,
            boLocKhuVuc,
            viDo,
            kinhDo,
            banKinhKm,
          )
        : Promise.resolve({ du_lieu: [], tong_so: 0 }),
      include.nguoi_dung
        ? this.timNguoiDung(
            keyword,
            khuVucTimKiem,
            doPhoBien,
            skip,
            pageSize,
            boLocKhuVuc,
            viDo,
            kinhDo,
            banKinhKm,
          )
        : Promise.resolve({ du_lieu: [], tong_so: 0 }),
    ]);

    if (
      monAn.tong_so +
        cuaHang.tong_so +
        baiViet.tong_so +
        nguoiDung.tong_so ===
      0
    ) {
      return {
        thong_bao: 'Không tìm thấy kết quả phù hợp',
        bo_loc: {
          loai,
          khu_vuc: khuVucTimKiem || null,
          bo_loc_khu_vuc: boLocKhuVuc ?? null,
          vi_do: viDo,
          kinh_do: kinhDo,
          ban_kinh_km: boLocKhuVuc === 'gan_ban' ? banKinhKm : null,
          do_pho_bien: doPhoBien ?? null,
          tu_khoa: keyword || null,
        },
        ket_qua: {
          mon_an: monAn,
          cua_hang: cuaHang,
          bai_viet: baiViet,
          nguoi_dung: nguoiDung,
        },
      };
    }

    return {
      bo_loc: {
        loai,
        khu_vuc: khuVucTimKiem || null,
        bo_loc_khu_vuc: boLocKhuVuc ?? null,
        vi_do: viDo,
        kinh_do: kinhDo,
        ban_kinh_km: boLocKhuVuc === 'gan_ban' ? banKinhKm : null,
        do_pho_bien: doPhoBien ?? null,
        tu_khoa: keyword || null,
      },
      phan_trang: {
        trang: currentPage,
        so_luong: pageSize,
      },
      ket_qua: {
        mon_an: monAn,
        cua_hang: cuaHang,
        bai_viet: baiViet,
        nguoi_dung: nguoiDung,
      },
    };
  }

  private async timMonAn(
    keyword: string,
    khuVuc: string,
    doPhoBien: string | undefined,
    skip: number,
    take: number,
    boLocKhuVuc?: string,
    viDo?: number | null,
    kinhDo?: number | null,
    banKinhKm?: number,
  ) {
    const qb = this.monAnRepo
      .createQueryBuilder('ma')
      .innerJoin(CuaHangEntity, 'ch', 'ch.id = ma.id_cua_hang')
      .where('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
      .andWhere('ch.trang_thai_hoat_dong = :trangThaiCH', {
        trangThaiCH: 'hoat_dong',
      });

    if (keyword) {
      qb.andWhere(
        '(ma.ten_mon LIKE :kw OR ma.mo_ta LIKE :kw OR ch.ten_cua_hang LIKE :kw)',
        { kw: `%${keyword}%` },
      );
    }
    if (khuVuc && boLocKhuVuc !== 'gan_ban') {
      qb.andWhere('(ch.khu_vuc LIKE :khuVuc OR ch.dia_chi_kinh_doanh LIKE :khuVuc)', {
        khuVuc: `%${khuVuc}%`,
      });
    }
    if (boLocKhuVuc === 'gan_ban' && viDo != null && kinhDo != null) {
      const distanceExpr = this.tinhKhoangCachKmExpr('ch');
      qb.andWhere('ch.vi_do IS NOT NULL AND ch.kinh_do IS NOT NULL')
        .andWhere(`${distanceExpr} <= :banKinhKm`, {
          viDo,
          kinhDo,
          banKinhKm: banKinhKm ?? 10,
        })
        .addSelect(`${distanceExpr}`, 'khoang_cach_km')
        .orderBy('khoang_cach_km', 'ASC');
    }

    if (boLocKhuVuc !== 'gan_ban' && doPhoBien === 'nhieu_luot_mua') {
      qb.orderBy('ma.so_luong_da_ban', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban' && doPhoBien === 'duoc_review_nhieu') {
      qb.orderBy('ma.tong_danh_gia', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban') {
      qb.addSelect(
        '(ma.so_luong_da_ban * 0.65 + ma.tong_danh_gia * 0.35)',
        'diem_pho_bien_mon',
      ).orderBy('diem_pho_bien_mon', 'DESC');
    }

    qb.addOrderBy('ma.id', 'DESC').skip(skip).take(take);

    const [items, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ten_mon: item.ten_mon,
        mo_ta: item.mo_ta,
        hinh_anh: item.hinh_anh_dai_dien,
        gia_ban: Number(item.gia_ban),
        diem_danh_gia: Number(item.diem_danh_gia),
        tong_danh_gia: Number(item.tong_danh_gia),
        so_luong_da_ban: Number(item.so_luong_da_ban),
        id_cua_hang: Number(item.id_cua_hang),
      })),
      tong_so: tongSo,
    };
  }

  private async timCuaHang(
    keyword: string,
    khuVuc: string,
    doPhoBien: string | undefined,
    skip: number,
    take: number,
    boLocKhuVuc?: string,
    viDo?: number | null,
    kinhDo?: number | null,
    banKinhKm?: number,
  ) {
    const qb = this.cuaHangRepo
      .createQueryBuilder('ch')
      .where('ch.trang_thai_hoat_dong = :trangThaiCH', {
        trangThaiCH: 'hoat_dong',
      });

    if (keyword) {
      qb.andWhere('(ch.ten_cua_hang LIKE :kw OR ch.mo_ta LIKE :kw)', {
        kw: `%${keyword}%`,
      });
    }
    if (khuVuc && boLocKhuVuc !== 'gan_ban') {
      qb.andWhere('(ch.khu_vuc LIKE :khuVuc OR ch.dia_chi_kinh_doanh LIKE :khuVuc)', {
        khuVuc: `%${khuVuc}%`,
      });
    }
    if (boLocKhuVuc === 'gan_ban' && viDo != null && kinhDo != null) {
      const distanceExpr = this.tinhKhoangCachKmExpr('ch');
      qb.andWhere('ch.vi_do IS NOT NULL AND ch.kinh_do IS NOT NULL')
        .andWhere(`${distanceExpr} <= :banKinhKm`, {
          viDo,
          kinhDo,
          banKinhKm: banKinhKm ?? 10,
        })
        .addSelect(`${distanceExpr}`, 'khoang_cach_km')
        .orderBy('khoang_cach_km', 'ASC');
    }

    if (boLocKhuVuc !== 'gan_ban' && doPhoBien === 'nhieu_luot_mua') {
      qb.orderBy('ch.tong_don_hang', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban' && doPhoBien === 'duoc_review_nhieu') {
      qb.orderBy('ch.diem_danh_gia', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban') {
      qb.addSelect(
        '(ch.tong_luot_xem * 0.6 + ch.tong_luot_thich * 0.4)',
        'diem_pho_bien_cua_hang',
      ).orderBy('diem_pho_bien_cua_hang', 'DESC');
    }

    qb.addOrderBy('ch.id', 'DESC').skip(skip).take(take);

    const [items, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ten_cua_hang: item.ten_cua_hang,
        slug: item.slug,
        mo_ta: item.mo_ta,
        anh_dai_dien: item.anh_dai_dien,
        dia_chi: item.dia_chi_kinh_doanh,
        khu_vuc: item.khu_vuc,
        diem_danh_gia: Number(item.diem_danh_gia),
        tong_don_hang: Number(item.tong_don_hang),
      })),
      tong_so: tongSo,
    };
  }

  private async timBaiViet(
    keyword: string,
    khuVuc: string,
    doPhoBien: string | undefined,
    skip: number,
    take: number,
    boLocKhuVuc?: string,
    viDo?: number | null,
    kinhDo?: number | null,
    banKinhKm?: number,
  ) {
    const qb = this.baiVietRepo
      .createQueryBuilder('bv')
      .innerJoin(NguoiDungEntity, 'nd', 'nd.id = bv.id_nguoi_dang')
      .leftJoin(CuaHangEntity, 'ch', 'ch.id = bv.id_cua_hang')
      .addSelect('nd.id', 'nd_id')
      .addSelect('nd.ten_hien_thi', 'nd_ten_hien_thi')
      .addSelect('nd.ten_dang_nhap', 'nd_ten_dang_nhap')
      .addSelect('nd.anh_dai_dien', 'nd_anh_dai_dien')
      .where('bv.trang_thai_duyet = :trangThai', { trangThai: 'hien_thi' })
      .andWhere('bv.muc_do_hien_thi = :mucDoHienThi', {
        mucDoHienThi: 'cong_khai',
      });

    if (keyword) {
      qb.andWhere(
        '(bv.noi_dung LIKE :kw OR nd.ten_hien_thi LIKE :kw OR ch.ten_cua_hang LIKE :kw)',
        { kw: `%${keyword}%` },
      );
    }
    if (khuVuc && boLocKhuVuc !== 'gan_ban') {
      qb.andWhere('(nd.khu_vuc LIKE :khuVuc OR ch.khu_vuc LIKE :khuVuc)', {
        khuVuc: `%${khuVuc}%`,
      });
    }
    if (boLocKhuVuc === 'gan_ban' && viDo != null && kinhDo != null) {
      const distanceExpr = this.tinhKhoangCachKmExpr('nd');
      qb.andWhere('nd.vi_do IS NOT NULL AND nd.kinh_do IS NOT NULL')
        .andWhere(`${distanceExpr} <= :banKinhKm`, {
          viDo,
          kinhDo,
          banKinhKm: banKinhKm ?? 10,
        })
        .addSelect(`${distanceExpr}`, 'khoang_cach_km')
        .orderBy('khoang_cach_km', 'ASC');
    }

    if (boLocKhuVuc !== 'gan_ban' && doPhoBien === 'duoc_review_nhieu') {
      qb.orderBy('bv.tong_luot_binh_luan', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban' && doPhoBien === 'nhieu_luot_mua') {
      qb.orderBy('bv.tong_luot_xem', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban') {
      qb.addSelect(
        '(bv.tong_luot_thich + bv.tong_luot_binh_luan * 2 + bv.tong_luot_chia_se * 3)',
        'diem_pho_bien_bai_viet',
      ).orderBy('diem_pho_bien_bai_viet', 'DESC');
    }

    qb.addOrderBy('bv.ngay_dang', 'DESC').skip(skip).take(take);

    const { entities: items, raw: rawItems } = await qb.getRawAndEntities();
    const tongSo = await qb.getCount();

    const postIds = items.map((item) => Number(item.id));
    const mediaByPost = await this.mapMediaByObject('bai_viet', postIds);
    const originalMap = await this.buildBaiVietGocMap(items as Array<{ id_bai_viet_goc?: number | null }>);

    return {
      du_lieu: items.map((item, index) => ({
        id: Number(item.id),
        loai_bai_viet: item.loai_bai_viet,
        noi_dung: item.noi_dung,
        tong_luot_xem: Number(item.tong_luot_xem),
        tong_luot_thich: Number(item.tong_luot_thich),
        tong_luot_binh_luan: Number(item.tong_luot_binh_luan),
        tong_luot_chia_se: Number(item.tong_luot_chia_se),
        tong_luot_luu: Number(item.tong_luot_luu),
        ngay_dang: item.ngay_dang,
        tep_dinh_kem: mediaByPost.get(Number(item.id)) ?? [],
        id_nguoi_dang: rawItems[index]?.nd_id != null ? Number(rawItems[index].nd_id) : null,
        ten_nguoi_dang: rawItems[index]?.nd_ten_hien_thi ?? null,
        ten_dang_nhap: rawItems[index]?.nd_ten_dang_nhap ?? null,
        anh_dai_dien: rawItems[index]?.nd_anh_dai_dien ?? null,
        id_bai_viet_goc:
          item.id_bai_viet_goc != null ? Number(item.id_bai_viet_goc) : null,
        bai_viet_goc:
          item.id_bai_viet_goc != null
            ? (originalMap.get(Number(item.id_bai_viet_goc)) ?? null)
            : null,
      })),
      tong_so: tongSo,
    };
  }

  private async timNguoiDung(
    keyword: string,
    khuVuc: string,
    doPhoBien: string | undefined,
    skip: number,
    take: number,
    boLocKhuVuc?: string,
    viDo?: number | null,
    kinhDo?: number | null,
    banKinhKm?: number,
  ) {
    const qb = this.nguoiDungRepo
      .createQueryBuilder('nd')
      .where('nd.trang_thai_tai_khoan = :trangThai', {
        trangThai: 'hoat_dong',
      });

    if (keyword) {
      qb.andWhere(
        '(nd.ten_hien_thi LIKE :kw OR nd.ten_dang_nhap LIKE :kw OR nd.email LIKE :kw)',
        { kw: `%${keyword}%` },
      );
    }
    if (khuVuc && boLocKhuVuc !== 'gan_ban') {
      qb.andWhere('(nd.khu_vuc LIKE :khuVuc OR nd.dia_chi LIKE :khuVuc)', {
        khuVuc: `%${khuVuc}%`,
      });
    }
    if (boLocKhuVuc === 'gan_ban' && viDo != null && kinhDo != null) {
      const distanceExpr = this.tinhKhoangCachKmExpr('nd');
      qb.andWhere('nd.vi_do IS NOT NULL AND nd.kinh_do IS NOT NULL')
        .andWhere(`${distanceExpr} <= :banKinhKm`, {
          viDo,
          kinhDo,
          banKinhKm: banKinhKm ?? 10,
        })
        .addSelect(`${distanceExpr}`, 'khoang_cach_km')
        .orderBy('khoang_cach_km', 'ASC');
    }

    if (
      boLocKhuVuc !== 'gan_ban' &&
      (doPhoBien === 'duoc_review_nhieu' || doPhoBien === 'dang_hot')
    ) {
      qb.orderBy('nd.diem_uy_tin', 'DESC');
    } else if (boLocKhuVuc !== 'gan_ban') {
      qb.orderBy('nd.ngay_tao', 'DESC');
    }

    qb.addOrderBy('nd.id', 'DESC').skip(skip).take(take);

    const [items, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ten_hien_thi: item.ten_hien_thi,
        ten_dang_nhap: item.ten_dang_nhap,
        anh_dai_dien: item.anh_dai_dien,
        khu_vuc: item.khu_vuc,
        diem_uy_tin: Number(item.diem_uy_tin),
      })),
      tong_so: tongSo,
    };
  }

  async layDanhGiaMonAn(idMonAn: number, trang?: number, soLuong?: number) {
    const monAn = await this.monAnRepo.findOne({ where: { id: idMonAn } });
    if (!monAn) {
      throw new NotFoundException('Món ăn không tồn tại');
    }

    const { currentPage, pageSize, skip } = this.parsePaging(trang, soLuong);

    const qb = this.danhGiaRepo
      .createQueryBuilder('dg')
      .leftJoinAndSelect('dg.nguoi_danh_gia', 'nd')
      .where('dg.id_mon_an = :idMonAn', { idMonAn })
      .orderBy('dg.ngay_tao', 'DESC')
      .addOrderBy('dg.id', 'DESC')
      .skip(skip)
      .take(pageSize);

    const [items, tongSo] = await qb.getManyAndCount();
    const reviewIds = items.map((item) => Number(item.id));
    const mediaByReview = await this.mapMediaByObject('danh_gia', reviewIds);

    const aggregate = await this.danhGiaRepo
      .createQueryBuilder('dg')
      .select('COUNT(dg.id)', 'tong')
      .addSelect('COALESCE(AVG(dg.so_sao), 0)', 'trung_binh')
      .where('dg.id_mon_an = :idMonAn', { idMonAn })
      .getRawOne<{ tong: string; trung_binh: string }>();

    return {
      mon_an: {
        id: Number(monAn.id),
        ten_mon: monAn.ten_mon,
        hinh_anh: monAn.hinh_anh_dai_dien,
      },
      thong_ke: {
        diem_trung_binh: Number(aggregate?.trung_binh ?? 0),
        tong_so_danh_gia: Number(aggregate?.tong ?? 0),
      },
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        id_nguoi_dung: item.an_danh ? null : (Number(item.nguoi_danh_gia?.id) || null),
        ten_nguoi_danh_gia: item.an_danh
          ? 'Người dùng ẩn danh'
          : item.nguoi_danh_gia?.ten_hien_thi ?? 'Người dùng',
        anh_nguoi_danh_gia: item.an_danh
          ? null
          : item.nguoi_danh_gia?.anh_dai_dien ?? null,
        so_sao: Number(item.so_sao),
        noi_dung: item.noi_dung,
        tong_luot_thich: Number(item.tong_luot_thich),
        ngay_danh_gia: item.ngay_tao,
        tep_dinh_kem: mediaByReview.get(Number(item.id)) ?? [],
      })),
      tong_so: tongSo,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(tongSo / pageSize),
    };
  }

  async layChiTietDanhGia(idDanhGia: number) {
    const danhGia = await this.danhGiaRepo.findOne({
      where: { id: idDanhGia },
      relations: { nguoi_danh_gia: true, mon_an: true },
    });

    if (!danhGia) {
      throw new NotFoundException('Đánh giá không tồn tại');
    }

    const mediaByReview = await this.mapMediaByObject('danh_gia', [idDanhGia]);

    return {
      id: Number(danhGia.id),
      id_mon_an: danhGia.id_mon_an ? Number(danhGia.id_mon_an) : null,
      ten_mon: danhGia.mon_an?.ten_mon ?? null,
      ten_nguoi_danh_gia: danhGia.an_danh
        ? 'Người dùng ẩn danh'
        : danhGia.nguoi_danh_gia?.ten_hien_thi ?? 'Người dùng',
      anh_nguoi_danh_gia: danhGia.an_danh
        ? null
        : danhGia.nguoi_danh_gia?.anh_dai_dien ?? null,
      so_sao: Number(danhGia.so_sao),
      noi_dung: danhGia.noi_dung,
      tong_luot_thich: Number(danhGia.tong_luot_thich),
      ngay_danh_gia: danhGia.ngay_tao,
      tep_dinh_kem: mediaByReview.get(idDanhGia) ?? [],
    };
  }

  async toggleLuuDanhGia(idDanhGia: number, idNguoiDung: number) {
    const danhGia = await this.danhGiaRepo.findOne({ where: { id: idDanhGia } });
    if (!danhGia) {
      throw new NotFoundException('Đánh giá không tồn tại');
    }

    const existed = await this.danhGiaDaLuuRepo.findOne({
      where: { id_danh_gia: idDanhGia, id_nguoi_dung: idNguoiDung },
    });

    if (existed) {
      await this.danhGiaDaLuuRepo.delete({ id: existed.id });
      return {
        da_luu: false,
        hanh_dong: 'bo_luu_danh_gia',
      };
    }

    await this.danhGiaDaLuuRepo.save({
      id_danh_gia: idDanhGia,
      id_nguoi_dung: idNguoiDung,
      ngay_tao: new Date(),
    });
    return {
      da_luu: true,
      hanh_dong: 'luu_danh_gia',
    };
  }

  async layDanhGiaDaLuu(idNguoiDung: number, trang?: number, soLuong?: number) {
    const { currentPage, pageSize, skip } = this.parsePaging(trang, soLuong);

    const [savedRows, tongSo] = await this.danhGiaDaLuuRepo
      .createQueryBuilder('luu')
      .where('luu.id_nguoi_dung = :idNguoiDung', { idNguoiDung })
      .orderBy('luu.ngay_tao', 'DESC')
      .addOrderBy('luu.id', 'DESC')
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    const reviewIds = savedRows.map((item) => Number(item.id_danh_gia));
    if (reviewIds.length === 0) {
      return {
        du_lieu: [],
        tong_so: 0,
        trang: currentPage,
        so_luong: pageSize,
        tong_trang: 0,
      };
    }

    const danhGiaList = await this.danhGiaRepo.find({
      where: reviewIds.map((id) => ({ id })),
      relations: { nguoi_danh_gia: true, mon_an: true },
    });
    const byId = new Map(danhGiaList.map((item) => [Number(item.id), item]));
    const mediaByReview = await this.mapMediaByObject('danh_gia', reviewIds);

    return {
      du_lieu: savedRows
        .map((saved) => {
          const dg = byId.get(Number(saved.id_danh_gia));
          if (!dg) return null;
          return {
            id: Number(dg.id),
            da_luu_luc: saved.ngay_tao,
            id_mon_an: dg.id_mon_an ? Number(dg.id_mon_an) : null,
            ten_mon: dg.mon_an?.ten_mon ?? null,
            ten_nguoi_danh_gia: dg.an_danh
              ? 'Người dùng ẩn danh'
              : dg.nguoi_danh_gia?.ten_hien_thi ?? 'Người dùng',
            so_sao: Number(dg.so_sao),
            noi_dung: dg.noi_dung,
            tong_luot_thich: Number(dg.tong_luot_thich),
            ngay_danh_gia: dg.ngay_tao,
            tep_dinh_kem: mediaByReview.get(Number(dg.id)) ?? [],
          };
        })
        .filter((item) => item != null),
      tong_so: tongSo,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(tongSo / pageSize),
    };
  }

  private async layQuyenXemTrangCaNhan(
    idNguoiDung: number,
    idNguoiXem?: number,
  ) {
    const isOwner = idNguoiXem != null && Number(idNguoiXem) === Number(idNguoiDung);
    if (isOwner) {
      return { isOwner: true, isFollower: true };
    }

    if (!idNguoiXem) {
      return { isOwner: false, isFollower: false };
    }

    const relationCount = await this.quanHeNguoiDungRepo.count({
      where: {
        id_nguoi_tao_quan_he: idNguoiXem,
        id_nguoi_nhan_quan_he: idNguoiDung,
        loai_quan_he: 'theo_doi',
        trang_thai: 'hieu_luc',
      },
    });

    return { isOwner: false, isFollower: relationCount > 0 };
  }

  async layThongTinTrangCaNhan(idNguoiDung: number, idNguoiXem?: number) {
    const user = await this.nguoiDungRepo.findOne({
      where: { id: idNguoiDung },
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const { isOwner, isFollower } = await this.layQuyenXemTrangCaNhan(
      idNguoiDung,
      idNguoiXem,
    );
    const biHanCheDoRiengTu =
      Boolean(user.la_tai_khoan_rieng_tu) && !isOwner && !isFollower;

    const soBaiVietPromise = biHanCheDoRiengTu
      ? Promise.resolve(0)
      : (() => {
          const qb = this.baiVietRepo
            .createQueryBuilder('bv')
            .where('bv.id_nguoi_dang = :idNguoiDung', { idNguoiDung })
            .andWhere('bv.trang_thai_duyet = :trangThai', {
              trangThai: 'hien_thi',
            });

          if (!isOwner && isFollower) {
            qb.andWhere('bv.muc_do_hien_thi IN (:...mucDo)', {
              mucDo: ['cong_khai', 'nguoi_theo_doi'],
            });
          } else if (!isOwner) {
            qb.andWhere('bv.muc_do_hien_thi = :mucDo', { mucDo: 'cong_khai' });
          }

          return qb.getCount();
        })();

    const [soBaiViet, soNguoiTheoDoi, soDangTheoDoi] = await Promise.all([
      soBaiVietPromise,
      this.quanHeNguoiDungRepo.count({
        where: {
          id_nguoi_nhan_quan_he: idNguoiDung,
          loai_quan_he: 'theo_doi',
          trang_thai: 'hieu_luc',
        },
      }),
      this.quanHeNguoiDungRepo.count({
        where: {
          id_nguoi_tao_quan_he: idNguoiDung,
          loai_quan_he: 'theo_doi',
          trang_thai: 'hieu_luc',
        },
      }),
    ]);

    let thongTinKiemTien: unknown = null;
    if (isOwner && (user.la_nha_sang_tao || user.trang_thai_kiem_tien_noi_dung === 'da_duyet')) {
      const [tongHoaHongRaw, homNayHoaHongRaw, monetizedPosts, clicksTodayRaw, clicksTotalRaw, payoutAccounts, withdrawalRows] = await Promise.all([
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COALESCE(SUM(dh.hoa_hong_nha_sang_tao), 0)', 'total')
          .where('dh.id_nha_sang_tao_nguon = :userId', { userId: idNguoiDung })
          .andWhere('dh.trang_thai_don_hang = :status', { status: 'da_giao' })
          .getRawOne<{ total: string }>(),
        this.donHangRepo
          .createQueryBuilder('dh')
          .select('COALESCE(SUM(dh.hoa_hong_nha_sang_tao), 0)', 'total')
          .where('dh.id_nha_sang_tao_nguon = :userId', { userId: idNguoiDung })
          .andWhere('dh.trang_thai_don_hang = :status', { status: 'da_giao' })
          .andWhere('DATE(dh.thoi_gian_hoan_tat) = CURDATE()')
          .getRawOne<{ total: string }>(),
        this.baiVietRepo.find({
          where: { id_nguoi_dang: idNguoiDung, bat_kiem_tien: true, trang_thai_duyet: 'hien_thi' },
          order: { ngay_dang: 'DESC', id: 'DESC' },
          take: 50,
        }),
        this.luotNhanLinkBaiVietRepo
          .createQueryBuilder('ln')
          .innerJoin(BaiVietEntity, 'bv', 'bv.id = ln.id_bai_viet')
          .select('COUNT(ln.id)', 'total')
          .where('bv.id_nguoi_dang = :userId', { userId: idNguoiDung })
          .andWhere('DATE(ln.ngay_tao) = CURDATE()')
          .getRawOne<{ total: string }>(),
        this.luotNhanLinkBaiVietRepo
          .createQueryBuilder('ln')
          .innerJoin(BaiVietEntity, 'bv', 'bv.id = ln.id_bai_viet')
          .select('COUNT(ln.id)', 'total')
          .where('bv.id_nguoi_dang = :userId', { userId: idNguoiDung })
          .getRawOne<{ total: string }>(),
        this.taiKhoanRutTienRepo.find({
          where: { id_nguoi_dung: idNguoiDung, trang_thai: 'hieu_luc' },
          order: { la_mac_dinh: 'DESC', id: 'DESC' },
        }),
        this.yeuCauRutTienRepo.find({
          where: { id_nguoi_dung: idNguoiDung },
          order: { thoi_gian_yeu_cau: 'DESC', id: 'DESC' },
          take: 50,
        }),
      ]);

      let payoutAccountsResolved = payoutAccounts;
      if (payoutAccountsResolved.length === 0) {
        const latestApproved = await this.yeuCauNangCapRepo.findOne({
          where: {
            id_nguoi_gui: idNguoiDung,
            loai_yeu_cau: 'kiem_tien_noi_dung',
            trang_thai: 'da_duyet',
          },
          order: { thoi_gian_xu_ly: 'DESC', id: 'DESC' },
        });
        if (latestApproved?.ly_do_yeu_cau) {
          try {
            const parsed = JSON.parse(latestApproved.ly_do_yeu_cau) as {
              ngan_hang?: string;
              so_tai_khoan_ngan_hang?: string;
              ten_tai_khoan?: string;
            };
            if (parsed.ngan_hang && parsed.so_tai_khoan_ngan_hang) {
              const created = await this.taiKhoanRutTienRepo.save({
                id_nguoi_dung: idNguoiDung,
                ten_ngan_hang: parsed.ngan_hang,
                so_tai_khoan: parsed.so_tai_khoan_ngan_hang,
                ten_chu_tai_khoan: parsed.ten_tai_khoan || user.ten_hien_thi || 'Người dùng',
                la_mac_dinh: true,
                trang_thai: 'hieu_luc',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date(),
              });
              payoutAccountsResolved = [created];
            }
          } catch {
            // Ignore malformed legacy payload; user can add account later.
          }
        }
      }

      const tongHoaHong = Number(tongHoaHongRaw?.total ?? 0);
      const hoaHongHomNay = Number(homNayHoaHongRaw?.total ?? 0);
      const tongLuotNhanLink = Number(clicksTotalRaw?.total ?? 0);
      const luotNhanLinkHomNay = Number(clicksTodayRaw?.total ?? 0);
      const tongLuotXemMonetized = monetizedPosts.reduce(
        (sum, item) => sum + Number(item.tong_luot_xem ?? 0),
        0,
      );
      const ctr = tongLuotXemMonetized > 0
        ? (tongLuotNhanLink / tongLuotXemMonetized) * 100
        : 0;

      const dangXuLy = withdrawalRows
        .filter((item) => item.trang_thai === 'dang_xu_ly')
        .reduce((sum, item) => sum + Number(item.so_tien), 0);
      const daRutThanhCong = withdrawalRows
        .filter((item) => item.trang_thai === 'da_hoan_thanh')
        .reduce((sum, item) => sum + Number(item.so_tien), 0);
      const soDuKhaDung = Math.max(0, tongHoaHong - dangXuLy - daRutThanhCong);

      thongTinKiemTien = {
        trang_thai_kiem_tien: user.trang_thai_kiem_tien_noi_dung || (user.la_nha_sang_tao ? 'da_duyet' : 'chua_dang_ky'),
        thong_ke: {
          doanh_thu_hom_nay: hoaHongHomNay,
          tong_bai_kiem_tien: monetizedPosts.length,
          ty_le_nhan_link: Number(ctr.toFixed(2)),
          tong_doanh_thu_tich_luy: tongHoaHong,
          luot_nhan_link_hom_nay: luotNhanLinkHomNay,
          tong_luot_nhan_link: tongLuotNhanLink,
        },
        tong_quan_rut_tien: {
          so_du_kha_dung: soDuKhaDung,
          so_tien_dang_xu_ly: dangXuLy,
          tong_da_rut_thanh_cong: daRutThanhCong,
        },
        tai_khoan_rut_tien: payoutAccountsResolved.map((acc) => ({
          id: Number(acc.id),
          ten_ngan_hang: acc.ten_ngan_hang,
          so_tai_khoan: acc.so_tai_khoan,
          ten_chu_tai_khoan: acc.ten_chu_tai_khoan,
          la_mac_dinh: Boolean(acc.la_mac_dinh),
        })),
        lich_su_rut_tien: withdrawalRows.map((row) => ({
          id: Number(row.id),
          ma_yeu_cau: row.ma_yeu_cau,
          so_tien: Number(row.so_tien),
          trang_thai: row.trang_thai,
          ly_do_tu_choi: row.ly_do_tu_choi,
          thoi_gian_yeu_cau: row.thoi_gian_yeu_cau,
          thoi_gian_xu_ly: row.thoi_gian_xu_ly,
        })),
      };
    }

    return {
      thong_tin_co_ban: {
        id: Number(user.id),
        anh_dai_dien: user.anh_dai_dien,
        ten_hien_thi: user.ten_hien_thi,
        ten_tai_khoan: user.ten_dang_nhap,
        mo_ta_ca_nhan: user.tieu_su,
        so_bai_viet: soBaiViet,
        so_nguoi_theo_doi: soNguoiTheoDoi,
        so_nguoi_dang_theo_doi: soDangTheoDoi,
        la_tai_khoan_rieng_tu: Boolean(user.la_tai_khoan_rieng_tu),
        noi_dung_bi_han_che: biHanCheDoRiengTu,
      },
      thong_tin_kiem_tien_noi_dung: thongTinKiemTien,
      tabs: [
        { key: 'bai_viet', label: 'Bài viết' },
        { key: 'video', label: 'Video' },
        { key: 'bai_dang_lai', label: 'Bài đăng lại' },
      ],
      yeu_cau_dang_nhap_de_tuong_tac: [
        'theo_doi_nguoi_dung',
        'nhan_tin',
        'bao_cao',
        'chan_nguoi_dung',
      ],
    };
  }

  async layNoiDungTrangCaNhan(
    idNguoiDung: number,
    query: NoiDungTrangCaNhanQueryDto,
    idNguoiXem?: number,
  ) {
    const user = await this.nguoiDungRepo.findOne({
      where: { id: idNguoiDung },
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const { isOwner, isFollower } = await this.layQuyenXemTrangCaNhan(
      idNguoiDung,
      idNguoiXem,
    );
    if (Boolean(user.la_tai_khoan_rieng_tu) && !isOwner && !isFollower) {
      return {
        tab: query.tab ?? 'bai_viet',
        du_lieu: [],
        tong_so: 0,
        trang: this.parsePaging(query.trang, query.so_luong).currentPage,
        so_luong: this.parsePaging(query.trang, query.so_luong).pageSize,
        tong_trang: 0,
        thong_bao: 'Tài khoản riêng tư. Theo dõi để xem nội dung.',
      };
    }

    const tab = query.tab ?? 'bai_viet';
    const { currentPage, pageSize, skip } = this.parsePaging(
      query.trang,
      query.so_luong,
    );

    const qb = this.baiVietRepo
      .createQueryBuilder('bv')
      .where('bv.id_nguoi_dang = :idNguoiDung', { idNguoiDung })
      .andWhere('bv.trang_thai_duyet = :trangThai', { trangThai: 'hien_thi' });

    if (!isOwner && isFollower) {
      qb.andWhere('bv.muc_do_hien_thi IN (:...mucDo)', {
        mucDo: ['cong_khai', 'nguoi_theo_doi'],
      });
    } else if (!isOwner) {
      qb.andWhere('bv.muc_do_hien_thi = :mucDo', { mucDo: 'cong_khai' });
    }

    if (tab === 'video') {
      qb.andWhere('bv.loai_bai_viet = :loai', { loai: 'video' });
    } else if (tab === 'bai_dang_lai') {
      qb.andWhere('bv.loai_bai_viet = :loai', { loai: 'repost' });
    } else {
      qb.andWhere('bv.loai_bai_viet IN (:...loai)', {
        loai: ['bai_viet', 'review', 'khuyen_mai'],
      });
    }

    qb.orderBy('bv.ngay_dang', 'DESC')
      .addOrderBy('bv.id', 'DESC')
      .skip(skip)
      .take(pageSize);

    const [items, tongSo] = await qb.getManyAndCount();
    const postIds = items.map((item) => Number(item.id));
    const mediaByPost = await this.mapMediaByObject('bai_viet', postIds);
    const originalMap = await this.buildBaiVietGocMap(items as Array<{ id_bai_viet_goc?: number | null }>);

    return {
      tab,
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        loai_bai_viet: item.loai_bai_viet,
        noi_dung: item.noi_dung,
        muc_do_hien_thi: item.muc_do_hien_thi,
        bat_kiem_tien: Boolean(item.bat_kiem_tien),
        link_mon_an: item.link_mon_an,
        id_mon_an: item.id_mon_an != null ? Number(item.id_mon_an) : null,
        tong_luot_thich: Number(item.tong_luot_thich),
        tong_luot_binh_luan: Number(item.tong_luot_binh_luan),
        tong_luot_chia_se: Number(item.tong_luot_chia_se),
        ngay_dang: item.ngay_dang,
        tep_dinh_kem: mediaByPost.get(Number(item.id)) ?? [],
        id_bai_viet_goc:
          item.id_bai_viet_goc != null ? Number(item.id_bai_viet_goc) : null,
        bai_viet_goc:
          item.id_bai_viet_goc != null
            ? (originalMap.get(Number(item.id_bai_viet_goc)) ?? null)
            : null,
      })),
      tong_so: tongSo,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(tongSo / pageSize),
    };
  }

  async layThongTinChinhSuaTrangCaNhan(idNguoiDung: number) {
    const user = await this.nguoiDungRepo.findOne({
      where: { id: idNguoiDung },
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    return {
      id: Number(user.id),
      anh_dai_dien: user.anh_dai_dien,
      ten_tai_khoan: user.ten_dang_nhap,
      ten_hien_thi: user.ten_hien_thi,
      so_dien_thoai: user.so_dien_thoai,
      dia_chi: user.dia_chi,
      gioi_tinh: user.gioi_tinh,
      ngay_sinh: user.ngay_sinh,
      tieu_su: user.tieu_su,
      cho_hien_thi_huy_hieu: Boolean(user.cho_hien_thi_huy_hieu),
      cho_hien_thi_diem_uy_tin: Boolean(user.cho_hien_thi_diem_uy_tin),
      la_tai_khoan_rieng_tu: Boolean(user.la_tai_khoan_rieng_tu),
    };
  }

  async chinhSuaTrangCaNhan(
    idNguoiDung: number,
    dto: ChinhSuaTrangCaNhanDto,
  ) {
    const user = await this.nguoiDungRepo.findOne({
      where: { id: idNguoiDung },
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    if (dto.ten_dang_nhap != null) {
      const tenDangNhapMoi = dto.ten_dang_nhap.trim();
      if (!tenDangNhapMoi) {
        throw new BadRequestException('Tên tài khoản không được để trống');
      }

      const existed = await this.nguoiDungRepo.findOne({
        where: { ten_dang_nhap: tenDangNhapMoi },
      });
      if (existed && Number(existed.id) !== idNguoiDung) {
        throw new ConflictException('Tên tài khoản đã tồn tại');
      }

      user.ten_dang_nhap = tenDangNhapMoi;
    }

    if (dto.ten_hien_thi != null) {
      const tenHienThi = dto.ten_hien_thi.trim();
      if (!tenHienThi) {
        throw new BadRequestException('Tên hiển thị không được để trống');
      }
      user.ten_hien_thi = tenHienThi;
    }

    if (dto.anh_dai_dien != null) {
      user.anh_dai_dien = dto.anh_dai_dien.trim() || null;
    }

    if (dto.gioi_tinh != null) {
      user.gioi_tinh = dto.gioi_tinh;
    }

    if (dto.ngay_sinh != null) {
      const ngaySinh = new Date(dto.ngay_sinh);
      if (Number.isNaN(ngaySinh.getTime())) {
        throw new BadRequestException('Ngày sinh không hợp lệ');
      }
      user.ngay_sinh = ngaySinh;
    }

    if (dto.tieu_su != null) {
      user.tieu_su = dto.tieu_su.trim() || null;
    }

    if (dto.so_dien_thoai != null) {
      const soDienThoai = dto.so_dien_thoai.trim();
      if (!soDienThoai) {
        user.so_dien_thoai = null;
      } else {
        const existed = await this.nguoiDungRepo.findOne({
          where: { so_dien_thoai: soDienThoai },
        });
        if (existed && Number(existed.id) !== idNguoiDung) {
          throw new ConflictException('Số điện thoại đã được sử dụng');
        }
        user.so_dien_thoai = soDienThoai;
      }
    }

    if (dto.dia_chi != null) {
      user.dia_chi = dto.dia_chi.trim() || null;
    }

    if (dto.cho_hien_thi_huy_hieu != null) {
      user.cho_hien_thi_huy_hieu = dto.cho_hien_thi_huy_hieu;
    }

    if (dto.cho_hien_thi_diem_uy_tin != null) {
      user.cho_hien_thi_diem_uy_tin = dto.cho_hien_thi_diem_uy_tin;
    }

    if (dto.la_tai_khoan_rieng_tu != null) {
      user.la_tai_khoan_rieng_tu = dto.la_tai_khoan_rieng_tu;
    }

    const saved = await this.nguoiDungRepo.save(user);

    return {
      id: Number(saved.id),
      anh_dai_dien: saved.anh_dai_dien,
      ten_tai_khoan: saved.ten_dang_nhap,
      ten_hien_thi: saved.ten_hien_thi,
      gioi_tinh: saved.gioi_tinh,
      ngay_sinh: saved.ngay_sinh,
      tieu_su: saved.tieu_su,
      cho_hien_thi_huy_hieu: Boolean(saved.cho_hien_thi_huy_hieu),
      cho_hien_thi_diem_uy_tin: Boolean(saved.cho_hien_thi_diem_uy_tin),
      la_tai_khoan_rieng_tu: Boolean(saved.la_tai_khoan_rieng_tu),
    };
  }

  async layBangXepHangMini(query: BangXepHangMiniQueryDto) {
    const soLuong = Math.min(Math.max(Number(query.so_luong) || 3, 1), 10);
    const baseQuery: BangXepHangChiTietQueryDto = {
      trang: 1,
      so_luong: soLuong,
    };

    const [cuaHang, reviewer, monAn] = await Promise.all([
      this.layXepHangCuaHang(baseQuery),
      this.layXepHangReviewer(baseQuery),
      this.layXepHangMonAn(baseQuery),
    ]);

    return {
      cua_hang: cuaHang.du_lieu,
      reviewer: reviewer.du_lieu,
      mon_an: monAn.du_lieu,
    };
  }

  async layBangXepHangChiTiet(query: BangXepHangChiTietQueryDto) {
    const tab = query.tab ?? 'cua_hang';
    const data =
      tab === 'reviewer'
        ? await this.layXepHangReviewer(query)
        : tab === 'mon_an'
          ? await this.layXepHangMonAn(query)
          : await this.layXepHangCuaHang(query);

    return {
      tab,
      bo_loc: {
        tu_khoa: query.tu_khoa?.trim() || null,
        khu_vuc: query.khu_vuc?.trim() || null,
        so_don_hang_tu: query.so_don_hang_tu ?? null,
        diem_danh_gia_tu: query.diem_danh_gia_tu ?? null,
        trang_thai: query.trang_thai ?? null,
        ty_le_huy_toi_da: query.ty_le_huy_toi_da ?? null,
      },
      ...data,
    };
  }

  private async layXepHangCuaHang(query: BangXepHangChiTietQueryDto) {
    const { currentPage, pageSize, skip } = this.parsePaging(
      query.trang,
      query.so_luong,
    );
    const qb = this.cuaHangRepo
      .createQueryBuilder('ch')
      .where('ch.trang_thai_hoat_dong != :daXoa', { daXoa: 'da_xoa' });

    if (query.tu_khoa?.trim()) {
      qb.andWhere('(ch.ten_cua_hang LIKE :kw OR ch.mo_ta LIKE :kw)', {
        kw: `%${query.tu_khoa.trim()}%`,
      });
    }
    if (query.khu_vuc?.trim()) {
      qb.andWhere('(ch.khu_vuc LIKE :khuVuc OR ch.dia_chi_kinh_doanh LIKE :khuVuc)', {
        khuVuc: `%${query.khu_vuc.trim()}%`,
      });
    }
    if (query.trang_thai) {
      qb.andWhere('ch.trang_thai_hoat_dong = :trangThai', {
        trangThai: query.trang_thai,
      });
    }
    if (query.diem_danh_gia_tu != null) {
      qb.andWhere('ch.diem_danh_gia >= :minRate', {
        minRate: Number(query.diem_danh_gia_tu),
      });
    }

    qb.orderBy('ch.diem_danh_gia', 'DESC').addOrderBy('ch.tong_don_hang', 'DESC');
    const [stores, _] = await qb.getManyAndCount();
    if (stores.length === 0) {
      return {
        du_lieu: [],
        tong_so: 0,
        trang: currentPage,
        so_luong: pageSize,
        tong_trang: 0,
      };
    }

    const storeIds = stores.map((s) => Number(s.id));
    const donHangAgg = await this.donHangRepo
      .createQueryBuilder('dh')
      .select('dh.id_cua_hang', 'id_cua_hang')
      .addSelect('COUNT(dh.id)', 'tong_don')
      .addSelect(
        "SUM(CASE WHEN dh.trang_thai_don_hang = 'da_huy' THEN 1 ELSE 0 END)",
        'tong_huy',
      )
      .where('dh.id_cua_hang IN (:...storeIds)', { storeIds })
      .groupBy('dh.id_cua_hang')
      .getRawMany<{ id_cua_hang: string; tong_don: string; tong_huy: string }>();
    const aggMap = new Map(
      donHangAgg.map((a) => [
        Number(a.id_cua_hang),
        { tongDon: Number(a.tong_don), tongHuy: Number(a.tong_huy) },
      ]),
    );

    const mapped = stores.map((item) => {
      const agg = aggMap.get(Number(item.id)) ?? { tongDon: 0, tongHuy: 0 };
      const tyLeHuy = agg.tongDon > 0 ? (agg.tongHuy * 100) / agg.tongDon : 0;
      return {
        id: Number(item.id),
        ten_cua_hang: item.ten_cua_hang,
        diem_danh_gia: Number(item.diem_danh_gia),
        so_don_hang: agg.tongDon || Number(item.tong_don_hang || 0),
        ty_le_huy_don: Number(tyLeHuy.toFixed(2)),
        trang_thai: item.trang_thai_hoat_dong,
      };
    });

    const filtered = mapped.filter((item) => {
      if (query.so_don_hang_tu != null && item.so_don_hang < Number(query.so_don_hang_tu)) {
        return false;
      }
      if (query.ty_le_huy_toi_da != null && item.ty_le_huy_don > Number(query.ty_le_huy_toi_da)) {
        return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (b.diem_danh_gia !== a.diem_danh_gia) {
        return b.diem_danh_gia - a.diem_danh_gia;
      }
      if (b.so_don_hang !== a.so_don_hang) {
        return b.so_don_hang - a.so_don_hang;
      }
      return a.ty_le_huy_don - b.ty_le_huy_don;
    });

    const total = filtered.length;
    const paged = filtered.slice(skip, skip + pageSize).map((item, index) => ({
      ...item,
      xep_hang: skip + index + 1,
    }));

    return {
      du_lieu: paged,
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  private async layXepHangReviewer(query: BangXepHangChiTietQueryDto) {
    const { currentPage, pageSize, skip } = this.parsePaging(
      query.trang,
      query.so_luong,
    );

    const qb = this.nguoiDungRepo
      .createQueryBuilder('nd')
      .where('nd.trang_thai_tai_khoan = :trangThai', { trangThai: 'hoat_dong' })
      .andWhere('nd.la_nha_sang_tao = :isReviewer', { isReviewer: true });

    if (query.tu_khoa?.trim()) {
      qb.andWhere('(nd.ten_hien_thi LIKE :kw OR nd.ten_dang_nhap LIKE :kw)', {
        kw: `%${query.tu_khoa.trim()}%`,
      });
    }
    if (query.khu_vuc?.trim()) {
      qb.andWhere('(nd.khu_vuc LIKE :khuVuc OR nd.dia_chi LIKE :khuVuc)', {
        khuVuc: `%${query.khu_vuc.trim()}%`,
      });
    }

    const users = await qb.getMany();
    if (users.length === 0) {
      return {
        du_lieu: [],
        tong_so: 0,
        trang: currentPage,
        so_luong: pageSize,
        tong_trang: 0,
      };
    }

    const userIds = users.map((u) => Number(u.id));
    const postAgg = await this.baiVietRepo
      .createQueryBuilder('bv')
      .select('bv.id_nguoi_dang', 'id_nguoi_dang')
      .addSelect('SUM(bv.tong_luot_xem)', 'luot_xem')
      .addSelect('SUM(bv.tong_luot_thich)', 'luot_thich')
      .addSelect('SUM(bv.tong_luot_binh_luan)', 'luot_binh_luan')
      .where('bv.id_nguoi_dang IN (:...userIds)', { userIds })
      .andWhere('bv.trang_thai_duyet = :trangThai', { trangThai: 'hien_thi' })
      .groupBy('bv.id_nguoi_dang')
      .getRawMany<{
        id_nguoi_dang: string;
        luot_xem: string;
        luot_thich: string;
        luot_binh_luan: string;
      }>();
    const aggMap = new Map(
      postAgg.map((a) => [
        Number(a.id_nguoi_dang),
        {
          luotXem: Number(a.luot_xem || 0),
          luotThich: Number(a.luot_thich || 0),
          luotBinhLuan: Number(a.luot_binh_luan || 0),
        },
      ]),
    );

    const mapped = users.map((item) => {
      const agg = aggMap.get(Number(item.id)) ?? {
        luotXem: 0,
        luotThich: 0,
        luotBinhLuan: 0,
      };
      return {
        id: Number(item.id),
        ten_reviewer: item.ten_hien_thi,
        do_tin_cay: Number(item.diem_uy_tin),
        luot_xem: agg.luotXem,
        luot_thich: agg.luotThich,
        luot_binh_luan: agg.luotBinhLuan,
      };
    });

    if (query.diem_danh_gia_tu != null) {
      const min = Number(query.diem_danh_gia_tu);
      mapped.splice(
        0,
        mapped.length,
        ...mapped.filter((item) => item.do_tin_cay >= min),
      );
    }

    mapped.sort((a, b) => {
      if (b.do_tin_cay !== a.do_tin_cay) return b.do_tin_cay - a.do_tin_cay;
      if (b.luot_xem !== a.luot_xem) return b.luot_xem - a.luot_xem;
      if (b.luot_thich !== a.luot_thich) return b.luot_thich - a.luot_thich;
      return b.luot_binh_luan - a.luot_binh_luan;
    });

    const total = mapped.length;
    const paged = mapped.slice(skip, skip + pageSize).map((item, index) => ({
      ...item,
      xep_hang: skip + index + 1,
    }));

    return {
      du_lieu: paged,
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  private async layXepHangMonAn(query: BangXepHangChiTietQueryDto) {
    const { currentPage, pageSize, skip } = this.parsePaging(
      query.trang,
      query.so_luong,
    );

    const qb = this.monAnRepo
      .createQueryBuilder('ma')
      .innerJoin(CuaHangEntity, 'ch', 'ch.id = ma.id_cua_hang')
      .where('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
      .andWhere('ch.trang_thai_hoat_dong = :trangThaiCH', {
        trangThaiCH: 'hoat_dong',
      });

    if (query.tu_khoa?.trim()) {
      qb.andWhere('(ma.ten_mon LIKE :kw OR ch.ten_cua_hang LIKE :kw)', {
        kw: `%${query.tu_khoa.trim()}%`,
      });
    }
    if (query.khu_vuc?.trim()) {
      qb.andWhere('(ch.khu_vuc LIKE :khuVuc OR ch.dia_chi_kinh_doanh LIKE :khuVuc)', {
        khuVuc: `%${query.khu_vuc.trim()}%`,
      });
    }
    if (query.diem_danh_gia_tu != null) {
      qb.andWhere('ma.diem_danh_gia >= :minRate', {
        minRate: Number(query.diem_danh_gia_tu),
      });
    }

    qb.orderBy('ma.so_luong_da_ban', 'DESC')
      .addOrderBy('ma.diem_danh_gia', 'DESC')
      .addOrderBy('ma.id', 'DESC');

    const [items, totalRaw] = await qb.getManyAndCount();
    const storeIds = [...new Set(items.map((item) => Number(item.id_cua_hang)))];
    const stores =
      storeIds.length > 0
        ? await this.cuaHangRepo.findBy(storeIds.map((id) => ({ id })))
        : [];
    const storeMap = new Map(stores.map((s) => [Number(s.id), s.ten_cua_hang]));

    const filtered = query.so_don_hang_tu != null
      ? items.filter((item) => Number(item.so_luong_da_ban) >= Number(query.so_don_hang_tu))
      : items;

    const total = filtered.length;
    const paged = filtered.slice(skip, skip + pageSize).map((item, index) => ({
      xep_hang: skip + index + 1,
      id: Number(item.id),
      ten_mon_an: item.ten_mon,
      ten_cua_hang: storeMap.get(Number(item.id_cua_hang)) ?? 'Cửa hàng',
      diem_danh_gia: Number(item.diem_danh_gia),
      so_luong_da_ban: Number(item.so_luong_da_ban),
      hinh_anh: item.hinh_anh_dai_dien,
    }));

    return {
      du_lieu: paged,
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  async layTrangThaiTuongTacNguoiDung(idNguoiDung: number, idNguoiXem: number) {
    if (idNguoiDung === idNguoiXem) {
      throw new BadRequestException('Không thể tương tác với chính tài khoản của bạn');
    }

    const target = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!target) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const [dangTheoDoi, daChan, biChan] = await Promise.all([
      this.quanHeNguoiDungRepo.count({
        where: {
          id_nguoi_tao_quan_he: idNguoiXem,
          id_nguoi_nhan_quan_he: idNguoiDung,
          loai_quan_he: 'theo_doi',
          trang_thai: 'hieu_luc',
        },
      }),
      this.quanHeNguoiDungRepo.count({
        where: {
          id_nguoi_tao_quan_he: idNguoiXem,
          id_nguoi_nhan_quan_he: idNguoiDung,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
      }),
      this.quanHeNguoiDungRepo.count({
        where: {
          id_nguoi_tao_quan_he: idNguoiDung,
          id_nguoi_nhan_quan_he: idNguoiXem,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
      }),
    ]);

    return {
      id_nguoi_dung: idNguoiDung,
      ten_hien_thi: target.ten_hien_thi,
      dang_theo_doi: dangTheoDoi > 0,
      da_chan: daChan > 0,
      bi_chan_boi_doi_phuong: biChan > 0,
      co_the_nhan_tin: daChan === 0 && biChan === 0,
    };
  }

  async toggleTheoDoiNguoiDung(idNguoiDung: number, idNguoiXem: number) {
    if (idNguoiDung === idNguoiXem) {
      throw new BadRequestException('Không thể theo dõi chính mình');
    }
    const target = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!target) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const biChan = await this.quanHeNguoiDungRepo.count({
      where: [
        {
          id_nguoi_tao_quan_he: idNguoiXem,
          id_nguoi_nhan_quan_he: idNguoiDung,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
        {
          id_nguoi_tao_quan_he: idNguoiDung,
          id_nguoi_nhan_quan_he: idNguoiXem,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
      ],
    });
    if (biChan > 0) {
      throw new ForbiddenException('Không thể theo dõi khi một trong hai bên đã chặn nhau');
    }

    const relation = await this.quanHeNguoiDungRepo.findOne({
      where: {
        id_nguoi_tao_quan_he: idNguoiXem,
        id_nguoi_nhan_quan_he: idNguoiDung,
        loai_quan_he: 'theo_doi',
      },
    });

    if (relation) {
      await this.quanHeNguoiDungRepo.delete({ id: relation.id });
      return { dang_theo_doi: false, hanh_dong: 'huy_theo_doi' };
    }

    await this.quanHeNguoiDungRepo.save({
      id_nguoi_tao_quan_he: idNguoiXem,
      id_nguoi_nhan_quan_he: idNguoiDung,
      loai_quan_he: 'theo_doi',
      trang_thai: 'hieu_luc',
      ngay_tao: new Date(),
    });
    return { dang_theo_doi: true, hanh_dong: 'theo_doi' };
  }

  async layDanhSachDangTheoDoi(idNguoiXem: number, keyword?: string) {
    const qb = this.quanHeNguoiDungRepo
      .createQueryBuilder('qh')
      .innerJoin(NguoiDungEntity, 'nd', 'nd.id = qh.id_nguoi_nhan_quan_he')
      .where('qh.id_nguoi_tao_quan_he = :idNguoiXem', { idNguoiXem })
      .andWhere('qh.loai_quan_he = :loai', { loai: 'theo_doi' })
      .andWhere('qh.trang_thai = :trangThai', { trangThai: 'hieu_luc' })
      .addSelect('nd.id', 'nd_id')
      .addSelect('nd.ten_hien_thi', 'nd_ten_hien_thi')
      .addSelect('nd.ten_dang_nhap', 'nd_ten_dang_nhap')
      .addSelect('nd.anh_dai_dien', 'nd_anh_dai_dien')
      .orderBy('qh.ngay_tao', 'DESC');

    if (keyword) {
      qb.andWhere(
        '(nd.ten_hien_thi LIKE :kw OR nd.ten_dang_nhap LIKE :kw)',
        { kw: `%${keyword}%` },
      );
    }

    const raw = await qb.getRawMany();
    return raw.map((r) => ({
      id: Number(r.nd_id),
      ten_hien_thi: r.nd_ten_hien_thi ?? '',
      ten_dang_nhap: r.nd_ten_dang_nhap ?? '',
      anh_dai_dien: r.nd_anh_dai_dien ?? null,
    }));
  }

  async layDanhSachNguoiTheoDoi(idNguoiXem: number, keyword?: string) {
    const qb = this.quanHeNguoiDungRepo
      .createQueryBuilder('qh')
      .innerJoin(NguoiDungEntity, 'nd', 'nd.id = qh.id_nguoi_tao_quan_he')
      .where('qh.id_nguoi_nhan_quan_he = :idNguoiXem', { idNguoiXem })
      .andWhere('qh.loai_quan_he = :loai', { loai: 'theo_doi' })
      .andWhere('qh.trang_thai = :trangThai', { trangThai: 'hieu_luc' })
      .addSelect('nd.id', 'nd_id')
      .addSelect('nd.ten_hien_thi', 'nd_ten_hien_thi')
      .addSelect('nd.ten_dang_nhap', 'nd_ten_dang_nhap')
      .addSelect('nd.anh_dai_dien', 'nd_anh_dai_dien')
      .orderBy('qh.ngay_tao', 'DESC');

    if (keyword) {
      qb.andWhere(
        '(nd.ten_hien_thi LIKE :kw OR nd.ten_dang_nhap LIKE :kw)',
        { kw: `%${keyword}%` },
      );
    }

    const raw = await qb.getRawMany();
    return raw.map((r) => ({
      id: Number(r.nd_id),
      ten_hien_thi: r.nd_ten_hien_thi ?? '',
      ten_dang_nhap: r.nd_ten_dang_nhap ?? '',
      anh_dai_dien: r.nd_anh_dai_dien ?? null,
    }));
  }

  async xoaNguoiTheoDoi(idNguoiTheoDoi: number, idChuSoHuu: number) {
    if (idNguoiTheoDoi === idChuSoHuu) {
      throw new BadRequestException('Không thể xóa chính mình');
    }
    await this.quanHeNguoiDungRepo.delete({
      id_nguoi_tao_quan_he: idNguoiTheoDoi,
      id_nguoi_nhan_quan_he: idChuSoHuu,
      loai_quan_he: 'theo_doi',
    });
    return { thanh_cong: true };
  }

  async toggleChanNguoiDung(idNguoiDung: number, idNguoiXem: number) {
    if (idNguoiDung === idNguoiXem) {
      throw new BadRequestException('Không thể chặn chính mình');
    }
    const target = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!target) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const relation = await this.quanHeNguoiDungRepo.findOne({
      where: {
        id_nguoi_tao_quan_he: idNguoiXem,
        id_nguoi_nhan_quan_he: idNguoiDung,
        loai_quan_he: 'chan',
      },
    });

    if (relation) {
      await this.quanHeNguoiDungRepo.delete({ id: relation.id });
      return { da_chan: false, hanh_dong: 'bo_chan' };
    }

    await this.quanHeNguoiDungRepo.save({
      id_nguoi_tao_quan_he: idNguoiXem,
      id_nguoi_nhan_quan_he: idNguoiDung,
      loai_quan_he: 'chan',
      trang_thai: 'hieu_luc',
      ngay_tao: new Date(),
    });

    await this.quanHeNguoiDungRepo.delete({
      id_nguoi_tao_quan_he: idNguoiXem,
      id_nguoi_nhan_quan_he: idNguoiDung,
      loai_quan_he: 'theo_doi',
    });
    await this.quanHeNguoiDungRepo.delete({
      id_nguoi_tao_quan_he: idNguoiDung,
      id_nguoi_nhan_quan_he: idNguoiXem,
      loai_quan_he: 'theo_doi',
    });

    return { da_chan: true, hanh_dong: 'chan' };
  }

  async baoCaoNguoiDung(
    idNguoiDung: number,
    idNguoiBaoCao: number,
    dto: BaoCaoNguoiDungDto,
  ) {
    if (idNguoiDung === idNguoiBaoCao) {
      throw new BadRequestException('Không thể báo cáo chính mình');
    }
    const target = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!target) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const record = await this.baoCaoRepo.save({
      ma_bao_cao: this.taoMaBaoCao('BCND'),
      id_nguoi_bao_cao: idNguoiBaoCao,
      loai_doi_tuong_bi_bao_cao: 'nguoi_dung',
      id_doi_tuong_bi_bao_cao: idNguoiDung,
      id_nguoi_vi_pham: idNguoiDung,
      loai_vi_pham: dto.loai_vi_pham.trim(),
      noi_dung_bao_cao: dto.noi_dung_bao_cao.trim(),
      bang_chung_text: dto.bang_chung_text?.trim() || null,
      trang_thai: 'cho_xu_ly',
      muc_do_vi_pham: null,
      ket_qua_xu_ly: null,
      hanh_dong_ap_dung: null,
      gui_canh_bao: false,
      id_admin_xu_ly: null,
      thoi_gian_bao_cao: new Date(),
      thoi_gian_xu_ly: null,
    });

    return {
      id: Number(record.id),
      ma_bao_cao: record.ma_bao_cao,
      trang_thai: record.trang_thai,
      thoi_gian_bao_cao: record.thoi_gian_bao_cao,
    };
  }

  async batDauTroChuyen(idNguoiDung: number, idNguoiXem: number) {
    if (idNguoiDung === idNguoiXem) {
      throw new BadRequestException('Không thể tạo trò chuyện với chính mình');
    }
    const target = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!target) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const biChan = await this.quanHeNguoiDungRepo.count({
      where: [
        {
          id_nguoi_tao_quan_he: idNguoiXem,
          id_nguoi_nhan_quan_he: idNguoiDung,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
        {
          id_nguoi_tao_quan_he: idNguoiDung,
          id_nguoi_nhan_quan_he: idNguoiXem,
          loai_quan_he: 'chan',
          trang_thai: 'hieu_luc',
        },
      ],
    });
    if (biChan > 0) {
      throw new ForbiddenException('Không thể nhắn tin khi một trong hai bên đã chặn nhau');
    }

    const a = Math.min(idNguoiXem, idNguoiDung);
    const b = Math.max(idNguoiXem, idNguoiDung);
    let chat = await this.cuocTroChuyenRepo.findOne({
      where: { id_nguoi_dung_a: a, id_nguoi_dung_b: b },
    });
    if (!chat) {
      chat = await this.cuocTroChuyenRepo.save({
        id_nguoi_dung_a: a,
        id_nguoi_dung_b: b,
        tin_nhan_cuoi: null,
        thoi_gian_tin_nhan_cuoi: null,
        ngay_tao: new Date(),
      });
    }

    return {
      id_cuoc_tro_chuyen: Number(chat.id),
      doi_tac: {
        id: Number(target.id),
        ten_hien_thi: target.ten_hien_thi,
        anh_dai_dien: target.anh_dai_dien,
      },
    };
  }

  async layTrangKhamPha(query: KhamPhaQueryDto) {
    const khuVuc = query.khu_vuc?.trim() || query.dia_chi_giao?.trim() || '';
    const viDo = query.vi_do != null ? Number(query.vi_do) : null;
    const kinhDo = query.kinh_do != null ? Number(query.kinh_do) : null;
    const banKinhKm = query.ban_kinh_km != null ? Math.max(Number(query.ban_kinh_km), 1) : 10;

    const monHot = await this.monAnRepo
      .createQueryBuilder('ma')
      .innerJoin(CuaHangEntity, 'ch', 'ch.id = ma.id_cua_hang')
      .where('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
      .andWhere('ch.trang_thai_hoat_dong = :trangThaiCH', { trangThaiCH: 'hoat_dong' })
      .orderBy('ma.so_luong_da_ban', 'DESC')
      .addOrderBy('ma.diem_danh_gia', 'DESC')
      .limit(10)
      .getMany();

    const categories = await this.danhMucMonRepo
      .createQueryBuilder('dm')
      .where('dm.trang_thai = :trangThai', { trangThai: 'hieu_luc' })
      .orderBy('dm.thu_tu_hien_thi', 'ASC')
      .addOrderBy('dm.id', 'ASC')
      .limit(8)
      .getMany();

    const catIds = categories.map((item) => Number(item.id));
    const monTheoCat =
      catIds.length > 0
        ? await this.monAnRepo
            .createQueryBuilder('ma')
            .innerJoin(CuaHangEntity, 'ch', 'ch.id = ma.id_cua_hang')
            .where('ma.id_danh_muc IN (:...catIds)', { catIds })
            .andWhere('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
            .andWhere('ch.trang_thai_hoat_dong = :trangThaiCH', { trangThaiCH: 'hoat_dong' })
            .orderBy('ma.so_luong_da_ban', 'DESC')
            .addOrderBy('ma.id', 'DESC')
            .getMany()
        : [];

    const qbStore = this.cuaHangRepo
      .createQueryBuilder('ch')
      .where('ch.trang_thai_hoat_dong = :trangThai', { trangThai: 'hoat_dong' });

    if (viDo != null && kinhDo != null) {
      const distanceExpr = this.tinhKhoangCachKmExpr('ch');
      qbStore
        .andWhere('ch.vi_do IS NOT NULL AND ch.kinh_do IS NOT NULL')
        .andWhere(`${distanceExpr} <= :banKinhKm`, { viDo, kinhDo, banKinhKm })
        .addSelect(`${distanceExpr}`, 'khoang_cach_km')
        .orderBy('khoang_cach_km', 'ASC');
    } else if (khuVuc) {
      qbStore
        .andWhere('(ch.khu_vuc LIKE :khuVuc OR ch.dia_chi_kinh_doanh LIKE :khuVuc)', {
          khuVuc: `%${khuVuc}%`,
        })
        .orderBy('ch.diem_danh_gia', 'DESC');
    } else {
      qbStore.orderBy('ch.diem_danh_gia', 'DESC').addOrderBy('ch.tong_don_hang', 'DESC');
    }
    qbStore.limit(12);
    const stores = await qbStore.getMany();

    const storeIds = stores.map((item) => Number(item.id));
    const monDaiDien =
      storeIds.length > 0
        ? await this.monAnRepo
            .createQueryBuilder('ma')
            .where('ma.id_cua_hang IN (:...storeIds)', { storeIds })
            .andWhere('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
            .orderBy('ma.la_mon_noi_bat', 'DESC')
            .addOrderBy('ma.so_luong_da_ban', 'DESC')
            .addOrderBy('ma.id', 'DESC')
            .getMany()
        : [];

    const goiY = await this.monAnRepo
      .createQueryBuilder('ma')
      .innerJoin(CuaHangEntity, 'ch', 'ch.id = ma.id_cua_hang')
      .where('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
      .andWhere('ch.trang_thai_hoat_dong = :trangThaiCH', { trangThaiCH: 'hoat_dong' })
      .addSelect(
        '(ma.so_luong_da_ban * 0.7 + ma.diem_danh_gia * 20)',
        'diem_goi_y',
      )
      .orderBy('diem_goi_y', 'DESC')
      .addOrderBy('ma.id', 'DESC')
      .limit(12)
      .getMany();

    return {
      vi_tri_hien_tai: {
        dia_chi_giao: query.dia_chi_giao ?? null,
        khu_vuc: khuVuc || null,
        vi_do: viDo,
        kinh_do: kinhDo,
      },
      goi_y_tim_kiem: {
        tu_khoa_tim_kiem_gan_day: [],
        mon_an_dang_hot: monHot.slice(0, 6).map((item) => item.ten_mon),
      },
      bo_suu_tap_theo_danh_muc: categories.map((cat) => ({
        id_danh_muc: Number(cat.id),
        ten_danh_muc: cat.ten_danh_muc,
        mon_an: monTheoCat
          .filter((item) => Number(item.id_danh_muc) === Number(cat.id))
          .slice(0, 6)
          .map((item) => ({
            id: Number(item.id),
            id_cua_hang: Number(item.id_cua_hang),
            ten_mon: item.ten_mon,
            hinh_anh: item.hinh_anh_dai_dien,
            gia_ban: Number(item.gia_ban),
            diem_danh_gia: Number(item.diem_danh_gia),
          })),
      })),
      quan_an_gan_ban: stores.map((store) => {
        const mon = monDaiDien.find((m) => Number(m.id_cua_hang) === Number(store.id));
        return {
          id: Number(store.id),
          ten_quan: store.ten_cua_hang,
          hinh_anh_mon: mon?.hinh_anh_dai_dien ?? null,
          dia_chi: store.dia_chi_kinh_doanh,
          diem_danh_gia: Number(store.diem_danh_gia),
        };
      }),
      mon_goi_y_cho_ban: goiY.map((item) => ({
        id: Number(item.id),
        id_cua_hang: Number(item.id_cua_hang),
        ten_mon: item.ten_mon,
        hinh_anh: item.hinh_anh_dai_dien,
        gia_ban: Number(item.gia_ban),
        diem_danh_gia: Number(item.diem_danh_gia),
      })),
    };
  }

  async layChiTietCuaHang(idCuaHang: number) {
    const id = Number(idCuaHang);
    if (!Number.isFinite(id) || id <= 0) {
      throw new BadRequestException('ID cửa hàng không hợp lệ');
    }

    const cuaHang = await this.cuaHangRepo.findOne({
      where: { id, trang_thai_hoat_dong: 'hoat_dong' },
    });

    if (!cuaHang) {
      throw new NotFoundException('Không tìm thấy cửa hàng');
    }

    return {
      id: Number(cuaHang.id),
      ten_cua_hang: cuaHang.ten_cua_hang,
      slug: cuaHang.slug,
      mo_ta: cuaHang.mo_ta,
      anh_dai_dien: cuaHang.anh_dai_dien,
      dia_chi: cuaHang.dia_chi_kinh_doanh,
      khu_vuc: cuaHang.khu_vuc,
      diem_danh_gia: Number(cuaHang.diem_danh_gia || 0),
      tong_don_hang: Number(cuaHang.tong_don_hang || 0),
      tong_luot_xem: Number(cuaHang.tong_luot_xem || 0),
      tong_luot_thich: Number(cuaHang.tong_luot_thich || 0),
      gio_mo_cua: cuaHang.gio_mo_cua,
      gio_dong_cua: cuaHang.gio_dong_cua,
      vi_do: cuaHang.vi_do != null ? Number(cuaHang.vi_do) : null,
      kinh_do: cuaHang.kinh_do != null ? Number(cuaHang.kinh_do) : null,
    };
  }

  async layMonTheoDanhMuc(idDanhMuc: number, query: MonTheoDanhMucQueryDto) {
    const danhMuc = await this.danhMucMonRepo.findOne({ where: { id: idDanhMuc } });
    if (!danhMuc || danhMuc.trang_thai !== 'hieu_luc') {
      throw new NotFoundException('Danh mục món không tồn tại');
    }

    const { currentPage, pageSize, skip } = this.parsePaging(
      query.trang,
      query.so_luong,
    );
    const qb = this.monAnRepo
      .createQueryBuilder('ma')
      .innerJoin(CuaHangEntity, 'ch', 'ch.id = ma.id_cua_hang')
      .where('ma.id_danh_muc = :idDanhMuc', { idDanhMuc })
      .andWhere('ma.trang_thai_ban = :trangThaiBan', { trangThaiBan: 'dang_ban' })
      .andWhere('ch.trang_thai_hoat_dong = :trangThaiCH', {
        trangThaiCH: 'hoat_dong',
      });

    if (query.khu_vuc?.trim()) {
      qb.andWhere('(ch.khu_vuc LIKE :khuVuc OR ch.dia_chi_kinh_doanh LIKE :khuVuc)', {
        khuVuc: `%${query.khu_vuc.trim()}%`,
      });
    }

    qb.orderBy('ma.so_luong_da_ban', 'DESC')
      .addOrderBy('ma.diem_danh_gia', 'DESC')
      .addOrderBy('ma.id', 'DESC')
      .skip(skip)
      .take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    const storeIds = [...new Set(items.map((item) => Number(item.id_cua_hang)))];
    const stores =
      storeIds.length > 0
        ? await this.cuaHangRepo.findBy(storeIds.map((id) => ({ id })))
        : [];
    const storeMap = new Map(stores.map((item) => [Number(item.id), item.ten_cua_hang]));

    return {
      danh_muc: {
        id: Number(danhMuc.id),
        ten_danh_muc: danhMuc.ten_danh_muc,
      },
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ten_mon: item.ten_mon,
        ten_cua_hang: storeMap.get(Number(item.id_cua_hang)) ?? 'Cửa hàng',
        hinh_anh: item.hinh_anh_dai_dien,
        gia_ban: Number(item.gia_ban),
        diem_danh_gia: Number(item.diem_danh_gia),
        so_luong_da_ban: Number(item.so_luong_da_ban),
      })),
      tong_so: total,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(total / pageSize),
    };
  }

  async layBangTin(trang?: number, soLuong?: number, idNguoiDung?: number) {
    const { currentPage, pageSize, skip } = this.parsePaging(trang, soLuong);

    const [baiVietItems, tongSoBaiViet] = await this.baiVietRepo
      .createQueryBuilder('bv')
      .where('bv.trang_thai_duyet = :trangThai', { trangThai: 'hien_thi' })
      .andWhere(
        idNguoiDung
          ? '(bv.muc_do_hien_thi = :mucDoHienThi OR bv.id_nguoi_dang = :idNguoiDung)'
          : 'bv.muc_do_hien_thi = :mucDoHienThi',
        {
          mucDoHienThi: 'cong_khai',
          idNguoiDung,
        },
      )
      .orderBy('bv.ngay_dang', 'DESC')
      .addOrderBy('bv.id', 'DESC')
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    const postIds = baiVietItems.map((item) => Number(item.id));
    const mediaByPost = await this.mapMediaByObject('bai_viet', postIds);
    const originalMap = await this.buildBaiVietGocMap(
      baiVietItems as Array<{ id_bai_viet_goc?: number | null }>,
    );

    const tacGiaMap = new Map<number, NguoiDungEntity>();
    const cuaHangMap = new Map<number, CuaHangEntity>();

    const userIds = [...new Set(baiVietItems.map((item) => Number(item.id_nguoi_dang)))];
    const storeIds = [
      ...new Set(
        baiVietItems
          .filter((item) => item.id_cua_hang != null)
          .map((item) => Number(item.id_cua_hang)),
      ),
    ];

    const [users, stores] = await Promise.all([
      userIds.length > 0
        ? this.nguoiDungRepo.findBy(userIds.map((id) => ({ id })))
        : Promise.resolve([]),
      storeIds.length > 0
        ? this.cuaHangRepo.findBy(storeIds.map((id) => ({ id })))
        : Promise.resolve([]),
    ]);
    users.forEach((u) => tacGiaMap.set(Number(u.id), u));
    stores.forEach((s) => cuaHangMap.set(Number(s.id), s));

    const likedPostIds = new Set<number>();
    const followedAuthorIds = new Set<number>();
    if (idNguoiDung && postIds.length > 0) {
      const [likedRows, followRows] = await Promise.all([
        this.tuongTacRepo.find({
          where: {
            id_nguoi_dung: idNguoiDung,
            loai_tuong_tac: 'thich',
            id_bai_viet: In(postIds),
          },
          select: ['id_bai_viet'],
        }),
        userIds.length > 0
          ? this.quanHeNguoiDungRepo.find({
              where: {
                id_nguoi_tao_quan_he: idNguoiDung,
                id_nguoi_nhan_quan_he: In(userIds),
                loai_quan_he: 'theo_doi',
                trang_thai: 'hieu_luc',
              },
              select: ['id_nguoi_nhan_quan_he'],
            })
          : Promise.resolve([]),
      ]);
      likedRows.forEach((row) => {
        if (row.id_bai_viet != null) likedPostIds.add(Number(row.id_bai_viet));
      });
      followRows.forEach((row) => {
        followedAuthorIds.add(Number(row.id_nguoi_nhan_quan_he));
      });
    }

    const now = new Date();
    const khuyenMai = await this.khuyenMaiRepo
      .createQueryBuilder('km')
      .innerJoin(CuaHangEntity, 'ch', 'ch.id = km.id_cua_hang')
      .where('km.trang_thai = :trangThai', { trangThai: 'dang_dien_ra' })
      .andWhere('km.thoi_gian_bat_dau <= :now', { now })
      .andWhere('km.thoi_gian_ket_thuc >= :now', { now })
      .orderBy('km.thoi_gian_ket_thuc', 'ASC')
      .limit(10)
      .getMany();

    const khuyenMaiStoreIds = [
      ...new Set(khuyenMai.map((item) => Number(item.id_cua_hang))),
    ];
    const khuyenMaiStoreMap = new Map<number, CuaHangEntity>();
    if (khuyenMaiStoreIds.length > 0) {
      const kStores = await this.cuaHangRepo.findBy(
        khuyenMaiStoreIds.map((id) => ({ id })),
      );
      kStores.forEach((item) => khuyenMaiStoreMap.set(Number(item.id), item));
    }

    const daiDienMonMap = new Map<number, MonAnEntity | null>();
    if (khuyenMaiStoreIds.length > 0) {
      const monDaiDienRows = await this.monAnRepo
        .createQueryBuilder('ma')
        .where('ma.id_cua_hang IN (:...ids)', { ids: khuyenMaiStoreIds })
        .andWhere('ma.trang_thai_ban = :trangThaiBan', {
          trangThaiBan: 'dang_ban',
        })
        .orderBy('ma.la_mon_noi_bat', 'DESC')
        .addOrderBy('ma.so_luong_da_ban', 'DESC')
        .addOrderBy('ma.id', 'DESC')
        .getMany();

      for (const storeId of khuyenMaiStoreIds) {
        const mon = monDaiDienRows.find(
          (item) => Number(item.id_cua_hang) === storeId,
        );
        daiDienMonMap.set(storeId, mon ?? null);
      }
    }

    return {
      bai_viet: baiVietItems.map((item) => {
        const tacGia = tacGiaMap.get(Number(item.id_nguoi_dang));
        const cuaHang = item.id_cua_hang
          ? cuaHangMap.get(Number(item.id_cua_hang))
          : null;

        return {
          id: Number(item.id),
          loai_bai_viet: item.loai_bai_viet,
          noi_dung: item.noi_dung,
          so_sao: item.so_sao != null ? Number(item.so_sao) : null,
          bat_kiem_tien: Boolean(item.bat_kiem_tien),
          link_mon_an: item.link_mon_an,
          id_mon_an: item.id_mon_an != null ? Number(item.id_mon_an) : null,
          ngay_dang: item.ngay_dang,
          thong_tin_nguoi_dang: {
            id: tacGia ? Number(tacGia.id) : Number(item.id_nguoi_dang),
            ten_hien_thi: tacGia?.ten_hien_thi ?? 'Người dùng',
            anh_dai_dien: tacGia?.anh_dai_dien ?? null,
          },
          trang_thai_tuong_tac: {
            da_thich: likedPostIds.has(Number(item.id)),
            dang_theo_doi_tac_gia: followedAuthorIds.has(
              Number(item.id_nguoi_dang),
            ),
          },
          cua_hang: cuaHang
            ? {
                id: Number(cuaHang.id),
                ten_cua_hang: cuaHang.ten_cua_hang,
              }
            : null,
          tong_tuong_tac: {
            luot_thich: Number(item.tong_luot_thich),
            luot_binh_luan: Number(item.tong_luot_binh_luan),
            luot_chia_se: Number(item.tong_luot_chia_se),
            luot_luu: Number(item.tong_luot_luu),
          },
          tep_dinh_kem: mediaByPost.get(Number(item.id)) ?? [],
          id_bai_viet_goc:
            item.id_bai_viet_goc != null ? Number(item.id_bai_viet_goc) : null,
          bai_viet_goc:
            item.id_bai_viet_goc != null
              ? (originalMap.get(Number(item.id_bai_viet_goc)) ?? null)
              : null,
        };
      }),
      deal_hom_nay: khuyenMai.map((item) => {
        const cuaHang = khuyenMaiStoreMap.get(Number(item.id_cua_hang));
        const monDaiDien = daiDienMonMap.get(Number(item.id_cua_hang)) ?? null;
        const giaKhuyenMai =
          monDaiDien != null
            ? this.tinhGiaKhuyenMai(Number(monDaiDien.gia_ban), item)
            : null;
        return {
          id: Number(item.id),
          ten_khuyen_mai: item.ten_khuyen_mai,
          ma_khuyen_mai: item.ma_khuyen_mai,
          loai_khuyen_mai: item.loai_khuyen_mai,
          gia_tri_khuyen_mai: Number(item.gia_tri_khuyen_mai),
          thoi_gian_ket_thuc: item.thoi_gian_ket_thuc,
          cua_hang: cuaHang
            ? {
                id: Number(cuaHang.id),
                ten_cua_hang: cuaHang.ten_cua_hang,
                anh_dai_dien: cuaHang.anh_dai_dien,
              }
            : null,
          mon_goi_y: monDaiDien
            ? {
                id: Number(monDaiDien.id),
                ten_mon: monDaiDien.ten_mon,
                hinh_anh: monDaiDien.hinh_anh_dai_dien,
                gia_ban: Number(monDaiDien.gia_ban),
                gia_sau_giam: giaKhuyenMai?.gia_sau_giam ?? Number(monDaiDien.gia_ban),
                so_tien_giam: giaKhuyenMai?.so_tien_giam ?? 0,
              }
            : null,
        };
      }),
      phan_trang_bai_viet: {
        tong_so: tongSoBaiViet,
        trang: currentPage,
        so_luong: pageSize,
        tong_trang: Math.ceil(tongSoBaiViet / pageSize),
      },
    };
  }

  async layChiTietBaiViet(idBaiViet: number, idNguoiXem?: number) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: idBaiViet,
        trang_thai_duyet: 'hien_thi',
      },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    const { isOwner, isFollower } = await this.layQuyenXemTrangCaNhan(
      Number(baiViet.id_nguoi_dang),
      idNguoiXem,
    );
    const coQuyenXem =
      isOwner ||
      baiViet.muc_do_hien_thi === 'cong_khai' ||
      (isFollower && baiViet.muc_do_hien_thi === 'nguoi_theo_doi');
    if (!coQuyenXem) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    const laChuBai = idNguoiXem != null && Number(idNguoiXem) === Number(baiViet.id_nguoi_dang);
    if (idNguoiXem != null && !laChuBai) {
      const insertResult = await this.luotXemBaiVietRepo
        .createQueryBuilder()
        .insert()
        .values({
          id_bai_viet: idBaiViet,
          id_nguoi_dung: idNguoiXem,
          ngay_tao: new Date(),
        })
        .orIgnore()
        .execute();
      const soDongChen = Number(
        (insertResult.raw as { affectedRows?: number; affected?: number })?.affectedRows ??
          (insertResult.raw as { affectedRows?: number; affected?: number })?.affected ??
          0,
      );
      if (soDongChen > 0) {
        await this.baiVietRepo.increment({ id: idBaiViet }, 'tong_luot_xem', 1);
        baiViet.tong_luot_xem = Number(baiViet.tong_luot_xem || 0) + 1;
      }
    }

    const [tacGia, cuaHang, mediaByPost, originalMap] = await Promise.all([
      this.nguoiDungRepo.findOne({ where: { id: baiViet.id_nguoi_dang } }),
      baiViet.id_cua_hang
        ? this.cuaHangRepo.findOne({ where: { id: baiViet.id_cua_hang } })
        : Promise.resolve(null),
      this.mapMediaByObject('bai_viet', [idBaiViet]),
      this.buildBaiVietGocMap([baiViet as any]),
    ]);

    return {
      id: Number(baiViet.id),
      loai_bai_viet: baiViet.loai_bai_viet,
      noi_dung: baiViet.noi_dung,
      so_sao: baiViet.so_sao ? Number(baiViet.so_sao) : null,
      ngay_dang: baiViet.ngay_dang,
      thong_tin_nguoi_dang: {
        id: tacGia ? Number(tacGia.id) : Number(baiViet.id_nguoi_dang),
        ten_hien_thi: tacGia?.ten_hien_thi ?? 'Người dùng',
        anh_dai_dien: tacGia?.anh_dai_dien ?? null,
      },
      cua_hang: cuaHang
        ? {
            id: Number(cuaHang.id),
            ten_cua_hang: cuaHang.ten_cua_hang,
          }
        : null,
      tong_tuong_tac: {
        luot_xem: Number(baiViet.tong_luot_xem),
        luot_thich: Number(baiViet.tong_luot_thich),
        luot_binh_luan: Number(baiViet.tong_luot_binh_luan),
        luot_chia_se: Number(baiViet.tong_luot_chia_se),
        luot_luu: Number(baiViet.tong_luot_luu),
      },
      tong_luot_xem: Number(baiViet.tong_luot_xem),
      tep_dinh_kem: mediaByPost.get(idBaiViet) ?? [],
      id_bai_viet_goc:
        baiViet.id_bai_viet_goc != null ? Number(baiViet.id_bai_viet_goc) : null,
      bai_viet_goc:
        baiViet.id_bai_viet_goc != null
          ? (originalMap.get(Number(baiViet.id_bai_viet_goc)) ?? null)
          : null,
    };
  }

  async layBinhLuanBaiViet(idBaiViet: number, trang?: number, soLuong?: number) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: idBaiViet,
        trang_thai_duyet: 'hien_thi',
        muc_do_hien_thi: 'cong_khai',
      },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    const { currentPage, pageSize, skip } = this.parsePaging(trang, soLuong);

    const qb = this.binhLuanRepo
      .createQueryBuilder('bl')
      .leftJoin(NguoiDungEntity, 'nd', 'nd.id = bl.id_nguoi_binh_luan')
      .where('bl.id_bai_viet = :idBaiViet', { idBaiViet })
      .andWhere('bl.trang_thai = :trangThai', { trangThai: 'hien_thi' })
      .select([
        'bl.id AS id',
        'bl.id_binh_luan_cha AS id_binh_luan_cha',
        'bl.noi_dung AS noi_dung',
        'bl.tong_luot_thich AS tong_luot_thich',
        'bl.ngay_tao AS ngay_tao',
        'nd.id AS id_nguoi_binh_luan',
        'nd.ten_hien_thi AS ten_hien_thi',
        'nd.anh_dai_dien AS anh_dai_dien',
      ])
      .orderBy('bl.ngay_tao', 'DESC')
      .addOrderBy('bl.id', 'DESC')
      .offset(skip)
      .limit(pageSize);

    const [items, tongSo] = await Promise.all([
      qb.getRawMany<{
        id: string;
        id_binh_luan_cha: string | null;
        noi_dung: string;
        tong_luot_thich: string;
        ngay_tao: Date;
        id_nguoi_binh_luan: string;
        ten_hien_thi: string | null;
        anh_dai_dien: string | null;
      }>(),
      this.binhLuanRepo.count({
        where: {
          id_bai_viet: idBaiViet,
          trang_thai: 'hien_thi',
        },
      }),
    ]);

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        id_binh_luan_cha: item.id_binh_luan_cha
          ? Number(item.id_binh_luan_cha)
          : null,
        noi_dung: item.noi_dung,
        tong_luot_thich: Number(item.tong_luot_thich),
        ngay_tao: item.ngay_tao,
        nguoi_binh_luan: {
          id: Number(item.id_nguoi_binh_luan),
          ten_hien_thi: item.ten_hien_thi ?? 'Người dùng',
          anh_dai_dien: item.anh_dai_dien,
        },
      })),
      tong_so: tongSo,
      trang: currentPage,
      so_luong: pageSize,
      tong_trang: Math.ceil(tongSo / pageSize),
    };
  }

  async taoBinhLuan(
    idBaiViet: number,
    idNguoiDung: number,
    noiDung: string,
    idBinhLuanCha?: number,
  ) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: idBaiViet,
        trang_thai_duyet: 'hien_thi',
        muc_do_hien_thi: 'cong_khai',
      },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại hoặc không khả dụng');
    }

    if (idBinhLuanCha) {
      const parent = await this.binhLuanRepo.findOne({
        where: { id: idBinhLuanCha, id_bai_viet: idBaiViet, trang_thai: 'hien_thi' },
      });
      if (!parent) {
        throw new BadRequestException('Bình luận cha không hợp lệ');
      }
    }

    const created = await this.binhLuanRepo.save({
      id_bai_viet: idBaiViet,
      id_nguoi_binh_luan: idNguoiDung,
      id_binh_luan_cha: idBinhLuanCha ?? null,
      noi_dung: noiDung.trim(),
      tong_luot_thich: 0,
      trang_thai: 'hien_thi',
      ngay_tao: new Date(),
    });

    await this.baiVietRepo.increment({ id: idBaiViet }, 'tong_luot_binh_luan', 1);

    const nguoiBinhLuan = await this.nguoiDungRepo.findOne({
      where: { id: idNguoiDung },
    });

    return {
      id: Number(created.id),
      id_bai_viet: Number(created.id_bai_viet),
      id_binh_luan_cha: created.id_binh_luan_cha
        ? Number(created.id_binh_luan_cha)
        : null,
      noi_dung: created.noi_dung,
      tong_luot_thich: Number(created.tong_luot_thich),
      ngay_tao: created.ngay_tao,
      nguoi_binh_luan: {
        id: Number(idNguoiDung),
        ten_hien_thi: nguoiBinhLuan?.ten_hien_thi ?? 'Người dùng',
        anh_dai_dien: nguoiBinhLuan?.anh_dai_dien ?? null,
      },
    };
  }

  async toggleThichBaiViet(idBaiViet: number, idNguoiDung: number) {
    return this.toggleInteraction({
      idBaiViet,
      idNguoiDung,
      loaiTuongTac: 'thich',
      fieldCounter: 'tong_luot_thich',
      mode: 'toggle',
    });
  }

  async toggleThichBinhLuan(idBinhLuan: number, idNguoiDung: number) {
    const binhLuan = await this.binhLuanRepo.findOne({
      where: { id: idBinhLuan, trang_thai: 'hien_thi' },
    });
    if (!binhLuan) {
      throw new NotFoundException('Bình luận không tồn tại hoặc không khả dụng');
    }

    const existed = await this.tuongTacRepo.findOne({
      where: {
        id_nguoi_dung: idNguoiDung,
        id_binh_luan: idBinhLuan,
        loai_tuong_tac: 'thich',
      },
    });

    if (existed) {
      await this.tuongTacRepo.delete({ id: existed.id });
      await this.binhLuanRepo
        .createQueryBuilder()
        .update(BinhLuanEntity)
        .set({
          tong_luot_thich: () => 'GREATEST(tong_luot_thich - 1, 0)',
        })
        .where('id = :idBinhLuan', { idBinhLuan })
        .execute();

      const refreshed = await this.binhLuanRepo.findOne({ where: { id: idBinhLuan } });
      return {
        da_tuong_tac: false,
        hanh_dong: 'bo_tuong_tac',
        tong_luot: Number(refreshed?.tong_luot_thich ?? 0),
      };
    }

    await this.tuongTacRepo.save({
      id_nguoi_dung: idNguoiDung,
      id_bai_viet: null,
      id_binh_luan: idBinhLuan,
      loai_tuong_tac: 'thich',
      ngay_tao: new Date(),
    });
    await this.binhLuanRepo.increment({ id: idBinhLuan }, 'tong_luot_thich', 1);

    const refreshed = await this.binhLuanRepo.findOne({ where: { id: idBinhLuan } });
    return {
      da_tuong_tac: true,
      hanh_dong: 'tao_tuong_tac',
      tong_luot: Number(refreshed?.tong_luot_thich ?? 0),
    };
  }

  async toggleLuuBaiViet(idBaiViet: number, idNguoiDung: number) {
    return this.toggleInteraction({
      idBaiViet,
      idNguoiDung,
      loaiTuongTac: 'luu',
      fieldCounter: 'tong_luot_luu',
      mode: 'toggle',
    });
  }

  async chiaSeBaiViet(
    idBaiViet: number,
    idNguoiDung: number,
    dto?: ChiaSeBaiVietDto,
  ) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: idBaiViet,
        trang_thai_duyet: 'hien_thi',
        muc_do_hien_thi: 'cong_khai',
      },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại hoặc không khả dụng');
    }
    if (baiViet.loai_bai_viet === 'repost') {
      throw new BadRequestException('Không thể chia sẻ lại một bài đăng lại');
    }

    const existed = await this.tuongTacRepo.findOne({
      where: {
        id_nguoi_dung: idNguoiDung,
        id_bai_viet: idBaiViet,
        loai_tuong_tac: 'chia_se',
      },
    });
    if (!existed) {
      await this.tuongTacRepo.save({
        id_nguoi_dung: idNguoiDung,
        id_bai_viet: idBaiViet,
        id_binh_luan: null,
        loai_tuong_tac: 'chia_se',
        ngay_tao: new Date(),
      });
    }

    await this.baiVietRepo.increment({ id: idBaiViet }, 'tong_luot_chia_se', 1);
    const repost = await this.baiVietRepo.save({
      id_nguoi_dang: idNguoiDung,
      id_cua_hang: null,
      loai_bai_viet: 'repost',
      id_bai_viet_goc: idBaiViet,
      id_mon_an: baiViet.id_mon_an,
      id_don_hang: baiViet.id_don_hang,
      noi_dung: `Đã chia sẻ bài viết #${idBaiViet}`,
      so_sao: null,
      muc_do_hien_thi: dto?.muc_do_hien_thi ?? 'cong_khai',
      trang_thai_duyet: 'hien_thi',
      tong_luot_xem: 0,
      tong_luot_thich: 0,
      tong_luot_binh_luan: 0,
      tong_luot_chia_se: 0,
      tong_luot_luu: 0,
      ngay_dang: new Date(),
    });

    const refreshed = await this.baiVietRepo.findOne({ where: { id: idBaiViet } });

    return {
      da_tuong_tac: true,
      hanh_dong: 'tao_chia_se_va_dang_lai',
      tong_luot_chia_se: Number(refreshed?.tong_luot_chia_se ?? 0),
      bai_dang_lai: {
        id: Number(repost.id),
        id_bai_viet_goc: Number(repost.id_bai_viet_goc),
        ngay_dang: repost.ngay_dang,
      },
    };
  }

  private async toggleInteraction(params: {
    idBaiViet: number;
    idNguoiDung: number;
    loaiTuongTac: 'thich' | 'luu' | 'chia_se';
    fieldCounter: 'tong_luot_thich' | 'tong_luot_luu' | 'tong_luot_chia_se';
    mode: 'toggle' | 'create_once';
  }) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: params.idBaiViet,
        trang_thai_duyet: 'hien_thi',
        muc_do_hien_thi: 'cong_khai',
      },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại hoặc không khả dụng');
    }

    const existed = await this.tuongTacRepo.findOne({
      where: {
        id_nguoi_dung: params.idNguoiDung,
        id_bai_viet: params.idBaiViet,
        loai_tuong_tac: params.loaiTuongTac,
      },
    });

    if (existed) {
      if (params.mode === 'create_once') {
        return {
          da_tuong_tac: true,
          hanh_dong: 'giu_nguyen',
          tong_luot: Number(
            (baiViet as unknown as Record<string, number>)[params.fieldCounter] ??
              0,
          ),
        };
      }

      await this.tuongTacRepo.delete({ id: existed.id });
      await this.baiVietRepo
        .createQueryBuilder()
        .update(BaiVietEntity)
        .set({
          [params.fieldCounter]: () =>
            `GREATEST(${params.fieldCounter} - 1, 0)`,
        } as unknown as Partial<BaiVietEntity>)
        .where('id = :idBaiViet', { idBaiViet: params.idBaiViet })
        .execute();

      const refreshed = await this.baiVietRepo.findOne({
        where: { id: params.idBaiViet },
      });

      return {
        da_tuong_tac: false,
        hanh_dong: 'bo_tuong_tac',
        tong_luot: Number(
          (refreshed as unknown as Record<string, number>)[params.fieldCounter] ??
            0,
        ),
      };
    }

    await this.tuongTacRepo.save({
      id_nguoi_dung: params.idNguoiDung,
      id_bai_viet: params.idBaiViet,
      id_binh_luan: null,
      loai_tuong_tac: params.loaiTuongTac,
      ngay_tao: new Date(),
    });
    await this.baiVietRepo.increment(
      { id: params.idBaiViet },
      params.fieldCounter,
      1,
    );

    const refreshed = await this.baiVietRepo.findOne({
      where: { id: params.idBaiViet },
    });

    return {
      da_tuong_tac: true,
      hanh_dong: 'tao_tuong_tac',
      tong_luot: Number(
        (refreshed as unknown as Record<string, number>)[params.fieldCounter] ??
          0,
      ),
    };
  }

  async nhanLinkMon(
    idBaiViet: number,
    idNguoiDung?: number,
    diaChiIp?: string | null,
    userAgent?: string | null,
  ) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: idBaiViet,
        trang_thai_duyet: 'hien_thi',
      },
    });
    if (!baiViet || !baiViet.bat_kiem_tien || !baiViet.link_mon_an) {
      throw new NotFoundException('Link món không khả dụng');
    }

    await this.luotNhanLinkBaiVietRepo.save({
      id_bai_viet: idBaiViet,
      id_nguoi_dung: idNguoiDung ?? null,
      dia_chi_ip: diaChiIp || null,
      user_agent: userAgent || null,
      ngay_tao: new Date(),
    });

    return {
      url: baiViet.link_mon_an,
      id_mon_an: baiViet.id_mon_an != null ? Number(baiViet.id_mon_an) : null,
    };
  }

  async baoCaoBaiViet(
    idBaiViet: number,
    idNguoiBaoCao: number,
    dto: BaoCaoBaiVietDto,
  ) {
    const baiViet = await this.baiVietRepo.findOne({
      where: {
        id: idBaiViet,
        trang_thai_duyet: 'hien_thi',
        muc_do_hien_thi: 'cong_khai',
      },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    const record = await this.baoCaoRepo.save({
      ma_bao_cao: this.taoMaBaoCao(),
      id_nguoi_bao_cao: idNguoiBaoCao,
      loai_doi_tuong_bi_bao_cao: 'bai_viet',
      id_doi_tuong_bi_bao_cao: idBaiViet,
      id_nguoi_vi_pham: baiViet.id_nguoi_dang,
      loai_vi_pham: dto.loai_vi_pham.trim(),
      noi_dung_bao_cao: dto.noi_dung_bao_cao.trim(),
      bang_chung_text: dto.bang_chung_text?.trim() || null,
      trang_thai: 'cho_xu_ly',
      muc_do_vi_pham: null,
      ket_qua_xu_ly: null,
      hanh_dong_ap_dung: null,
      gui_canh_bao: false,
      id_admin_xu_ly: null,
      thoi_gian_bao_cao: new Date(),
      thoi_gian_xu_ly: null,
    });

    return {
      id: Number(record.id),
      ma_bao_cao: record.ma_bao_cao,
      trang_thai: record.trang_thai,
      thoi_gian_bao_cao: record.thoi_gian_bao_cao,
    };
  }

  async taoBaiViet(idNguoiDung: number, dto: TaoBaiVietDto) {
    const user = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const noiDung = dto.noi_dung?.trim() ?? '';
    const tepDinhKem = (dto.tep_dinh_kem ?? []).map((url) => url.trim()).filter(Boolean);
    if (!noiDung && tepDinhKem.length === 0) {
      throw new BadRequestException('Vui lòng nhập nội dung hoặc thêm phương tiện');
    }

    const choPhep = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'mp4', 'mov', 'avi', 'mkv']);
    tepDinhKem.forEach((url) => {
      const ext = this.layPhanMoRongTep(url);
      if (!choPhep.has(ext)) {
        throw new BadRequestException(`Tệp đính kèm có định dạng không hợp lệ: ${url}`);
      }
    });

    const coVideo = tepDinhKem.some((url) => this.detectLoaiTep(url) === 'video');
    const coHinhAnh = tepDinhKem.some((url) => this.detectLoaiTep(url) === 'hinh_anh');
    const loaiBaiViet = coVideo && !coHinhAnh ? 'video' : 'bai_viet';
    const batKiemTien = Boolean(dto.bat_kiem_tien);

    let idMonAnGanLink: number | null = null;
    let linkMonAn: string | null = null;
    if (batKiemTien) {
      if (!user.la_nha_sang_tao && user.trang_thai_kiem_tien_noi_dung !== 'da_duyet') {
        throw new ForbiddenException('Tài khoản chưa được phê duyệt kiếm tiền từ nội dung');
      }
      linkMonAn = dto.link_mon_an?.trim() ?? '';
      if (!linkMonAn) {
        throw new BadRequestException('Vui lòng nhập link món hợp lệ');
      }
      const monId = this.parseMonAnIdTuLink(linkMonAn);
      if (!monId) {
        throw new BadRequestException('Link món không hợp lệ. Vui lòng dùng link món trên DishNet');
      }
      const monAn = await this.monAnRepo.findOne({
        where: {
          id: monId,
          trang_thai_ban: 'dang_ban',
        },
      });
      if (!monAn) {
        throw new BadRequestException('Món ăn không tồn tại hoặc không còn khả dụng');
      }
      idMonAnGanLink = Number(monAn.id);
    }

    const baiViet = await this.baiVietRepo.save({
      id_nguoi_dang: idNguoiDung,
      id_cua_hang: null,
      loai_bai_viet: loaiBaiViet,
      id_bai_viet_goc: null,
      id_mon_an: idMonAnGanLink,
      id_don_hang: null,
      noi_dung: noiDung || null,
      so_sao: null,
      muc_do_hien_thi: dto.muc_do_hien_thi ?? 'cong_khai',
      trang_thai_duyet: 'hien_thi',
      bat_kiem_tien: batKiemTien,
      link_mon_an: linkMonAn,
      tong_luot_xem: 0,
      tong_luot_thich: 0,
      tong_luot_binh_luan: 0,
      tong_luot_chia_se: 0,
      tong_luot_luu: 0,
      ngay_dang: new Date(),
    });

    if (tepDinhKem.length > 0) {
      await this.tepRepo.save(
        tepDinhKem.map((url, index) => ({
          loai_doi_tuong: 'bai_viet',
          id_doi_tuong: Number(baiViet.id),
          loai_tep: this.detectLoaiTep(url),
          duong_dan_tep: url,
          thu_tu_hien_thi: index + 1,
          ghi_chu: null,
          ngay_tao: new Date(),
        })),
      );
    }

    const media = await this.mapMediaByObject('bai_viet', [Number(baiViet.id)]);
    return {
      id: Number(baiViet.id),
      loai_bai_viet: baiViet.loai_bai_viet,
      noi_dung: baiViet.noi_dung,
      muc_do_hien_thi: baiViet.muc_do_hien_thi,
      bat_kiem_tien: Boolean(baiViet.bat_kiem_tien),
      link_mon_an: baiViet.link_mon_an,
      id_mon_an: baiViet.id_mon_an != null ? Number(baiViet.id_mon_an) : null,
      ngay_dang: baiViet.ngay_dang,
      tep_dinh_kem: media.get(Number(baiViet.id)) ?? [],
      thong_tin_nguoi_dang: {
        id: Number(user.id),
        ten_hien_thi: user.ten_hien_thi ?? 'Người dùng',
        anh_dai_dien: user.anh_dai_dien ?? null,
      },
      tong_luot_thich: Number(baiViet.tong_luot_thich ?? 0),
      tong_luot_binh_luan: Number(baiViet.tong_luot_binh_luan ?? 0),
      tong_luot_chia_se: Number(baiViet.tong_luot_chia_se ?? 0),
    };
  }

  async capNhatBaiViet(idBaiViet: number, idNguoiDung: number, dto: TaoBaiVietDto) {
    const baiViet = await this.baiVietRepo.findOne({
      where: { id: idBaiViet, id_nguoi_dang: idNguoiDung, trang_thai_duyet: 'hien_thi' },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại hoặc bạn không có quyền chỉnh sửa');
    }

    const user = await this.nguoiDungRepo.findOne({ where: { id: idNguoiDung } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const noiDung = dto.noi_dung?.trim() ?? '';
    const tepDinhKem = (dto.tep_dinh_kem ?? []).map((url) => url.trim()).filter(Boolean);
    if (!noiDung && tepDinhKem.length === 0) {
      throw new BadRequestException('Vui lòng nhập nội dung hoặc thêm phương tiện');
    }

    const choPhep = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'mp4', 'mov', 'avi', 'mkv']);
    tepDinhKem.forEach((url) => {
      const ext = this.layPhanMoRongTep(url);
      if (!choPhep.has(ext)) {
        throw new BadRequestException(`Tệp đính kèm có định dạng không hợp lệ: ${url}`);
      }
    });

    const coVideo = tepDinhKem.some((url) => this.detectLoaiTep(url) === 'video');
    const coHinhAnh = tepDinhKem.some((url) => this.detectLoaiTep(url) === 'hinh_anh');
    const loaiBaiViet = coVideo && !coHinhAnh ? 'video' : 'bai_viet';
    const batKiemTien = Boolean(dto.bat_kiem_tien);

    let idMonAnGanLink: number | null = null;
    let linkMonAn: string | null = null;
    if (batKiemTien) {
      if (!user.la_nha_sang_tao && user.trang_thai_kiem_tien_noi_dung !== 'da_duyet') {
        throw new ForbiddenException('Tài khoản chưa được phê duyệt kiếm tiền từ nội dung');
      }
      linkMonAn = dto.link_mon_an?.trim() ?? '';
      if (!linkMonAn) {
        throw new BadRequestException('Vui lòng nhập link món hợp lệ');
      }
      const monId = this.parseMonAnIdTuLink(linkMonAn);
      if (!monId) {
        throw new BadRequestException('Link món không hợp lệ. Vui lòng dùng link món trên DishNet');
      }
      const monAn = await this.monAnRepo.findOne({ where: { id: monId, trang_thai_ban: 'dang_ban' } });
      if (!monAn) {
        throw new BadRequestException('Món ăn không tồn tại hoặc không còn khả dụng');
      }
      idMonAnGanLink = Number(monAn.id);
    }

    baiViet.noi_dung = noiDung || null;
    baiViet.loai_bai_viet = loaiBaiViet;
    baiViet.muc_do_hien_thi = dto.muc_do_hien_thi ?? baiViet.muc_do_hien_thi;
    baiViet.bat_kiem_tien = batKiemTien;
    baiViet.link_mon_an = linkMonAn;
    baiViet.id_mon_an = idMonAnGanLink;
    await this.baiVietRepo.save(baiViet);

    await this.tepRepo.delete({ loai_doi_tuong: 'bai_viet', id_doi_tuong: idBaiViet });
    if (tepDinhKem.length > 0) {
      await this.tepRepo.save(
        tepDinhKem.map((url, index) => ({
          loai_doi_tuong: 'bai_viet',
          id_doi_tuong: idBaiViet,
          loai_tep: this.detectLoaiTep(url),
          duong_dan_tep: url,
          thu_tu_hien_thi: index + 1,
          ghi_chu: null,
          ngay_tao: new Date(),
        })),
      );
    }

    const media = await this.mapMediaByObject('bai_viet', [idBaiViet]);
    return {
      id: idBaiViet,
      loai_bai_viet: baiViet.loai_bai_viet,
      noi_dung: baiViet.noi_dung,
      muc_do_hien_thi: baiViet.muc_do_hien_thi,
      bat_kiem_tien: Boolean(baiViet.bat_kiem_tien),
      link_mon_an: baiViet.link_mon_an,
      id_mon_an: baiViet.id_mon_an != null ? Number(baiViet.id_mon_an) : null,
      ngay_dang: baiViet.ngay_dang,
      tep_dinh_kem: media.get(idBaiViet) ?? [],
      tong_luot_thich: Number(baiViet.tong_luot_thich ?? 0),
      tong_luot_binh_luan: Number(baiViet.tong_luot_binh_luan ?? 0),
      tong_luot_chia_se: Number(baiViet.tong_luot_chia_se ?? 0),
    };
  }

  async xoaBaiViet(idBaiViet: number, idNguoiDung: number) {
    const baiViet = await this.baiVietRepo.findOne({
      where: { id: idBaiViet, id_nguoi_dang: idNguoiDung, trang_thai_duyet: 'hien_thi' },
    });
    if (!baiViet) {
      throw new NotFoundException('Bài viết không tồn tại hoặc bạn không có quyền xóa');
    }
    baiViet.trang_thai_duyet = 'da_xoa';
    await this.baiVietRepo.save(baiViet);
    return { id: idBaiViet, trang_thai_duyet: 'da_xoa', message: 'Đã xóa bài viết' };
  }

  private detectLoaiTep(url: string) {
    const normalized = url.split('?')[0].split('#')[0].toLowerCase();
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

  private async mapMediaByObject(
    loaiDoiTuong: string,
    ids: number[],
  ): Promise<Map<number, Array<{ loai_tep: string; url: string; ghi_chu: string | null }>>> {
    const result = new Map<
      number,
      Array<{ loai_tep: string; url: string; ghi_chu: string | null }>
    >();

    if (ids.length === 0) {
      return result;
    }

    const rows = await this.tepRepo.find({
      where: ids.map((id) => ({
        loai_doi_tuong: loaiDoiTuong,
        id_doi_tuong: id,
      })),
      order: {
        thu_tu_hien_thi: 'ASC',
        id: 'ASC',
      },
    });

    for (const row of rows) {
      const key = Number(row.id_doi_tuong);
      if (!result.has(key)) {
        result.set(key, []);
      }
      result.get(key)!.push({
        loai_tep: row.loai_tep,
        url: row.duong_dan_tep,
        ghi_chu: row.ghi_chu,
      });
    }

    return result;
  }
}
