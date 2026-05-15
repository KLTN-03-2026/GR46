import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { ChatbotService } from './chatbot.service';
import { GuiTinNhanDto } from './dto/chatbot.dto';

type AuthenticatedRequest = Request & {
  user?: { sub: number; email: string; vai_tro: string };
};

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  /**
   * Gui tin nhan toi chatbot. Public: cho phep ca khach (nhung tinh nang doi auth se bi tu choi).
   */
  @Public()
  @Post('gui')
  async gui(@Req() req: AuthenticatedRequest, @Body() dto: GuiTinNhanDto) {
    const idNguoiDung = req.user?.sub ?? null;
    const vaiTro = req.user?.vai_tro ?? null;
    return this.chatbotService.guiTinNhan(idNguoiDung, vaiTro, dto.noi_dung, dto.id_phien);
  }

  /**
   * Lich su 1 phien chat.
   */
  @Get('phien/:id')
  async layLichSu(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.layLichSu(id, req.user?.sub ?? null);
  }

  /**
   * Danh sach phien cua nguoi dung dang dang nhap.
   */
  @Get('phien')
  async danhSachPhien(@Req() req: AuthenticatedRequest) {
    return this.chatbotService.layDanhSachPhien(req.user!.sub);
  }

  @Delete('phien/:id')
  async xoa(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.xoaPhien(id, req.user!.sub);
  }
}
