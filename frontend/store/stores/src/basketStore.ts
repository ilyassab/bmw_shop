import { createContext, createElement, useContext, useReducer } from 'react'

import { basketActions }                                        from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
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
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const BasketStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(basketActions), initialState)
  return createElement(
    DispatchContext.Provider,
    {
      ...props,
      value: { dispatch },
    },
    createElement(StoreContext.Provider, {
      ...props,
      value: { state },
    })
  )
}

export const useBasketState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useBasketDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
