import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class MiscService {
  constructor(private prismaService: PrismaService) {}

  getCountries() {
    return this.prismaService.country.findMany()
  }

  getTimezones() {
    return this.prismaService.timezone.findMany()
  }
}
