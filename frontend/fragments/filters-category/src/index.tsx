import React, { FC } from 'react'

import { Condition } from '@ui/condition'

import Desktop       from './Desktop'
import Mobile        from './Mobile'

interface Props {
  block?: string
  isMobile?: boolean
  opened?: boolean
  items?: any
  query?: any
  onClose?: () => void
  onClickClose?: () => void
}

export const FiltersCategory: FC<Props> = ({ block, isMobile, ...props }) => (
  <>
    <Condition match={isMobile}>
      <Mobile {...props} />
    </Condition>
    <Condition match={!isMobile}>
      <Desktop block={block} />
    </Condition>
  </>
)
