import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const title = 'DGII Services';
const description = 'DGII Services API definition';
const version = 'v1';

/**
 * Setup swagger in the application boostrap
 * @param app {INestApplication}
 */
export const useSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api', app, document);
};
