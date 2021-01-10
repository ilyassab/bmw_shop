import gql from 'graphql-tag'

const queryCart = gql`
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

export const query = gql`
  query getDeliveryId($basketId: String, $id: Float!, $xCity: String!) {
    getDeliveryId(xSiteId: S1, basketId: $basketId, id: $id, xCity: $xCity) {
      price
    }
  }
`

export const useData = async (client, basketId, id, xCity) => {
  const { data } = await client.query({
    query,
    variables: {
      basketId,
      id,
      xCity,
    },
  })

  return data && data.getDeliveryId && data.getDeliveryId.price
}

export const useDataCart = async (client, xBasketId, apiKey) => {
  const { data } = await client.query({
    fetchPolicy: 'no-cache',
    query: queryCart,
    variables: {
      xBasketId,
      apiKey,
    },
  })

  return data && data.viewerAnyAuth && data.viewerAnyAuth.cart
}
