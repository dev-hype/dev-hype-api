import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { GqlProfile } from './profile.model'

@ObjectType()
export class GqlUser implements Partial<User> {
  @Field()
  id: string

  @Field()
  email: string

  @Field(() => GqlProfile, { nullable: true })
  profile?: GqlProfile
}
