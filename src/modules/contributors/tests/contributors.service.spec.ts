import { Test, TestingModule } from '@nestjs/testing';
import { ContributorsService } from '../contributors.service';

describe('ContributorsService', () => {
  let service: ContributorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributorsService],
    }).compile();

    service = module.get<ContributorsService>(ContributorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
