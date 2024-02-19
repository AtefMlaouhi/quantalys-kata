import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerFeatureTodoModule } from '@quantalys/server/feature-todo';

import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_FILTER } from '@nestjs/core';
import { ServerFeatureHealthModule } from '@quantalys/server/feature-health';
import {
  DatabaseExceptionFilter,
  TypeormConfigService,
  appConfig,
  dbConfig,
  validationSchema,
} from '@quantalys/server/util';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      ignoreEnvVars: true,
      validationSchema,
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      inject: [ConfigService],
    }),
    ServerFeatureTodoModule,
    ServerFeatureHealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class AppModule { }
