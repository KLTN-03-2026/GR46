import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { TongQuanCuaHangQueryDto } from './dto/store-overview.dto';
import { StoreOverviewService } from './store-overview.service';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('store/tong-quan')
@Roles('chu_cua_hang')
export class StoreOverviewController {
  constructor(private readonly storeOverviewService: StoreOverviewService) {}

  /**
   * PB24 - Tổng quan cửa hàng
   * GET /api/store/tong-quan
   */
  @Get()
  async layTongQuan(
    @Req() req: AuthenticatedRequest,
    @Query() query: TongQuanCuaHangQueryDto,
  ) {
    const userId = req.user!.sub;
    return this.storeOverviewService.layTongQuan(userId, query);
  }

  /**
   * PATCH /api/store/tong-quan/trang-thai
   * Body: { trang_thai: 'hoat_dong' | 'tam_nghi' }
   */
  @Patch('trang-thai')
  async capNhatTrangThai(
    @Req() req: AuthenticatedRequest,
    @Body() body: { trang_thai?: string },
  ) {
    const userId = req.user!.sub;
    return this.storeOverviewService.capNhatTrangThaiHoatDong(
      userId,
      body?.trang_thai,
    );
  }

  /**
   * POST /api/store/tong-quan/upload-anh-dai-dien
   */
  @Post('upload-anh-dai-dien')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
          const uploadDir = join(process.cwd(), 'uploads', 'stores');
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (_req: any, file: any, cb: any) => {
          const ext = extname(file.originalname || '').toLowerCase() || '.jpg';
          const safeExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
            ? ext
            : '.jpg';
          cb(null, `store-${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
        },
      }),
      fileFilter: (_req: any, file: any, cb: any) => {
        if (!file.mimetype?.startsWith('image/')) {
          cb(new BadRequestException('Chỉ hỗ trợ file ảnh'), false);
          return;
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadAnhDaiDien(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file?: any,
  ) {
    if (!file) {
      throw new BadRequestException('Thiếu file ảnh tải lên');
    }
    const host = (req as any).get?.('host') ?? '127.0.0.1:3009';
    const protocol = (req as any).protocol ?? 'http';
    const url = `${protocol}://${host}/uploads/stores/${file.filename}`;
    await this.storeOverviewService.capNhatAnhDaiDien(req.user!.sub, url);
    return { url };
  }
}
