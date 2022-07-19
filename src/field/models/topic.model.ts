import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GqlSpecialization } from './specialization.model'

@ObjectType()
export class GqlTopic {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Int)
  specializationId: number

  @Field(() => GqlSpecialization)
  specialization: GqlSpecialization
}
