import gql from 'graphql-tag'

const query = gql`
  query searching(
    $searchString: String
    $page: Int
    $perPage: Int
    $sortOrder: SortOrder
    $sortBy: String
  ) {
    searching(
      xSiteId: S1
      searchString: $searchString
      sortBy: $sortBy
      page: $page
      perPage: $perPage
      sortOrder: $sortOrder
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
`

export const useData = async (client, searchString, perPage, page, sortOrder) => {
  if (sortOrder) {
    const { data } = await client.query({
      query,
      fetchPolicy: 'no-cache',
      variables: {
        page,
        searchString,
        perPage,
        sortOrder,
        sortBy: 'CATALOG_PRICE_1',
      },
    })

    return data && data.searching
  }
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      page,
      searchString,
      perPage,
    },
  })

  return data && data.searching
}
