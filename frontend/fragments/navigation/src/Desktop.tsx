import React, { FC, Fragment, useEffect, useState }  from 'react'
import { Box, Layout }                               from '@atlantis-lab/layout'
import { useRouter }                                 from 'next/router'

import { CartNotifyPopup }                           from '@fragments/cart-notify-popup'
import { CartPopup }                                 from '@fragments/cart-popup'
import { MegaMenu }                                  from '@fragments/mega-menu'
import { SearchInput }                               from '@fragments/search-input'
import { Condition }                                 from '@ui/condition'
import {
  BmwLogoIcon,
  CartIcon,
  EnterIcon,
  FavoriteIcon,
  UserIcon,
  WhiteBmwLogoIcon,
} from '@ui/icons'
import { IconsManager }                              from '@ui/icons-manager'
import { Nav, NextLink }                             from '@ui/link'
import { Navigation }                                from '@ui/navigation'
import { Text }                                      from '@ui/text'
import { useNavigationDispatch, useNavigationState } from '@store/stores'
import { cookieStorage }                             from '@utils/cookie-storage'
import { useScroll }                                 from '@utils/scroll'

import { useData }                                   from './useData'

const Desktop: FC = () => {
  const { menu, currentMenuItem, setCurrentMenuItem } = useData()
  const [cartPopupOpened, setCartPopupOpened] = useState(false)
  const [token, setToken] = useState('')
  const scrollTop = useScroll(0)
  const { dispatch } = useNavigationDispatch()
  const { state } = useNavigationState()
  const router = useRouter()
  useEffect(() => {
    setToken(cookieStorage.getItem('token') || '')
  }, [])

  useEffect(() => {
    if (
      scrollTop === 0 &&
      state.transparent === false &&
      !state.hovered &&
      router &&
      router.pathname === '/'
    ) {
      dispatch({ type: 'setTransparent', payload: { transparent: true } })
    } else if (scrollTop > 0 && state.transparent === true) {
      dispatch({ type: 'setTransparent', payload: { transparent: false } })
    }
  }, [
    scrollTop,
    state.topNavHeight,
    state.transparent,
    state.hovered,
    router && router.pathname,
    dispatch,
  ])

  return (
    <Navigation
      size='normal'
      fixed
      top={
        (state.transparent === true && scrollTop !== 0) || scrollTop === 0
          ? state.topNavHeight
          : '0px'
      }
      dispatch={dispatch}
      setCurrentMenuItem={setCurrentMenuItem}
      transparent={state.transparent}
      backgroundColor={state.transparent === true ? 'transparent' : 'white'}
    >
      <Box
        width='100%'
        boxShadow={state.transparent === true ? 'transparent' : 'navigationShadow'}
        justifyContent='center'
      >
        <Box
          maxWidth={['90%', '90%', '1200px']}
          width='100%'
          height='72px'
          alignSelf='center'
          alignItems='center'
        >
          {menu.map(item => (
            <Fragment key={item.name}>
              <Nav
                href={item.url}
                as={item.url}
                color={state.transparent === true ? 'white' : 'semiBlack'}
                hoverColor='blue'
                onMouseEnter={() => setCurrentMenuItem(item.slug)}
              >
                <Text color='inherit' fontSize='medium' lineHeight='extra'>
                  {item.name}
                </Text>
              </Nav>
              <Layout flexBasis='21px' />
            </Fragment>
          ))}
          <Condition match={menu.length === 0}>
            <Box width='420px' />
          </Condition>
          <Layout flexBasis='7px' />
          <Box
            width='1px'
            height='21px'
            backgroundColor={state.transparent === true ? 'transparentWhite' : 'dividerGray'}
          />
          <Layout flexBasis='28px' />
          <SearchInput transparent={state.transparent} />
          <Layout flexGrow={1} height='100%' onMouseEnter={() => setCurrentMenuItem('')} />
          {!token && (
            <>
              <NextLink href='/login'>
                <IconsManager color={state.transparent === true ? 'white' : ''}>
                  <EnterIcon width='20px' height='20px' />
                </IconsManager>
              </NextLink>
            </>
          )}
          {token && (
            <NextLink href='/user-cabinet'>
              <IconsManager color={state.transparent === true ? 'white' : ''}>
                <UserIcon width='20px' height='20px' />
              </IconsManager>
            </NextLink>
          )}
          {token && (
            <>
              <Layout flexBasis='20px' />
              <NextLink href='/favorite'>
                <IconsManager color={state.transparent === true ? 'white' : ''}>
                  <FavoriteIcon width='20px' height='20px' />
                </IconsManager>
              </NextLink>
            </>
          )}
          <Box
            position='relative'
            padding='0 21px'
            height='100%'
            alignItems='center'
            onMouseLeave={() => setCartPopupOpened(false)}
          >
            <NextLink href='/cart'>
              <IconsManager color={state.transparent === true ? 'white' : ''}>
                <CartIcon
                  onMouseEnter={() => setCartPopupOpened(true)}
                  color={state.transparent === true ? 'white' : ''}
                  width='20px'
                  height='20px'
                />
              </IconsManager>
            </NextLink>
            <CartPopup opened={cartPopupOpened} />
            <CartNotifyPopup />
          </Box>
          <NextLink href='/'>
            <Condition match={!state.transparent}>
              <IconsManager>
                <BmwLogoIcon width='42px' height='42px' />
              </IconsManager>
            </Condition>
            <Condition match={state.transparent}>
              <IconsManager>
                <WhiteBmwLogoIcon width='42px' height='42px' />
              </IconsManager>
            </Condition>
          </NextLink>
        </Box>
      </Box>
      <MegaMenu currentMenuItem={currentMenuItem} />
    </Navigation>
  )
}

export default Desktop
