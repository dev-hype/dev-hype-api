import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GqlCountry {
  @Field()
  name: string

  @Field()
  key: string
}
