import React, { FC }           from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'

import { CheckoutMain }        from '@fragments/checkout-main'
import { CheckoutPriceBlock }  from '@fragments/checkout-price-block'
import { HowTo }               from '@fragments/how-to'

const Checkout: FC = () => (
  <Column flexGrow={1}>
    <Layout flexBasis={['34px', '34px', '64px']} />
    <Box
      width='100%'
      flexDirection={['column', 'column', 'row']}
      alignSelf='center'
      maxWidth={['90%', '90%', '1200px']}
    >
      <CheckoutMain />
      <Layout order={[1, 1, 0]} flexBasis='24px' />
      <CheckoutPriceBlock />
    </Box>
    <Layout flexBasis={['40px', '40px', '96px']} />
    <HowTo />
  </Column>
)

export default Checkout
