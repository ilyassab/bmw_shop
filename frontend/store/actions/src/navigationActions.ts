export const navigationActions = {
  setTransparent: (state, payload) => ({
    ...state,
    transparent: payload.transparent,
    hovered: payload.hovered,
  }),
  setTopNavHeight: (state, payload) => ({
    ...state,
    topNavHeight: payload.topNavHeight,
  }),
}
