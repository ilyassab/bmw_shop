import React                      from 'react'

import { CatalogAccessoriesGrid } from '@fragments/catalog-accessories-grid'
import { Footer }                 from '@fragments/footer'
import { Navigation }             from '@fragments/navigation'
import { TopNavigation }          from '@fragments/top-navigation'

export const CatalogAccessoriesGridPage = ({ isDesktop, isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CatalogAccessoriesGrid isDesktop={isDesktop} isMobile={isMobile} />
    <Footer />
  </>
)
