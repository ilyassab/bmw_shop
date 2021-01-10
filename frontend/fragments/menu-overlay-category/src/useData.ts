import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query Menu {
    menu(xSiteId: S1) {
      code
      items {
        anchor
        filter
        items {
          anchor
          filter
          name
          url
          items {
            anchor
            filter
            name
            url
            items {
              anchor
              filter
              name
              url
            }
          }
        }
        name
        openInNewWindow
        slug
        url
      }
    }
  }
`

export const useData = () => {
  const [menuData, setMenuData] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({ query })
        const menu = data.menu.find(item => item.code === 'main')
        const menuItems = menu && menu.items
        setMenuData(menuItems)
      } catch {
        setMenuData([])
      }
    }
    fetchQuery()
  }, [])

  return {
    menu: menuData,
  }
}
