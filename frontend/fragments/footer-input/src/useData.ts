import gql from 'graphql-tag'

export const mutation = gql`
  mutation postSubscribe($email: String!) {
    mutationViewerAnyAuth(token: { apiKey: "NO_API_KEY" }) {
      postSubscribe(xSiteId: S1, email: $email) {
        id
        success
      }
    }
  }
`

export const useData = async (client, email) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      email,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.postSubscribe
}
