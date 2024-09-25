import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { SoapConnectionFactory } from './soap.provider';

@Module({
  imports: [
    CacheModule.register({
      ttl: 18_000,
      max: 200,
    }),
  ],
  controllers: [ContributorsController],
  providers: [SoapConnectionFactory, ContributorsService],
  exports: [SoapConnectionFactory],
})
export class ContributorsModule {}
