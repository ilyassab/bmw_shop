import React, { FC, useState } from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'
import { useApolloClient }     from '@apollo/react-hooks'
import { useIntl }             from 'react-intl'

import { BlueButton }          from '@ui/button'
import { Condition }           from '@ui/condition'
import { InputLabel }          from '@ui/input'
import { Text }                from '@ui/text'

import messages                from './messages'
import { useData }             from './useData'

const PasswordRecoveryBlock: FC = () => {
  const intl = useIntl()
  const client = useApolloClient()
  const [state, setState] = useState({
    email: '',
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const onClick = async () => {
    const { email } = state
    setLoading(true)
    try {
      const { data, errors: fetchErrors } = await useData(client, email)
      if (data) {
        setLoading(false)
        setSuccess(data.success)
      } else {
        setLoading(false)
        setErrors(fetchErrors)
      }
    } catch {
      setLoading(false)
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
        <Condition match={!success}>
          <Text
            fontWeight='tiny'
            fontSize={['semiLarge', 'large', 'large']}
            textTransform='uppercase'
            lineHeight='normal'
          >
            {intl.formatMessage(messages.recovery)}
          </Text>
          <Layout flexBasis={['10px', '16px', '16px']} />
          <Text fontWeight='normal' fontSize='semiMedium' color='dustyGray' lineHeight='extra'>
            {intl.formatMessage(messages.typeEmail)}
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
          <Layout flexBasis='24px' />
          <BlueButton loading={loading} height='60px' onClick={onClick}>
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.recover)}
            </Text>
          </BlueButton>
          <Condition match={!errors}>
            <Box height='15px' />
          </Condition>
          <Condition match={errors}>
            <Layout flexBasis='5px' />
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
        </Condition>
        <Condition match={success}>
          <Text
            fontWeight='tiny'
            fontSize={['semiLarge', 'large', 'large']}
            textTransform='uppercase'
            lineHeight='normal'
          >
            {intl.formatMessage(messages.verify)}
          </Text>
          <Layout flexBasis={['10px', '16px', '16px']} />
          <Text fontWeight='normal' fontSize='semiMedium' color='dustyGray' lineHeight='extra'>
            {intl.formatMessage(messages.weSend)}
          </Text>
          <Layout flexBasis='24px' />
          <BlueButton height='60px'>
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.goTo)}
            </Text>
          </BlueButton>
          <Layout flexBasis='60px' />
        </Condition>
      </Column>
    </Box>
  )
}

export default PasswordRecoveryBlock
