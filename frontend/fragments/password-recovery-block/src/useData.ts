import gql from 'graphql-tag'

const mutation = gql`
  mutation postUsersRestore($usersRestoreInput: UsersRestoreInput!) {
    postUsersRestore(usersRestoreInput: $usersRestoreInput) {
      success
    }
  }
`

export const useData = async (client, email) => {
  const { errors, data } = await client.mutate({
    mutation,
    errorPolicy: 'all',
    variables: {
      usersRestoreInput: {
        email,
      },
    },
  })

  return {
    data: data && data.postUsersRestore,
    errors:
      errors &&
      errors[0] &&
      errors[0].extensions &&
      errors[0].extensions.responseBody &&
      errors[0].extensions.responseBody.errors &&
      errors[0].extensions.responseBody.errors[0],
  }
}
