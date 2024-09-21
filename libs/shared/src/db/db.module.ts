import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
import { Configs } from '../config/constants/configs.constant';
import { join } from 'path';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [NestConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.getOrThrow<string>(Configs.DB_HOST),
                port: config.getOrThrow<number>(Configs.DB_PORT),
                username: config.getOrThrow<string>(Configs.DB_USERNAME),
                password: config.getOrThrow<string>(Configs.DB_PASSWORD),
                database: config.getOrThrow<string>(Configs.DB_NAME),
                // entities: [join(__dirname, '**', '*.entity.{js}')],
                logg: true,
                synchronize: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService]
        }),
    ],
})
export class DbModule { 
    static forFeature(models: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(models)
    }
}