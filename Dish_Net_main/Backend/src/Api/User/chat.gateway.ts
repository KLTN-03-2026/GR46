import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { AUTH_COOKIE_NAME } from '../../common/constants/auth.constants';
import { UserCommerceService } from './user-commerce.service';

type JwtPayload = {
  sub: number | string;
  email?: string;
  vai_tro?: string;
};

type AuthenticatedSocket = Socket & {
  data: {
    userId?: number;
  };
};

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userCommerceService: UserCommerceService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = this.extractTokenFromCookie(client.handshake.headers.cookie);
      if (!token) {
        client.disconnect(true);
        return;
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET ?? 'dishnet-secret',
      });
      const userId = Number(payload.sub);
      if (!Number.isFinite(userId) || userId <= 0) {
        client.disconnect(true);
        return;
      }

      client.data.userId = userId;
      await client.join(this.userRoom(userId));
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(_client: AuthenticatedSocket) {
    // no-op
  }

  @SubscribeMessage('chat:join')
  async onJoinConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: { conversationId?: number },
    ack?: (payload: { ok: boolean; conversationId?: number; message?: string }) => void,
  ) {
    const userId = client.data.userId;
    const conversationId = Number(body?.conversationId ?? 0);
    if (!userId || !Number.isFinite(conversationId) || conversationId <= 0) {
      ack?.({ ok: false, message: 'Dữ liệu không hợp lệ' });
      return { ok: false };
    }
    try {
      await this.userCommerceService.xacThucThanhVienCuocTroChuyen(
        userId,
        conversationId,
      );
      await client.join(this.conversationRoom(conversationId));
      ack?.({ ok: true, conversationId });
      return { ok: true, conversationId };
    } catch (error) {
      ack?.({
        ok: false,
        message:
          error instanceof Error ? error.message : 'Không thể tham gia cuộc trò chuyện',
      });
      throw error;
    }
  }

  @SubscribeMessage('chat:leave')
  async onLeaveConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: { conversationId?: number },
    ack?: (payload: { ok: boolean; message?: string }) => void,
  ) {
    const conversationId = Number(body?.conversationId ?? 0);
    if (!Number.isFinite(conversationId) || conversationId <= 0) {
      ack?.({ ok: false, message: 'Dữ liệu không hợp lệ' });
      return { ok: false };
    }
    await client.leave(this.conversationRoom(conversationId));
    ack?.({ ok: true });
    return { ok: true };
  }

  @SubscribeMessage('chat:send')
  async onSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    body: { conversationId?: number; noi_dung?: string; tempId?: string },
    ack?: (payload: { ok: boolean; message?: unknown; tempId?: string | null; error?: string }) => void,
  ) {
    const userId = client.data.userId;
    const conversationId = Number(body?.conversationId ?? 0);
    const noiDung = String(body?.noi_dung ?? '').trim();
    if (!userId || !Number.isFinite(conversationId) || conversationId <= 0 || !noiDung) {
      ack?.({ ok: false, error: 'Dữ liệu không hợp lệ' });
      return { ok: false };
    }
    try {
      const created = await this.userCommerceService.guiTinNhan(
        userId,
        conversationId,
        { noi_dung: noiDung },
      );
      const payload = {
        ...created,
        tempId: body?.tempId ?? null,
      };
      client.emit('chat:message:new', { ...payload, la_tin_cua_toi: true });
      client
        .to(this.conversationRoom(conversationId))
        .emit('chat:message:new', { ...payload, la_tin_cua_toi: false });
      ack?.({ ok: true, message: created, tempId: body?.tempId ?? null });
      return { ok: true, message: created, tempId: body?.tempId ?? null };
    } catch (error) {
      ack?.({
        ok: false,
        error: error instanceof Error ? error.message : 'Không gửi được tin nhắn',
      });
      throw error;
    }
  }

  broadcastTinNhan(
    conversationId: number,
    payload: Record<string, unknown>,
    senderUserId: number,
  ) {
    const room = this.conversationRoom(conversationId);
    this.server
      .to(room)
      .except(this.userRoom(senderUserId))
      .emit('chat:message:new', { ...payload, la_tin_cua_toi: false });
    this.server
      .to(this.userRoom(senderUserId))
      .emit('chat:message:new', { ...payload, la_tin_cua_toi: true });
  }

  private extractTokenFromCookie(rawCookie?: string) {
    if (!rawCookie) return null;
    const parts = rawCookie.split(';').map((item) => item.trim());
    for (const part of parts) {
      const [key, ...rest] = part.split('=');
      if (key === AUTH_COOKIE_NAME) {
        return decodeURIComponent(rest.join('='));
      }
    }
    return null;
  }

  private userRoom(userId: number) {
    return `user:${userId}`;
  }

  private conversationRoom(conversationId: number) {
    return `conversation:${conversationId}`;
  }
}
