import React, { FC, Fragment, useEffect, useState } from 'react'
import { Box, Column, Layout, Row }                 from '@atlantis-lab/layout'
import { Collapse }                                 from 'react-collapse'
import { useApolloClient }                          from '@apollo/react-hooks'
import { useRouter }                                from 'next/router'

import { FilterItem }                               from '@fragments/filter-item'
import { PriceSlider }                              from '@fragments/price-slider'
import { Condition }                                from '@ui/condition'
import { Divider }                                  from '@ui/divider'
import { MinusIcon, PlusIcon }                      from '@ui/icons'
import { Text }                                     from '@ui/text'
import { filterParser }                             from '@utils/filter-parser'

import { useData }                                  from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const Desktop: FC<Props> = ({ block }) => {
  const client = useApolloClient()
  const router: any = useRouter()
  const [price, setPrice] = useState({
    title: '',
    key: '',
    min: null,
    max: null,
  })
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState([])
  const [opened, setOpened] = useState(false)
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

  const currentPrice = JSON.parse(decodeURI(query.price || '[]'))[0]
  const currentPriceValues = currentPrice && currentPrice.value

  useEffect(() => {
    if (currentPriceValues) {
      setOpened(true)
    }
  }, [currentPriceValues && currentPriceValues[0], currentPriceValues && currentPriceValues[1]])

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

  return (
    <Box width='100%' flexDirection='column' position='relative'>
      <Condition match={loading}>
        <Box
          position='absolute'
          width='100%'
          height='100%'
          zIndex='10'
          backgroundColor='coverWhite'
        />
      </Condition>
      {filters.map(item => (
        <Fragment key={item.title}>
          <FilterItem item={item} />
          <Divider color='activeGray' />
        </Fragment>
      ))}
      <Condition match={price.title}>
        <Collapse isOpened>
          <Column>
            <Text cursor='pointer'>
              <Column onClick={() => setOpened(!opened)}>
                <Layout flexBasis='20px' />
                <Row alignItems='center'>
                  <Text color='dustyGray' fontSize='semiMedium' fontWeight='normal'>
                    {price.title}
                  </Text>
                  <Layout flexGrow={1} />
                  <Condition match={!opened}>
                    <PlusIcon width='14px' height='14px' />
                  </Condition>
                  <Condition match={opened}>
                    <MinusIcon width='14px' height='2px' />
                  </Condition>
                </Row>
                <Layout flexBasis='20px' />
              </Column>
            </Text>
            <Layout display={opened ? 'flex' : 'none'}>
              <Column>
                <PriceSlider
                  min={price.min}
                  max={price.max}
                  opened={opened}
                  currentMin={(currentPriceValues && currentPriceValues[0]) || null}
                  currentMax={(currentPriceValues && currentPriceValues[1]) || null}
                  onChange={(min, max) => {
                    filterParser.addPriceFilter(price.key, min, max)
                  }}
                />
                <Layout flexBasis='40px' />
              </Column>
            </Layout>
          </Column>
        </Collapse>
        <Divider color='dividerGray' />
      </Condition>
    </Box>
  )
}

export default Desktop
