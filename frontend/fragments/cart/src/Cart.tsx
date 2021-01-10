import React, { FC }           from 'react'
import { Column, Layout, Row } from '@atlantis-lab/layout'

import { CartList }            from '@fragments/cart-list'
import { CartPriceBlock }      from '@fragments/cart-price-block'
import { HowTo }               from '@fragments/how-to'

const Cart: FC = () => (
  <Column flexGrow={1}>
    <Layout flexBasis={['34px', '34px', '64px']} />
    <Row alignSelf='center' maxWidth={['90%', '90%', '1200px']}>
      <CartList />
      <Layout flexBasis='24px' />
      <CartPriceBlock />
    </Row>
    <Layout flexBasis={['40px', '40px', '96px']} />
    <HowTo />
  </Column>
)

export default Cart
