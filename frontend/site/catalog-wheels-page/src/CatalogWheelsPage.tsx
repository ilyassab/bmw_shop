import React             from 'react'

import { CatalogWheels } from '@fragments/catalog-wheels'
import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'

export const CatalogWheelsPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CatalogWheels />
    <Footer />
  </>
)
