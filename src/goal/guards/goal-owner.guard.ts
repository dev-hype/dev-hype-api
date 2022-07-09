import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GoalService } from '../goal.service'

export class GoalOwnerGuard implements CanActivate {
  constructor(@Inject(GoalService) private goalService: GoalService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()
    const request = ctx.getContext().req

    const user: User = request.user
    const goalId = args.id

    const goal = await this.goalService.getGoalById(goalId)

    if (goal?.userId !== user?.id) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      )
    }

    return true
  }
}
