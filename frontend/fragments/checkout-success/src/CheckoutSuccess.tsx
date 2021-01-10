import React, { FC }           from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'
import { useRouter }           from 'next/router'
import { useIntl }             from 'react-intl'

import { Background }          from '@ui/background'
import { BlueButton }          from '@ui/button'
import { Link }                from '@ui/link'
import { Space, Text }         from '@ui/text'

import messages                from './messages'

const CheckoutSuccess: FC = () => {
  const intl = useIntl()
  const router = useRouter()

  const orderId = router && router.query && router.query.orderId

  return (
    <Column flexGrow={1}>
      <Background
        width='100%'
        height={['431px', '505px', '602px']}
        backgroundImage='url(/static/success_background.png)'
      >
        <Column>
          <Layout flexBasis={['509px', '535px', '193px']} />
          <Box
            backgroundColor='white'
            width='100%'
            maxWidth={['100%', '100%', '996px']}
            flexDirection='column'
            alignSelf='center'
          >
            <Column maxWidth={['90%', '90%', '876px']} alignSelf='center'>
              <Layout flexBasis={['16px', '20px', '60px']} />
              <Text
                fontSize={['semiLarge', 'large', 'xlarge']}
                fontWeight='tiny'
                lineHeight='normal'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.thanks)}
              </Text>
              <Layout flexBasis='16px' />
              <Layout flexBasis='100%'>
                <Text
                  fontSize='default'
                  fontWeight='small'
                  lineHeight='extra'
                  color='dustyGray'
                  whiteSpace='nowrap'
                  textOverflow='ellipsis'
                  overflow='hidden'
                >
                  {intl.formatMessage(messages.yourOrder)}
                  <Space />
                  <Text fontWeight='semiBold'>
                    {'\u0023'}
                    <Space />
                    {orderId}
                  </Text>
                </Text>
              </Layout>
              <Layout flexBasis={['16px', '16px', '24px']} />
              <Layout display={['none', 'flex', 'flex']} maxWidth={['288px', '600px', '600px']}>
                <Text
                  fontSize={['semiMedium', 'medium', 'medium']}
                  fontWeight='small'
                  lineHeight='extra'
                  color='dustyGray'
                >
                  {intl.formatMessage(messages.agreement)}
                </Text>
              </Layout>
              <Layout display={['none', 'flex', 'flex']} maxWidth={['288px', '600px', '600px']}>
                <Text
                  fontSize={['semiMedium', 'medium', 'medium']}
                  fontWeight='small'
                  lineHeight='extra'
                  color='dustyGray'
                >
                  {intl.formatMessage(messages.soon)}
                </Text>
              </Layout>
              <Layout display={['flex', 'none', 'none']} maxWidth={['288px', '600px', '600px']}>
                <Text
                  fontSize={['semiMedium', 'medium', 'medium']}
                  fontWeight='small'
                  lineHeight='extra'
                  color='dustyGray'
                >
                  {intl.formatMessage(messages.agreement)}
                  <Space />
                  {intl.formatMessage(messages.soon)}
                </Text>
              </Layout>
              <Layout flexBasis={['24px', '32px', '32px']} />
              <Link href='/'>
                <BlueButton width='280px' height='60px'>
                  <Text
                    fontWeight='semiBold'
                    fontSize='semiMedium'
                    whiteSpace='nowrap'
                    color='white'
                  >
                    {intl.formatMessage(messages.continue)}
                  </Text>
                </BlueButton>
              </Link>
              <Layout flexBasis={['16px', '24px', '80px']} />
            </Column>
          </Box>
        </Column>
      </Background>
    </Column>
  )
}

export default CheckoutSuccess
