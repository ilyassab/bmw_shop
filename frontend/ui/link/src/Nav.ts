import styled       from '@emotion/styled'
import { FC }       from 'react'
import { ifProp }   from 'styled-tools'

import { LinkUI }   from './Link'
import { NextLink } from './NextLink'

const UI = styled('span')(
  ({ theme, mobile, color, active }: any) => ({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: mobile ? 'initial' : 'hidden',
    fontWeight: theme.fontWeights.small,
    fontSize: theme.fontSizes.medium,
    textDecoration: 'none',
    outline: 0,
    whiteSpace: 'nowrap',
    color: active ? theme.colors.blue : color,
    ':after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '2px',
      backgroundColor: theme.colors.blue,
      bottom: 0,
      transform: active ? 'translateY(0)' : 'translateY(5px)',
      transition: 'transform 0.35s cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    },
    ':hover': {
      color: theme.colors.blue,
      transition: 'color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      ':after': {
        transform: 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  }),
  ifProp('mobile', {
    ':after': {
      display: 'none',
    },
  }),
  ifProp('active', {
    ':after': {
      display: 'flex',
    },
  })
)

export const Nav: FC<any> = UI.withComponent(NextLink)
export const NavLink: FC<any> = UI.withComponent(LinkUI)
