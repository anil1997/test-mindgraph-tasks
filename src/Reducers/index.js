import { combineReducers } from 'redux'
import callReducer from './callReducer';

const appReducer = combineReducers({ callReducer })

const rootReducer = (state, action) => {

   return appReducer(state, action)
}

export default rootReducer