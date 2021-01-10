import React, { FC, useState }               from 'react'
import { Layout, Row }                       from '@atlantis-lab/layout'
import { useApolloClient }                   from '@apollo/react-hooks'
import { useIntl }                           from 'react-intl'

import { BlueButton, Button }                from '@ui/button'
import { Condition }                         from '@ui/condition'
import { CartIcon }                          from '@ui/icons'
import { Text }                              from '@ui/text'
import { useBasketDispatch, useBasketState } from '@store/stores'
import { useCityState, useNotifyDispatch }   from '@store/stores'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { addToCart, usePutInCart }           from './useData'

const AddToCartButton: FC<any> = ({ id, quantity, height, width }) => {
  const intl = useIntl()
  const client = useApolloClient()
  const { state: cityState } = useCityState()
  const { dispatch: cartDispatch } = useBasketDispatch()
  const { state: cartState } = useBasketState()
  const { dispatch: notifyDispatch } = useNotifyDispatch()
  const [loading, setLoading] = useState(false)
  const [checkMark, setCheckMark] = useState(false)

  const onAddToCart = async () => {
    setLoading(true)
    const xBasketId = cookieStorage.getItem('xBasketId')
    const token = cookieStorage.getItem('token') || ''
    const itemInBasket = cartState && cartState.items.find(item => item.offerId === id)

    try {
      if (!itemInBasket) {
        const data = await addToCart(client, cityState.city.code, 1, id, xBasketId, token)
        cartDispatch({ type: 'add', payload: data })
        const notifyObject = data.items.find(cartObject => cartObject.offerId === id)
        if (notifyObject && notifyObject.amount > 1) {
          notifyObject.notifyQuantity = notifyObject.amount
        }
        notifyDispatch({ type: 'add', payload: notifyObject })
        if (!xBasketId) {
          cookieStorage.setItem('xBasketId', data.basketId)
        }
      } else {
        const data = await usePutInCart(
          client,
          cityState.city.code,
          itemInBasket.amount + 1,
          id,
          xBasketId,
          token
        )
        cartDispatch({ type: 'add', payload: data })
        const notifyObject = data.items.find(cartObject => cartObject.offerId === id)
        notifyDispatch({ type: 'add', payload: notifyObject })
        if (!xBasketId) {
          cookieStorage.setItem('xBasketId', data.basketId)
        }
      }
      setLoading(false)
      setCheckMark(true)
      setTimeout(() => {
        setCheckMark(false)
      }, 3000)
    } catch {
      setLoading(false)
    }
  }

  const itemInBasket = cartState && cartState.items.find(item => item.offerId === id)
  const isButtonAvailable = itemInBasket
    ? itemInBasket.quantity - itemInBasket.amount > 0 && quantity - itemInBasket.amount > 0
    : quantity > 0

  return (
    <>
      <Condition match={isButtonAvailable || checkMark}>
        <BlueButton
          width={width}
          height={height}
          justifyContent='center'
          alignItems='center'
          borderRadius='0'
          onClick={!checkMark ? onAddToCart : () => {}}
          loading={loading}
          checkMark={checkMark}
        >
          <Row alignItems='center' justifyContent='center'>
            <CartIcon color='white' />
            <Layout flexBasis='8px' />
            <Layout display={['flex', 'none', 'flex']}>
              <Text color='white' fontSize='semiMedium' lineHeight='small' fontWeight='semiBold'>
                {intl.formatMessage(messages.addToCart)}
              </Text>
            </Layout>
            <Layout display={['none', 'flex', 'none']}>
              <Text color='white' fontSize='semiMedium' lineHeight='small' fontWeight='semiBold'>
                {intl.formatMessage(messages.add)}
              </Text>
            </Layout>
          </Row>
        </BlueButton>
      </Condition>
      <Condition match={!isButtonAvailable && !checkMark}>
        <Button
          width={width}
          height={height}
          backgroundColor='semiGray'
          justifyContent='center'
          alignItems='center'
        >
          <Text
            color='placeholderGray'
            fontSize='semiMedium'
            lineHeight='small'
            fontWeight='semiBold'
            whiteSpace='nowrap'
          >
            {intl.formatMessage(messages.outOfOrder)}
          </Text>
        </Button>
      </Condition>
    </>
  )
}

export default AddToCartButton
