import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Type } from '@nestjs/common';

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
export const createSwaggerDocument = (swaggerOptions: SwaggerOptions) => {
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
