import React, { FC }                         from 'react'
import { Box }                               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { UserCabinetMenuItem }               from '@fragments/user-cabinet-menu-item'

import messages                              from './messages'

interface Props {
  currentMenu?: string
  setCurrentMenu?: (arg0?: string) => void
}

const Desktop: FC<WrappedComponentProps & Props> = ({ intl, currentMenu, setCurrentMenu }) => {
  return (
    <Box minWidth='284px' flexDirection='column' boxShadow='gray'>
      <UserCabinetMenuItem
        active={currentMenu === 'personalInformation'}
        menuName='personalInformation'
        onClick={setCurrentMenu}
      >
        {intl.formatMessage(messages.personalInformation)}
      </UserCabinetMenuItem>
      <UserCabinetMenuItem
        active={currentMenu === 'changePass'}
        menuName='changePass'
        onClick={setCurrentMenu}
      >
        {intl.formatMessage(messages.changePass)}
      </UserCabinetMenuItem>
      <UserCabinetMenuItem
        active={currentMenu === 'settings'}
        menuName='settings'
        onClick={setCurrentMenu}
      >
        {intl.formatMessage(messages.settings)}
      </UserCabinetMenuItem>
      <UserCabinetMenuItem
        active={currentMenu === 'history'}
        menuName='history'
        onClick={setCurrentMenu}
      >
        {intl.formatMessage(messages.history)}
      </UserCabinetMenuItem>
      <UserCabinetMenuItem active={currentMenu === 'cars'} menuName='cars' onClick={setCurrentMenu}>
        {intl.formatMessage(messages.cars)}
      </UserCabinetMenuItem>
    </Box>
  )
}

export default injectIntl(Desktop)
