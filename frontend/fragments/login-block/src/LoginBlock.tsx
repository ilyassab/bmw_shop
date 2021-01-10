import React, { FC, useState }       from 'react'
import { Box, Column, Layout, Row }  from '@atlantis-lab/layout'
import { useApolloClient }           from '@apollo/react-hooks'
import { useRouter }                 from 'next/router'
import { useIntl }                   from 'react-intl'

import { BlueButton }                from '@ui/button'
import { Condition }                 from '@ui/condition'
import { Divider }                   from '@ui/divider'
import { InputLabel, InputPassword } from '@ui/input'
import { NextLink }                  from '@ui/link'
import { Text }                      from '@ui/text'
import { useBasketDispatch }         from '@store/stores'
import { cookieStorage }             from '@utils/cookie-storage'

import messages                      from './messages'
import { useData }                   from './useData'

const LoginBlock: FC = () => {
  const intl = useIntl()
  const client = useApolloClient()
  const { dispatch: cartDispatch } = useBasketDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    setLoading(true)
    const { email, password } = state
    try {
      const { data, errors: fetchErrors } = await useData(client, email, password)
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

  return (
    <>
      <Box
        maxWidth={['93.3%', '588px', '588px']}
        backgroundColor='white'
        width='100%'
        alignSelf='center'
        justifyContent='center'
        flexGrow={[1, 0, 0]}
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
            {intl.formatMessage(messages.hello)}
          </Text>
          <Layout flexBasis={['10px', '16px', '16px']} />
          <Text fontWeight='normal' fontSize='semiMedium' color='dustyGray' lineHeight='normal'>
            {intl.formatMessage(messages.enterThrough)}
          </Text>
          <Layout flexBasis='24px' />
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
          <Layout flexBasis={['12px', '16px', '16px']} />
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
          <Row display={['none', 'flex', 'flex']}>
            <Text fontWeight='normal' fontSize='semiMedium' whiteSpace='nowrap'>
              {intl.formatMessage(messages.accounts)}
            </Text>
            <Layout flexBasis='5px' />
            <NextLink
              fontWeight='normal'
              fontSize='semiMedium'
              color='blue'
              href='/registration'
              underline
            >
              {intl.formatMessage(messages.registration)}
            </NextLink>
            <Layout flexGrow={1} />
            <NextLink
              fontWeight='normal'
              fontSize='semiMedium'
              color='blue'
              href='/password-recovery'
              underline
            >
              {intl.formatMessage(messages.forgot)}
            </NextLink>
          </Row>
          <Row display={['flex', 'none', 'none']}>
            <NextLink
              fontWeight='normal'
              fontSize='semiMedium'
              color='blue'
              href='/password-recovery'
              underline
            >
              {intl.formatMessage(messages.forgot)}
            </NextLink>
          </Row>
          <Layout flexBasis='22px' />
          <BlueButton height='60px' loading={loading} onClick={onClick}>
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.enter)}
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
              lineHeight='normal'
              color='red'
              dangerouslySetInnerHTML={{
                __html: typeof errors === 'string' ? errors : errors && errors.error,
              }}
            />
          </Condition>
          <Layout flexGrow={[1, 0, 0]} flexBasis={['5px', '45px', '45px']} />
        </Column>
      </Box>
      <Column display={['flex', 'none', 'none']}>
        <Divider color='dividerGray' />
        <Layout flexBasis='21px' />
        <Row maxWidth='93.3%' alignSelf='center' justifyContent='center'>
          <Text fontWeight='normal' fontSize='semiMedium' whiteSpace='nowrap'>
            {intl.formatMessage(messages.accounts)}
          </Text>
          <Layout flexBasis='5px' />
          <NextLink
            fontWeight='normal'
            fontSize='semiMedium'
            color='blue'
            href='/registration'
            underline
          >
            {intl.formatMessage(messages.registration)}
          </NextLink>
        </Row>
        <Layout flexBasis='21px' />
      </Column>
    </>
  )
}

export default LoginBlock
