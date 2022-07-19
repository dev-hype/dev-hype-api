import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

import { CreateProfileDto } from './dto/create-profile.dto'
import { EditProfileDto } from './dto/edit-profile.dto'

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  getProfileByUserId(userId: string) {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: { country: true },
    })
  }

  createProfile(userId: string, data: CreateProfileDto) {
    const { countryCode, timezoneName, ...restData } = data

    return this.prisma.profile.create({
      data: {
        ...restData,
        country: {
          connect: {
            key: countryCode,
          },
        },
        timezone: {
          connect: {
            name: timezoneName,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: { country: true },
    })
  }

  editProfile = (userId: string, data: EditProfileDto) => {
    const { firstName, lastName, bio, avatar, countryCode, timezoneName } = data

    return this.prisma.profile.update({
      where: { userId },
      data: {
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        ...(bio ? { bio } : {}),
        ...(avatar ? { avatar } : {}),
        ...(countryCode
          ? {
              country: {
                connect: {
                  key: countryCode,
                },
              },
            }
          : {}),
        ...(timezoneName
          ? {
              timezone: {
                connect: {
                  name: timezoneName,
                },
              },
            }
          : {}),
      },
      include: { country: true },
    })
  }
}
