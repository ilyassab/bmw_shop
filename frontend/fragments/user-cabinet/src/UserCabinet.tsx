import React, { FC, useEffect, useState } from 'react'
import { Box, Column, Layout }            from '@atlantis-lab/layout'
import { useRouter }                      from 'next/router'
import { injectIntl }                     from 'react-intl'

import { UserCabinetCar }                 from '@fragments/user-cabinet-car'
import { UserCabinetChangePassword }      from '@fragments/user-cabinet-change-password'
import { UserCabinetMenuExit }            from '@fragments/user-cabinet-exit'
import { UserCabinetMenu }                from '@fragments/user-cabinet-menu'
import { UserCabinetNotification }        from '@fragments/user-cabinet-notification'
import { UserCabinetOrders }              from '@fragments/user-cabinet-orders'
import { UserCabinetPersonalInformation } from '@fragments/user-cabinet-personal-information'
import { Condition }                      from '@ui/condition'
import { cookieStorage }                  from '@utils/cookie-storage'

const UserCabinet: FC = () => {
  const [currentMenu, setCurrentMenu] = useState('personalInformation')
  const router = useRouter()

  useEffect(() => {
    const token = cookieStorage.getItem('token') || ''
    if (!token && router) {
      router.push('/login')
    }
  }, [])

  return (
    <Column flexGrow={1}>
      <Layout flexBasis={['0px', '0px', '64px']} />
      <Box
        flexDirection={['column', 'column', 'row']}
        width='100%'
        maxWidth={['100%', '100%', '1200px']}
        alignSelf='center'
      >
        <Column width='auto'>
          <UserCabinetMenu currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
          <Layout flexBasis={['0px', '0px', '32px']} />
          <UserCabinetMenuExit />
        </Column>
        <Layout flexBasis={['24px', '32px', '126px']} />
        <Condition match={currentMenu === 'personalInformation'}>
          <UserCabinetPersonalInformation />
        </Condition>
        <Condition match={currentMenu === 'changePass'}>
          <UserCabinetChangePassword />
        </Condition>
        <Condition match={currentMenu === 'settings'}>
          <UserCabinetNotification />
        </Condition>
        <Condition match={currentMenu === 'history'}>
          <UserCabinetOrders />
        </Condition>
        <Condition match={currentMenu === 'cars'}>
          <UserCabinetCar />
        </Condition>
      </Box>
      <Layout flexBasis={['40px', '64px', '96px']} />
    </Column>
  )
}

export default injectIntl(UserCabinet)
