import React         from 'react'

import { IndexPage } from './IndexPage'
import { Seo }       from './Seo'

export default ({ isMobile, isTablet }) => (
  <>
    <Seo />
    <IndexPage isMobile={isMobile} isTablet={isTablet} />
  </>
)
