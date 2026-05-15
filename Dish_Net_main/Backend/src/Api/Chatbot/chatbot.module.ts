import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotPhienEntity } from './entities/chatbot-phien.entity';
import { ChatbotTinNhanEntity } from './entities/chatbot-tin-nhan.entity';
import { CuaHangEntity } from '../Admin/entities/cua-hang.entity';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      ChatbotPhienEntity,
      ChatbotTinNhanEntity,
      CuaHangEntity,
      NguoiDungEntity,
    ]),
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
