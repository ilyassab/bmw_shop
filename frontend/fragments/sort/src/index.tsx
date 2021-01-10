import React, { FC } from 'react'

import { Condition } from '@ui/condition'

import Desktop       from './Desktop'
import Mobile        from './Mobile'

interface Props {
  isMobile?: boolean
}

export const Sort: FC<Props> = ({ isMobile }) => (
  <>
    <Condition match={isMobile}>
      <Mobile />
    </Condition>
    <Condition match={!isMobile}>
      <Desktop />
    </Condition>
  </>
)
