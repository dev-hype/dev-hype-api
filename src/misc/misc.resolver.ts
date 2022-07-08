import { Query, Resolver } from '@nestjs/graphql'

import { MiscService } from './misc.service'

import { GqlCountry } from './models/country.model'

@Resolver()
export class MiscResolver {
  constructor(private miscService: MiscService) {}

  @Query(() => [GqlCountry])
  countries() {
    return this.miscService.getCountries()
  }
}
