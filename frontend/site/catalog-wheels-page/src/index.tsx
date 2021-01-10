import React                 from 'react'

import { CatalogWheelsPage } from './CatalogWheelsPage'
import { Seo }               from './Seo'

export default ({ isMobile, isTablet }) => (
  <>
    <Seo />
    <CatalogWheelsPage isMobile={isMobile} />
  </>
)
