import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userWherUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWherUniqueInput,
      include: { profile: true },
    })
  }

  async createUser(userCreateInput: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: userCreateInput,
      include: { profile: true },
    })
  }
}
