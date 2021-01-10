import styled     from '@emotion/styled'
import { FC }     from 'react'

import { Button } from './Button'

export const ShowMoreButton: FC<any> = styled(Button)({
  transition: '0.35s',
})

ShowMoreButton.defaultProps = {
  backgroundColor: 'slightlyGray',
  hoverBackgroundColor: 'buttonGray',
  activeBackgroundColor: 'activeGray',
}
