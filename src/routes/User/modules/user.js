// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'
export const CHANGE_SALUTATION = 'CHANGE_SALUTATION'
export const CHANGE_INPUT = 'CHANGE_INPUT'
export const GET_TEMP_JSON_DATA = 'GET_TEMP_JSON_DATA'

import { CHANGE_DATE } from '../formElements/BirthDateForm/modules/userForm'

// ------------------------------------
// Actions User
// ------------------------------------

export function requestUserProfile (tempKey = null) {
  return {
    type: REQUEST_USER_PROFILE,
    isFetching: true,
    tempKey
  }
}

/**
 * Function is called when data is fetched
 * @param {object} json
 * @return {object} action
 */
export function receiveUserProfile (json, dispatch) {
  // TEST
  if (json.fields.salutationCode === 'COMPANY') {
    json.fields.registeredCompany = true
  }
  if (json.fields.JSON_serialised_temp) {
    dispatch(parseJSONData(json.fields.JSON_serialised_temp))
  }
  // TEST
  json.fields.companyName = 'Red Bull GmbH'
  json.fields.firstName = ''
  json.fields.email = ''
  json.fields.birthDate = ''
  return {
    type: RECEIVE_USER_PROFILE,
    isFetching: false,
    data: json.fields
  }
}

/**
 * Adds Start fetching user data asynchronously with API key
 * @param {string} location search string only string starting with ?firstName=john
 * @return {object} action
 */
import { API } from '../config/formFields.config'
export function parseJSONData (JSONData) {
  const strippedJSONData = JSONData.replace(/(\\)(?=")/g, '')
  const parsedData = JSON.parse(strippedJSONData)
  let userObject = {}
  for (let items in parsedData) {
    console.log(parsedData[items])
    for (let APIItems in API) {
      if (API[APIItems] === items) {
        userObject[items] = parsedData[items]
      }
    }
  }
  return {
    type: GET_TEMP_JSON_DATA,
    dataTemp: userObject
  }
}

/**
 * Adds Start fetching user data asynchronously with API key
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function fetchUserProfile (tempKey) {
  return dispatch => {
    dispatch(requestUserProfile(tempKey))
    return fetch(`https://cdn.contentful.com/spaces/14uazph6lhos/entries/4S5Dlg7OEUMYcqokwykGUa?access_token=7eaba33955b19b4ce94d996c7f0124411eca6c16590ec25aa923ba0e73ea7850`)
        .then(response => {
          return response.json()
        })
        .then(json => dispatch(receiveUserProfile(json, dispatch))
            ).catch(err => console.log(err))
  }
}

/**
 * Validate emails
 * @param {string} email
 * @return {boolean}
 */
function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function changeInput (event) {
  const form = event.target.dataset.form
  // Input fields output strings rather than boolean values
  const value = event.target.value === 'true' ? true : event.target.value === 'false' ? false : event.target.value
  let errorOperation = 'deduct'
  if (form === 'email' && !validateEmail(value) || value === '' || value === '0') {
    errorOperation = 'add'
  }
  return {
    type: CHANGE_INPUT,
    data: value,
    form: event.target.dataset.form,
    errorOperation: errorOperation
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type    : COUNTER_DOUBLE_ASYNC,
//           payload : getState().user
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

function _addDeductError (errorOperation, form, errorItems) {
  errorItems = errorItems || []
  let newArray = errorItems
  if (errorOperation === 'deduct') {
    newArray = errorItems.filter(function (value) {
      return value !== form
    })
  } else if (errorOperation === 'add') {
    if (errorItems.indexOf(form) === -1) {
      newArray.push(form)
    }
  }
  return newArray
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_USER_PROFILE]: (state, action) => Object.assign({}, state, { isFetching: action.isFetching }),
  [RECEIVE_USER_PROFILE]: (state, action) => {
    return Object.assign({}, state, { data: action.data, isFetching: action.isFetching })
  },
  [CHANGE_DATE]: (state, action) => {
    let date = Object.assign({}, state)
    date.data.birthDate = action.data
    return date
  },
  [CHANGE_INPUT]: (state, action) => {
    let input = Object.assign({}, state)
    input.errorItems = _addDeductError(action.errorOperation, action.form, input.errorItems)
    input.data[action.form] = action.data
    return input
  },
  [GET_TEMP_JSON_DATA]: (state, action) => {
    let dataTemp = Object.assign({}, state)
    dataTemp.dataTemp = action.dataTemp
    return dataTemp
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
