import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { New }           from '@fragments/new'
import { TopNavigation } from '@fragments/top-navigation'

export const NewPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <New />
    <Footer />
  </>
)
