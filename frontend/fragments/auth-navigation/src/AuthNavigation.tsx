import React, { FC }           from 'react'
import { Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }             from 'react-intl'

import { Divider }             from '@ui/divider'
import { BmwLogoIcon }         from '@ui/icons'
import { NextLink }            from '@ui/link'

import messages                from './messages'

const AuthNavigation: FC = () => {
  const intl = useIntl()

  return (
    <Column maxWidth={['93.3%', '593px', '593px']} alignSelf='center' width='100%'>
      <Layout flexBasis='19px' />
      <Row alignItems='center'>
        <NextLink
          href='/faq'
          color='blue'
          fontWeight='normal'
          fontSize='semiMedium'
          whiteSpace='nowrap'
          underline
        >
          {intl.formatMessage(messages.needHelp)}
        </NextLink>
        <Layout flexGrow={1} />
        <NextLink href='/'>
          <BmwLogoIcon width='48px' height='48px' />
        </NextLink>
      </Row>
      <Layout flexBasis='19px' />
      <Layout maxWidth={['72%', '486px', '486px']}>
        <Divider color='dividerGray' />
      </Layout>
    </Column>
  )
}

export default AuthNavigation
