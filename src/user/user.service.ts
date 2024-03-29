import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async getUserWithProfile(userWherUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWherUniqueInput,
      include: {
        profile: {
          include: { country: true },
        },
      },
    })
  }

  async createUser(userCreateInput: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: userCreateInput,
      include: { profile: true },
    })
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }

  async verifyEmail(email: string) {
    return this.prisma.user.update({
      where: { email },
      data: { verified: true },
    })
  }
}
