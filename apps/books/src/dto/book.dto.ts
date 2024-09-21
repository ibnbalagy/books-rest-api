import { Expose, Transform } from 'class-transformer'

export class BookDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    cover: string

    @Expose()
    author: string

    @Expose()
    description: string

    @Expose()
    pages: number
}