import gql from 'graphql-tag'

const query = gql`
  query newProducts(
    $page: Int
    $sortOrder: SortOrder
    $perPage: Int
    $sortBy: String
    $apiKey: String
  ) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      newProducts(
        xSiteId: S1
        sortOrder: $sortOrder
        sortBy: $sortBy
        page: $page
        perPage: $perPage
      ) {
        items {
          category
          categoryName
          detailPageUrl
          iblock
          id
          images
          isDiscount
          isHit
          isNew
          name
          offers {
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
            vendorCode
          }
          oldPrice
          price
          quantity
          slug
        }
        page
        pages
        perPage
        total
      }
    }
  }
`

export const useData = async (client, perPage, page, sortOrder, apiKey) => {
  if (sortOrder) {
    const { data } = await client.query({
      query,
      fetchPolicy: 'no-cache',
      variables: {
        page,
        perPage,
        sortOrder,
        sortBy: 'CATALOG_PRICE_1',
        apiKey,
      },
    })

    return data && data.viewerAnyAuth.newProducts
  }
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      page,
      perPage,
      apiKey,
    },
  })

  return data && data.viewerAnyAuth.newProducts
}
