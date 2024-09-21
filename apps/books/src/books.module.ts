import { Module } from '@nestjs/common'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { ConfigModule as NestConfigModule } from '@shared/shared';
import { DbModule } from '@shared/shared'
import { Repository } from 'typeorm'
import { Book } from './entities/book.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BooksRepository } from './books.repository';

@Module({
  imports: [DbModule, DbModule.forFeature([Book]), NestConfigModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
