import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GqlResourceType {
  @Field(() => Int)
  id: number

  @Field()
  name: string
}
