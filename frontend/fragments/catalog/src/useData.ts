import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query Products($iblock: Iblock!, $page: Int, $perPage: Int, $apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      products(xSiteId: S1, iblock: $iblock, page: $page, perPage: $perPage) {
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
          name
          oldPrice
          price
          quantity
          slug
        }
        pages
        total
      }
    }
  }
`

// TODO вынести useEffect, оставить только работу с данными

export const useData = (perPage, block, apiKey) => {
  const [state, setState] = useState({
    currentMenu: block || 'lifestyle',
    items: [],
    page: 1,
    pages: 1,
    total: 0,
  })
  const [fetchMore, setFetchMore] = useState(false)
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)
        const { data } = await client.query({
          query,
          variables: {
            iblock: state.currentMenu.toUpperCase(),
            page: state.page,
            perPage,
            apiKey,
          },
        })
        setState({
          ...state,
          items: data.viewerAnyAuth.products.items,
          page: state.page + 1,
          pages: data.viewerAnyAuth.products.pages,
          total: data.viewerAnyAuth.products.total,
        })
        setLoading(false)
      } catch {
        setState({
          ...state,
          items: [],
          page: state.page + 1,
          pages: 1,
          total: 1,
        })
        setLoading(false)
      }
    }
    fetchQuery()
  }, [fetchMore, state.currentMenu])

  return {
    state,
    loading,
    setState,
    fetchMore,
    setFetchMore,
  }
}
