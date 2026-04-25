import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { Roles } from "../../common/decorators/roles.decorator";
import { AdminReportService } from "./admin-report.service";
import { DanhSachBaoCaoQueryDto, XuLyBaoCaoDto } from "./dto/admin-report.dto";

type AuthenticatedRequest = Request & {
  user?: {
    sub: number;
    email: string;
    vai_tro: string;
  };
};

@Controller("admin/bao-cao")
@Roles("admin")
export class AdminReportController {
  constructor(private readonly adminReportService: AdminReportService) {}

  @Get()
  async layDanhSach(@Query() query: DanhSachBaoCaoQueryDto) {
    return this.adminReportService.layDanhSach(query);
  }

  @Get(":id")
  async layChiTiet(@Param("id", ParseIntPipe) id: number) {
    return this.adminReportService.layChiTiet(id);
  }

  @Patch(":id/xu-ly")
  async xuLyBaoCao(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: XuLyBaoCaoDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminReportService.xuLyBaoCao(
      id,
      dto,
      {
        id: req.user?.sub ?? 0,
        email: req.user?.email ?? "admin",
      },
      req.ip,
    );
  }
}
