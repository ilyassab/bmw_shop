import React, { FC }       from 'react'
import { Box, Layout }     from '@atlantis-lab/layout'

import { Divider }         from '@ui/divider'
import { Text }            from '@ui/text'
import { useCityDispatch } from '@store/stores'
import { cookieStorage }   from '@utils/cookie-storage'

interface Item {
  code: string
  name: string
}

interface Props {
  item?: Item
  onClose?: () => void
}

const CityModalItem: FC<Props> = ({ item, onClose }) => {
  const { dispatch } = useCityDispatch()

  return (
    <Box
      flexDirection='column'
      maxWidth={['100%', '100%', '200px']}
      width='100%'
      overflow='hidden'
      onClick={() => {
        dispatch({ type: 'changeCity', payload: item })
        cookieStorage.setItem('xCity', item.code)
        onClose()
      }}
    >
      <Layout flexBasis={['16px', '16px', '6px']} />
      <Box width={['90%', '90%', '100%']} alignSelf='center'>
        <Box borderBottom={['none', 'none', 'dashed']}>
          <Text
            fontSize='semiMedium'
            cursor='pointer'
            lineHeight='extra'
            color='black'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            overflow='hidden'
            fontWeight={
              item.code === '0000073738' || item.code === '0000103664' ? 'semiBold' : 'normal'
            }
          >
            {item.name}
          </Text>
        </Box>
      </Box>
      <Layout flexBasis={['16px', '16px', '6px']} />
      <Layout display={['flex', 'flex', 'none']}>
        <Divider color='whiteGray' />
      </Layout>
    </Box>
  )
}

export default CityModalItem
