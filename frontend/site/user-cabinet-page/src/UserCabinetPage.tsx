import React             from 'react'

import { Footer }        from '@fragments/footer'
import { Navigation }    from '@fragments/navigation'
import { TopNavigation } from '@fragments/top-navigation'
import { UserCabinet }   from '@fragments/user-cabinet'

export const UserCabinetPage = ({ isMobile }) => (
  <>
    <TopNavigation isMobile={isMobile} />
    <Navigation isMobile={isMobile} />
    <UserCabinet />
    <Footer />
  </>
)
