import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Background }     from '@ui/background'
import { NextLink }       from '@ui/link'
import { PostInfo }       from '@ui/post-info'
import { Text }           from '@ui/text'

interface NewsGridItemProps {
  news?: {
    date?: string
    fullImg?: string
    id?: string
    name?: string
    previewImg?: string
    previewText?: string
    views?: number
  }
  index?: number
}

const NewsGridItem: FC<NewsGridItemProps> = ({ news }) => (
  <Column width={['100%', '49%', '384px']} mb={['32px', '60px', '60px']}>
    <NextLink href={`/news/${news.id}`} as={`/news/${news.id}`}>
      <Column>
        <Background
          width={['100%', '100%', '384px']}
          height='190px'
          backgroundColor='crumbsGray'
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundImage={news.previewImg && `url(${news.previewImg})`}
        />
        <Layout height='16px' />
        <Text fontSize='small' color='crumbsGray' fontWeight='semiBold' textTransform='uppercase'>
          <PostInfo
            views={news.views}
            date={news.date.slice(0, news.date.indexOf(' '))}
            fixedDate
          />
        </Text>
        <Layout height='16px' />
        <Text fontSize='xmedium' color='semiBlack' fontWeight='semiBold'>
          {news.name}
        </Text>
      </Column>
    </NextLink>
  </Column>
)

export default NewsGridItem
