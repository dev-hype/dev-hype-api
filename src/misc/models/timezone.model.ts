import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GqlTimezone {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Float)
  offset: number
}
