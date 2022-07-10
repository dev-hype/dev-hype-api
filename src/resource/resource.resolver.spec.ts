import { Test, TestingModule } from '@nestjs/testing';
import { ResourceResolver } from './resource.resolver';

describe('ResourceResolver', () => {
  let resolver: ResourceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceResolver],
    }).compile();

    resolver = module.get<ResourceResolver>(ResourceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
