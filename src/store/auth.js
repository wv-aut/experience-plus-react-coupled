import { fetchUserProfile } from '../routes/User/modules/user'
import { API_URL } from 'config/obelix.config'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_API_KEY = 'REQUEST_API_KEY'
const RECEIVE_API_KEY = 'RECEIVE_API_KEY'
const REQUEST_NEW_TEMP_KEY = 'REQUEST_NEW_TEMP_KEY'
const NEW_TEMP_KEY_SENT = 'NEW_TEMP_KEY_SENT'
const TEMP_KEY_IS_EXPIRED = 'TEMP_KEY_IS_EXPIRED'
const NETWORK_ERROR = 'NETWORK_ERROR'
const UNKNOW_TEMP_KEY = 'UNKNOW_TEMP_KEY'

// ------------------------------------
// Actions
// ------------------------------------

// API Request
export function fetchApiKey (tempKey) {
  return dispatch => {
    dispatch(requestApiKey(tempKey))
    const header = new Headers({
      'tempaccesstoken': tempKey
    })
    const init = {
      method: 'GET',
      headers: header,
      mode: 'cors',
      cache: 'default'
    }
    const request = new Request(`${API_URL}auth/apiKey`, init)
    return fetch(request)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 401) {
            return networkError()
          }
        })
        .then(json => {
          console.log(json)
          if (json.apiKey) {
            return dispatch(receiveApiKey(json.apiKey, json.partner_id))
          } else {
            console.log(json)
            return dispatch(tempKeyIsExpired())
          }
        })
        .then(auth => {
          dispatch(fetchUserProfile(auth.apiKey, auth.partnerID))
        })
        .catch(err => {
          console.log(err.message)
          return dispatch(networkError())
        })
  }
}

function networkError () {
  return {
    type: NETWORK_ERROR
  }
}

function unknownTempKey () {
  return {
    type: UNKNOW_TEMP_KEY
  }
}

function tempKeyIsExpired () {
  return {
    type: TEMP_KEY_IS_EXPIRED
  }
}

export function requestApiKey (tempKey = null) {
  return {
    type: REQUEST_API_KEY,
    tempKey
  }
}

export function receiveApiKey (apiKey, partnerID) {
  return {
    type: RECEIVE_API_KEY,
    apiKey,
    partnerID
  }
}

export function fetchApiKeyifNeeded (tempKey) {
  return (dispatch, getState, tempKey) => {
    return dispatch(fetchApiKey(tempKey))
  }
}

// TempKey Request
export function sendNewTempKeyRequest (tempKey) {
  return dispatch => {
    dispatch(requestNewTempKeyPending(tempKey))
    const header = new Headers({
      'tempaccesstoken': tempKey
    })
    const init = {
      method: 'GET',
      headers: header,
      mode: 'cors',
      cache: 'default'
    }
    const request = new Request(`${API_URL}auth/tempToken/${tempKey}`, init)
    return fetch(request)
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(requestNewTempKeySent(json))
    })
    .catch(err => {
      dispatch(unknownTempKey())
      console.log(err)
    })
  }
}

function requestNewTempKeyPending (tempKey) {
  return {
    type: REQUEST_NEW_TEMP_KEY
  }
}

function requestNewTempKeySent (json) {
  return {
    type: NEW_TEMP_KEY_SENT,
    tempKeySentToEmail: json.email

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
    return Object.assign({}, state, { apiKey: action.apiKey, partnerID: action.partner_id, isFetching: false, tempKeyIsExpired: false })
  },
  [REQUEST_NEW_TEMP_KEY]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [NEW_TEMP_KEY_SENT]: (state, action) => Object.assign({}, state, { isFetching: false, newTempKeyBy: state.tempKey, tempKey: '', tempKeySentToEmail: action.tempKeySentToEmail }),
  [TEMP_KEY_IS_EXPIRED]: (state, action) => {
    return Object.assign({}, state, { tempKeyIsExpired: true, isFetching: false, apiKey: '' })
  },
  [NETWORK_ERROR]: (state, action) => Object.assign({}, state, { networkError: true }),
  [UNKNOW_TEMP_KEY]: (state, action) => Object.assign({}, state, { unknownTempKey: true })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS_AUTH[action.type]

  return handler ? handler(state, action) : state
}
