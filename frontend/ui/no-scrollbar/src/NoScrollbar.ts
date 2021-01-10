import styled  from '@emotion/styled'
import { Box } from '@atlantis-lab/layout'

export const NoScrollbar = styled(Box)({
  transition: '0.4s',
  '::-webkit-scrollbar': {
    display: 'none',
  },
})
