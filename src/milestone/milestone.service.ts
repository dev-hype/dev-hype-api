import { Injectable } from '@nestjs/common'
import RRule, { Weekday } from 'rrule'
import { WeekDay } from '@prisma/client'

import { PrismaService } from 'src/prisma/prisma.service'

import { CreateMilestoneDto } from './dto/create-milestone.dto'
import { CreateMilestoneScheduleDto } from './dto/create-milestoneSchedule.dto'

@Injectable()
export class MilestoneService {
  constructor(private prismaService: PrismaService) {}

  getMilestoneById(id: number) {
    return this.prismaService.milestone.findUnique({
      where: { id },
      include: {
        milestoneSchedules: true,
        milestonesNotes: true,
        resource: true,
      },
    })
  }

  createMilestone(data: CreateMilestoneDto) {
    const { resource, schedules, ...milestone } = data

    const durationInHours = this.getScheduleDuration({
      schedules,
      endDate: new Date(milestone.estimatedEndDate),
      startDate: new Date(milestone.startDate),
    })

    return this.prismaService.milestone.create({
      data: {
        name: milestone.name,
        startDate: milestone.startDate,
        estimatedEndDate: milestone.estimatedEndDate,
        durationInHours,
        goal: { connect: { id: milestone.goalId } },
        resource: {
          connectOrCreate: {
            where: { name: resource.name },
            create: resource,
          },
        },
        milestoneSchedules: { createMany: { data: schedules } },
      },
      include: { goal: true },
    })
  }

  private getScheduleDuration({
    schedules,
    startDate,
    endDate,
  }: {
    schedules: CreateMilestoneScheduleDto[]
    startDate: Date
    endDate: Date
  }): number {
    const hoursPerWeek = schedules.reduce(
      (base, current) => base + current.durationInHours,
      0,
    )

    const averageHoursPerScheduleDay = hoursPerWeek / schedules.length

    const rruleWeekDays = schedules.map((schedule) =>
      this.weekDayToRRule(schedule.weekDay),
    )

    const rule = new RRule({
      freq: RRule.WEEKLY,
      dtstart: startDate,
      until: endDate,
      interval: 1,
      byweekday: rruleWeekDays,
    })

    const dates = rule.all()

    return Math.ceil(averageHoursPerScheduleDay * dates.length)
  }

  private weekDayToRRule(weekDay: WeekDay): Weekday {
    switch (weekDay) {
      case WeekDay.Mon:
        return RRule.MO
      case WeekDay.Tue:
        return RRule.TU
      case WeekDay.Wed:
        return RRule.WE
      case WeekDay.Thu:
        return RRule.TH
      case WeekDay.Fri:
        return RRule.FR
      case WeekDay.Sat:
        return RRule.SA
      default:
        return RRule.SU
    }
  }
}
