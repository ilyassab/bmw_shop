import React                     from 'react'

import { CatalogWheelsGridPage } from './CatalogWheelsGridPage'
import { Seo }                   from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <CatalogWheelsGridPage isMobile={isMobile} />
  </>
)
