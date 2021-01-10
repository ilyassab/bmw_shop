import styled                                from '@emotion/styled'
import { border, color, layout, typography } from 'styled-system'

export const TextArea = styled('textarea')<any>(
  ({ theme }) => ({
    outline: 'none',
    padding: '20px',
    resize: 'none',
    '::placeholder': {
      color: theme.colors.placeholderGray,
    },
  }),
  layout,
  color,
  border,
  typography
)

TextArea.defaultProps = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: 'medium',
  fontFamily: 'primary',
}
