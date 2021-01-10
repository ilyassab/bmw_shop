import React, { FC }                from 'react'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }                  from 'react-intl'

import { Condition }                from '@ui/condition'
import { Divider }                  from '@ui/divider'
import { CityPinIcon }              from '@ui/icons'
import { Space, Text }              from '@ui/text'
import { Transition }               from '@ui/transition'

import messages                     from './messages'

interface Props {
  store?: {
    address?: string
    externalId?: number
    id?: number
    lng?: number
    lat?: number
    location?: string
    name?: string
    phone?: string
    quantity?: number
    worktime?: string
  }
  pickpoint?: any
  currentCity?: any
  scrollRef?: any
  onItemClick?: (arg0?: any) => void
  index?: number
  lastIndex?: number
}

const DealerModalItem: FC<Props> = ({ store, pickpoint, onItemClick, index, lastIndex }) => {
  const intl = useIntl()

  if (typeof store.location !== 'string') {
    return null
  }

  return (
    <Transition
      width='100%'
      flexDirection='column'
      onClick={() => onItemClick(store)}
      cursor='pointer'
    >
      <Layout flexBasis='24px' />
      <Row>
        <Box width='16px' height='21px'>
          <CityPinIcon
            width='16px'
            height='21px'
            color={pickpoint.id === store.id ? 'rgba(24, 84, 205, 1)' : 'rgba(206, 205, 205, 1)'}
          />
        </Box>
        <Layout flexShrink={0} flexBasis='16px' />
        <Column>
          <Row>
            <Box maxWidth={['180px', '300px', '300px']}>
              <Text
                fontWeight='normal'
                fontSize='default'
                lineHeight='extra'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
                color={pickpoint.id === store.id ? 'blue' : 'semiBlack'}
                dangerouslySetInnerHTML={{ __html: store.name }}
              />
            </Box>
            <Layout flexGrow={1} />
            <Box maxWidth={['45px', '200px', '110px']}>
              <Text
                fontWeight='semiBold'
                fontSize='semiMedium'
                lineHeight='extra'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
              >
                {store.quantity}
                <Space />
                {intl.formatMessage(messages.count)}
              </Text>
            </Box>
          </Row>
          <Layout flexBasis='8px' />
          <Text
            fontWeight='normal'
            fontSize='semiMedium'
            lineHeight='extra'
            color='dustyGray'
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace={['wrap', 'wrap', 'nowrap']}
          >
            {store.address}
          </Text>
          <Layout flexBasis='3px' />
          <Box width='100%' flexDirection={['column', 'column', 'row']}>
            <Text
              fontWeight='normal'
              fontSize='semiMedium'
              lineHeight='extra'
              color='dustyGray'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
            >
              {intl.formatMessage(messages.workTime)}
              <Space />
              {store.worktime}
              ,
              <Space />
            </Text>
            <Text
              fontWeight='normal'
              fontSize='semiMedium'
              lineHeight='extra'
              color='dustyGray'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
            >
              {intl.formatMessage(messages.tel)}
              <Space />
              {store.phone}
            </Text>
          </Box>
        </Column>
      </Row>
      <Layout flexBasis='24px' />
      <Condition match={index !== lastIndex}>
        <Divider color='whiteGray' />
      </Condition>
    </Transition>
  )
}

export default DealerModalItem
