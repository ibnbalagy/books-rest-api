import { AbstractEntity } from "@shared/shared/db/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends AbstractEntity<User> {
    @Column()
    email: string
    
    @Column()
    password: string

    @Column({ default: false })
    admin: boolean

    @Column({ default: '' })
    firstname: string

    @Column({ default: '' })
    lastname: string


    @Column({ default: 'https://d326fntlu7tb1e.cloudfront.net/uploads/4821d814-ac87-4b22-aa80-ac7336916c9a-403017_avatar_default_head_person_unknown_icon.png' })
    profile: string

    @Column('text', { array: true, default: [] })
    interests: string[]
}