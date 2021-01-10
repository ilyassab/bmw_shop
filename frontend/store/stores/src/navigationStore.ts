import { createContext, createElement, useContext, useReducer } from 'react'

import { navigationActions }                                    from '@store/actions'

import { reducer }                                              from './reducer'

const initialState = {
  transparent: false,
  hovered: false,
  topNavHeight: 0,
}

const StoreContext = createContext(initialState)
const DispatchContext = createContext(() => {})

export const NavigationStoreProvider = props => {
  const [state, dispatch] = useReducer(reducer(navigationActions), initialState)
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

export const useNavigationState = () => {
  const { state }: any = useContext(StoreContext)
  return { state }
}

export const useNavigationDispatch = () => {
  const { dispatch }: any = useContext(DispatchContext)
  return { dispatch }
}
