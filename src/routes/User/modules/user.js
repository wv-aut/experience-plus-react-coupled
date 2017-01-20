// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'
export const CHANGE_SALUTATION = 'CHANGE_SALUTATION'
export const CHANGE_INPUT = 'CHANGE_INPUT'

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

export function receiveUserProfile (tempKey, json) {
  return {
    type: RECEIVE_USER_PROFILE,
    isFetching: false,
    data: json.fields
  }
}

export function fetchUserProfile (tempKey) {
  return dispatch => {
    dispatch(requestUserProfile(tempKey))
    return fetch(`https://cdn.contentful.com/spaces/14uazph6lhos/entries/4S5Dlg7OEUMYcqokwykGUa?access_token=7eaba33955b19b4ce94d996c7f0124411eca6c16590ec25aa923ba0e73ea7850`)
        .then(response => {
          return response.json()
        })
        .then(json => dispatch(receiveUserProfile(tempKey, json))
            ).catch(err => console.log(err))
  }
}

export function changeSalutation (event) {
  return {
    type: CHANGE_SALUTATION,
    data: event.target.value
  }
}

function validateEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function changeInput (event) {
  console.log('asdfasdfafsd')
  const form = event.target.dataset.form
  let error = false
  if (form === 'email' && !validateEmail(event.target.value)) {
    error = true
  }
  return {
    type: CHANGE_INPUT,
    data: event.target.value,
    form: event.target.dataset.form,
    error
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
  [CHANGE_SALUTATION]: (state, action) => {
    let salutation = Object.assign({}, state)
    salutation.data.salutationCode = action.data
    return salutation
  },
  [CHANGE_INPUT]: (state, action) => {
    let input = Object.assign({}, state)
    state.error = true
    input.data[action.form] = action.data
    return input
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
