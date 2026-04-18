import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreOrderController } from './store-order.controller';
import { StoreOrderService } from './store-order.service';
import { StorePromotionController } from './store-promotion.controller';
import { StorePromotionService } from './store-promotion.service';
import { StoreMenuController } from './store-menu.controller';
import { StoreMenuService } from './store-menu.service';
import { DonHangEntity } from '../Admin/entities/don-hang.entity';
import { DonHangChiTietEntity } from '../Admin/entities/don-hang-chi-tiet.entity';
import { LichSuDonHangEntity } from '../Admin/entities/lich-su-don-hang.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { DanhGiaEntity } from './entities/danh-gia.entity';
import { DanhMucMonEntity } from '../Admin/entities/danh-muc-mon.entity';
import { MonAnEntity } from '../Admin/entities/mon-an.entity';
import { ToppingEntity } from '../Admin/entities/topping.entity';
import { KhuyenMaiEntity } from '../Admin/entities/khuyen-mai.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DonHangEntity,
      DonHangChiTietEntity,
      LichSuDonHangEntity,
      CuaHangEntity,
      DanhGiaEntity,
      KhuyenMaiEntity,
      DanhMucMonEntity,
      MonAnEntity,
      ToppingEntity,
    ]),
  ],
  controllers: [StoreOrderController, StorePromotionController, StoreMenuController],
  providers: [StoreOrderService, StorePromotionService, StoreMenuService],
})
export class StoreModule {}
