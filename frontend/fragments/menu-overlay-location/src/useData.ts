import gql                               from 'graphql-tag'
import { useApolloClient }               from '@apollo/react-hooks'
import { useEffect, useState }           from 'react'

import { useCityDispatch, useCityState } from '@store/stores'

export const query = gql`
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
  const { state } = useCityState()

  const client = useApolloClient()

  useEffect(() => {
    if (!state.city.name) {
      const fetchQuery = async () => {
        try {
          const { data } = await client.query({ query })
          const currentCityData = data && data.geolocation
          dispatch({ type: 'changeCity', payload: currentCityData })
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
    }
  }, [])

  return {
    opened,
    setOpened,
  }
}
