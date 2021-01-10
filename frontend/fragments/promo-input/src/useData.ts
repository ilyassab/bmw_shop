import gql from 'graphql-tag'

const deleteMutation = gql`
  mutation mutationViewerAnyAuth(
    $apiKey: String
    $xBasketId: String
    $basketRequestInput: BasketRequestInput
    $xCity: String!
  ) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      putCart(
        xBasketId: $xBasketId
        basketRequestInput: $basketRequestInput
        xCity: $xCity
        xSiteId: S1
      ) {
        basketId
        promocodeData {
          coupon
          description
        }
        items {
          amount
          vendorCode
          category
          description
          iblock
          images
          name
          offerId
          oldPrice
          price
          quantity
          slug
        }
        totalAmount
        totalOldPrice
        totalPrice
      }
    }
  }
`

const putMutation = gql`
  mutation mutationViewerAnyAuth(
    $apiKey: String
    $xBasketId: String
    $basketRequestInput: BasketRequestInput
    $xCity: String!
  ) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      putCart(
        xBasketId: $xBasketId
        basketRequestInput: $basketRequestInput
        xCity: $xCity
        xSiteId: S1
      ) {
        basketId
        promocodeData {
          coupon
          description
        }
        items {
          amount
          vendorCode
          category
          description
          iblock
          images
          name
          offerId
          oldPrice
          price
          quantity
          slug
        }
        totalAmount
        totalOldPrice
        totalPrice
      }
    }
  }
`

export const usePutInCart = async (client, promocode, xCity, xBasketId, apiKey) => {
  const { data, errors } = await client.mutate({
    mutation: putMutation,
    errorPolicy: 'all',
    variables: {
      xBasketId,
      xCity,
      basketRequestInput: {
        promocode,
      },
      apiKey,
    },
  })

  return {
    data: data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putCart,
    errors,
  }
}

export const useDeleteInCart = async (client, promocode, xCity, xBasketId, apiKey) => {
  const { data } = await client.mutate({
    mutation: deleteMutation,
    variables: {
      xBasketId,
      basketRequestInput: {
        promocode,
      },
      xCity,
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putCart
}
