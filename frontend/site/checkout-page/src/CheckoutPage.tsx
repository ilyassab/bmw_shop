import React             from 'react'

import { Checkout }      from '@fragments/checkout'
import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'

export const CheckoutPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Checkout />
    <Footer />
  </>
)
