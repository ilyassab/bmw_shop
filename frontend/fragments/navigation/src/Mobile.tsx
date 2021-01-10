import React, { FC, useEffect, useState }                      from 'react'
import { Box, Layout }                                         from '@atlantis-lab/layout'
import { useApolloClient }                                     from '@apollo/react-hooks'

import { CartModal }                                           from '@fragments/cart-modal'
import { MenuOverlay }                                         from '@fragments/menu-overlay'
import { BmwLogoIcon, BurgerMenuIcon, CartIcon, FavoriteIcon } from '@ui/icons'
import { NextLink }                                            from '@ui/link'
import { Navigation }                                          from '@ui/navigation'
import { useCityDispatch, useCityState }                       from '@store/stores'
import { cookieStorage }                                       from '@utils/cookie-storage'

import { useDelivery, useGeolocation }                         from './useData'

const Mobile: FC = () => {
  const [overlayOpened, setOverlayOpened] = useState(false)
  const [cartOpened, setCartOpened] = useState(false)
  const [cities, setCities] = useState([])
  const client = useApolloClient()
  const { dispatch: cityDispatch } = useCityDispatch()
  const { state: cityState } = useCityState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useDelivery(client)
        setCities(data)
      } catch {
        setCities([])
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xCity = cookieStorage.getItem('xCity')
        if (!xCity) {
          const data = await useGeolocation(client)
          cookieStorage.setItem('xCity', data.code)
          cityDispatch({ type: 'changeCity', payload: data })
        } else {
          cityDispatch({ type: 'changeCity', payload: { code: xCity } })
        }
      } catch {
        cityDispatch({
          type: 'changeCity',
          payload: {
            name: 'Москва',
            region: 'Москва',
            code: '0000073738',
            lat: 55.754047,
            lon: 37.620405,
          },
        })
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (cityState.city.code) {
      const ownCityObject = cities.find(item => item.code === cityState.city.code)
      if (ownCityObject) {
        cityDispatch({ type: 'changeCity', payload: ownCityObject })
      }
    }
  }, [cityState.city.code, cities])

  return (
    <Navigation size='small' fixed>
      <Box boxShadow='gray' alignItems='center' backgroundColor='white' width='100%' height='60px'>
        <Layout flexBasis={['20px', '24px', '24px']} />
        <BurgerMenuIcon width='20px' height='16px' onClick={() => setOverlayOpened(true)} />
        <Layout flexBasis={['20px', '34px', '34px']} />
        <CartIcon width='20px' height='20px' onClick={() => setCartOpened(true)} />
        <Layout flexBasis={['20px', '34px', '34px']} />
        <NextLink href='/favorite'>
          <FavoriteIcon width='20px' height='20px' />
        </NextLink>
        <Layout flexGrow={1} />
        <NextLink href='/'>
          <BmwLogoIcon width='42px' height='42px' />
        </NextLink>
        <Layout flexBasis={['15px', '24px', '24px']} />
      </Box>
      <MenuOverlay onClose={() => setOverlayOpened(false)} opened={overlayOpened} />
      <CartModal onClose={() => setCartOpened(false)} opened={cartOpened} />
    </Navigation>
  )
}

export default Mobile
