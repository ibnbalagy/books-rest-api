import { Injectable } from '@nestjs/common';
import { NotifyByEmailDto } from './dtos/notify-by-email.dto';
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';
import { Configs } from '@shared/shared';
import { Email } from '@shared/shared/config/constants/email.constants';

@Injectable()
export class NotificationsService {

  constructor(protected readonly configService: ConfigService) { }

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAUTH2',
      user: this.configService.get(Configs.SMTP_USER),
      clientId: this.configService.get(Configs.GOOGLE_OAUTH_CLIENT_ID),
      clientSecret: this.configService.get(Configs.GOOGLE_OAUTH_CLIENT_SECRET),
      refreshToken: this.configService.get(Configs.REFRESH_TOKEN),
    }
  })

  async notifyByEmail({ email: to, content: text }: NotifyByEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get(Configs.SMTP_USER),
      to,
      subject: Email.SUBJECT,
      text: text || Email.CONTENT
    })
  }
}
