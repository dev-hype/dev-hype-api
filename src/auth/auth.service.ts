import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { MailService } from 'src/mail/mail.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  private generateToken(subject: string, expiresIn = '1w') {
    const token = this.jwtService.sign(
      {},
      {
        expiresIn: expiresIn,
        audience: 'users',
        issuer: 'main',
        subject,
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

    this.sendSignupVerificationEmail(email)

    return newUser
  }

  async localLogin(email: string, password: string) {
    const user = await this.validateLocalLogin(email, password)

    if (!user) {
      throw new BadRequestException('invalid credentials')
    }

    const access_token = this.generateToken(user.id)

    return {
      access_token,
    }
  }

  async sendSignupVerificationEmail(email: string) {
    const verificationToken = this.generateToken(email, '1h')
    const frontendUrl = this.configService.get('FRONTEND_URL')

    return this.mailService.send({
      from: `info@dev-hype.com`,
      to: email,
      templateId: 'd-3fc962ea0ed34c5e8d421eb17a9253cf',
      dynamicTemplateData: {
        verify_url: `${frontendUrl}/verify/${verificationToken}`,
      },
    })
  }

  async verifyEmailByToken(token: string) {
    const { sub: email } = this.jwtService.verify(token)

    const user = await this.userService.verifyEmail(email)

    return this.generateToken(user.id)
  }
}
