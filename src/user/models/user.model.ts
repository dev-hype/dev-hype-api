import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'

@ObjectType()
export class GqlUser implements Partial<User> {
  @Field()
  id: string

  @Field()
  email: string
}
