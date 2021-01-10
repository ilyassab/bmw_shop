import React            from 'react'

import { NotFoundPage } from './NotFoundPage'
import { Seo }          from './Seo'

export default ({ isMobile, isTablet }) => (
  <>
    <Seo />
    <NotFoundPage isMobile={isMobile} />
  </>
)
