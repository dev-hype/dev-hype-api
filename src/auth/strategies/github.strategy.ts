import axios from 'axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy, VerifiedCallback } from 'passport-custom'

import { UserService } from 'src/user/user.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super()
  }

  github_client_id = this.configService.get('GITHUB_AUTH_CLIENT_ID')

  async validate(req: Request, done: VerifiedCallback) {
    const { access_token } = req.body

    try {
      const res = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })

      const { id, name, email, avatar_url } = res.data

      const currentUser = await this.userService.getUser({
        githubId: id.toString(),
      })

      if (currentUser) {
        return done(null, currentUser)
      }

      const user = await this.userService.createUser({
        email,
        githubId: id.toString(),
        profile: {
          create: {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            avatar: avatar_url,
          },
        },
      })

      done(null, user)
    } catch (error) {
      done(error)
    }
  }
}
