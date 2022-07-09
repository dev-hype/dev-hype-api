import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneResolver } from './milestone.resolver';

describe('MilestoneResolver', () => {
  let resolver: MilestoneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilestoneResolver],
    }).compile();

    resolver = module.get<MilestoneResolver>(MilestoneResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
