import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GqlSpecialization {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Int)
  fieldId: number
}
