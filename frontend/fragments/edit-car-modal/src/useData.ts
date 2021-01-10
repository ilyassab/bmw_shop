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

const query = gql`
  query postCar($apiKey: String, $id: Int!) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      getCarId(xSiteId: S1, id: $id) {
        body
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

const mutation = gql`
  mutation putCar($apiKey: String, $id: Int!, $carRequestInput: CarRequestInput!) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      putCar(xSiteId: S1, id: $id, carRequestInput: $carRequestInput) {
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

export const useDataInitial = async (client, id, apiKey) => {
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      id,
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.getCarId && data.viewerAnyAuth.getCarId[0]
}

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

export const useDataPutCar = async (client, carRequestInput, id, apiKey) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      apiKey,
      id,
      carRequestInput,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putCar
}
