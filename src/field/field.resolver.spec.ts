import { Test, TestingModule } from '@nestjs/testing';
import { FieldResolver } from './field.resolver';

describe('FieldResolver', () => {
  let resolver: FieldResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldResolver],
    }).compile();

    resolver = module.get<FieldResolver>(FieldResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
