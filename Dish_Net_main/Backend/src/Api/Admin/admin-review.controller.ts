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
import { AdminReviewService } from "./admin-review.service";
import {
  DanhSachYeuCauQueryDto,
  PheDuyetYeuCauDto,
  TuChoiYeuCauDto,
} from "./dto/admin-review.dto";

type AuthenticatedRequest = Request & {
  user?: {
    sub: number;
    email: string;
    vai_tro: string;
  };
};

@Controller("admin/yeu-cau-he-thong")
@Roles("admin")
export class AdminReviewController {
  constructor(private readonly adminReviewService: AdminReviewService) {}

  @Get()
  async layDanhSach(@Query() query: DanhSachYeuCauQueryDto) {
    return this.adminReviewService.layDanhSach(query);
  }

  @Get(":id")
  async layChiTiet(@Param("id", ParseIntPipe) id: number) {
    return this.adminReviewService.layChiTiet(id);
  }

  @Patch(":id/phe-duyet")
  async pheDuyet(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: PheDuyetYeuCauDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminReviewService.pheDuyet(
      id,
      {
        id: req.user?.sub ?? 0,
      },
      dto.ghi_chu,
      req.ip,
    );
  }

  @Patch(":id/tu-choi")
  async tuChoi(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: TuChoiYeuCauDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.adminReviewService.tuChoi(
      id,
      dto.ly_do,
      {
        id: req.user?.sub ?? 0,
      },
      req.ip,
    );
  }
}
