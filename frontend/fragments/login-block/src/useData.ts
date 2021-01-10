import gql from 'graphql-tag'

const mutation = gql`
  mutation postUsersAuth($authObjectInput: AuthObjectInput!) {
    postUsersAuth(authObjectInput: $authObjectInput) {
      token
      userId
    }
  }
`

export const useData = async (client, email, password) => {
  const { errors, data } = await client.mutate({
    mutation,
    errorPolicy: 'all',
    variables: {
      authObjectInput: {
        email,
        password,
      },
    },
  })

  return {
    data: data && data.postUsersAuth,
    errors:
      errors &&
      errors[0] &&
      errors[0].extensions &&
      errors[0].extensions.responseBody &&
      errors[0].extensions.responseBody.errors &&
      errors[0].extensions.responseBody.errors[0],
  }
}
