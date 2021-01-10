import React                      from 'react'

import { CatalogAccessoriesPage } from './CatalogAccessoriesPage'
import { Seo }                    from './Seo'

export default ({ isMobile, isTablet }) => (
  <>
    <Seo />
    <CatalogAccessoriesPage isMobile={isMobile} />
  </>
)
