import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

export interface GuiEmailOptions {
  den: string;
  tieuDe: string;
  noiDungText?: string;
  noiDungHtml: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT || 587),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER || "",
        pass: process.env.MAIL_PASSWORD || "",
      },
    });
  }

  async guiEmail(options: GuiEmailOptions): Promise<boolean> {
    const tenGui = process.env.MAIL_FROM_NAME || "DishNet";
    const emailGui =
      process.env.MAIL_FROM_ADDRESS ||
      process.env.MAIL_USER ||
      "noreply@dishnet.vn";

    try {
      await this.transporter.sendMail({
        from: `"${tenGui}" <${emailGui}>`,
        to: options.den,
        subject: options.tieuDe,
        text: options.noiDungText,
        html: options.noiDungHtml,
      });
      this.logger.log(
        `Da gui email toi: ${options.den} | Tieu de: ${options.tieuDe}`,
      );
      return true;
    } catch (error) {
      this.logger.error(`Gui email that bai toi: ${options.den}`, error);
      return false;
    }
  }

  async guiOtpDangKy(
    email: string,
    otp: string,
    tenHienThi: string,
  ): Promise<boolean> {
    return this.guiEmail({
      den: email,
      tieuDe: `[DishNet] Mã xác nhận đăng ký tài khoản`,
      noiDungHtml: this.taoTemplateOtp({
        tieuDe: "Xác nhận đăng ký tài khoản",
        tenNguoiDung: tenHienThi,
        otp,
        moTa: "Bạn vừa đăng ký tài khoản DishNet. Vui lòng nhập mã xác nhận bên dưới để hoàn tất đăng ký.",
        thoiHan: "60 phút",
      }),
      noiDungText: `Xin chào ${tenHienThi}, mã OTP đăng ký DishNet của bạn là: ${otp}. Mã có hiệu lực trong 60 phút.`,
    });
  }

  async guiOtpQuenMatKhau(
    email: string,
    otp: string,
    tenHienThi: string,
  ): Promise<boolean> {
    return this.guiEmail({
      den: email,
      tieuDe: `[DishNet] Mã xác nhận đặt lại mật khẩu`,
      noiDungHtml: this.taoTemplateOtp({
        tieuDe: "Đặt lại mật khẩu",
        tenNguoiDung: tenHienThi,
        otp,
        moTa: "Bạn vừa yêu cầu đặt lại mật khẩu tài khoản DishNet. Vui lòng nhập mã xác nhận bên dưới để tiếp tục.",
        thoiHan: "60 phút",
      }),
      noiDungText: `Xin chào ${tenHienThi}, mã OTP đặt lại mật khẩu DishNet của bạn là: ${otp}. Mã có hiệu lực trong 60 phút.`,
    });
  }

  private taoTemplateOtp(data: {
    tieuDe: string;
    tenNguoiDung: string;
    otp: string;
    moTa: string;
    thoiHan: string;
  }): string {
    return `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f6f3;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f3;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#285E19 0%,#61AF5E 100%);padding:32px 40px;text-align:center;">
              <h1 style="color:#fff;font-size:24px;margin:0 0 6px 0;font-weight:700;">DishNet</h1>
              <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0;">${data.tieuDe}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 24px;">
              <p style="font-size:16px;color:#1f2937;margin:0 0 8px;">Xin chào <strong>${data.tenNguoiDung}</strong>,</p>
              <p style="font-size:14px;color:#6b7280;line-height:22px;margin:0 0 28px;">${data.moTa}</p>
              <div style="text-align:center;margin:0 0 28px;">
                <div style="display:inline-block;background:#f0faf0;border:2px dashed #61AF5E;border-radius:12px;padding:20px 48px;">
                  <span style="font-size:36px;font-weight:800;color:#285E19;letter-spacing:12px;">${data.otp}</span>
                </div>
              </div>
              <p style="font-size:13px;color:#9ca3af;text-align:center;margin:0 0 16px;">
                Mã xác nhận có hiệu lực trong <strong style="color:#285E19;">${data.thoiHan}</strong>
              </p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:12px;color:#9ca3af;line-height:18px;margin:0;">
                Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này. Mã sẽ tự động hết hạn.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9faf8;padding:20px 40px;text-align:center;">
              <p style="font-size:12px;color:#9ca3af;margin:0;">© ${new Date().getFullYear()} DishNet - Mạng xã hội ẩm thực</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}
