import gql from 'graphql-tag'

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

const mutation = gql`
  mutation postOrders($apiKey: String, $orderRequestInput: OrderRequestInput, $xBasketId: String) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      postOrders(orderRequestInput: $orderRequestInput, xBasketId: $xBasketId, xSiteId: S1) {
        orderId
        paylink
        token
        userId
      }
    }
  }
`

export const useData = async ({
  client,
  email,
  firstName,
  lastName,
  phone,
  city,
  flat,
  promocode,
  location,
  xBasketId,
  deliveryId,
  pickpointId,
  paymentId,
  comment,
  house,
  street,
  salutation,
  apiKey,
}: any) => {
  const { data, errors } = await client.mutate({
    mutation,
    errorPolicy: 'all',
    variables: {
      orderRequestInput: {
        dealerInstallation: false,
        delivery: {
          address: {
            city,
            flat,
            house,
            street,
          },
          comment,
          deliveryId,
          location,
          pickpointId,
        },
        mobileFitting: false,
        paymentId,
        personalData: {
          email,
          firstName,
          lastName,
          phone,
          salutation,
        },
        promocode,
      },
      apiKey,
      xBasketId,
    },
  })

  return {
    data: data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.postOrders,
    errors:
      errors &&
      errors[0] &&
      errors[0].extensions &&
      errors[0].extensions.responseBody &&
      errors[0].extensions.responseBody.errors &&
      errors[0].extensions.responseBody.errors[0],
  }
}

export const useUserInformation = async (client, apiKey) => {
  const { data } = await client.query({
    query,
    variables: {
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.usersProfile
}
