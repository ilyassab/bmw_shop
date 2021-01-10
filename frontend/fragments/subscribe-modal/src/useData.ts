import gql from 'graphql-tag'

export const mutation = gql`
  mutation putSubscribe(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $city: String!
    $id: Int!
  ) {
    mutationViewerAnyAuth(token: { apiKey: "NO_API_KEY" }) {
      putSubscribe(
        xSiteId: S1
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        city: $city
        id: $id
      ) {
        description
        success
      }
    }
  }
`

export const useData = async (client, firstName, lastName, phone, city, id) => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      firstName,
      lastName,
      phone,
      city,
      id,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putSubscribe
}
