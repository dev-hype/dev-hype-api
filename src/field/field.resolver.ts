import { Args, Query, Resolver } from '@nestjs/graphql'

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
  specializationTopics(
    @Args('id') id: number,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.fieldService.getSpecializationTopics(id, search)
  }
}
