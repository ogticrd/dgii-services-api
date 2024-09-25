import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';

import { ContributorsService } from './contributors.service';
import { ContributorResponseDto } from './dtos';
import { RncValidatorGuard } from './guards';
import { Ok } from '@core';

@ApiTags('Contributors')
@Controller({ path: 'contributors', version: '1' })
export class ContributorsController {
  constructor(private readonly service: ContributorsService) {}

  @Get(':rnc/info/basic')
  @Ok(ContributorResponseDto)
  @UseGuards(RncValidatorGuard)
  @UseInterceptors(CacheInterceptor)
  getContributors(@Param('rnc') rnc: string) {
    return this.service.getContributors(rnc);
  }

  @Get('search')
  @Ok(ContributorResponseDto)
  @UseInterceptors(CacheInterceptor)
  getContributorByName(@Query('name') name: string) {
    return this.service.getContributorByName(name);
  }

  @Get('count')
  getContributorsCount() {
    return this.service.getContributorsCount();
  }
}
