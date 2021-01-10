import styled                                       from '@emotion/styled'
import { FC }                                       from 'react'
import { border, color, layout, space, typography } from 'styled-system'

export const Input: FC<any> = styled.input<any>(
  ({ theme, placeholderColor }) => ({
    outline: 'none',
    boxSizing: 'border-box',
    '::placeholder': {
      color: placeholderColor ? theme.colors[placeholderColor] : '',
    },
  }),
  typography,
  layout,
  border,
  space,
  color
)

Input.defaultProps = {
  fontFamily: 'primary',
}
