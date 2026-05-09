import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { LichSuDonHangEntity } from '../Admin/entities/lich-su-don-hang.entity';
import { ThanhToanEntity } from '../User/entities/thanh-toan.entity';

@Injectable()
export class StoreOrderTimeoutService implements OnModuleInit, OnModuleDestroy {
  private timer: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(
    @InjectRepository(DonHangEntity)
    private readonly donHangRepo: Repository<DonHangEntity>,
    @InjectRepository(LichSuDonHangEntity)
    private readonly lichSuDonHangRepo: Repository<LichSuDonHangEntity>,
    @InjectRepository(ThanhToanEntity)
    private readonly thanhToanRepo: Repository<ThanhToanEntity>,
  ) {}

  onModuleInit() {
    // Delay a bit after boot, then run every minute.
    this.timer = setInterval(() => {
      void this.xuLyDonQuaHan();
    }, 60_000);

    setTimeout(() => {
      void this.xuLyDonQuaHan();
    }, 5_000);
  }

  onModuleDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async xuLyDonQuaHan() {
    if (this.isRunning) return;
    this.isRunning = true;
    try {
      await this.tuDongHuyChoXacNhanQua30Phut();
      await this.tuDongHuyChoGiaoQua60Phut();
    } finally {
      this.isRunning = false;
    }
  }

  private async tuDongHuyChoXacNhanQua30Phut() {
    const mocQuaHan = new Date(Date.now() - 30 * 60 * 1000);
    const donQuaHan = await this.donHangRepo
      .createQueryBuilder('dh')
      .where('dh.trang_thai_don_hang = :status', { status: 'cho_xac_nhan' })
      .andWhere('dh.thoi_gian_dat <= :mocQuaHan', { mocQuaHan })
      .orderBy('dh.thoi_gian_dat', 'ASC')
      .limit(100)
      .getMany();

    for (const donHang of donQuaHan) {
      await this.huyDonVaHoanTienNeuCo(
        donHang,
        'Hệ thống tự động hủy do quá 30 phút chưa xác nhận',
      );
    }
  }

  private async tuDongHuyChoGiaoQua60Phut() {
    const mocQuaHan = new Date(Date.now() - 60 * 60 * 1000);
    const donQuaHan = await this.donHangRepo
      .createQueryBuilder('dh')
      .where('dh.trang_thai_don_hang IN (:...statuses)', {
        statuses: ['da_xac_nhan', 'dang_chuan_bi'],
      })
      .andWhere('dh.thoi_gian_xac_nhan IS NOT NULL')
      .andWhere('dh.thoi_gian_xac_nhan <= :mocQuaHan', { mocQuaHan })
      .orderBy('dh.thoi_gian_xac_nhan', 'ASC')
      .limit(100)
      .getMany();

    for (const donHang of donQuaHan) {
      await this.huyDonVaHoanTienNeuCo(
        donHang,
        'Hệ thống tự động hủy do quá 60 phút chưa giao đơn',
      );
    }
  }

  private async huyDonVaHoanTienNeuCo(donHang: DonHangEntity, lyDo: string) {
    const trangThaiCu = donHang.trang_thai_don_hang;
    const now = new Date();

    donHang.trang_thai_don_hang = 'da_huy';
    donHang.nguoi_huy = 'he_thong';
    donHang.ly_do_huy = lyDo;
    donHang.thoi_gian_huy = now;
    await this.donHangRepo.save(donHang);

    await this.lichSuDonHangRepo.save({
      id_don_hang: Number(donHang.id),
      trang_thai_tu: trangThaiCu,
      trang_thai_den: 'da_huy',
      noi_dung: lyDo,
      id_nguoi_cap_nhat: null,
      thoi_gian_cap_nhat: now,
    });

    const thanhToan = await this.thanhToanRepo.findOne({
      where: { id_don_hang: Number(donHang.id) },
      order: { id: 'DESC' },
    });

    if (!thanhToan) return;
    if (thanhToan.trang_thai_thanh_toan !== 'thanh_cong') return;

    thanhToan.trang_thai_thanh_toan = 'da_hoan_tien';
    thanhToan.so_tien_hoan_tien = Number(donHang.tong_thanh_toan);
    thanhToan.thoi_gian_hoan_tien = now;
    thanhToan.noi_dung_loi = null;
    await this.thanhToanRepo.save(thanhToan);
  }
}
