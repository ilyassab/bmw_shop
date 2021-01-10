import React, { FC }           from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'

import { Background }          from '@ui/background'
import { NextLink }            from '@ui/link'
import { PostInfo }            from '@ui/post-info'
import { Text }                from '@ui/text'

import { useData }             from './useData'

const NewsFeaturedItem: FC = () => {
  const { data } = useData()

  return (
    <Layout justifyContent='center'>
      <Box
        flexDirection={['column', 'column', 'row']}
        justifyContent='space-between'
        maxWidth={['90%', '90%', '1200px']}
        width='100%'
      >
        <Background
          width={['100%', '100%', '564px']}
          height={['188px', '400px', '310px']}
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundImage={data.fullImage && `url(${data.fullImage})`}
        />
        <Column width={['100%', '100%', '620px']}>
          <Column order={[2, 2, 0]}>
            <Layout flexBasis={['24px', '24px', '16px']} />
            <Text fontSize='small' color='crumbsGray' fontWeight='semiBold'>
              <PostInfo
                views={data.views}
                date={data.date && data.date.slice(0, data.date.indexOf(' '))}
                fixedDate
              />
            </Text>
          </Column>
          <Layout flexBasis={['24px', '24px', '16px']} />
          <Layout>
            <NextLink
              href={`/news/${data.id}`}
              as={`/news/${data.id}`}
              fontSize={['semiLarge', 'large', 'large']}
              color='semiBlack'
              fontWeight='semiBold'
            >
              {data.name}
            </NextLink>
          </Layout>
          <Layout display={['none', 'none', 'flex']} flexBasis='21px' />
          <Layout display={['none', 'none', 'flex']}>
            <Text fontSize='medium' color='dustyGray' fontWeight='small' lineHeight='extra'>
              {data.description}
            </Text>
          </Layout>
        </Column>
      </Box>
    </Layout>
  )
}

export default NewsFeaturedItem
