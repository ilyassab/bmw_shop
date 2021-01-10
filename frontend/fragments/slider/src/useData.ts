import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query ProductList($code: String!) {
    productlist(xSiteId: S1, code: $code, page: 1, perPage: 20) {
      link {
        filter
        slug
        title
        url
      }
      title
      items {
        category
        iblock
        id
        images
        offers {
          vendorCode
          id
          isDiscount
          oldPrice
          parameters {
            code
            name
            value
          }
          price
          quantity
        }
        isDiscount
        isHit
        isNew
        label {
          color
          name
        }
        name
        oldPrice
        price
        quantity
        slug
      }
    }
  }
`

export const useData = iblock => {
  const [productList, setProductList] = useState({
    items: [],
    title: '',
    link: { title: '', url: '' },
  })
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)
        const { data } = await client.query({
          query,
          variables: {
            code: iblock,
          },
        })
        const sliderResultData = data.productlist
        setProductList(sliderResultData)
        setLoading(false)
      } catch {
        setProductList({ items: [], title: '', link: { title: '', url: '' } })
        setLoading(false)
      }
    }
    fetchQuery()
  }, [iblock])

  return {
    productList,
    loading,
  }
}
