import styled         from '@emotion/styled'
import { Box }        from '@atlantis-lab/layout'
import { switchProp } from 'styled-tools'

import { theme }      from '@ui/theme'

interface Props {
  top?: boolean
  bottom?: boolean
}

export const Gradient = styled(Box)<Props>(
  {
    position: 'absolute',
    width: '100%',
  },
  switchProp('type', {
    DARK: {
      height: '100%',
      background: theme.colors.darkGradient,
      bottom: 0,
    },
    LIGHT: {
      height: '100%',
      background: theme.colors.darkGradient,
      bottom: 0,
    },
  })
)
