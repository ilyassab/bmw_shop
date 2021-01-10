/* eslint-disable */
import React, { FC }                                    from 'react'
import {
  Box,
  Layout,
}                                                       from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }                                 from 'react-intl'

import { BottomFooter }                                                      from '@fragments/bottom-footer'
import { FooterInput }                                                       from '@fragments/footer-input'
import { FooterList }                                                        from '@fragments/footer-list'
import { AppleIcon, GoogleIcon, MastercardIcon, VisaIcon, WhiteBmwLogoIcon } from '@ui/icons'
import { Link }                                                              from '@ui/link'
import { Text }                                                              from '@ui/text'

import messages                                                              from './messages'

/* eslint-enable */

const Footer: FC<WrappedComponentProps> = ({ intl }) => {
  return (
    <Box flexDirection='column' backgroundColor='groundBlack' alignItems='center'>
      <Box
        flexDirection={['column', 'column', 'row']}
        maxWidth={['90%', '90%', '1200px']}
        width='100%'
      >
        <Box flexDirection='column' width='auto' order={['1', '1', '0']}>
          <Layout flexBasis={['40px', '40px', '64px']} />
          <Text color='white' fontSize='small' fontWeight='semiBold' textTransform='uppercase'>
            {intl.formatMessage(messages.news)}
          </Text>
          <Layout flexBasis='16px' />
          <FooterInput />
          <Layout flexBasis='24px' />
          <Box width='100%'>
            <AppleIcon width='40px' height='20px' />
            <Layout flexBasis='20px' />
            <GoogleIcon width='40px' height='20px' />
            <Layout flexBasis='20px' />
            <VisaIcon width='40px' height='20px' />
            <Layout flexBasis='20px' />
            <MastercardIcon width='100px' height='20px' />
          </Box>
          <Layout flexBasis='64px' />
        </Box>
        <Box flexDirection='row' flexWrap='wrap' width='100%'>
          <Layout flexGrow={[0, 0, 1]} />
          <FooterList />
        </Box>
        <Layout display={['none', 'none', 'flex']}>
          <Layout flexBasis='23px' />
          <Box flexDirection='column' width='auto'>
            <Layout flexBasis='64px' />
            <Link href='/'>
              <Box>
                <WhiteBmwLogoIcon width='56px' height='56px' />
              </Box>
            </Link>
          </Box>
        </Layout>
      </Box>
      <BottomFooter />
    </Box>
  )
}

export default injectIntl(Footer)
