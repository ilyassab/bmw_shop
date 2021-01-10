import gql from 'graphql-tag'

const mutation = gql`
  mutation mutationViewerAnyAuth($apiKey: String, $notificationsInput: [NotificationInput]!) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      putUsersNotifications(notificationsInput: $notificationsInput) {
        id
        text
        value
      }
    }
  }
`

const query = gql`
  query viewerAnyAuth($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      usersNotifications {
        id
        text
        value
      }
    }
  }
`

export const useDataPutValues = async (client, notificationsInput, apiKey) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      notificationsInput,
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putUsersNotifications
}

export const useDataGetValues = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.usersNotifications
}
