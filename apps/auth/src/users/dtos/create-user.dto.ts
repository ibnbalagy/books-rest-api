import { IsArray, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsString()
    @IsOptional()
    firstname: string

    @IsString()
    @IsOptional()
    lastname: string

    @IsOptional()
    admin: boolean

    @IsString()
    @IsOptional()
    profile: string

    @IsArray()
    @IsOptional()
    interests: string[]
}