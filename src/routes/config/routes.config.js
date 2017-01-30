
// The url defines the process of the form elements and the process bar

const PROCESS = 'schritt'

export const PRINT = 'drucken'

export const TAX_RECEIPT_PROFILE_ROUTE = `${PROCESS}/1/2/spendenbestaetigung`
export const TAX_RECEIPT_PRINT_ROUTE = PRINT

export const PROGRESS = [
  {
    route: TAX_RECEIPT_PROFILE_ROUTE,
    description: 'Aktualisierung Ihrer Daten'
  },
  {
    route: TAX_RECEIPT_PRINT_ROUTE,
    description: 'Ihre Spenden-Bestätigung'
  }
]
