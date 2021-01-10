export const notifyActions = {
  add: (state, payload) => {
    const newNotifyItems = state.items.filter(item => {
      if (item.offerId === payload.offerId) {
        /* eslint-disable */
        payload.notifyQuantity = item.notifyQuantity ? item.notifyQuantity + 1 : 2
        /* eslint-enable */
      }
      return item.offerId !== payload.offerId
    })

    return {
      ...state,
      items: [...newNotifyItems, payload],
    }
  },
  deleteItems: state => {
    return {
      ...state,
      items: [],
    }
  },
}
