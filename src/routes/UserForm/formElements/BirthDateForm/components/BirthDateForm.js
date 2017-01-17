import React from 'react'

const getOptions = (count = null) => {
  let option = []
  let months = [ '', 'Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ]
  for (let i = 1; i <= count; i++) {
    option.push(<option key={i} value={i < 10 ? '0' + i : i}>{count === 12 ? months[i] : i}</option>)
  }
  return option
}

export const BirthDateForm = (props) => (
  <div className='form-row'>
    <label className='grid-3-all'>
      <span>Tag:</span>
      <select
        data-dateelement='day'
        data-fulldate={props.user.data.birthDate}
        onChange={props.changeDate}
        value={props.user.data.birthDate.split('-')[2]}>
        <option value='0'>Tag</option>
        {getOptions(12)}
      </select>
    </label>
    <label className='grid-3-all'>
      <span>Monat:</span>
      <select
        data-dateelement='month'
        data-fulldate={props.user.data.birthDate}
        onChange={props.changeDate}
        value={props.user.data.birthDate.split('-')[1]}>
        <option value='month'>Monat</option>
        {getOptions(31)}
      </select>
    </label>
    <label className='grid-3-all'>
      <span>Jahr:</span>
      <input
        maxLength='4'
        type='text'
        name='birth-year'
        defaultValue={props.user.data.birthDate.split('-')[0]} />
    </label>
  </div>
)

BirthDateForm.propTypes = {
  changeDate: React.PropTypes.func
}

export default BirthDateForm
