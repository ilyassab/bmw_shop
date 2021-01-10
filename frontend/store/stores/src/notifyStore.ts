import { createContext, createElement, useContext, useReducer } from 'react'

import { notifyActions }                                        from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  items: [],
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const NotifyStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(notifyActions), initialState)
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

export const useNotifyState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useNotifyDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
