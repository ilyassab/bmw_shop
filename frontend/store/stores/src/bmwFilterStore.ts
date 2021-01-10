import { createContext, createElement, useContext, useReducer } from 'react'

import { bmwFilterActions }                                     from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  series: [],
  carcases: [],
  models: [],
  currentSeries: '',
  currentCarcase: '',
  currentModel: '',
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const bmwFilterStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(bmwFilterActions), initialState)
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

export const useBmwFilterState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useBmwFilterDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
