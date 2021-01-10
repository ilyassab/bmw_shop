import React, { FC, Fragment } from 'react'
import { Box, Layout }         from '@atlantis-lab/layout'

import { CityModalItem }       from '@fragments/city-modal-item'
import { NoScrollbar }         from '@ui/no-scrollbar'

interface Item {
  code: string
  name: string
}

interface Props {
  cities?: Array<Item>
  onClose?: () => void
}

const CityModalList: FC<Props> = ({ cities, onClose }) => (
  <NoScrollbar
    flexDirection='column'
    maxHeight={['calc(100% - 143px)', 'calc(100% - 143px)', '264px']}
    width='100%'
    backgroundColor='white'
  >
    <Box flexDirection={['column', 'column', 'row']} flexWrap='wrap'>
      {cities.map((item, index) => (
        <Fragment key={`${item.name}`}>
          <Layout display={['none', 'none', 'flex']} flexBasis={index % 3 !== 0 ? '40px' : '0px'} />
          <CityModalItem item={item} onClose={onClose} />
        </Fragment>
      ))}
    </Box>
    <Layout flexBasis={['0px', '0px', '264px']} flexGrow={1} />
  </NoScrollbar>
)

export default CityModalList
