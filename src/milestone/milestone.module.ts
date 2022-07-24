import { Module } from '@nestjs/common'

import { MilestoneService } from './milestone.service'
import { MilestoneResolver } from './milestone.resolver'

import { GoalModule } from 'src/goal/goal.module'

@Module({
  imports: [GoalModule],
  providers: [MilestoneService, MilestoneResolver],
})
export class MilestoneModule {}
