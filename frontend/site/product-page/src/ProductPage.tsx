import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { Product }       from '@fragments/product'
import { TopNavigation } from '@fragments/top-navigation'

export const ProductPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Product isMobile={isMobile} />
    <Footer />
  </>
)
