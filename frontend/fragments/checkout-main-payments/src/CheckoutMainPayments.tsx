import React, { FC, useEffect, useState }        from 'react'
import { Box, Column, Layout, Row }              from '@atlantis-lab/layout'
import { useApolloClient }                       from '@apollo/react-hooks'
import { useIntl }                               from 'react-intl'

import { CheckoutButton }                        from '@ui/button'
import { Text }                                  from '@ui/text'
import { useCheckoutDispatch, useCheckoutState } from '@store/stores'

import messages                                  from './messages'
import { useData }                               from './useData'

interface Props {
  state?: any
  setState?: (arg0?: any) => void
}

const CheckoutMainPayments: FC<Props> = ({ state, setState }) => {
  const client = useApolloClient()
  const [paymentsState, setPaymentsState] = useState('')
  const [online, setOnline] = useState({ id: null })
  const [offline, setOffline] = useState({ id: null })
  const [cash, setCash] = useState({ id: null })
  const { state: checkoutState } = useCheckoutState()
  const { dispatch: checkoutDispatch } = useCheckoutDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client, checkoutState.deliveryId)
      const onlineObj = data.find(item => item.id === 2)
      const offlineObj = data.find(item => item.id === 6)
      const cashObj = data.find(item => item.id === 3)
      setOnline(onlineObj)
      setOffline(offlineObj)
      setCash(cashObj)
      /* eslint-disable no-nested-ternary */
      setPaymentsState(
        onlineObj && onlineObj.id
          ? 'isOnline'
          : offlineObj && offlineObj.id
          ? 'isOffline'
          : cashObj && cashObj.id
          ? 'isCash'
          : ''
      )
    }
    if (checkoutState.deliveryId) {
      fetchData()
    }
  }, [checkoutState && checkoutState.deliveryId])

  useEffect(() => {
    if (paymentsState) {
      /* eslint-disable no-nested-ternary */
      checkoutDispatch({
        type: 'addPaymentId',
        payload:
          paymentsState === 'isOnline'
            ? online.id
            : paymentsState === 'isOffline'
            ? offline.id
            : cash.id,
      })
    }
  }, [paymentsState])

  const isOnlineAvailable = online && online.id
  const isOfflineAvailable = offline && offline.id
  const isCashAvailable = cash && cash.id
  const intl = useIntl()

  return (
    <Column>
      <Text
        fontWeight='tiny'
        fontSize={['default', 'semiLarge', 'semiLarge']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.typeOfPayment)}
      </Text>
      <Layout flexBasis='24px' />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <CheckoutButton
          height='48px'
          width='100%'
          active={paymentsState === 'isOnline'}
          onClick={() => {
            if (isOnlineAvailable) {
              setPaymentsState('isOnline')
            }
          }}
        >
          <Text
            fontWeight='semiBold'
            color={
              !isOnlineAvailable
                ? 'dustyGray'
                : paymentsState === 'isOnline'
                ? 'white'
                : 'dustyBlack'
            }
            fontSize='semiMedium'
          >
            {intl.formatMessage(messages.cardOnline)}
          </Text>
        </CheckoutButton>
        <CheckoutButton
          height='48px'
          width='100%'
          active={paymentsState === 'isOffline'}
          onClick={() => {
            if (isOfflineAvailable) {
              setPaymentsState('isOffline')
            }
          }}
        >
          <Text
            fontWeight='semiBold'
            color={
              !isOfflineAvailable
                ? 'dustyGray'
                : paymentsState === 'isOffline'
                ? 'white'
                : 'dustyBlack'
            }
            fontSize='semiMedium'
          >
            {intl.formatMessage(messages.cardOffline)}
          </Text>
        </CheckoutButton>
        <CheckoutButton
          height='48px'
          width='100%'
          onClick={() => {
            if (isCashAvailable) {
              setPaymentsState('isCash')
            }
          }}
          active={paymentsState === 'isCash'}
        >
          <Row justifyContent='center'>
            <Box display={['none', 'none', 'flex']}>
              <Text
                fontWeight='semiBold'
                color={
                  !isCashAvailable
                    ? 'dustyGray'
                    : paymentsState === 'isCash'
                    ? 'white'
                    : 'dustyBlack'
                }
                fontSize='semiMedium'
              >
                {intl.formatMessage(messages.cash)}
              </Text>
            </Box>
            <Box display={['flex', 'flex', 'none']}>
              <Text
                fontWeight='semiBold'
                color={
                  !isCashAvailable
                    ? 'dustyGray'
                    : paymentsState === 'isCash'
                    ? 'white'
                    : 'dustyBlack'
                }
                fontSize='semiMedium'
              >
                {intl.formatMessage(messages.cashTablet)}
              </Text>
            </Box>
          </Row>
        </CheckoutButton>
      </Box>
    </Column>
  )
}

export default CheckoutMainPayments
