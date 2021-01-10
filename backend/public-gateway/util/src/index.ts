import { Module }             from '@nestjs/common'

import { NetworkUtilQueries } from './resolvers'

@Module({
  providers: [NetworkUtilQueries],
  exports: [NetworkUtilQueries],
})
export class UtilModule {}
