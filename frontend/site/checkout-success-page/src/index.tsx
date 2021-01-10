import React                   from 'react'

import { CheckoutSuccessPage } from './CheckoutSuccessPage'
import { Seo }                 from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <CheckoutSuccessPage isMobile={isMobile} />
  </>
)
