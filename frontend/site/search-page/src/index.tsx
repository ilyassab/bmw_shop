import React          from 'react'

import { SearchPage } from './SearchPage'
import { Seo }        from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <SearchPage isMobile={isMobile} />
  </>
)
