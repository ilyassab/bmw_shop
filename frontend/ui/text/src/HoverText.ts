import styled   from '@emotion/styled'

import { Text } from './Text'

export const HoverText = styled(Text)<any>(({ theme, underlineColor }) => ({
  position: 'relative',
  cursor: 'pointer',
  '::after': {
    transition: '0.35s',
    content: '""',
    height: '1px',
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: '-3px',
    left: '0px',
  },
  ':hover': {
    position: 'relative',
    '::after': {
      content: '""',
      transition: '0.35s',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors[underlineColor] || theme.colors.lightBlue,
      position: 'absolute',
      bottom: '-3px',
      left: '0px',
    },
  },
}))
