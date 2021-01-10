import React                from 'react'

import { Condition }        from '@ui/condition'

import DesktopTopNavigation from './TopNavigation'

export const TopNavigation = ({ isMobile }) => (
  <Condition match={!isMobile}>
    <DesktopTopNavigation />
  </Condition>
)
