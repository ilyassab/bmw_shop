import gql from 'graphql-tag'

const mutation = gql`
  mutation postSubscribe($apiKey: String, $userDataInput: UserDataInput!) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      putUsersProfile(userDataInput: $userDataInput) {
        city
        email
        firstName
        flat
        house
        phone
        salutation
        secondName
        street
      }
    }
  }
`

const query = gql`
  query viewerAnyAuth($apiKey: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      usersProfile {
        city
        email
        firstName
        flat
        house
        phone
        salutation
        secondName
        street
      }
    }
  }
`

export const useUserInformation = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.usersProfile
}

export const useData = async (
  client,
  email,
  firstName,
  secondName,
  phone,
  salutation,
  city,
  flat,
  house,
  street,
  apiKey
) => {
  const { errors, data } = await client.mutate({
    mutation,
    errorPolicy: 'all',
    variables: {
      userDataInput: {
        email,
        firstName,
        secondName,
        phone,
        salutation,
        city,
        flat,
        house,
        street,
      },
      apiKey,
    },
  })

  return {
    data: data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putUsersProfile,
    errors:
      errors &&
      errors[0] &&
      errors[0].extensions &&
      errors[0].extensions.responseBody &&
      errors[0].extensions.responseBody.errors,
  }
}
