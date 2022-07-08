import { ArgsType, Field } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

@ArgsType()
export class LocalAuthDto {
  @Expose()
  @IsEmail({}, { message: 'Invalid email address' })
  @IsDefined({ message: 'Email is required' })
  @Field()
  email!: string

  @Expose()
  @IsString({ message: 'Invalid password' })
  @IsDefined({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password can have maximum 32 characterss' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message:
      'Password must have at least 1 uppercase, 1 lowercase and 1 number',
  })
  @Field()
  password!: string
}
