import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'
import { useRouter }                         from 'next/router'

import { CatalogItem }                       from '@fragments/catalog-item'
import { Sort }                              from '@fragments/sort'
import { Condition }                         from '@ui/condition'
import { FetchMoreBlock }                    from '@ui/fetch-more-block'
import { PageSelector }                      from '@ui/page-selector'
import { Space, Text }                       from '@ui/text'
import { useCatalogDispatch }                from '@store/stores'
import { cookieStorage }                     from '@utils/cookie-storage'
import { declOfNum }                         from '@utils/decl-of-num'
import { filterParser }                      from '@utils/filter-parser'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const CatalogGrid: FC<WrappedComponentProps & Props> = ({ intl, isMobile, block }) => {
  const [state, setState] = useState({
    items: [],
    fetchMore: false,
    pages: 1,
    total: 0,
  })
  const router: any = useRouter()
  const [query, setQuery] = useState((router && router.query) || {})
  const [loading, setLoading] = useState(true)
  const client = useApolloClient()
  const { dispatch: catalogDispatch } = useCatalogDispatch()

  const currentPage = Number(query.page) || 1

  const fetchQuery = async () => {
    try {
      setLoading(true)
      const token = cookieStorage.getItem('token') || ''
      const data = await useData(
        client,
        18,
        currentPage,
        block,
        decodeURI(query.category || '') || query.slug,
        JSON.stringify([
          ...JSON.parse(decodeURI(query.filters || '[]')),
          ...JSON.parse(decodeURI(query.price || '[]')),
          ...JSON.parse(decodeURI(query.additionalFilter || '[]')),
        ]),
        decodeURI(query.sort || '') || '',
        token
      )
      catalogDispatch({ type: 'addCurrentItemsAmount', payload: data.total })
      if (!state.fetchMore) {
        setState({
          ...state,
          items: data.items,
          pages: data.pages,
          total: data.total,
        })
      } else {
        setState({
          ...state,
          items: state.items.concat(data.items),
          fetchMore: false,
          pages: data.pages,
          total: data.total,
        })
      }
      setLoading(false)
    } catch {
      setState({
        ...state,
        items: [],
        pages: 1,
        total: 0,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuery()
  }, [query])

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

  if (state.items.length === 0 && loading === false) {
    return <Text>{intl.formatMessage(messages.noOrders)}</Text>
  }

  return (
    <>
      <Column position='relative'>
        <Condition match={loading}>
          <Box
            position='absolute'
            width='100%'
            height='100%'
            zIndex='10'
            backgroundColor='coverWhite'
          />
        </Condition>
        <Row display={['flex', 'flex', 'none']} alignItems='center'>
          <Text fontSize='semiMedium' color='motionGray' fontWeight='normal'>
            {state.total}
            <Space />
            {declOfNum(state.total, [
              intl.formatMessage(messages.oneItem),
              intl.formatMessage(messages.twoItem),
              intl.formatMessage(messages.fiveItem),
            ])}
          </Text>
        </Row>
        <Row display={['none', 'none', 'flex']} alignItems='center'>
          <Text fontSize='semiMedium' color='motionGray' fontWeight='normal'>
            {state.total}
            <Space />
            {declOfNum(state.total, [
              intl.formatMessage(messages.oneItem),
              intl.formatMessage(messages.twoItem),
              intl.formatMessage(messages.fiveItem),
            ])}
          </Text>
          <Layout flexGrow={1} />
          <Sort />
        </Row>
        <Layout flexBasis={['16px', '16px', '22px']} />
        <Layout flexWrap='wrap'>
          {state.items.map(item => (
            <Layout width={['50%', '33.33%', '300px']} position='relative' key={item.slug}>
              <CatalogItem isMobile={isMobile} item={item} />
            </Layout>
          ))}
        </Layout>
        <Layout flexBasis={['16px', '32px', '40px']} />
        <FetchMoreBlock
          loading={loading}
          perPage={18}
          page={currentPage}
          total={state.total}
          totalShown={currentPage * 18}
          setFetchMore={page => {
            setState({
              ...state,
              fetchMore: true,
            })
            filterParser.changePage(page)
          }}
        />
        <PageSelector
          pages={state.pages}
          currentPage={currentPage}
          loading={loading}
          setCurrentPage={page => filterParser.changePage(page)}
        />
      </Column>
    </>
  )
}

export default injectIntl(CatalogGrid)
