import { Field, Int, InputType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export class CreateResourceDto {
  @IsString({ message: 'Invalid name' })
  @IsDefined({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must have at least 3 characters' })
  @MaxLength(64, { message: 'Name can have maximum 64 characters' })
  @Field()
  name: string

  @IsString({ message: 'Invalid URL' })
  @IsUrl({ message: 'Invalid URL' })
  @IsDefined({ message: 'URL is required' })
  @Field()
  url: string

  @IsBoolean({ message: "Invalid value for 'isFree'" })
  @IsDefined({ message: "Field 'free' is required" })
  @Field(() => Boolean)
  isFree: boolean

  @IsInt({ message: 'Invalid Type ID' })
  @IsDefined({ message: 'Type ID is required' })
  @Field(() => Int)
  typeId: number
}
