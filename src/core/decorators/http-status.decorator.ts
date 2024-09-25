import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

import { TransformInterceptor } from '../interceptors';

export function Ok(classType: any | any[], isPaginated: boolean = false) {
  const options: ApiResponseOptions = {};

  if (Array.isArray(classType)) {
    classType = classType.shift();
    options.isArray = true;
  }

  options.type = classType;

  return applyDecorators(
    ApiOkResponse(options),
    HttpCode(HttpStatus.OK),
    UseInterceptors(new TransformInterceptor(classType)),
  );
}

export function Created(classType?: any) {
  if (!classType) {
    return applyDecorators(ApiCreatedResponse(), HttpCode(HttpStatus.CREATED));
  }

  const options: ApiResponseOptions = {};

  if (Array.isArray(classType)) {
    classType = classType.shift();
    options.isArray = true;
  }

  options.type = classType;

  return applyDecorators(
    ApiOkResponse(options),
    HttpCode(HttpStatus.CREATED),
    UseInterceptors(new TransformInterceptor(classType)),
  );
}

export function NotContent() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiNoContentResponse(),
  );
}
