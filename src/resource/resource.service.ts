import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  getResourceTypes() {
    return this.prisma.resourceType.findMany()
  }
}
