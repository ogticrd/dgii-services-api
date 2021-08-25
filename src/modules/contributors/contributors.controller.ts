import { TransformInterceptor } from '@common/interceptors';
import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ContributorsService } from './contributors.service';
import { ResponseContributorDto } from './dto';
import { RncValidatorGuard } from './guards';

@Controller({ path: 'contributors', version: '1' })
export class ContributorsController {
  constructor(private readonly contributorService: ContributorsService) {}

  @Get(':rnc/info/basic')
  @UseInterceptors(
    new TransformInterceptor(ResponseContributorDto),
    CacheInterceptor,
  )
  @UseGuards(RncValidatorGuard)
  getContributors(@Param('rnc') rnc: string) {
    return this.contributorService.getContributors(rnc);
  }

  @Get('search')
  @UseInterceptors(
    new TransformInterceptor(ResponseContributorDto),
    CacheInterceptor,
  )
  getContributorByName(@Query('name') name: string) {
    return this.contributorService.getContributorByName(name);
  }

  @Get('count')
  getContributorsCount() {
    return this.contributorService.getContributorsCount();
  }
}
