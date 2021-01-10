export const basketActions = {
  add: (state, payload) => ({
    ...state,
    ...payload,
  }),
  resetCart: () => ({
    basketId: null,
    items: [],
    totalPrice: 0,
    totalOldPrice: 0,
    totalAmount: 0,
    promocodeData: {
      description: '',
      coupon: '',
    },
    deliveryId: null,
    paymentId: null,
  }),
  addTotalPrice: (state, payload) => ({
    ...state,
    totalPrice: payload,
  }),
  addDeliveryId: (state, payload) => ({
    ...state,
    deliveryId: payload,
  }),
  addPaymentId: (state, payload) => ({
    ...state,
    paymentId: payload,
  }),
}
