import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YeuCauRutTienEntity } from '../User/entities/yeu-cau-rut-tien.entity';
import { TaiKhoanRutTienEntity } from '../User/entities/tai-khoan-rut-tien.entity';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';

@Injectable()
export class AdminWithdrawalService {
  constructor(
    @InjectRepository(YeuCauRutTienEntity)
    private readonly yeuCauRutTienRepo: Repository<YeuCauRutTienEntity>,
    @InjectRepository(TaiKhoanRutTienEntity)
    private readonly taiKhoanRepo: Repository<TaiKhoanRutTienEntity>,
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
  ) {}

  async layDanhSach(query: {
    trang_thai?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const trang = Math.max(Number(query.trang) || 1, 1);
    const soLuong = Math.min(Math.max(Number(query.so_luong) || 10, 1), 100);
    const skip = (trang - 1) * soLuong;

    const qb = this.yeuCauRutTienRepo
      .createQueryBuilder('r')
      .orderBy('r.thoi_gian_yeu_cau', 'DESC')
      .skip(skip)
      .take(soLuong);

    if (query.trang_thai && query.trang_thai !== 'tat_ca') {
      qb.where('r.trang_thai = :tt', { tt: query.trang_thai });
    }

    const [rows, tongSo] = await qb.getManyAndCount();

    const userIds = [...new Set(rows.map((r) => r.id_nguoi_dung))];
    const bankIds = [...new Set(rows.map((r) => r.id_tai_khoan_rut_tien))];

    const [users, banks] = await Promise.all([
      userIds.length
        ? this.nguoiDungRepo.findByIds(userIds)
        : Promise.resolve([]),
      bankIds.length
        ? this.taiKhoanRepo.findByIds(bankIds)
        : Promise.resolve([]),
    ]);

    const userMap = new Map(users.map((u) => [Number(u.id), u]));
    const bankMap = new Map(banks.map((b) => [Number(b.id), b]));

    const duLieu = rows.map((r) => {
      const user = userMap.get(Number(r.id_nguoi_dung));
      const bank = bankMap.get(Number(r.id_tai_khoan_rut_tien));
      return {
        id: Number(r.id),
        ma_yeu_cau: r.ma_yeu_cau,
        so_tien: Number(r.so_tien),
        trang_thai: r.trang_thai,
        ly_do_tu_choi: r.ly_do_tu_choi,
        thoi_gian_yeu_cau: r.thoi_gian_yeu_cau,
        thoi_gian_xu_ly: r.thoi_gian_xu_ly,
        nguoi_dung: user
          ? {
              id: Number(user.id),
              ten_hien_thi: user.ten_hien_thi,
              email: user.email,
            }
          : null,
        tai_khoan_ngan_hang: bank
          ? {
              ten_ngan_hang: bank.ten_ngan_hang,
              so_tai_khoan: bank.so_tai_khoan,
              ten_chu_tai_khoan: bank.ten_chu_tai_khoan,
            }
          : null,
      };
    });

    return {
      du_lieu: duLieu,
      tong_so: tongSo,
      trang,
      so_luong: soLuong,
      tong_trang: Math.ceil(tongSo / soLuong),
    };
  }

  async duyetYeuCau(id: number, adminId: number) {
    const record = await this.yeuCauRutTienRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Không tìm thấy yêu cầu rút tiền');
    if (record.trang_thai !== 'dang_xu_ly') {
      throw new BadRequestException('Yêu cầu này đã được xử lý');
    }

    record.trang_thai = 'da_hoan_thanh';
    record.id_admin_xu_ly = adminId;
    record.thoi_gian_xu_ly = new Date();
    record.ly_do_tu_choi = null;
    await this.yeuCauRutTienRepo.save(record);

    return { message: 'Đã duyệt yêu cầu rút tiền thành công' };
  }

  async tuChoiYeuCau(id: number, adminId: number, lyDo: string) {
    if (!lyDo?.trim()) {
      throw new BadRequestException('Vui lòng nhập lý do từ chối');
    }

    const record = await this.yeuCauRutTienRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Không tìm thấy yêu cầu rút tiền');
    if (record.trang_thai !== 'dang_xu_ly') {
      throw new BadRequestException('Yêu cầu này đã được xử lý');
    }

    record.trang_thai = 'da_tu_choi';
    record.id_admin_xu_ly = adminId;
    record.thoi_gian_xu_ly = new Date();
    record.ly_do_tu_choi = lyDo.trim();
    await this.yeuCauRutTienRepo.save(record);

    return { message: 'Đã từ chối yêu cầu rút tiền' };
  }
}
