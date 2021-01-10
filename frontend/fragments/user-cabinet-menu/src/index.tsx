import React      from 'react'
import { Layout } from '@atlantis-lab/layout'

import Desktop    from './Desktop'
import Mobile     from './Mobile'

export const UserCabinetMenu = ({ currentMenu, setCurrentMenu }) => (
  <>
    <Layout display={['none', 'none', 'flex']}>
      <Desktop currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
    </Layout>
    <Layout display={['flex', 'flex', 'none']}>
      <Mobile currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
    </Layout>
  </>
)
