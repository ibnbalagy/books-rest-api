import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { Logger } from 'nestjs-pino'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BooksModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
