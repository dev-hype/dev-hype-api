import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { MilestoneService } from '../milestone.service'

export class MilestoneExistsGuard implements CanActivate {
  constructor(
    @Inject(MilestoneService) private milestoneService: MilestoneService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()

    const milestoneId = args.id

    const milestone = await this.milestoneService.getMilestoneById(milestoneId)

    if (!milestone) {
      throw new NotFoundException('Milestone does not exist')
    }

    return true
  }
}
