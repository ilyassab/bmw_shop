import React          from 'react'
import styled         from '@emotion/styled'
import { keyframes }  from '@emotion/core'

import { LoaderIcon } from '@ui/icons'

const hourglass = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(180deg);
  }
`

const StyledSpan = styled.span({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  animation: `${hourglass} 1s ease-in-out infinite`,
})

export const ButtonLoader = () => (
  <StyledSpan>
    <StyledSpan>
      <LoaderIcon width='20px' height='20px' />
    </StyledSpan>
  </StyledSpan>
)
