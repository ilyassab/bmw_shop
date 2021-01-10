import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

import { useCityDispatch }     from '@store/stores'
import { cookieStorage }       from '@utils/cookie-storage'

export const locationQuery = gql`
  query Locations {
    geolocation {
      code
      name
    }
  }
`

export const useData = () => {
  const [opened, setOpened] = useState(false)

  const { dispatch } = useCityDispatch()
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const xCity = cookieStorage.getItem('xCity')
        if (!xCity) {
          const { data: locationData } = await client.query({ query: locationQuery })
          const currentCityData = locationData.geolocation
          dispatch({ type: 'changeCity', payload: currentCityData })
        } else {
          dispatch({ type: 'changeCity', payload: { code: xCity } })
        }
      } catch {
        dispatch({
          type: 'changeCity',
          payload: {
            name: 'Москва',
            region: 'Москва',
            code: '0000073738',
            lat: 55.754047,
            lon: 37.620405,
          },
        })
      }
    }
    fetchQuery()
  }, [])

  return {
    opened,
    setOpened,
  }
}
