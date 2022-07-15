import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GqlProfile {
  @Field()
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  avatar?: string

  @Field()
  userId: string

  @Field()
  countryCode: string

  @Field()
  timezoneName: string
}
