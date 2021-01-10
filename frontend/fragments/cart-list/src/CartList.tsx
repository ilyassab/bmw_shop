import React, { FC, Fragment, useEffect, useState }        from 'react'
import { Box, Column, Layout, Row }                        from '@atlantis-lab/layout'
import { useApolloClient }                                 from '@apollo/react-hooks'
import { useIntl }                                         from 'react-intl'

import { CartItem }                                        from '@fragments/cart-item'
import { BlueButton }                                      from '@ui/button'
import { Divider }                                         from '@ui/divider'
import { CloseIcon }                                       from '@ui/icons'
import { NextLink }                                        from '@ui/link'
import { Loader }                                          from '@ui/loader'
import { Text }                                            from '@ui/text'
import { useBasketDispatch, useBasketState, useCityState } from '@store/stores'
import { cookieStorage }                                   from '@utils/cookie-storage'

import messages                                            from './messages'
import { useData, useDeleteInCart, usePutInCart }          from './useData'

interface Props {
  onClose?: () => void
}

const CartList: FC<Props> = ({ onClose }) => {
  const intl = useIntl()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const client = useApolloClient()
  const { state } = useCityState()
  const { dispatch: basketDispatch } = useBasketDispatch()
  const { state: basketState } = useBasketState()

  useEffect(() => {
    if (basketState) {
      setCartItems(basketState.items)
    }
  }, [basketState])

  useEffect(() => {
    const xBasketId = cookieStorage.getItem('xBasketId')
    if (xBasketId) {
      const token = cookieStorage.getItem('token') || ''
      const fetchData = async () => {
        try {
          setLoading(true)
          const data = await useData(client, xBasketId, token)
          setCartItems(data.items)
          basketDispatch({ type: 'add', payload: data })
          setLoading(false)
        } catch {
          setLoading(false)
        }
      }
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const putInCart = (item, isAddAction) => {
    const token = cookieStorage.getItem('token') || ''
    const xBasketId = cookieStorage.getItem('xBasketId')
    const fetchData = async () => {
      if (isAddAction) {
        const data = await usePutInCart(
          client,
          item.amount + 1,
          item.offerId,
          state.city.code,
          xBasketId,
          token
        )
        setCartItems(data.items)
        basketDispatch({ type: 'add', payload: data })
      } else {
        const data = await usePutInCart(
          client,
          item.amount - 1,
          item.offerId,
          state.city.code,
          xBasketId,
          token
        )
        setCartItems(data.items)
        basketDispatch({ type: 'add', payload: data })
      }
    }
    fetchData()
  }

  const deleteInCart = item => {
    const token = cookieStorage.getItem('token') || ''
    const xBasketId = cookieStorage.getItem('xBasketId')
    const fetchData = async () => {
      const data = await useDeleteInCart(client, item.offerId, xBasketId, token)
      setCartItems(data.items)
      basketDispatch({ type: 'add', payload: data })
    }
    fetchData()
  }

  if (loading) {
    return (
      <Layout width='100%' justifyContent='center'>
        <Box height='32px'>
          <Loader />
        </Box>
      </Layout>
    )
  }

  if (cartItems.length <= 0 && !loading) {
    return (
      <Column alignItems='center' justifyContent='center'>
        <Layout flexBasis='70px' />
        <Text fontWeight='semiBold' fontSize='xmedium'>
          {intl.formatMessage(messages.empty)}
        </Text>
        <Layout flexBasis='32px' />
        <NextLink href='/catalog/lifestyle'>
          <BlueButton width='256px' height='60px'>
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.goToCatalog)}
            </Text>
          </BlueButton>
        </NextLink>
        <Layout flexBasis='160px' />
      </Column>
    )
  }

  return (
    <Column width='100%' maxWidth={['100%', '100%', '792px']}>
      <Row alignItems='center'>
        <Text
          color='semiBlack'
          fontSize={['default', 'large', 'semiLarge']}
          fontWeight='tiny'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.yourCart)}
        </Text>
        <Layout flexGrow={1} display={['flex', 'flex', 'none']} />
        <Box display={['flex', 'none', 'none']} onClick={onClose}>
          <CloseIcon width='16px' height='16px' />
        </Box>
        <Box display={['none', 'flex', 'none']} onClick={onClose}>
          <CloseIcon width='18px' height='18px' />
        </Box>
      </Row>
      <Layout flexBasis='32px' />
      <Row display={['none', 'none', 'flex']}>
        <Text
          color='crumbsGray'
          fontSize='semiSmall'
          fontWeight='semiBold'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.item)}
        </Text>
        <Layout flexBasis='372px' />
        <Text
          color='crumbsGray'
          fontSize='semiSmall'
          fontWeight='semiBold'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.amount)}
        </Text>
        <Layout flexBasis='133px' />
        <Text
          color='crumbsGray'
          fontSize='semiSmall'
          fontWeight='semiBold'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.price)}
        </Text>
      </Row>
      <Column display={['none', 'none', 'flex']}>
        <Layout flexShrink={0} flexBasis='15px' />
        <Divider color='whiteGray' />
      </Column>
      {cartItems.map(cartItem => (
        <Fragment key={`${cartItem.slug}${cartItem.description}`}>
          <CartItem item={cartItem} putInCart={putInCart} deleteInCart={deleteInCart} />
        </Fragment>
      ))}
      <Layout display={['none', 'none', 'flex']} flexBasis={['24px', '24px', '48px']} />
    </Column>
  )
}

export default CartList
