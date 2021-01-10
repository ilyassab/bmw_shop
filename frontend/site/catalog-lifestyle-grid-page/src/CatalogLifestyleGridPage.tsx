import React                    from 'react'

import { CatalogLifestyleGrid } from '@fragments/catalog-lifestyle-grid'
import { Footer }               from '@fragments/footer'
import { Navigation }           from '@fragments/navigation'
import { TopNavigation }        from '@fragments/top-navigation'

export const CatalogLifestyleGridPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CatalogLifestyleGrid isDesktop={!isMobile} isMobile={isMobile} />
    <Footer />
  </>
)
