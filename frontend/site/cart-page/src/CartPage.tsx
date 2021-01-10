import React             from 'react'

import { Cart }          from '@fragments/cart'
import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'

export const CartPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Cart />
    <Footer />
  </>
)
