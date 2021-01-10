import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { useApolloClient }                   from '@apollo/react-hooks'
import { useRouter }                         from 'next/router'
import { useIntl }                           from 'react-intl'

import { CheckoutMainContacts }              from '@fragments/checkout-main-contacts'
import { CheckoutMainDelivery }              from '@fragments/checkout-main-delivery'
import { CheckoutMainPayments }              from '@fragments/checkout-main-payments'
import { BlueButton }                        from '@ui/button'
import { Condition }                         from '@ui/condition'
import { Divider }                           from '@ui/divider'
import { Checkbox }                          from '@ui/input'
import { NextLink }                          from '@ui/link'
import { Space, Text }                       from '@ui/text'
import { useCheckoutState, useCityState }    from '@store/stores'
import { useBasketDispatch, useBasketState } from '@store/stores'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData, useUserInformation }       from './useData'

const CheckoutMain: FC = () => {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    secondName: '',
    telephone: '',
    city: '',
    room: '',
    house: '',
    comment: '',
    street: '',
    salutation: 'M',
    promocode: '',
    agreementCheckbox: false,
    agreementInfoCheckbox: false,
    mapItem: {},
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const intl = useIntl()
  const { state: cityState } = useCityState()
  const { state: checkoutState } = useCheckoutState()
  const { dispatch: cartDispatch } = useBasketDispatch()
  const { state: cartState } = useBasketState()
  const client = useApolloClient()
  const router = useRouter()

  useEffect(() => {
    if (cartState && cartState.promocodeData && cartState.promocodeData.coupon) {
      setState({
        ...state,
        promocode: cartState.promocodeData.coupon,
      })
    }
  }, [cartState])

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      if (token) {
        const data = await useUserInformation(client, token)
        setState({
          ...state,
          email: data.email || '',
          firstName: data.firstName || '',
          secondName: data.secondName || '',
          telephone: data.phone || '',
          city: data.city || '',
          room: data.flat || '',
          salutation: data.salutation || 'M',
          house: data.house || '',
          street: data.street || '',
        })
      }
    }
    fetchData()
  }, [])

  const isButtonAvailableFunc = () => {
    if (!state.email || !state.firstName || !state.secondName || !state.telephone) {
      return false
    }
    if (
      (checkoutState.deliveryId === 11 || checkoutState.deliveryId === 9) &&
      !checkoutState.pickpointId
    ) {
      return false
    }
    if (
      checkoutState.deliveryId === 12 &&
      (!state.city || !state.room || !state.house || !state.street)
    ) {
      return false
    }
    if (!state.agreementCheckbox) {
      return false
    }
    return true
  }

  const isButtonAvailable = isButtonAvailableFunc()

  const onClick = async () => {
    setLoading(true)
    const {
      email,
      firstName,
      secondName,
      salutation,
      telephone,
      city,
      promocode,
      room,
      house,
      street,
      comment,
    } = state
    const token = cookieStorage.getItem('token') || ''
    const xBasketId = cookieStorage.getItem('xBasketId')

    try {
      const { data, errors: fetchErrors } = await useData({
        client,
        email,
        firstName,
        lastName: secondName,
        phone: telephone,
        deliveryId: checkoutState.deliveryId,
        pickpointId: checkoutState.pickpointId,
        paymentId: checkoutState.paymentId,
        promocode,
        xBasketId,
        comment,
        location: cityState.city.code,
        salutation,
        city,
        flat: room,
        house,
        street,
        apiKey: token,
      })

      if (data) {
        if (data.orderId) {
          cookieStorage.removeItem('xBasketId')
          cartDispatch({ type: 'resetCart' })
          if (!data.paylink) {
            router.push(`/checkout-success?orderId=${data.orderId}`).then(() => {
              if (window) {
                window.scrollTo({ top: 0 })
              }
            })
          } else {
            window.location.href = data.paylink
          }
        }
      }
      if (fetchErrors) {
        setLoading(false)
        setErrors(fetchErrors)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Column maxWidth={['100%', '100%', '792px']} order={[2, 2, 0]}>
      <CheckoutMainContacts setState={setState} state={state} />
      <Layout flexBasis={['24px', '48px', '48px']} />
      <Divider color='dividerGray' />
      <Layout flexBasis={['24px', '48px', '48px']} />
      <CheckoutMainDelivery currentMapItem={state.mapItem} setState={setState} state={state} />
      <Layout flexBasis={['24px', '48px', '48px']} />
      <Divider color='dividerGray' />
      <Layout flexBasis={['24px', '48px', '48px']} />
      <CheckoutMainPayments setState={setState} state={state} />
      <Layout flexBasis={['24px', '24px', '32px']} />
      <Checkbox
        checked={state.agreementCheckbox}
        onChange={checked => {
          setState({
            ...state,
            agreementCheckbox: checked,
          })
        }}
      >
        <Row>
          <Layout flexShrink={0} flexBasis='12px' />
          <Text
            fontWeight='normal'
            fontSize={['small', 'semiMedium', 'semiMedium']}
            lineHeight='extra'
          >
            {intl.formatMessage(messages.iAgreeWith)}
            <Space />
            <NextLink target='_blank' href='/pages/policy' display='inline' color='blue'>
              {intl.formatMessage(messages.termsOfUse)}
            </NextLink>
            <Space />
            {intl.formatMessage(messages.and)}
            <Space />
            <NextLink target='_blank' href='/pages/policy' display='inline' color='blue'>
              {intl.formatMessage(messages.termsOfUse)}
            </NextLink>
            <Space />
            {intl.formatMessage(messages.officialShop)}
          </Text>
        </Row>
      </Checkbox>
      <Layout flexBasis='20px' />
      <Checkbox
        checked={state.agreementInfoCheckbox}
        onChange={checked => {
          setState({
            ...state,
            agreementInfoCheckbox: checked,
          })
        }}
      >
        <Layout flexShrink={0} flexBasis='12px' />
        <Text
          fontWeight='normal'
          fontSize={['small', 'semiMedium', 'semiMedium']}
          lineHeight='extra'
        >
          {intl.formatMessage(messages.iGive)}
        </Text>
      </Checkbox>
      <Layout flexBasis='16px' />
      <Text
        color='motionGray'
        fontWeight='normal'
        fontSize={['semiSmall', 'semiMedium', 'semiMedium']}
        lineHeight='extra'
      >
        {intl.formatMessage(messages.including)}
      </Text>
      <Layout flexBasis='30px' />
      <BlueButton
        height='60px'
        backgroundColor={isButtonAvailable ? 'blue' : 'crumbsGray'}
        onClick={() => {
          if (isButtonAvailable) {
            onClick()
          }
        }}
        loading={loading}
      >
        <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
          {intl.formatMessage(messages.goTo)}
        </Text>
      </BlueButton>
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
  )
}

export default CheckoutMain
