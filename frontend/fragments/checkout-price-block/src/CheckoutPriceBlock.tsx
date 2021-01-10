import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { useApolloClient }                   from '@apollo/react-hooks'
import { useIntl }                           from 'react-intl'

import { PromoInput }                        from '@fragments/promo-input'
import { Condition }                         from '@ui/condition'
import { Ruble, Space, Text }                from '@ui/text'
import { useBasketDispatch, useBasketState } from '@store/stores'
import { useCheckoutState, useCityState }    from '@store/stores'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData, useDataCart }              from './useData'

const CheckoutPriceBlock: FC = () => {
  const intl = useIntl()
  const { state: cartState } = useBasketState()
  const { dispatch: cartDispatch } = useBasketDispatch()
  const { state: cityState } = useCityState()
  const { state: checkoutState } = useCheckoutState()
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const xBasketId = cookieStorage.getItem('xBasketId')
      const data = await useData(client, xBasketId, checkoutState.deliveryId, cityState.city.code)
      setDeliveryPrice(data)
    }
    if (checkoutState.deliveryId) {
      fetchData()
    }
  }, [checkoutState && checkoutState.deliveryId])

  useEffect(() => {
    const xBasketId = cookieStorage.getItem('xBasketId')
    if (xBasketId) {
      const token = cookieStorage.getItem('token') || ''
      const fetchData = async () => {
        const data = await useDataCart(client, xBasketId, token)
        cartDispatch({ type: 'add', payload: data })
      }
      fetchData()
    }
  }, [])

  return (
    <Box
      width='100%'
      height={['auto', 'auto', '100%']}
      maxWidth={['100%', '100%', '384px']}
      flexDirection='column'
      position='relative'
      boxShadow='motionGray'
    >
      <Box backgroundColor='semiBlack' height='2px' width='100%' />
      <Column maxWidth={['90%', '90%', '320px']} alignSelf='center'>
        <Layout flexBasis='32px' />
        <PromoInput
          placeholder={intl.formatMessage(messages.promoCode)}
          useText={intl.formatMessage(messages.use)}
        />
      </Column>
      <Column maxWidth={['90%', '90%', '320px']} alignSelf='center'>
        <Layout flexBasis='32px' />
        <Row alignItems='flex-end'>
          <Text
            color='crumbsGray'
            fontSize='semiSmall'
            fontWeight='semiBold'
            lineHeight='normal'
            textTransform='uppercase'
          >
            {intl.formatMessage(messages.total)}
          </Text>
          <Box flexGrow={1} height='1px' borderBottom='dashed' />
          <Text
            fontSize='default'
            fontWeight='semiBold'
            lineHeight='normal'
            textTransform='uppercase'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            {intl.formatNumber(cartState.totalOldPrice || cartState.totalPrice)}
            <Space />
            <Ruble />
          </Text>
        </Row>
        <Condition match={cartState && cartState.promocodeData && cartState.promocodeData.coupon}>
          <Layout flexBasis='24px' />
          <Row alignItems='flex-end'>
            <Text
              color='crumbsGray'
              fontSize='semiSmall'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.discount)}
            </Text>
            <Box flexGrow={1} height='1px' borderBottom='dashed' />
            <Text
              fontSize='default'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {intl.formatNumber(cartState.totalOldPrice - cartState.totalPrice)}
              <Space />
              <Ruble />
            </Text>
          </Row>
        </Condition>
        <Layout flexBasis='24px' />
        <Box flexDirection='row' width='100%' alignItems='flex-end'>
          <Box>
            <Text
              color='crumbsGray'
              fontSize='semiSmall'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.delivery)}
            </Text>
          </Box>
          <Box display='flex' flexGrow={1} height='1px' borderBottom='dashed' />
          <Box maxWidth='240px'>
            <Text
              fontSize='default'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {intl.formatNumber(deliveryPrice)}
              <Space />
              <Ruble />
            </Text>
          </Box>
        </Box>
        <Layout flexBasis='32px' />
      </Column>
      <Box flexGrow={1} height='1px' borderBottom='dashed' />
      <Column maxWidth={['90%', '90%', '320px']} alignSelf='center'>
        <Layout flexBasis='32px' />
        <Row alignItems='flex-end'>
          <Text
            color='semiBlock'
            fontSize='semiSmall'
            fontWeight='semiBold'
            lineHeight='normal'
            textTransform='uppercase'
          >
            {intl.formatMessage(messages.all)}
          </Text>
          <Box flexGrow={1} height='1px' borderBottom='dashed' />
          <Box maxWidth='175px'>
            <Text
              fontSize='average'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {intl.formatNumber(cartState.totalPrice + deliveryPrice)}
              <Space />
              <Ruble />
            </Text>
          </Box>
        </Row>
        <Layout flexBasis='32px' />
      </Column>
    </Box>
  )
}

export default CheckoutPriceBlock
