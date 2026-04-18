import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { NguoiDungEntity } from "./entities/nguoi-dung.entity";
import { MaXacThucEntity } from "./entities/ma-xac-thuc.entity";
import { PhienDangNhapEntity } from "./entities/phien-dang-nhap.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NguoiDungEntity,
      MaXacThucEntity,
      PhienDangNhapEntity,
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
