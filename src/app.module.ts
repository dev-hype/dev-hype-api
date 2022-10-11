import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { AuthModule } from './auth/auth.module'
import { FieldModule } from './field/field.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { GoalModule } from './goal/goal.module'
import { MailModule } from './mail/mail.module'
import { MilestoneModule } from './milestone/milestone.module'
import { MiscModule } from './misc/misc.module'
import { PrismaModule } from './prisma/prisma.module'
import { ResourceModule } from './resource/resource.module'
import { UserModule } from './user/user.module'

import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        cors: {
          origin: [configService.get('FRONTEND_URL')],
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    FieldModule,
    FileUploadModule,
    GoalModule,
    MailModule,
    MilestoneModule,
    MiscModule,
    ResourceModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
