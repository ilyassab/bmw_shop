import React, { FC }    from 'react'
import { keyframes }    from '@emotion/core'

import { FavoriteIcon } from '@ui/icons'
import { Transition }   from '@ui/transition'

const infiniteLoop = keyframes`
  0% {
    transform: scale(0.92);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(0.92);
  }
`

interface Props {
  width?: number | string
  height?: number | string
  isFavorite?: boolean
  loading?: boolean
  isButton?: boolean
}
/*eslint-disable*/
export const Favorite: FC<Props> = ({ isFavorite, loading, isButton, width, height }) => (
  <Transition svgAnimation={loading ? `${infiniteLoop} 1s infinite linear` : ''}>
    <FavoriteIcon
      width={width}
      height={height}
      color={
        isFavorite
          ? 'rgba(24, 84, 205, 1)'
          : isButton
          ? 'rgba(38, 38, 38, 1)'
          : 'rgba(118, 118, 118, 0.75)'
      }
    />
  </Transition>
)
/* eslint-enable */
