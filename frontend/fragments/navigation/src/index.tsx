import React         from 'react'

import { Condition } from '@ui/condition'

import Desktop       from './Desktop'
import Mobile        from './Mobile'

export const Navigation = ({ isMobile }) => (
  <>
    <Condition match={!isMobile}>
      <Desktop />
    </Condition>
    <Condition match={isMobile}>
      <Mobile />
    </Condition>
  </>
)
