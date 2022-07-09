import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

import { GoalsQueryDto } from './dto/goals-query.dto'

@Injectable()
export class GoalService {
  constructor(private prismaService: PrismaService) {}

  async getGoals(args: GoalsQueryDto) {
    const { userId, topicId, page = 1, limit = 30 } = args

    return this.prismaService.goal.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { userId, topicId },
      include: {
        _count: true,
        milestones: {
          include: {
            resource: true,
            milestoneSchedules: true,
          },
        },
        projects: true,
        topic: {
          include: {
            specialization: true,
          },
        },
      },
    })
  }

  async getGoalById(id: number) {
    return this.prismaService.goal.findUnique({
      where: { id },
      include: {
        milestones: {
          include: {
            resource: true,
            milestoneSchedules: true,
          },
        },
        projects: true,
        topic: {
          include: {
            specialization: true,
          },
        },
      },
    })
  }
}
