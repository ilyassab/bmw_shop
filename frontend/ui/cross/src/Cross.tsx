import styled           from '@emotion/styled'
import React, { FC }    from 'react'

import { CloseIcon }    from '@ui/icons'
import { IconsManager } from '@ui/icons-manager'

const StyledCross = styled.div({
  '& svg': {
    ':hover': {
      transition: '0.75s',
      transform: 'rotate(180deg)',
    },
  },
})

interface Props {
  width?: number | string
  height?: number | string
}

export const Cross: FC<Props> = ({ width, height }) => (
  <StyledCross>
    <IconsManager hoverColor='semiBlack' clickedColor='semiBlack'>
      <CloseIcon width={width || '18px'} height={height || '18px'} />
    </IconsManager>
  </StyledCross>
)
