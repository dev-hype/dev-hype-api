import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { User } from '@prisma/client'

import { ProfileService } from './profile.service'

import { CurrentUser } from './decorators/current-user.decorator'

import { GqlJwtGuard } from 'src/auth/guards/jwt.guard'

import { GqlUser } from './models/user.model'
import { GqlProfile } from './models/profile.model'

import { CreateProfileDto } from './dto/create-profile.dto'
import { EditProfileDto } from './dto/edit-profile.dto'

@Resolver(() => GqlUser)
export class UserResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => GqlUser, { name: 'me' })
  @UseGuards(GqlJwtGuard)
  me(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => GqlProfile)
  @UseGuards(GqlJwtGuard)
  createProfile(@Args() args: CreateProfileDto, @CurrentUser() user: User) {
    return this.profileService.createProfile(user.id, args)
  }

  @Mutation(() => GqlProfile)
  @UseGuards(GqlJwtGuard)
  editProfile(@Args() args: EditProfileDto, @CurrentUser() user: User) {
    return this.profileService.editProfile(user.id, args)
  }
}
