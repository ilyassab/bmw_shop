import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Main }          from '@fragments/main'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'

export const IndexPage = ({ isMobile, isTablet }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Main isMobile={isMobile} isTablet={isTablet} />
    <Footer />
  </>
)
