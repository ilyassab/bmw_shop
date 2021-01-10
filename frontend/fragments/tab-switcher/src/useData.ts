import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query Menu {
    menu(xSiteId: S1) {
      code
      items {
        name
        slug
      }
    }
  }
`

export const useData = () => {
  const [menuState, setMenuState] = useState([])
  const [currentMenu, setCurrentMenu] = useState('lifestyle')

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({ query })
        const menu = data.menu.find(item => item.code === 'main')
        const menuItems = menu && menu.items
        setMenuState(menuItems)
      } catch {
        setMenuState([])
      }
    }
    fetchQuery()
  }, [])

  return {
    menuState,
    currentMenu,
    setCurrentMenu,
  }
}
