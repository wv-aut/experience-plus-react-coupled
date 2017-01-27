export const CHANGE_DATE = 'CHANGE_DATE'

// ------------------------------------
// Actions formElements BirthDateForm
// ------------------------------------

export const changeDate = (event) => {
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

  return {
    type: CHANGE_DATE,
    data: birthDate,
    error
  }
}
