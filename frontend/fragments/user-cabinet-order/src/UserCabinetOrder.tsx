import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { Background }                        from '@ui/background'
import { Condition }                         from '@ui/condition'
import { Divider }                           from '@ui/divider'
import { Loader }                            from '@ui/loader'
import { HoverText, Ruble, Space, Text }     from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  id?: number
  backToOrders?: () => void
}

const UserCabinetOrder: FC<WrappedComponentProps & Props> = ({ intl, id, backToOrders }) => {
  const [order, setOrder] = useState({ date: '', sum: null, statue: '', number: null, items: [] })
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = cookieStorage.getItem('token') || ''
        const data = await useData(client, id, token)
        setOrder(data)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Layout width='100%' justifyContent='center'>
        <Box height='32px'>
          <Loader />
        </Box>
      </Layout>
    )
  }

  return (
    <Column maxWidth={['93.3%', '93.3%', '690px']} alignSelf={['center', 'center', 'initial']}>
      <Box
        onClick={() => {
          setOrder({ date: '', sum: null, statue: '', number: null, items: [] })
          backToOrders()
        }}
      >
        <HoverText
          cursor='pointer'
          fontWeight='normal'
          fontSize='semiMedium'
          color='blue'
          underline
        >
          {'\u2190'}
          <Space />
          {intl.formatMessage(messages.backToHistory)}
        </HoverText>
      </Box>
      <Layout flexBasis={['14px', '22px', '30px']} />
      <Text
        fontWeight='tiny'
        fontSize={['semiLarge', 'semiLarge', 'large']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.orderNumber)}
        {intl.formatNumber(order.number)}
      </Text>
      <Layout flexBasis='24px' />
      <Row display={['none', 'flex', 'flex']}>
        <Text
          color='crumbsGray'
          fontSize='semiSmall'
          fontWeight='semiBold'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.date)}
        </Text>
        <Layout flexBasis='176px' />
        <Text
          color='crumbsGray'
          fontSize='semiSmall'
          fontWeight='semiBold'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.price)}
        </Text>
        <Layout flexBasis='63px' />
        <Text
          color='crumbsGray'
          fontSize='semiSmall'
          fontWeight='semiBold'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.status)}
        </Text>
      </Row>
      <Layout flexShrink={0} flexBasis={['0px', '13px', '13px']} />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <Row width={['100%', '305px', '44.5%']} minWidth={['auto', '305px', 'auto']}>
          <Layout flexBasis='205px'>
            <Condition match={order.date}>
              <Text fontSize='semiMedium' fontWeight='normal'>
                {new Date(order.date).getDate() < 10
                  ? `0${new Date(order.date).getDate()}`
                  : new Date(order.date).getDate()}
                .
                {new Date(order.date).getMonth() + 1 < 10
                  ? `0${new Date(order.date).getMonth() + 1}`
                  : new Date(order.date).getMonth() + 1}
                .{new Date(order.date).getFullYear()}
              </Text>
            </Condition>
          </Layout>
          <Layout flexBasis='100px'>
            <Box maxWidth='90px'>
              <Text
                fontSize='semiMedium'
                fontWeight='semiBold'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
              >
                {intl.formatNumber(order.sum)}
                <Space />
                <Ruble />
              </Text>
            </Box>
          </Layout>
        </Row>
        <Layout flexBasis={['15px', '0px', '0px']} />
        <Row width={['100%', '100%', '54.5%']}>
          <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
            {order.statue}
          </Text>
        </Row>
      </Box>
      <Layout flexShrink={0} flexBasis='23px' />
      <Divider color='whiteGray' />
      <Layout flexShrink={0} flexBasis='32px' />
      {order.items.map(orderObject => (
        <Column>
          <Row>
            <Box height='100px' border='gray' alignItems='center' justifyContent='center'>
              <Background
                width='98px'
                height='98px'
                backgroundImage={`url(${orderObject.image})`}
              />
            </Box>
            <Layout flexBasis='24px' />
            <Box width='100%' flexDirection={['column', 'row', 'row']}>
              <Column maxWidth={['100%', '260px', '260px']}>
                <Text
                  fontSize={['semiMedium', 'default', 'default']}
                  fontWeight='normal'
                  lineHeight='extra'
                  dangerouslySetInnerHTML={{ __html: orderObject.name }}
                />
                <Layout flexBasis={['4px', '12px', '12px']} />
                <Text fontSize={['small', 'semiMedium', 'semiMedium']} color='dustyGray'>
                  {intl.formatMessage(messages.art)}.
                  <Space />
                  {orderObject.vendorCode}
                </Text>
              </Column>
              <Layout flexGrow={[0, 1, 1]} flexBasis={['16px', '0px', '0px']} />
              <Box maxWidth={['100%', '220px', '220px']}>
                <Condition match={orderObject.amount > 1}>
                  <Text
                    color='crumbsGray'
                    fontWeight='semiBold'
                    fontSize={['semiMedium', 'default', 'default']}
                    whiteSpace='nowrap'
                  >
                    {intl.formatNumber(orderObject.amount)}
                    <Space />
                    x
                    <Space />
                  </Text>
                </Condition>
                <Text
                  fontWeight='semiBold'
                  fontSize={['semiMedium', 'default', 'default']}
                  overflow='hidden'
                  whiteSpace='nowrap'
                  textOverflow='ellipsis'
                >
                  {intl.formatNumber(orderObject.price)}
                  <Space />
                  <Ruble />
                </Text>
              </Box>
            </Box>
          </Row>
          <Layout flexBasis='32px' />
        </Column>
      ))}
    </Column>
  )
}

export default injectIntl(UserCabinetOrder)
