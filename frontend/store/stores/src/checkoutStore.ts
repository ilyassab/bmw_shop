import { createContext, createElement, useContext, useReducer } from 'react'

import { checkoutActions }                                      from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  deliveryId: null,
  paymentId: null,
  pickpointId: '',
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const CheckoutStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(checkoutActions), initialState)
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

export const useCheckoutState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useCheckoutDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
