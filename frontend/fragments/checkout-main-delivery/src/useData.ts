import gql from 'graphql-tag'

export const queryLocations = gql`
  query DelieveryLocation {
    deliveryLocations {
      code
      highlight
      name
      region
      lat
      lon
    }
  }
`

const query = gql`
  query delivery($xCity: String!, $xBasketId: String) {
    delivery(xBasketId: $xBasketId, xCity: $xCity, xSiteId: S1) {
      code
      id
      name
      cities {
        code
        lat
        lon
        name
      }
      pickpoints {
        addr
        code
        city
        lat
        lot
        title
      }
    }
  }
`

export const useData = async (client, xBasketId, xCity) => {
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      xBasketId,
      xCity,
    },
  })

  return data && data.delivery
}

export const useLocationsData = async client => {
  const { data } = await client.query({ query: queryLocations })

  return data && data.deliveryLocations
}
