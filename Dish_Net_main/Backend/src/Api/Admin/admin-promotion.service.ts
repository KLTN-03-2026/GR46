import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NhatKyHeThongEntity } from "./entities/nhat-ky-he-thong.entity";
import { KhuyenMaiEntity } from "./entities/khuyen-mai.entity";
import {
  CapNhatKhuyenMaiDto,
  DanhSachKhuyenMaiQueryDto,
  TaoKhuyenMaiDto,
} from "./dto/admin-promotion.dto";

type Actor = {
  id: number;
  email: string;
};

@Injectable()
export class AdminPromotionService {
  constructor(
    @InjectRepository(KhuyenMaiEntity)
    private readonly khuyenMaiRepo: Repository<KhuyenMaiEntity>,
    @InjectRepository(NhatKyHeThongEntity)
    private readonly nhatKyRepo: Repository<NhatKyHeThongEntity>,
  ) {}

  async layDanhSach(query: DanhSachKhuyenMaiQueryDto) {
    await this.dongBoTrangThaiHeThong();

    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 9;
    const skip = (trang - 1) * soLuong;

    const qb = this.khuyenMaiRepo
      .createQueryBuilder("km")
      .where("km.pham_vi_ap_dung = :phamVi", { phamVi: "he_thong" })
      .skip(skip)
      .take(soLuong);

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        "(km.ten_khuyen_mai LIKE :search OR km.ma_khuyen_mai LIKE :search)",
        { search: `%${query.tim_kiem.trim()}%` },
      );
    }

    if (query.trang_thai) {
      qb.andWhere("km.trang_thai = :trangThai", {
        trangThai: query.trang_thai,
      });
    }

    if (query.loai_khuyen_mai) {
      qb.andWhere("km.loai_khuyen_mai = :loaiKhuyenMai", {
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
        dieu_kien_ap_dung: this.xayDungDieuKien(item),
        don_hang_toi_thieu: Number(item.don_hang_toi_thieu),
        so_luot_da_dung: Number(item.so_luot_da_dung),
        so_luot_toi_da:
          item.so_luot_toi_da === null ? null : Number(item.so_luot_toi_da),
        thoi_gian_bat_dau: item.thoi_gian_bat_dau,
        thoi_gian_ket_thuc: item.thoi_gian_ket_thuc,
        trang_thai: item.trang_thai,
        ngay_tao: item.ngay_tao,
        mo_ta: item.mo_ta,
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async tao(payload: TaoKhuyenMaiDto, actor: Actor, diaChiIp?: string | null) {
    const normalized = await this.chuanHoaDuLieu(payload);
    await this.kiemTraMaKhuyenMai(payload.ma_khuyen_mai);

    const entity = this.khuyenMaiRepo.create({
      id_cua_hang: null,
      pham_vi_ap_dung: "he_thong",
      ten_khuyen_mai: payload.ten_khuyen_mai.trim(),
      ma_khuyen_mai: normalized.maKhuyenMai,
      loai_khuyen_mai: normalized.loaiKhuyenMai,
      gia_tri_khuyen_mai: normalized.giaTriKhuyenMai,
      don_hang_toi_thieu: normalized.donHangToiThieu,
      so_luot_toi_da: null,
      so_luot_da_dung: 0,
      thoi_gian_bat_dau: normalized.thoiGianBatDau,
      thoi_gian_ket_thuc: normalized.thoiGianKetThuc,
      trang_thai: this.xacDinhTrangThai(
        normalized.thoiGianBatDau,
        normalized.thoiGianKetThuc,
      ),
      mo_ta: payload.mo_ta?.trim() || null,
    });

    const saved = await this.khuyenMaiRepo.save(entity);

    await this.ghiNhatKy("tao_khuyen_mai", saved.id, actor, diaChiIp, null, {
      ten_khuyen_mai: saved.ten_khuyen_mai,
      ma_khuyen_mai: saved.ma_khuyen_mai,
      trang_thai: saved.trang_thai,
    });

    return { message: "Tao khuyen mai thanh cong", id: Number(saved.id) };
  }

  async capNhat(
    id: number,
    payload: CapNhatKhuyenMaiDto,
    actor: Actor,
    diaChiIp?: string | null,
  ) {
    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, pham_vi_ap_dung: "he_thong" },
    });

    if (!khuyenMai) {
      throw new NotFoundException("Khuyen mai khong ton tai");
    }

    const normalized = await this.chuanHoaDuLieu(payload);
    await this.kiemTraMaKhuyenMai(payload.ma_khuyen_mai, id);

    const duLieuCu = {
      ten_khuyen_mai: khuyenMai.ten_khuyen_mai,
      ma_khuyen_mai: khuyenMai.ma_khuyen_mai,
      loai_khuyen_mai: khuyenMai.loai_khuyen_mai,
      gia_tri_khuyen_mai: khuyenMai.gia_tri_khuyen_mai,
      don_hang_toi_thieu: khuyenMai.don_hang_toi_thieu,
      thoi_gian_bat_dau: khuyenMai.thoi_gian_bat_dau,
      thoi_gian_ket_thuc: khuyenMai.thoi_gian_ket_thuc,
      trang_thai: khuyenMai.trang_thai,
      mo_ta: khuyenMai.mo_ta,
    };

    khuyenMai.ten_khuyen_mai = payload.ten_khuyen_mai.trim();
    khuyenMai.ma_khuyen_mai = normalized.maKhuyenMai;
    khuyenMai.loai_khuyen_mai = normalized.loaiKhuyenMai;
    khuyenMai.gia_tri_khuyen_mai = normalized.giaTriKhuyenMai;
    khuyenMai.don_hang_toi_thieu = normalized.donHangToiThieu;
    khuyenMai.thoi_gian_bat_dau = normalized.thoiGianBatDau;
    khuyenMai.thoi_gian_ket_thuc = normalized.thoiGianKetThuc;
    khuyenMai.mo_ta = payload.mo_ta?.trim() || null;
    khuyenMai.trang_thai = this.xacDinhTrangThai(
      normalized.thoiGianBatDau,
      normalized.thoiGianKetThuc,
      khuyenMai.trang_thai === "tam_dung",
    );

    await this.khuyenMaiRepo.save(khuyenMai);

    await this.ghiNhatKy(
      "cap_nhat_khuyen_mai",
      khuyenMai.id,
      actor,
      diaChiIp,
      duLieuCu,
      {
        ten_khuyen_mai: khuyenMai.ten_khuyen_mai,
        ma_khuyen_mai: khuyenMai.ma_khuyen_mai,
        loai_khuyen_mai: khuyenMai.loai_khuyen_mai,
        gia_tri_khuyen_mai: khuyenMai.gia_tri_khuyen_mai,
        don_hang_toi_thieu: khuyenMai.don_hang_toi_thieu,
        thoi_gian_bat_dau: khuyenMai.thoi_gian_bat_dau,
        thoi_gian_ket_thuc: khuyenMai.thoi_gian_ket_thuc,
        trang_thai: khuyenMai.trang_thai,
        mo_ta: khuyenMai.mo_ta,
      },
    );

    return { message: "Cap nhat khuyen mai thanh cong" };
  }

  async tamDung(id: number, actor: Actor, diaChiIp?: string | null) {
    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, pham_vi_ap_dung: "he_thong" },
    });

    if (!khuyenMai) {
      throw new NotFoundException("Khuyen mai khong ton tai");
    }

    if (this.daKetThuc(khuyenMai.thoi_gian_ket_thuc)) {
      khuyenMai.trang_thai = "da_ket_thuc";
      await this.khuyenMaiRepo.save(khuyenMai);
      throw new BadRequestException(
        "Khuyen mai da ket thuc, khong the tam dung",
      );
    }

    if (khuyenMai.trang_thai === "tam_dung") {
      throw new BadRequestException("Khuyen mai da o trang thai tam dung");
    }

    const duLieuCu = { trang_thai: khuyenMai.trang_thai };
    khuyenMai.trang_thai = "tam_dung";
    await this.khuyenMaiRepo.save(khuyenMai);

    await this.ghiNhatKy(
      "tam_dung_khuyen_mai",
      khuyenMai.id,
      actor,
      diaChiIp,
      duLieuCu,
      {
        trang_thai: khuyenMai.trang_thai,
      },
    );

    return { message: "Tam dung khuyen mai thanh cong" };
  }

  async xoa(id: number, actor: Actor, diaChiIp?: string | null) {
    const khuyenMai = await this.khuyenMaiRepo.findOne({
      where: { id, pham_vi_ap_dung: "he_thong" },
    });

    if (!khuyenMai) {
      throw new NotFoundException("Khuyen mai khong ton tai");
    }

    await this.ghiNhatKy(
      "xoa_khuyen_mai",
      khuyenMai.id,
      actor,
      diaChiIp,
      {
        ten_khuyen_mai: khuyenMai.ten_khuyen_mai,
        ma_khuyen_mai: khuyenMai.ma_khuyen_mai,
        trang_thai: khuyenMai.trang_thai,
      },
      null,
    );

    await this.khuyenMaiRepo.delete(id);

    return { message: "Xoa khuyen mai thanh cong" };
  }

  private async chuanHoaDuLieu(payload: TaoKhuyenMaiDto | CapNhatKhuyenMaiDto) {
    const loaiKhuyenMai = payload.loai_khuyen_mai.trim();
    const giaTriKhuyenMai = Number(payload.gia_tri_khuyen_mai);
    const donHangToiThieu = Number(payload.don_hang_toi_thieu);
    const thoiGianBatDau = new Date(payload.thoi_gian_bat_dau);
    const thoiGianKetThuc = new Date(payload.thoi_gian_ket_thuc);
    const maKhuyenMai = payload.ma_khuyen_mai.trim().toUpperCase();

    if (!payload.ten_khuyen_mai.trim()) {
      throw new BadRequestException("Ten khuyen mai khong duoc de trong");
    }

    if (
      !["phan_tram", "so_tien", "mien_phi_van_chuyen"].includes(loaiKhuyenMai)
    ) {
      throw new BadRequestException("Loai khuyen mai khong hop le");
    }

    if (!Number.isFinite(giaTriKhuyenMai) || giaTriKhuyenMai < 0) {
      throw new BadRequestException("Gia tri khuyen mai khong hop le");
    }

    if (
      loaiKhuyenMai === "phan_tram" &&
      (giaTriKhuyenMai <= 0 || giaTriKhuyenMai > 100)
    ) {
      throw new BadRequestException(
        "Khuyen mai phan tram phai trong khoang 1 den 100",
      );
    }

    if (loaiKhuyenMai === "so_tien" && giaTriKhuyenMai <= 0) {
      throw new BadRequestException("Khuyen mai so tien phai lon hon 0");
    }

    if (loaiKhuyenMai === "mien_phi_van_chuyen" && giaTriKhuyenMai !== 0) {
      throw new BadRequestException(
        "Mien phi van chuyen phai co gia tri bang 0",
      );
    }

    if (!Number.isFinite(donHangToiThieu) || donHangToiThieu < 0) {
      throw new BadRequestException("Dieu kien ap dung khong hop le");
    }

    if (
      Number.isNaN(thoiGianBatDau.getTime()) ||
      Number.isNaN(thoiGianKetThuc.getTime())
    ) {
      throw new BadRequestException("Thoi gian khuyen mai khong hop le");
    }

    if (thoiGianKetThuc <= thoiGianBatDau) {
      throw new BadRequestException(
        "Thoi gian ket thuc phai lon hon thoi gian bat dau",
      );
    }

    return {
      maKhuyenMai,
      loaiKhuyenMai,
      giaTriKhuyenMai,
      donHangToiThieu,
      thoiGianBatDau,
      thoiGianKetThuc,
    };
  }

  private async kiemTraMaKhuyenMai(maKhuyenMai: string, excludeId?: number) {
    const existed = await this.khuyenMaiRepo.findOne({
      where: {
        ma_khuyen_mai: maKhuyenMai.trim().toUpperCase(),
      },
    });

    if (existed && Number(existed.id) !== excludeId) {
      throw new BadRequestException("Ma khuyen mai da ton tai trong he thong");
    }
  }

  private async dongBoTrangThaiHeThong() {
    const now = new Date();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: "da_ket_thuc" })
      .where("pham_vi_ap_dung = :phamVi", { phamVi: "he_thong" })
      .andWhere("thoi_gian_ket_thuc < :now", { now })
      .andWhere("trang_thai != :daKetThuc", { daKetThuc: "da_ket_thuc" })
      .execute();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: "sap_dien_ra" })
      .where("pham_vi_ap_dung = :phamVi", { phamVi: "he_thong" })
      .andWhere("thoi_gian_bat_dau > :now", { now })
      .andWhere("thoi_gian_ket_thuc >= :now", { now })
      .andWhere("trang_thai != :tamDung", { tamDung: "tam_dung" })
      .execute();

    await this.khuyenMaiRepo
      .createQueryBuilder()
      .update(KhuyenMaiEntity)
      .set({ trang_thai: "dang_dien_ra" })
      .where("pham_vi_ap_dung = :phamVi", { phamVi: "he_thong" })
      .andWhere("thoi_gian_bat_dau <= :now", { now })
      .andWhere("thoi_gian_ket_thuc >= :now", { now })
      .andWhere("trang_thai != :tamDung", { tamDung: "tam_dung" })
      .execute();
  }

  private xacDinhTrangThai(batDau: Date, ketThuc: Date, dangTamDung = false) {
    const now = new Date();

    if (ketThuc < now) {
      return "da_ket_thuc";
    }

    if (dangTamDung) {
      return "tam_dung";
    }

    if (batDau > now) {
      return "sap_dien_ra";
    }

    return "dang_dien_ra";
  }

  private daKetThuc(ketThuc: Date) {
    return ketThuc < new Date();
  }

  private xayDungDieuKien(item: KhuyenMaiEntity) {
    const donToiThieu = Number(item.don_hang_toi_thieu);
    if (item.mo_ta?.trim()) {
      return item.mo_ta.trim();
    }
    return `Đơn tối thiểu ${donToiThieu.toLocaleString("vi-VN")}đ`;
  }

  private apDungSapXep(
    qb: ReturnType<Repository<KhuyenMaiEntity>["createQueryBuilder"]>,
    sapXep?: string,
  ) {
    switch (sapXep) {
      case "sap_het_han":
        qb.orderBy("km.thoi_gian_ket_thuc", "ASC").addOrderBy("km.id", "DESC");
        break;
      case "hieu_qua_cao_nhat":
        qb.orderBy("km.so_luot_da_dung", "DESC").addOrderBy("km.id", "DESC");
        break;
      case "giam_gia_cao_nhat":
        qb.orderBy("km.gia_tri_khuyen_mai", "DESC").addOrderBy("km.id", "DESC");
        break;
      case "moi_nhat":
      default:
        qb.orderBy("km.ngay_tao", "DESC").addOrderBy("km.id", "DESC");
        break;
    }
  }

  private async ghiNhatKy(
    hanhDong: string,
    idKhuyenMai: number,
    actor: Actor,
    diaChiIp: string | null | undefined,
    duLieuCu: Record<string, unknown> | null,
    duLieuMoi: Record<string, unknown> | null,
  ) {
    await this.nhatKyRepo.save({
      id_nguoi_thuc_hien: actor.id,
      loai_doi_tuong: "khuyen_mai",
      id_doi_tuong: idKhuyenMai,
      hanh_dong: hanhDong,
      noi_dung: `Admin ${actor.email} ${hanhDong}`,
      du_lieu_cu: duLieuCu,
      du_lieu_moi: duLieuMoi,
      dia_chi_ip: diaChiIp ?? null,
    });
  }
}
