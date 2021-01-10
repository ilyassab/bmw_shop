import styled                  from '@emotion/styled'
import React, { FC, useState } from 'react'
import { layout }              from 'styled-system'
import { ifProp }              from 'styled-tools'

import { Text }                from '@ui/text'

interface LinkProps {
  children?: any
  href?: string
  fontWeight?: string | number | string[] | number[]
  lineHeight?: string | number | string[] | number[]
  fontSize?: string | number | string[] | number[]
  fontFamily?: string
  whiteSpace?: string
  dangerouslySetInnerHTML?: any
  color?: string
  hoverColor?: string
  underlineColor?: string
  clickedColor?: string
  textTransform?: string
  underline?: boolean
  target?: string
  width?: string
  pt?: string
  onClick?: any
  onMouseOver?: () => void
  onMouseLeave?: () => void
}

export const LinkUI = styled(Text.withComponent('a'))<any>(
  {
    position: 'relative',
    textDecoration: 'none',
    display: 'inline-flex',
    transition: '0.35s',
    cursor: 'pointer',
    '::after': {
      transition: '0.35s',
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: '-3px',
      left: '0px',
    },
  },
  ifProp('underline', ({ theme, underlineColor }) => ({
    position: 'relative',
    '::after': {
      transition: '0.35s',
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors[underlineColor] || theme.colors.lightBlue,
      position: 'absolute',
      bottom: '-3px',
      left: '0px',
    },
  })),
  layout
)

export const Link: FC<LinkProps> = React.forwardRef(
  (
    {
      children,
      href,
      fontSize,
      lineHeight,
      fontWeight,
      color,
      hoverColor,
      clickedColor,
      underline,
      underlineColor,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    return (
      <LinkUI
        fontSize={fontSize}
        lineHeight={lineHeight}
        ref={ref}
        fontWeight={fontWeight}
        /* eslint-disable no-nested-ternary */
        color={clicked ? clickedColor || color : hovered ? hoverColor || color : color}
        href={href}
        underline={underline && hovered && ((!clicked && clickedColor) || !clickedColor)}
        underlineColor={underlineColor}
        onMouseOver={() => setHovered(true)}
        onFocus={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setClicked(false)
        }}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        {...props}
      >
        {children}
      </LinkUI>
    )
  }
)

Link.defaultProps = {
  fontFamily: 'primary',
}
