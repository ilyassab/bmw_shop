import React, { FC }                         from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { Text }                              from '@ui/text'
import { Transition }                        from '@ui/transition'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useLogOut }                         from './useData'

const UserCabinetMenuExit: FC<WrappedComponentProps> = ({ intl }) => {
  const client = useApolloClient()

  const onClick = () => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      const data = await useLogOut(client, token)
      if (data.success) {
        cookieStorage.removeItem('userId')
        cookieStorage.removeItem('token')
        cookieStorage.removeItem('xBasketId')
        window.location.href = '/'
      }
    }
    fetchData()
  }

  return (
    <Transition cursor='pointer'>
      <Box
        display={['none', 'none', 'flex']}
        boxSizing='border-box'
        maxWidth='284px'
        boxShadow='gray'
        width='100%'
        onClick={onClick}
      >
        <Layout flexBasis='24px' />
        <Column>
          <Layout flexBasis='18px' />
          <Text color='red' fontWeight='normal' fontSize='semiMedium' lineHeight='extra'>
            {intl.formatMessage(messages.exit)}
          </Text>
          <Layout flexBasis='18px' />
        </Column>
      </Box>
    </Transition>
  )
}

export default injectIntl(UserCabinetMenuExit)
