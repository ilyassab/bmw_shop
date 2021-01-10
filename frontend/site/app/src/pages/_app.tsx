import App                                   from 'next/app'
import compose                               from 'recompose/compose'
import { withApollo }                        from '@atlantis-lab/next-app-with-apollo'
import { withEmotion }                       from '@atlantis-lab/next-app-with-emotion'
import { withHelmet }                        from '@atlantis-lab/next-app-with-helmet'
import { withIntl }                          from '@atlantis-lab/next-app-with-intl'
import { withIsMobile }                      from '@atlantis-lab/next-app-with-ismobile'
import { withProvider }                      from '@atlantis-lab/next-app-with-provider'

import { StoreProvider }                     from '@store/stores'
import { CookieModalProvider }               from '@ui/cookie-modal'
import { ThemeProvider, injectGlobalStyles } from '@ui/theme'

export const withProviders = compose(
  /* eslint-disable */
  withApollo({
    uri: (process as any).browser
      ? window.__NEXT_DATA__.props.apolloUrl
      : process.env.PUBLIC_GATEWAY_URL || 'https://gateway.bmw.shop.aunited.dev/graphql',
    fetch: (uri, options, props) => {
      if (props.token) {
        options.headers.authorization = props.token
      }
      if (typeof window !== 'undefined' && window.__NEXT_DATA__.props.token) {
        options.headers.authorization = window.__NEXT_DATA__.props.token
      }

      return fetch(uri, options)
    },
  }),
  /* eslint-enable */
  withIntl({
    default: 'ru',
  }),
  withEmotion({
    Provider: ThemeProvider,
    injectGlobalStyles,
  }),
  withHelmet(),
  withIsMobile(),
  withProvider(StoreProvider),
  withProvider(CookieModalProvider)
)

export default withProviders(App)
