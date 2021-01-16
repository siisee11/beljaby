// Imports: Dependencies
import { combineReducers } from 'redux'

// Imports: Reducers
import authReducer from './authReducer'
import loadReducer from './loadReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  loadReducer: loadReducer,
})

// Exports
export default rootReducer