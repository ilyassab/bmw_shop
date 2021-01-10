import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout, Row }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }      from 'react-intl'

import { Modal }                                  from '@atlantis-lab/modal'
import { AddToCartButton }                        from '@fragments/add-to-cart-button'
import { ProductPreview }                         from '@fragments/product-preview'
import { Condition }                              from '@ui/condition'
import { EyeIcon }                                from '@ui/icons'
import { Link, NextLink }                         from '@ui/link'
import { ProductImages }                          from '@ui/product-images'
import { ProductSizePicker }                      from '@ui/product-size-picker'
import { Ruble, Space, Text }                     from '@ui/text'
import { Transition }                             from '@ui/transition'

import messages                                   from './messages'

interface Props {
  item?: {
    isHit?: boolean
    color?: string
    images?: string[]
    name?: string
    price?: number
    oldPrice?: number
    quantity?: number
    category?: string
    slug?: string
    iblock?: string
    label?: {
      color?: string
      name?: string
    }
    offers?: Array<{
      parameters?: Array<any>
      id?: number[]
      price?: number
      oldPrice?: number
      quantity?: number
    }>
  }
  isMobile?: boolean
}

const SliderItem: FC<Props & WrappedComponentProps> = ({ item, isMobile, intl }) => {
  const [hover, setHover] = useState(false)
  const [opened, setOpened] = useState(false)
  const [offer, setOffer] = useState({ price: 0, oldPrice: 0 })
  const [itemHeight, setItemHeight] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [hoverTimeOut, setHoverTimeout] = useState(false)
  const [canClose, setCanClose] = useState(true)
  const itemRef = useRef(null)

  useEffect(() => {
    if (hover) {
      setOpacity(1)
    } else {
      setTimeout(() => {
        setHoverTimeout(false)
      }, 500)
      setOpacity(0)
    }
  }, [hover])

  useEffect(() => {
    if (itemHeight === 0 || itemHeight > itemRef.current.offsetHeight) {
      setItemHeight(itemRef.current.offsetHeight)
    }
  }, [itemRef.current && itemRef.current.offsetHeight])

  /* eslint-disable */
  return (
    <>
      <Condition match={hover || hoverTimeOut}>
        <Box width={['200px', '300px', '300px']} height={itemHeight} />
      </Condition>
      <Transition
        width={['200px', '300px', '300px']}
        boxSizing='border-box'
        transition='all 0.7s, z-index 1s'
        height={itemHeight === 0 ? '100%' : 'auto'}
        maxHeight={hover ? itemHeight + 150 : '100%'}
        justifyContent='center'
        border='gray'
        position={hover || hoverTimeOut ? 'absolute' : 'relative'}
        zIndex={hover ? 8 : 1}
        backgroundColor='white'
        boxShadow={hover ? 'semiGray' : ''}
        top={0}
        ref={itemRef}
        onMouseEnter={() => {
          if(!isMobile) {
            setHover(true)
          }
        }}
        onMouseLeave={() => {
          if(!isMobile) {
            setHoverTimeout(true)
            setHover(false)
            setTimeout(() => {
              setOffer({price: 0, oldPrice: 0})
            }, 250)
          }
        }}
      >
        <Condition match={!!item.label}>
          <Box
            backgroundColor={item.label && item.label.color}
            height='27px'
            position='absolute'
            top={['10px', '15px', '20px']}
            left={['5%', '5%', '20px']}
            padding='0 10px'
            alignItems='center'
            zIndex={2}
          >
            <Text
              color='white'
              textTransform='uppercase'
              fontSize={['semiSmall', 'small', 'small']}
              fontWeight='semiBold'
            >
              {item.label && item.label.name}
            </Text>
          </Box>
        </Condition>
        <Box maxWidth={['90%', '90%', '240px']} width='100%'>
          <Column alignItems='center'>
            <Layout flexShrink={0} flexBasis='32px' />
            <NextLink width='100%' href={`/catalog/${item.iblock}/[slug]/[item]`} as={`/catalog/${item.iblock}/${item.category}/${item.slug}`}>
              <Box
                width='100%'
                justifyContent='center'
              >
                <ProductImages images={item.images} hover={hover} opacity={opacity} />
              </Box>
            </NextLink>
            <Layout flexShrink={0} flexBasis='20px' />
            <Layout
              maxWidth='90%'
            >
              <NextLink
                href={`/catalog/${item.iblock}/[slug]/[item]`}
                as={`/catalog/${item.iblock}/${item.category}/${item.slug}`}
                textAlign='center'
                color='dustyGray'
                fontSize={['small', 'semiMedium', 'semiMedium']}
                lineHeight='extra'
                fontWeight='small'
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            </Layout>
            <Layout flexShrink={0} flexBasis='8px' />
            <Box
              flexDirection={['column', 'row', 'row']}
              justifyContent='center'
              alignItems={['center', 'initial', 'initial']}
            >
              <Text fontSize='default' lineHeight='small' fontWeight='semiBold' color='semiBlack'>
                {intl.formatNumber((offer && offer.price) || item.price)} <Ruble /><Space />
              </Text>
              <Layout flexBasis={['5px', '0px', '0px']} />
              <Condition match={((offer && offer.oldPrice) || item.oldPrice)}>
                <Text
                  fontSize='medium'
                  lineHeight='small'
                  fontWeight='small'
                  textDecoration='line-through'
                  color='crumbsGray'
                >
                  {intl.formatNumber(((offer && offer.oldPrice) || item.oldPrice))}
                  <Space />
                  <Ruble />
                </Text>
              </Condition>
            </Box>
            <Layout flexShrink={0} flexBasis='24px' />
            <Condition match={hover || hoverTimeOut}>
              <Condition
                match={
                  item.offers &&
                  item.offers[0] &&
                  item.offers[0].parameters &&
                  item.offers[0].parameters.length <= 0
                }
              >
                <Transition
                  transition={opacity === 1 ? '0.15s 0.1s' : '0.22s 0.23s'}
                  opacity={opacity}
                >
                  <AddToCartButton
                    id={
                      item.offers &&
                      item.offers[0] &&
                      item.offers[0].id &&
                      item.offers[0].id[0]
                    }
                    offer={
                      item.offers &&
                      item.offers[0]
                    }
                    quantity={
                      item.offers &&
                      item.offers[0] &&
                      item.offers[0].quantity
                    }
                    height='44px'
                    width='240px'
                  />
                </Transition>
              </Condition>
              <Condition
                match={
                  item.quantity > 0 &&
                  item.offers &&
                  item.offers[0] &&
                  item.offers[0].parameters &&
                  item.offers[0].parameters.length > 0
                }
              >
                <Transition
                  transition={opacity === 1 ? '0.15s 0.1s' : '0.22s 0.23s'}
                  width='100%'
                  opacity={opacity}
                >
                  <ProductSizePicker
                    offers={item.offers}
                    currentOffer={offer}
                    setOffer={setOffer}
                  />
                </Transition>
              </Condition>
              <Layout flexShrink={0} flexBasis='24px' />
              <Transition
                transition={opacity === 1 ? '0.06s 0.2s' : '0.04s 0.15s'}
                opacity={opacity}
              >
                <Text
                  color='blue'
                  fontWeight='semiBold'
                  fontSize='semiMedium'
                  cursor='pointer'
                  onClick={() => setOpened(true)}
                >
                  <Row>
                    <EyeIcon width='26px' height='19px' />
                    <Layout flexBasis='8px' />
                    <Link color='blue' underline>
                      {intl.formatMessage(messages.watch)}
                    </Link>
                  </Row>
                </Text>
              </Transition>
              <Layout flexBasis='24px' />
            </Condition>
          </Column>
        </Box>
      </Transition>
      <Modal visible={opened} onClose={() => {
        if (canClose) {
          setOpened(false)
        }
      }}>
        <ProductPreview modal={true} onClose={() => setOpened(false)} item={item} setCanClose={setCanClose} />
      </Modal>
    </>
  )
  /* eslint-enable */
}

export default injectIntl(SliderItem)
