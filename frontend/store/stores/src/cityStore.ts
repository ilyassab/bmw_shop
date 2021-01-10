import { createContext, createElement, useContext, useReducer } from 'react'

import { cityActions }                                          from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  city: {
    name: '',
    code: '',
    region: '',
    lat: 0,
    lon: 0,
  },
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const CityStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(cityActions), initialState)
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

export const useCityState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useCityDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
