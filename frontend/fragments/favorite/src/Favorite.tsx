import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'
import { useIntl }        from 'react-intl'

import { FavoriteGrid }   from '@fragments/favorite-grid'
import { HowTo }          from '@fragments/how-to'
import { Breadcrumbs }    from '@ui/breadcrumbs'
import { Text }           from '@ui/text'

import messages           from './messages'

const Favorite: FC = () => {
  const intl = useIntl()
  return (
    <Column flexGrow={1}>
      <Layout flexBasis={['34px', '34px', '64px']} />
      <Layout
        width='100%'
        display={['none', 'none', 'flex']}
        maxWidth={['90%', '90%', '1200px']}
        alignSelf='center'
      >
        <Breadcrumbs secondText={messages.favorite} />
      </Layout>
      <Layout display={['none', 'none', 'flex']} flexBasis='30px' />
      <Layout width='100%' maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
        <Text
          color='semiBlack'
          fontSize={['semiLarge', 'large', 'xlarge']}
          fontWeight='tiny'
          lineHeight='normal'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.favorite)}.
        </Text>
      </Layout>
      <Layout flexBasis={['24px', '24px', '48px']} />
      <Column alignSelf='center' maxWidth={['90%', '90%', '1200px']}>
        <FavoriteGrid />
      </Column>
      <Layout flexBasis={['40px', '40px', '96px']} />
      <HowTo />
    </Column>
  )
}

export default Favorite