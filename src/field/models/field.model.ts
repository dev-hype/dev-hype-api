import { Field, Int, ObjectType } from '@nestjs/graphql'

import { GqlSpecialization } from './specialization.model'

@ObjectType()
export class GqlField {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => [GqlSpecialization], { defaultValue: [] })
  specializations: GqlSpecialization[]
}
