import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { Search }        from '@fragments/search'
import { TopNavigation } from '@fragments/top-navigation'

export const SearchPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Search />
    <Footer />
  </>
)
