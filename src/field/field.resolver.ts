import { Query, Resolver } from '@nestjs/graphql'

import { FieldService } from './field.service'

import { GqlField } from './models/field.model'

@Resolver(() => [GqlField])
export class FieldResolver {
  constructor(private fieldService: FieldService) {}

  @Query(() => [GqlField])
  fields() {
    return this.fieldService.getFieldsWithSpecializations()
  }
}
