import gql from 'graphql-tag'

const query = gql`
  query product($idOrSlug: String!, $apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      product(idOrSlug: $idOrSlug) {
        categories {
          id
          level
          name
          parentId
          slug
        }
        delivery
        description
        detailPageUrl
        iblockCode
        iblockName
        id
        images
        isDiscount
        isHit
        isNew
        name
        offers {
          vendorCode
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
          store {
            address
            externalId
            id
            location
            name
            phone
            quantity
            worktime
          }
        }
        relatedItems {
          category
          iblock
          id
          images
          isDiscount
          isHit
          isNew
          name
          offers {
            vendorCode
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
          }
          oldPrice
          price
          quantity
          slug
        }
        slug
      }
    }
  }
`

export const useData = async (client, idOrSlug, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      idOrSlug,
      apiKey,
    },
  })

  return (
    data &&
    data.viewerAnyAuth &&
    data.viewerAnyAuth.product &&
    data.viewerAnyAuth.product.relatedItems
  )
}
