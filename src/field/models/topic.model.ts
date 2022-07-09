import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GqlTopic {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Int)
  specializationId: number
}
