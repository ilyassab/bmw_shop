import styled         from '@emotion/styled'
import { switchProp } from 'styled-tools'

const directions = switchProp('direction', () => ({
  left: {
    right: '90px',
  },
  right: {
    right: '0px',
  },
}))

export const SlideshowButton = styled.div<any>(
  ({ theme, disabled }: any) => ({
    position: 'absolute',
    width: 60,
    height: 60,
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    boxSizing: 'border-box',
    borderRadius: '50%',
    bottom: '80px',
    boxShadow: theme.shadows.codgray,
    zIndex: 9,
    display: disabled ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows.woodsmoke,
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  }),
  directions
)
