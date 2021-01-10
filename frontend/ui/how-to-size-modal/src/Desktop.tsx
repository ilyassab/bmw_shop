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
        maxWidth={['90%', '90%', '1116px']}
      >
        <Box position='absolute' top={32} right={32} onClick={onClose}>
          <Cross />
        </Box>
        <Column maxWidth={['auto', 'auto', '996px']} width='100%'>
          <Layout flexBasis='60px' />
          <Text fontSize='large' fontWeight='tiny' lineHeight='normal' textTransform='uppercase'>
            {intl.formatMessage(messages.howTo)}
          </Text>
          <Layout flexBasis='32px' />
          <Row>
            <Background
              width='401px'
              height='550px'
              backgroundImage='url(/static/size.png)'
            />
            <Layout flexBasis='73px' />
            <Column
              maxWidth='400px'
            >
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
              <Layout flexBasis='66px' />
              <Column
                position='relative'
              >
                <Box
                  position='absolute'
                  top={11}
                  left={-370}
                  borderTop='blueDashed'
                  width='357px'
                />
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
              <Layout flexBasis='48px' />
              <Column
                position='relative'
              >
                <Box
                  position='absolute'
                  top={11}
                  left={-370}
                  borderTop='blueDashed'
                  width='357px'
                />
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
              <Layout flexBasis='48px' />
              <Column
                position='relative'
              >
                <Box
                  position='absolute'
                  top={11}
                  left={-370}
                  borderTop='blueDashed'
                  width='357px'
                />
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
            </Column>
          </Row>
          <Layout flexBasis='60px' />
        </Column>
      </Box>

  )
  /* eslint-enable */
}

export default Desktop
