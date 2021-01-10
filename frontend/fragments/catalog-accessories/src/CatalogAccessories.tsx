import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Catalog }        from '@fragments/catalog'
import { Category }       from '@fragments/category'
import { HowTo }          from '@fragments/how-to'
import { Promo }          from '@fragments/promo'
import { Breadcrumbs }    from '@ui/breadcrumbs'

import messages           from './messages'

const CatalogAccessories: FC = () => {
  return (
    <Column flexGrow={1}>
      <Layout flexBasis={['34px', '34px', '64px']} />
      <Layout
        width='100%'
        display={['none', 'none', 'flex']}
        maxWidth={['90%', '90%', '1200px']}
        alignSelf='center'
      >
        <Breadcrumbs secondText={messages.accessories} />
      </Layout>
      <Layout display={['none', 'none', 'flex']} flexBasis='30px' />
      <Category catalogName='accessories' catalogTitle='Аксессуары' />
      <Layout flexBasis={['40px', '40px', '96px']} />
      <Promo iblock='accessories' />
      <Layout flexBasis={['40px', '40px', '96px']} />
      <Catalog block='accessories' />
      <Layout flexBasis={['40px', '40px', '96px']} />
      <HowTo />
    </Column>
  )
}

export default CatalogAccessories
