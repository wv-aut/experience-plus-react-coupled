import React, { Component } from 'react'
import { Link } from 'react-router'
import './User.scss'
import printerImage from '../assets/printer.svg'
import Progress from '../../components/Progress/Progress'

import BirthDateForm from '../userElements/BirthDateForm'
import { SALUTATION_CODE } from 'config/obelix.config'
import { API, DESCRIPTION, FORM_ERRORS_DEFAULT } from '../config/formFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../config/requiredFields.config'
import { TAX_RECEIPT_PROFILE_ROUTE, TAX_RECEIPT_PRINT_ROUTE, PRINT } from '../../config/routes.config'

class User extends Component {

  componentDidMount () {
    this.props.fetchUserProfile()
  }

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
    return salutations
  }

  /**
   * Checks if user can go to the next item
   * @param {object} json
   * @return {boolean} true if active false if not active
   */
  isFormCompleted () {
    return this.props.user.data.taxOptOut || !this.props.user.errorArray.length
  }

  /**
   * Returns the current status of the form
   * @return {string} 'open', completed', 'confirmed'
   */
  formStatus () {

  }

  _checkIfFieldisRequired (fieldname) {
    return checkIfFieldIsRequired(fieldname, this.props.user.data, this.props.location.pathname)
  }

  render () {
    if (typeof this.props.user.errorArray === 'undefined') {
      return <main>Wir laden ihre Daten</main>
    } else {
      return (
        <div>
          <header className='center'>
          </header>
          <Progress location={this.props.location} />
          {this.props.location.pathname === '/' + TAX_RECEIPT_PROFILE_ROUTE &&
          <main className='main'>
            <section>
              <form className='form'>
                {this.props.user.data.registeredCompany &&
                  <div className='form-row'>
                    <label className='grid-1-all'>
                      <span>{DESCRIPTION.COMPANY}:</span>
                      <input
                        onBlur={this.props.changeInput}
                        data-form='companyName'
                        className={showErrorMessage(this.props.user.data.companyName)}
                        type='text'
                        name='company-name'
                        defaultValue={this.props.user.data.companyName} />
                    </label>
          </div>
                  }
                {this.props.user.data.registeredCompany &&
                  <BirthDateForm location={this.props.location} />
                }
                <div className='form-row'>
                  <label className={'grid-2-all ' + (this._checkIfFieldisRequired(API.SALUTATION_CODE) && 'required')}>
                    <span>{DESCRIPTION.SALUTATION}</span>
                    <select
                      onChange={this.props.changeInput}
                      data-form='salutationCode'
                      data-required={this._checkIfFieldisRequired(API.SALUTATION_CODE) && 'true'}
                      className={this._checkIfFieldisRequired(API.SALUTATION_CODE) && showErrorMessage(this.props.user.data.salutationCode)}
                      value={this.props.user.data.salutationCode}> >
                      {this.getSalutationOptions()}
                    </select>
                    <span className='error'>{FORM_ERRORS_DEFAULT.SALUTATION}</span>
                  </label>
                  <label className='grid-2-all'>
                    <span className='optional'>{DESCRIPTION.JOB_TITLE}</span>
                    <input
                      onBlur={this.props.changeInput}
                      data-form='jobTitle'
                      defaultValue={this.props.user.data.jobTitle}
                      placeholder='optional'
                      type='text'
                      name='title' />
                  </label>
                </div>
                <div className='form-row'>
                  <label className={'grid-1-all ' + (this._checkIfFieldisRequired(API.FIRST_NAME) && 'required')}>
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
                  <label className={'grid-1-all ' + (this._checkIfFieldisRequired(API.LAST_NAME) && 'required')}>
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
                {!this.props.user.data.registeredCompany &&
                  <BirthDateForm location={this.props.location} />
                }
              </form>
              {/* Only show tax receipt when no errors are dedected */}
            </section>
            <aside> 
              {this.isFormCompleted() ? <p>{this.props.user.data.salutation}, bitte bestätigen Sie Ihre Daten,
                damit Sie auch in Zukunft Ihre Spenden steuerlich ansetzen können.
              
              <Link 
                className='button'
                onClick={this.confirmUserForm}
                data-dispatch={this.props.dispatch}
               // to={'/schritt/1/2/spendenbestaetigung/drucken'}
               >
              <span>DATEN BESTÄTIGEN UND SPENDENBESTÄTIGUNG AUFRUFEN</span></Link>
            </p>
                : <p>{this.props.user.data.salutation}, bitte <strong>vervollständigen das Formular</strong>,
                damit Sie auch in Zukunft Ihre Spenden steuerlich ansetzen können:

              <Link
                className='button disabled'>
                <span>DATEN BESTÄTIGEN UND SPENDENBESCHEINIGUNG AUFRUFEN</span>
              </Link>

                </p>
              }
        
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
  parseJSONData: React.PropTypes.func.isRequired,
  changeInput: React.PropTypes.func.isRequired,
  userDataValidation: React.PropTypes.func.isRequired,
  confirmUserForm: React.PropTypes.func.isRequired,
  _validateEmail: React.PropTypes.func
}

export default User
