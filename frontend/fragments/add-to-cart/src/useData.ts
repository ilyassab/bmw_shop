import gql from 'graphql-tag'

const query = gql`
  query viewerAnyAuth($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      usersProfile {
        email
      }
    }
  }
`

const notifyMeQuery = gql`
  mutation notifyMe($notifymeInput: NotifymeInput) {
    postNotifyme(notifymeInput: $notifymeInput) {
      success
    }
  }
`

export const useUserInformation = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.usersProfile
}

export const notifyMe = async (client, offerId, email) => {
  const { errors, data } = await client.mutate({
    mutation: notifyMeQuery,
    errorPolicy: 'all',
    variables: {
      notifymeInput: {
        email,
        id: offerId,
      },
    },
  })

  return {
    data: data && data.postNotifyme,
    errors:
      errors &&
      errors[0] &&
      errors[0].extensions &&
      errors[0].extensions.responseBody &&
      errors[0].extensions.responseBody.errors &&
      errors[0].extensions.responseBody.errors[0],
  }
}
