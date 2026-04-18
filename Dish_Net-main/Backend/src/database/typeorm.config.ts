import { join } from "node:path";
import { NguoiDungEntity } from "../Api/Auth/entities/nguoi-dung.entity";
import { MaXacThucEntity } from "../Api/Auth/entities/ma-xac-thuc.entity";
import { PhienDangNhapEntity } from "../Api/Auth/entities/phien-dang-nhap.entity";
import { YeuCauNangCapEntity } from "../Api/Admin/entities/yeu-cau-nang-cap.entity";
import { TepDinhKemEntity } from "../Api/Admin/entities/tep-dinh-kem.entity";
import { NhatKyHeThongEntity } from "../Api/Admin/entities/nhat-ky-he-thong.entity";
import { YeuCauHoTroEntity } from "../Api/Admin/entities/yeu-cau-ho-tro.entity";
import { BaoCaoEntity } from "../Api/Admin/entities/bao-cao.entity";
import { ThongBaoEntity } from "../Api/Admin/entities/thong-bao.entity";
import { CuaHangEntity } from "../Api/Admin/entities/cua-hang.entity";
import { MonAnEntity } from "../Api/Admin/entities/mon-an.entity";
import { BaiVietEntity } from "../Api/Admin/entities/bai-viet.entity";
import { BinhLuanEntity } from "../Api/Admin/entities/binh-luan.entity";
import { KhuyenMaiEntity } from "../Api/Admin/entities/khuyen-mai.entity";
import { DanhMucMonEntity } from "../Api/Admin/entities/danh-muc-mon.entity";
import { ToppingEntity } from "../Api/Admin/entities/topping.entity";
import { DonHangEntity } from "../Api/Admin/entities/don-hang.entity";
import { DonHangChiTietEntity } from "../Api/Admin/entities/don-hang-chi-tiet.entity";
import { LichSuDonHangEntity } from "../Api/Admin/entities/lich-su-don-hang.entity";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import type { DataSourceOptions } from "typeorm";

export function getTypeOrmConfig(): TypeOrmModuleOptions & DataSourceOptions {
  return {
    type: "mysql",
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? "dishnet",
    entities: [
      NguoiDungEntity,
      MaXacThucEntity,
      PhienDangNhapEntity,
      YeuCauNangCapEntity,
      TepDinhKemEntity,
      NhatKyHeThongEntity,
      YeuCauHoTroEntity,
      BaoCaoEntity,
      ThongBaoEntity,
      CuaHangEntity,
      MonAnEntity,
      BaiVietEntity,
      BinhLuanEntity,
      KhuyenMaiEntity,
      DanhMucMonEntity,
      ToppingEntity,
      DonHangEntity,
      DonHangChiTietEntity,
      LichSuDonHangEntity,
    ],
    migrations: [join(__dirname, "migrations", "*{.ts,.js}")],
    synchronize: false,
    autoLoadEntities: true,
  };
}
