import React, { FC }                         from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Background }                        from '@ui/background'
import { Button }                            from '@ui/button'
import { Link }                              from '@ui/link'
import { Text }                              from '@ui/text'

import messages                              from './messages'

const NotFoundStub: FC<WrappedComponentProps> = ({ intl }) => (
  <Column flexGrow={1}>
    <Background
      width='100%'
      height={['431px', '505px', '602px']}
      backgroundImage='url(/static/not_found_background.png)'
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
            <Layout flexBasis={['20px', '20px', '60px']} />
            <Text fontSize='xlarge' fontWeight='tiny' lineHeight='normal'>
              {intl.formatNumber(404)}.
            </Text>
            <Layout flexBasis='16px' />
            <Layout maxWidth={['288px', '460px', '460px']}>
              <Text fontSize='medium' fontWeight='small' lineHeight='extra' color='dustyGray'>
                {intl.formatMessage(messages.unfortunately)}
              </Text>
            </Layout>
            <Layout flexBasis={['10px', '32px', '32px']} />
            <Link href='/'>
              <Button backgroundColor='blue' width='280px' height='60px'>
                <Text fontSize='medium' fontWeight='small' lineHeight='extra' color='white'>
                  {intl.formatMessage(messages.toMain)}
                </Text>
              </Button>
            </Link>
            <Layout flexBasis={['24px', '24px', '128px']} />
          </Column>
        </Box>
      </Column>
    </Background>
  </Column>
)

export default injectIntl(NotFoundStub)
