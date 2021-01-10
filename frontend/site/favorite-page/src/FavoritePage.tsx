import React             from 'react'

import { Favorite }      from '@fragments/favorite'
import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'

export const FavoritePage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Favorite />
    <Footer />
  </>
)
