import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { ErrorDefinition } from '@core';

@Injectable()
export class RncValidatorGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const RNC_REQUIRED_LENGTH = 9;
    const CEDULA_REQUIRED_LENGTH = 11;
    const request: Request = context.switchToHttp().getRequest();

    const { rnc } = request.params;

    if (
      rnc.length !== RNC_REQUIRED_LENGTH &&
      rnc.length !== CEDULA_REQUIRED_LENGTH
    ) {
      throw new BadRequestException({
        valid: false,
        message: 'Invalid RNC',
        errorCode: ErrorDefinition.INVALID_RNC,
      });
    }

    return true;
  }
}
