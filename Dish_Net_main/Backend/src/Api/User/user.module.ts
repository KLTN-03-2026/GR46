import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonAnEntity } from '../Admin/entities/mon-an.entity';
import { DanhMucMonEntity } from '../Admin/entities/danh-muc-mon.entity';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { DonHangChiTietEntity } from '../Admin/entities/don-hang-chi-tiet.entity';
import { LichSuDonHangEntity } from '../Admin/entities/lich-su-don-hang.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { BaiVietEntity } from '../Admin/entities/bai-viet.entity';
import { BinhLuanEntity } from '../Admin/entities/binh-luan.entity';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';
import { DanhGiaEntity } from '../Store/entities/danh-gia.entity';
import { TepDinhKemEntity } from '../Admin/entities/tep-dinh-kem.entity';
import { KhuyenMaiEntity } from '../Admin/entities/khuyen-mai.entity';
import { BaoCaoEntity } from '../Admin/entities/bao-cao.entity';
import { ThongBaoEntity } from '../Admin/entities/thong-bao.entity';
import { YeuCauHoTroEntity } from '../Admin/entities/yeu-cau-ho-tro.entity';
import { YeuCauNangCapEntity } from '../Admin/entities/yeu-cau-nang-cap.entity';
import { TuongTacEntity } from '../Admin/entities/tuong-tac.entity';
import { DanhGiaDaLuuEntity } from './entities/danh-gia-da-luu.entity';
import { QuanHeNguoiDungEntity } from './entities/quan-he-nguoi-dung.entity';
import { CuocTroChuyenEntity } from './entities/cuoc-tro-chuyen.entity';
import { TinNhanEntity } from './entities/tin-nhan.entity';
import { GioHangChiTietEntity } from './entities/gio-hang-chi-tiet.entity';
import { ThanhToanEntity } from './entities/thanh-toan.entity';
import { DonHangKhuyenMaiEntity } from './entities/don-hang-khuyen-mai.entity';
import { PhienThanhToanEntity } from './entities/phien-thanh-toan.entity';
import { UserContentController } from './user-content.controller';
import { UserContentService } from './user-content.service';
import { UserCommerceController } from './user-commerce.controller';
import { UserCommerceService } from './user-commerce.service';
import {
  UserVnpayApiPrefixedController,
  UserVnpayController,
} from './user-vnpay.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MonAnEntity,
      DanhMucMonEntity,
      DonHangEntity,
      DonHangChiTietEntity,
      LichSuDonHangEntity,
      CuaHangEntity,
      BaiVietEntity,
      BinhLuanEntity,
      NguoiDungEntity,
      DanhGiaEntity,
      TepDinhKemEntity,
      KhuyenMaiEntity,
      BaoCaoEntity,
      ThongBaoEntity,
      YeuCauHoTroEntity,
      YeuCauNangCapEntity,
      TuongTacEntity,
      DanhGiaDaLuuEntity,
      QuanHeNguoiDungEntity,
      CuocTroChuyenEntity,
      TinNhanEntity,
      GioHangChiTietEntity,
      ThanhToanEntity,
      DonHangKhuyenMaiEntity,
      PhienThanhToanEntity,
    ]),
  ],
  controllers: [
    UserContentController,
    UserCommerceController,
    UserVnpayController,
    UserVnpayApiPrefixedController,
  ],
  providers: [UserContentService, UserCommerceService],
})
export class UserModule {}
