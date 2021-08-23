import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';
import { ContributorsModule } from '@modules/contributors/contributors.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableVersioning();

  createSwaggerDocument({
    title: 'DGII Services',
    version: AppModule.apiVersion,
    description: 'DGII Services API definition',
    app,
    uri: `${AppModule.apiVersion}/dgii/contributors/api`,
    module: ContributorsModule,
  });

  await app.listen(AppModule.port);
}

bootstrap().then(() => {
  Logger.log('Application is up and running 🚀');
});
