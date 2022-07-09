import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FieldService {
  constructor(private prismaService: PrismaService) {}

  async getFields() {
    return this.prismaService.field.findMany({
      include: { specializations: true },
    })
  }

  async getSpecializationTopics(id: number, search?: string) {
    return this.prismaService.topic.findMany({
      where: {
        specializationId: id,
        ...(search
          ? { name: { mode: 'insensitive', contains: search.toLowerCase() } }
          : {}),
      },
    })
  }
}
