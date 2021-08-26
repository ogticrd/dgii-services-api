import {
  BadRequestException,
  CanActivate,
  Logger,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ErrorDefinition } from '@common/enums';
import { Request } from 'express';

@Injectable()
export class RncValidatorGuard implements CanActivate {
  private readonly logger = new Logger(RncValidatorGuard.name);

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
