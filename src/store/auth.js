import { fetchUserProfile } from '../routes/User/modules/user'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TEMP_KEY = 'FETCH_TEMP_KEY'
export const REQUEST_API_KEY = 'REQUEST_API_KEY'
export const RECEIVE_API_KEY = 'RECEIVE_API_KEY'
export const REQUEST_NEW_TEMP_KEY = 'REQUEST_NEW_TEMP_KEY'
export const NEW_TEMP_KEY_SENT = 'NEW_TEMP_KEY_SENT'
export const TEMP_KEY_IS_EXPIRED = 'TEMP_KEY_IS_EXPIRED'

// ------------------------------------
// Actions
// ------------------------------------

// API Request
export function fetchApiKey (tempKey) {
  return dispatch => {
    dispatch(requestApiKey(tempKey))
    return fetch(`https://httpbin.org/cache`)
        .then(response => {
          return response.json()
        })
        .then(json => {
          console.log(tempKey)
          return dispatch(receiveApiKey(tempKey, json))
          // return dispatch(tempKeyIsExpired())
        }
            )
            .then(auth => dispatch(fetchUserProfile(auth.apiKey)))
            .catch(err => console.log(err))
  }
}

export function requestApiKey (tempKey = null) {
  return {
    type: REQUEST_API_KEY,
    tempKey
  }
}

export function receiveApiKey (tempKey, json) {
  return {
    type: RECEIVE_API_KEY,
    apiKey: json.origin
  }
}

function tempKeyIsExpired () {
  return {
    type: TEMP_KEY_IS_EXPIRED
  }
}

export function fetchApiKeyifNeeded (tempKey) {
  console.log(tempKey)
  return (dispatch, getState, tempKey) => {
    return dispatch(fetchApiKey(tempKey))
  }
}

// TempKey Request
export function sendNewTempKeyRequest (tempKey) {
  return dispatch => {
    dispatch(requestNewTempKeyPending(tempKey))
    return fetch(`https://httpbin.org/cache`)
    .then(response => {
      return response.json
    })
    .then(json => dispatch(requestNewTempKeySent(json)))
    .catch(err => console.log(err))
  }
}

function requestNewTempKeyPending (tempKey) {
  return {
    type: REQUEST_NEW_TEMP_KEY
  }
}

function requestNewTempKeySent (tempKey) {
  return {
    type: NEW_TEMP_KEY_SENT
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS_AUTH = {
  [REQUEST_API_KEY]    : (state, action) => {
    return Object.assign({}, state, { isFetching: true, tempKeyIsExpired: false, tempKey: action.tempKey, newTempKeyBy: '' })
  },
  [RECEIVE_API_KEY] : (state, action) => {
    return Object.assign({}, state, { apiKey: action.apiKey, isFetching: false, tempKeyIsExpired: false })
  },
  [REQUEST_NEW_TEMP_KEY]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [NEW_TEMP_KEY_SENT]: (state, action) => Object.assign({}, state, { isFetching: false, newTempKeyBy: state.tempKey, tempKey: '' }),
  [TEMP_KEY_IS_EXPIRED]: (state, action) => {
    return Object.assign({}, state, { tempKeyIsExpired: true, isFetching: false, apiKey: '' })
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS_AUTH[action.type]

  return handler ? handler(state, action) : state
}
