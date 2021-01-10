export const bmwFilterActions = {
  setSeries: (state, payload) => ({
    ...state,
    series: payload,
  }),
  setCurrentSeries: (state, payload) => ({
    ...state,
    currentSeries: payload,
  }),
  setCarcases: (state, payload) => ({
    ...state,
    carcases: payload,
  }),
  setCurrentCarcase: (state, payload) => ({
    ...state,
    currentCarcase: payload,
  }),
  setModels: (state, payload) => ({
    ...state,
    models: payload,
  }),
  setCurrentModel: (state, payload) => ({
    ...state,
    currentModel: payload,
  }),
  removeCurrentModel: state => ({
    ...state,
    currentModel: '',
  }),
  removeCurrents: state => ({
    ...state,
    carcases: [],
    models: [],
    currentModel: '',
    currentSeries: '',
    currentCarcase: '',
  }),
}
