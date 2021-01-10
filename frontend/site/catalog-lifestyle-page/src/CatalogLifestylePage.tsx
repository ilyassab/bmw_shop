import React                from 'react'

import { CatalogLifestyle } from '@fragments/catalog-lifestyle'
import { Footer }           from '@fragments/footer'
import { Navigation }       from '@fragments/navigation'
import { TopNavigation }    from '@fragments/top-navigation'

// TODO сделать блок recently-viewed после создания страницы продукта (cookie)

export const CatalogLifestylePage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CatalogLifestyle />
    <Footer />
  </>
)
