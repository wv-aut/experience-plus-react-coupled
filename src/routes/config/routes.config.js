
// The url defines the process of the form elements and the process bar

const APP_NAMESPACE = '/spender'

export const PRINT = 'drucken'

export const TAX_RECEIPT_PROFILE_ROUTE = `${APP_NAMESPACE}/spendenbestaetigung`
export const TAX_RECEIPT_PRINT_ROUTE = PRINT

export const PROGRESS = [
  {
    route: null,
    description: 'E-Mail Login'
  },
  {
    route: `${APP_NAMESPACE}/spendenbestaetigung`,
    description: 'Aktualisierung Ihrer Daten'
  },
  {
    route: `${APP_NAMESPACE}/spendenbestaetigung/drucken`,
    description: 'Ihre Spenden-Bestätigung'
  }
]
