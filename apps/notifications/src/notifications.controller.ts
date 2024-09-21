import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyByEmailDto } from './dtos/notify-by-email.dto';
import { Messages } from '@shared/shared';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(Messages.NOTIFY_BY_EMAIL)
  async notifyByEmail(@Payload() data: NotifyByEmailDto) {
    return this.notificationsService.notifyByEmail(data)
  }
}
