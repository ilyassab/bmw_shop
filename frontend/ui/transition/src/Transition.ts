import styled     from '@emotion/styled'
import { Box }    from '@atlantis-lab/layout'
import { system } from 'styled-system'

export const Transition = styled(Box)<any>(
  ({
    transition,
    svgTransform,
    animation,
    svgAnimation,
    transform,
    visibility,
    display,
    outline,
  }) => ({
    display: display || 'flex',
    outline,
    transform,
    animation: animation || '',
    transition,
    visibility,
    '& span': {
      transition,
    },
    '& path': {
      transition,
    },
    '& rect': {
      transition,
    },
    '& svg': {
      transition,
      animation: svgAnimation || '',
      transform: svgTransform,
    },
    '& circle': {
      transition,
    },
  }),
  system({
    cursor: true,
  })
)

Transition.defaultProps = {
  transition: '0.35s',
}
