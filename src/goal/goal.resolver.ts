import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GoalService } from './goal.service'

import { CreateGoalDto } from './dto/create-goal.dto'
import { GoalsQueryDto } from './dto/goals-query.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'

import { GqlJwtGuard } from 'src/auth/guards/jwt.guard'
import { GoalOwnerGuard } from './guards/goal-owner.guard'

import { GqlGoal } from './models/goal.model'
import { GqlGoalsResponse } from './models/goals-response.model'

import { CurrentUser } from 'src/user/decorators/current-user.decorator'
import { GoalExistsGuard } from './guards/goal-exists.guard'

@Resolver()
export class GoalResolver {
  constructor(private goalService: GoalService) {}

  @Query(() => GqlGoalsResponse)
  goals(@Args() args: GoalsQueryDto) {
    return this.goalService.getGoals(args)
  }

  @Query(() => GqlGoal, { nullable: true })
  goal(@Args('id', { type: () => Int }) id: number) {
    return this.goalService.getGoalById(id)
  }

  @Mutation(() => GqlGoal)
  @UseGuards(GqlJwtGuard)
  createGoal(@Args() data: CreateGoalDto, @CurrentUser() user: User) {
    return this.goalService.createGoal(user.id, data)
  }

  @Mutation(() => GqlGoal)
  @UseGuards(GqlJwtGuard, GoalExistsGuard, GoalOwnerGuard)
  updateGoal(@Args() data: UpdateGoalDto) {
    return this.goalService.getGoalById(data.id)
  }

  @Mutation(() => GqlGoal)
  @UseGuards(GqlJwtGuard, GoalExistsGuard, GoalOwnerGuard)
  deleteGoal(@Args('id', { type: () => Int }) id: number) {
    return this.goalService.deleteGoal(id)
  }
}
