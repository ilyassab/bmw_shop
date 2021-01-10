import gql from 'graphql-tag'

const mutation = gql`
  mutation postUsersRegister($userInput: UserInput!) {
    postUsersRegister(userInput: $userInput) {
      token
      userId
    }
  }
`

export const useData = async (client, email, password, firstName, secondName) => {
  const { errors, data } = await client.mutate({
    mutation,
    errorPolicy: 'all',
    variables: {
      userInput: {
        email,
        firstName,
        password,
        secondName,
      },
    },
  })

  return {
    data: data && data.postUsersRegister,
    errors:
      errors &&
      errors[0] &&
      errors[0].extensions &&
      errors[0].extensions.responseBody &&
      errors[0].extensions.responseBody.errors,
  }
}
