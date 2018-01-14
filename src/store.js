import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers/catalog'

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)