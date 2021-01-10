import React           from 'react'

import { ProductPage } from './ProductPage'
import { Seo }         from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <ProductPage isMobile={isMobile} />
  </>
)
