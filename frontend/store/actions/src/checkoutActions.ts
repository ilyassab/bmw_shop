export const checkoutActions = {
  addDeliveryId: (state, payload) => ({
    ...state,
    deliveryId: payload,
    pickpointId: '',
  }),
  addPaymentId: (state, payload) => ({
    ...state,
    paymentId: payload,
  }),
  addPickpointId: (state, payload) => ({
    ...state,
    pickpointId: payload,
  }),
}
