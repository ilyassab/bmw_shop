import styled        from '@emotion/styled'
import React, { FC } from 'react'
import { ifProp }    from 'styled-tools'

import { Button }    from './Button'

const CheckoutButtonStyled = styled(Button)(
  ({ theme }: any) => ({
    backgroundColor: theme.colors.white,
    outline: '1px solid rgba(59, 59, 59, 1)',
    transition: '0.25s',
    transform: 'scale(1)',
    ':hover': {
      backgroundColor: theme.colors.slightlyGray,
    },
  }),
  ifProp('active', ({ theme }) => ({
    backgroundColor: theme.colors.dustyBlack,
    transform: 'scale(1)',
    ':hover': {
      backgroundColor: theme.colors.dustyBlack,
    },
  }))
)

export const CheckoutButton: FC<any> = ({ children, ...props }) => {
  return <CheckoutButtonStyled {...props}>{children}</CheckoutButtonStyled>
}
