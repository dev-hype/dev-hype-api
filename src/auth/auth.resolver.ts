import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'

import { SendEmailVerificationGuard } from './guards/send-email-verification.guard'

import { LocalAuthDto } from './dto/local-auth.dto'
import { SendVerificationEmailDto } from './dto/send-verification-email.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'
import { VerifyEmailGuard } from './guards/verify-email.guard'

@Resolver(() => String)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args() args: LocalAuthDto) {
    const { access_token } = await this.authService.localLogin(
      args.email,
      args.password,
    )

    return access_token
  }

  @Mutation(() => String)
  async signup(@Args() args: LocalAuthDto) {
    await this.authService.localSignup(args.email, args.password)

    return 'success'
  }

  @Mutation(() => String)
  @UseGuards(SendEmailVerificationGuard)
  async sendverificationEmail(@Args() { email }: SendVerificationEmailDto) {
    await this.authService.sendSignupVerificationEmail(email)

    return 'Email sent'
  }

  @Mutation(() => String)
  @UseGuards(VerifyEmailGuard)
  async verifyEmail(@Args() { token }: VerifyEmailDto) {
    return this.authService.verifyEmailByToken(token)
  }
}
