
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TEMP_KEY = 'FETCH_TEMP_KEY'
export const REQUEST_API_KEY = 'REQUEST_API_KEY'
export const RECEIVE_API_KEY = 'RECEIVE_API_KEY'

// ------------------------------------
// Actions
// ------------------------------------



export function requestApiKey (tempKey = null) {
  return {
    type: REQUEST_API_KEY,
    isFetching: true,
    tempKey
  }
}

export function receiveApiKey (tempKey, json) {
  return {
    type: RECEIVE_API_KEY,
    isFetching: false,
    apiKey: json.origin
  }
}

export function fetchApiKey (tempKey) {
  return dispatch => {
    dispatch(requestApiKey(tempKey))
    return fetch(`https://httpbin.org/cache`)
        .then(response => {
          return response.json()
        })
        .then(json => dispatch(receiveApiKey(tempKey, json))
            ).catch(err => console.log(err))
  }
}

export function fetchApiKeyifNeeded (tempKey) {
  return (dispatch, getState, tempKey) => {
    return dispatch(fetchApiKey(tempKey))
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS_AUTH = {
  [REQUEST_API_KEY]    : (state, action) => Object.assign({}, state, { isFetching: action.isFetching }),
  [RECEIVE_API_KEY] : (state, action) => {
    return Object.assign({}, state, { apiKey: action.apiKey, isFetching: action.isFetching })
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
