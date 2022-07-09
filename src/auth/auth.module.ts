import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UserService } from 'src/user/user.service'
import { UserModule } from 'src/user/user.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

// // Strategies
import { GithubStrategy } from './strategies/github.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1w',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    GithubStrategy,
    JwtStrategy,
    AuthService,
    UserService,
    AuthResolver,
  ],
  controllers: [],
})
export class AuthModule {}
