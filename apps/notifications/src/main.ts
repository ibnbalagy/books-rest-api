import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Configs } from '@shared/shared';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService)

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.getOrThrow(Configs.NOTIFICATIONS_PORT)
    }
  })

  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.useLogger(app.get(Logger))

  await app.startAllMicroservices()
}
bootstrap();
