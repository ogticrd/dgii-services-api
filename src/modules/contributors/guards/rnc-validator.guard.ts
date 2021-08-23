import {
  BadRequestException,
  CanActivate,
  Logger,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RncValidatorGuard implements CanActivate {
  private readonly logger = new Logger(RncValidatorGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const RNC_REQUIRED_LENGTH = 9;
    const request: Request = context.switchToHttp().getRequest();

    const { rnc } = request.params;

    if (rnc.length !== RNC_REQUIRED_LENGTH) {
      throw new BadRequestException({
        valid: false,
        message: 'Invalid RNC',
      });
    }

    return true;
  }
}