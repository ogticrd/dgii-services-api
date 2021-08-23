import { Module } from '@nestjs/common';

import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { SoapModule } from '@modules/soap/soap.module';

@Module({
  imports: [SoapModule],
  controllers: [ContributorsController],
  providers: [ContributorsService],
})
export class ContributorsModule {}
