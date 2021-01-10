import React, { FC, useState }               from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { BlueButton }                        from '@ui/button'
import { InputLabel }                        from '@ui/input'
import { Text }                              from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const UserCabinetChangePassword: FC<WrappedComponentProps & Props> = ({ intl }) => {
  const [state, setState] = useState({
    currentPassword: '',
    newPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  const onClick = async () => {
    setLoading(true)
    const { currentPassword, newPassword } = state
    const token = cookieStorage.getItem('token') || ''

    try {
      await useData(client, currentPassword, newPassword, token)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <Column maxWidth={['93.3%', '93.3%', '690px']} alignSelf={['center', 'center', 'initial']}>
      <Text
        fontWeight='tiny'
        fontSize={['semiLarge', 'semiLarge', 'large']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.changePassword)}
      </Text>
      <Layout flexBasis={['10px', '16px', '16px']} />
      <Text
        fontWeight='normal'
        fontSize={['semiMedium', 'medium', 'medium']}
        color='dustyGray'
        lineHeight='extra'
      >
        {intl.formatMessage(messages.inAnyMoment)}
      </Text>
      <Layout flexBasis='24px' />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <InputLabel
          label={intl.formatMessage(messages.currentPassword)}
          placeholder={intl.formatMessage(messages.currentPassword)}
          onChange={text => {
            setState({
              ...state,
              currentPassword: text,
            })
          }}
        />
        <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
        <InputLabel
          label={intl.formatMessage(messages.newPassword)}
          placeholder={intl.formatMessage(messages.newPassword)}
          onChange={text => {
            setState({
              ...state,
              newPassword: text,
            })
          }}
        />
      </Box>
      <Layout flexBasis={['24px', '32px', '32px']} />
      <BlueButton height='60px' loading={loading} onClick={onClick}>
        <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
          {intl.formatMessage(messages.change)}
        </Text>
      </BlueButton>
    </Column>
  )
}

export default injectIntl(UserCabinetChangePassword)
