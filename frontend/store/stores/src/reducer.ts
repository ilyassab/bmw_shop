export const reducer = actions => (state, action) => {
  const act = actions[action.type]
  const update = act(state, action.payload)
  return { ...state, ...update }
}
