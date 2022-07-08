import { Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { UserService } from './user.service'

import { CurrentUser } from './decorators/current-user.decorator'

import { GqlJwtGuard } from 'src/auth/guards/jwt.guard'

import { GqlUser } from './models/user.model'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => GqlUser, { name: 'me' })
  @UseGuards(GqlJwtGuard)
  me(@CurrentUser() user: GqlUser): GqlUser {
    return user
  }
}
