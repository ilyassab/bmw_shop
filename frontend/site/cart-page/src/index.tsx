import React        from 'react'

import { CartPage } from './CartPage'
import { Seo }      from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <CartPage isMobile={isMobile} />
  </>
)
