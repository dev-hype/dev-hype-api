import { Field, ObjectType } from '@nestjs/graphql'

import { GqlGoal } from './goal.model'
import { GqlPaginationResponse } from 'src/common/models/pagination-response.model'

@ObjectType()
export class GqlGoalsResponse extends GqlPaginationResponse {
  @Field(() => [GqlGoal])
  list: GqlGoal[]
}
