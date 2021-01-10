import React, { FC, useEffect, useRef }              from 'react'
import { Box, Layout }                               from '@atlantis-lab/layout'

import { CityModal }                                 from '@fragments/city-modal'
import { TopBarList }                                from '@fragments/top-bar-list'
import { CityPinIcon }                               from '@ui/icons'
import { Navigation }                                from '@ui/navigation'
import { Text }                                      from '@ui/text'
import { useNavigationDispatch, useNavigationState } from '@store/stores'
import { useCityState }                              from '@store/stores'

import { useData }                                   from './useData'

const TopNavigation: FC = () => {
  const { opened, setOpened } = useData()
  const { state: cityState } = useCityState()
  const { dispatch } = useNavigationDispatch()
  const { state: navigationState } = useNavigationState()
  const navRef = useRef(null)

  useEffect(() => {
    dispatch({ type: 'setTopNavHeight', payload: { topNavHeight: navRef.current.offsetHeight } })
  }, [])

  return (
    <Navigation
      size='tiny'
      fixed
      dispatch={dispatch}
      transparent={navigationState.transparent}
      borderBottom='white'
      backgroundColor={navigationState.transparent ? 'transparent' : 'slightlyGray'}
    >
      <Layout justifyContent='center'>
        <Box
          maxWidth={['90%', '90%', '1200px']}
          width='100%'
          height='48px'
          ref={navRef}
          alignSelf='center'
          alignItems='center'
        >
          <CityPinIcon
            color={navigationState.transparent ? 'white' : ''}
            width='10px'
            height='13px'
          />
          <Layout flexBasis='8px' />
          <Text
            fontSize='small'
            lineHeight='normal'
            color={navigationState.transparent ? 'white' : 'dustyGray'}
            cursor='pointer'
            onClick={() => setOpened(true)}
          >
            {cityState.city.name}
          </Text>
          <Layout flexGrow={1} />
          <TopBarList />
        </Box>
      </Layout>
      <CityModal onClose={() => setOpened(false)} opened={opened} />
    </Navigation>
  )
}

export default TopNavigation
