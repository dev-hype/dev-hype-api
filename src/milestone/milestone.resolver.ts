import { Args, Int, Query, Resolver } from '@nestjs/graphql'

import { MilestoneService } from './milestone.service'

import { GqlMilestone } from './models/milestone.model'

@Resolver()
export class MilestoneResolver {
  constructor(private milestoneService: MilestoneService) {}

  @Query(() => GqlMilestone, { nullable: true })
  milestone(@Args('id', { type: () => Int }) id: number) {
    return this.milestoneService.getMilestoneById(id)
  }
}
