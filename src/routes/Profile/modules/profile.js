// ------------------------------------
// Constants
// ------------------------------------

import { CHANGE_DATE } from '../profileElements/BirthDateForm/modules/profileForm'
import { API } from '../config/formFields.config'
import { checkIfFieldIsRequired, _validateEmail } from '../config/requiredFields.config'
import { API_URL, TITLES } from 'config/obelix.config'

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

// ------------------------------------
// Actions Profile
// ------------------------------------

// Retrieving profile data

/**
 * Start fetching profile data asynchronously with API key
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function fetchProfileProfile (apiKey, partnerID) {
  return dispatch => {
    dispatch(requestProfileProfile(apiKey))
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
            if (json.data.attributes.companyName) {
              json.data.attributes.taxOptOut = true
            }
            console.log(json.data.attributes)
            return dispatch(receiveProfileProfile(json.data.attributes, dispatch))
          }
        }
            ).catch(err => console.log(err))
  }
}

function requestProfileProfile (tempKey = null) {
  return {
    type: REQUEST_USER_PROFILE
  }
}

/**
 * Function is called when data is fetched
 * @param {object} json
 * @return {object} action
 */
function receiveProfileProfile (profileData, dispatch) {
  const dataTemp = profileData.tempUserData[0] || []
  dataTemp.donationSum = profileData.donationSum || null
  profileData.birthdate = profileData.birthdate || ''

  return {
    type: RECEIVE_USER_PROFILE,
    profileData,
    dataTemp
  }
}

// Sending profile data back
/**
 * Start sending updated or confirmed profile data to the server
 * @param {object} profileData
 * @param {string} apiKey
 * @return {function} dispatch
 */
export function sendProfileProfileUpdate (e, apiKey, profileData, router) {
  return dispatch => {
    dispatch(requestProfileProfileUpdate())
    const header = new Headers({
      'apikey': apiKey,
      'Content-Type': 'application/json'
    })
    const init = {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(profileData),
      mode: 'cors',
      cache: 'default'
    }
    const request = new Request(`${API_URL}donors/${profileData.partnerID}`, init)
    return fetch(request)
    .then(response => {
      // router.push('/spender/spendenbestaetigung/drucken')
      return response.json()
    })
    .then(json => dispatch(confirmProfileProfileUpdate())
    ).catch(err => console.log(err.message))
  }
}

function requestProfileProfileUpdate () {
  return {
    type: REQUEST_USER_PROFILE_UPDATE
  }
}

function confirmProfileProfileUpdate () {
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

export function changeInputWithValidation (event, props) {
  return dispatch => {
    dispatch(changeInput(event))
    dispatch(profileDataValidation(props))
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

export function confirmProfileForm (event) {
  return {
    type: CONFIRM_USER_FORM,
    confirmedForm: true
  }
}

export function profileDataValidation (props) {
  const profileData = props.profile.data
  // let errorArray = props.profile.errorArray || []
  let errorArray = []
  for (let item in profileData) {
    // SalutationCode for family is treated like 0 as family donations are deprecated
    if (checkIfFieldIsRequired(item, profileData, props.location.pathname) && !_isValue(profileData[item], item, props.profile.data.taxOptOut)) {
      errorArray.push(item)
    }
  }
  return {
    type: USER_DATA_VALIDATION,
    profileErrorArray: errorArray
  }
}

export function _isValue (value, field = '', taxOptOut = false) {
  if (field === 'salutationCode') {
    if (!taxOptOut) {
      if (value === '4' || value === 'COMPANY') {
        return false
      }
    }
  }
  if (value === 0 || value === '0' || value === '' || value === null || value === '00' || value === '0000' || value === '0000-00-00') {
    return false
  } else {
    return true
  }
}

function _profileErrorArray (errorOperation, form, errorItems) {
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
//           payload : getState().profile
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
    return Object.assign({}, state, { data: action.profileData, dataTemp: action.dataTemp, isFetching: false })
  },
  [CHANGE_DATE]: (state, action) => {
    let date = Object.assign({}, state)
    date.errorArray = _profileErrorArray(action.errorOperation, API.BIRTH_DATE, date.errorArray)
    date.data.birthdate = action.data
    return date
  },
  [CHANGE_INPUT]: (state, action) => {
    let input = Object.assign({}, state)
    input.errorArray = _profileErrorArray(action.errorOperation, action.form, input.errorArray)
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
    data.errorArray = action.profileErrorArray
    return data
  },
  [CONFIRM_USER_FORM]: (state, action) => {
    let data = Object.assign({}, state)
    data.confirmedForm = action.confirmedForm
    return data
  },
  [REQUEST_USER_PROFILE_UPDATE]: (state, action) => {
    let profile = Object.assign({}, state)
    profile.isFetching = true
    return profile
  },
  [CONFIRM_USER_PROFILE_UPDATE]: (state, action) => {
    return Object.assign({}, state, { isFetching: false })
  },
  [TITLE_TEXT_TO_TITLE_CODE]: (state, action) => {
    let profile = Object.assign({}, state)
    profile.data.titleCode = action.titleCode
    profile.data.titleText = action.titleText
    return profile
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
