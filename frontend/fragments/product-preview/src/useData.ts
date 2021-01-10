import gql from 'graphql-tag'

const query = gql`
  query product($idOrSlug: String!, $apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      product(idOrSlug: $idOrSlug) {
        sizesTable
        offers {
          id
          store {
            address
            externalId
            id
            lat
            lng
            location
            name
            phone
            quantity
            worktime
          }
        }
      }
    }
  }
`

export const useData = async (client, idOrSlug, apiKey) => {
  const { data } = await client.query({
    query,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    variables: {
      idOrSlug,
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.product
}
