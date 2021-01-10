import React, { FC, Fragment, useEffect, useState } from 'react'
import { Box, Column, Layout, Row }                 from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }        from 'react-intl'
import { useApolloClient }                          from '@apollo/react-hooks'
import { useRouter }                                from 'next/router'

import { Modal }                                    from '@atlantis-lab/modal'
import { FiltersCategory as FiltersCategoryModal }  from '@fragments/filters-category'
import { FiltersCheckboxesModal }                   from '@fragments/filters-checkboxes-modal'
import { FiltersPriceModal }                        from '@fragments/filters-price-modal'
import { Condition }                                from '@ui/condition'
import { Divider }                                  from '@ui/divider'
import { ArrowRightIcon }                           from '@ui/icons'
import { Text }                                     from '@ui/text'
import { filterParser }                             from '@utils/filter-parser'

import messages                                     from './messages'
import { useData, useDataCategories }               from './useData'

interface Props {
  onClose?: () => void
  opened?: boolean
  block?: string
}

const FiltersModal: FC<Props & WrappedComponentProps> = ({ onClose, opened, block, intl }) => {
  const client = useApolloClient()
  const router: any = useRouter()

  const [checkboxesOpenedKey, setCheckboxesOpenedKey] = useState('')
  const [categoryOpened, setCategoryOpened] = useState(false)
  const [priceOpened, setPriceOpened] = useState(false)
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState([])
  const [categories, setCategories] = useState([])
  const [price, setPrice] = useState({
    title: '',
    key: '',
    min: null,
    max: null,
  })

  const [query, setQuery] = useState((router && router.query) || {})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await useData(
        client,
        block,
        decodeURI(query.category || '') || query.slug,
        JSON.stringify([
          ...JSON.parse(decodeURI(query.filters || '[]')),
          ...JSON.parse(decodeURI(query.price || '[]')),
          ...JSON.parse(decodeURI(query.additionalFilter || '[]')),
        ])
      )
      setPrice({
        title: data.prices && data.prices[0].items && data.prices[0].title,
        key: data.prices && data.prices[0].items && data.prices[0].key,
        min: data.prices && data.prices[0].items && data.prices[0].items.min,
        max: data.prices && data.prices[0].items && data.prices[0].items.max,
      })
      setFilters(data.items)
      setLoading(false)
    }
    fetchData()
  }, [query])

  useEffect(() => {
    const fetchData = async () => {
      const data = await useDataCategories(client, block, query.slug)
      setCategories(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handleRouteChanged = () => {
      if (window && window.history) {
        setQuery(window.history.state.url.query || {})
      }
    }
    router.events.on('routeChangeComplete', handleRouteChanged)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChanged)
    }
  }, [])

  const onCloseHandler = () => {
    if (!checkboxesOpenedKey && !categoryOpened && !priceOpened) {
      onClose()
    }
  }

  return (
    <Modal
      visible={opened}
      onClose={onCloseHandler}
      justifyContent={['flex-end', 'flex-end', 'center']}
    >
      <Box
        position='relative'
        justifyContent='center'
        height={['100%', '100%', 'auto']}
        width='100%'
        backgroundColor='white'
        maxWidth={['90%', '90%', '800px']}
      >
        <Column width='100%' height='100%'>
          <Box height='64px' boxShadow='gray' alignItems='center'>
            <Layout flexBasis='5%' />
            <Text
              fontSize={['default', 'default', 'large']}
              fontWeight={['semiBold', 'semiBold', 'tiny']}
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.filter)}
            </Text>
            <Layout flexGrow={1} />
            <Condition match={query.filters || query.price}>
              <Text
                color='crumbsGray'
                fontSize='semiMedium'
                fontWeight='normal'
                onClick={() => {
                  filterParser.resetPriceAndFilters()
                  onClose()
                }}
              >
                {intl.formatMessage(messages.clearAll)}
              </Text>
            </Condition>
            <Layout flexBasis='5%' />
          </Box>
          <Column>
            <Condition match={categories && categories.length > 0}>
              <Column
                onClick={() => {
                  setCategoryOpened(true)
                }}
              >
                <Layout flexBasis='24px' />
                <Row alignItems='center'>
                  <Layout flexBasis='5%' />
                  <Text fontSize='small' fontWeight='semiBold' textTransform='uppercase'>
                    {intl.formatMessage(messages.categories)}
                  </Text>
                  <Layout flexGrow={1} />
                  <ArrowRightIcon color='rgba(186, 186, 186)' width='6px' height='10px' />
                  <Layout flexBasis='5%' />
                </Row>
                <Layout flexBasis='24px' />
              </Column>
              <Divider color='dividerGray' />
            </Condition>
            {filters.map(item => (
              <Fragment key={item.title}>
                <Column
                  onClick={() => {
                    setCheckboxesOpenedKey(item.key)
                  }}
                >
                  <Layout flexBasis='24px' />
                  <Row alignItems='center'>
                    <Layout flexBasis='5%' />
                    <Text fontSize='small' fontWeight='semiBold' textTransform='uppercase'>
                      {item.title}
                    </Text>
                    <Layout flexGrow={1} />
                    <ArrowRightIcon color='rgba(186, 186, 186)' width='6px' height='10px' />
                    <Layout flexBasis='5%' />
                  </Row>
                  <Layout flexBasis='24px' />
                </Column>
                <Divider color='dividerGray' />
              </Fragment>
            ))}
            <Condition match={price.title}>
              <Column
                onClick={() => {
                  setPriceOpened(true)
                }}
              >
                <Layout flexBasis='24px' />
                <Row alignItems='center'>
                  <Layout flexBasis='5%' />
                  <Text fontSize='small' fontWeight='semiBold' textTransform='uppercase'>
                    {price.title}
                  </Text>
                  <Layout flexGrow={1} />
                  <ArrowRightIcon color='rgba(186, 186, 186)' width='6px' height='10px' />
                  <Layout flexBasis='5%' />
                </Row>
                <Layout flexBasis='24px' />
              </Column>
              <Divider color='dividerGray' />
            </Condition>
          </Column>
        </Column>
      </Box>
      <FiltersCheckboxesModal
        loading={loading}
        opened={!!checkboxesOpenedKey}
        items={
          filters.find(filterObject => filterObject.key === checkboxesOpenedKey) &&
          filters.find(filterObject => filterObject.key === checkboxesOpenedKey).items
        }
        id={
          filters.find(filterObject => filterObject.key === checkboxesOpenedKey) &&
          filters.find(filterObject => filterObject.key === checkboxesOpenedKey).key
        }
        onClose={() => setCheckboxesOpenedKey('')}
      />
      <FiltersCategoryModal
        opened={categoryOpened}
        query={query}
        isMobile
        items={categories}
        onClickClose={() => {
          setCategoryOpened(false)
          onClose()
        }}
        onClose={() => setCategoryOpened(false)}
      />
      <FiltersPriceModal
        opened={priceOpened}
        loading={loading}
        price={price}
        query={query}
        onClose={() => setPriceOpened(false)}
      />
    </Modal>
  )
}

export default injectIntl(FiltersModal)
