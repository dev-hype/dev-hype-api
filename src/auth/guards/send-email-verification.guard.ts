import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserService } from 'src/user/user.service'

export class SendEmailVerificationGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()

    const email = args.email

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
