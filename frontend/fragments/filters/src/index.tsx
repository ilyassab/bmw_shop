import React, { FC } from 'react'

import { Condition } from '@ui/condition'

import Desktop       from './Desktop'
import Mobile        from './Mobile'

interface Props {
  block: string
  isMobile?: boolean
}

export const Filters: FC<Props> = ({ block, isMobile }) => (
  <>
    <Condition match={isMobile}>
      <Mobile block={block} />
    </Condition>
    <Condition match={!isMobile}>
      <Desktop block={block} />
    </Condition>
  </>
)
