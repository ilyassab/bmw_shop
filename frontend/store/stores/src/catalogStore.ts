import { createContext, createElement, useContext, useReducer } from 'react'

import { catalogActions }                                       from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  currentItemsAmount: null,
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const CatalogStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(catalogActions), initialState)
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

export const useCatalogState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useCatalogDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
