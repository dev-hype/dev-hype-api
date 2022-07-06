import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // config
  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  app.enableCors({
    origin: [configService.get('FRONTEND_URL')],
  })

  await app.listen(PORT)
}

bootstrap()
