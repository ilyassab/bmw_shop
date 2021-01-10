import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'
import { useRouter }      from 'next/router'
import { useIntl }        from 'react-intl'

import { HowTo }          from '@fragments/how-to'
import { SearchGrid }     from '@fragments/search-grid'
import { Breadcrumbs }    from '@ui/breadcrumbs'
import { Space, Text }    from '@ui/text'

import messages           from './messages'

const Search: FC = () => {
  const intl = useIntl()
  const router = useRouter()
  const searchText = router && router.query && router.query.search

  return (
    <Column flexGrow={1}>
      <Layout flexBasis={['34px', '34px', '64px']} />
      <Layout
        width='100%'
        display={['none', 'none', 'flex']}
        maxWidth={['90%', '90%', '1200px']}
        alignSelf='center'
      >
        <Breadcrumbs secondText={messages.search} />
      </Layout>
      <Layout display={['none', 'none', 'flex']} flexBasis='30px' />
      <Layout width='100%' maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
        <Text
          color='semiBlack'
          fontSize={['semiLarge', 'large', 'xlarge']}
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          fontWeight='tiny'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.search)}:
          <Space />
          {searchText}
        </Text>
      </Layout>
      <Layout flexBasis={['24px', '24px', '48px']} />
      <Column alignSelf='center' maxWidth={['90%', '90%', '1200px']}>
        {/** @ts-ignore */}
        <SearchGrid search={searchText} />
      </Column>
      <Layout flexBasis={['40px', '40px', '96px']} />
      <HowTo />
    </Column>
  )
}

export default Search
