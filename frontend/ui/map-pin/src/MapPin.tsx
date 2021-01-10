import React, { FC }                     from 'react'

import { Condition }                     from '@ui/condition'
import { MapPinIcon, SuccessMapPinIcon } from '@ui/icons'
import { Transition }                    from '@ui/transition'

interface Props {
  item?: any
  clicked?: boolean
  onClick?: (arg0?: any) => void
  lat?: number
  lng?: number
}

export const MapPin: FC<Props> = ({ item, clicked, onClick }) => (
  <Transition
    boxSizing='border-box'
    cursor='pointer'
    height='46px'
    width='34px'
    onClick={() => onClick(item)}
  >
    <Condition match={!clicked}>
      <MapPinIcon height='46px' width='34px' />
    </Condition>
    <Condition match={clicked}>
      <SuccessMapPinIcon height='46px' width='34px' />
    </Condition>
  </Transition>
)
