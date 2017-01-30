import { API } from './formFields.config'
import { TAX_RECEIPT_PROFILE_ROUTE, PRINT } from 'routes/config/routes.config'

// ------------------------------------
// Required fields and fields that are conditionally required
// ------------------------------------


export function _locationToObjectKey (location) {
  return location.replace(/-/, '_').replace(/^\//, '')
}

export const FORM_ELEMENTS = {
  [_locationToObjectKey(TAX_RECEIPT_PROFILE_ROUTE)]: {
    [API.FIRST_NAME]: {
      [API.TAX_OPTOUT]: {
        value: false
      }
    },
    [API.LAST_NAME]: {
      [API.TAX_OPTOUT]: {
        value: false
      }
    },
    [API.SALUTATION_CODE]: {
      [API.TAX_OPTOUT]: {
        value: false
      }
    },
    [API.EMAIL]: true,
    [API.TAX_OPTOUT]: true,
    [API.BIRTH_DATE]: {
      [API.TAX_OPTOUT]: {
        value: false
      }
    }
  }
}

/**
 * Check if current field is required
 * @param {string} fieldName - i.e. firstName
 * @param {object} userData - full set of user data
 * @param {string} pathname - i.e. /user-data
 * @return {boolean}
 */
export function checkIfFieldIsRequired (fieldName, userData, pathname) {

  // Some pages are only accessible if the parent pages have all 
  // necessary informaton. Example: [PRINT], [COMPLETED]
  var re = new RegExp('/' + PRINT)
  const strippedPathName = pathname.replace(re, '')
  const key = _locationToObjectKey(strippedPathName)
  // if (typeof FORM_ELEMENTS[key] === 'undefined') {
  //   console.log('undefined yeah')
  //   return false
  // }

  const fieldValue = FORM_ELEMENTS[key][fieldName]
  
  let isRequired = false
  if (typeof fieldValue !== 'undefined') {
    // If there are no dependencies
    if (fieldValue === true) {
      isRequired = true
    } else {
      // We check the dependencies
      for (let element in fieldValue) {
        if (fieldValue[element]['value'] === userData[element]) {
          isRequired = true
        }
      }
    }
  }
  return isRequired
}

export function showErrorMessage (value, minValue = false, maxValue = false, email = false) {
  let addClass = 'ok'
  if (minValue) { addClass = (Number(value) <= minValue) ? 'error-less' : 'ok' }
  if (maxValue) { addClass = (Number(value) >= maxValue) ? 'error-exceed' : 'ok' }
  if (typeof value === 'undefined' || value === '' || value === 0 || value === '0' || value === '00' || value === '0000') {
    addClass = 'error'
  }
  if (email) {
    addClass = _validateEmail(value) ? 'ok' : 'error'
  }
  return addClass
}


/**
 * Validate emails
 * @param {string} email
 * @return {boolean}
 */
export function _validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}