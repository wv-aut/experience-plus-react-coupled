export const TAX_RECEIPT_PROFILE_ROUTE = 'profil-spendenbestaetigung'
export const TAX_RECEIPT_ROUTE = 'spendenbestaetigung'


export const PROGRESS = {
  [TAX_RECEIPT_PROFILE_ROUTE]: {
    description: 'Aktualisierung Ihrer Daten',
    next: {
      [TAX_RECEIPT_ROUTE] : {
        description: 'Ihre Spendenbestätigung',
        next: false
      }
    }
  }
}
