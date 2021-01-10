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

const queryCar = gql`
  query carfilter($serie: String!, $body: String!, $model: String!) {
    carfilter(xSiteId: S1, serie: $serie, body: $body, model: $model) {
      key
      value
    }
  }
`

const queryCarfilterCarcase = gql`
  query carfilterCarcase($serie: String!, $body: String!) {
    carfilterCarcase(xSiteId: S1, serie: $serie, body: $body) {
      key
      value
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

export const useDataCar = async (client, series, body, model) => {
  const { data } = await client.query({
    query: queryCar,
    variables: {
      serie: series,
      body,
      model,
    },
  })

  return data && data.carfilter
}

export const useDataCarcaseFilter = async (client, series, body) => {
  const { data } = await client.query({
    query: queryCarfilterCarcase,
    variables: {
      serie: series,
      body,
    },
  })

  return data && data.carfilterCarcase
}
