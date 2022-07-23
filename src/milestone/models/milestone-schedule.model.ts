import { Field, Int, ObjectType } from '@nestjs/graphql'

import { GqlWeekDay } from 'src/common/models/weekday.model'

@ObjectType()
export class GqlMilestoneSchedule {
  @Field(() => Int)
  id: number

  @Field(() => GqlWeekDay)
  weekDay: GqlWeekDay

  @Field(() => Int)
  durationInHours: number
}
