import gql from 'graphql-tag'

const query = gql`
  query viewerAnyAuth($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      car(xSiteId: S1) {
        body
        code
        id
        dealer {
          id
          name
        }
        favorite
        model
        series
        vin
      }
    }
  }
`

const mutation = gql`
  mutation deleteCar($apiKey: String, $id: Int!) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      deleteCar(xSiteId: S1, id: $id) {
        body
        id
        code
        dealer {
          id
          name
        }
        favorite
        model
        series
        vin
      }
    }
  }
`

export const useData = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.car
}

export const useDataDeleteCar = async (client, id, apiKey) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      apiKey,
      id,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.deleteCar
}
