export const CHANGE_DATE = 'CHANGE_DATE'

// ------------------------------------
// Actions formElements BirthDateForm
// ------------------------------------

export const changeDate = (event) => {
  let errorOperation = 'deduct'
  let birthdate = event.target.dataset.fulldate || '0000-00-00'
  let error = false
  switch (event.target.dataset.dateelement) {
    case 'day':
      birthdate = birthdate.replace(/\d{2}$/, event.target.value)
      console.log(event.target.dataset.fulldate)
      break
    case 'month':
      birthdate = birthdate.replace(/-\d{2}-/, `-${event.target.value}-`)
      break
    case 'year':
      let replace = event.target.value
      if (Number(event.target.value) > 2010 || Number(event.target.value) < 1900) {
        error = true
        replace = '0000'
      }
      birthdate = birthdate.replace(/^\d{4}/, replace)
      break
  }

  errorOperation = /-[0]{2}|[0]{4}/.test(birthdate) ? 'add' : 'deduct'

  return {
    type: CHANGE_DATE,
    data: birthdate,
    error,
    errorOperation
  }
}
