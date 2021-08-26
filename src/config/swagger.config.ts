import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Type } from '@nestjs/common';

import { ContributorsModule } from '@modules/contributors/contributors.module';
import { AppModule } from '../app.module';

interface SwaggerOptions {
  title: string;
  description: string;
  version: string;
  uri: string;
  app: INestApplication;
  module?: Type<any>;
}

/**
 * Setup swagger in the application boostrap
 * @param swaggerOptions {SwaggerOptions}
 */
const createSwaggerDocument = (swaggerOptions: SwaggerOptions) => {
  const options = new DocumentBuilder()
    .setTitle(swaggerOptions.title)
    .setDescription(swaggerOptions.description)
    .setVersion(swaggerOptions.version)
    .build();

  const document = SwaggerModule.createDocument(swaggerOptions.app, options, {
    include: [swaggerOptions.module],
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup(swaggerOptions.uri, swaggerOptions.app, document);
};

export function configureSwaggerModules(app: INestApplication) {
  createSwaggerDocument({
    title: 'DGII Services',
    version: AppModule.apiVersion,
    description: 'DGII Services API definition',
    app,
    uri: `${AppModule.apiVersion}/contributors/api`,
    module: ContributorsModule,
  });
}
