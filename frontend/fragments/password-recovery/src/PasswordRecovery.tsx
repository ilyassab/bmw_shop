import React                     from 'react'
import { Box, Layout }           from '@atlantis-lab/layout'

import { AuthNavigation }        from '@fragments/auth-navigation'
import { PasswordRecoveryBlock } from '@fragments/password-recovery-block'

const PasswordRecovery = () => (
  <Box
    flexDirection='column'
    width='100%'
    flexGrow={1}
    backgroundColor={['white', 'authWhite', 'authWhite']}
  >
    <AuthNavigation />
    <Layout flexBasis={['26px', '40px', '40px']} />
    <PasswordRecoveryBlock />
  </Box>
)

export default PasswordRecovery
