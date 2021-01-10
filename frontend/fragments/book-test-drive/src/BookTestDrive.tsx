import React, { FC }                         from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Button }                            from '@ui/button'
import { Input }                             from '@ui/input'
import { Text }                              from '@ui/text'

import messages                              from './messages'

const BookTestDrive: FC<WrappedComponentProps> = ({ intl }) => {
  return (
    <Column alignItems='center'>
      <Layout width={['240px', '240px', '360px']}>
        <Text
          fontSize={['semiLarge', 'semiLarge', 'large']}
          lineHeight='normal'
          fontWeight='tiny'
          textTransform='uppercase'
          textAlign='center'
        >
          {intl.formatMessage(messages.bookTestDrive)}
        </Text>
      </Layout>
      <Layout flexBasis='21px' />
      <Box maxWidth={['90%', '540px', '540px']}>
        <Text
          fontSize='medium'
          lineHeight='extra'
          fontWeight='medium'
          textAlign='center'
          color='motionGray'
        >
          {intl.formatMessage(messages.typeYourName)}
        </Text>
        <Layout flexBasis='24px' />
      </Box>
      <Layout flexBasis='24px' />
      <Input
        width={['90%', '384px', '384px']}
        height='60px'
        border='none'
        padding='0 20px'
        fontSize='medium'
        backgroundColor='inputGray'
        placeholder={intl.formatMessage(messages.name)}
      />
      <Layout flexBasis='16px' />
      <Input
        width={['90%', '384px', '384px']}
        height='60px'
        border='none'
        backgroundColor='inputGray'
        padding='0 20px'
        fontSize='medium'
        placeholder={intl.formatMessage(messages.telephone)}
      />
      <Layout flexBasis='16px' />
      <Input
        width={['90%', '384px', '384px']}
        height='60px'
        border='none'
        backgroundColor='inputGray'
        padding='0 20px'
        fontSize='medium'
        placeholder={intl.formatMessage(messages.time)}
      />
      <Layout flexBasis='16px' />
      <Button backgroundColor='blue' height='60px' width={['90%', '384px', '384px']}>
        <Text color='white' fontSize='medium'>
          {intl.formatMessage(messages.left)}
        </Text>
      </Button>
    </Column>
  )
}

export default injectIntl(BookTestDrive)
