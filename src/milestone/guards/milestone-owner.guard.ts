import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { MilestoneService } from '../milestone.service'

export class MilestoneOwnerGuard implements CanActivate {
  constructor(
    @Inject(MilestoneService) private milestoneService: MilestoneService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()
    const request = ctx.getContext().req

    const user: User = request.user
    const milestoneId = args.id

    const milestone = await this.milestoneService.getMilestoneById(milestoneId)

    if (milestone?.goal?.userId !== user?.id) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      )
    }

    return true
  }
}
