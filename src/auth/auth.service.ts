import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private generateAccessToken(userId: string, expiresIn = '1w') {
    const token = this.jwtService.sign(
      {},
      {
        expiresIn: expiresIn,
        audience: 'users',
        issuer: 'main',
        subject: userId,
      },
    )

    return token
  }

  async validateLocalLogin(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)

    if (user) {
      const isValidPassword = await argon2.verify(user.password, password)

      if (isValidPassword) return user
    }

    return null
  }

  async localSignup(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)

    if (user) {
      throw new BadRequestException('user already exists')
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
    })

    return newUser
  }

  async localLogin(email: string, password: string) {
    const user = await this.validateLocalLogin(email, password)

    if (!user) {
      throw new BadRequestException('invalid credentials')
    }

    const access_token = this.generateAccessToken(user.id)

    return {
      access_token,
    }
  }
}
