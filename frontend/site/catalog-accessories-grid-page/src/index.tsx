import React                          from 'react'

import { CatalogAccessoriesGridPage } from './CatalogAccessoriesGridPage'
import { Seo }                        from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <CatalogAccessoriesGridPage isDesktop={!isMobile} isMobile={isMobile} />
  </>
)
