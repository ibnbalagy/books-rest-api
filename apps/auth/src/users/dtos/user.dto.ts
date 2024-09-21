import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number

    @Expose()
    email: string
    
    // @Expose()
    password: string

    @Expose()
    firstname: string

    @Expose()
    lastname: string

    // @Expose()
    admin: boolean

    @Expose()
    profile: string

    @Expose()
    interests: string[]
}