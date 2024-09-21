import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateBookDto {
    @IsString()
    title: string

    @IsString()
    author: string    

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    cover: string

    @IsNumber()
    @IsOptional()
    pages: number
}
