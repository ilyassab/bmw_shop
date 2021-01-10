import React                 from 'react'

import { CatalogWheelsGrid } from '@fragments/catalog-wheels-grid'
import { Footer }            from '@fragments/footer'
import { Navigation }        from '@fragments/navigation'
import { TopNavigation }     from '@fragments/top-navigation'

export const CatalogWheelsGridPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CatalogWheelsGrid isDesktop={!isMobile} isMobile={isMobile} />
    <Footer />
  </>
)
