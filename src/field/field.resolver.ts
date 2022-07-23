import { Args, Int, Query, Resolver } from '@nestjs/graphql'

import { FieldService } from './field.service'

import { GqlField } from './models/field.model'
import { GqlTopic } from './models/topic.model'

@Resolver(() => [GqlField])
export class FieldResolver {
  constructor(private fieldService: FieldService) {}

  @Query(() => [GqlField])
  fields() {
    return this.fieldService.getFields()
  }

  @Query(() => [GqlTopic])
  topics(
    @Args('specializationId', { type: () => Int, nullable: true }) id: number,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.fieldService.getTopics(id, search)
  }
}
