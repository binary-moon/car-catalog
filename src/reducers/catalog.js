import { getFeaturedCar, getMakes, getModels } from '../lib/catalogServices'

const initState = {
  makes: [],
  models: [],
  featuredCar: null,
  currentMake: null,
  filteredModels: [],
  currentModel: null,
  searchURL: ''
}

const LOAD_FEATURED_CAR = 'LOAD_FEATURED_CAR'
const LOAD_MAKES = 'LOAD_MAKES'
const LOAD_MODELS = 'LOAD_MODELS'
const UPDATE_CURRENT_MAKE = 'UPDATE_CURRENT_MAKE'
const UPDATE_FILTERED_MODELS = 'UPDATE_FILTERED_MODELS'
const UPDATE_CURRENT_MODEL = 'UPDATE_CURRENT_MODEL'
const COMPOSE_SEARCH_URL = 'COMPOSE_SEARCH_URL'

export const loadFeaturedCar = (car) => ({type: LOAD_FEATURED_CAR, payload: car})
export const loadMakes = (makes) => ({type: LOAD_MAKES, payload: makes})
export const loadModels = (models) => ({type: LOAD_MODELS, payload: models})
export const updateFilteredModels = (makeId) => ({type: UPDATE_FILTERED_MODELS, payload: makeId})
export const composeSearchURL = () => ({type: COMPOSE_SEARCH_URL, payload: null})

export const updateCurrentModel = (modelId) => {
  return (dispatch) => {
    dispatch({type: UPDATE_CURRENT_MODEL, payload: modelId})

    if (modelId) {
      dispatch(composeSearchURL())
    }
  }
}

export const updateCurrentMake = (makeId) => {
  return (dispatch) => {
    dispatch({type: UPDATE_CURRENT_MAKE, payload: makeId})
    dispatch(updateFilteredModels(makeId))

    if (!makeId) {
      dispatch(updateCurrentModel(null))
    }
  }
}

export const fetchFeaturedCar = () => {
  return (dispatch) => {
    getFeaturedCar().then(car => dispatch(loadFeaturedCar(car)))
  }
}

export const fetchMakes = () => {
  return (dispatch) => {
    getMakes().then(makes => dispatch(loadMakes(makes)))
  }
}

export const fetchModels = () => {
  return (dispatch) => {
    getModels().then(models => dispatch(loadModels(models)))
  }
}

export const resetSearch = () => {
  return (dispatch) => {
    dispatch({type: UPDATE_CURRENT_MODEL, payload: null})
    dispatch({type: UPDATE_FILTERED_MODELS, payload: []})
    dispatch({type: UPDATE_CURRENT_MAKE, payload: null})
  }
}

export const displayFeaturedCar = (featuredModel, makes, models) => {
  const foundModel = models.find(model => model.id === featuredModel.modelId)
  if (foundModel) {
    const foundMake = makes.find(make => make.id === foundModel.makeId)
    foundModel['makeName'] = foundMake.name
    return foundModel
  }

  return null
}

export const displayDetailCar = (make, model, id, makes, models) => {
  const foundModel = models.find(model =>  model.id.toString() === id)
  if (foundModel) {
    const isModelValid = (foundModel.name === model)
    const foundMake = makes.find(make => make.id === foundModel.makeId)
    const isMakeValid = (foundMake.name === make)
    foundModel['makeName'] = foundMake.name
    if (isModelValid && isMakeValid) {
      return foundModel
    }
  }

  return null
}

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_FEATURED_CAR:
      return {...state, featuredCar: action.payload}
    case LOAD_MAKES:
      return {...state, makes: action.payload}
    case LOAD_MODELS:
      return {...state, models: action.payload}
    case UPDATE_CURRENT_MAKE:
      return {...state, currentMake: action.payload ? (state.makes.find(make => make.id.toString() === action.payload)) : null}
    case UPDATE_FILTERED_MODELS:
      return {...state, filteredModels: state.models.filter(model => model.makeId.toString() === action.payload)}
    case UPDATE_CURRENT_MODEL:
      return {...state, currentModel: action.payload ? state.models.find(model => model.id.toString() === action.payload) : null}
    case COMPOSE_SEARCH_URL:
      return {
        ...state,
        searchURL: '/' + encodeURI(state.currentMake.name) +
          '/' + encodeURI(state.currentModel.name) +
          '/' + state.currentModel.id}
    default:
      return state
  }
}
