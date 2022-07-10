import { ArgsType, Field, Int } from '@nestjs/graphql'
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'

import {
  IsAfterDate,
  IsFutureDate,
} from 'src/common/decorators/validators/dates'
import { CreateResourceDto } from 'src/resource/dto/create-resource.dto'

import { CreateMilestoneScheduleDto } from './create-milestoneSchedule.dto'

@ArgsType()
export class UpdateMilestoneDto {
  @IsInt({ message: 'Invalid ID' })
  @IsDefined({ message: 'ID is required' })
  @Field(() => Int)
  id: number

  @IsString({ message: 'Invalid name' })
  @IsOptional()
  @MinLength(3, { message: 'Name must have at least 3 characters' })
  @MaxLength(64, { message: 'Name can have maximum 64 characters' })
  @Field({ nullable: true })
  name?: string

  @IsISO8601({}, { message: 'Invalid Start Date' })
  @IsFutureDate({ message: 'Start Date must be a future date' })
  @IsOptional()
  @Field(() => Date, { nullable: true })
  startDate?: string

  @IsISO8601({}, { message: 'Invalid End Date' })
  @IsFutureDate({ message: 'End Date must be a future date' })
  @IsAfterDate('startDate', { message: 'End date must be after start date' })
  @IsOptional()
  @Field(() => Date, { nullable: true })
  estimatedEndDate?: string

  @ValidateNested()
  @IsOptional()
  @Field(() => CreateResourceDto, { nullable: true })
  resource?: CreateResourceDto

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one schedule is required' })
  @ValidateNested()
  @Field(() => [CreateMilestoneScheduleDto], { nullable: true })
  schedules?: CreateMilestoneScheduleDto[]

  actualEndDate?: string
}
