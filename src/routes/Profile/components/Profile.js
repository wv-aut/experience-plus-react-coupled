import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import Progress from '../../components/Progress/Progress'
import Overlay from 'components/Overlay/components/Overlay'

import BirthDateForm from '../profileElements/BirthDateForm'
import { SALUTATION_CODE, TITLES } from 'config/obelix.config'
import { API, DESCRIPTION, FORM_ERRORS_DEFAULT } from '../config/formFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../config/requiredFields.config'
import { TAX_RECEIPT_PROFILE_ROUTE } from '../../config/routes.config'


class Profile extends Component {

  componentWillReceiveProps (nextProps) {
    if (typeof this.props.profile.data === 'undefined' && typeof nextProps.profile.data === 'object') {
      this.props.profileDataValidation(nextProps)
    }
  }

  getSalutationOptions () {
    let salutations = []
    for (var prop in SALUTATION_CODE) {
      salutations.push(<option key={prop} value={prop}>{SALUTATION_CODE[prop]}</option>)
    }
    if (this.props.profile.data.taxOptOut === true && this.props.profile.dataTemp.salutationCode === '4') {
      salutations.push(<option key='4' value='4'>Familie</option>)
    }
    return salutations
  }

  getTitleText () {
    let title = ''
    if (this.props.profile.data.titleText) {
      title = this.props.profile.data.titleText
    } else {
      for (let i = 0; i < TITLES.length; i++) {
        if (TITLES[i]['code'] === this.props.profile.data.titleCode) {
          title = TITLES[i]['description']
        }
      }
    }
    return title
  }

  /**
   * Renders salutation string with title
   * @param {boolean} salutationMode:
   *  true is for beginning of a sentence (ie. Sehr geehrter Herr Müller), 
   *  false is if it is as addition within a sentence (ie. Herr Müller)
   * @return {string}
   */
  createSalutationString (salutationMode = true) {
    let salutationString = ''
    const { lastName, firstName, salutationCode } = this.props.profile.data
    if (lastName && firstName) {
      switch (salutationCode) {
        case '0':
          salutationString = ''
          break
        case 'COMPANY':
          salutationString = ''
          break
        case '4':
          salutationString = `${salutationMode ? 'Sehr geehrte ' : ', '}Familie ${lastName},`
          break
        case '14':
          salutationString = `${salutationMode ? 'Sehr geehrte Frau ' + this.getTitleText() + lastName : ', ' + firstName + ' ' + lastName},`
          break
        case '61':
          salutationString = `${salutationMode ? 'Sehr geehrter Herr ' + this.getTitleText() + lastName : ', ' + firstName + ' ' + lastName},`
          break
      }
    }
    return salutationString
  }

  /**
   * Checks if profile can go to the next item
   * @param {object} json
   * @return {boolean} true if active false if not active
   */
  isFormCompleted () {
    return !this.props.profile.errorArray.length
  }

  _checkIfFieldisRequired (fieldname) {
    return checkIfFieldIsRequired(fieldname, this.props.profile.data, this.props.location.pathname)
  }

  render () {
    if (this.props.auth.networkError) {
      return null
    }
    if (!this.props.profile.data) {
      return null
    }
    if (typeof this.props.profile.errorArray === 'undefined' || this.props.profile.isFetching) {
      return <Overlay
        header='Ihre Daten werden gespeichert.'
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
                {this.props.profile.dataTemp.companyName &&
                  <div className='form-row'>
                    <label className='grid-1-all'>
                      <span>{DESCRIPTION.COMPANY}:</span>
                      <input
                        onBlur={this.props.changeInput}
                        data-form='companyName'
                        className={showErrorMessage(this.props.profile.data.companyName)}
                        type='text'
                        name='company-name'
                        defaultValue={this.props.profile.dataTemp.companyName} />
                    </label>
                  </div>
                  }
                {this.props.profile.dataTemp.companyName &&
                  <BirthDateForm location={this.props.location} />
                }
                <div className='form-row'>
                  <label className={'grid-12-8 ' + (this._checkIfFieldisRequired(API.SALUTATION_CODE) && 'required')}>
                    <span>{DESCRIPTION.SALUTATION}</span>
                    <select
                      onChange={(e) => this.props.changeInputWithValidation(e, this.props)}
                      data-form='salutationCode'
                      data-required={this._checkIfFieldisRequired(API.SALUTATION_CODE) && 'true'}
                      className={this._checkIfFieldisRequired(API.SALUTATION_CODE) && showErrorMessage(this.props.profile.data.salutationCode, this.props.profile.dataTemp.salutationCode === '4' && this.props.profile.data.taxOptOut ? '1' : '5')}
                      value={this.props.profile.data.salutationCode}> >
                      {this.getSalutationOptions()}
                    </select>
                    <span className='error'>{FORM_ERRORS_DEFAULT.SALUTATION}</span>
                  </label>
                  <label className='grid-12-4'>
                    <span className='optional'>{DESCRIPTION.JOB_TITLE}</span>
                    <input
                      onBlur={this.props.changeTitleInput}
                      data-form='titleText'
                      defaultValue={this.getTitleText()}
                      placeholder='optional'
                      type='text'
                      name='title' />
                  </label>
                </div>
                <div className='form-row'>
                  <label className={'grid-12-6 ' + (this._checkIfFieldisRequired(API.FIRST_NAME) && 'required')}>
                    <span>{DESCRIPTION.FIRST_NAME}:</span>
                    <input
                      onChange={(e) => this.props.changeInputWithValidation(e, this.props)}
                      data-form={API.FIRST_NAME}
                      data-required={this._checkIfFieldisRequired(API.FIRST_NAME) && 'true'}
                      className={this._checkIfFieldisRequired(API.FIRST_NAME) && showErrorMessage(this.props.profile.data[API.FIRST_NAME])}
                      type='text'
                      name='first-name'
                      defaultValue={this.props.profile.data[API.FIRST_NAME]} />
                    <span className='error'>{FORM_ERRORS_DEFAULT.FIRST_NAME}</span>
                  </label>
                  <label className={'grid-12-6 ' + (this._checkIfFieldisRequired(API.LAST_NAME) && 'required')}>
                    <span>{DESCRIPTION.LAST_NAME}:</span>
                    <input
                      onChange={(e) => this.props.changeInputWithValidation(e, this.props)}
                      data-form={API.LAST_NAME}
                      data-required={this._checkIfFieldisRequired(API.LAST_NAME) && 'true'}
                      className={this._checkIfFieldisRequired(API.LAST_NAME) && showErrorMessage(this.props.profile.data[API.LAST_NAME])}
                      type='text'
                      name='last-name'
                      defaultValue={this.props.profile.data[API.LAST_NAME]} />
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
                      className={showErrorMessage(this.props.profile.data[API.EMAIL], false, false, true)}
                      type='email'
                      name='email'
                      defaultValue={this.props.profile.data[API.EMAIL]} />
                    <span className='error'>{FORM_ERRORS_DEFAULT.EMAIL}</span>
                  </label>
                </div>
                {!this.props.profile.dataTemp.companyName &&
                  <BirthDateForm location={this.props.location} />
                }
              </form>
              {/* Only show tax receipt when no errors are dedected */}
            </section>
            <aside>
              {this.props.profile.data.salutationCode === '4' &&
                <p className='warning-bg'>Sie sind bei uns als Familie registriert. Da die Spenden in Zukunft immer einer Person zugeordnet sein muss,
                  bitten wir Sie zu entscheiden, wer von Ihnen beiden die Spenden absetzen möchte. Dies gilt für alle Spenden die
                  Sie ab 1.1.2017 tätigen.</p>
                }
               {this.isFormCompleted() && this.props.profile.data.taxOptOut && this.props.profile.data.salutationCode !== '4' && !this.props.profile.data.companyName &&
                 <p className='warning-bg'>Ich{this.createSalutationString(false)} bestätige hiermit,
                  dass ich von meinem Widerrufsrecht Gebrauch mache und dadurch meine Spenden bei World Vision nicht mehr steuerlich absetzen kann.</p> 
                } 
                {this.isFormCompleted() && this.props.profile.data.taxOptOut && this.props.profile.data.salutationCode === '4' &&
                 <p className='warning-bg'>Wir{this.createSalutationString(false)} bestätigen hiermit,
                  dass wir von unserem Widerrufsrecht Gebrauch machen und dadurch unsere Spenden bei World Vision nicht mehr steuerlich absetzen können.</p> 
                } 

              {this.isFormCompleted() && !this.props.profile.data.taxOptOut && <p>{this.createSalutationString()} bitte <strong>bestätigen Sie Ihre Daten</strong>,
                damit Sie in Zukunft Ihre Spenden steuerlich absetzen können.
              <button
                onClick={(e) => this.props.sendProfileProfileUpdate(e, this.props.auth.apiKey, this.props.profile.data, this.props.router)}
               >
                <span>DATEN BESTÄTIGEN UND SPENDEN-BESTÄTIGUNG AUFRUFEN</span></button>
              </p>}
              {!this.isFormCompleted() && !this.props.profile.data.taxOptOut && <p>{this.createSalutationString()} bitte <strong>vervollständigen das Formular</strong>,
                damit Sie in Zukunft Ihre Spenden steuerlich absetzen können:
              <button
                className='button disabled'>
                <span>DATEN BESTÄTIGEN UND SPENDEN-BESCHEINIGUNG AUFRUFEN</span>
              </button>
                </p>
              }
              {this.props.profile.data.taxOptOut && <p>
              <button
                className={!this.isFormCompleted() && 'button disabled'}
                onClick={(e) => this.props.sendProfileProfileUpdate(e, this.props.auth.apiKey, this.props.profile.data, this.props.router)}
               >
                {!this.props.profile.data.companyName
                ? <span>WIDERRUF BESTÄTIGEN UND SPENDENBESTÄTIGUNG AUFRUFEN</span>
                : <span>SPENDENBESTÄTIGUNG AUFRUFEN</span>
                  
                }
                </button>
              </p>}
        
            </aside>
          </main>
          
          }
          {!this.props.profile.errorArray.length && this.props.children}
        </div>)
    }
  }
}

Profile.propTypes = {
  children : PropTypes.element,
  profile: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchProfileProfile: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeInputWithValidation: PropTypes.func.isRequired,
  profileDataValidation: PropTypes.func.isRequired,
  confirmProfileForm: PropTypes.func.isRequired,
  _validateEmail: PropTypes.func,
  sendProfileProfileUpdate: PropTypes.func,
  changeTitleInput: PropTypes.func,
  auth: PropTypes.object
}

export default Profile
