import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DanhMucMonEntity } from '../Admin/entities/danh-muc-mon.entity';
import { MonAnEntity } from '../Admin/entities/mon-an.entity';
import { ToppingEntity } from '../Admin/entities/topping.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import {
  CapNhatDanhMucDto,
  CapNhatMonAnDto,
  CapNhatTrangThaiBanDto,
  DanhSachMonAnQueryDto,
  TaoDanhMucDto,
  TaoMonAnDto,
} from './dto/store-menu.dto';

@Injectable()
export class StoreMenuService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(DanhMucMonEntity)
    private readonly danhMucRepo: Repository<DanhMucMonEntity>,
    @InjectRepository(MonAnEntity)
    private readonly monAnRepo: Repository<MonAnEntity>,
    @InjectRepository(ToppingEntity)
    private readonly toppingRepo: Repository<ToppingEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
  ) {}

  private async hasDanhMucMonTable(): Promise<boolean> {
    const runner = this.dataSource.createQueryRunner();
    try {
      return await runner.hasTable('danh_muc_mon');
    } finally {
      await runner.release();
    }
  }

  private async ensureDanhMucMonTable(): Promise<void> {
    const hasTable = await this.hasDanhMucMonTable();
    if (!hasTable) {
      throw new BadRequestException(
        'Chức năng danh mục chưa khả dụng vì database chưa được cập nhật bảng danh_muc_mon',
      );
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // DANH MỤC
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * Lấy danh sách danh mục của cửa hàng
   */
  async layDanhSachDanhMuc(nguoiDungId: number) {
    const hasDanhMucTable = await this.hasDanhMucMonTable();
    if (!hasDanhMucTable) {
      return { du_lieu: [] };
    }

    const cuaHang = await this.layCuaHang(nguoiDungId);

    const danhSach = await this.danhMucRepo.find({
      where: { id_cua_hang: cuaHang.id },
      order: { thu_tu_hien_thi: 'ASC', id: 'ASC' },
    });

    return {
      du_lieu: danhSach.map((dm) => ({
        id: Number(dm.id),
        id_cua_hang: dm.id_cua_hang ? Number(dm.id_cua_hang) : null,
        id_danh_muc_cha: dm.id_danh_muc_cha ? Number(dm.id_danh_muc_cha) : null,
        ten_danh_muc: dm.ten_danh_muc,
        thu_tu_hien_thi: dm.thu_tu_hien_thi,
        trang_thai: dm.trang_thai,
      })),
    };
  }

  /**
   * Tạo danh mục mới cho cửa hàng
   */
  async taoDanhMuc(nguoiDungId: number, payload: TaoDanhMucDto) {
    await this.ensureDanhMucMonTable();
    const cuaHang = await this.layCuaHang(nguoiDungId);

    const existing = await this.danhMucRepo.findOne({
      where: {
        id_cua_hang: cuaHang.id,
        ten_danh_muc: payload.ten_danh_muc.trim(),
      },
    });
    if (existing) {
      throw new BadRequestException('Tên danh mục đã tồn tại trong cửa hàng');
    }

    const maxOrder = await this.danhMucRepo
      .createQueryBuilder('dm')
      .select('MAX(dm.thu_tu_hien_thi)', 'max')
      .where('dm.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .getRawOne();

    const entity = this.danhMucRepo.create({
      id_cua_hang: cuaHang.id,
      ten_danh_muc: payload.ten_danh_muc.trim(),
      id_danh_muc_cha: payload.id_danh_muc_cha || null,
      thu_tu_hien_thi: payload.thu_tu_hien_thi ?? (maxOrder?.max ?? 0) + 1,
      trang_thai: 'hieu_luc',
    });

    const saved = await this.danhMucRepo.save(entity);

    return {
      message: 'Tạo danh mục thành công',
      id: Number(saved.id),
    };
  }

  /**
   * Cập nhật danh mục
   */
  async capNhatDanhMuc(nguoiDungId: number, id: number, payload: CapNhatDanhMucDto) {
    await this.ensureDanhMucMonTable();
    const cuaHang = await this.layCuaHang(nguoiDungId);

    const danhMuc = await this.danhMucRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });
    if (!danhMuc) {
      throw new NotFoundException('Danh mục không tồn tại');
    }

    if (payload.ten_danh_muc !== undefined) {
      const existed = await this.danhMucRepo.findOne({
        where: {
          id_cua_hang: cuaHang.id,
          ten_danh_muc: payload.ten_danh_muc.trim(),
        },
      });
      if (existed && Number(existed.id) !== id) {
        throw new BadRequestException('Tên danh mục đã tồn tại');
      }
      danhMuc.ten_danh_muc = payload.ten_danh_muc.trim();
    }

    if (payload.id_danh_muc_cha !== undefined) {
      danhMuc.id_danh_muc_cha = payload.id_danh_muc_cha || null;
    }
    if (payload.thu_tu_hien_thi !== undefined) {
      danhMuc.thu_tu_hien_thi = payload.thu_tu_hien_thi;
    }
    if (payload.trang_thai !== undefined) {
      danhMuc.trang_thai = payload.trang_thai;
    }

    await this.danhMucRepo.save(danhMuc);
    return { message: 'Cập nhật danh mục thành công' };
  }

  /**
   * Xóa danh mục
   */
  async xoaDanhMuc(nguoiDungId: number, id: number) {
    await this.ensureDanhMucMonTable();
    const cuaHang = await this.layCuaHang(nguoiDungId);

    const danhMuc = await this.danhMucRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });
    if (!danhMuc) {
      throw new NotFoundException('Danh mục không tồn tại');
    }

    const conHan = await this.danhMucRepo.findOne({
      where: { id_danh_muc_cha: id, id_cua_hang: cuaHang.id },
    });
    if (conHan) {
      throw new BadRequestException('Danh mục có danh mục con, không thể xóa');
    }

    const monAn = await this.monAnRepo.findOne({
      where: { id_danh_muc: id },
    });
    if (monAn) {
      throw new BadRequestException('Danh mục đang có món ăn, không thể xóa');
    }

    await this.danhMucRepo.delete(id);
    return { message: 'Xóa danh mục thành công' };
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MÓN ĂN
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * Lấy danh sách món ăn của cửa hàng (có topping + danh mục)
   */
  async layDanhSachMonAn(nguoiDungId: number, query: DanhSachMonAnQueryDto) {
    const cuaHang = await this.layCuaHang(nguoiDungId);
    const hasDanhMucTable = await this.hasDanhMucMonTable();

    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 20;
    const skip = (trang - 1) * soLuong;

    const qb = this.monAnRepo
      .createQueryBuilder('ma')
      .where('ma.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .skip(skip)
      .take(soLuong);

    if (hasDanhMucTable) {
      qb.leftJoinAndSelect('ma.danh_muc', 'dm');
    }

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        '(ma.ten_mon LIKE :search OR ma.ma_mon LIKE :search)',
        { search: `%${query.tim_kiem.trim()}%` },
      );
    }

    if (query.id_danh_muc && query.id_danh_muc !== 'all') {
      qb.andWhere('ma.id_danh_muc = :idDanhMuc', {
        idDanhMuc: Number(query.id_danh_muc),
      });
    }

    if (query.trang_thai && query.trang_thai !== 'all') {
      qb.andWhere('ma.trang_thai_ban = :trangThai', {
        trangThai: query.trang_thai,
      });
    }

    this.apDungSapXep(qb, query.sap_xep);

    const [items, tongSo] = await qb.getManyAndCount();

    const itemIds = items.map((i) => Number(i.id));
    const toppingsRaw = itemIds.length
      ? await this.toppingRepo
          .createQueryBuilder('tp')
          .where('tp.id_mon_an IN (:...ids)', {
            ids: itemIds,
          })
          .getMany()
      : [];

    const toppingMap = new Map<number, typeof toppingsRaw>();
    for (const tp of toppingsRaw) {
      const mid = Number(tp.id_mon_an);
      if (!toppingMap.has(mid)) toppingMap.set(mid, []);
      toppingMap.get(mid)!.push(tp);
    }

    const topBanChay = await this.monAnRepo
      .createQueryBuilder('ma')
      .select(['ma.id', 'ma.ten_mon', 'ma.hinh_anh_dai_dien', 'ma.gia_ban', 'ma.so_luong_da_ban'])
      .where('ma.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .andWhere('ma.trang_thai_ban = :status', { status: 'dang_ban' })
      .orderBy('ma.so_luong_da_ban', 'DESC')
      .limit(3)
      .getMany();

    const hetMon = await this.monAnRepo
      .createQueryBuilder('ma')
      .select(['ma.id', 'ma.ten_mon', 'ma.hinh_anh_dai_dien', 'ma.gia_ban', 'ma.so_luong_da_ban'])
      .where('ma.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .andWhere('ma.trang_thai_ban = :status', { status: 'het_mon' })
      .orderBy('ma.so_luong_da_ban', 'DESC')
      .getMany();

    return {
      du_lieu: items.map((item) => ({
        id: Number(item.id),
        ma_mon: item.ma_mon,
        ten_mon: item.ten_mon,
        mo_ta: item.mo_ta,
        hinh_anh_dai_dien: item.hinh_anh_dai_dien,
        gia_ban: Number(item.gia_ban),
        gia_goc: item.gia_goc ? Number(item.gia_goc) : null,
        trang_thai_ban: item.trang_thai_ban,
        so_luong_da_ban: Number(item.so_luong_da_ban),
        diem_danh_gia: Number(item.diem_danh_gia),
        tong_danh_gia: Number(item.tong_danh_gia),
        la_mon_noi_bat: Boolean(item.la_mon_noi_bat),
        id_danh_muc: item.id_danh_muc ? Number(item.id_danh_muc) : null,
        ten_danh_muc: item.danh_muc?.ten_danh_muc ?? null,
        toppings: (toppingMap.get(Number(item.id)) ?? []).map((tp) => ({
          id: Number(tp.id),
          ten_topping: tp.ten_topping,
          gia: Number(tp.gia),
          trang_thai: tp.trang_thai,
        })),
      })),
      top_ban_chay: topBanChay.map((item) => ({
        id: Number(item.id),
        ten_mon: item.ten_mon,
        hinh_anh_dai_dien: item.hinh_anh_dai_dien,
        gia_ban: Number(item.gia_ban),
        so_luong_da_ban: Number(item.so_luong_da_ban),
      })),
      het_mon: hetMon.map((item) => ({
        id: Number(item.id),
        ten_mon: item.ten_mon,
        hinh_anh_dai_dien: item.hinh_anh_dai_dien,
        gia_ban: Number(item.gia_ban),
        so_luong_da_ban: Number(item.so_luong_da_ban),
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  /**
   * Tạo món ăn mới
   */
  async taoMonAn(nguoiDungId: number, payload: TaoMonAnDto) {
    const cuaHang = await this.layCuaHang(nguoiDungId);
    const hasDanhMucTable = await this.hasDanhMucMonTable();

    if (!payload.ten_mon?.trim()) {
      throw new BadRequestException('Tên món không được để trống');
    }
    if (payload.gia_ban === undefined || payload.gia_ban < 0) {
      throw new BadRequestException('Giá bán không hợp lệ');
    }
    if (payload.id_danh_muc && !hasDanhMucTable) {
      throw new BadRequestException(
        'Không thể gán danh mục vì database chưa được cập nhật bảng danh_muc_mon',
      );
    }

    const maxMa = await this.monAnRepo
      .createQueryBuilder('ma')
      .select('MAX(ma.ma_mon)', 'max')
      .where('ma.id_cua_hang = :idCuaHang', { idCuaHang: cuaHang.id })
      .getRawOne();

    let nextNum = 1;
    if (maxMa?.max) {
      const match = maxMa.max.match(/(\d+)$/);
      if (match) nextNum = parseInt(match[1], 10) + 1;
    }
    const maMon = `${cuaHang.id.toString().padStart(3, '0')}M${nextNum.toString().padStart(4, '0')}`;

    const entity = this.monAnRepo.create({
      id_cua_hang: cuaHang.id,
      ma_mon: maMon,
      ten_mon: payload.ten_mon.trim(),
      mo_ta: payload.mo_ta?.trim() || null,
      hinh_anh_dai_dien: payload.hinh_anh_dai_dien?.trim() || null,
      gia_ban: payload.gia_ban,
      gia_goc: payload.gia_goc ?? null,
      id_danh_muc: payload.id_danh_muc ? Number(payload.id_danh_muc) : null,
      trang_thai_ban: payload.trang_thai_ban || 'dang_ban',
      so_luong_da_ban: 0,
      diem_danh_gia: 0,
      tong_danh_gia: 0,
      la_mon_noi_bat: false,
      ngay_tao: new Date(),
    });

    const saved = await this.monAnRepo.save(entity);

    if (payload.toppings && payload.toppings.length > 0) {
      const toppingEntities = payload.toppings.map((tp) =>
        this.toppingRepo.create({
          id_mon_an: saved.id,
          ten_topping: tp.ten_topping.trim(),
          gia: tp.gia,
          trang_thai: 'hieu_luc',
          ngay_tao: new Date(),
        }),
      );
      await this.toppingRepo.save(toppingEntities);
    }

    return {
      message: 'Tạo món ăn thành công',
      id: Number(saved.id),
    };
  }

  /**
   * Cập nhật món ăn
   */
  async capNhatMonAn(nguoiDungId: number, id: number, payload: CapNhatMonAnDto) {
    const cuaHang = await this.layCuaHang(nguoiDungId);
    const hasDanhMucTable = await this.hasDanhMucMonTable();

    const monAn = await this.monAnRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });
    if (!monAn) {
      throw new NotFoundException('Món ăn không tồn tại');
    }
    if (payload.id_danh_muc !== undefined && payload.id_danh_muc && !hasDanhMucTable) {
      throw new BadRequestException(
        'Không thể cập nhật danh mục vì database chưa được cập nhật bảng danh_muc_mon',
      );
    }

    if (payload.ten_mon !== undefined) {
      if (!payload.ten_mon.trim()) {
        throw new BadRequestException('Tên món không được để trống');
      }
      monAn.ten_mon = payload.ten_mon.trim();
    }
    if (payload.mo_ta !== undefined) monAn.mo_ta = payload.mo_ta?.trim() || null;
    if (payload.gia_ban !== undefined) {
      if (payload.gia_ban < 0) {
        throw new BadRequestException('Giá bán không hợp lệ');
      }
      monAn.gia_ban = payload.gia_ban;
    }
    if (payload.gia_goc !== undefined) monAn.gia_goc = payload.gia_goc ?? null;
    if (payload.hinh_anh_dai_dien !== undefined) {
      monAn.hinh_anh_dai_dien = payload.hinh_anh_dai_dien?.trim() || null;
    }
    if (payload.id_danh_muc !== undefined) {
      monAn.id_danh_muc = payload.id_danh_muc ? Number(payload.id_danh_muc) : null;
    }
    if (payload.trang_thai_ban !== undefined) {
      monAn.trang_thai_ban = payload.trang_thai_ban;
    }

    await this.monAnRepo.save(monAn);

    if (payload.toppings !== undefined) {
      await this.toppingRepo.delete({ id_mon_an: id });
      if (payload.toppings.length > 0) {
        const toppingEntities = payload.toppings.map((tp) =>
          this.toppingRepo.create({
            id_mon_an: id,
            ten_topping: tp.ten_topping.trim(),
            gia: tp.gia,
            trang_thai: 'hieu_luc',
            ngay_tao: new Date(),
          }),
        );
        await this.toppingRepo.save(toppingEntities);
      }
    }

    return { message: 'Cập nhật món ăn thành công' };
  }

  /**
   * Cập nhật trạng thái bán của một món (nhanh)
   */
  async capNhatTrangThaiBan(nguoiDungId: number, id: number, payload: CapNhatTrangThaiBanDto) {
    const cuaHang = await this.layCuaHang(nguoiDungId);

    const monAn = await this.monAnRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });
    if (!monAn) {
      throw new NotFoundException('Món ăn không tồn tại');
    }

    monAn.trang_thai_ban = payload.trang_thai_ban;
    await this.monAnRepo.save(monAn);

    return { message: 'Cập nhật trạng thái thành công' };
  }

  /**
   * Xóa món ăn
   */
  async xoaMonAn(nguoiDungId: number, id: number) {
    const cuaHang = await this.layCuaHang(nguoiDungId);

    const monAn = await this.monAnRepo.findOne({
      where: { id, id_cua_hang: cuaHang.id },
    });
    if (!monAn) {
      throw new NotFoundException('Món ăn không tồn tại');
    }

    await this.toppingRepo.delete({ id_mon_an: id });
    await this.monAnRepo.delete(id);

    return { message: 'Xóa món ăn thành công' };
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // TOPPING
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * Thêm topping vào món
   */
  async themTopping(nguoiDungId: number, idMonAn: number, payload: { ten_topping: string; gia: number }) {
    const cuaHang = await this.layCuaHang(nguoiDungId);

    const monAn = await this.monAnRepo.findOne({
      where: { id: idMonAn, id_cua_hang: cuaHang.id },
    });
    if (!monAn) {
      throw new NotFoundException('Món ăn không tồn tại');
    }

    const entity = this.toppingRepo.create({
      id_mon_an: idMonAn,
      ten_topping: payload.ten_topping.trim(),
      gia: payload.gia,
      trang_thai: 'hieu_luc',
      ngay_tao: new Date(),
    });

    const saved = await this.toppingRepo.save(entity);
    return { message: 'Thêm topping thành công', id: Number(saved.id) };
  }

  /**
   * Xóa topping
   */
  async xoaTopping(nguoiDungId: number, idTopping: number) {
    const topping = await this.toppingRepo.findOne({ where: { id: idTopping } });
    if (!topping) {
      throw new NotFoundException('Topping không tồn tại');
    }

    const cuaHang = await this.layCuaHang(nguoiDungId);
    const monAn = await this.monAnRepo.findOne({
      where: { id: topping.id_mon_an, id_cua_hang: cuaHang.id },
    });
    if (!monAn) {
      throw new ForbiddenException('Bạn không có quyền xóa topping này');
    }

    await this.toppingRepo.delete(idTopping);
    return { message: 'Xóa topping thành công' };
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private async layCuaHang(nguoiDungId: number): Promise<CuaHangEntity> {
    const cuaHang = await this.cuaHangRepo.findOne({
      where: { id_chu_so_huu: nguoiDungId },
    });

    if (!cuaHang) {
      throw new ForbiddenException('Không tìm thấy cửa hàng của bạn');
    }

    if (cuaHang.trang_thai_hoat_dong !== 'hoat_dong') {
      throw new ForbiddenException('Cửa hàng chưa được phê duyệt hoặc đang bị khóa');
    }

    return cuaHang;
  }

  private apDungSapXep(
    qb: ReturnType<Repository<MonAnEntity>['createQueryBuilder']>,
    sapXep?: string,
  ) {
    switch (sapXep) {
      case 'ban_chay':
        qb.orderBy('ma.so_luong_da_ban', 'DESC').addOrderBy('ma.id', 'DESC');
        break;
      case 'gia_cao':
        qb.orderBy('ma.gia_ban', 'DESC').addOrderBy('ma.id', 'DESC');
        break;
      case 'gia_thap':
        qb.orderBy('ma.gia_ban', 'ASC').addOrderBy('ma.id', 'DESC');
        break;
      case 'moi_nhat':
      default:
        qb.orderBy('ma.ngay_tao', 'DESC').addOrderBy('ma.id', 'DESC');
        break;
    }
  }
}
