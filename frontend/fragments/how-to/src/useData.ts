import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const query = gql`
  query HowTo {
    howto(xSiteId: S1) {
      anchor
      link
      text
      title
      url
    }
  }
`

export const useData = () => {
  const [state, setState] = useState({
    items: [],
  })
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true)
        const { data } = await client.query({ query })
        setState({
          items: data.howto,
        })
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    fetchQuery()
  }, [])

  return {
    loading,
    state,
  }
}
