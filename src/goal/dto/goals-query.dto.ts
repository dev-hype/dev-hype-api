import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsUUID } from 'class-validator'

import { PaginationDto } from 'src/common/dto/pagination.dto'

@ArgsType()
export class GoalsQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  userId?: string

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  topicId?: number
}
