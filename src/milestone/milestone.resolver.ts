import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { MilestoneService } from './milestone.service'

import { GqlJwtGuard } from 'src/auth/guards/jwt.guard'
import { MilestoneExistsGuard } from './guards/milestone-exists.guard'
import { MilestoneOwnerGuard } from './guards/milestone-owner.guard'

import { GqlMilestone } from './models/milestone.model'

import { CreateMilestoneDto } from './dto/create-milestone.dto'
import { UpdateMilestoneDto } from './dto/update-milestone.dto'

@Resolver(() => GqlMilestone)
export class MilestoneResolver {
  constructor(private milestoneService: MilestoneService) {}

  @Query(() => GqlMilestone, { nullable: true })
  milestone(@Args('id', { type: () => Int }) id: number) {
    return this.milestoneService.getMilestoneById(id)
  }

  @Mutation(() => GqlMilestone)
  @UseGuards(GqlJwtGuard)
  createMilestone(@Args() args: CreateMilestoneDto) {
    return this.milestoneService.createMilestone(args)
  }

  @Mutation(() => GqlMilestone)
  @UseGuards(GqlJwtGuard, MilestoneExistsGuard, MilestoneOwnerGuard)
  updateMilestone(@Args() args: UpdateMilestoneDto) {
    return this.milestoneService.updateMilestone(args)
  }

  @Mutation(() => GqlMilestone)
  @UseGuards(GqlJwtGuard, MilestoneExistsGuard, MilestoneOwnerGuard)
  deleteMilestone(@Args('id', { type: () => Int }) id: number) {
    return this.milestoneService.deleteMilestone(id)
  }
}
