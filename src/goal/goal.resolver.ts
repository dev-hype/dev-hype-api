import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { GoalsQueryDto } from './dto/goals-query.dto'

import { GoalService } from './goal.service'
import { GqlGoal } from './models/goal.model'

@Resolver()
export class GoalResolver {
  constructor(private goalService: GoalService) {}

  @Query(() => [GqlGoal])
  goals(@Args() args: GoalsQueryDto) {
    return this.goalService.getGoals(args)
  }

  @Query(() => GqlGoal, { nullable: true })
  goal(@Args('id', { type: () => Int }) id: number) {
    return this.goalService.getGoalById(id)
  }
}
