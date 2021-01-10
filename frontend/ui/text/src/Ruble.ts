import styled            from '@emotion/styled'
import { createElement } from 'react'

interface SpaceProps {
  count?: number
}

const Span = styled('span')<{}>(() => ({
  display: 'inline-flex',
}))

export const Ruble = ({ count = 1 }: SpaceProps) =>
  createElement(Span, {
    children: '\u20BD'.repeat(count),
  })
