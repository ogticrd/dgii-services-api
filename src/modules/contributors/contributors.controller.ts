import { TransformInterceptor } from '@common/interceptors';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ContributorsService } from './contributors.service';
import { ResponseContributorDto } from './dto';
import { RncValidatorGuard } from './guards';

@Controller({ path: 'contributors', version: '1' })
export class ContributorsController {
  constructor(private readonly contributorService: ContributorsService) {}

  @Get(':rnc')
  @UseInterceptors(new TransformInterceptor(ResponseContributorDto))
  @UseGuards(RncValidatorGuard)
  getData(@Param('rnc') rnc: string) {
    return this.contributorService.main(rnc);
  }
}
