import { Query, Resolver } from '@nestjs/graphql'

import { MiscService } from './misc.service'

import { GqlCountry } from './models/country.model'
import { GqlTimezone } from './models/timezone.model'

@Resolver(() => GqlCountry)
export class MiscResolver {
  constructor(private miscService: MiscService) {}

  @Query(() => [GqlCountry])
  countries() {
    return this.miscService.getCountries()
  }

  @Query(() => [GqlTimezone])
  timezones() {
    return this.miscService.getTimezones()
  }
}
