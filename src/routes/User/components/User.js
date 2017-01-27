import React, { Component } from 'react'
import './User.scss'
import printerImage from '../assets/printer.svg'
import Progress from '../../components/Progress/Progress'

import BirthDateForm from '../formElements/BirthDateForm'
import { SALUTATION_CODE } from 'config/obelix.config'
import { DESCRIPTION, FORM_ERRORS_DEFAULT } from '../config/languageDeAt.config'
import { API } from '../config/formFields.config'
import { checkIfFieldIsRequired, showErrorMessage } from '../config/requiredFields.config'

class User extends Component {

  componentDidMount () {
    this.props.fetchUserProfile()
  }

  getSalutationOptions () {
    let salutations = []
    for (var prop in SALUTATION_CODE) {
      salutations.push(<option key={prop} value={prop}>{SALUTATION_CODE[prop]}</option>)
    }
    return salutations
  }

  _checkIfFieldisRequired (fieldname) {
    return checkIfFieldIsRequired(fieldname, this.props.user.data, this.props.location.pathname)
  }

  render () {
    if (typeof this.props.user.data === 'undefined') {
      return <main />
    } else {
      return (
        <div>
          <header>
            <h1 className='center'>Ihr Profil bei World Vision</h1>
            <h2>Um Ihre Spenden auch in Zukunft steuerlich abzusetzen,
            bitten wir Sie folgende Daten zu bestätigen, oder zu vervollständigen.</h2>
          </header>
          <Progress location={this.props.location} />
          <main>
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
                    <span>Ihre Daten sind bei uns als Firma angelegt. Diese Spenden sind auch weiterhin als Betriebsausgaben
                    zu berücksichtigen und sind nicht von der Übermittlungspflicht erfasst. Sie erhalten in Zukunft automatisch 
                    eine Jahresspendenbestätigung<br /><br /><strong>Wenn Sie Ihre Spenden doch lieber privat als Sonderausgabe
                    absetzen möchten, füllen Sie bitte die unten angeführten Felder aus. </strong></span>
                  </label>
                </div>
                }
              <div className='form-row'>
                <label className={'grid-2-all ' + (!this.props.user.data.registeredCompany && 'required')}>
                  <span>{DESCRIPTION.SALUTATION}</span>
                  <select
                    onChange={this.props.changeInput}
                    data-form='salutationCode'
                    className={showErrorMessage(this.props.user.data.salutationCode)}
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
                    onBlur={this.props.changeInput}
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
                    onBlur={this.props.changeInput}
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
                    onBlur={this.props.changeInput}
                    data-form={API.EMAIL}
                    data-required='true'
                    className={showErrorMessage(this.props.user.data[API.EMAIL])}
                    type='email'
                    name='email'
                    defaultValue={this.props.user.data[API.EMAIL]} />
                  <span className='error'>{FORM_ERRORS_DEFAULT.EMAIL}</span>
                </label>
              </div>
              <BirthDateForm location={this.props.location} />
              <input type='submit' value='DATEN BESTÄTIGEN' />
              <p className='error'>Damit Sie Ihre Spendenbestätigung ausdrucken können, bitten wir Sie,
              Ihre persönlichen Daten zu vervollständigen bzw. zu bestätigen.</p>
              <button type='button' disabled><img src={printerImage} /><span>Spendenbestätigung 2016 ausdrucken</span></button>
            </form>
          </main>
        </div>)
    }
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  fetchUserProfile: React.PropTypes.func.isRequired,
  parseJSONData: React.PropTypes.func.isRequired,
  changeInput: React.PropTypes.func.isRequired
}

export default User
