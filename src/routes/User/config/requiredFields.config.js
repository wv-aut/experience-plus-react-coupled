import { API } from './formFields.config'
import { TAX_RECEIPT_PROFILE_ROUTE } from 'routes/config/routes.config'

// ------------------------------------
// Required fields and fields that are conditionally required
// ------------------------------------


export function _locationToObjectKey (location) {
  return location.replace(/-/, '_').replace(/\//, '')
}

export const FORM_ELEMENTS = {
  [_locationToObjectKey(TAX_RECEIPT_PROFILE_ROUTE)]: {
    [API.FIRST_NAME]: true,
    [API.LAST_NAME]: true,
    [API.SALUTATION_CODE]: true,
    [API.EMAIL]: true,
    [API.TAX_OPTOUT]: true,
    [API.BIRTH_DATE]: {
      [API.TAX_OPTOUT]: {
        value: false
      }
    }
  }
}



