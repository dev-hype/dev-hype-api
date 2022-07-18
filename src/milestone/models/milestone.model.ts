import { Field, Int, ObjectType } from '@nestjs/graphql'

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

  // resourceId: number
  // resource: GqlResource

  // milestoneSchedules: GqlMilestoneSchedule[]
  // milestonesNotes    MilestoneNote[]
}
