import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FieldService {
  constructor(private prismaService: PrismaService) {}

  async getFieldsWithSpecializations() {
    return this.prismaService.field.findMany({
      include: { specializations: true },
    })
  }

  async getFieldWithSpecializationsById(id: number) {
    return this.prismaService.field.findUnique({
      where: { id },
      include: { specializations: true },
    })
  }
}
