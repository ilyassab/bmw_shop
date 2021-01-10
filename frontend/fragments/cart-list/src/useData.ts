import gql from 'graphql-tag'

const query = gql`
  query viewerAnyAuth($apiKey: String, $xBasketId: String) {
    viewerAnyAuth(token: { apiKey: $apiKey }) {
      cart(xBasketId: $xBasketId, xSiteId: S1) {
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
        totalOldPrice
        totalAmount
        totalPrice
      }
    }
  }
`

const deleteMutation = gql`
  mutation mutationViewerAnyAuth(
    $apiKey: String
    $xBasketId: String
    $basketRequestInput: BasketRequestInput
  ) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      deleteCart(xBasketId: $xBasketId, basketRequestInput: $basketRequestInput, xSiteId: S1) {
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
        totalOldPrice
        totalAmount
        totalPrice
      }
    }
  }
`

export const useData = async (client, xBasketId, apiKey) => {
  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
    variables: {
      xBasketId,
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.cart
}

export const usePutInCart = async (client, amount, offerId, xCity, xBasketId, apiKey) => {
  const { data } = await client.mutate({
    mutation: putMutation,
    variables: {
      xBasketId,
      xCity,
      basketRequestInput: {
        amount,
        offerId,
      },
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.putCart
}

export const useDeleteInCart = async (client, offerId, xBasketId, apiKey) => {
  const { data } = await client.mutate({
    mutation: deleteMutation,
    variables: {
      xBasketId,
      basketRequestInput: {
        offerId,
      },
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.deleteCart
}
