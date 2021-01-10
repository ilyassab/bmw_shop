import React            from 'react'

import { FavoritePage } from './FavoritePage'
import { Seo }          from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <FavoritePage isMobile={isMobile} />
  </>
)
