import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt'

import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    } as StrategyOptions)
  }

  async validate(payload: any, done: VerifiedCallback) {
    const userId = payload.sub

    const user = await this.userService.getUserWithProfile({ id: userId })

    if (user) {
      return done(null, user)
    }

    return done(null)
  }
}
