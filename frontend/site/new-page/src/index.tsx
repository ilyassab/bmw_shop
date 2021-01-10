import React       from 'react'

import { NewPage } from './NewPage'
import { Seo }     from './Seo'

export default ({ isMobile }) => (
  <>
    <Seo />
    <NewPage isMobile={isMobile} />
  </>
)
