import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NguoiDungEntity } from "../Auth/entities/nguoi-dung.entity";
import { BaoCaoEntity } from "./entities/bao-cao.entity";
import { NhatKyHeThongEntity } from "./entities/nhat-ky-he-thong.entity";
import { TepDinhKemEntity } from "./entities/tep-dinh-kem.entity";
import { ThongBaoEntity } from "./entities/thong-bao.entity";
import { BaiVietEntity } from "./entities/bai-viet.entity";
import { BinhLuanEntity } from "./entities/binh-luan.entity";
import { MonAnEntity } from "./entities/mon-an.entity";
import { CuaHangEntity } from "./entities/cua-hang.entity";

type Actor = {
  id: number;
  email: string;
};

@Injectable()
export class AdminReportService {
  constructor(
    @InjectRepository(BaoCaoEntity)
    private readonly baoCaoRepo: Repository<BaoCaoEntity>,
    @InjectRepository(TepDinhKemEntity)
    private readonly tepRepo: Repository<TepDinhKemEntity>,
    @InjectRepository(NhatKyHeThongEntity)
    private readonly nhatKyRepo: Repository<NhatKyHeThongEntity>,
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectRepository(ThongBaoEntity)
    private readonly thongBaoRepo: Repository<ThongBaoEntity>,
    @InjectRepository(BaiVietEntity)
    private readonly baiVietRepo: Repository<BaiVietEntity>,
    @InjectRepository(BinhLuanEntity)
    private readonly binhLuanRepo: Repository<BinhLuanEntity>,
    @InjectRepository(MonAnEntity)
    private readonly monAnRepo: Repository<MonAnEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
  ) {}

  async layDanhSach(query: {
    tim_kiem?: string;
    trang_thai?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const trang = Number(query.trang) || 1;
    const soLuong = Number(query.so_luong) || 10;
    const skip = (trang - 1) * soLuong;

    const qb = this.baoCaoRepo
      .createQueryBuilder("bc")
      .leftJoinAndSelect("bc.nguoi_bao_cao", "nbc")
      .orderBy("bc.thoi_gian_bao_cao", "DESC")
      .addOrderBy("bc.id", "DESC")
      .skip(skip)
      .take(soLuong);

    if (query.tim_kiem?.trim()) {
      qb.andWhere(
        "(bc.ma_bao_cao LIKE :search OR nbc.ten_hien_thi LIKE :search OR bc.noi_dung_bao_cao LIKE :search)",
        { search: `%${query.tim_kiem.trim()}%` },
      );
    }

    if (query.trang_thai) {
      qb.andWhere("bc.trang_thai = :trangThai", {
        trangThai: query.trang_thai,
      });
    }

    const [items, tongSo] = await qb.getManyAndCount();

    return {
      du_lieu: items.map((item) => ({
        id: item.id,
        ma_bao_cao: item.ma_bao_cao,
        nguoi_bao_cao: item.nguoi_bao_cao.ten_hien_thi,
        noi_dung_bao_cao: item.noi_dung_bao_cao,
        noi_dung_bi_bao_cao: this.moTaDoiTuongBiBaoCao(item),
        thoi_gian_bao_cao: item.thoi_gian_bao_cao,
        trang_thai: item.trang_thai === "cho_xu_ly" ? "cho_xu_ly" : "da_xu_ly",
      })),
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async layChiTiet(id: number) {
    const baoCao = await this.baoCaoRepo.findOne({
      where: { id },
      relations: {
        nguoi_bao_cao: true,
        nguoi_vi_pham: true,
        admin_xu_ly: true,
      },
    });

    if (!baoCao) {
      throw new NotFoundException("Bao cao khong ton tai");
    }

    const [tepDinhKem, nhatKy, noiDungBiBaoCao] = await Promise.all([
      this.tepRepo.find({
        where: {
          loai_doi_tuong: "bao_cao",
          id_doi_tuong: id,
        },
        order: {
          thu_tu_hien_thi: "ASC",
          id: "ASC",
        },
      }),
      this.nhatKyRepo.find({
        where: {
          loai_doi_tuong: "bao_cao",
          id_doi_tuong: id,
        },
        relations: {
          nguoi_thuc_hien: true,
        },
        order: {
          ngay_tao: "ASC",
        },
      }),
      this.layThongTinDoiTuongBiBaoCao(baoCao),
    ]);

    return {
      id: baoCao.id,
      ma_bao_cao: baoCao.ma_bao_cao,
      thong_tin_nguoi_bao_cao: {
        id: baoCao.nguoi_bao_cao.id,
        ten_nguoi_dung: baoCao.nguoi_bao_cao.ten_hien_thi,
        email: baoCao.nguoi_bao_cao.email,
        so_dien_thoai: baoCao.nguoi_bao_cao.so_dien_thoai,
      },
      thong_tin_bao_cao: {
        loai_vi_pham: baoCao.loai_vi_pham,
        noi_dung_bao_cao: baoCao.noi_dung_bao_cao,
        thoi_gian_bao_cao: baoCao.thoi_gian_bao_cao,
        trang_thai:
          baoCao.trang_thai === "cho_xu_ly" ? "cho_xu_ly" : "da_xu_ly",
      },
      noi_dung_bi_bao_cao: {
        loai_doi_tuong: baoCao.loai_doi_tuong_bi_bao_cao,
        tieu_de: noiDungBiBaoCao.tieu_de,
        tac_gia: noiDungBiBaoCao.tac_gia,
        mo_ta: noiDungBiBaoCao.mo_ta,
        url: noiDungBiBaoCao.url,
      },
      bang_chung: {
        noi_dung_text: baoCao.bang_chung_text,
        tep_dinh_kem: tepDinhKem.map((tep) => ({
          id: tep.id,
          loai_tep: tep.loai_tep,
          url: tep.duong_dan_tep,
          ghi_chu: tep.ghi_chu,
        })),
      },
      ket_qua_xu_ly: {
        ket_qua_xu_ly: baoCao.ket_qua_xu_ly,
        muc_do_vi_pham: baoCao.muc_do_vi_pham,
        hanh_dong_ap_dung: this.parseActions(baoCao.hanh_dong_ap_dung),
        gui_canh_bao: !!baoCao.gui_canh_bao,
        admin_xu_ly: baoCao.admin_xu_ly?.email ?? null,
        thoi_gian_xu_ly: baoCao.thoi_gian_xu_ly,
      },
      lich_su_xu_ly: nhatKy.map((item) => ({
        id: item.id,
        thoi_gian: item.ngay_tao,
        nguoi_thuc_hien:
          item.nguoi_thuc_hien?.email ??
          item.nguoi_thuc_hien?.ten_hien_thi ??
          "Hệ thống",
        hanh_dong: item.hanh_dong,
        noi_dung: item.noi_dung,
      })),
    };
  }

  async xuLyBaoCao(
    id: number,
    payload: {
      ket_qua_xu_ly: string;
      muc_do_vi_pham: string;
      hanh_dong_ap_dung: string[];
      gui_canh_bao: boolean;
    },
    actor: Actor,
    diaChiIp?: string | null,
  ) {
    if (!payload.ket_qua_xu_ly.trim()) {
      throw new BadRequestException("Ket qua xu ly khong duoc de trong");
    }

    if (!payload.muc_do_vi_pham.trim()) {
      throw new BadRequestException("Muc do vi pham khong duoc de trong");
    }

    if (payload.hanh_dong_ap_dung.length === 0) {
      throw new BadRequestException("Can chon it nhat mot hanh dong xu ly");
    }

    await this.baoCaoRepo.manager.transaction(async (manager) => {
      const baoCaoRepo = manager.getRepository(BaoCaoEntity);
      const nguoiDungRepo = manager.getRepository(NguoiDungEntity);
      const nhatKyRepo = manager.getRepository(NhatKyHeThongEntity);
      const thongBaoRepo = manager.getRepository(ThongBaoEntity);
      const baiVietRepo = manager.getRepository(BaiVietEntity);
      const binhLuanRepo = manager.getRepository(BinhLuanEntity);
      const monAnRepo = manager.getRepository(MonAnEntity);
      const cuaHangRepo = manager.getRepository(CuaHangEntity);

      const baoCao = await baoCaoRepo.findOne({
        where: { id },
        relations: { nguoi_vi_pham: true },
      });

      if (!baoCao) {
        throw new NotFoundException("Bao cao khong ton tai");
      }

      if (baoCao.trang_thai !== "cho_xu_ly") {
        throw new BadRequestException("Bao cao da duoc xu ly");
      }

      const duLieuCu = {
        trang_thai: baoCao.trang_thai,
        ket_qua_xu_ly: baoCao.ket_qua_xu_ly,
        muc_do_vi_pham: baoCao.muc_do_vi_pham,
        hanh_dong_ap_dung: baoCao.hanh_dong_ap_dung,
      };

      baoCao.ket_qua_xu_ly = payload.ket_qua_xu_ly.trim();
      baoCao.muc_do_vi_pham = payload.muc_do_vi_pham.trim().toLowerCase();
      baoCao.hanh_dong_ap_dung = JSON.stringify(payload.hanh_dong_ap_dung);
      baoCao.gui_canh_bao = payload.gui_canh_bao;
      baoCao.id_admin_xu_ly = actor.id;
      baoCao.trang_thai = "da_xu_ly";
      baoCao.thoi_gian_xu_ly = new Date();

      if (payload.hanh_dong_ap_dung.includes("Gỡ nội dung vi phạm")) {
        await this.goNoiDungViPham(baoCao, {
          baiVietRepo,
          binhLuanRepo,
          monAnRepo,
          cuaHangRepo,
        });
      }

      if (baoCao.nguoi_vi_pham) {
        const actions = payload.hanh_dong_ap_dung;
        if (actions.includes("Khóa tài khoản tạm thời")) {
          baoCao.nguoi_vi_pham.trang_thai_tai_khoan = "bi_khoa";
          baoCao.nguoi_vi_pham.kieu_khoa_tai_khoan = "tam_thoi";
          baoCao.nguoi_vi_pham.thoi_gian_mo_khoa = this.congNgay(new Date(), 3);
          baoCao.nguoi_vi_pham.ly_do_khoa_hien_tai = `Tam khoa 3 ngay do vi pham: ${baoCao.loai_vi_pham}`;
          await nguoiDungRepo.save(baoCao.nguoi_vi_pham);
        }

        if (actions.includes("Khóa tài khoản vĩnh viễn")) {
          baoCao.nguoi_vi_pham.trang_thai_tai_khoan = "bi_khoa";
          baoCao.nguoi_vi_pham.kieu_khoa_tai_khoan = "vinh_vien";
          baoCao.nguoi_vi_pham.thoi_gian_mo_khoa = null;
          baoCao.nguoi_vi_pham.ly_do_khoa_hien_tai = `Khoa vinh vien do vi pham: ${baoCao.loai_vi_pham}`;
          await nguoiDungRepo.save(baoCao.nguoi_vi_pham);
        }

        if (payload.gui_canh_bao) {
          await thongBaoRepo.save({
            id_nguoi_nhan: baoCao.nguoi_vi_pham.id,
            loai_thong_bao: "bao_cao",
            loai_doi_tuong: "bao_cao",
            id_doi_tuong: baoCao.id,
            tieu_de: "Tài khoản của bạn có báo cáo đã được xử lý",
            noi_dung: `Báo cáo ${baoCao.ma_bao_cao} đã được xử lý với kết quả: ${payload.ket_qua_xu_ly.trim()}.`,
            da_doc: false,
            thoi_gian_doc: null,
          });
        }
      }

      await baoCaoRepo.save(baoCao);
      await nhatKyRepo.save({
        id_nguoi_thuc_hien: actor.id,
        loai_doi_tuong: "bao_cao",
        id_doi_tuong: baoCao.id,
        hanh_dong: "xu_ly_bao_cao",
        noi_dung: `Ket qua: ${payload.ket_qua_xu_ly.trim()}`,
        du_lieu_cu: duLieuCu,
        du_lieu_moi: {
          trang_thai: baoCao.trang_thai,
          ket_qua_xu_ly: baoCao.ket_qua_xu_ly,
          muc_do_vi_pham: baoCao.muc_do_vi_pham,
          hanh_dong_ap_dung: payload.hanh_dong_ap_dung,
          gui_canh_bao: payload.gui_canh_bao,
        },
        dia_chi_ip: diaChiIp ?? null,
      });
    });

    return { message: "Xu ly bao cao thanh cong" };
  }

  private parseActions(raw: string | null) {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return raw
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  private congNgay(date: Date, soNgay: number) {
    const next = new Date(date);
    next.setDate(next.getDate() + soNgay);
    return next;
  }

  private async layThongTinDoiTuongBiBaoCao(baoCao: BaoCaoEntity) {
    switch (baoCao.loai_doi_tuong_bi_bao_cao) {
      case "bai_viet": {
        const baiViet = await this.baiVietRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        return {
          tieu_de:
            baiViet?.noi_dung?.slice(0, 80) ||
            this.moTaDoiTuongBiBaoCao(baoCao),
          tac_gia: baoCao.nguoi_vi_pham?.ten_hien_thi ?? "Không xác định",
          mo_ta:
            baiViet?.noi_dung ||
            baoCao.bang_chung_text ||
            baoCao.noi_dung_bao_cao,
          url: this.taoUrlDoiTuong(baoCao),
        };
      }
      case "binh_luan": {
        const binhLuan = await this.binhLuanRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        return {
          tieu_de: "Bình luận bị báo cáo",
          tac_gia: baoCao.nguoi_vi_pham?.ten_hien_thi ?? "Không xác định",
          mo_ta:
            binhLuan?.noi_dung ||
            baoCao.bang_chung_text ||
            baoCao.noi_dung_bao_cao,
          url: this.taoUrlDoiTuong(baoCao),
        };
      }
      case "mon_an": {
        const monAn = await this.monAnRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        return {
          tieu_de: monAn?.ten_mon || this.moTaDoiTuongBiBaoCao(baoCao),
          tac_gia: baoCao.nguoi_vi_pham?.ten_hien_thi ?? "Không xác định",
          mo_ta:
            monAn?.mo_ta || baoCao.bang_chung_text || baoCao.noi_dung_bao_cao,
          url: this.taoUrlDoiTuong(baoCao),
        };
      }
      case "cua_hang": {
        const cuaHang = await this.cuaHangRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        return {
          tieu_de: cuaHang?.ten_cua_hang || this.moTaDoiTuongBiBaoCao(baoCao),
          tac_gia: baoCao.nguoi_vi_pham?.ten_hien_thi ?? "Không xác định",
          mo_ta:
            cuaHang?.mo_ta || baoCao.bang_chung_text || baoCao.noi_dung_bao_cao,
          url: this.taoUrlDoiTuong(baoCao),
        };
      }
      case "nguoi_dung":
      default:
        return {
          tieu_de: this.moTaDoiTuongBiBaoCao(baoCao),
          tac_gia: baoCao.nguoi_vi_pham?.ten_hien_thi ?? "Không xác định",
          mo_ta: baoCao.bang_chung_text || baoCao.noi_dung_bao_cao,
          url: this.taoUrlDoiTuong(baoCao),
        };
    }
  }

  private async goNoiDungViPham(
    baoCao: BaoCaoEntity,
    repos: {
      baiVietRepo: Repository<BaiVietEntity>;
      binhLuanRepo: Repository<BinhLuanEntity>;
      monAnRepo: Repository<MonAnEntity>;
      cuaHangRepo: Repository<CuaHangEntity>;
    },
  ) {
    switch (baoCao.loai_doi_tuong_bi_bao_cao) {
      case "bai_viet": {
        const baiViet = await repos.baiVietRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        if (baiViet) {
          baiViet.trang_thai_duyet = "an";
          await repos.baiVietRepo.save(baiViet);
        }
        break;
      }
      case "binh_luan": {
        const binhLuan = await repos.binhLuanRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        if (binhLuan) {
          binhLuan.trang_thai = "an";
          await repos.binhLuanRepo.save(binhLuan);
        }
        break;
      }
      case "mon_an": {
        const monAn = await repos.monAnRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        if (monAn) {
          monAn.trang_thai_ban = "tam_ngung_ban";
          await repos.monAnRepo.save(monAn);
        }
        break;
      }
      case "cua_hang": {
        const cuaHang = await repos.cuaHangRepo.findOne({
          where: { id: baoCao.id_doi_tuong_bi_bao_cao },
        });
        if (cuaHang) {
          cuaHang.trang_thai_hoat_dong = "bi_khoa";
          await repos.cuaHangRepo.save(cuaHang);
        }
        break;
      }
      default:
        break;
    }
  }

  private moTaDoiTuongBiBaoCao(baoCao: BaoCaoEntity) {
    const loaiMap: Record<string, string> = {
      bai_viet: "Bài viết",
      binh_luan: "Bình luận",
      nguoi_dung: "Tài khoản người dùng",
      cua_hang: "Cửa hàng",
      mon_an: "Món ăn",
    };
    const label =
      loaiMap[baoCao.loai_doi_tuong_bi_bao_cao] ??
      baoCao.loai_doi_tuong_bi_bao_cao;
    return `${label} #${baoCao.id_doi_tuong_bi_bao_cao}`;
  }

  private taoUrlDoiTuong(baoCao: BaoCaoEntity) {
    switch (baoCao.loai_doi_tuong_bi_bao_cao) {
      case "bai_viet":
        return `/posts/${baoCao.id_doi_tuong_bi_bao_cao}`;
      case "cua_hang":
        return `/store/${baoCao.id_doi_tuong_bi_bao_cao}`;
      case "mon_an":
        return `/food/${baoCao.id_doi_tuong_bi_bao_cao}`;
      case "nguoi_dung":
        return `/profile/${baoCao.id_doi_tuong_bi_bao_cao}`;
      case "binh_luan":
        return `/comments/${baoCao.id_doi_tuong_bi_bao_cao}`;
      default:
        return null;
    }
  }
}
