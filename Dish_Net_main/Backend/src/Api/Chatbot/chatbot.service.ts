import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ChatbotPhienEntity } from './entities/chatbot-phien.entity';
import { ChatbotTinNhanEntity } from './entities/chatbot-tin-nhan.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';
import { callOpenAi, OpenAiMessage } from './openai.client';
import { executeTool, getToolsForRole, toOpenAiTools } from './tools';
import { ChatbotUserContext } from './tools/tool.types';

const MAX_LICH_SU = 12;
const MAX_TOOL_VONG = 3;

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    @InjectRepository(ChatbotPhienEntity)
    private readonly phienRepo: Repository<ChatbotPhienEntity>,
    @InjectRepository(ChatbotTinNhanEntity)
    private readonly tinNhanRepo: Repository<ChatbotTinNhanEntity>,
    @InjectRepository(CuaHangEntity)
    private readonly cuaHangRepo: Repository<CuaHangEntity>,
    @InjectRepository(NguoiDungEntity)
    private readonly nguoiDungRepo: Repository<NguoiDungEntity>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async layDanhSachPhien(idNguoiDung: number) {
    return this.phienRepo
      .createQueryBuilder('p')
      .where('p.id_nguoi_dung = :id', { id: idNguoiDung })
      .orderBy('p.ngay_cap_nhat', 'DESC')
      .limit(20)
      .getMany();
  }

  async layLichSu(idPhien: number, idNguoiDung: number | null) {
    const phien = await this.phienRepo.findOne({ where: { id: idPhien } });
    if (!phien) throw new NotFoundException('Khong tim thay phien chat');
    const idChuPhien = phien.id_nguoi_dung != null ? Number(phien.id_nguoi_dung) : null;
    if (idChuPhien != null && idChuPhien !== idNguoiDung) {
      throw new ForbiddenException('Khong co quyen xem phien nay');
    }
    const tinNhan = await this.tinNhanRepo.find({
      where: { id_phien: idPhien },
      order: { thoi_gian: 'ASC' },
    });
    return {
      phien,
      tin_nhan: tinNhan.filter((m) => m.vai_tro === 'user' || m.vai_tro === 'assistant'),
    };
  }

  async xoaPhien(idPhien: number, idNguoiDung: number) {
    const phien = await this.phienRepo.findOne({ where: { id: idPhien } });
    if (!phien) throw new NotFoundException('Khong tim thay phien chat');
    if (Number(phien.id_nguoi_dung) !== idNguoiDung) {
      throw new ForbiddenException('Khong co quyen xoa');
    }
    await this.phienRepo.remove(phien);
    return { thanh_cong: true };
  }

  async guiTinNhan(
    idNguoiDung: number | null,
    vaiTroJwt: string | null,
    noiDung: string,
    idPhienGui?: number,
  ) {
    const noiDungSach = noiDung?.trim();
    if (!noiDungSach) throw new BadRequestException('Noi dung khong duoc rong');
    if (noiDungSach.length > 2000) {
      throw new BadRequestException('Noi dung qua dai (toi da 2000 ky tu)');
    }

    const ctx = await this.buildUserContext(idNguoiDung, vaiTroJwt);

    let phien = idPhienGui
      ? await this.phienRepo.findOne({ where: { id: idPhienGui } })
      : null;
    if (phien) {
      const idChuPhien = phien.id_nguoi_dung != null ? Number(phien.id_nguoi_dung) : null;
      if (idChuPhien != null && idChuPhien !== idNguoiDung) {
        throw new ForbiddenException('Khong co quyen gui vao phien nay');
      }
    }
    if (!phien) {
      phien = this.phienRepo.create({
        id_nguoi_dung: idNguoiDung,
        tieu_de: noiDungSach.slice(0, 80),
        ngay_tao: new Date(),
        ngay_cap_nhat: new Date(),
      });
      phien = await this.phienRepo.save(phien);
    }

    await this.tinNhanRepo.save(
      this.tinNhanRepo.create({
        id_phien: phien.id,
        vai_tro: 'user',
        noi_dung: noiDungSach,
        thoi_gian: new Date(),
      }),
    );

    const lichSu = await this.tinNhanRepo.find({
      where: { id_phien: phien.id },
      order: { thoi_gian: 'DESC' },
      take: MAX_LICH_SU,
    });
    lichSu.reverse();

    const messages: OpenAiMessage[] = [
      { role: 'system', content: this.buildSystemPrompt(ctx) },
      ...lichSu
        .filter((m) => m.vai_tro === 'user' || m.vai_tro === 'assistant')
        .map((m) => ({
          role: m.vai_tro as 'user' | 'assistant',
          content: m.noi_dung ?? '',
        })),
    ];

    const tools = getToolsForRole(ctx.vai_tro);
    const openAiTools = toOpenAiTools(tools);

    let traLoi = '';
    let vong = 0;
    while (vong < MAX_TOOL_VONG) {
      const response = await callOpenAi(messages, openAiTools);
      const choice = response.choices[0]?.message;
      if (!choice) {
        traLoi = 'Xin loi, hien tai chua the tra loi.';
        break;
      }
      if (choice.tool_calls && choice.tool_calls.length > 0) {
        messages.push({
          role: 'assistant',
          content: choice.content ?? '',
          tool_calls: choice.tool_calls,
        });
        for (const call of choice.tool_calls) {
          let args: Record<string, unknown> = {};
          try {
            args = JSON.parse(call.function.arguments || '{}');
          } catch {
            args = {};
          }
          const ketQua = await executeTool(call.function.name, args, ctx, this.dataSource);
          messages.push({
            role: 'tool',
            tool_call_id: call.id,
            content: JSON.stringify(ketQua).slice(0, 6000),
          });
        }
        vong += 1;
        continue;
      }
      traLoi = choice.content ?? '';
      break;
    }

    if (!traLoi) {
      traLoi = 'Xin loi, toi can them thong tin de tra loi giup ban.';
    }

    const tinAssistant = await this.tinNhanRepo.save(
      this.tinNhanRepo.create({
        id_phien: phien.id,
        vai_tro: 'assistant',
        noi_dung: traLoi,
        thoi_gian: new Date(),
      }),
    );

    phien.ngay_cap_nhat = new Date();
    await this.phienRepo.save(phien);

    return {
      id_phien: phien.id,
      tieu_de: phien.tieu_de,
      tin_nhan: {
        id: tinAssistant.id,
        vai_tro: 'assistant',
        noi_dung: traLoi,
        thoi_gian: tinAssistant.thoi_gian,
      },
    };
  }

  private async buildUserContext(
    idNguoiDung: number | null,
    vaiTroJwt: string | null,
  ): Promise<ChatbotUserContext> {
    if (!idNguoiDung) return { id: null, vai_tro: 'guest' };

    const vaiTro: ChatbotUserContext['vai_tro'] =
      vaiTroJwt === 'admin'
        ? 'admin'
        : vaiTroJwt === 'chu_cua_hang'
          ? 'chu_cua_hang'
          : 'nguoi_dung';

    let idCuaHang: number | null = null;
    if (vaiTro === 'chu_cua_hang' || vaiTro === 'admin') {
      const cuaHang = await this.cuaHangRepo.findOne({
        where: { id_chu_so_huu: idNguoiDung },
        select: ['id'],
      });
      idCuaHang = cuaHang?.id ?? null;
    }

    return { id: idNguoiDung, vai_tro: vaiTro, id_cua_hang: idCuaHang };
  }

  private buildSystemPrompt(ctx: ChatbotUserContext): string {
    const phan = [
      'Ban la tro ly AI cua DishNet - mang xa hoi am thuc ket hop thuong mai dien tu.',
      'Tra loi bang tieng Viet, ngan gon, than thien, dung markdown khi can.',
      'Khi can du lieu cu the (mon an, cua hang, don hang, voucher) HAY GOI TOOL thay vi tu doan.',
      'Neu cau hoi khong lien quan toi am thuc / DishNet, lich su tu choi va goi y chu de phu hop.',
      'Khong tu dat hang, khong tu xac nhan/huy don, chi cung cap thong tin va huong dan.',
    ];
    if (ctx.vai_tro === 'guest') {
      phan.push('Nguoi dung HIEN CHUA DANG NHAP. Khi ho hoi ve don hang ca nhan, hay nhac ho dang nhap truoc.');
    } else if (ctx.vai_tro === 'nguoi_dung') {
      phan.push('Nguoi dung la KHACH HANG. Tap trung tu van mon an, cua hang, theo doi don hang.');
    } else if (ctx.vai_tro === 'chu_cua_hang') {
      phan.push(
        'Nguoi dung la CHU CUA HANG. Co the giup tom tat doanh thu, phan tich danh gia tieu cuc, soan caption / mo ta san pham.',
      );
    } else if (ctx.vai_tro === 'admin') {
      phan.push('Nguoi dung la ADMIN. Co the truy van tong quan he thong.');
    }
    return phan.join(' ');
  }
}
