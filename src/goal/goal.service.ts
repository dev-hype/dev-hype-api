import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { CreateGoalDto } from './dto/create-goal.dto'

import { GoalsQueryDto } from './dto/goals-query.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'

@Injectable()
export class GoalService {
  constructor(private prismaService: PrismaService) {}

  async getGoals(args: GoalsQueryDto) {
    const { userId, topicId, page = 1, limit = 30 } = args

    const goals = await this.prismaService.goal.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { userId, topicId },
      include: {
        milestones: {
          include: {
            resource: {
              include: {
                type: true,
              },
            },
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

    const count = await this.prismaService.goal.count({
      where: { userId, topicId },
    })

    console.log(goals)

    return { list: goals, count, page, limit }
  }

  async getGoalById(id: number) {
    return this.prismaService.goal.findUnique({
      where: { id },
      include: {
        milestones: {
          include: {
            resource: {
              include: {
                type: true,
              },
            },
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

  async createGoal(userId: string, data: CreateGoalDto) {
    return this.prismaService.goal.create({
      data: {
        name: data.name,
        topic: {
          connectOrCreate: {
            create: {
              name: data.topicName,
              specialization: { connect: { id: data.specializationId } },
            },
            where: {
              name_specializationId: {
                name: data.topicName,
                specializationId: data.specializationId,
              },
            },
          },
        },
        user: { connect: { id: userId } },
      },
      include: {
        milestones: {
          include: {
            milestoneSchedules: true,
            resource: {
              include: {
                type: true,
              },
            },
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

  async updateGoal(data: UpdateGoalDto) {
    return this.prismaService.goal.update({
      where: { id: data.id },
      data: {
        ...(data.name ? { name: data.name } : {}),
        ...(data.startDate ? { startDate: data.startDate } : {}),
        ...(data.estimatedEndDate
          ? { estimatedEndDate: data.estimatedEndDate }
          : {}),
        ...(data.actualEndDate ? { actualEndDate: data.actualEndDate } : {}),
        ...(data.isActive ? { isActive: data.isActive } : {}),
      },
      include: {
        milestones: {
          include: {
            milestoneSchedules: true,
            resource: {
              include: {
                type: true,
              },
            },
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

  async deleteGoal(id: number) {
    return this.prismaService.goal.delete({
      where: { id },
    })
  }

  async updateGoalDates(id: number) {
    const minStartDate = await this.prismaService.milestone.aggregate({
      where: { goalId: id },
      _min: {
        startDate: true,
      },
    })

    const maxEndDate = await this.prismaService.milestone.aggregate({
      where: { goalId: id },
      _max: {
        estimatedEndDate: true,
      },
    })

    return this.updateGoal({
      id,
      startDate: minStartDate._min.startDate.toISOString(),
      estimatedEndDate: maxEndDate._max.estimatedEndDate.toISOString(),
    })
  }
}
