import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailService } from "../../shared/email/email.service";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import { CuaHangEntity } from "./entities/cua-hang.entity";
import { NhatKyHeThongEntity } from "./entities/nhat-ky-he-thong.entity";
import { TepDinhKemEntity } from "./entities/tep-dinh-kem.entity";
import { ThongBaoEntity } from "./entities/thong-bao.entity";
import { YeuCauNangCapEntity } from "./entities/yeu-cau-nang-cap.entity";

type DanhSachQuery = {
  tim_kiem?: string;
  loai_yeu_cau?: string;
  trang_thai?: string;
  moc_thoi_gian?: string;
  tu_ngay?: string;
  den_ngay?: string;
  trang?: number;
  so_luong?: number;
};

type Actor = {
  id: number;
};

@Injectable()
export class AdminReviewService {
  constructor(
    @InjectRepository(YeuCauNangCapEntity)
    private readonly yeuCauRepo: Repository<YeuCauNangCapEntity>,
    @InjectRepository(TepDinhKemEntity)
    private readonly tepDinhKemRepo: Repository<TepDinhKemEntity>,
    @InjectRepository(NhatKyHeThongEntity)
    private readonly nhatKyRepo: Repository<NhatKyHeThongEntity>,
    private readonly emailService: EmailService,
  ) {}

  async layDanhSach(query: DanhSachQuery) {
    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const qb = this.yeuCauRepo
      .createQueryBuilder("yc")
      .leftJoinAndSelect("yc.nguoi_gui", "nd")
      .orderBy("yc.thoi_gian_gui", "DESC")
      .addOrderBy("yc.id", "DESC")
      .skip(skip)
      .take(soLuong);

    if (query.tim_kiem?.trim()) {
      qb.andWhere("(nd.ten_hien_thi LIKE :search OR nd.email LIKE :search)", {
        search: `%${query.tim_kiem.trim()}%`,
      });
    }

    if (query.loai_yeu_cau) {
      qb.andWhere("yc.loai_yeu_cau = :loaiYeuCau", {
        loaiYeuCau: query.loai_yeu_cau,
      });
    }

    if (query.trang_thai) {
      qb.andWhere("yc.trang_thai = :trangThai", {
        trangThai: query.trang_thai,
      });
    }

    const dateRange = this.xayDungKhoangThoiGian(query);
    if (dateRange) {
      qb.andWhere("yc.thoi_gian_gui BETWEEN :tuNgay AND :denNgay", {
        tuNgay: dateRange.tuNgay,
        denNgay: dateRange.denNgay,
      });
    }

    const [yeuCauList, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: yeuCauList.map((yc, index) => ({
        stt: skip + index + 1,
        id: yc.id,
        ten_nguoi_dung: yc.nguoi_gui.ten_hien_thi,
        email: yc.nguoi_gui.email,
        loai_yeu_cau: yc.loai_yeu_cau,
        trang_thai: yc.trang_thai,
        thoi_gian_gui: yc.thoi_gian_gui,
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async layChiTiet(id: number) {
    const yc = await this.yeuCauRepo.findOne({
      where: { id },
      relations: {
        nguoi_gui: true,
        admin_xu_ly: true,
      },
    });

    if (!yc) {
      throw new NotFoundException("Yeu cau khong ton tai");
    }

    const [tepMinhChung, lichSu] = await Promise.all([
      this.tepDinhKemRepo.find({
        where: {
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: id,
        },
        order: {
          thu_tu_hien_thi: "ASC",
          id: "ASC",
        },
      }),
      this.nhatKyRepo.find({
        where: {
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: id,
        },
        relations: {
          nguoi_thuc_hien: true,
        },
        order: { ngay_tao: "ASC" },
      }),
    ]);

    const videos = tepMinhChung
      .filter((tep) => tep.loai_tep === "video")
      .map((tep, index) => ({
        tieu_de: tep.ghi_chu?.trim() || `Video nổi bật ${index + 1}`,
        ngay_dang: yc.thoi_gian_gui.toISOString(),
        luot_xem: null,
        url: tep.duong_dan_tep,
      }));

    return {
      id: yc.id,
      ma_yeu_cau: this.taoMaYeuCau(yc.id),
      thong_tin_nguoi_dung: {
        id: yc.nguoi_gui.id,
        ten_nguoi_dung: yc.nguoi_gui.ten_hien_thi,
        so_dien_thoai: yc.nguoi_gui.so_dien_thoai,
        email: yc.nguoi_gui.email,
        ngay_tham_gia: yc.nguoi_gui.ngay_tao,
        loai_tai_khoan_hien_tai: this.xacDinhLoaiTaiKhoan(yc.nguoi_gui),
      },
      thong_tin_yeu_cau: {
        loai_yeu_cau: yc.loai_yeu_cau,
        ngay_gui_yeu_cau: yc.thoi_gian_gui,
        trang_thai: yc.trang_thai,
        ly_do_tu_choi: yc.ly_do_tu_choi,
      },
      thong_tin_dang_ky_cua_hang:
        yc.loai_yeu_cau === "mo_cua_hang"
          ? {
              ten_cua_hang: yc.ten_cua_hang_de_xuat,
              dia_chi_cua_hang: yc.dia_chi_kinh_doanh,
              so_dien_thoai_lien_he: yc.so_dien_thoai_lien_he,
              mo_ta_cua_hang: yc.ly_do_yeu_cau,
            }
          : null,
      thong_tin_kiem_tien_noi_dung:
        yc.loai_yeu_cau === "kiem_tien_noi_dung"
          ? {
              ten_kenh: yc.ten_kenh,
              mo_ta_noi_dung_kenh: yc.mo_ta_kenh,
              so_bai_dang: yc.tong_bai_dang,
              so_nguoi_theo_doi: yc.tong_nguoi_theo_doi,
              video_noi_bat: videos,
            }
          : null,
      tep_minh_chung: tepMinhChung.map((tep) => ({
        id: tep.id,
        loai_tep: tep.loai_tep,
        url: tep.duong_dan_tep,
        ghi_chu: tep.ghi_chu,
        ngay_tao: tep.ngay_tao,
      })),
      lich_su_kiem_duyet: lichSu.map((item) => ({
        id: item.id,
        hanh_dong: item.hanh_dong,
        thuc_hien_boi: this.layNhanNguoiThucHien(item),
        ghi_chu: item.noi_dung,
        thoi_gian_tao: item.ngay_tao,
      })),
    };
  }

  async pheDuyet(
    id: number,
    actor: Actor,
    ghiChu?: string,
    diaChiIp?: string | null,
  ) {
    let duLieuEmail:
      | {
          den: string;
          tenNguoiDung: string;
          tenCuaHang: string;
          trangThai: "da_duyet";
        }
      | undefined;

    await this.yeuCauRepo.manager.transaction(async (manager) => {
      const yeuCauRepo = manager.getRepository(YeuCauNangCapEntity);
      const nguoiDungRepo = manager.getRepository(NguoiDungEntity);
      const nhatKyRepo = manager.getRepository(NhatKyHeThongEntity);
      const cuaHangRepo = manager.getRepository(CuaHangEntity);
      const thongBaoRepo = manager.getRepository(ThongBaoEntity);

      const yc = await yeuCauRepo.findOne({
        where: { id },
        relations: { nguoi_gui: true },
      });

      if (!yc) {
        throw new NotFoundException("Yeu cau khong ton tai");
      }

      if (yc.trang_thai !== "cho_duyet") {
        throw new BadRequestException(
          "Chi co the phe duyet yeu cau dang cho duyet",
        );
      }

      const duLieuCu = this.taoBanGhiTrangThai(yc);

      if (yc.loai_yeu_cau === "mo_cua_hang") {
        yc.nguoi_gui.la_chu_cua_hang = true;
        await this.taoHoacCapNhatCuaHangTuYeuCau(yc, cuaHangRepo);

        await thongBaoRepo.save({
          id_nguoi_nhan: Number(yc.id_nguoi_gui),
          loai_thong_bao: "he_thong",
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: Number(yc.id),
          tieu_de: "Yêu cầu mở cửa hàng đã được phê duyệt",
          noi_dung: `Yêu cầu mở cửa hàng "${yc.ten_cua_hang_de_xuat ?? "Cửa hàng"}" đã được phê duyệt. Bạn có thể bắt đầu quản lý và kinh doanh trên DishNet.`,
          da_doc: false,
          thoi_gian_doc: null,
          ngay_tao: new Date(),
        });

        duLieuEmail = {
          den: yc.nguoi_gui.email,
          tenNguoiDung: yc.nguoi_gui.ten_hien_thi,
          tenCuaHang: yc.ten_cua_hang_de_xuat ?? "Cửa hàng của bạn",
          trangThai: "da_duyet",
        };
      }

      if (yc.loai_yeu_cau === "kiem_tien_noi_dung") {
        yc.nguoi_gui.la_nha_sang_tao = true;
      }

      yc.trang_thai = "da_duyet";
      yc.id_admin_xu_ly = actor.id;
      yc.thoi_gian_xu_ly = new Date();
      yc.ly_do_tu_choi = null;

      await nguoiDungRepo.save(yc.nguoi_gui);
      await yeuCauRepo.save(yc);
      await nhatKyRepo.save({
        id_nguoi_thuc_hien: actor.id,
        loai_doi_tuong: "yeu_cau_nang_cap",
        id_doi_tuong: yc.id,
        hanh_dong: "phe_duyet",
        noi_dung: ghiChu?.trim() || "Admin phê duyệt yêu cầu",
        du_lieu_cu: duLieuCu,
        du_lieu_moi: this.taoBanGhiTrangThai(yc),
        dia_chi_ip: diaChiIp ?? null,
      });
    });

    if (duLieuEmail) {
      await this.guiEmailKetQuaMoCuaHang(duLieuEmail);
    }

    return { message: "Phe duyet yeu cau thanh cong" };
  }

  async tuChoi(
    id: number,
    lyDo: string,
    actor: Actor,
    diaChiIp?: string | null,
  ) {
    if (!lyDo.trim()) {
      throw new BadRequestException("Ly do tu choi khong duoc de trong");
    }

    let duLieuEmail:
      | {
          den: string;
          tenNguoiDung: string;
          tenCuaHang: string;
          trangThai: "da_tu_choi";
          lyDo: string;
        }
      | undefined;

    await this.yeuCauRepo.manager.transaction(async (manager) => {
      const yeuCauRepo = manager.getRepository(YeuCauNangCapEntity);
      const nhatKyRepo = manager.getRepository(NhatKyHeThongEntity);
      const thongBaoRepo = manager.getRepository(ThongBaoEntity);

      const yc = await yeuCauRepo.findOne({
        where: { id },
        relations: { nguoi_gui: true },
      });
      if (!yc) {
        throw new NotFoundException("Yeu cau khong ton tai");
      }

      if (yc.trang_thai !== "cho_duyet") {
        throw new BadRequestException(
          "Chi co the tu choi yeu cau dang cho duyet",
        );
      }

      const duLieuCu = this.taoBanGhiTrangThai(yc);

      yc.trang_thai = "da_tu_choi";
      yc.id_admin_xu_ly = actor.id;
      yc.thoi_gian_xu_ly = new Date();
      yc.ly_do_tu_choi = lyDo.trim();

      if (yc.loai_yeu_cau === "mo_cua_hang") {
        await thongBaoRepo.save({
          id_nguoi_nhan: Number(yc.id_nguoi_gui),
          loai_thong_bao: "he_thong",
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: Number(yc.id),
          tieu_de: "Yêu cầu mở cửa hàng bị từ chối",
          noi_dung: `Yêu cầu mở cửa hàng "${yc.ten_cua_hang_de_xuat ?? "Cửa hàng"}" chưa được duyệt. Lý do: ${lyDo.trim()}`,
          da_doc: false,
          thoi_gian_doc: null,
          ngay_tao: new Date(),
        });

        duLieuEmail = {
          den: yc.nguoi_gui.email,
          tenNguoiDung: yc.nguoi_gui.ten_hien_thi,
          tenCuaHang: yc.ten_cua_hang_de_xuat ?? "Cửa hàng của bạn",
          trangThai: "da_tu_choi",
          lyDo: lyDo.trim(),
        };
      }

      await yeuCauRepo.save(yc);
      await nhatKyRepo.save({
        id_nguoi_thuc_hien: actor.id,
        loai_doi_tuong: "yeu_cau_nang_cap",
        id_doi_tuong: yc.id,
        hanh_dong: "tu_choi",
        noi_dung: lyDo.trim(),
        du_lieu_cu: duLieuCu,
        du_lieu_moi: this.taoBanGhiTrangThai(yc),
        dia_chi_ip: diaChiIp ?? null,
      });
    });

    if (duLieuEmail) {
      await this.guiEmailKetQuaMoCuaHang(duLieuEmail);
    }

    return { message: "Tu choi yeu cau thanh cong" };
  }

  private async taoHoacCapNhatCuaHangTuYeuCau(
    yc: YeuCauNangCapEntity,
    cuaHangRepo: Repository<CuaHangEntity>,
  ) {
    const tenCuaHang = yc.ten_cua_hang_de_xuat?.trim() || `Cua hang ${yc.id}`;
    const duLieuCapNhat = {
      ten_cua_hang: tenCuaHang,
      mo_ta: yc.ly_do_yeu_cau?.trim() || null,
      so_dien_thoai_lien_he: yc.so_dien_thoai_lien_he?.trim() || null,
      dia_chi_kinh_doanh: yc.dia_chi_kinh_doanh?.trim() || "Chua cap nhat",
      gio_mo_cua: yc.gio_mo_cua || null,
      gio_dong_cua: yc.gio_dong_cua || null,
      trang_thai_hoat_dong: "hoat_dong",
      tu_nhan_giao_hang: true,
    };

    const cuaHangHienTai = await cuaHangRepo.findOne({
      where: { id_chu_so_huu: Number(yc.id_nguoi_gui) },
    });

    if (cuaHangHienTai) {
      const canCapNhatSlug =
        !cuaHangHienTai.slug || !cuaHangHienTai.slug.trim().length;
      if (canCapNhatSlug) {
        cuaHangHienTai.slug = await this.taoSlugKhongTrung(
          tenCuaHang,
          cuaHangRepo,
          Number(cuaHangHienTai.id),
        );
      }
      Object.assign(cuaHangHienTai, duLieuCapNhat);
      await cuaHangRepo.save(cuaHangHienTai);
      return;
    }

    const slug = await this.taoSlugKhongTrung(tenCuaHang, cuaHangRepo);
    await cuaHangRepo.save({
      id_chu_so_huu: Number(yc.id_nguoi_gui),
      slug,
      ...duLieuCapNhat,
    });
  }

  private taoSlugCoBan(value: string) {
    const slug = value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return slug || "cua-hang";
  }

  private async taoSlugKhongTrung(
    tenCuaHang: string,
    cuaHangRepo: Repository<CuaHangEntity>,
    boQuaId?: number,
  ) {
    const base = this.taoSlugCoBan(tenCuaHang);

    for (let i = 0; i < 500; i += 1) {
      const slug = i === 0 ? base : `${base}-${i}`;
      const existing = await cuaHangRepo.findOne({ where: { slug } });
      if (!existing) return slug;
      if (boQuaId != null && Number(existing.id) === Number(boQuaId)) {
        return slug;
      }
    }

    return `${base}-${Date.now()}`;
  }

  private async guiEmailKetQuaMoCuaHang(data: {
    den: string;
    tenNguoiDung: string;
    tenCuaHang: string;
    trangThai: "da_duyet" | "da_tu_choi";
    lyDo?: string;
  }) {
    if (data.trangThai === "da_duyet") {
      await this.emailService.guiEmail({
        den: data.den,
        tieuDe: "[DishNet] Yêu cầu mở cửa hàng đã được phê duyệt",
        noiDungText: `Xin chào ${data.tenNguoiDung}, yêu cầu mở cửa hàng "${data.tenCuaHang}" của bạn đã được phê duyệt.`,
        noiDungHtml: `
          <p>Xin chào <strong>${data.tenNguoiDung}</strong>,</p>
          <p>Yêu cầu mở cửa hàng <strong>${data.tenCuaHang}</strong> của bạn đã được phê duyệt.</p>
          <p>Bạn có thể đăng nhập DishNet để bắt đầu quản lý cửa hàng.</p>
        `,
      });
      return;
    }

    await this.emailService.guiEmail({
      den: data.den,
      tieuDe: "[DishNet] Yêu cầu mở cửa hàng chưa được phê duyệt",
      noiDungText: `Xin chào ${data.tenNguoiDung}, yêu cầu mở cửa hàng "${data.tenCuaHang}" chưa được phê duyệt. Lý do: ${data.lyDo ?? "Không có"}.`,
      noiDungHtml: `
        <p>Xin chào <strong>${data.tenNguoiDung}</strong>,</p>
        <p>Yêu cầu mở cửa hàng <strong>${data.tenCuaHang}</strong> chưa được phê duyệt.</p>
        <p>Lý do: ${data.lyDo ?? "Không có"}.</p>
        <p>Bạn có thể cập nhật thông tin và gửi lại yêu cầu.</p>
      `,
    });
  }

  private layNhanNguoiThucHien(item: NhatKyHeThongEntity) {
    if (!item.nguoi_thuc_hien) {
      return "Hệ thống";
    }

    if (item.nguoi_thuc_hien.la_admin) {
      return item.nguoi_thuc_hien.email;
    }

    return item.nguoi_thuc_hien.ten_hien_thi;
  }

  private taoMaYeuCau(id: number) {
    return `YCNC-${String(id).padStart(4, "0")}`;
  }

  private taoBanGhiTrangThai(yc: YeuCauNangCapEntity) {
    return {
      loai_yeu_cau: yc.loai_yeu_cau,
      trang_thai: yc.trang_thai,
      id_admin_xu_ly: yc.id_admin_xu_ly,
      ly_do_tu_choi: yc.ly_do_tu_choi,
      thoi_gian_xu_ly: yc.thoi_gian_xu_ly?.toISOString() ?? null,
    };
  }

  private xacDinhLoaiTaiKhoan(nguoiDung: NguoiDungEntity) {
    if (nguoiDung.la_admin) return "admin";
    if (nguoiDung.la_chu_cua_hang) return "chu_cua_hang";
    if (nguoiDung.la_nha_sang_tao) return "nha_sang_tao";
    return "nguoi_dung";
  }

  private xayDungKhoangThoiGian(query: DanhSachQuery) {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    switch (query.moc_thoi_gian) {
      case "today":
        return {
          tuNgay: todayStart,
          denNgay: now,
        };
      case "7days": {
        const from = new Date(now);
        from.setDate(from.getDate() - 7);
        return { tuNgay: from, denNgay: now };
      }
      case "30days": {
        const from = new Date(now);
        from.setDate(from.getDate() - 30);
        return { tuNgay: from, denNgay: now };
      }
      case "custom": {
        if (!query.tu_ngay || !query.den_ngay) {
          throw new BadRequestException(
            "Vui long chon day du tu ngay va den ngay",
          );
        }

        const tuNgay = new Date(`${query.tu_ngay}T00:00:00`);
        const denNgay = new Date(`${query.den_ngay}T23:59:59`);

        if (Number.isNaN(tuNgay.getTime()) || Number.isNaN(denNgay.getTime())) {
          throw new BadRequestException("Khoang thoi gian khong hop le");
        }

        if (tuNgay > denNgay) {
          throw new BadRequestException("Tu ngay khong duoc lon hon den ngay");
        }

        return { tuNgay, denNgay };
      }
      default:
        return null;
    }
  }
}
