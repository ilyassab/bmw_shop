import styled                             from '@emotion/styled'
import React, { FC, useEffect, useState } from 'react'
import { Box, Column, Layout }            from '@atlantis-lab/layout'
import { MessageDescriptor, useIntl }     from 'react-intl'

import { BlueButton }                     from '@ui/button'
import { Condition }                      from '@ui/condition'
import { MailIcon, MarkIcon }             from '@ui/icons'
import { Text }                           from '@ui/text'

import { Input }                          from './Input'

const InputStyled = styled<any>(Input)(({ theme }: any) => ({
  transition: '0.35s',
  '::placeholder': {
    transition: '0.35s',
    color: theme.colors.inputWhite,
  },
  ':hover': {
    transition: '0.35s',
    '::placeholder': {
      transition: '0.35s',
      color: theme.colors.placeholderWhite,
    },
  },
}))

interface Props {
  setInputText?: (arg0?: string) => void
  inputText?: string
  validResponseText?: string
  id?: number
  onClick?: () => void
  setNotValidResponseText?: (arg0?: string) => void
  messages?: {
    incorrect?: MessageDescriptor
    required?: MessageDescriptor
    email?: MessageDescriptor
    success?: MessageDescriptor
  }
}

export const SubscribeInput: FC<Props> = ({
  setInputText,
  id,
  validResponseText,
  setNotValidResponseText,
  inputText,
  messages,
  onClick,
}) => {
  const [validMail, setValidMail] = useState(true)
  const intl = useIntl()

  useEffect(() => {
    setValidMail(true)
    setNotValidResponseText('')
  }, [inputText])

  useEffect(() => {
    if (validResponseText) {
      setValidMail(false)
    } else {
      setValidMail(true)
    }
  }, [validResponseText])

  const checkValidity = () => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setValidMail(inputText && emailPattern.test(inputText) && !validResponseText)
    if (inputText && emailPattern.test(inputText)) {
      onClick()
    }
  }

  return (
    <Column>
      <Layout position='relative' width='100%' maxWidth='384px'>
        <Condition match={!id}>
          <InputStyled
            height='60px'
            width={['100%', '384px', '384px']}
            backgroundColor='blackBright'
            border='none'
            color='white'
            fontSize='medium'
            padding='0 80px 0 20px'
            placeholder={intl.formatMessage(messages.email)}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                setValidMail(true)
                checkValidity()
              }
            }}
          />
          <Box
            position='absolute'
            right={0}
            onClick={() => {
              setValidMail(true)
              checkValidity()
            }}
          >
            <BlueButton width='60px' height='60px'>
              <MailIcon width='28px' height='23px' />
            </BlueButton>
          </Box>
          <Condition match={!validMail}>
            <Box
              position='absolute'
              backgroundColor='red'
              height='1px'
              width={['100%', '324px', '324px']}
              bottom={0}
            />
          </Condition>
          <Box position='absolute' bottom='-18px'>
            <Condition match={!validMail && inputText}>
              <Condition match={!validResponseText}>
                <Text fontSize='small' fontWeight='small' lineHeight='normal' color='red'>
                  {intl.formatMessage(messages.incorrect)}
                </Text>
              </Condition>
              <Condition match={validResponseText}>
                <Text fontSize='small' fontWeight='small' lineHeight='normal' color='red'>
                  {validResponseText}
                </Text>
              </Condition>
            </Condition>
            <Condition match={!validMail && !inputText}>
              <Text fontSize='small' fontWeight='small' lineHeight='normal' color='red'>
                {intl.formatMessage(messages.required)}
              </Text>
            </Condition>
          </Box>
        </Condition>
        <Condition match={id}>
          <Box
            height='60px'
            width={['100%', '384px', '384px']}
            backgroundColor='blue'
            alignItems='center'
          >
            <Layout flexBasis='20px' />
            <Text color='white' fontSize='medium' fontWeight='normal'>
              {intl.formatMessage(messages.success)}
            </Text>
            <Layout flexGrow={1} />
            <MarkIcon width='27px' height='20px' />
            <Layout flexBasis='20px' />
          </Box>
        </Condition>
      </Layout>
      <Layout flexBasis='10px' />
    </Column>
  )
}
