import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Modal }                             from '@atlantis-lab/modal'
import { MenuOverlayCategory }               from '@fragments/menu-overlay-category'
import { MenuOverlayLocation }               from '@fragments/menu-overlay-location'
import { MenuOverlayNavigation }             from '@fragments/menu-overlay-navigation'
import { SearchInput }                       from '@fragments/search-input'
import { Button }                            from '@ui/button'
import { Condition }                         from '@ui/condition'
import { UserIcon }                          from '@ui/icons'
import { NextLink }                          from '@ui/link'
import { Text }                              from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'

interface Props {
  onClose?: () => void
  onLogout?: () => void
  opened?: boolean
}

const MenuOverlay: FC<Props & WrappedComponentProps> = ({ onClose, onLogout, intl, opened }) => {
  const [locationOpened, setLocationOpened] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const closeFunc = () => {
    if (!locationOpened) {
      onClose()
    }
  }

  useEffect(() => {
    const token = cookieStorage.getItem('token')
    if (token) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <Modal
      visible={opened}
      onClose={closeFunc}
      alignItems={['flex-start', 'flex-start', 'center']}
      justifyContent='flex-end'
    >
      <Box backgroundColor='white' flexDirection='column' minHeight='100%' width='90%'>
        <Layout flexBasis='16px' />
        <Layout justifyContent='center'>
          <Column maxWidth='90%'>
            <SearchInput isMobile />
          </Column>
        </Layout>
        <Box flexBasis='16px' boxShadow='gray' />
        <MenuOverlayCategory />
        <Layout flexBasis='16px' />
        <Layout maxWidth='90%' alignSelf='center' width='100%'>
          <NextLink href='/user-cabinet' width='100%'>
            <Button width='100%' height='48px' backgroundColor='slightlyGray'>
              <UserIcon width='20px' height='20px' />
              <Text
                textTransform='uppercase'
                fontSize='small'
                lineHeight='extra'
                fontWeight='semiBold'
              >
                {intl.formatMessage(messages.personalCabinet)}
              </Text>
            </Button>
          </NextLink>
        </Layout>
        <Layout flexBasis='16px' />
        <MenuOverlayNavigation />
        <Layout flexGrow={1} flexBasis='64px' />
        <MenuOverlayLocation setLocationOpened={setLocationOpened} />
        <Condition match={loggedIn}>
          <Layout flexBasis={['24px', '24px', '25px']} />
          <Layout maxWidth='90%' alignSelf='center' width='100%'>
            <Button width='100%' height='48px' backgroundColor='lightRed' onClick={onLogout}>
              <Text
                textTransform='uppercase'
                fontSize='small'
                lineHeight='extra'
                fontWeight='semiBold'
                color='red'
              >
                {intl.formatMessage(messages.exit)}
              </Text>
            </Button>
          </Layout>
          <Layout flexBasis={['16px', '16px', '25px']} />
        </Condition>
      </Box>
    </Modal>
  )
}

export default injectIntl(MenuOverlay)
