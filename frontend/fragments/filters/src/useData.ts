import gql from 'graphql-tag'

export const query = gql`
  query Filters($iblock: Iblock!, $category: String, $filter: String) {
    filter(xSiteId: S1, iblock: $iblock, category: $category, filter: $filter) {
      items {
        title
        key
        type
        items {
          cONTROLID
          count
          selected
          value
        }
      }
      prices {
        title
        key
        items {
          max
          min
        }
      }
    }
  }
`

// TODO вынести useEffect, оставить только работу с данными

export const useData = async (client, block, category, filter) => {
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      iblock: block.toUpperCase(),
      category,
      filter,
    },
  })

  return data && data.filter
}
