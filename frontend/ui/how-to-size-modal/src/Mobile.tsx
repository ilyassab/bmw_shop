import React, { FC }                from 'react'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }                  from 'react-intl'

import { Background }               from '@ui/background'
import { Cross }                    from '@ui/cross'
import { Link }                     from '@ui/link'
import { Space, Text }              from '@ui/text'

import messages                     from './messages'

interface Props {
  onClose?: () => void
  setSizeModalOpened?: (arg0?: any) => void
}

const Desktop: FC<Props> = ({ onClose, setSizeModalOpened }) => {
  const intl = useIntl()

  /* eslint-disable */
  return (
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        backgroundColor='white'
        maxWidth={['100%', '100%', '1116px']}
      >
        <Box position='absolute' top={[22, 22, 32]} right={[16, 16, 32]} onClick={onClose}>
          <Cross />
        </Box>
        <Column maxWidth={['90%', '90%', '996px']} width='100%'>
          <Layout flexBasis={['16px', '16px', '60px']} />
          <Box
            width='100%'
            maxWidth='90%'
          >
            <Text fontSize={['semiLarge', 'large', 'large']} fontWeight='tiny' lineHeight='regular' textTransform='uppercase'>
              {intl.formatMessage(messages.howTo)}
            </Text>
          </Box>
          <Layout flexBasis={['12px', '12px', '32px']} />
          <Row>
            <Text
              fontWeight='normal'
              fontSize='medium'
              lineHeight='extra'
            >
              {intl.formatMessage(messages.measure)}
              <Space/>
              <Link
                color='blue'
                onClick={() => setSizeModalOpened(true)}
                underline
              >
                {intl.formatMessage(messages.tableSize)}
              </Link>
            </Text>
          </Row>
          <Layout flexBasis={['12px', '12px', '16px']} />
          <Layout
            width='100%'
            justifyContent='center'
            position='relative'
          >
            <Background
              width='288px'
              height='148px'
              backgroundImage='url(/static/chest.jpg)'
            />
            <Box
              top={80}
              position='absolute'
              borderTop='blueDashed'
              width='208px'
            />
          </Layout>
          <Layout flexBasis={['18px', '18px', '66px']} />
          <Column
          >
            <Text
              fontWeight='semiBold'
              fontSize='xmedium'
            >
              {intl.formatMessage(messages.chest)}
            </Text>
            <Layout flexBasis='10px' />
            <Text
              fontWeight='normal'
              fontSize='semiMedium'
              lineHeight='extra'
            >
              {intl.formatMessage(messages.closeTo)}
            </Text>
          </Column>
          <Layout flexBasis={['16px', '16px', '48px']} />
          <Layout
            width='100%'
            justifyContent='center'
            position='relative'
          >
            <Background
              width='288px'
              height='148px'
              backgroundImage='url(/static/tall.jpg)'
            />
            <Box
              top={80}
              position='absolute'
              borderTop='blueDashed'
              width='208px'
            />
          </Layout>
          <Layout flexBasis={['18px', '18px', '66px']} />
          <Column
          >
            <Text
              fontWeight='semiBold'
              fontSize='xmedium'
            >
              {intl.formatMessage(messages.waist)}
            </Text>
            <Layout flexBasis='10px' />
            <Text
              fontWeight='normal'
              fontSize='semiMedium'
              lineHeight='extra'
            >
              {intl.formatMessage(messages.strictMeasure)}
            </Text>
          </Column>
          <Layout flexBasis={['16px', '16px', '48px']} />
          <Layout
            width='100%'
            justifyContent='center'
            position='relative'
          >
            <Background
              width='288px'
              height='148px'
              backgroundImage='url(/static/hips.jpg)'
            />
            <Box
              top={80}
              position='absolute'
              borderTop='blueDashed'
              width='208px'
            />
          </Layout>
          <Layout flexBasis={['18px', '18px', '66px']} />
          <Column
          >
            <Text
              fontWeight='semiBold'
              fontSize='xmedium'
            >
              {intl.formatMessage(messages.hips)}
            </Text>
            <Layout flexBasis='10px' />
            <Text
              fontWeight='normal'
              fontSize='semiMedium'
              lineHeight='extra'
            >
              {intl.formatMessage(messages.horizontally)}
            </Text>
          </Column>
          <Layout flexBasis={['32px', '32px', '60px']} />
        </Column>
      </Box>

  )
  /* eslint-enable */
}

export default Desktop
