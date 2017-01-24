
// The url defines the process of the form elements and the process bar

const PROCESS = 'schritt'

export const TAX_RECEIPT_PROFILE_ROUTE = `${PROCESS}/1/2/spendenbestaetigung`
export const TAX_RECEIPT_ROUTE_CONFIRMATION = `${PROCESS}/2/2/spendenbestaetigung/danke`

export const PROGRESS = [
  {
    route: TAX_RECEIPT_PROFILE_ROUTE,
    description: 'Aktualisierung Ihrer Daten'
  },
  {
    route: TAX_RECEIPT_ROUTE_CONFIRMATION,
    description: 'Ihre Spenden-Bestätigung'
  }
]
