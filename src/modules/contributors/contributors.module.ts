import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';

import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { SoapModule } from '@modules/soap/soap.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    SoapModule,
    CacheModule.register({
      ttl: 3600,
      max: 100,
    }),
  ],
  controllers: [ContributorsController],
  providers: [
    ContributorsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ContributorsModule {}
