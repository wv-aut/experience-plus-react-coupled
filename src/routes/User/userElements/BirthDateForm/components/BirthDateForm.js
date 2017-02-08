import React, { Component } from 'react'
import { API } from '../../../config/formFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../../../config/requiredFields.config'

class BirthDateForm extends Component {

  _getOptions (count = null) {
    let option = []
    let months = [ '', 'Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ]
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

  renderTaxOptOutForCompany (isCompany = false) {
    return (
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
              {isCompany &&
                <p>Ihre Daten sind bei uns als Firma angelegt. Diese Spenden sind auch weiterhin als Betriebsausgaben zu berücksichtigen und sind nicht von der Übermittlungspflicht erfasst. Sie erhalten in Zukunft automatisch eine Jahresspendenbestätigung</p>
              }
              {!isCompany &&
                <p>Nein, ich möchte meine Spenden nicht absetzen und mache von meinem Widerrufsrecht Gebrauch.</p>
              }
              <div className='check'>
                <div className='inside' />
              </div>
            </label>
          </li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.user.dataTemp.companyName !== null &&
          this.renderTaxOptOutForCompany(this.props.user.data.registeredCompany)}
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
                {this.props.user.dataTemp.companyName !== null &&
                  <p>Ich möchte doch lieber meine Spenden privat als Sonderausgabe absetzen. Bitte füllen Sie die unten angeführten Felder aus.</p>
                }
                {this.props.user.dataTemp.companyName === null &&
                  <p>Ja, ich stimme der automatischen Spendenabsetzbarkeit zu. Bitte geben Sie dafür Ihr Geburtsdatum bekannt:</p>
                }
                <div className='check'>
                  <div className='inside' />
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div className={'form-row ' + (this._checkIfFieldisRequired(API.BIRTH_DATE) && 'required label')}>
          <label className='grid-12-3'>
            <span>Tag:</span>
            <select
              data-dateelement='day'
              data-fulldate={this.props.user.data.birthdate}
              data-required={this._checkIfFieldisRequired(API.BIRTH_DATE)}
              className={this._checkIfFieldisRequired(API.BIRTH_DATE) &&
                showErrorMessage(this.props.user.data.birthdate.split('-')[2])
              }
              onChange={this.props.changeDate}
              value={this.props.user.data.birthdate.split('-')[2]}>
              <option value='00'>Tag</option>
              {this._getOptions(31)}
            </select>
            <span className='error'>Bitte wählen Sie Ihren Geburtstag aus.</span>
          </label>
          <label className='grid-12-5'>
            <span className={this._checkIfFieldisRequired(API.BIRTH_DATE)}>Monat:</span>
            <select
              data-dateelement='month'
              data-fulldate={this.props.user.data.birthdate}
              data-required={this._checkIfFieldisRequired(API.BIRTH_DATE)}
              className={this._checkIfFieldisRequired(API.BIRTH_DATE) &&
                showErrorMessage(this.props.user.data.birthdate.split('-')[1])
              }
              onChange={this.props.changeDate}
              value={this.props.user.data.birthdate.split('-')[1]}>
              <option value='00'>Monat</option>
              {this._getOptions(12)}
            </select>
            <span className='error'>Bitte wählen Sie Ihren Geburtsmonat aus.</span>
          </label>
          <label className='grid-12-4'>
            <span>Jahr:</span>
            <input
              data-dateelement='year'
              data-fulldate={this.props.user.data.birthdate}
              data-required={this._checkIfFieldisRequired(API.BIRTH_DATE)}
              className={this._checkIfFieldisRequired(API.BIRTH_DATE) &&
                showErrorMessage(this.props.user.data.birthdate.split('-')[0], 1900, 2010)
              }
              onChange={this.props.changeDate}
              maxLength='4'
              type='number'
              name='birth-year'
              defaultValue={this.props.user.data.birthdate.split('-')[0]} />
            <span className='error'>Bitte tragen Sie Ihr Geburtsjahr ein.</span>
          </label>
        </div>
        {this.props.user.dataTemp.companyName === null &&
          this.renderTaxOptOutForCompany(this.props.user.data.registeredCompany)
        }
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

export default BirthDateForm
