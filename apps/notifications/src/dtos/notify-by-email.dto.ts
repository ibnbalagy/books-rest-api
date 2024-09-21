import { IsEmail, IsString } from "class-validator";

export class NotifyByEmailDto {
    @IsEmail()
    email: string

    @IsString()
    content: string
}