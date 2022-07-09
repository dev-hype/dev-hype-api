import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

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
}
