import gql from 'graphql-tag'

const query = gql`
  query viewerAnyAuth($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      usersLogout {
        success
      }
    }
  }
`

export const useLogOut = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.usersLogout
}
