import React, { FC, useEffect, useState } from 'react'
import { Box, Column, Layout }            from '@atlantis-lab/layout'
import { useApolloClient }                from '@apollo/react-hooks'
import { useRouter }                      from 'next/router'

import { HowTo }                          from '@fragments/how-to'
import { ProductDescriptionBlock }        from '@fragments/product-description-block'
import { ProductPreview }                 from '@fragments/product-preview'
import { RelatedProducts }                from '@fragments/related-products'
import { Breadcrumbs }                    from '@ui/breadcrumbs'
import { cookieStorage }                  from '@utils/cookie-storage'

import { useData }                        from './useData'

interface Props {
  isMobile?: boolean
}

// TODO четвертый breadcrumbs с включенным фильтром по категориям

const Product: FC<Props> = ({ isMobile }) => {
  const [item, setItem] = useState({ iblockName: '', iblockCode: '', name: '', categories: [] })
  const router = useRouter()
  const itemSlug = router && router.query && router.query.item
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      const data = await useData(client, itemSlug, token)
      setItem(data)
    }
    fetchData()
  }, [])

  const firstCategoryName = item.categories && item.categories[0] && item.categories[0].name
  const firstCategorySlug = item.categories && item.categories[0] && item.categories[0].slug

  return (
    <Column flexGrow={1} overflowX='hidden'>
      <Layout flexBasis={['26px', '34px', '64px']} />
      <Layout
        width='100%'
        display={['none', 'none', 'flex']}
        maxWidth={['90%', '90%', '1200px']}
        alignSelf='center'
      >
        <Breadcrumbs
          secondText={item.iblockName}
          secondHref={`/catalog/${item.iblockCode}`}
          thirdText={firstCategoryName}
          onThirdClick={() => {
            if (router) {
              router.push(
                `/catalog/${item.iblockCode}/[slug]`,
                `/catalog/${item.iblockCode}/${firstCategorySlug}`
              )
            }
          }}
          fifthText={item.name}
        />
      </Layout>
      <Layout flexBasis={['0', '24px', '30px']} />
      <Box width='100%' flexDirection='column' justifyContent='center' backgroundColor='white'>
        <ProductPreview item={item} />
        <Layout flexBasis={['24px', '24px', '96px']} />
        <ProductDescriptionBlock />
        <Layout flexBasis={['24px', '24px', '96px']} />
        <RelatedProducts isMobile={isMobile} />
      </Box>
      <Layout flexBasis={['40px', '40px', '96px']} />
      <HowTo />
    </Column>
  )
}

export default Product
