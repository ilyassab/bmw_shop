import React, { FC }                    from 'react'
import { Column, Layout }               from '@atlantis-lab/layout'

import { CityModal }                    from '@fragments/city-modal'
import { Divider }                      from '@ui/divider'
import { ArrowBottomIcon, CityPinIcon } from '@ui/icons'
import { Text }                         from '@ui/text'
import { useCityState }                 from '@store/stores'

import { useData }                      from './useData'

interface Props {
  setLocationOpened?: (arg0?: boolean) => void
}

const MenuOverlayLocation: FC<Props> = ({ setLocationOpened }) => {
  const { opened, setOpened } = useData()
  const { state } = useCityState()

  return (
    <>
      <Column
        onClick={() => {
          setLocationOpened(true)
          setOpened(true)
        }}
      >
        <Divider color='whiteGray' />
        <Layout flexBasis='16px' />
        <Layout maxWidth='90%' alignSelf='center' width='100%' alignItems='center'>
          <CityPinIcon width='10px' height='14px' />
          <Layout flexBasis='6px' />
          <Text fontSize='small' fontWeight='normal' color='dustyGray'>
            {state.city.name}
          </Text>
          <Layout flexGrow={1} />
          <ArrowBottomIcon width='10px' height='6px' />
        </Layout>
        <Layout flexBasis='16px' />
        <Divider color='whiteGray' />
      </Column>
      <CityModal
        isMobile
        onClose={() => {
          setOpened(false)
          setLocationOpened(false)
        }}
        opened={opened}
      />
    </>
  )
}

export default MenuOverlayLocation
