import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

interface NewsFeaturedItemProps {
  name?: string
  description?: string
  date?: string
  views?: number
  fullImage?: string
  id?: number
}

export const query = gql`
  query NewsFeatured {
    newsFeatured(xSiteId: S1) {
      date
      description
      fullImage
      h1
      id
      name
      title
      views
    }
  }
`

export const useData = () => {
  const [newsData, setNewsData] = useState<NewsFeaturedItemProps>({})

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await client.query({ query })
        setNewsData(data.newsFeatured)
      } catch (err) {
        setNewsData({})
      }
    }
    fetchQuery()
  }, [])

  return {
    data: newsData,
  }
}
