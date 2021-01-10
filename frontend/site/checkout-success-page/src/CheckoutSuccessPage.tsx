import React               from 'react'

import { CheckoutSuccess } from '@fragments/checkout-success'
import { Footer }          from '@fragments/footer'
import { HowTo }           from '@fragments/how-to'
import { Navigation }      from '@fragments/navigation'
import { TopNavigation }   from '@fragments/top-navigation'

export const CheckoutSuccessPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <CheckoutSuccess />
    <HowTo />
    <Footer />
  </>
)
