export const CHANGE_DATE = 'CHANGE_DATE'

// ------------------------------------
// Actions formElements BirthDateForm
// ------------------------------------

export const changeDate = (event) => {
  let errorOperation = 'deduct'
  let birthDate = event.target.dataset.fulldate || '0000-00-00'
  let error = false
  switch (event.target.dataset.dateelement) {
    case 'day':
      birthDate = birthDate.replace(/\d{2}$/, event.target.value)
      console.log(event.target.dataset.fulldate)
      break
    case 'month':
      birthDate = birthDate.replace(/-\d{2}-/, `-${event.target.value}-`)
      break
    case 'year':
      let replace = event.target.value
      if (Number(event.target.value) > 2010 || Number(event.target.value) < 1900) {
        error = true
        replace = '0000'
      }
      birthDate = birthDate.replace(/^\d{4}/, replace)
      break
  }

  errorOperation = /-[0]{2}|[0]{4}/.test(birthDate) ? 'add' : 'deduct'

  return {
    type: CHANGE_DATE,
    data: birthDate,
    error,
    errorOperation
  }
}
