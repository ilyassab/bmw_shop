import { NestFactory }       from '@nestjs/core'

import { ApplicationModule } from './module'

const main = async () => {
  const application = await NestFactory.create(ApplicationModule)
  await application.listenAsync(process.env.SERVER_PORT)
}

main()
