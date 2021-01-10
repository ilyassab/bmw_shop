import gql from 'graphql-tag'

const query = gql`
  query viewerAnyAuth($apiKey: String, $id: Int!) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      order(id: $id) {
        date
        items {
          amount
          category
          iblock
          image
          name
          offerId
          price
          slug
          vendorCode
        }
        number
        statue
        sum
        urlPay
      }
    }
  }
`

export const useData = async (client, id, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      apiKey,
      id,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.order
}
