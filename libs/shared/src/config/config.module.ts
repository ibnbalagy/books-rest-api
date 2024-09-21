import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid'
@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema: Joi.object({
            DB_HOST: Joi.string().required(),
            DB_PORT: Joi.number(),
            DB_USERNAME: Joi.string(),
            DB_PASSWORD: Joi.string(),
            DB_NAME: Joi.string(),
        })
    }),
    LoggerModule.forRoot({
        pinoHttp: {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            }
          }
    }),
],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule { }
