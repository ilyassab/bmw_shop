import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout, Row }               from '@atlantis-lab/layout'
import { useApolloClient }                        from '@apollo/react-hooks'
import { useIntl }                                from 'react-intl'

import { AddToCartButton }                        from '@fragments/add-to-cart-button'
import { FavoriteButton }                         from '@fragments/favorite-button'
import { BlueButton }                             from '@ui/button'
import { Condition }                              from '@ui/condition'
import { CityPinIcon, LongArrowRightIcon }        from '@ui/icons'
import { Input }                                  from '@ui/input'
import { Ruble, Space, Text }                     from '@ui/text'
import { cookieStorage }                          from '@utils/cookie-storage'

import messages                                   from './messages'
import { notifyMe, useUserInformation }           from './useData'

interface Props {
  offer: {
    vendorCode?: string
    id?: number[]
    isDiscount?: boolean
    oldPrice?: number
    parameters?: Array<{
      code?: string
      name?: string
      value?: string
    }>
    store?: Array<{
      address?: string
      externalId?: number
      id?: number
      location?: string
      name?: string
      phone?: string
      quantity?: number
      worktime?: string
    }>
    price?: number
    quantity?: number
  }
  store?: {
    id?: number[]
    store?: Array<{
      address?: string
      externalId?: number
      id?: number
      location?: string
      name?: string
      phone?: string
      quantity?: number
      worktime?: string
    }>
  }
  slug?: string
  productId?: number | string
  setDealerModal?: () => void
}

const AddToCart: FC<Props> = ({ offer, productId, store, setDealerModal }) => {
  const intl = useIntl()
  const client = useApolloClient()
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [successNotify, setSuccessNotify] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      if (token) {
        const data = await useUserInformation(client, token)
        if (inputRef && inputRef.current) {
          inputRef.current.value = data.email
        }
      }
    }
    fetchData()
  }, [inputRef, inputRef.current])

  const onNotify = () => {
    const fetchData = async () => {
      setLoading(true)
      const { data, errors: fetchErrors } = await notifyMe(
        client,
        offer.id[0],
        inputRef.current.value
      )
      if (data && data.success) {
        setLoading(false)
        setSuccessNotify(true)
      }
      if (fetchErrors) {
        setLoading(false)
        setErrors(fetchErrors)
      }
    }
    fetchData()
  }

  return (
    <Column>
      <Condition match={offer.quantity < 1}>
        <Condition match={successNotify}>
          <Text color='dustyGray' fontWeight='normal' fontSize='semiMedium'>
            {intl.formatMessage(messages.weNotifyYou)}
          </Text>
          <Layout flexBasis='16px' />
        </Condition>
        <Condition match={!successNotify}>
          <Text color='dustyGray' fontWeight='normal' fontSize='semiMedium'>
            {intl.formatMessage(messages.outOf)}
          </Text>
          <Layout flexBasis='16px' />
          <Column>
            <Row>
              <Input
                height='60px'
                width={['calc(100% - 60px)', 'calc(100% - 130px)', '317px']}
                backgroundColor='semiGray'
                border='none'
                color='black'
                fontSize='medium'
                padding='0 20px 0 20px'
                placeholder={intl.formatMessage(messages.yourEmail)}
                ref={inputRef}
              />
              <Layout flexBasis={['0', '12px', '12px']} />
              <BlueButton
                height='60px'
                width={['60px', '130px', '157px']}
                borderRadius='none'
                onClick={onNotify}
                loading={loading}
              >
                <Box>
                  <Layout display={['none', 'flex', 'flex']}>
                    <Text color='white' fontSize='semiMedium' fontWeight='semiBold'>
                      {intl.formatMessage(messages.notify)}
                    </Text>
                  </Layout>
                  <Layout display={['flex', 'none', 'none']}>
                    <LongArrowRightIcon width='20px' height='16px' />
                  </Layout>
                </Box>
              </BlueButton>
            </Row>
            <Layout flexBasis='5px' />
            <Condition match={!errors}>
              <Box height='15px' />
            </Condition>
            <Condition match={errors}>
              <Text
                fontSize='small'
                fontWeight='small'
                lineHeight='normal'
                color='red'
                dangerouslySetInnerHTML={{
                  __html: typeof errors === 'string' ? errors : errors && errors.error,
                }}
              />
            </Condition>
          </Column>
        </Condition>
        <Layout flexBasis={['16px', '24px', '24px']} />
      </Condition>
      <Row alignItems='center'>
        <Text fontSize='semiLarge' fontWeight='semiBold'>
          {intl.formatNumber(offer.price)}
          <Space />
          <Ruble />
          <Space />
        </Text>
        <Condition match={offer.oldPrice}>
          <Text
            fontSize='default'
            fontWeight='small'
            textDecoration='line-through'
            color='crumbsGray'
          >
            {intl.formatNumber(offer.oldPrice)}
            <Space />
            <Ruble />
          </Text>
        </Condition>
      </Row>
      <Condition match={offer.quantity > 0}>
        <Layout flexBasis={['16px', '24px', '24px']} />
        <Row>
          <AddToCartButton
            offer={offer}
            id={offer.id[0]}
            quantity={offer.quantity}
            height='60px'
            width={['236px', '160px', '256px']}
          />
          <Layout flexBasis={['8px', '8px', '12px']} />
          <FavoriteButton productId={productId} isButton />
        </Row>
        <Layout flexBasis={['16px', '24px', '24px']} />
        <Condition match={!!store && !!store.store && store.store.length - 1 > 0}>
          <Row onClick={setDealerModal} alignItems='center'>
            <CityPinIcon width='12px' height='15px' color='#1854CD' />
            <Text fontSize='semiMedium' lineHeight='extra' color='blue' cursor='pointer'>
              <Space />
              {intl.formatMessage(messages.inOrder)}
              <Space />
              {intl.formatNumber(store.store && store.store.length ? store.store.length - 1 : 0)}
              <Space />
              {intl.formatMessage(messages.in)}
              <Space />
            </Text>
          </Row>
        </Condition>
        <Condition match={!!store && !!store.store && store.store.length - 1 <= 0}>
          <Row alignItems='center'>
            <Text fontSize='semiMedium' lineHeight='extra' color='blue' cursor='pointer'>
              {intl.formatMessage(messages.outOfDc)}
            </Text>
          </Row>
        </Condition>
        <Condition match={!store || !store.store}>
          <Layout flexBasis='21px' />
        </Condition>
      </Condition>
    </Column>
  )
}

export default AddToCart
