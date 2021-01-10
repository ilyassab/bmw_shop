import React, { FC }                from 'react'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }                  from 'react-intl'

import { PromoInput }               from '@fragments/promo-input'
import { BlueButton }               from '@ui/button'
import { Condition }                from '@ui/condition'
import { Divider }                  from '@ui/divider'
import { NextLink }                 from '@ui/link'
import { Ruble, Space, Text }       from '@ui/text'
import { useBasketState }           from '@store/stores'

import messages                     from './messages'

const CartPriceBlock: FC = () => {
  const intl = useIntl()
  const { state: cartState } = useBasketState()

  if (cartState.items.length <= 0) {
    return null
  }

  return (
    <Box
      width='100%'
      height={['auto', 'auto', '100%']}
      maxWidth={['100%', '100%', '384px']}
      flexDirection='column'
      position='relative'
      boxShadow='motionGray'
    >
      <Box
        backgroundColor='semiBlack'
        display={['none', 'none', 'flex']}
        height='2px'
        width='100%'
      />
      <Column maxWidth={['100%', '100%', '320px']} alignSelf='center'>
        <Layout flexBasis={['0px', '0px', '32px']} />
        <PromoInput
          placeholder={intl.formatMessage(messages.promoCode)}
          useText={intl.formatMessage(messages.use)}
        />
        <Layout flexBasis={['0px', '0px', '32px']} />
      </Column>
      <Divider color='whiteGray' />
      <Column maxWidth={['90%', '100%', '320px']} alignSelf='center'>
        <Layout flexBasis={['32px', '0', '32px']} />
        <Row alignItems='flex-end' display={['flex', 'none', 'flex']}>
          <Text
            color={['semiBlack', 'crumbsGray', 'crumbsGray']}
            fontSize='semiSmall'
            fontWeight='semiBold'
            lineHeight='normal'
            textTransform='uppercase'
          >
            {intl.formatMessage(messages.total)}
          </Text>
          <Box flexGrow={1} height='1px' borderBottom='dashed' />
          <Text
            fontSize='small'
            fontWeight='semiBold'
            lineHeight='normal'
            textTransform='uppercase'
          >
            {intl.formatNumber(cartState.totalOldPrice || cartState.totalPrice)}
            <Space />
            <Ruble />
          </Text>
        </Row>
        <Condition match={cartState && cartState.promocodeData && cartState.promocodeData.coupon}>
          <Layout flexBasis={['24px', '0px', '24px']} />
          <Box
            flexDirection={['row', 'column', 'row']}
            width='100%'
            alignItems={['flex-end', 'center', 'flex-end']}
          >
            <Box order={[0, 3, 0]} display={['none', 'none', 'flex']}>
              <Text
                color={['semiBlack', 'crumbsGray', 'crumbsGray']}
                fontSize='semiSmall'
                fontWeight='semiBold'
                lineHeight='normal'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.discount)}
              </Text>
            </Box>
            <Box order={[0, 3, 0]} display={['flex', 'none', 'none']}>
              <Text
                color={['semiBlack', 'crumbsGray', 'crumbsGray']}
                fontSize='semiSmall'
                fontWeight='semiBold'
                lineHeight='normal'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.discount)}
              </Text>
            </Box>
            <Box
              display={['flex', 'none', 'flex']}
              flexGrow={1}
              height='1px'
              borderBottom='dashed'
            />
            <Box display={['none', 'none', 'none']} order={1} flexBasis='8px' />
            <Box display={['flex', 'none', 'flex']} order={[3, 0, 3]} maxWidth='240px'>
              <Text
                fontSize='default'
                fontWeight='semiBold'
                lineHeight='normal'
                textTransform='uppercase'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
              >
                {intl.formatNumber(cartState.totalOldPrice - cartState.totalPrice)}
                <Space />
                <Ruble />
              </Text>
            </Box>
          </Box>
        </Condition>
        <Layout flexBasis={['24px', '19px', '24px']} />
        <Box
          flexDirection={['row', 'column', 'row']}
          width='100%'
          alignItems={['flex-end', 'center', 'flex-end']}
        >
          <Box order={[0, 3, 0]} display={['none', 'none', 'flex']}>
            <Text
              color={['semiBlack', 'crumbsGray', 'crumbsGray']}
              fontSize='semiSmall'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.all)}
            </Text>
          </Box>
          <Box order={[0, 3, 0]} display={['flex', 'flex', 'none']}>
            <Text
              color={['semiBlack', 'crumbsGray', 'crumbsGray']}
              fontSize='semiSmall'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.allOrder)}
            </Text>
          </Box>
          <Box display={['flex', 'none', 'flex']} flexGrow={1} height='1px' borderBottom='dashed' />
          <Box display={['none', 'flex', 'none']} order={1} flexBasis='8px' />
          <Box order={[3, 0, 3]} maxWidth='240px'>
            <Text
              fontSize='default'
              fontWeight='semiBold'
              lineHeight='normal'
              textTransform='uppercase'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {intl.formatNumber(cartState.totalPrice)}
              <Space />
              <Ruble />
            </Text>
          </Box>
        </Box>
        <Layout flexBasis={['32px', '19px', '32px']} />
      </Column>
      <NextLink href='/checkout'>
        <Layout justifyContent='center' width='100%'>
          <Box
            width={['90%', '167px', '100%']}
            justifyContent='center'
            position={['initial', 'absolute', 'initial']}
            right='24px'
            bottom='16px'
          >
            <BlueButton width='100%' height={['44px', '44px', '60px']}>
              <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
                {intl.formatMessage(messages.order)}
              </Text>
            </BlueButton>
          </Box>
        </Layout>
      </NextLink>
      <Layout flexBasis={['19px', '0px', '0px']} />
    </Box>
  )
}

export default CartPriceBlock
