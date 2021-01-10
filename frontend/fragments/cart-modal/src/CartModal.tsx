import React, { FC }           from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'

import { Modal }               from '@atlantis-lab/modal'
import { CartList }            from '@fragments/cart-list'
import { CartPriceBlock }      from '@fragments/cart-price-block'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  isMobile?: boolean
  opened?: boolean
  intl?: any
}

const CartModal: FC<Props> = ({ onClose, opened }) => {
  return (
    <Modal
      visible={opened}
      onClose={onClose}
      alignItems={['flex-start', 'flex-start', 'center']}
      justifyContent='center'
    >
      <Box
        position='relative'
        width='100%'
        minHeight='100%'
        backgroundColor='white'
        maxWidth='100%'
      >
        <Column>
          <Column flexGrow={1} width='93.3%' alignSelf='center'>
            <Layout flexShrink={0} flexBasis={['19px', '32px', '32px']} />
            <CartList onClose={onClose} />
            <Layout flexShrink={0} flexBasis={['19px', '24px', '24px']} />
          </Column>
          <CartPriceBlock />
        </Column>
      </Box>
    </Modal>
  )
}

export default CartModal
