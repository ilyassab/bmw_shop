import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import NewsGridItem                          from '@fragments/news-grid-item'
import { Condition }                         from '@ui/condition'
import { PlusIcon }                          from '@ui/icons'
import { Loader }                            from '@ui/loader'
import { Text }                              from '@ui/text'
import { Space }                             from '@ui/text'
import { declOfNum }                         from '@utils/decl-of-num'

import messages                              from './messages'
import { useData }                           from './useData'

interface StateProps {
  page?: number | null
  pages?: number | null
  total?: number | null
  items?: Array<{
    dateCreated?: string
    fullImg?: string
    id?: string
    name?: string
    previewImg?: string
    previewText?: string
    viewsCount?: number
  }>
}

interface Props {
  newsDetailPage?: boolean
  isMobile?: boolean
  isTablet?: boolean
}

const NewsGrid: FC<Props & WrappedComponentProps> = ({
  intl,
  newsDetailPage,
  isMobile,
  isTablet,
}) => {
  const [newsData, setNewsData] = useState<StateProps>({ items: [] })
  const [showMore, setShowMore] = useState(true)
  const [loading, setLoading] = useState(false)

  /* eslint-disable no-nested-ternary */
  const perPage = newsDetailPage ? 3 : isTablet ? 8 : isMobile ? 6 : 9

  const currentPage = newsData.page || 0
  const totalNews = newsData.total
  const showPages =
    totalNews - currentPage * perPage > perPage ? perPage : totalNews - currentPage * perPage

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)
        const data = await useData(perPage, currentPage + 1, client)
        setNewsData({
          total: data.total,
          page: data.page,
          pages: data.pages,
          items: newsData.items.concat(data.items),
        })
        setLoading(false)
      } catch {
        setNewsData({ items: [] })
        setLoading(false)
      }
    }
    fetchQuery()
  }, [showMore])

  return (
    <Layout justifyContent='center'>
      <Column maxWidth={['90%', '90%', '1200px']} width='100%'>
        <Row justifyContent='space-between' flexWrap='wrap'>
          {newsData.items.map((item, index) => (
            <NewsGridItem key={item.id} news={item} index={index} />
          ))}
        </Row>
        <Condition match={newsData.page < newsData.pages && !loading}>
          <Text
            cursor='pointer'
            color='semiBlack'
            fontSize='semiMedium'
            fontWeight='semiBold'
            onClick={() => setShowMore(!showMore)}
          >
            <Box
              backgroundColor='slightlyGray'
              height='56px'
              justifyContent='center'
              alignItems='center'
              width='100%'
            >
              <PlusIcon />
              <Space count={2} />
              {intl.formatMessage(messages.showMore)}
              <Space />
              {showPages}
              <Space />
              {declOfNum(showPages, [
                intl.formatMessage(messages.oneNews),
                intl.formatMessage(messages.twoNews),
                intl.formatMessage(messages.fiveNews),
              ])}
            </Box>
          </Text>
        </Condition>
        <Condition match={loading}>
          <Box height='60px' width='100%' justifyContent='center' alignItems='center'>
            <Loader />
          </Box>
        </Condition>
        <Layout flexBasis='70px' />
      </Column>
    </Layout>
  )
}

export default injectIntl(NewsGrid)
