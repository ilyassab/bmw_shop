import { injectGlobal }    from 'emotion'

import { fontFaces }       from './theme'
import { injectFontFaces } from './utils'

export const injectGlobalStyles = () => {
  injectFontFaces(fontFaces)

  injectGlobal({
    html: {
      height: '100%',
    },
    body: {
      WebkitFontSmoothing: 'antialiased',
      WebkitOverflowScrolling: 'touch',
      height: '100%',
      margin: 0,
      overflowX: 'hidden',
    },
    '#__next': {
      display: 'flex',
      minHeight: '100%',
      flexDirection: 'column',
    },
  })
}
