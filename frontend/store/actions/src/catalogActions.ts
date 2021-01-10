export const catalogActions = {
  addCurrentItemsAmount: (state, payload) => ({
    ...state,
    currentItemsAmount: payload,
  }),
  resetCurrentItemsAmount: state => ({
    ...state,
    currentItemsAmount: null,
  }),
}
