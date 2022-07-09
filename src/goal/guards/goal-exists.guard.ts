import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GoalService } from '../goal.service'

export class GoalExistsGuard implements CanActivate {
  constructor(@Inject(GoalService) private goalService: GoalService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()

    const goalId = args.id

    const goal = await this.goalService.getGoalById(goalId)

    if (!goal) {
      throw new NotFoundException('Goal does not exist')
    }

    return true
  }
}
