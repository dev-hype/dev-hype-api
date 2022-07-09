import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsOptional } from 'class-validator'

@ArgsType()
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  page?: number

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  limit?: number
}
