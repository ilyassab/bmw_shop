import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query GetBannersCode($code: String!) {
    getBannersCode(xSiteId: S1, code: $code) {
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

export const useData = currentMenu => {
  const [slides, setSlides] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        if (currentMenu.length !== 0) {
          const { data } = await client.query({
            query,
            variables: {
              code: `menu-${currentMenu}`,
            },
          })
          setSlides(data.getBannersCode)
        }
      } catch {
        setSlides([])
      }
    }
    fetchQuery()
  }, [currentMenu])

  return {
    slides,
  }
}
