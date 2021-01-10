import React, { FC, useEffect, useState } from 'react'
import { Column, Layout }                 from '@atlantis-lab/layout'
import { useApolloClient }                from '@apollo/react-hooks'
import { useRouter }                      from 'next/router'

import { CatalogGrid }                    from '@fragments/catalog-grid'
import { CategoryBmwBlock }               from '@fragments/category-bmw-block'
import { Filters }                        from '@fragments/filters'
import { HowTo }                          from '@fragments/how-to'
import { Breadcrumbs }                    from '@ui/breadcrumbs'
import { ResetFilters }                   from '@ui/reset-filters'
import { Text }                           from '@ui/text'

import messages                           from './messages'
import { useData }                        from './useData'

const Desktop: FC = () => {
  const [title, setTitle] = useState('')
  const router = useRouter()
  const category = router && router.query && router.query.slug
  const client = useApolloClient()
  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client, 'WHEELS')
      setTitle(data.find(item => item.slug === category).name)
    }
    fetchData()
  }, [])
  return (
    <Column flexGrow={1}>
      <Layout flexBasis={['34px', '34px', '64px']} />
      <Layout
        width='100%'
        display={['none', 'none', 'flex']}
        maxWidth={['90%', '90%', '1200px']}
        height='19px'
        alignSelf='center'
      >
        <Breadcrumbs secondText={messages.wheels} secondHref='/catalog/wheels' thirdText={title} />
      </Layout>
      <Layout display={['none', 'none', 'flex']} flexBasis='30px' />
      <Layout height='65px' width='100%' maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
        <Text
          color='semiBlack'
          fontSize={['semiLarge', 'large', 'xlarge']}
          fontWeight='tiny'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {title}
        </Text>
      </Layout>
      <Layout flexBasis={['24px', '24px', '48px']} />
      <Layout justifyContent='center' backgroundColor='white'>
        <Column width='283px'>
          <ResetFilters noMarginTop />
          <Filters block='wheels' />
        </Column>
        <Layout flexBasis='24px' />
        <Column maxWidth={['90%', '90%', '900px']} width='100%'>
          <CategoryBmwBlock />
          <Layout flexBasis='24px' />
          <CatalogGrid block='wheels' />
        </Column>
      </Layout>
      <Layout flexBasis={['40px', '40px', '96px']} />
      <HowTo />
    </Column>
  )
}

export default Desktop
