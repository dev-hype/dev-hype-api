import { ArgsType, Field, Int } from '@nestjs/graphql'
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsInt,
  IsISO8601,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'

import {
  IsFutureDate,
  IsAfterDate,
} from 'src/common/decorators/validators/dates'

import { CreateResourceDto } from 'src/resource/dto/create-resource.dto'
import { CreateMilestoneScheduleDto } from './create-milestoneSchedule.dto'

@ArgsType()
export class CreateMilestoneDto {
  @IsString({ message: 'Invalid name' })
  @IsDefined({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must have at least 3 characters' })
  @MaxLength(64, { message: 'Name can have maximum 64 characters' })
  @Field()
  name: string

  @IsISO8601({}, { message: 'Invalid Start Date' })
  @IsFutureDate({ message: 'Start Date must be a future date' })
  @IsDefined({ message: 'Start Date is required' })
  @Field()
  startDate: string

  @IsISO8601({}, { message: 'Invalid End Date' })
  @IsFutureDate({ message: 'End Date must be a future date' })
  @IsAfterDate('startDate', { message: 'End date must be after start date' })
  @IsDefined({ message: 'End Date is required' })
  @Field()
  estimatedEndDate: string

  @IsInt({ message: 'Invalid Goal ID' })
  @IsDefined({ message: 'Goal ID is required' })
  @Field(() => Int)
  goalId: number

  @ValidateNested()
  @IsDefined({ message: 'Resource is required' })
  @Field(() => CreateResourceDto)
  resource: CreateResourceDto

  @ValidateNested()
  @IsArray({ message: 'At least one schedule is required' })
  @ArrayMinSize(1, { message: 'At least one schedule is required' })
  @Field(() => [CreateMilestoneScheduleDto])
  schedules: CreateMilestoneScheduleDto[]
}
