import gql from 'graphql-tag'

const query = gql`
  query Products(
    $iblock: Iblock!
    $page: Int
    $sortOrder: SortOrder
    $perPage: Int
    $filter: String
    $sortBy: String
    $apiKey: String
    $category: String
  ) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      products(
        xSiteId: S1
        sortOrder: $sortOrder
        sortBy: $sortBy
        iblock: $iblock
        page: $page
        perPage: $perPage
        filter: $filter
        category: $category
      ) {
        items {
          carSeries
          category
          categoryName
          complect
          detailPageUrl
          iblock
          id
          images
          isDiscount
          isHit
          isNew
          label {
            color
            name
          }
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
        pages
        total
      }
    }
  }
`

export const useData = async (
  client,
  perPage,
  page,
  currentMenu,
  category,
  filter,
  sortOrder,
  apiKey
) => {
  if (sortOrder) {
    const { data } = await client.query({
      query,
      fetchPolicy: 'no-cache',
      variables: {
        iblock: currentMenu.toUpperCase(),
        page,
        perPage,
        filter,
        category,
        sortOrder,
        apiKey,
        sortBy: 'CATALOG_PRICE_1',
      },
    })

    return data && data.viewerAnyAuth && data.viewerAnyAuth.products
  }
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      iblock: currentMenu.toUpperCase(),
      page,
      perPage,
      filter,
      apiKey,
      category,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.products
}
