import { Field, ObjectType } from '@nestjs/graphql'

import { GqlCountry } from 'src/misc/models/country.model'

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

  @Field(() => GqlCountry)
  country: GqlCountry

  @Field()
  timezoneName: string
}
