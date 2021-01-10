import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { News }          from '@fragments/news'
import { TopNavigation } from '@fragments/top-navigation'

const NewsPage = ({ isMobile, isTablet }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <News isMobile={isMobile} isTablet={isTablet} />
    <Footer />
  </>
)

export default NewsPage
