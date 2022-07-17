import { ArgsType, Field } from '@nestjs/graphql'
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator'

@ArgsType()
export class EditProfileDto {
  @IsString({ message: 'First name is invalid' })
  @MinLength(3, { message: 'First name should have at least 3 characters' })
  @MaxLength(20, { message: 'First name should have maximum 20 characters' })
  @IsOptional()
  @Field({ nullable: true })
  firstName?: string

  @IsString({ message: 'Last name is invalid' })
  @MinLength(3, { message: 'Last name should have at least 3 characters' })
  @MaxLength(20, { message: 'Last name should have maximum 20 characters' })
  @IsOptional()
  @Field({ nullable: true })
  lastName?: string

  @IsString({ message: 'Bio is invalid' })
  @MinLength(3, { message: 'Bio should have at least 3 characters' })
  @MaxLength(100, { message: 'Bio should have maximum 100 characters' })
  @IsOptional()
  @Field({ nullable: true })
  bio?: string

  @IsString({ message: 'Avatar URL is invalid' })
  @IsUrl({}, { message: 'Invalid avatar URL' })
  @IsOptional()
  @Field({ nullable: true })
  avatar?: string

  @IsString({ message: 'Invalid country code' })
  @IsOptional()
  @Field({ nullable: true })
  countryCode?: string

  @IsString({ message: 'Invalid timezone' })
  @IsOptional()
  @Field({ nullable: true })
  timezoneName?: string
}
