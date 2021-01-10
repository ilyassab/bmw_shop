import React, { FC, useState }       from 'react'
import { Box, Column, Layout, Row }  from '@atlantis-lab/layout'
import { useApolloClient }           from '@apollo/react-hooks'
import { useRouter }                 from 'next/router'
import { useIntl }                   from 'react-intl'

import { BlueButton }                from '@ui/button'
import { Condition }                 from '@ui/condition'
import { InputLabel, InputPassword } from '@ui/input'
import { Checkbox }                  from '@ui/input'
import { NextLink }                  from '@ui/link'
import { Space, Text }               from '@ui/text'
import { useBasketDispatch }         from '@store/stores'
import { cookieStorage }             from '@utils/cookie-storage'

import messages                      from './messages'
import { useData }                   from './useData'

const RegistrationBlock: FC = () => {
  const intl = useIntl()
  const client = useApolloClient()
  const { dispatch: cartDispatch } = useBasketDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    secondName: '',
  })
  const [loading, setLoading] = useState(false)
  const [checkbox, setCheckbox] = useState(false)
  const [errors, setErrors] = useState(null)
  const router = useRouter()

  const onClick = async () => {
    if (checkbox) {
      setLoading(true)
      const { email, password, firstName, secondName } = state

      try {
        const { data, errors: fetchErrors } = await useData(
          client,
          email,
          password,
          firstName,
          secondName
        )
        if (data) {
          cookieStorage.setItem('token', data.token)
          cookieStorage.setItem('userId', `${data.userId}`)
          cookieStorage.removeItem('xBasketId')
          cartDispatch({ type: 'resetCart' })
          router.push('/user-cabinet')
        }
        if (fetchErrors) {
          setLoading(false)
          setErrors(fetchErrors)
        }
      } catch {
        setLoading(false)
      }
    }
  }

  return (
    <Box
      maxWidth={['93.3%', '588px', '588px']}
      backgroundColor='white'
      width='100%'
      alignSelf='center'
      justifyContent='center'
      boxShadow={['none', 'authShadow', 'authShadow']}
    >
      <Column maxWidth={['100%', '473px', '473px']} width='100%'>
        <Layout flexBasis={['0px', '60px', '60px']} />
        <Text
          fontWeight='tiny'
          fontSize={['semiLarge', 'large', 'large']}
          textTransform='uppercase'
          lineHeight='normal'
        >
          {intl.formatMessage(messages.registration)}
        </Text>
        <Layout flexBasis={['10px', '16px', '16px']} />
        <Text fontWeight='normal' fontSize='semiMedium' color='dustyGray' lineHeight='extra'>
          {intl.formatMessage(messages.afterRegistration)}
          <Space />
          <NextLink href='/login' color='blue' underline>
            {intl.formatMessage(messages.enter)}
          </NextLink>
        </Text>
        <Layout flexBasis='24px' />
        <Box width='100%' flexDirection={['column', 'column', 'row']}>
          <InputLabel
            label={intl.formatMessage(messages.firstName)}
            placeholder={intl.formatMessage(messages.firstName)}
            onChange={text => {
              setState({
                ...state,
                firstName: text,
              })
            }}
          />
          <Layout flexShrink={0} flexBasis='16px' />
          <InputLabel
            label={intl.formatMessage(messages.secondName)}
            placeholder={intl.formatMessage(messages.secondName)}
            onChange={text => {
              setState({
                ...state,
                secondName: text,
              })
            }}
          />
        </Box>
        <Layout flexBasis='16px' />
        <InputLabel
          label={intl.formatMessage(messages.email)}
          placeholder={intl.formatMessage(messages.email)}
          onChange={text => {
            setState({
              ...state,
              email: text,
            })
          }}
        />
        <Layout flexBasis='16px' />
        <InputPassword
          label={intl.formatMessage(messages.password)}
          placeholder={intl.formatMessage(messages.password)}
          onChange={text => {
            setState({
              ...state,
              password: text,
            })
          }}
        />
        <Layout flexBasis='24px' />
        <Checkbox
          checked={checkbox}
          onChange={checked => {
            setCheckbox(checked)
          }}
        >
          <Row>
            <Layout flexShrink={0} flexBasis='12px' />
            <Text fontWeight='normal' fontSize='semiMedium' color='dustyGray' lineHeight='extra'>
              {intl.formatMessage(messages.iAgreeWith)}
              <Space />
              <NextLink target='_blank' href='/pages/policy' display='inline' color='blue'>
                {intl.formatMessage(messages.termsOfUse)}
              </NextLink>
              <Space />
              {intl.formatMessage(messages.bmwGroup)}
            </Text>
          </Row>
        </Checkbox>
        <Layout flexBasis='24px' />
        <BlueButton
          backgroundColor={checkbox ? 'blue' : 'activeGray'}
          height='60px'
          loading={loading}
          onClick={onClick}
        >
          <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
            {intl.formatMessage(messages.register)}
          </Text>
        </BlueButton>
        <Layout flexBasis='5px' />
        <Condition match={!errors}>
          <Box height='15px' />
        </Condition>
        <Condition match={errors}>
          <Text
            fontSize='small'
            fontWeight='small'
            lineHeight='extra'
            color='red'
            dangerouslySetInnerHTML={{
              __html: typeof errors === 'string' ? errors : errors && errors[0] && errors[0].error,
            }}
          />
        </Condition>
        <Layout flexGrow={[1, 0, 0]} flexBasis={['5px', '45px', '45px']} />
      </Column>
    </Box>
  )
}

export default RegistrationBlock
