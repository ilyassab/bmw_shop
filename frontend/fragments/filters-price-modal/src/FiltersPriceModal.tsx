import React, { FC }                         from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Modal }                             from '@atlantis-lab/modal'
import { PriceSlider }                       from '@fragments/price-slider'
import { Condition }                         from '@ui/condition'
import { ArrowLeftIcon }                     from '@ui/icons'
import { Text }                              from '@ui/text'
import { filterParser }                      from '@utils/filter-parser'

import messages                              from './messages'

interface Props {
  onClose?: () => void
  opened?: boolean
  loading?: boolean
  query?: any
  price?: any
}

const FiltersPriceModal: FC<Props & WrappedComponentProps> = ({
  onClose,
  opened,
  loading,
  intl,
  price,
  query,
}) => {
  const currentPrice = JSON.parse(decodeURI(query.price || '[]'))[0]
  const currentPriceValues = currentPrice && currentPrice.value

  return (
    <Modal
      visible={opened}
      onClose={onClose}
      alignItems='flex-start'
      justifyContent={['flex-end', 'flex-end', 'center']}
    >
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        minHeight='100%'
        backgroundColor='white'
        maxWidth='90%'
      >
        <Condition match={loading}>
          <Box
            position='absolute'
            width='100%'
            height='100%'
            zIndex='10'
            backgroundColor='coverWhite'
          />
        </Condition>
        <Column backgroundColor='white' width='100%'>
          <Box flexDirection='column' backgroundColor='white'>
            <Box flexDirection='column' boxShadow='gray' alignItems='center'>
              <Layout flexShrink={0} flexBasis='23px' />
              <Row alignItems='center'>
                <Layout flexBasis='5%' />
                <ArrowLeftIcon
                  color='rgb(38, 38, 38)'
                  width='9px'
                  height='20px'
                  onClick={onClose}
                />
                <Layout flexBasis='16px' onClick={onClose} />
                <Text
                  fontSize={['default', 'default', 'large']}
                  fontWeight={['semiBold', 'semiBold', 'tiny']}
                  textTransform='uppercase'
                  onClick={onClose}
                >
                  {intl.formatMessage(messages.collection)}
                </Text>
              </Row>
              <Layout flexShrink={0} flexBasis='23px' />
            </Box>
            <Layout flexShrink={0} flexBasis='24px' />
            <Column maxWidth='90%' alignSelf='center'>
              <PriceSlider
                min={price.min}
                max={price.max}
                opened={opened}
                currentMin={(currentPriceValues && currentPriceValues[0]) || null}
                currentMax={(currentPriceValues && currentPriceValues[1]) || null}
                onChange={(min, max) => {
                  filterParser.addPriceFilter(price.key, min, max)
                }}
              />
            </Column>
          </Box>
        </Column>
      </Box>
    </Modal>
  )
}

export default injectIntl(FiltersPriceModal)
