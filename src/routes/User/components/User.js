import React, { Component } from 'react'
import { Link } from 'react-router'
import './User.scss'
import printerImage from '../assets/printer.svg'
import Progress from '../../components/Progress/Progress'
import Overlay from 'components/Overlay/components/Overlay'

import BirthDateForm from '../userElements/BirthDateForm'
import { SALUTATION_CODE } from 'config/obelix.config'
import { API, DESCRIPTION, FORM_ERRORS_DEFAULT } from '../config/formFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../config/requiredFields.config'
import { TAX_RECEIPT_PROFILE_ROUTE, TAX_RECEIPT_PRINT_ROUTE, PRINT } from '../../config/routes.config'


class User extends Component {

  componentWillReceiveProps (nextProps) {
    if (typeof this.props.user.data === 'undefined' && typeof nextProps.user.data === 'object') {
      this.props.userDataValidation(nextProps)
    }
  }

  getSalutationOptions () {
    let salutations = []
    for (var prop in SALUTATION_CODE) {
      salutations.push(<option key={prop} value={prop}>{SALUTATION_CODE[prop]}</option>)
    }
    if (this.props.user.data.taxOptOut === true) {
      salutations.push(<option key='4' value='4'>Familie</option>)
    }
    return salutations
  }

  createSalutationString (salutationMode = true) {
    let salutationString = 'Sehr geehrter Spender'
    const { lastName, salutationCode, titleText } = this.props.user.data
    if (lastName) {
      switch (salutationCode) {
        case '4':
          salutationString = `${salutationMode ? 'Sehr geehrte ' : ''}Familie ${lastName}`
          break
        case '14':
          salutationString = `${salutationMode ? 'Sehr geehrte ' : ''}Frau${' ' + titleText} ${lastName}`
          break
        case '13':
          salutationString = `${salutationMode ? 'Sehr geehrter ' : ''}Herr${' ' + titleText} ${lastName}`
          break
      }
    }
    return salutationString
  }

  /**
   * Checks if user can go to the next item
   * @param {object} json
   * @return {boolean} true if active false if not active
   */
  isFormCompleted () {
    return this.props.user.data.taxOptOut || !this.props.user.errorArray.length
  }

  _checkIfFieldisRequired (fieldname) {
    return checkIfFieldIsRequired(fieldname, this.props.user.data, this.props.location.pathname)
  }

  render () {
    if (this.props.auth.networkError) {
      return null
    }
    if (!this.props.user.data) {
      return null
    }
    if (typeof this.props.user.errorArray === 'undefined') {
      return <Overlay 
        header='Ihre Daten werden geladen.'
        subheader='Subheader'
        icon='loading'
        mode='run' />
    } else {
      return (
        <div>
          <header className='center' />
          <Progress location={this.props.location} />
          {this.props.location.pathname === '/' + TAX_RECEIPT_PROFILE_ROUTE &&
          <main className='main'>
            <section>
              <form className='form'>
                {this.props.user.dataTemp.companyName !== null &&
                  <div className='form-row'>
                    <label className='grid-1-all'>
                      <span>{DESCRIPTION.COMPANY}:</span>
                      <input
                        onBlur={this.props.changeInput}
                        data-form='companyName'
                        className={showErrorMessage(this.props.user.data.companyName)}
                        type='text'
                        name='company-name'
                        defaultValue={this.props.user.dataTemp.companyName} />
                    </label>
                  </div>
                  }
                {this.props.user.dataTemp.companyName !== null &&
                  <BirthDateForm location={this.props.location} />
                }
                <div className='form-row'>
                  <label className={'grid-12-8 ' + (this._checkIfFieldisRequired(API.SALUTATION_CODE) && 'required')}>
                    <span>{DESCRIPTION.SALUTATION}</span>
                    <select
                      onChange={this.props.changeInput}
                      data-form='salutationCode'
                      data-required={this._checkIfFieldisRequired(API.SALUTATION_CODE) && 'true'}
                      className={this._checkIfFieldisRequired(API.SALUTATION_CODE) && showErrorMessage(this.props.user.data.salutationCode, 5)}
                      value={this.props.user.data.salutationCode}> >
                      {this.getSalutationOptions()}
                    </select>
                    <span className='error'>{FORM_ERRORS_DEFAULT.SALUTATION}</span>
                  </label>
                  <label className='grid-12-4'>
                    <span className='optional'>{DESCRIPTION.JOB_TITLE}</span>
                    <input
                      onBlur={this.props.changeInput}
                      data-form='titleText'
                      defaultValue={this.props.user.data.titleText}
                      placeholder='optional'
                      type='text'
                      name='title' />
                  </label>
                </div>
                <div className='form-row'>
                  <label className={'grid-12-6 ' + (this._checkIfFieldisRequired(API.FIRST_NAME) && 'required')}>
                    <span>{DESCRIPTION.FIRST_NAME}:</span>
                    <input
                      onChange={this.props.changeInput}
                      data-form={API.FIRST_NAME}
                      data-required={this._checkIfFieldisRequired(API.FIRST_NAME) && 'true'}
                      className={this._checkIfFieldisRequired(API.FIRST_NAME) && showErrorMessage(this.props.user.data[API.FIRST_NAME])}
                      type='text'
                      name='first-name'
                      defaultValue={this.props.user.data[API.FIRST_NAME]} />
                    <span className='error'>{FORM_ERRORS_DEFAULT.FIRST_NAME}</span>
                  </label>
                  <label className={'grid-12-6 ' + (this._checkIfFieldisRequired(API.LAST_NAME) && 'required')}>
                    <span>{DESCRIPTION.LAST_NAME}:</span>
                    <input
                      onChange={this.props.changeInput}
                      data-form={API.LAST_NAME}
                      data-required={this._checkIfFieldisRequired(API.LAST_NAME) && 'true'}
                      className={this._checkIfFieldisRequired(API.LAST_NAME) && showErrorMessage(this.props.user.data[API.LAST_NAME])}
                      type='text'
                      name='last-name'
                      defaultValue={this.props.user.data[API.LAST_NAME]} />
                    <span className='error'>{FORM_ERRORS_DEFAULT.LAST_NAME}</span>
                  </label>
                </div>
                <div className='form-row'>
                  <label className='grid-1-all required'>
                    <span>{DESCRIPTION.EMAIL}:</span>
                    <input
                      onChange={this.props.changeInput}
                      data-form={API.EMAIL}
                      data-required='true'
                      className={showErrorMessage(this.props.user.data[API.EMAIL], false, false, true)}
                      type='email'
                      name='email'
                      defaultValue={this.props.user.data[API.EMAIL]} />
                    <span className='error'>{FORM_ERRORS_DEFAULT.EMAIL}</span>
                  </label>
                </div>
                {this.props.user.dataTemp.companyName === null &&
                  <BirthDateForm location={this.props.location} />
                }
              </form>
              {/* Only show tax receipt when no errors are dedected */}
            </section>
            <aside>
              {this.props.user.data.salutationCode === '4' &&
                <p className='warning-bg'>Sie sind bei uns als Familie registriert. Da die Spenden in Zukunft immer einer Person zugeordnet sein muss,
                  bitten wir Sie zu entscheiden, wer von Ihnen beiden die Spenden absetzen möchte. Dies gilt für alle Spenden die
                  Sie ab 1.1.2017 tätigen.</p>
                }
               {this.props.user.data.taxOptOut &&
                <p className='warning-bg'>Ich, {this.createSalutationString(false)}, bestätige hiermit,
                  dass ich von meinem Widerrufsrecht Gebrauch mache und dadurch meine Spenden bei World Vision nicht mehr steuerlich absetzen kann.</p>
                } 
              {this.isFormCompleted() && !this.props.user.data.taxOptOut && <p>{this.createSalutationString()}, bitte <strong>bestätigen Sie Ihre Daten</strong>,
                damit Sie auch in Zukunft Ihre Spenden steuerlich absetzen können.
              <button
                onClick={(e) => this.props.sendUserProfileUpdate(e, this.props.auth.apiKey, this.props.user.data,  this.props.router)}
               >
                <span>DATEN BESTÄTIGEN UND SPENDENBESTÄTIGUNG AUFRUFEN</span></button>
              </p>}
              {!this.isFormCompleted() && !this.props.user.data.taxOptOut && <p>{this.createSalutationString()}, bitte <strong>vervollständigen das Formular</strong>,
                damit Sie auch in Zukunft Ihre Spenden steuerlich absetzen können:
              <button
                className='button disabled'>
                <span>DATEN BESTÄTIGEN UND SPENDENBESCHEINIGUNG AUFRUFEN</span>
              </button>
                </p>
              }
              {this.isFormCompleted() && this.props.user.data.taxOptOut && <p>
              <button
                onClick={(e) => this.props.sendUserProfileUpdate(e, this.props.auth.apiKey, this.props.user.data,  this.props.router)}
               >
                <span>WIDERRUF BESTÄTIGEN UND SPENDENBESTÄTIGUNG AUFRUFEN</span></button>
              </p>}
        
            </aside>
          </main>
          
          }
          {!this.props.user.errorArray.length && this.props.children}
        </div>)
    }
  }
}

User.propTypes = {
  children : React.PropTypes.element,
  user: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  fetchUserProfile: React.PropTypes.func.isRequired,
  changeInput: React.PropTypes.func.isRequired,
  userDataValidation: React.PropTypes.func.isRequired,
  confirmUserForm: React.PropTypes.func.isRequired,
  _validateEmail: React.PropTypes.func,
  sendUserProfileUpdate: React.PropTypes.func
}

export default User
