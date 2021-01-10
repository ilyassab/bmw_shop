import gql from 'graphql-tag'

export const query = gql`
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

export const useData = async (client, block, code) => {
  const { data } = await client.query({
    query,
    variables: {
      iblock: block.toUpperCase(),
      code,
    },
  })

  return data && data.getCategoriesCode && data.getCategoriesCode.items
}
