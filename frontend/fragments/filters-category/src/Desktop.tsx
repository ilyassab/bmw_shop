import React, { FC, Fragment, useEffect, useState } from 'react'
import { Column, Layout, Row }                      from '@atlantis-lab/layout'
import { useApolloClient }                          from '@apollo/react-hooks'
import { useRouter }                                from 'next/router'
import { useIntl }                                  from 'react-intl'

import { Divider }                                  from '@ui/divider'
import { IconsManager }                             from '@ui/icons-manager'
import { Text }                                     from '@ui/text'
import { useCatalogDispatch, useCatalogState }      from '@store/stores'
import { filterParser }                             from '@utils/filter-parser'

import messages                                     from './messages'
import { useData }                                  from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const Desktop: FC<Props> = ({ block }) => {
  const { state: catalogState } = useCatalogState()
  const { dispatch: catalogDispatch } = useCatalogDispatch()
  const [items, setItems] = useState([])
  const client = useApolloClient()
  const router: any = useRouter()
  const intl = useIntl()
  const [query, setQuery] = useState(router && router.query)

  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client, block, query.slug)
      setItems(data)
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

  if (items.length === 0) {
    return null
  }
  /*eslint-disable*/
  return (
    <Column>
      <Text fontSize='semiMedium' color='dustyGray' lineHeight='medium'>
        {intl.formatMessage(messages.categories)}
      </Text>
      <Layout flexBasis='22px' />
      <Divider color='dividerGray' />
      <Layout flexBasis='24px' />
      <Row>
        <Layout maxWidth='240px'>
          <IconsManager
            color={!query.category ? 'blue' : 'semiBlack'}
            hoverColor='blue'
            clickedColor='blue'
          >
            <Text
              textOverflow='ellipsis'
              fontWeight='normal'
              overflow='hidden'
              whiteSpace='nowrap'
              fontSize='semiMedium'
              onClick={() => {
                filterParser.removeCategory()
              }}
            >
              {intl.formatMessage(messages.all)}
            </Text>
          </IconsManager>
        </Layout>
      </Row>
      {items.map(item => (
        <Fragment key={item.slug}>
          <Layout flexBasis='24px' />
          <Row onClick={() => catalogDispatch({ type: 'resetCurrentItemsAmount' })}>
            <Layout maxWidth='240px'>
              <IconsManager
                color={decodeURI(query.category) === item.slug ? 'blue' : 'semiBlack'}
                hoverColor='blue'
                clickedColor='blue'
              >
                <Text
                  textOverflow='ellipsis'
                  fontWeight='normal'
                  overflow='hidden'
                  whiteSpace='nowrap'
                  fontSize='semiMedium'
                  onClick={() => {
                    filterParser.addCategory(item.slug)
                  }}
                >
                  {item.name}
                </Text>
              </IconsManager>
            </Layout>
            <Layout flexGrow={1} />
            <Text fontSize='semiMedium' fontWeight='small' color='crumbsGray'>
              {decodeURI(query.category) === item.slug
                ? catalogState.currentItemsAmount !== null
                  ? catalogState.currentItemsAmount
                  : item.countElements
                : item.countElements}
            </Text>
          </Row>
        </Fragment>
      ))}
      <Layout flexBasis='46px' />
    </Column>
  )
  /* eslint-enable */
}

export default Desktop
