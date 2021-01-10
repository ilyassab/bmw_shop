import * as OTG                            from 'openapi-to-graphql'

import { Module }                          from '@nestjs/common'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { UtilModule }                      from '@public-gateway/util'

@Module({
  imports: [
    UtilModule,
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        const OAS = (await import('./resources/schema.json')).default
        const isNotProduction = process.env.NODE_ENV !== 'production'

        const { schema } = await OTG.createGraphQLSchema(OAS as any, {
          strict: false,
          singularNames: true,
        })

        const options: GqlModuleOptions = {
          schema,
          debug: isNotProduction,
          playground: isNotProduction,
          autoSchemaFile: 'schema.gql',
        }

        return options
      },
    }),
  ],
})
export class ApplicationModule {}
