import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorDefinition } from '@common/enums';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const manageResponse = exception['response'];
    const result = {
      valid: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: ErrorDefinition.UNKNOWN_ERROR,
    };

    if (manageResponse) {
      result.message = manageResponse.message || message;
      result.error = manageResponse.errorCode || ErrorDefinition.UNKNOWN_ERROR;
    }

    return response.status(status).json(result);
  }
}
