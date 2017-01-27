import React, { Component } from 'react'
import { API } from '../../../config/formFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../../../config/requiredFields.config'

class BirthDateForm extends Component {

  _getOptions (count = null) {
    let option = []
    let months = [ '', 'Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ]
    for (let i = 1; i <= count; i++) {
      option.push(<option key={i} value={i < 10 ? '0' + i : i}>{count === 12 ? months[i] : i}</option>)
    }
    return option
  }

  _checkIfFieldisRequired (fieldname) {
    return checkIfFieldIsRequired(fieldname, this.props.user.data, this.props.location.pathname)
  }

  /**
   * Check if current field is required
   * @param {string|boolean} value
   * @return {string}
   */
  _checkIfBoolean (value) {
    if (typeof value === 'boolean') {
      return value.toString()
    } else {
      return value
    }
  }

  render () {
    return (
      <div>
        <div className='form-row radio'>
          <ul>
            <li>
              <label>
                <input
                  type='radio'
                  data-form='taxOptOut'
                  defaultChecked={this._checkIfBoolean(this.props.user.data.taxOptOut) === 'false'}
                  value='false'
                  onChange={this.props.changeInput}
                  name='tax-opt-out'
                />
                <p>Ja, Ich stimme der automatischen Spendenansetzbarkeit zu.<br />
                Bitte geben Sie Ihr <strong>Geburtsdatum</ strong> dafür an, um auch für das Jahr 2016 Ihre Spende absetzen zu können.</p>
                <div className='check'>
                  <div className='inside' />
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div className={'form-row ' + (this._checkIfFieldisRequired(API.BIRTH_DATE) && 'required')}>
          <label className='grid-3-all'>
            <span>Tag:</span>
            <select
              data-dateelement='day'
              data-fulldate={this.props.user.data.birthDate}
              data-required={this._checkIfFieldisRequired(API.BIRTH_DATE)}
              className={this._checkIfFieldisRequired(API.BIRTH_DATE) && showErrorMessage(this.props.user.data.birthDate.split('-')[2])}
              onChange={this.props.changeDate}
              value={this.props.user.data.birthDate.split('-')[2]}>
              <option value='00'>Tag</option>
              {this._getOptions(31)}
            </select>
            <span className='error'>Bitte wählen Sie Ihren Geburtstag aus.</span>
          </label>
          <label className='grid-3-all'>
            <span className={this._checkIfFieldisRequired(API.BIRTH_DATE)}>Monat:</span>
            <select
              data-dateelement='month'
              data-fulldate={this.props.user.data.birthDate}
              data-required={this._checkIfFieldisRequired(API.BIRTH_DATE)}
              className={this._checkIfFieldisRequired(API.BIRTH_DATE) && showErrorMessage(this.props.user.data.birthDate.split('-')[1])}
              onChange={this.props.changeDate}
              value={this.props.user.data.birthDate.split('-')[1]}>
              <option value='00'>Monat</option>
              {this._getOptions(12)}
            </select>
            <span className='error'>Bitte wählen Sie Ihren Geburtsmonat aus.</span>
          </label>
          <label className='grid-3-all'>
            <span>Jahr:</span>
            <input
              data-dateelement='year'
              data-fulldate={this.props.user.data.birthDate}
              data-required={this._checkIfFieldisRequired(API.BIRTH_DATE)}
              className={this._checkIfFieldisRequired(API.BIRTH_DATE) && showErrorMessage(this.props.user.data.birthDate.split('-')[0], 1900, 2010)}
              onBlur={this.props.changeDate}
              maxLength='4'
              type='number'
              name='birth-year'
              defaultValue={this.props.user.data.birthDate.split('-')[0]} />
            <span className='error'>Bitte tragen Sie Ihr Geburtsjahr ein.</span>
          </label>
        </div>
        <div className='form-row radio'>
          <ul>
            <li>
              <label>
                <input
                  type='radio'
                  data-form='taxOptOut'
                  defaultChecked={this._checkIfBoolean(this.props.user.data.taxOptOut) === 'true'}
                  value='true'
                  onChange={this.props.changeInput}
                  name='tax-opt-out'
                />
                <p>Nein, ich möchte meine Spenden nicht absetzen und mache von meinem Widerrufsrecht Gebrauch.</p>
                <div className='check'>
                  <div className='inside' />
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

BirthDateForm.propTypes = {
  changeDate: React.PropTypes.func,
  changeInput: React.PropTypes.func,
  user: React.PropTypes.object,
  location: React.PropTypes.object
}

// BirthDateForm.contextTypes = {
//   store: React.PropTypes.object
// }

export default BirthDateForm
