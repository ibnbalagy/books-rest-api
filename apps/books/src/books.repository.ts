import { AbstractRepository } from "@shared/shared/db/abstract.repository";
import { Book } from "./entities/book.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class BooksRepository extends AbstractRepository<Book> {
    protected logger: Logger = new Logger(BooksRepository.name)

    constructor(
        @InjectRepository(Book) booksRepository: Repository<Book>,
        manager: EntityManager
    ) {
        super(booksRepository, manager)
    }
}