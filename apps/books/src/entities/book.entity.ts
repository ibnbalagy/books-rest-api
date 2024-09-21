import { AbstractEntity } from "@shared/shared/db/abstract.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book extends AbstractEntity<Book> {
    @Column()
    title: string

    @Column()
    author: string

    @Column({default: ''})
    description: string

    @Column({default: ''})
    cover: string

    @Column({default: 0})
    pages: number
}
