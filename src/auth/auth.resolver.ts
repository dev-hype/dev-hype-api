import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'

import { LocalAuthDto } from './dto/local-auth.dto'

@Resolver()
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
}
