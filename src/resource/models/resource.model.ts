import { Field, Int, ObjectType } from '@nestjs/graphql'

import { GqlResourceType } from './resource-type.model'

@ObjectType()
export class GqlResource {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  url: string

  @Field(() => Boolean)
  isFree: boolean

  @Field(() => GqlResourceType)
  type: GqlResourceType

  @Field(() => Int)
  typeId: number
}
