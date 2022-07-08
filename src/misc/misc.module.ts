import { Module } from '@nestjs/common'

import { MiscService } from './misc.service'
import { MiscResolver } from './misc.resolver'

@Module({
  providers: [MiscService, MiscResolver],
})
export class MiscModule {}
