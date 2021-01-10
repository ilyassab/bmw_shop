import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query Category($iblock: Iblock!) {
    categories(xSiteId: S1, iblock: $iblock) {
      items {
        slug
        name
        id
        countElements
        image
      }
    }
  }
`

export const useData = (catalogName, catalogTitle) => {
  const [state, setState] = useState({
    items: [],
    currentMenu: catalogName || 'lifestyle',
    currentMenuName: catalogTitle || 'lifestyle',
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
            iblock: state.currentMenu.toUpperCase(),
          },
        })
        setState({
          ...state,
          items: data.categories.items,
        })
        setLoading(false)
      } catch {
        setState({
          ...state,
          items: [],
        })
        setLoading(false)
      }
    }
    fetchQuery()
  }, [state.currentMenu])

  return {
    state,
    loading,
    setState,
  }
}
