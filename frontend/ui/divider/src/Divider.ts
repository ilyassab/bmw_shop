import styled     from '@emotion/styled'
import { ifProp } from 'styled-tools'

interface DividerProps {
  vertical?: boolean
  color?: string
}

const Divider = styled('div', {
  shouldForwardProp: prop => !['vertical'].includes(prop),
})<DividerProps>(
  ({ color, theme }: any) => ({
    width: '100%',
    height: '1px',
    backgroundColor: theme.colors[color],
  }),
  ifProp('vertical', {
    width: '1px',
    height: 'auto',
  })
)

Divider.defaultProps = {
  color: 'lightGray',
}

export default Divider
