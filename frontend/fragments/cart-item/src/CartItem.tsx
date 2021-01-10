import React, { FC }                      from 'react'
import { Box, Column, Layout, Row }       from '@atlantis-lab/layout'
import { useIntl }                        from 'react-intl'

import { Background }                     from '@ui/background'
import { Button }                         from '@ui/button'
import { Divider }                        from '@ui/divider'
import { CloseIcon, MinusIcon, PlusIcon } from '@ui/icons'
import { NextLink }                       from '@ui/link'
import { Ruble, Space, Text }             from '@ui/text'
import { Transition }                     from '@ui/transition'

const CartItem: FC<any> = ({ item, putInCart, deleteInCart }) => {
  const intl = useIntl()

  return (
    <Column>
      <Layout display={['none', 'none', 'flex']} flexBasis='32px' />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <Row>
          <Box
            height={['64px', '100px', '100px']}
            border='gray'
            alignItems='center'
            justifyContent='center'
          >
            <Background
              width={['62px', '98px', '98px']}
              height={['62px', '98px', '98px']}
              stub={!(item.images && item.images[0])}
              backgroundImage={`url(${item.images && item.images[0]})`}
            />
          </Box>
          <Layout flexBasis={['16px', '22px', '22px']} />
          <Column width={['60%', '204px', '260px']}>
            <NextLink
              href={`/catalog/${item.iblock}/${item.category}/${item.slug}`}
              color='semiBlack'
              fontWeight='small'
              fontSize={['semiMedium', 'default', 'default']}
              lineHeight='extra'
              dangerouslySetInnerHTML={{ __html: item.name }}
            />
            <Layout flexBasis='12px' />
            <Text
              fontWeight='small'
              fontSize='semiMedium'
              color='dustyGray'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {item.description}
            </Text>
          </Column>
        </Row>
        <Layout flexGrow={1} display={['none', 'flex', 'flex']} flexBasis='24px' />
        <Row width='auto' display={['none', 'flex', 'flex']}>
          <Transition
            onClick={() => putInCart(item, false)}
            backgroundColor='white'
            boxSizing='border-box'
            justifyContent='center'
            alignItems='center'
            outline='1px solid rgba(244, 244, 244, 1)'
            cursor='pointer'
            width='40px'
            height='40px'
          >
            <MinusIcon color='rgba(38, 38, 38, 1)' />
          </Transition>
          <Transition
            backgroundColor='white'
            boxSizing='border-box'
            justifyContent='center'
            alignItems='center'
            outline='1px solid rgba(244, 244, 244, 1)'
            width='40px'
            height='40px'
          >
            <Text
              fontWeight='semiBold'
              fontSize='default'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {item.amount}
            </Text>
          </Transition>
          <Transition
            onClick={() => putInCart(item, true)}
            backgroundColor='white'
            boxSizing='border-box'
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
            outline='1px solid rgba(244, 244, 244, 1)'
            width='40px'
            height='40px'
          >
            <PlusIcon width='12px' height='12px' />
          </Transition>
        </Row>
        <Layout
          flexGrow={1}
          display={['none', 'flex', 'flex']}
          flexBasis={['30px', '30px', '86px']}
        />
        <Box display={['none', 'flex', 'flex']} maxWidth={['80px', '80px', '116px']} width='100%'>
          <Text
            fontWeight='semiBold'
            fontSize='default'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            {intl.formatNumber(item.price)}
            <Space />
            <Ruble />
          </Text>
        </Box>
        <Layout flexBasis={['15px', '24px', '24px']} />
        <Row width='auto' display={['flex', 'none', 'none']}>
          <Layout flexBasis='80px' />
          <Transition
            onClick={() => putInCart(item, false)}
            backgroundColor='white'
            boxSizing='border-box'
            justifyContent='center'
            alignItems='center'
            outline='1px solid rgba(244, 244, 244, 1)'
            cursor='pointer'
            width={['32px', '40px', '40px']}
            height={['32px', '40px', '40px']}
          >
            <MinusIcon width='12px' height='2px' color='rgba(38, 38, 38, 1)' />
          </Transition>
          <Transition
            backgroundColor='white'
            boxSizing='border-box'
            justifyContent='center'
            alignItems='center'
            outline='1px solid rgba(244, 244, 244, 1)'
            width={['32px', '40px', '40px']}
            height={['32px', '40px', '40px']}
          >
            <Text
              fontWeight='semiBold'
              fontSize={['semiMedium', 'default', 'default']}
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {item.amount}
            </Text>
          </Transition>
          <Transition
            onClick={() => putInCart(item, true)}
            backgroundColor='white'
            boxSizing='border-box'
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
            outline='1px solid rgba(244, 244, 244, 1)'
            width={['32px', '40px', '40px']}
            height={['32px', '40px', '40px']}
          >
            <PlusIcon width='12px' height='12px' />
          </Transition>
          <Layout
            flexGrow={1}
            display={['flex', 'none', 'none']}
            flexBasis={['30px', '49px', '86px']}
          />
          <Box display={['flex', 'none', 'none']} maxWidth={['30%', '80px', '116px']}>
            <Text
              fontWeight='semiBold'
              fontSize='default'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {intl.formatNumber(item.price)}
              <Space />
              <Ruble />
            </Text>
          </Box>
        </Row>
        <Box display={['none', 'flex', 'flex']}>
          <Button
            onClick={() => deleteInCart(item)}
            height='40px'
            width='40px'
            backgroundColor='inputGray'
          >
            <CloseIcon color='rgba(118, 118, 118, 1)' />
          </Button>
        </Box>
      </Box>
      <Layout flexBasis={['40px', '40px', '32px']} />
      <Layout display={['none', 'none', 'flex']}>
        <Divider color='whiteGray' />
      </Layout>
    </Column>
  )
}

export default CartItem
