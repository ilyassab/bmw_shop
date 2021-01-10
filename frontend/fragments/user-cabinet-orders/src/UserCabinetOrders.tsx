import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { UserCabinetOrder }                  from '@fragments/user-cabinet-order'
import { Condition }                         from '@ui/condition'
import { Divider }                           from '@ui/divider'
import { Loader }                            from '@ui/loader'
import { HoverText, Ruble, Space, Text }     from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const UserCabinetOrders: FC<WrappedComponentProps & Props> = ({ intl }) => {
  const [orders, setOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = cookieStorage.getItem('token') || ''
        const data = await useData(client, token)
        setOrders(data)
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

  if (!loading && orders.length <= 0) {
    return (
      <Column maxWidth={['93.3%', '93.3%', '690px']} alignSelf={['center', 'center', 'initial']}>
        <Text>{intl.formatMessage(messages.noOrders)}</Text>
      </Column>
    )
  }

  return (
    <>
      <Condition match={!currentOrder}>
        <Column maxWidth={['93.3%', '93.3%', '690px']} alignSelf={['center', 'center', 'initial']}>
          <Text
            fontWeight='tiny'
            fontSize={['semiLarge', 'semiLarge', 'large']}
            textTransform='uppercase'
            lineHeight='normal'
          >
            {intl.formatMessage(messages.history)}
          </Text>
          <Layout flexBasis={['12px', '32px', '24px']} />
          <Row display={['none', 'flex', 'flex']}>
            <Text
              color='crumbsGray'
              fontSize='semiSmall'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.orderNumber)}
            </Text>
            <Layout flexBasis='154px' />
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
          <Layout flexShrink={0} flexBasis={['0px', '15px', '15px']} />
          <Layout display={['none', 'flex', 'flex']}>
            <Divider color='whiteGray' />
          </Layout>
          {orders.map(orderObject => (
            <Column key={orderObject.number}>
              <Layout flexBasis={['20px', '24px', '24px']} />
              <Box width='100%' flexDirection={['column', 'row', 'row']}>
                <Row width={['100%', '310px', '44%']} minWidth={['auto', '310px', 'auto']}>
                  <Layout flexBasis={['150px', '205px', '205px']}>
                    <Box maxWidth='100px'>
                      <Text
                        fontSize='semiMedium'
                        fontWeight='semiBold'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                      >
                        {'\u0023'}
                        {orderObject.number}
                        <Space />
                      </Text>
                    </Box>
                    <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                      {intl.formatMessage(messages.from)}
                      <Space />
                      {new Date(orderObject.date).getDate() < 10
                        ? `0${new Date(orderObject.date).getDate()}`
                        : new Date(orderObject.date).getDate()}
                      .
                      {new Date(orderObject.date).getMonth() + 1 < 10
                        ? `0${new Date(orderObject.date).getMonth() + 1}`
                        : new Date(orderObject.date).getMonth() + 1}
                      .{new Date(orderObject.date).getFullYear()}
                    </Text>
                  </Layout>
                  <Layout flexGrow={1} display={['flex', 'none', 'none']} />
                  <Layout flexBasis={['auto', '105px', '105px']}>
                    <Box maxWidth='105px'>
                      <Text
                        fontSize='semiMedium'
                        fontWeight='semiBold'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                      >
                        {intl.formatNumber(orderObject.sum)}
                        <Space />
                        <Ruble />
                      </Text>
                    </Box>
                  </Layout>
                </Row>
                <Box width={['100%', '100%', '56%']} flexDirection={['column', 'row', 'row']}>
                  <Text
                    lineHeight='extra'
                    fontSize='semiMedium'
                    fontWeight='normal'
                    color='crumbsGray'
                  >
                    {orderObject.statue}
                  </Text>
                  <Layout flexGrow={1} flexBasis={['23px', '0px', '0px']} />
                  <HoverText
                    onClick={() => setCurrentOrder(orderObject.number)}
                    fontSize='semiMedium'
                    fontWeight='normal'
                    color='blue'
                    cursor='pointer'
                    underline
                  >
                    {intl.formatMessage(messages.more)}
                  </HoverText>
                </Box>
              </Box>
              <Layout flexBasis={['20px', '24px', '24px']} />
              <Divider color='whiteGray' />
            </Column>
          ))}
        </Column>
      </Condition>
      <Condition match={currentOrder}>
        <UserCabinetOrder id={currentOrder} backToOrders={() => setCurrentOrder(null)} />
      </Condition>
    </>
  )
}

export default injectIntl(UserCabinetOrders)
