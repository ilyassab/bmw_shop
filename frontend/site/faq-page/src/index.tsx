import React       from 'react'

import { FaqPage } from './FaqPage'
import { Seo }     from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <FaqPage isMobile={isMobile} />
  </>
)
