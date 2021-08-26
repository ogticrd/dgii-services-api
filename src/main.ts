import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { configureSwaggerModules } from '@config/index';
import { HttpExceptionFilter } from '@common/filters';
import { AppModule } from './app.module';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableVersioning();

  configureSwaggerModules(app);

  await app.listen(AppModule.port);
}

bootstrap().then(() => {
  Logger.log('Application is up and running 🚀');
});
