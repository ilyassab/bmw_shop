import React, { FC, Fragment } from 'react'
import { Layout }              from '@atlantis-lab/layout'

import { NavLink }             from '@ui/link'
import { NoScrollbar }         from '@ui/no-scrollbar'
import { Text }                from '@ui/text'

import { useData }             from './useData'

interface Props {
  onClick?: (arg0: string, arg1?: string) => void
  isMobile?: boolean
}

const TabSwitcher: FC<Props> = ({ onClick, isMobile }) => {
  const { menuState: menu, currentMenu, setCurrentMenu } = useData()

  return (
    <NoScrollbar height='40px' alignItems='center' width='100%' overflow='auto'>
      {menu.map(item => (
        <Fragment key={item.name}>
          <NavLink
            color='semiBlack'
            hoverColor='blue'
            onClick={() => {
              if (currentMenu !== item.slug) {
                onClick(item.slug, item.name)
              }
              setCurrentMenu(item.slug)
            }}
            mobile={isMobile}
            active={currentMenu === item.slug}
          >
            <Text color='inherit' fontSize='medium' lineHeight='extra'>
              {item.name}
            </Text>
          </NavLink>
          <Layout flexShrink={0} flexBasis='21px' />
        </Fragment>
      ))}
    </NoScrollbar>
  )
}

export default TabSwitcher
