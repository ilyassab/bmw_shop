import React, { useEffect, useState } from 'react'
import { Box, Column, Layout }        from '@atlantis-lab/layout'
import { useApolloClient }            from '@apollo/react-hooks'
import { useRouter }                  from 'next/router'
import { injectIntl }                 from 'react-intl'

import BookTestDrive                  from '@fragments/book-test-drive'
import NewsGrid                       from '@fragments/news-grid'
import { Background }                 from '@ui/background'
import { Blocks as Renderer }         from '@ui/blocks'
import { Breadcrumbs }                from '@ui/breadcrumbs'
import { Condition }                  from '@ui/condition'
import { Divider }                    from '@ui/divider'
import { PostInfo }                   from '@ui/post-info'
import { Text }                       from '@ui/text'

import messages                       from './messages'
import { useData }                    from './useData'

interface NewsDetailData {
  fullImage?: string
  title?: string
  views?: number
  date?: string
  content?: {
    blocks?: any
  }
  description?: string
}

const NewsDetail = ({ intl }) => {
  const [data, setData] = useState<NewsDetailData>({})
  const { query } = useRouter()
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const newsDetail = await useData(query.slug, client)
        setData(newsDetail)
      } catch {
        setData({})
      }
    }
    fetchQuery()
  }, [])

  return (
    <>
      <Column flexGrow={1}>
        <Condition match={data.fullImage}>
          <Background
            width='100%'
            height={['180px', '432px', '570px']}
            backgroundColor='crumbsGray'
            backgroundPosition='center'
            backgroundSize='cover'
            backgroundImage={`url(${data.fullImage})`}
          />
        </Condition>
        <Layout justifyContent='center'>
          <Box
            width='100%'
            position='relative'
            maxWidth={['90%', '90%', '912px']}
            mt={data.fullImage ? ['0px', '0px', '-182px'] : ''}
            backgroundColor='white'
          >
            <Column alignItems='center'>
              <Box
                backgroundColor='white'
                width='100%'
                maxWidth={['100%', '672px', '792px']}
                position='relative'
              >
                <Column>
                  <Layout flexBasis={['0px', '0px', '57px']} />
                  <Layout display={['none', 'none', 'flex']}>
                    <Breadcrumbs
                      secondText={messages.news}
                      secondHref='/news'
                      secondAs='/news'
                      thirdText={data.title}
                    />
                  </Layout>
                  <Layout flexBasis='21px' />
                  <Text fontWeight='semiBold' fontSize={['semiLarge', 'semiLarge', 'large']}>
                    {data.title}
                  </Text>
                  <Layout flexBasis='21px' />
                  <Text
                    fontSize='small'
                    color='crumbsGray'
                    fontWeight='semiBold'
                    textTransform='uppercase'
                  >
                    <PostInfo
                      views={data.views}
                      date={data.date && data.date.slice(0, data.date.indexOf(' '))}
                      fixedDate
                    />
                  </Text>
                  <Layout flexBasis={['12px', '12px', '54px']} />
                  <Divider color='whiteGray' />
                  <Layout flexBasis={['20px', '20px', '54px']} />
                  <Renderer blocks={data.content && data.content.blocks} />
                  <Layout flexBasis={['16px', '16px', '96px']} />
                  <Divider color='whiteGray' />
                  <Layout flexBasis={['24px', '24px', '60px']} />
                  <BookTestDrive />
                  <Condition match={data.description}>
                    <Layout flexBasis={['24px', '24px', '75px']} />
                    <Divider color='whiteGray' />
                    <Layout flexBasis={['32px', '32px', '96px']} />
                    <Text
                      fontSize='default'
                      lineHeight='extra'
                      fontWeight='small'
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  </Condition>
                </Column>
              </Box>
              <Layout flexBasis={['32px', '32px', '96px']} />
              <Divider color='whiteGray' />
              <Layout flexBasis={['32px', '32px', '96px']} />
              <Text
                fontSize={['semiLarge', 'semiLarge', 'huge']}
                lineHeight='regular'
                fontWeight='tiny'
                textTransform='uppercase'
                textAlign='center'
              >
                {intl.formatMessage(messages.latestNews)}
              </Text>
            </Column>
          </Box>
        </Layout>
        <Layout flexBasis={['20px', '20px', '60px']} />
        <NewsGrid newsDetailPage />
        <Layout flexBasis={['32px', '32px', '96px']} />
      </Column>
    </>
  )
}

export default injectIntl(NewsDetail)
