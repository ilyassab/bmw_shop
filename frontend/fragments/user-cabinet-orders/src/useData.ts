import gql from 'graphql-tag'

const query = gql`
  query viewerAnyAuth($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      orders(xSiteId: S1) {
        date
        number
        statue
        sum
        urlPay
      }
    }
  }
`

export const useData = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.orders
}
