import React, { FC, Fragment } from 'react'
import { Column, Row }         from '@atlantis-lab/layout'
import { useIntl }             from 'react-intl'

import { ProductSizeItem }     from '@fragments/product-size-item'
import { Button }              from '@ui/button'
import { Condition }           from '@ui/condition'
import { Text }                from '@ui/text'
import { useBasketState }      from '@store/stores'

import messages                from './messages'

interface Props {
  offers?: Array<{
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
  }>
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
}

export const ProductSizePicker: FC<Props> = ({ offers, currentOffer, setOffer }) => {
  if (offers && offers[0] && offers[0].parameters && offers[0].parameters.length < 1) {
    return null
  }

  const intl = useIntl()
  const { state: cartState } = useBasketState()

  const availableOffers = offers
    .map(item => {
      const cartItem = cartState.items.find(
        cartOrder => cartOrder.offerId === (item.id && item.id[0])
      )
      if (cartItem) {
        if (item.quantity - cartItem.amount > 0 && cartItem.quantity - cartItem.amount > 0) {
          return {
            ...item,
            isInCart: true,
            amount: cartItem.amount,
          }
        }
      } else if (item.quantity > 0) {
        return {
          ...item,
          isInCart: false,
          amount: 0,
        }
      }
      return null
    })
    .filter(offerObject => offerObject !== null)

  return (
    <Column>
      <Row justifyContent='center'>
        {availableOffers.map((item, index) => (
          <Fragment key={item.vendorCode || (item.id && item.id[0])}>
            <ProductSizeItem
              item={item}
              setOffer={setOffer}
              currentOffer={currentOffer}
              index={index}
              lastIndex={offers.length}
            />
          </Fragment>
        ))}
        <Condition match={availableOffers.length <= 0}>
          <Button
            width='256px'
            height='44px'
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
      </Row>
    </Column>
  )
}
