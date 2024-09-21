import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbModule } from '@shared/shared';
import { User } from '../../../../libs/shared/src/entities/user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DbModule, DbModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
