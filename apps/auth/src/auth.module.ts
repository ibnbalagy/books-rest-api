import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { Configs, DbModule } from '@shared/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserMiddleware } from './users/middlewares/current-user.middleware';
const  cookieSession = require('cookie-session')

@Module({
  imports: [UsersModule, DbModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.getOrThrow(Configs.COOKIE_SESSION_SECRET)]
    })).forRoutes('*')

    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
