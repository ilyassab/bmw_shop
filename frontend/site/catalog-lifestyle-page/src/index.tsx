import React                    from 'react'

import { CatalogLifestylePage } from './CatalogLifestylePage'
import { Seo }                  from './Seo'

export default ({ isMobile, isTablet }) => (
  <>
    <Seo />
    <CatalogLifestylePage isMobile={isMobile} />
  </>
)
