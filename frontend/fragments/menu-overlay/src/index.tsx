import React               from 'react'
import { useApolloClient } from '@apollo/react-hooks'

import { cookieStorage }   from '@utils/cookie-storage'

import MenuOverlayFragment from './MenuOverlay'
import { useLogOut }       from './useData'

export const MenuOverlay = props => {
  const client = useApolloClient()

  const onLogout = () => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      const data = await useLogOut(client, token)
      if (data.success) {
        cookieStorage.removeItem('userId')
        cookieStorage.removeItem('token')
        cookieStorage.removeItem('xBasketId')
        window.location.href = '/'
      }
    }
    fetchData()
  }

  return <MenuOverlayFragment {...props} onLogout={onLogout} />
}
