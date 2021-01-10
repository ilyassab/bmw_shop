import React, { FC, useEffect, useState } from 'react'
import { Column, Layout, Row }            from '@atlantis-lab/layout'
import { useApolloClient }                from '@apollo/react-hooks'
import { useRouter }                      from 'next/router'

import { CatalogGrid }                    from '@fragments/catalog-grid'
import { Filters }                        from '@fragments/filters'
import { HowTo }                          from '@fragments/how-to'
import { Sort }                           from '@fragments/sort'
import { Text }                           from '@ui/text'

import { useData }                        from './useData'

const Mobile: FC = () => {
  const [title, setTitle] = useState('')
  const router = useRouter()
  const category = router && router.query && router.query.slug
  const client = useApolloClient()
  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client, 'LIFESTYLE')
      setTitle(data.find(item => item.slug === category).name)
    }
    fetchData()
  }, [])
  return (
    <Column flexGrow={1}>
      <Layout flexBasis='34px' />
      <Layout minHeight='25px' width='100%' maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
        <Text
          color='semiBlack'
          fontSize={['semiLarge', 'xlarge', 'xlarge']}
          fontWeight='tiny'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {title}
        </Text>
      </Layout>
      <Column width='100%' maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
        <Layout flexBasis={['24px', '24px', '24px']} />
        <Row>
          <Filters isMobile block='lifestyle' />
          <Layout flexShrink={0} flexBasis='16px' />
          <Sort isMobile />
        </Row>
        <Layout flexBasis={['16px', '16px', '16px']} />
        <CatalogGrid isMobile block='lifestyle' />
      </Column>
      <Layout flexBasis={['40px', '64px', '96px']} />
      <HowTo />
    </Column>
  )
}

export default Mobile
