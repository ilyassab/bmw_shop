import styled                       from '@emotion/styled'
import React, { FC }                from 'react'
import { borderBottom, color, top } from 'styled-system'
import { switchProp }               from 'styled-tools'

interface Props {
  top?: string | number
  fixed?: boolean
  size?: string
  backgroundColor?: string
  transparent?: string
  borderBottom?: string
  dispatch?: (arg0?: any) => void
  setCurrentMenuItem?: (arg0?: string) => void
}

const sizes = switchProp('size', {
  tiny: {
    height: 48,
  },
  small: {
    height: 60,
  },
  normal: {
    height: 72,
  },
})

const Container = styled.div<any>(
  {
    width: '100%',
    zIndex: 10,
  },
  sizes
)

const StyledNavigation = styled.div<any>(
  ({ fixed }) => ({
    width: '100%',
    position: fixed ? 'fixed' : 'relative',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    transition: '0.45s',
  }),
  sizes,
  top,
  borderBottom,
  color
)

const Navigation: FC<Props> = ({
  size,
  fixed,
  backgroundColor,
  borderBottom: borderBottomProp,
  top: topProp,
  dispatch,
  setCurrentMenuItem,
  transparent,
  children,
}) => (
  <Container size={size}>
    <StyledNavigation
      fixed={fixed}
      size={size}
      top={topProp}
      backgroundColor={backgroundColor}
      borderBottom={borderBottomProp}
      onMouseEnter={() => {
        if (dispatch) {
          dispatch({ type: 'setTransparent', payload: { transparent: false, hovered: true } })
        }
      }}
      onMouseLeave={() => {
        if (setCurrentMenuItem) {
          setCurrentMenuItem('')
        }
        if (dispatch) {
          dispatch({
            type: 'setTransparent',
            payload: { transparent, hovered: false },
          })
        }
      }}
    >
      {children}
    </StyledNavigation>
  </Container>
)

Navigation.defaultProps = {
  size: 'normal',
  fixed: true,
}

export { Navigation }
