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
import { AdminSupportService } from "./admin-support.service";
import {
  DanhSachYeuCauHoTroQueryDto,
  PhanHoiYeuCauHoTroDto,
} from "./dto/admin-support.dto";

type AuthenticatedRequest = Request & {
  user?: {
    sub: number;
    email: string;
    vai_tro: string;
  };
};

@Controller("admin/yeu-cau-ho-tro")
@Roles("admin")
export class AdminSupportController {
  constructor(private readonly adminSupportService: AdminSupportService) {}

  @Get()
  async layDanhSach(@Query() query: DanhSachYeuCauHoTroQueryDto) {
    return this.adminSupportService.layDanhSach(query);
  }

  @Get(":id")
  async layChiTiet(@Param("id", ParseIntPipe) id: number) {
    return this.adminSupportService.layChiTiet(id);
  }

  @Patch(":id/phan-hoi")
  async phanHoi(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: PhanHoiYeuCauHoTroDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminSupportService.phanHoi(
      id,
      dto.noi_dung_phan_hoi,
      req.user?.sub ?? 0,
    );
  }
}
