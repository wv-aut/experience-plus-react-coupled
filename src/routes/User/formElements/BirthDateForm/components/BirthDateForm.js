import React from 'react'
import check from '../assets/checked.png'
import { DESCRIPTION, FORM_ERRORS_DEFAULT } from '../../../config/languageDeAt.config'
import { FORM_ELEMENTS, _locationToObjectKey } from '../../../config/requiredFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../../../components/User'


export const BirthDateForm = (props, { store }) => {
  const checkIfbirthDateFieldIsRequired = checkIfFieldIsRequired(
    'birthDate',
    props.user.data,
    store.getState().location
  )

  const getOptions = (count = null) => {
    let option = []
    let months = [ '', 'Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ]
    for (let i = 1; i <= count; i++) {
      option.push(<option key={i} value={i < 10 ? '0' + i : i}>{count === 12 ? months[i] : i}</option>)
    }
    return option
  }

  const _checkIfBoolean = (value) => {
    if (typeof value === 'boolean') {
      return value.toString()
    } else {
      return value
    }
  }

  return (
    <div>
      <div className='form-row radio'>
        <ul>
          <li>
            <input
              type='radio'
              data-form='boolean'
              defaultChecked={_checkIfBoolean(props.user.data.taxOptOut) === 'false'}
              value='false'
              onChange={props.changeInput}
              name='selector'
            />
            <label htmlFor='false'>
              <p>Ja, Ich stimme der automatischen Spendenansetzbarkeit zu.<br/>
              Damit Sie auch für das Jahr 2016 Ihre Spende absetzen können, geben Sie bitte Ihre Geburtsdatum an</p>
            </label>
            <div className='check'>
              <div className='inside' />
            </div>
          </li>
        </ul>
      </div>
      <div className='form-row'>
        <label className='grid-3-all'>
          <span>Tag:</span>
          <select
            data-dateelement='day'
            data-fulldate={props.user.data.birthDate}
            data-required={checkIfbirthDateFieldIsRequired}
            className={checkIfbirthDateFieldIsRequired && showErrorMessage(props.user.data.birthDate.split('-')[2])}
            onChange={props.changeDate}
            value={props.user.data.birthDate.split('-')[2]}>
            <option value='00'>Tag</option>
            {getOptions(12)}
          </select>
          <span className='error'>Bitte wählen Sie Ihren Geburtstag aus.</span>
        </label>
        <label className='grid-3-all'>
          <span>Monat:</span>
          <select
            data-dateelement='month'
            data-fulldate={props.user.data.birthDate}
            data-required={checkIfbirthDateFieldIsRequired}
            className={checkIfbirthDateFieldIsRequired && showErrorMessage(props.user.data.birthDate.split('-')[1])}
            onChange={props.changeDate}
            value={props.user.data.birthDate.split('-')[1]}>
            <option value='00'>Monat</option>
            {getOptions(31)}
          </select>
          <span className='error'>Bitte wählen Sie Ihren Geburtsmonat aus.</span>
        </label>
        <label className='grid-3-all'>
          <span>Jahr:</span>
          <input
            data-dateelement='year'
            data-fulldate={props.user.data.birthDate}
            data-required={checkIfbirthDateFieldIsRequired}
            className={checkIfbirthDateFieldIsRequired && showErrorMessage(props.user.data.birthDate.split('-')[0], 1900, 2010)}
            onBlur={props.changeDate}
            maxLength='4'
            type='text'
            name='birth-year'
            defaultValue={props.user.data.birthDate.split('-')[0]} />
          <span className='error'>Bitte tragen Sie Ihr Geburtsjahr ein.</span>
        </label>
      </div>

      <div className='form-row radio'>
        <ul>
          <li>
            <input
              type='radio'
              data-form='boolean'
              defaultChecked={_checkIfBoolean(props.user.data.taxOptOut) === 'true'}
              value='true'
              onChange={props.changeInput}
              name='selector'
            />
            <label htmlFor='true'>Nein, ich möchte meine Spenden nicht absetzen und mache von meinem Widerrufsrecht Gebrauch.</label>
            <div className='check'>
              <div className='inside' />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

BirthDateForm.propTypes = {
  changeDate: React.PropTypes.func,
  changeInput: React.PropTypes.func,
  user: React.PropTypes.object
}

BirthDateForm.contextTypes = {
  store: React.PropTypes.object
}

export default BirthDateForm
