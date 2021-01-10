import React                  from 'react'

import { CatalogAccessories } from '@fragments/catalog-accessories'
import { Footer }             from '@fragments/footer'
import { Navigation }         from '@fragments/navigation'
import { TopNavigation }      from '@fragments/top-navigation'

// TODO сделать блок recently-viewed после создания страницы продукта (cookie)

export const CatalogAccessoriesPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CatalogAccessories />
    <Footer />
  </>
)
