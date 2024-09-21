import { EntityManager, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Inject, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Errors } from "../config/constants/errors.constant";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
    protected abstract readonly logger: Logger
    constructor(
        private readonly repo: Repository<T>,
        private readonly manager: EntityManager
    ) { }

    async create(entity: T): Promise<T> {
        return this.manager.save(entity)
    }

    async findOne(
        where: FindOptionsWhere<T>,
        relations?: FindOptionsRelations<T>
    ): Promise<T> {
        const entity = await this.repo.findOne({ where, relations })
        if (!entity) {
            this.logger.warn(Errors.NOT_FOUND_MSG, where)
            throw new NotFoundException(Errors.NOT_FOUND_MSG)
        }

        return entity
    }

    async update(
        where: FindOptionsWhere<T>,
        partialEntity: QueryDeepPartialEntity<T>
    ) {
        const entity = await this.repo.update(where, partialEntity)
        if (!entity.affected) {
            this.logger.warn(Errors.NOT_FOUND_MSG, where)
            throw new NotFoundException(Errors.NOT_FOUND_MSG)
        }

        return this.findOne(where)
    }

    async find(where: FindOptionsWhere<T>): Promise<T[]> {
        return this.repo.findBy(where)
    }

    async delete(where: FindOptionsWhere<T>) {
        await this.repo.delete(where)
    }
}