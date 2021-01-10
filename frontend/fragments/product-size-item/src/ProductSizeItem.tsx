import React, { FC, useEffect, useRef, useState }             from 'react'
import { Layout }                                             from '@atlantis-lab/layout'
import { useApolloClient }                                    from '@apollo/react-hooks'

import { ButtonLoader }                                       from '@ui/button-loader'
import { Condition }                                          from '@ui/condition'
import { CartIcon, CheckMarkIcon }                            from '@ui/icons'
import { Text }                                               from '@ui/text'
import { Transition }                                         from '@ui/transition'
import { useBasketDispatch, useCityState, useNotifyDispatch } from '@store/stores'
import { cookieStorage }                                      from '@utils/cookie-storage'

import { addToCart, usePutInCart }                            from './useData'

interface Props {
  item?: {
    vendorCode?: string
    id?: number[]
    isDiscount?: boolean
    isInCart?: boolean
    oldPrice?: number
    amount?: number
    parameters?: Array<{
      code?: string
      name?: string
      value?: string
    }>
    price?: number
    quantity?: number
  }
  currentOffer?: {
    vendorCode?: string
    id?: number[]
    isDiscount?: boolean
    oldPrice?: number
    parameters?: Array<{
      code?: string
      name?: string
      value?: string
    }>
    price?: number
    quantity?: number
  }
  setOffer?: (arg0?: any) => void
  index?: number
  lastIndex?: number
}

export const ProductSizeItem: FC<Props> = ({ item, setOffer, currentOffer, index, lastIndex }) => {
  const [hover, setHover] = useState(false)
  const [width, setWidth] = useState('auto')
  const [loading, setLoading] = useState(false)
  const [checkMark, setCheckMark] = useState(false)
  const itemRef = useRef(null)

  const { state: cityState } = useCityState()
  const { dispatch: basketDispatch } = useBasketDispatch()
  const { dispatch: notifyDispatch } = useNotifyDispatch()

  useEffect(() => {
    setWidth(itemRef.current && itemRef.current.offsetWidth + 2)
  }, [itemRef.current])

  const onSetOffer = offer => {
    if (offer.quantity > 0) {
      setOffer(offer)
    }
  }

  const client = useApolloClient()

  const onAddToCart = async id => {
    setLoading(true)
    const xBasketId = cookieStorage.getItem('xBasketId')
    const token = cookieStorage.getItem('token') || ''
    try {
      if (!item.isInCart) {
        const data = await addToCart(client, cityState.city.code, 1, id, xBasketId, token)
        if (!xBasketId) {
          cookieStorage.setItem('xBasketId', data.basketId)
        }
        basketDispatch({ type: 'add', payload: data })
        const notifyObject = data.items.find(cartObject => cartObject.offerId === id)
        notifyDispatch({ type: 'add', payload: notifyObject })
      } else {
        const data = await usePutInCart(
          client,
          cityState.city.code,
          item.amount + 1,
          id,
          xBasketId,
          token
        )
        if (!xBasketId) {
          cookieStorage.setItem('xBasketId', data.basketId)
        }
        basketDispatch({ type: 'add', payload: data })
        const notifyObject = data.items.find(cartObject => cartObject.offerId === id)
        notifyDispatch({ type: 'add', payload: notifyObject })
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
  /* eslint-disable */
  return (
    <>
      <Condition match={item.quantity > 0}>
        <Text
          cursor='pointer'
          onClick={() => {
            onSetOffer(item)
            if ((item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0]) && !checkMark) {
              onAddToCart(item.id[0])
            }
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Transition
            width={
              loading || checkMark
                ? '32px'
                : (item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0])
                ? width + 20
                : width || 'auto'
            }
            padding='0 8px'
            ref={itemRef}
            height='32px'
            boxSizing='border-box'
            backgroundColor={
              (item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0]) ||
              hover ||
              checkMark
                ? 'blue'
                : 'white'
            }
            border={
              (item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0])
                ? 'transparent'
                : 'gray'
            }
            alignItems='center'
            justifyContent='center'
          >
            <Condition match={checkMark}>
              <CheckMarkIcon width='16px' height='12px' />
            </Condition>
            <Condition match={!loading && !checkMark}>
              <Condition
                match={(item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0])}
              >
                <CartIcon width='16px' height='16px' color='white' />
                <Layout flexShrink={0} flexBasis='6px' />
              </Condition>
              <Text
                fontSize='small'
                fontWeight='semiBold'
                color={
                  (item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0]) || hover
                    ? 'white'
                    : 'blue'
                }
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {item.parameters && item.parameters[0] && item.parameters[0].value}
              </Text>
            </Condition>
            <Condition match={loading && !checkMark}>
              <ButtonLoader />
            </Condition>
          </Transition>
        </Text>
        <Condition match={lastIndex !== index}>
          <Layout flexShrink={0} flexBasis='8px' />
        </Condition>
      </Condition>
    </>
  )
  /* eslint-enable */
}
