import { ArgsType, Field, Int } from '@nestjs/graphql'
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

@ArgsType()
export class UpdateGoalDto {
  @IsInt({ message: 'Invalid ID' })
  @IsDefined({ message: 'ID is required' })
  @Field(() => Int)
  id: number

  @IsString({ message: 'Invalid Name' })
  @IsOptional()
  @MinLength(6, { message: 'Name should have at least 6 characters' })
  @MaxLength(64, { message: 'Name should have maximum 64 characters' })
  @Field({ nullable: true })
  name?: string

  startDate?: string
  estimatedEndDate?: string
  actualEndDate?: string
  isActive?: boolean
}
