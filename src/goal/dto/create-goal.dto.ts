import { ArgsType, Field, Int } from '@nestjs/graphql'
import {
  IsDefined,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

@ArgsType()
export class CreateGoalDto {
  @IsString({ message: 'Name is required' })
  @IsDefined({ message: 'Name is required' })
  @MinLength(6, { message: 'Name should have at least 6 characters' })
  @MaxLength(64, { message: 'Name should have maximum 64 characters' })
  @Field()
  name: string

  @IsString({ message: 'Topic is required' })
  @IsDefined({ message: 'Topic is required' })
  @Field()
  topicName: string

  @IsInt({ message: 'Invalid specialization ID' })
  @IsDefined({ message: 'Specialization ID is required' })
  @Field(() => Int)
  specializationId: number
}
