import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'

export class VerifyEmailGuard implements CanActivate {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()

    const token = args.token

    let email = ''

    try {
      const { sub } = this.jwtService.verify(token)
      email = sub
    } catch (error) {
      throw new UnprocessableEntityException('Invalid token')
    }

    console.log(email)
    const user = await this.userService.getUserByEmail(email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.verified) {
      throw new UnprocessableEntityException('Email is already verified')
    }

    return true
  }
}
