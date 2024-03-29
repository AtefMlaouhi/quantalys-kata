import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CONFIG_PORT } from '@quantalys/server/util';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  const configService = app.get(ConfigService);
  const port = configService.get(CONFIG_PORT);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.enableCors({
    origin: '*',
    methods: '*'
  });

  const config = new DocumentBuilder()
    .setTitle(`Quantalys To-Do REST API`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document, {
    jsonDocumentUrl: 'api/v1/swagger.json',
  });

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/v1`
  );
}

bootstrap();
