import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { MiscModule } from './misc/misc.module'
import { FieldModule } from './field/field.module'
import { GoalModule } from './goal/goal.module'
import { MilestoneModule } from './milestone/milestone.module'
import { ResourceModule } from './resource/resource.module'
import { MailModule } from './mail/mail.module'

import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    MiscModule,
    FieldModule,
    GoalModule,
    MilestoneModule,
    ResourceModule,
    MailModule,
  ],
})
export class AppModule {}
