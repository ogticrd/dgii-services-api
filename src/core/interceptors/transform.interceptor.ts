import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  new (): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly classType: Response<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Partial<T>>,
  ): Observable<T> {
    const response: ExpressResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data: Partial<T>) => {
        return plainToClass(this.classType, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
