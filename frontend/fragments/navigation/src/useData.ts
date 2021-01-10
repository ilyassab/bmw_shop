import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const deliveryQuery = gql`
  query DelieveryLocation {
    deliveryLocations {
      code
      highlight
      name
      region
      lat
      lon
    }
  }
`

export const geolocationQuery = gql`
  query Locations {
    geolocation {
      code
      name
    }
  }
`

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
  const [navMenu, setNavMenu] = useState([])
  const [currentMenuItem, setCurrentMenuItem] = useState('')

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({ query })
        const menu = data.menu.find(item => item.code === 'main')
        const menuItems = menu && menu.items
        setNavMenu(menuItems)
      } catch (err) {
        setNavMenu([])
      }
    }
    fetchQuery()
  }, [])

  return {
    menu: navMenu,
    currentMenuItem,
    setCurrentMenuItem,
  }
}

export const useGeolocation = async client => {
  const { data } = await client.query({ query: geolocationQuery })

  return data && data.geolocation
}

export const useDelivery = async client => {
  const { data } = await client.query({ query: deliveryQuery })

  return data && data.deliveryLocations
}
