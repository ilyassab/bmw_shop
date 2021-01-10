import React, { FC }                from 'react'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }                  from 'react-intl'

import { Background }               from '@ui/background'
import { Condition }                from '@ui/condition'
import { CloseIcon }                from '@ui/icons'
import { IconsManager }             from '@ui/icons-manager'
import { NextLink }                 from '@ui/link'
import { Ruble, Space, Text }       from '@ui/text'

const CartPopupItem: FC<any> = ({ item, notify, deleteInCart }) => {
  const intl = useIntl()

  return (
    <Column>
      <Row>
        <Layout flexShrink={0} flexBasis='24px' />
        <Box height='60px' border='gray' alignItems='center' justifyContet='center'>
          <Background
            width='58px'
            height='58px'
            backgroundImage={`url(${item.images && item.images[0]})`}
            stub={!(item.images && item.images[0])}
          />
        </Box>
        <Layout flexBasis='16px' />
        <Column width='180px'>
          <NextLink
            href={`/catalog/${item.iblock}/[slug]/[item]`}
            as={`/catalog/${item.iblock}/${item.category}/${item.slug}`}
            color='semiBlack'
            fontWeight='small'
            fontSize='semiMedium'
            lineHeight='extra'
            dangerouslySetInnerHTML={{ __html: item.name }}
          />
          <Layout flexBasis='4px' />
          <Text
            fontWeight='small'
            fontSize='small'
            color='dustyGray'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            {item.description}
          </Text>
        </Column>
        <Layout flexGrow={1} />
        <Box maxWidth='75px'>
          <Condition match={(!notify && item.amount > 1) || (notify && item.notifyQuantity > 1)}>
            <Text
              color='crumbsGray'
              fontWeight='semiBold'
              fontSize='semiMedium'
              whiteSpace='nowrap'
            >
              {intl.formatNumber(!notify ? item.amount : item.notifyQuantity)}
              <Space />
              x
              <Space />
            </Text>
          </Condition>
          <Text
            fontWeight='semiBold'
            fontSize='semiMedium'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            {intl.formatNumber(item.price)}
            <Space />
            <Ruble />
          </Text>
        </Box>
        <Layout flexBasis={notify ? '0' : '8px'} />
        <Condition match={!!deleteInCart}>
          <Box onClick={() => deleteInCart(item)} height='18px' pt='4px' cursor='pointer'>
            <IconsManager
              color='rgba(118, 118, 118, 1)'
              hoverColor='semiBlack'
              clickedColor='semiBlack'
            >
              <CloseIcon width='10px' height='10px' />
            </IconsManager>
          </Box>
        </Condition>
        <Layout flexShrink={0} flexBasis='24px' />
      </Row>
      <Layout flexShrink={0} flexBasis='24px' />
    </Column>
  )
}

export default CartPopupItem
