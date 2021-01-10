import gql from 'graphql-tag'

const mutation = gql`
  mutation postSubscribe($apiKey: String, $passwordInput: PasswordInput!) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      putUsersPassword(passwordInput: $passwordInput) {
        success
      }
    }
  }
`

export const useData = async (client, oldPassword, newPassword, apiKey) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      passwordInput: {
        oldPassword,
        newPassword,
      },
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putUsersPassword
}
