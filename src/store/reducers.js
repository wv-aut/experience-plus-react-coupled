import { combineReducers } from 'redux'
import locationReducer from './location'
import authReducer from './auth'
import profileReducer from '../routes/Profile/modules/profile'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    initLocation: locationReducer,
    profile: profileReducer,
    auth: authReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
