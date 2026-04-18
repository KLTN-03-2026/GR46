import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { Roles } from "../../common/decorators/roles.decorator";
import { AdminPromotionService } from "./admin-promotion.service";
import {
  CapNhatKhuyenMaiDto,
  DanhSachKhuyenMaiQueryDto,
  TaoKhuyenMaiDto,
} from "./dto/admin-promotion.dto";

type AuthenticatedRequest = Request & {
  user?: {
    sub: number;
    email: string;
    vai_tro: string;
  };
};

@Controller("admin/khuyen-mai")
@Roles("admin")
export class AdminPromotionController {
  constructor(private readonly adminPromotionService: AdminPromotionService) {}

  @Get()
  async layDanhSach(@Query() query: DanhSachKhuyenMaiQueryDto) {
    return this.adminPromotionService.layDanhSach(query);
  }

  @Post()
  async taoKhuyenMai(
    @Body() dto: TaoKhuyenMaiDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminPromotionService.tao(
      dto,
      {
        id: req.user?.sub ?? 0,
        email: req.user?.email ?? "admin",
      },
      req.ip,
    );
  }

  @Patch(":id")
  async capNhatKhuyenMai(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CapNhatKhuyenMaiDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminPromotionService.capNhat(
      id,
      dto,
      {
        id: req.user?.sub ?? 0,
        email: req.user?.email ?? "admin",
      },
      req.ip,
    );
  }

  @Patch(":id/tam-dung")
  async tamDungKhuyenMai(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminPromotionService.tamDung(
      id,
      {
        id: req.user?.sub ?? 0,
        email: req.user?.email ?? "admin",
      },
      req.ip,
    );
  }

  @Delete(":id")
  async xoaKhuyenMai(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminPromotionService.xoa(
      id,
      {
        id: req.user?.sub ?? 0,
        email: req.user?.email ?? "admin",
      },
      req.ip,
    );
  }
}
