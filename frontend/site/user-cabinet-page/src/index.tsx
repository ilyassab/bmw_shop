import React               from 'react'

import { Seo }             from './Seo'
import { UserCabinetPage } from './UserCabinetPage'

export default ({ isMobile }) => (
  <>
    <Seo />
    <UserCabinetPage isMobile={isMobile} />
  </>
)
