import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RolesGuard } from "./common/guards/roles.guard";
import { getTypeOrmConfig } from "./database/typeorm.config";
import { AuthModule } from "./Api/Auth/auth.module";
import { AdminModule } from "./Api/Admin/admin.module";
import { StoreModule } from "./Api/Store/store.module";
import { EmailModule } from "./shared/email/email.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    JwtModule.register({}),
    EmailModule,
    AuthModule,
    AdminModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
