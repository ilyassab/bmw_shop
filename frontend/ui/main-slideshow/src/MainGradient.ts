import styled     from '@emotion/styled'
import { Box }    from '@atlantis-lab/layout'
import { ifProp } from 'styled-tools'

import { theme }  from '@ui/theme'

interface Props {
  top?: boolean
  bottom?: boolean
}

export const MainGradient = styled(Box)<Props>(
  {
    position: 'absolute',
    width: '100%',
  },
  ifProp('top', {
    height: '30%',
    background: theme.colors.mainTopGradient,
    top: 0,
  }),
  ifProp('bottom', {
    height: '52.5%',
    background: theme.colors.mainBottomGradient,
    bottom: 0,
  })
)
