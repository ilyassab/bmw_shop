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
      gradient
      linkColor
      linkHoverColor
      image
      intro
      mobileImage
      slug
      text
      title
    }
  }
`

export const useData = indexBlock => {
  const [promoItemsBlock, setPromoItemsBlock] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({
          query,
          variables: {
            code: indexBlock,
          },
        })
        setPromoItemsBlock(data.getBannersCode)
      } catch {
        setPromoItemsBlock([])
      }
    }
    fetchQuery()
  }, [indexBlock])

  return {
    promoItemsBlock,
  }
}
