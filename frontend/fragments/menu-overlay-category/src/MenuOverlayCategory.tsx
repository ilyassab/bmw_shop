import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Divider }        from '@ui/divider'
import { NextLink }       from '@ui/link'

import { useData }        from './useData'

const MenuOverlayCategory: FC<{}> = () => {
  const { menu } = useData()

  return (
    <Column minHeight='205px'>
      {menu.map(item => (
        <NextLink
          key={`${item.name}`}
          fontSize='small'
          lineHeight='extra'
          fontWeight='semiBold'
          color='black'
          textTransform='uppercase'
          href={item.url}
        >
          <Column>
            <Layout flexBasis='16px' />
            <Layout maxWidth='90%' alignSelf='center' width='100%'>
              {item.name}
            </Layout>
            <Layout flexBasis='16px' />
            <Divider color='whiteGray' />
          </Column>
        </NextLink>
      ))}
    </Column>
  )
}

export default MenuOverlayCategory
