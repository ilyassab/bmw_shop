import React, { FC, Fragment }      from 'react'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'

import { MegaMenuItem }             from '@fragments/mega-menu-item'
import { MegaMenuSlideshow }        from '@fragments/mega-menu-slideshow'
import { MenuUI }                   from '@ui/menu'
import { unique }                   from '@utils/unique'

import { useData }                  from './useData'

interface Props {
  currentMenuItem?: string
}

const MegaMenu: FC<Props> = ({ currentMenuItem }) => {
  const { wheels, lifestyle, accessories } = useData()

  /* eslint-disable no-nested-ternary */
  const menuItem =
    currentMenuItem === 'wheels'
      ? wheels
      : currentMenuItem === 'accessories'
      ? accessories
      : currentMenuItem === 'lifestyle'
      ? lifestyle
      : []

  return (
    <MenuUI
      width='100%'
      justifyContent='center'
      backgroundColor='white'
      borderTop='gray'
      position='absolute'
      boxShadow='semiGray'
      top='100%'
      open={menuItem.length !== 0}
    >
      <Column>
        <Row maxWidth='1200px' width='100%' alignSelf='center'>
          {menuItem.map(item => (
            <Fragment key={item.name}>
              <MegaMenuItem menuItem={item} />
            </Fragment>
          ))}
          <Layout flexGrow={1} />
          <Box key={unique()} flexDirection='column'>
            <MegaMenuSlideshow currentMenuItem={currentMenuItem} />
          </Box>
        </Row>
        <Layout flexBasis='40px' />
      </Column>
    </MenuUI>
  )
}

export default MegaMenu
