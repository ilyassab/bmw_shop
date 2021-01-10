import React             from 'react'

import { Footer }        from '@fragments/footer'
import { HowTo }         from '@fragments/how-to'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'
import { NotFoundStub }  from '@ui/not-found-stub'

export const NotFoundPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <NotFoundStub />
    <HowTo />
    <Footer />
  </>
)
