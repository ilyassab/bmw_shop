import gql                               from 'graphql-tag'
import { useApolloClient }               from '@apollo/react-hooks'
import { useEffect, useState }           from 'react'

import { useCityDispatch, useCityState } from '@store/stores'

export const query = gql`
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

export const useData = () => {
  const [filteredCities, setFilteredCities] = useState([])
  const [initialCities, setInitialCities] = useState([])
  const [cities, setCities] = useState([])
  const { dispatch: cityDispatch } = useCityDispatch()
  const { state: cityState } = useCityState()
  const client = useApolloClient()

  const citiesFilter = inputText => {
    const newCities = cities
      .filter(item => item.name.toLowerCase().includes(inputText))
      .slice(0, 24)
    if (inputText.length !== 0) {
      setFilteredCities(newCities)
    } else {
      setFilteredCities(cities.slice(0, 24))
    }
  }

  useEffect(() => {
    if (cityState.city.code) {
      const ownCityObject = cities.find(item => item.code === cityState.city.code)
      if (ownCityObject) {
        cityDispatch({ type: 'changeCity', payload: ownCityObject })
      }
    }
  }, [cityState.city.code, cities])

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({ query })
        setCities(data.deliveryLocations)
        setFilteredCities(data.deliveryLocations.slice(0, 24))
        setInitialCities(data.deliveryLocations.slice(0, 24))
      } catch {
        setCities([])
        setFilteredCities([])
        setInitialCities([])
      }
    }
    fetchQuery()
  }, [])

  return {
    filteredCities,
    initialCities,
    citiesFilter,
  }
}
