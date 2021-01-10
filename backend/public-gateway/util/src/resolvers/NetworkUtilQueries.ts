import { IncomingMessage }                    from 'http'

import { Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class NetworkUtilQueries {
  @Query(returns => String, { name: 'IPAddress' })
  public getIPAddress(@Context('req') request: IncomingMessage): string {
    const { remoteAddress } = request.connection
    return remoteAddress
  }

  /**
   * @todo watch or pr-welcome these https://github.com/ardatan/graphql-tools/blob/master/packages/merge/src/merge-schemas.ts
   */
  @Mutation(returns => String, { name: '_testMutation' })
  public testMutation(): string {
    return ''
  }
}
