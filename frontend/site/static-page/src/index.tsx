import React          from 'react'

import { Seo }        from './Seo'
import { StaticPage } from './StaticPage'

export default ({ isMobile }) => (
  <>
    <Seo />
    <StaticPage isMobile={isMobile} />
  </>
)
