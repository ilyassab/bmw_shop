import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { Static }        from '@fragments/static'
import { TopNavigation } from '@fragments/top-navigation'

export const StaticPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Static />
    <Footer />
  </>
)
