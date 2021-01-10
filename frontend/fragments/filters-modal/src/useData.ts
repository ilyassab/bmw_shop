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

export const queryCategories = gql`
  query GetCategoriesCode($iblock: Iblock!, $code: String!) {
    getCategoriesCode(xSiteId: S1, iblock: $iblock, code: $code) {
      items {
        name
        countElements
        slug
      }
    }
  }
`

export const useData = async (client, block, category, filter) => {
  const { data } = await client.query({
    query,
    variables: {
      iblock: block.toUpperCase(),
      category,
      filter,
    },
  })

  return data && data.filter
}

export const useDataCategories = async (client, block, code) => {
  const { data } = await client.query({
    query: queryCategories,
    variables: {
      iblock: block.toUpperCase(),
      code,
    },
  })

  return data && data.getCategoriesCode && data.getCategoriesCode.items
}
