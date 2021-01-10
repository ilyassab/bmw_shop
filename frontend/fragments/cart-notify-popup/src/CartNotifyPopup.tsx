import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout, Row }               from '@atlantis-lab/layout'
import { useIntl }                                from 'react-intl'

import { CartPopupItem }                          from '@fragments/cart-popup-item'
import { CheckMarkIcon, TriangleIcon }            from '@ui/icons'
import { NoScrollbar }                            from '@ui/no-scrollbar'
import { Space, Text }                            from '@ui/text'
import { Transition }                             from '@ui/transition'
import { useNotifyDispatch, useNotifyState }      from '@store/stores'

import messages                                   from './messages'

interface Props {
  opened?: boolean
}

const CartNotifyPopup: FC<Props> = () => {
  const intl = useIntl()
  const rowColumn = useRef(null)
  const [opened, setOpened] = useState(false)
  const [cart, setCart] = useState([])
  const [timeoutPointer, setTimeoutPointer] = useState(null)
  const [cartTimeoutPointer, setCartTimeoutPointer] = useState(null)
  const [openedHeight, setOpenedHeight] = useState(0)
  const { state: notifyState } = useNotifyState()
  const { dispatch: notifyDispatch } = useNotifyDispatch()

  useEffect(() => {
    if (notifyState.items && notifyState.items.length > 0) {
      setOpenedHeight(notifyState.items.length * 84 + 24 + 56)
      setCart(notifyState.items)
      setOpened(notifyState.items && notifyState.items.length > 0)
    } else {
      setOpenedHeight(notifyState.items.length * 84 + 24 + 56)
      setOpened(notifyState.items && notifyState.items.length > 0)
      setCartTimeoutPointer(
        setTimeout(() => {
          setCart([])
        }, 600)
      )
    }
  }, [notifyState])

  useEffect(() => {
    clearTimeout(timeoutPointer)
    clearTimeout(cartTimeoutPointer)
    if (notifyState.items && notifyState.items.length > 0) {
      setTimeoutPointer(
        setTimeout(() => {
          notifyDispatch({ type: 'deleteItems' })
        }, 3000)
      )
    }
  }, [notifyState])

  return (
    <Box
      position='absolute'
      boxShadow='gray'
      top={72}
      right={-43}
      zIndex={8}
      onMouseEnter={() => clearTimeout(timeoutPointer)}
      onMouseLeave={() => notifyDispatch({ type: 'deleteItems' })}
    >
      <Transition
        position='absolute'
        top={-12}
        right={58}
        overflow='hidden'
        transition={opened ? 'height 0.1s, fill 0.8s' : 'height 0.1s 0.6s, fill 0.8s'}
        height={opened ? '12px' : '0'}
      >
        <TriangleIcon
          color={opened ? 'rgba(232, 238, 250, 1)' : 'white'}
          height='12px'
          width='32px'
        />
      </Transition>
      <Transition
        flexDirection='column'
        position='relative'
        backgroundColor='white'
        transition={opened ? '0.6s 0.1s' : '0.6s'}
        height={opened ? openedHeight : '0px'}
        overflow='hidden'
        maxHeight='344px'
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
        <Box backgroundColor='slightlyBlue' width='100%' alignItems='center' flexDirection='column'>
          <Layout flexShrink={0} minHeight='16px' />
          <Row maxWidth='90%' alignItems='center'>
            <CheckMarkIcon color='rgba(24, 84, 205, 1)' width='16px' height='12px' />
            <Space count={2} />
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='blue'>
              {intl.formatMessage(messages.inCart)}
            </Text>
          </Row>
          <Layout flexShrink={0} minHeight='16px' />
        </Box>
        <NoScrollbar
          position='relative'
          flexDirection='column'
          overflowY='auto'
          width='408px'
          maxHeight='294px'
        >
          <Layout flexShrink={0} flexBasis='24px' />
          {cart.map(item => (
            <Column ref={rowColumn} key={item.offerId}>
              <CartPopupItem notify item={item} />
            </Column>
          ))}
        </NoScrollbar>
      </Transition>
    </Box>
  )
}

export default CartNotifyPopup
