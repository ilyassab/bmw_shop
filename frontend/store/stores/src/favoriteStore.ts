import { createContext, createElement, useContext, useReducer } from 'react'

import { favoriteActions }                                      from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  items: [],
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const FavoriteStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(favoriteActions), initialState)
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

export const useFavoriteState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useFavoriteDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
