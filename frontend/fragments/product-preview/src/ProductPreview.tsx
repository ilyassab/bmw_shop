import React, { FC, useEffect, useState } from 'react'
import { Box, Column, Layout }            from '@atlantis-lab/layout'
import { useApolloClient }                from '@apollo/react-hooks'
import { useIntl }                        from 'react-intl'

import { AddToCart }                      from '@fragments/add-to-cart'
import { DealerModal }                    from '@fragments/dealer-modal'
import { Condition }                      from '@ui/condition'
import { Cross }                          from '@ui/cross'
import { Divider }                        from '@ui/divider'
import { ImagePicker }                    from '@ui/image-picker'
import { Link }                           from '@ui/link'
import { WheelsSelect }                   from '@ui/select'
import { SizePicker }                     from '@ui/size-picker'
import { Space, Text }                    from '@ui/text'
import { cookieStorage }                  from '@utils/cookie-storage'

import messages                           from './messages'
import { useData }                        from './useData'

interface Props {
  onClose?: () => void
  modal?: boolean
  item?: {
    isHit?: boolean
    color?: string
    images?: string[]
    name?: string
    id?: number | string
    price?: number
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
      store?: Array<{
        address?: string
        externalId?: number
        id?: number
        location?: string
        name?: string
        phone?: string
        quantity?: number
        worktime?: string
      }>
      price?: number
      quantity?: number
    }>
    category?: string
    slug?: string
    iblock?: string
    iblockCode?: string
  }
  setCanClose?: (arg0?: boolean) => void
}

const ProductPreview: FC<Props> = ({ onClose, item, modal, setCanClose }) => {
  const [offer, setOffer] = useState(item.offers && item.offers[0])
  const [stores, setStores] = useState([])
  const [store, setStore] = useState({})
  const [dealerModal, setDealerModal] = useState(false)
  const [zoomOpened, setZoomOpened] = useState(false)
  const [sizeTable, setSizeTable] = useState('')
  const intl = useIntl()

  const onCloseClick = () => {
    if (!dealerModal && !zoomOpened) {
      onClose()
    }
  }

  useEffect(() => {
    setOffer(item.offers && item.offers[0])
  }, [item])

  const client = useApolloClient()

  useEffect(() => {
    if (stores) {
      stores.map(itemStore => {
        if ((itemStore.id && itemStore.id[0]) === (offer.id && offer.id[0])) {
          setStore(itemStore)
        }
        return itemStore
      })
    }
  }, [offer, stores])

  useEffect(() => {
    if (item.slug) {
      const fetchData = async () => {
        const token = cookieStorage.getItem('token') || ''
        const data = await useData(client, item.slug, token)
        setSizeTable(data && data.sizesTable)
        setStores(data && data.offers)
      }
      fetchData()
    }
  }, [item && item.slug])

  if (!offer) {
    return null
  }

  const block = item.iblock || item.iblockCode

  return (
    <Box
      backgroundColor='white'
      width='100%'
      maxWidth={modal ? '1116px' : ['90%', '90%', '1200px']}
      position='relative'
      alignItems='center'
      alignSelf='center'
      flexDirection='column'
    >
      <Condition match={!!onClose}>
        <Text cursor='pointer' onClick={onCloseClick}>
          <Box right='32px' top='32px' position='absolute'>
            <Cross />
          </Box>
        </Text>
      </Condition>
      <Column maxWidth={modal ? '996px' : '100%'}>
        <Condition match={modal}>
          <Layout flexBasis='60px' />
        </Condition>
        <Box width='100%' flexDirection={['column', 'row', 'row']}>
          <ImagePicker
            modal={modal}
            setCanClose={setCanClose}
            setZoomOpened={setZoomOpened}
            zoomOpened={zoomOpened}
            images={item.images}
          />
          <Layout flexGrow={[0, 1, 0]} flexBasis={['16px', '32px', '24px']} />
          <Column width={['100%', 'auto', '100%']}>
            <Text
              fontSize={['semiLarge', 'semiLarge', 'large']}
              lineHeight='normal'
              fontWeight='tiny'
              dangerouslySetInnerHTML={{ __html: item.name }}
            />
            <Layout flexBasis='16px' />
            <Text
              fontSize={['small', 'small', 'semiMedium']}
              fontWeight='small'
              lineHeight='extra'
              color='dustyGray'
            >
              {intl.formatMessage(messages.art)}
              <Space />
              {offer && offer.vendorCode}
            </Text>
            <Condition
              match={item.offers && item.offers[0] && item.offers[0].parameters.length > 0}
            >
              <Condition match={block === 'lifestyle'}>
                <Layout flexBasis={['16px', '16px', '30px']} />
                <SizePicker
                  setCanClose={setCanClose}
                  offers={item.offers}
                  currentOffer={offer}
                  setOffer={setOffer}
                  sizeTable={sizeTable}
                />
              </Condition>
              <Condition match={block === 'wheels'}>
                <Column>
                  <Layout flexBasis={['16px', '16px', '30px']} />
                  <Divider color='semiGray' />
                  <Layout flexBasis='24px' />
                  <Text
                    color='semiBlack'
                    fontSize='small'
                    fontWeight='semiBold'
                    textTransform='uppercase'
                  >
                    {intl.formatMessage(messages.model)}
                  </Text>
                  <Layout flexBasis='14px' />
                  <WheelsSelect offers={item.offers} currentOffer={offer} setOffer={setOffer} />
                </Column>
              </Condition>
              <Layout flexBasis={['16px', '24px', '24px']} />
            </Condition>
            <Divider color='semiGray' />
            <Layout flexBasis={['16px', '24px', '24px']} />
            <AddToCart
              store={store}
              setDealerModal={() => {
                if (setCanClose) {
                  setCanClose(false)
                }
                setDealerModal(true)
              }}
              productId={item.id}
              offer={offer}
              slug={item.slug}
            />
          </Column>
        </Box>
        <Condition match={modal}>
          <Layout flexBasis='60px' />
        </Condition>
      </Column>
      <Condition match={modal}>
        <Link width='100%' href={`/catalog/${item.iblock}/${item.category}/${item.slug}`}>
          <Box
            width='100%'
            height='60px'
            boxShadow='boxGray'
            alignItems='center'
            justifyContent='center'
          >
            <Text fontSize='semiMedium' fontWeight='semiBold' color='blue'>
              {intl.formatMessage(messages.goTo)}
            </Text>
          </Box>
        </Link>
      </Condition>
      <DealerModal
        store={store}
        onClose={() => {
          if (setCanClose) {
            setCanClose(true)
          }
          setDealerModal(false)
        }}
        opened={dealerModal}
      />
    </Box>
  )
}

export default ProductPreview
