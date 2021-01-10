import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { NewsDetail }    from '@fragments/news-detail'
import { TopNavigation } from '@fragments/top-navigation'

const NewsDetailPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <NewsDetail />
    <Footer />
  </>
)

export default NewsDetailPage
