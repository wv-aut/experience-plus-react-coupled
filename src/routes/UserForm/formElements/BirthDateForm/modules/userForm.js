export const CHANGE_DATE = 'CHANGE_DATE'

// ------------------------------------
// Actions formElements BirthDateForm
// ------------------------------------

export const changeDate = (event) => {
  // console.log(event.target.value)
  // console.log(event.target.dataset.dateelement)
  // console.log(event.target.dataset.fulldate)

  let birthDate = ''
  switch (event.target.dataset.dateelement) {
    case 'day':
      birthDate = event.target.dataset.fulldate.replace(/\d{2}$/, event.target.value)
      break
    case 'month':
      birthDate = event.target.dataset.fulldate.replace(/-\d{2}-/, `-${event.target.value}-`)
      console.log(birthDate)
      break
  }

  return {
    type: CHANGE_DATE,
    data: birthDate
  }
}
