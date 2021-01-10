import gql from 'graphql-tag'

const addToCartQuery = gql`
  mutation addToCart(
    $xCity: String!
    $basketRequestInput: BasketRequestInput
    $xBasketId: String
    $apiKey: String
  ) {
    mutationViewerAnyAuth(token: { apiKey: $apiKey }) {
      postCart(
        xSiteId: S1
        xCity: $xCity
        basketRequestInput: $basketRequestInput
        xBasketId: $xBasketId
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

export const addToCart = async (client, xCity, amount, offerId, xBasketId, apiKey) => {
  const basketRequestInput = { amount, offerId }

  if (xBasketId) {
    const { data } = await client.mutate({
      mutation: addToCartQuery,
      variables: {
        xCity,
        basketRequestInput,
        xBasketId,
        apiKey,
      },
    })

    return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.postCart
  }
  const { data } = await client.mutate({
    mutation: addToCartQuery,
    variables: {
      xCity,
      basketRequestInput,
      apiKey,
    },
  })

  return data && data.mutationViewerAnyAuth && data.mutationViewerAnyAuth.postCart
}

export const usePutInCart = async (client, xCity, amount, offerId, xBasketId, apiKey) => {
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
