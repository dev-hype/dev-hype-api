import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

// import { UserModule } from 'src/user/user.module'

import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'
// import { AuthController } from './auth.controller'

// // Strategies
import { GithubStrategy } from './strategies/github.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    // UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GithubStrategy, JwtStrategy, AuthService, UserService],
  controllers: [
    /*AuthController*/
  ],
})
export class AuthModule {}
