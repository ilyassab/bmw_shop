import styled                                                          from '@emotion/styled'
import { Box }                                                         from '@atlantis-lab/layout'
import { backgroundImage, backgroundPosition, backgroundSize, system } from 'styled-system'
import { ifProp }                                                      from 'styled-tools'

interface BackgroundProps {
  borderRadius?: string
  width?: string | number | string[] | number[]
  minHeight?: string | number | string[] | number[]
  minWidth?: string | number | string[] | number[]
  height?: string | number | string[] | number[]
  backgroundColor?: string
  backgroundImage?: string | string[]
  backgroundSize?: string | string[]
  backgroundPosition?: string | string[]
  absolute?: boolean
  mediumBorder?: boolean
  hover?: boolean
  transition?: string
  cover?: boolean
  position?: string
  stub?: boolean
  cursor?: string
}

export const Background = styled(Box)<BackgroundProps>(
  ({ backgroundColor, borderRadius, display, transition, theme }: any) => ({
    display: display || 'flex',
    boxSizing: 'border-box',
    backgroundColor: theme.colors[backgroundColor],
    backgroundRepeat: 'no-repeat',
    borderRadius: theme.radii[borderRadius],
    transition,
  }),
  backgroundSize,
  backgroundPosition,
  backgroundImage,
  system({
    cursor: true,
  }),
  ifProp('stub', {
    backgroundImage: 'url(/static/img/imageStub.svg)',
  }),
  ifProp('scaleOnHover', ({ hover }) => ({
    transform: hover ? 'scale(1.04)' : '',
    transition: hover
      ? 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'transform 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    ':hover': {
      transform: 'scale(1.04)',
      transition: 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  }))
)

Background.defaultProps = {
  backgroundColor: 'gallery',
  backgroundPosition: 'center',
  position: 'relative',
  backgroundSize: 'cover',
}
