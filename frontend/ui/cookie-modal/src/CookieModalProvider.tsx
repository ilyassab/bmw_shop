import React           from 'react'

import { CookieModal } from './CookieModal'

export const CookieModalProvider = ({ children }) => (
  <>
    {children}
    <CookieModal />
  </>
)
