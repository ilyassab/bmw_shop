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
          style
          items {
            anchor
            filter
            name
            url
            style
            items {
              anchor
              filter
              name
              url
              style
            }
          }
        }
        name
        openInNewWindow
        slug
        style
        url
      }
    }
  }
`

// TODO useState нужно будет объеденить и абстрагировать до 1

export const useData = () => {
  const [lifestyle, setLifestyle] = useState([])
  const [wheels, setWheels] = useState([])
  const [accessories, setAccessories] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({ query })
        const menu = data.menu.find(item => item.code === 'main')
        const menuItems = menu && menu.items
        const wheelsMenu = menuItems.find(item => item.slug === 'wheels').items
        const accessoriesMenu = menuItems.find(item => item.slug === 'accessories').items
        const lifestyleMenu = menuItems.find(item => item.slug === 'lifestyle').items
        setLifestyle(lifestyleMenu)
        setWheels(wheelsMenu)
        setAccessories(accessoriesMenu)
      } catch {
        setLifestyle([])
        setWheels([])
        setAccessories([])
      }
    }
    fetchQuery()
  }, [])

  return {
    wheels,
    lifestyle,
    accessories,
  }
}
