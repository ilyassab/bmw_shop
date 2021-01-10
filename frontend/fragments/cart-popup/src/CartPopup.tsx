import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout, Row }               from '@atlantis-lab/layout'
import { useApolloClient }                        from '@apollo/react-hooks'
import { useIntl }                                from 'react-intl'

import { CartPopupItem }                          from '@fragments/cart-popup-item'
import { BlueButton }                             from '@ui/button'
import { Condition }                              from '@ui/condition'
import { BigCartIcon, TriangleIcon }              from '@ui/icons'
import { NextLink }                               from '@ui/link'
import { NoScrollbar }                            from '@ui/no-scrollbar'
import { Ruble, Space, Text }                     from '@ui/text'
import { Transition }                             from '@ui/transition'
import { useBasketDispatch, useBasketState }      from '@store/stores'
import { cookieStorage }                          from '@utils/cookie-storage'

import messages                                   from './messages'
import { useData, useDeleteInCart }               from './useData'

interface Props {
  opened?: boolean
}

const CartPopup: FC<Props> = ({ opened }) => {
  const intl = useIntl()
  const rowColumn = useRef(null)
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const [openedHeight, setOpenedHeight] = useState(200)
  const client = useApolloClient()
  const { dispatch: basketDispatch } = useBasketDispatch()
  const { state: basketState } = useBasketState()

  const deleteInCart = item => {
    const token = cookieStorage.getItem('token') || ''
    const xBasketId = cookieStorage.getItem('xBasketId')
    const fetchData = async () => {
      const data = await useDeleteInCart(client, item.offerId, xBasketId, token)
      setCart(data)
      basketDispatch({ type: 'add', payload: data })
    }
    fetchData()
  }

  useEffect(() => {
    const xBasketId = cookieStorage.getItem('xBasketId')
    if (xBasketId) {
      const token = cookieStorage.getItem('token') || ''
      const fetchData = async () => {
        const data = await useData(client, xBasketId, token)
        setCart(data)
        basketDispatch({ type: 'add', payload: data })
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (cart.items && cart.items.length > 0) {
      setOpenedHeight(cart.items.length * 84 + 24 + 92)
    }
  }, [cart])

  useEffect(() => {
    setCart(basketState)
  }, [basketState])

  return (
    <Box position='absolute' boxShadow='gray' top={72} right={-43} zIndex={10}>
      <Condition match={cart.items.length <= 0}>
        <Transition
          position='relative'
          flexDirection='column'
          backgroundColor='white'
          transition={opened ? '0.6s 0.1s' : '0.6s'}
          width='408px'
          boxShadow='gray'
          height={opened ? '200px' : '0px'}
        >
          <Transition
            position='absolute'
            top={-12}
            right={58}
            overflow='hidden'
            transition={opened ? '0.1s' : '0.1s 0.6s'}
            height={opened ? '12px' : '0'}
          >
            <TriangleIcon height='12px' width='32px' />
          </Transition>
          <Box
            height='100%'
            width='100%'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            overflow='hidden'
          >
            <BigCartIcon width='45px' height='45px' />
            <Layout flexBasis='18px' />
            <Text color='listGray' lineHeight='extra' fontSize='semiMedium'>
              {intl.formatMessage(messages.empty)}
            </Text>
          </Box>
        </Transition>
      </Condition>
      <Condition match={cart.items.length > 0}>
        <Transition
          flexDirection='column'
          position='relative'
          backgroundColor='white'
          transition={opened ? '0.6s 0.1s' : '0.6s'}
          maxHeight={opened ? openedHeight : '0px'}
        >
          <Transition
            position='absolute'
            top={-12}
            right={58}
            overflow='hidden'
            transition={opened ? '0.1s' : '0.1s 0.6s'}
            height={opened ? '12px' : '0'}
          >
            <TriangleIcon height='12px' width='32px' />
          </Transition>
          <NoScrollbar
            position='relative'
            flexDirection='column'
            maxHeight='288px'
            overflowY='auto'
            width='408px'
          >
            <Transition
              position='absolute'
              boxSizing='border-box'
              opacity={opened ? 0 : 1}
              zIndex={1}
              transition='0.8s'
              visibility={opened ? 'hidden' : 'initial'}
              backgroundColor='white'
              width='100%'
              height={openedHeight - 92}
            />
            <Layout flexShrink={0} flexBasis='24px' />
            {cart.items.map(item => (
              <Column ref={rowColumn} key={item.offerId}>
                <CartPopupItem deleteInCart={deleteInCart} item={item} />
              </Column>
            ))}
          </NoScrollbar>
          <Transition
            position='relative'
            backgroundColor='white'
            flexDirection='column'
            width='408px'
            alignItems='center'
            boxShadow='cartNotifyShadow'
            boxSizing='border-box'
            overflow='hidden'
          >
            <Transition
              position='absolute'
              boxSizing='border-box'
              opacity={opened ? 0 : 1}
              transition={opened ? '0.8s 0.1s' : '0.6s'}
              visibility={opened ? 'hidden' : 'initial'}
              backgroundColor='white'
              width='100%'
              height='100%'
            />
            <Layout flexShrink={0} flexBasis='24px' />
            <Row>
              <Layout flexShrink={0} flexBasis='24px' />
              <Column width='auto'>
                <Text fontSize='default' fontWeight='semiBold' textTransform='uppercase'>
                  {intl.formatNumber(cart.totalPrice)}
                  <Space />
                  <Ruble />
                </Text>
                <Layout flexBasis='4px' />
                <Text
                  color='crumbsGray'
                  fontSize='semiSmall'
                  fontWeight='semiBold'
                  textTransform='uppercase'
                >
                  {intl.formatMessage(messages.allOrder)}
                </Text>
              </Column>
              <Layout flexGrow={1} />
              <NextLink href='/checkout'>
                <BlueButton height='44px' width='166px'>
                  <Text
                    fontWeight='semiBold'
                    fontSize='semiMedium'
                    whiteSpace='nowrap'
                    color='white'
                  >
                    {intl.formatMessage(messages.order)}
                  </Text>
                </BlueButton>
              </NextLink>
              <Layout flexShrink={0} flexBasis='24px' />
            </Row>
            <Layout flexShrink={0} flexBasis='24px' />
          </Transition>
        </Transition>
      </Condition>
    </Box>
  )
}

export default CartPopup
