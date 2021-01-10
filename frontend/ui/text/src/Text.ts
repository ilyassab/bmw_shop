import styled                                         from '@emotion/styled'
import { color, overflow, space, system, typography } from 'styled-system'

export const Text: any = styled.span<any>(
  system({
    wordBreak: true,
    whiteSpace: true,
    textTransform: true,
    textOverflow: true,
    textDecoration: true,
    cursor: true,
  }),
  color,
  space,
  overflow,
  typography
)

Text.defaultProps = {
  fontFamily: 'primary',
  color: 'semiBlack',
}
