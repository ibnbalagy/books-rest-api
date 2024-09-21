import { Logger } from "@nestjs/common"
import { AfterInsert, AfterLoad, AfterUpdate, Entity, PrimaryGeneratedColumn } from "typeorm"

export abstract class AbstractEntity<T> {
    logger = new Logger()
    @PrimaryGeneratedColumn()
    id: number

    constructor(entity: Partial<T>) {
        Object.assign(this, entity)
    }

    @AfterInsert()
    logInsert() {
        this.logger.log(`Entity with id ${this.id} inserted.`)
    }

    @AfterLoad()
    logLoad() {
        this.logger.log(`Entity with id ${this.id} loaded.`)
    }

    @AfterUpdate()
    logUpdate() {
        this.logger.log(`Entity with id ${this.id} updated.`)
    }
}