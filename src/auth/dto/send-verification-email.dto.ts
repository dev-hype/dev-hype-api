import { ArgsType, Field } from '@nestjs/graphql'
import { IsDefined, IsEmail } from 'class-validator'

@ArgsType()
export class SendVerificationEmailDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsDefined({ message: 'Email is required' })
  @Field()
  email!: string
}
