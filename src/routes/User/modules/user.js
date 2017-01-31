// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'
export const CHANGE_SALUTATION = 'CHANGE_SALUTATION'
export const CHANGE_INPUT = 'CHANGE_INPUT'
export const USER_DATA_VALIDATION = 'USER_DATA_VALIDATION'
export const GET_TEMP_JSON_DATA = 'GET_TEMP_JSON_DATA'
export const CONFIRM_USER_FORM = 'CONFIRM_USER_FORM'
export const REQUEST_USER_DATA_UPDATE = 'REQUEST_USER_DATA_UPDATE'
export const CONFIRM_USER_PROFILE_UPDATE = 'CONFIRM_USER_PROFILE_UPDATE'

import { CHANGE_DATE } from '../userElements/BirthDateForm/modules/userForm'
import { API } from '../config/formFields.config'
import { checkIfFieldIsRequired, _validateEmail } from '../config/requiredFields.config'

// ------------------------------------
// Actions User
// ------------------------------------

// Retrieving user data

/**
 * Start fetching user data asynchronously with API key
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function fetchUserProfile (tempKey = false) {
  return dispatch => {
    dispatch(requestUserProfile(tempKey))
    return fetch(`https://cdn.contentful.com/spaces/14uazph6lhos/entries/4S5Dlg7OEUMYcqokwykGUa?access_token=7eaba33955b19b4ce94d996c7f0124411eca6c16590ec25aa923ba0e73ea7850`)
        .then(response => {
          return response.json()
        })
        .then(json => dispatch(receiveUserProfile(json, dispatch))
            ).catch(err => console.log(err.message))
  }
}

function requestUserProfile (tempKey = null) {
  return {
    type: REQUEST_USER_PROFILE,
    tempKey
  }
}

/**
 * Function is called when data is fetched
 * @param {object} json
 * @return {object} action
 */
function receiveUserProfile (json, dispatch) {
  // TEST
  json.fields.registeredCompany = false
  json.fields.salutation = 'Sehr geehrter Herr Schadauer'
  json.fields.salutationCode = 13
  if (json.fields.salutationCode === 'COMPANY') {
    json.fields.taxOptOut = true
    json.fields.registeredCompany = true
  }
  if (json.fields.JSON_serialised_temp) {
    dispatch(parseJSONData(json.fields.JSON_serialised_temp))
  }
  // TEST
  json.fields.companyName = 'Red Bull GmbH'

  return {
    type: RECEIVE_USER_PROFILE,
    data: json.fields
  }
}

/**
 * Adds Start fetching user data asynchronously with API key
 * @param {string} location search string only string starting with ?firstName=john
 * @return {object} action
 */
function parseJSONData (JSONData) {
  const strippedJSONData = JSONData.replace(/(\\)(?=")/g, '')
  const parsedData = JSON.parse(strippedJSONData)
  let userObject = {}
  for (let items in parsedData) {
    // Only allow items that are set in API config
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

// Sending user data back

/**
 * Start sending updated or confirmed user data to the server
 * @param {object} userData
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function sendUserProfileUpdate (userData, apiKey) {
  return dispatch => {
    dispatch(requestUserProfileUpdate())
    return fetch(`https://cdn.contentful.com/spaces/14uazph6lhos/entries/4S5Dlg7OEUMYcqokwykGUa?access_token=7eaba33955b19b4ce94d996c7f0124411eca6c16590ec25aa923ba0e73ea7850`)
    .then(response => {
      return response.json()
    })
    .then(json => dispatch(confirmUserProfileUpdate())
    ).catch(err => console.log(err.message))
  }
}

function requestUserProfileUpdate () {
  return {
    type: REQUEST_USER_DATA_UPDATE
  }
}

function confirmUserProfileUpdate () {
  return {
    type: CONFIRM_USER_PROFILE_UPDATE
  }
}

export function changeInput (event) {
  const form = event.target.dataset.form
  // Input fields output strings rather than boolean values
  const value = event.target.value === 'true' ? true : event.target.value === 'false' ? false : event.target.value
  let errorOperation = 'deduct'
  if (form === 'email' && !_validateEmail(value) || value === '' || value === '0') {
    errorOperation = 'add'
  }
  return {
    type: CHANGE_INPUT,
    data: value,
    form: event.target.dataset.form,
    errorOperation
  }
}

export function confirmUserForm (event) {
  return {
    type: CONFIRM_USER_FORM,
    confirmedForm: true
  }
}

export function userDataValidation (props) {
  const userData = props.user.data
  let errorArray = props.user.errorArray || []
  for (let item in userData) {
    if (checkIfFieldIsRequired(item, userData, props.location.pathname) && !_isValue(userData[item])) {
      errorArray.push(item)
    }
  }
  return {
    type: USER_DATA_VALIDATION,
    userErrorArray: errorArray
  }
}

export function _isValue (value) {
  if (value === 0 || value === '0' || value === '' || value === '00' || value === '0000') {
    return false
  } else {
    return true
  }
}

function _userErrorArray (errorOperation, form, errorItems) {
  errorItems = errorItems || []
  let newErrorArray = errorItems
  if (errorOperation === 'deduct') {
    newErrorArray = errorItems.filter(function (value) {
      return value !== form
    })
  } else if (errorOperation === 'add') {
    if (errorItems.indexOf(form) === -1) {
      newErrorArray.push(form)
    }
  }
  return newErrorArray
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_USER_PROFILE]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [RECEIVE_USER_PROFILE]: (state, action) => {
    return Object.assign({}, state, { data: action.data, isFetching: false })
  },
  [CHANGE_DATE]: (state, action) => {
    let date = Object.assign({}, state)
    date.errorArray = _userErrorArray(action.errorOperation, API.BIRTH_DATE, date.errorArray)
    date.data.birthDate = action.data
    return date
  },
  [CHANGE_INPUT]: (state, action) => {
    let input = Object.assign({}, state)
    input.errorArray = _userErrorArray(action.errorOperation, action.form, input.errorArray)
    input.data[action.form] = action.data
    return input
  },
  [GET_TEMP_JSON_DATA]: (state, action) => {
    let dataTemp = Object.assign({}, state)
    dataTemp.dataTemp = action.dataTemp
    return dataTemp
  },
  [USER_DATA_VALIDATION]: (state, action) => {
    let data = Object.assign({}, state)
    data.errorArray = action.userErrorArray
    return data
  },
  [CONFIRM_USER_FORM]: (state, action) => {
    let data = Object.assign({}, state)
    data.confirmedForm = action.confirmedForm
    return data
  },
  [REQUEST_USER_DATA_UPDATE]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [CONFIRM_USER_PROFILE_UPDATE]: (state, action) => {
    return Object.assign({}, state, { data: action.data, isFetching: false })
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
