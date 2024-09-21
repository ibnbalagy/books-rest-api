import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository, User } from "@shared/shared";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    protected logger: Logger = new Logger(UsersRepository.name)

    constructor(
        @InjectRepository(User) usersRepository: Repository<User>,
        manager: EntityManager
    ) {
        super(usersRepository, manager)
    }
}