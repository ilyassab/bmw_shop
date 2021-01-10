import React, { FC }                         from 'react'
import { Column, Layout }                    from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import NewsFeaturedItem                      from '@fragments/news-featured-item'
import NewsGrid                              from '@fragments/news-grid'
import { Breadcrumbs }                       from '@ui/breadcrumbs'
import { Divider }                           from '@ui/divider'
import { Text }                              from '@ui/text'

import messages                              from './messages'

interface Props {
  isMobile?: boolean
  isTablet?: boolean
}

const News: FC<Props & WrappedComponentProps> = ({ intl, isMobile, isTablet }) => (
  <>
    <Layout flexGrow={1} justifyContent='center' width='100%'>
      <Column maxWidth={['90%', '90%', '1200px']} width='100%'>
        <Layout flexBasis={['10px', '20px', '63px']} />
        <Layout display={['none', 'none', 'flex']}>
          <Breadcrumbs secondText={messages.news} />
        </Layout>
        <Layout flexBasis='34px' />
        <Text
          fontSize={['semiLarge', 'xlarge', 'huge']}
          lineHeight='regular'
          fontWeight='tiny'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.news)}.
        </Text>
        <Layout flexBasis={['16px', '24px', '48px']} />
      </Column>
    </Layout>
    <NewsFeaturedItem />
    <Layout justifyContent='center' width='100%'>
      <Column maxWidth={['90%', '90%', '1200px']} width='100%'>
        <Layout flexBasis={['24px', '30px', '63px']} />
        <Divider color='whiteGray' />
        <Layout flexBasis={['16px', '30px', '63px']} />
      </Column>
    </Layout>
    <NewsGrid isMobile={isMobile} isTablet={isTablet} />
  </>
)

export default injectIntl(News)
