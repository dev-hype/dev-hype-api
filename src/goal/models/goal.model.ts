import { Field, Int, ObjectType } from '@nestjs/graphql'

import { GqlTopic } from 'src/field/models/topic.model'
import { GqlMilestone } from 'src/milestone/models/milestone.model'

@ObjectType()
export class GqlGoal {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Date)
  startDate: string

  @Field(() => Date)
  estimatedEndDate?: string

  @Field(() => Date, { nullable: true })
  actualEndDate?: string

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => Date)
  createdAt: string

  @Field(() => Date)
  updatedAt: string

  @Field()
  userId: string

  @Field(() => Int)
  topicId: number

  @Field(() => GqlTopic)
  topic: GqlTopic

  @Field(() => [GqlMilestone])
  milestones: GqlMilestone[]

  // projects   Project[]
}
