import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Divider }        from '@ui/divider'
import { NextLink }       from '@ui/link'

import { useData }        from './useData'

const MenuOverlayNavigation: FC<{}> = () => {
  const { menu } = useData()

  return (
    <Column minHeight='110px'>
      {menu.map(item => (
        <Column key={`${item.name}`}>
          <Layout flexBasis='16px' />
          <Column maxWidth='90%' alignSelf='center' width='100%'>
            <NextLink
              fontSize='semiMedium'
              lineHeight='extra'
              fontWeight='normal'
              color='dustyGray'
              href={item.url}
            >
              {item.name}
            </NextLink>
            <Layout flexBasis='16px' />
            <Divider color='whiteGray' />
          </Column>
        </Column>
      ))}
    </Column>
  )
}

export default MenuOverlayNavigation
