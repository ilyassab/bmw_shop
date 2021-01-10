import gql from 'graphql-tag'

export const categoryQuery = gql`
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

// TODO вынести useEffect, оставить только работу с данными

export const useCategoryData = async (client, block, code) => {
  const { data } = await client.query({
    query: categoryQuery,
    variables: {
      iblock: block,
      code,
    },
  })

  return data && data.getCategoriesCode && data.getCategoriesCode.items
}

const query = gql`
  query Categories($iblock: Iblock!) {
    categories(iblock: $iblock) {
      items {
        name
        slug
      }
    }
  }
`

export const useData = async (client, iblock) => {
  const { data } = await client.query({
    query,
    variables: {
      iblock,
    },
  })

  return data && data.categories && data.categories.items
}
