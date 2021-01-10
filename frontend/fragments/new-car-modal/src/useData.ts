import gql from 'graphql-tag'

const querySeries = gql`
  query carfilterSeries {
    carfilterSeries(xSiteId: S1) {
      items
    }
  }
`

const queryCarcases = gql`
  query carfilterBodies($serie: String!) {
    carfilterBodies(xSiteId: S1, serie: $serie) {
      items
    }
  }
`

const queryModels = gql`
  query carfilterModels($serie: String!, $body: String!) {
    carfilterModels(xSiteId: S1, serie: $serie, body: $body) {
      items
    }
  }
`

const queryDealers = gql`
  query dealers {
    dealers(xSiteId: S1) {
      id
      name
    }
  }
`

const mutation = gql`
  mutation postCar($apiKey: String, $carRequestInput: CarRequestInput!) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      postCar(xSiteId: S1, carRequestInput: $carRequestInput) {
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

export const useDataSeries = async client => {
  const { data } = await client.query({ query: querySeries })

  return data && data.carfilterSeries && data.carfilterSeries.items
}

export const useDataCarcases = async (client, series) => {
  const { data } = await client.query({
    query: queryCarcases,
    variables: {
      serie: series,
    },
  })

  return data && data.carfilterBodies && data.carfilterBodies.items
}

export const useDataModels = async (client, series, body) => {
  const { data } = await client.query({
    query: queryModels,
    variables: {
      serie: series,
      body,
    },
  })

  return data && data.carfilterModels && data.carfilterModels.items
}

export const useDataDealers = async client => {
  const { data } = await client.query({
    query: queryDealers,
  })

  return data && data.dealers
}

export const useDataPostCar = async (client, carRequestInput, apiKey) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      apiKey,
      carRequestInput,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.postCar
}
