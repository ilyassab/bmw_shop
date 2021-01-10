import gql from 'graphql-tag'

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
        totalAmount
        totalOldPrice
        totalPrice
      }
    }
  }
`

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
