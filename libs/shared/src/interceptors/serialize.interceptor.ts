import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { Observable, map } from "rxjs"


export const Serialize = (dto: DtoClass) => UseInterceptors(new SerializeInterceptor(dto))

interface DtoClass {
    new(...args: any[]): NonNullable<unknown>
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private readonly dto: DtoClass) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}