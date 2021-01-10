import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query GetBannersCode {
    getBannersCode(xSiteId: S1, code: "slider") {
      anchor
      buttonLink
      buttonText
      color
      filter
      image
      intro
      mobileImage
      slug
      text
      title
    }
  }
`

export const useData = () => {
  const [sliderData, setSliderData] = useState([])
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)
        const { data } = await client.query({ query })
        setSliderData(data.getBannersCode)
        setLoading(false)
      } catch {
        setSliderData([])
        setLoading(false)
      }
    }
    fetchQuery()
  }, [])

  return {
    sliderData,
    loading,
  }
}
