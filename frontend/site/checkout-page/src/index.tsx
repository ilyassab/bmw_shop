import React            from 'react'

import { CheckoutPage } from './CheckoutPage'
import { Seo }          from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <CheckoutPage isMobile={isMobile} />
  </>
)
