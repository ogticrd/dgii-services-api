import { Test, TestingModule } from '@nestjs/testing';
import { ContributorsController } from '../contributors.controller';

describe('ContributorsController', () => {
  let controller: ContributorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributorsController],
    }).compile();

    controller = module.get<ContributorsController>(ContributorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
