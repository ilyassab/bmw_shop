import React             from 'react'

import { Faq }           from '@fragments/faq'
import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'

export const FaqPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <Faq />
    <Footer />
  </>
)
