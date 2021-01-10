import gql from 'graphql-tag'

const favoriteQuery = gql`
  query favorites($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      favorites(xSiteId: S1) {
        items {
          id
        }
      }
    }
  }
`

const addToFavoriteMutation = gql`
  mutation addToFavorite($favoritesInput: FavoritesInput!, $apiKey: String) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      postFavorites(xSiteId: S1, favoritesInput: $favoritesInput) {
        items {
          id
        }
      }
    }
  }
`

const deleteFavoriteMutation = gql`
  mutation addToFavorite($favoritesInput: FavoritesInput!, $apiKey: String) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      deleteFavorites(xSiteId: S1, favoritesInput: $favoritesInput) {
        items {
          id
        }
      }
    }
  }
`

export const useFavorite = async (client, apiKey) => {
  const { data } = await client.query({ query: favoriteQuery, variables: { apiKey } })

  return data && data.viewerAnyAuth.favorites
}

export const addToFavorite = async (client, offerId, apiKey) => {
  const { data } = await client.mutate({
    mutation: addToFavoriteMutation,
    variables: {
      favoritesInput: {
        id: offerId,
      },
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth.postFavorites
}

export const deleteFavorite = async (client, offerId, apiKey) => {
  const { data } = await client.mutate({
    mutation: deleteFavoriteMutation,
    variables: {
      favoritesInput: {
        id: offerId,
      },
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth.deleteFavorites
}
