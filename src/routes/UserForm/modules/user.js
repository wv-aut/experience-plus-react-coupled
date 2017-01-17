// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'

import { CHANGE_DATE } from '../formElements/BirthDateForm/modules/userForm'

// ------------------------------------
// Actions UserForm
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





export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().user
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
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
