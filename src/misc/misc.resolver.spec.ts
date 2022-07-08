import { Test, TestingModule } from '@nestjs/testing'
import { MiscResolver } from './misc.resolver'

describe('MiscResolver', () => {
  let resolver: MiscResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiscResolver],
    }).compile()

    resolver = module.get<MiscResolver>(MiscResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
