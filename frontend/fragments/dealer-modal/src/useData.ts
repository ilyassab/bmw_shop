import gql from 'graphql-tag'

const query = gql`
  query delivery($xCity: String!) {
    delivery(xCity: $xCity, xSiteId: S1) {
      code
      id
      name
      pickpoints {
        addr
        code
        lat
        lot
        title
      }
      cities {
        code
        lat
        lon
        name
      }
    }
  }
`

export const useData = async (client, xCity) => {
  const { data } = await client.query({
    query,
    variables: {
      xCity,
    },
  })

  return data && data.delivery
}
