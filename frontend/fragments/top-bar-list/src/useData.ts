import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const menuQuery = gql`
  query Menu {
    menu(xSiteId: S1) {
      code
      items {
        name
        url
      }
    }
  }
`

export const useData = () => {
  const [menu, setMenu] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data: menuData } = await client.query({ query: menuQuery })
        const topMenu = menuData.menu.find(item => item.code === 'top')
        const topMenuItems = topMenu && topMenu.items
        setMenu(topMenuItems)
      } catch {
        setMenu([])
      }
    }
    fetchQuery()
  }, [])

  return {
    menu,
  }
}
