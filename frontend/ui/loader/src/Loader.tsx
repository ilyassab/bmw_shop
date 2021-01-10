import styled        from '@emotion/styled'
import { keyframes } from '@emotion/core'

const hourglass = keyframes`
  0% {
    transform: rotate(45deg);
  }
  
  100% {
    transform: rotate(225deg);
  }
`

export const Loader = styled.div({
  display: 'flex',
  boxShadow: 'inset 0px 0px 0px 2px #bababa',
  borderRadius: '50%',
  width: '32px',
  opacity: 0.6,
  ':after': {
    content: '""',
    display: 'block',
    borderRadius: '50%',
    width: 0,
    height: 0,
    margin: 0,
    boxSizing: 'border-box',
    border: '16px solid #fff',
    animation: `${hourglass} 2s ease-in-out infinite`,
    transform: 'rotate(45deg)',
    borderColor: '#bababa transparent #bababa transparent',
  },
})
