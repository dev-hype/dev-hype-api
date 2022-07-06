import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private generateAccessToken(userId: number, expiresIn = '5m') {
    const token = this.jwtService.sign(
      {},
      {
        expiresIn: expiresIn,
        audience: 'users',
        issuer: 'main',
        subject: userId.toString(),
      },
    )

    return token
  }

  login(user: User) {
    const access_token = this.generateAccessToken(user.id)

    return {
      access_token,
    }
  }
}
