import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { UserCommerceService } from './user-commerce.service';

@Public()
@Controller('vnpay')
export class UserVnpayController {
  constructor(private readonly userCommerceService: UserCommerceService) {}

  private layFrontendCheckoutUrl(query: Record<string, string>) {
    const frontendBase =
      process.env.FRONTEND_URL?.trim() ||
      process.env.NEXT_PUBLIC_APP_ORIGIN?.trim() ||
      'http://localhost:4000';
    const queryString = new URLSearchParams(query).toString();
    return `${frontendBase.replace(/\/$/, '')}/checkout${queryString ? `?${queryString}` : ''}`;
  }

  @Get('callback')
  async callback(
    @Query() query: Record<string, string>,
    @Res() res: Response,
  ) {
    return res.redirect(this.layFrontendCheckoutUrl(query));
  }

  @Get('callback/ipn')
  async callbackIpn(@Query() query: Record<string, string>) {
    return this.userCommerceService.xuLyCallbackVnpay(query);
  }
}

@Public()
@Controller('api/vnpay')
export class UserVnpayApiPrefixedController {
  constructor(private readonly userCommerceService: UserCommerceService) {}

  private layFrontendCheckoutUrl(query: Record<string, string>) {
    const frontendBase =
      process.env.FRONTEND_URL?.trim() ||
      process.env.NEXT_PUBLIC_APP_ORIGIN?.trim() ||
      'http://localhost:4000';
    const queryString = new URLSearchParams(query).toString();
    return `${frontendBase.replace(/\/$/, '')}/checkout${queryString ? `?${queryString}` : ''}`;
  }

  @Get('callback')
  async callback(
    @Query() query: Record<string, string>,
    @Res() res: Response,
  ) {
    return res.redirect(this.layFrontendCheckoutUrl(query));
  }

  @Get('callback/ipn')
  async callbackIpn(@Query() query: Record<string, string>) {
    return this.userCommerceService.xuLyCallbackVnpay(query);
  }
}
