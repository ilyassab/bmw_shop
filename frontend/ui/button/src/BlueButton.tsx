import styled            from '@emotion/styled'
import React, { FC }     from 'react'
import { Row }           from '@atlantis-lab/layout'
import { useIntl }       from 'react-intl'

import { ButtonLoader }  from '@ui/button-loader'
import { CheckMarkIcon } from '@ui/icons'
import { Space, Text }   from '@ui/text'

import messages          from './messages'
import { Button }        from './Button'

const BlueButtonStyled = styled(Button)(({ theme, backgroundColor }: any) => ({
  backgroundColor: theme.colors[backgroundColor] || theme.colors.blue,
  transition: '0.25s',
  ':hover': {
    backgroundColor: theme.colors[backgroundColor] || theme.colors.darkBlue,
  },
}))
/* eslint-disable */
export const BlueButton: FC<any> = ({ children, saved, loading, checkMark, ...props }) => {
  const intl = useIntl()

  return (
    <BlueButtonStyled {...props}>
      {saved ? (
        <>
          <CheckMarkIcon width='16px' height='12px' />
          <Space count={2} />
          <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
            {intl.formatMessage(messages.saved)}
          </Text>
        </>) :
        checkMark ? (
        <>
          <Row
            display={['flex', 'none', 'flex']}
            alignItems='center'
            justifyContent='center'
          >
            <CheckMarkIcon width='16px' height='12px' />
            <Space count={2} />
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.success)}
            </Text>
          </Row>
          <Row
            display={['none', 'flex', 'none']}
            alignItems='center'
            justifyContent='center'
          >
            <CheckMarkIcon width='16px' height='12px' />
            <Space count={2} />
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.tabletSuccess)}
            </Text>
          </Row>
        </>
      ) : loading ? (
        <ButtonLoader />
      ) : (
        children
      )}
    </BlueButtonStyled>
  )
}
/* eslint-enable */
