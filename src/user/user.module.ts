import { Module } from '@nestjs/common'

import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

import { ProfileService } from './profile.service'

@Module({
  controllers: [],
  providers: [UserService, ProfileService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
