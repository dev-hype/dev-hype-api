import { Field, Int, ObjectType } from '@nestjs/graphql'

import { GqlMilestoneSchedule } from './milestone-schedule.model'
import { GqlResource } from 'src/resource/models/resource.model'

@ObjectType()
export class GqlMilestone {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Date)
  startDate: string

  @Field(() => Int)
  durationInHours: number

  @Field(() => Date)
  estimatedEndDate: string

  @Field(() => Date, { nullable: true })
  actualEndDate?: string

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => Date)
  createdAt: string

  @Field(() => Date)
  updatedAt: string

  @Field(() => Int)
  goalId: number

  @Field(() => Int)
  resourceId: number

  @Field(() => GqlResource)
  resource: GqlResource

  @Field(() => [GqlMilestoneSchedule])
  milestoneSchedules: GqlMilestoneSchedule[]
  // milestonesNotes    MilestoneNote[]
}
