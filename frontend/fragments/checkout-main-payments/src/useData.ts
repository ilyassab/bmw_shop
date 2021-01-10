import gql from 'graphql-tag'

const query = gql`
  query payments($delivery: Int!) {
    payments(delivery: $delivery, xSiteId: S1) {
      id
      name
    }
  }
`

export const useData = async (client, delivery) => {
  const { data } = await client.query({
    query,
    variables: {
      delivery,
    },
  })

  return data && data.payments
}
