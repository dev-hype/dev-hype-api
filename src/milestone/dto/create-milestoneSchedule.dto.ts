import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsDefined,
  IsInt,
  IsString,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator'

import { WeekDay } from '@prisma/client'

@InputType()
export class CreateMilestoneScheduleDto {
  @IsString({ message: 'Invalid weekday' })
  @IsDefined({ message: 'WeekDay is required' })
  @IsEnum(WeekDay)
  @Field()
  weekDay: WeekDay

  @IsInt({ message: 'Invalid Duration' })
  @IsDefined({ message: 'Duration is required' })
  @Min(1, { message: 'Duration must be at least 1 hour' })
  @Field(() => Int)
  durationInHours: number

  @IsInt({ message: 'Invalid Milestone ID' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  milestoneId?: number
}
