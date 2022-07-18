import { Query, Resolver } from '@nestjs/graphql'
import { GqlResourceType } from './models/resource-type.model'

import { ResourceService } from './resource.service'

@Resolver()
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @Query(() => [GqlResourceType])
  resourceTypes() {
    return this.resourceService.getResourceTypes()
  }
}
