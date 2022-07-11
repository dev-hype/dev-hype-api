import { ArgsType, Field } from '@nestjs/graphql'
import { IsDefined, IsJWT } from 'class-validator'

@ArgsType()
export class VerifyEmailDto {
  @IsJWT({ message: 'Invalid token' })
  @IsDefined({ message: 'Token is required' })
  @Field()
  token: string
}
