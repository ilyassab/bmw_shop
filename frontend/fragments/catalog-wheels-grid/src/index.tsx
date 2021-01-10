import React         from 'react'

import { Condition } from '@ui/condition'

import Desktop       from './Desktop'
import Mobile        from './Mobile'

export const CatalogWheelsGrid = ({ isDesktop, isMobile }) => (
  <>
    <Condition match={isMobile}>
      <Mobile />
    </Condition>
    <Condition match={isDesktop}>
      <Desktop />
    </Condition>
  </>
)
