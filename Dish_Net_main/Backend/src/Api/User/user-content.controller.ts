import {
  Body,
  Controller,
  BadRequestException,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserContentService } from './user-content.service';
import {
  BangXepHangChiTietQueryDto,
  BangXepHangMiniQueryDto,
  BaoCaoNguoiDungDto,
  BaoCaoBaiVietDto,
  ChinhSuaTrangCaNhanDto,
  KhamPhaQueryDto,
  MonTheoDanhMucQueryDto,
  NoiDungTrangCaNhanQueryDto,
  PhanTrangQueryDto,
  TaoBinhLuanDto,
  TimKiemQueryDto,
} from './dto/user-content.dto';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('user')
export class UserContentController {
  constructor(private readonly userContentService: UserContentService) {}

  /**
   * PB04 - Tìm kiếm
   * GET /user/tim-kiem
   */
  @Public()
  @Get('tim-kiem')
  async timKiem(@Query() query: TimKiemQueryDto) {
    return this.userContentService.timKiem(query);
  }

  /**
   * PB11 - Bảng xếp hạng mini
   * GET /user/bang-xep-hang/mini
   */
  @Public()
  @Get('bang-xep-hang/mini')
  async layBangXepHangMini(@Query() query: BangXepHangMiniQueryDto) {
    return this.userContentService.layBangXepHangMini(query);
  }

  /**
   * PB11 - Bảng xếp hạng chi tiết
   * GET /user/bang-xep-hang
   */
  @Public()
  @Get('bang-xep-hang')
  async layBangXepHangChiTiet(@Query() query: BangXepHangChiTietQueryDto) {
    return this.userContentService.layBangXepHangChiTiet(query);
  }

  /**
   * PB13 - Trang khám phá
   * GET /user/kham-pha
   */
  @Public()
  @Get('kham-pha')
  async layTrangKhamPha(@Query() query: KhamPhaQueryDto) {
    return this.userContentService.layTrangKhamPha(query);
  }

  /**
   * PB13 - Món ăn theo danh mục
   * GET /user/kham-pha/danh-muc/:idDanhMuc
   */
  @Public()
  @Get('kham-pha/danh-muc/:idDanhMuc')
  async layMonTheoDanhMuc(
    @Param('idDanhMuc') idDanhMuc: number,
    @Query() query: MonTheoDanhMucQueryDto,
  ) {
    return this.userContentService.layMonTheoDanhMuc(idDanhMuc, query);
  }

  /**
   * PB08 - Xem thông tin trang cá nhân
   * GET /user/trang-ca-nhan/:idNguoiDung
   */
  @Public()
  @Get('trang-ca-nhan/:idNguoiDung')
  async layThongTinTrangCaNhan(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
  ) {
    return this.userContentService.layThongTinTrangCaNhan(
      idNguoiDung,
      req.user?.sub,
    );
  }

  /**
   * PB08 - Xem nội dung trang cá nhân theo tab
   * GET /user/trang-ca-nhan/:idNguoiDung/noi-dung
   */
  @Public()
  @Get('trang-ca-nhan/:idNguoiDung/noi-dung')
  async layNoiDungTrangCaNhan(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
    @Query() query: NoiDungTrangCaNhanQueryDto,
  ) {
    return this.userContentService.layNoiDungTrangCaNhan(
      idNguoiDung,
      query,
      req.user?.sub,
    );
  }

  /**
   * PB12 - Trạng thái tương tác với người dùng
   * GET /user/nguoi-dung/:idNguoiDung/tuong-tac
   */
  @Get('nguoi-dung/:idNguoiDung/tuong-tac')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async layTrangThaiTuongTac(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
  ) {
    return this.userContentService.layTrangThaiTuongTacNguoiDung(
      idNguoiDung,
      req.user!.sub,
    );
  }

  /**
   * PB12 - Theo dõi / bỏ theo dõi
   * POST /user/nguoi-dung/:idNguoiDung/theo-doi
   */
  @Post('nguoi-dung/:idNguoiDung/theo-doi')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async toggleTheoDoi(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
  ) {
    return this.userContentService.toggleTheoDoiNguoiDung(
      idNguoiDung,
      req.user!.sub,
    );
  }

  /**
   * PB12 - Chặn / bỏ chặn
   * POST /user/nguoi-dung/:idNguoiDung/chan
   */
  @Post('nguoi-dung/:idNguoiDung/chan')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async toggleChan(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
  ) {
    return this.userContentService.toggleChanNguoiDung(
      idNguoiDung,
      req.user!.sub,
    );
  }

  /**
   * PB12 - Báo cáo tài khoản người dùng
   * POST /user/nguoi-dung/:idNguoiDung/bao-cao
   */
  @Post('nguoi-dung/:idNguoiDung/bao-cao')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async baoCaoNguoiDung(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
    @Body() dto: BaoCaoNguoiDungDto,
  ) {
    return this.userContentService.baoCaoNguoiDung(
      idNguoiDung,
      req.user!.sub,
      dto,
    );
  }

  /**
   * PB12 - Bắt đầu trò chuyện
   * POST /user/nguoi-dung/:idNguoiDung/bat-dau-tro-chuyen
   */
  @Post('nguoi-dung/:idNguoiDung/bat-dau-tro-chuyen')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async batDauTroChuyen(
    @Req() req: AuthenticatedRequest,
    @Param('idNguoiDung') idNguoiDung: number,
  ) {
    return this.userContentService.batDauTroChuyen(idNguoiDung, req.user!.sub);
  }

  /**
   * PB09 - Lấy dữ liệu form chỉnh sửa trang cá nhân
   * GET /user/trang-ca-nhan/me/chinh-sua
   */
  @Get('trang-ca-nhan/me/chinh-sua')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async layThongTinChinhSua(@Req() req: AuthenticatedRequest) {
    return this.userContentService.layThongTinChinhSuaTrangCaNhan(req.user!.sub);
  }

  /**
   * PB09 - Cập nhật trang cá nhân
   * POST /user/trang-ca-nhan/me/chinh-sua
   */
  @Post('trang-ca-nhan/me/chinh-sua')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async chinhSuaTrangCaNhan(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ChinhSuaTrangCaNhanDto,
  ) {
    return this.userContentService.chinhSuaTrangCaNhan(req.user!.sub, dto);
  }

  /**
   * PB09 - Upload ảnh đại diện
   * POST /user/trang-ca-nhan/me/upload-anh-dai-dien
   */
  @Post('trang-ca-nhan/me/upload-anh-dai-dien')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
          const uploadDir = join(process.cwd(), 'uploads', 'avatars');
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
          cb(null, `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
        },
      }),
      fileFilter: (_req: any, file: any, cb: any) => {
        if (!file.mimetype?.startsWith('image/')) {
          cb(new BadRequestException('Chỉ hỗ trợ file ảnh'), false);
          return;
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadAnhDaiDien(
    @Req() req: any,
    @UploadedFile() file?: any,
  ) {
    if (!file) {
      throw new BadRequestException('Thiếu file ảnh tải lên');
    }
    const host = req.get('host') ?? '127.0.0.1:3009';
    const protocol = req.protocol ?? 'http';
    const url = `${protocol}://${host}/uploads/avatars/${file.filename}`;
    return { url };
  }

  /**
   * PB05 - Xem đánh giá món ăn
   * GET /user/mon-an/:idMonAn/danh-gia
   */
  @Public()
  @Get('mon-an/:idMonAn/danh-gia')
  async layDanhGiaMonAn(
    @Param('idMonAn') idMonAn: number,
    @Query() query: PhanTrangQueryDto,
  ) {
    return this.userContentService.layDanhGiaMonAn(
      idMonAn,
      query.trang,
      query.so_luong,
    );
  }

  /**
   * PB05 - Xem chi tiết đánh giá
   * GET /user/danh-gia/:idDanhGia
   */
  @Public()
  @Get('danh-gia/:idDanhGia')
  async layChiTietDanhGia(@Param('idDanhGia') idDanhGia: number) {
    return this.userContentService.layChiTietDanhGia(idDanhGia);
  }

  /**
   * PB05 - Lưu/Bỏ lưu đánh giá
   * POST /user/danh-gia/:idDanhGia/luu
   */
  @Post('danh-gia/:idDanhGia/luu')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async toggleLuuDanhGia(
    @Req() req: AuthenticatedRequest,
    @Param('idDanhGia') idDanhGia: number,
  ) {
    return this.userContentService.toggleLuuDanhGia(idDanhGia, req.user!.sub);
  }

  /**
   * PB05 - Danh sách đánh giá đã lưu
   * GET /user/danh-gia-da-luu
   */
  @Get('danh-gia-da-luu')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async layDanhGiaDaLuu(
    @Req() req: AuthenticatedRequest,
    @Query() query: PhanTrangQueryDto,
  ) {
    return this.userContentService.layDanhGiaDaLuu(
      req.user!.sub,
      query.trang,
      query.so_luong,
    );
  }

  /**
   * PB06 - Xem bảng tin
   * GET /user/bang-tin
   */
  @Public()
  @Get('bang-tin')
  async layBangTin(
    @Req() req: AuthenticatedRequest,
    @Query() query: PhanTrangQueryDto,
  ) {
    return this.userContentService.layBangTin(
      query.trang,
      query.so_luong,
      req.user?.sub,
    );
  }

  /**
   * PB06 - Xem chi tiết bài viết
   * GET /user/bai-viet/:idBaiViet
   */
  @Public()
  @Get('bai-viet/:idBaiViet')
  async layChiTietBaiViet(@Param('idBaiViet') idBaiViet: number) {
    return this.userContentService.layChiTietBaiViet(idBaiViet);
  }

  /**
   * PB07 - Danh sách bình luận bài viết
   * GET /user/bai-viet/:idBaiViet/binh-luan
   */
  @Public()
  @Get('bai-viet/:idBaiViet/binh-luan')
  async layBinhLuanBaiViet(
    @Param('idBaiViet') idBaiViet: number,
    @Query() query: PhanTrangQueryDto,
  ) {
    return this.userContentService.layBinhLuanBaiViet(
      idBaiViet,
      query.trang,
      query.so_luong,
    );
  }

  /**
   * PB07 - Bình luận bài viết
   * POST /user/bai-viet/:idBaiViet/binh-luan
   */
  @Post('bai-viet/:idBaiViet/binh-luan')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async taoBinhLuan(
    @Req() req: AuthenticatedRequest,
    @Param('idBaiViet') idBaiViet: number,
    @Body() dto: TaoBinhLuanDto,
  ) {
    return this.userContentService.taoBinhLuan(
      idBaiViet,
      req.user!.sub,
      dto.noi_dung,
      dto.id_binh_luan_cha,
    );
  }

  /**
   * PB07 - Yêu thích bài viết (toggle)
   * POST /user/bai-viet/:idBaiViet/tuong-tac/thich
   */
  @Post('bai-viet/:idBaiViet/tuong-tac/thich')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async toggleThich(
    @Req() req: AuthenticatedRequest,
    @Param('idBaiViet') idBaiViet: number,
  ) {
    return this.userContentService.toggleThichBaiViet(idBaiViet, req.user!.sub);
  }

  /**
   * PB07 - Lưu bài viết (toggle)
   * POST /user/bai-viet/:idBaiViet/tuong-tac/luu
   */
  @Post('bai-viet/:idBaiViet/tuong-tac/luu')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async toggleLuu(
    @Req() req: AuthenticatedRequest,
    @Param('idBaiViet') idBaiViet: number,
  ) {
    return this.userContentService.toggleLuuBaiViet(idBaiViet, req.user!.sub);
  }

  /**
   * PB07 - Chia sẻ bài viết
   * POST /user/bai-viet/:idBaiViet/tuong-tac/chia-se
   */
  @Post('bai-viet/:idBaiViet/tuong-tac/chia-se')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async chiaSe(
    @Req() req: AuthenticatedRequest,
    @Param('idBaiViet') idBaiViet: number,
  ) {
    return this.userContentService.chiaSeBaiViet(idBaiViet, req.user!.sub);
  }

  /**
   * PB07 - Báo cáo bài viết
   * POST /user/bai-viet/:idBaiViet/bao-cao
   */
  @Post('bai-viet/:idBaiViet/bao-cao')
  @Roles('nguoi_dung', 'nha_sang_tao', 'chu_cua_hang')
  async baoCaoBaiViet(
    @Req() req: AuthenticatedRequest,
    @Param('idBaiViet') idBaiViet: number,
    @Body() dto: BaoCaoBaiVietDto,
  ) {
    return this.userContentService.baoCaoBaiViet(
      idBaiViet,
      req.user!.sub,
      dto,
    );
  }
}
