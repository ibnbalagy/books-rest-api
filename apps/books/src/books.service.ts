import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid'
import { Errors } from '@shared/shared';
import { BooksRepository } from './books.repository';
@Injectable()
export class BooksService {
  protected readonly logger = new Logger(BooksService.name)
  constructor(protected readonly booksRepo: BooksRepository) { }

  create(createBookDto: CreateBookDto) {
    const book = new Book(createBookDto)
    return this.booksRepo.create(book)
  }

  find() {
    return this.booksRepo.find({})
  }

  async findOne(id: number) {
    return this.booksRepo.findOne({ id })

  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepo.update({ id }, updateBookDto)
  }

  remove(id: number) {
    return this.booksRepo.delete({ id })
  }
}
