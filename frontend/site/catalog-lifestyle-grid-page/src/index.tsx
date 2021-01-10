import React                        from 'react'

import { CatalogLifestyleGridPage } from './CatalogLifestyleGridPage'
import { Seo }                      from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <CatalogLifestyleGridPage isMobile={isMobile} />
  </>
)
