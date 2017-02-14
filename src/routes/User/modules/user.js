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
export const REQUEST_USER_PROFILE_UPDATE = 'REQUEST_USER_PROFILE_UPDATE'
export const CONFIRM_USER_PROFILE_UPDATE = 'CONFIRM_USER_PROFILE_UPDATE'
export const TITLE_TEXT_TO_TITLE_CODE = 'TITLE_TEXT_TO_TITLE_CODE'

import { CHANGE_DATE } from '../userElements/BirthDateForm/modules/userForm'
import { API } from '../config/formFields.config'
import { checkIfFieldIsRequired, _validateEmail } from '../config/requiredFields.config'

import { API_URL, TITLES } from 'config/obelix.config'

// ------------------------------------
// Actions User
// ------------------------------------

// Retrieving user data

/**
 * Start fetching user data asynchronously with API key
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function fetchUserProfile (apiKey, partnerID) {
  return dispatch => {
    dispatch(requestUserProfile(apiKey))
    const header = new Headers({
      'apikey': apiKey
    })
    const init = {
      method: 'GET',
      headers: header,
      mode: 'cors',
      cache: 'default'
    }
    partnerID = partnerID || 0
    const request = new Request(`${API_URL}donors/${partnerID}`, init)
    return fetch(request)
        .then(response => {
          return response.json()
        })
        .then(json => {
          if (json.status !== 401) {
            return dispatch(receiveUserProfile(json.data.attributes, dispatch))
          }
        }
            ).catch(err => console.log(err))
  }
}

function requestUserProfile (tempKey = null) {
  return {
    type: REQUEST_USER_PROFILE
  }
}

/**
 * Function is called when data is fetched
 * @param {object} json
 * @return {object} action
 */
function receiveUserProfile (userData, dispatch) {
  const dataTemp = userData.tempUserData[0] || []
  dataTemp.donationSum = userData.donationSum || null
  userData.birthdate = userData.birthdate || ''

  return {
    type: RECEIVE_USER_PROFILE,
    userData,
    dataTemp
  }
}

// Sending user data back
/**
 * Start sending updated or confirmed user data to the server
 * @param {object} userData
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function sendUserProfileUpdate (e, apiKey, userData, router) {
  return dispatch => {
    dispatch(requestUserProfileUpdate())
    const header = new Headers({
      'apikey': apiKey,
      'Content-Type': 'application/json'
    })
    const init = {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(userData),
      mode: 'cors',
      cache: 'default'
    }
    const request = new Request(`${API_URL}donors/${userData.partnerID}`, init)
    return fetch(request)
    .then(response => {
      router.push('/spender/spendenbestaetigung/drucken')
      return response.json()
    })
    .then(json => dispatch(confirmUserProfileUpdate())
    ).catch(err => console.log(err.message))
  }
}

function requestUserProfileUpdate () {
  return {
    type: REQUEST_USER_PROFILE_UPDATE
  }
}

function confirmUserProfileUpdate () {
  return {
    type: CONFIRM_USER_PROFILE_UPDATE
  }
}

export function changeTitleInput (event) {
  return dispatch => {
    dispatch(titleTextToTitleCode(event.target.value))
  }
}

function titleTextToTitleCode (titleText) {
  let titleCode = ''
  for (let i = 0; i < TITLES.length; i++) {
    if (TITLES[i]['description'] === titleText) {
      titleCode = TITLES[i]['code']
    }
  }
  return {
    type: TITLE_TEXT_TO_TITLE_CODE,
    titleText,
    titleCode
  }
}

export function changeInput (event) {
  const form = event.target.dataset.form
  let value = event.target.value

  // Input fields output strings rather than boolean values
  value = value === 'true' ? true : value === 'false' ? false : value
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
    // SalutationCode for family is treated like 0 as family donations are deprecated
    if (checkIfFieldIsRequired(item, userData, props.location.pathname) && !_isValue(userData[item], item)) {
      errorArray.push(item)
    }
  }
  return {
    type: USER_DATA_VALIDATION,
    userErrorArray: errorArray
  }
}

export function _isValue (value, field = '') {
  if (field === 'salutationCode' && (value === '4' || value === 'COMPANY')) {
    return false
  }
  if (value === 0 || value === '0' || value === '' || value === null || value === '00' || value === '0000') {
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
    return Object.assign({}, state, { data: action.userData, dataTemp: action.dataTemp, isFetching: false })
  },
  [CHANGE_DATE]: (state, action) => {
    let date = Object.assign({}, state)
    date.errorArray = _userErrorArray(action.errorOperation, API.BIRTH_DATE, date.errorArray)
    date.data.birthdate = action.data
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
  [REQUEST_USER_PROFILE_UPDATE]: (state, action) => {
    let user = Object.assign({}, state)
    user.isFetching = true
    return user
  },
  [CONFIRM_USER_PROFILE_UPDATE]: (state, action) => {
    return Object.assign({}, state, { isFetching: false })
  },
  [TITLE_TEXT_TO_TITLE_CODE]: (state, action) => {
    let user = Object.assign({}, state)
    user.data.titleCode = action.titleCode
    user.data.titleText = action.titleText
    return user
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
