import React, { Component } from 'react'
import './User.scss'
import printerImage from '../assets/printer.svg'
import Progress from '../../components/Progress/Progress'
import SelectBirthDate from '../formElements/BirthDateForm'
import { SALUTATION_CODE } from 'config/obelix.config'
import { DESCRIPTION, FORM_ERRORS_DEFAULT } from '../config/languageDeAt.config'
import { FORM_ELEMENTS, _locationToObjectKey } from '../config/requiredFields.config'

export function checkIfFieldIsRequired (field, fieldData, location) {
  const key = _locationToObjectKey(location)
  const fieldValue = FORM_ELEMENTS[key][field]
  let isRequired = false
  if (typeof fieldValue !== 'undefined') {
    if (fieldValue === true) {
      isRequired = true
    } else {
      for (let element in fieldValue) {
        if (fieldValue[element]['value'] === fieldData[element]) isRequired = true
      }
    }
  }
  return isRequired
}

export function showErrorMessage (value, minValue = false, maxValue = false) {
  let addClass = 'ok'
  if (minValue) { addClass = (Number(value) <= minValue) ? 'error-less' : 'ok' }
  if (maxValue) { addClass = (Number(value) >= maxValue) ? 'error-exceed' : 'ok' }
  if (typeof value === 'undefined' || value === '' || value === '0' || value === '00') {
    addClass = 'error'
  }
  return addClass
}

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
              <div className='form-row'>
                <label className='grid-2-all required'>
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
                <label className='grid-1-all required'>
                  <span>{DESCRIPTION.FIRST_NAME}:</span>
                  <input
                    onBlur={this.props.changeInput}
                    data-form='firstName'
                    data-required='true'
                    className={showErrorMessage(this.props.user.data.firstName)}
                    type='text'
                    name='first-name'
                    defaultValue={this.props.user.data.firstName} />
                  <span className='error'>{FORM_ERRORS_DEFAULT.FIRST_NAME}</span>
                </label>
                <label className='grid-1-all required'>
                  <span>{DESCRIPTION.LAST_NAME}:</span>
                  <input
                    onBlur={this.props.changeInput}
                    data-form='lastName'
                    data-required='true'
                    className={showErrorMessage(this.props.user.data.lastName)}
                    type='text'
                    name='last-name'
                    defaultValue={this.props.user.data.lastName} />
                  <span className='error'>{FORM_ERRORS_DEFAULT.LAST_NAME}</span>
                </label>
              </div>
              <div className='form-row'>
                <label className='grid-1-all required'>
                  <span>{DESCRIPTION.EMAIL}:</span>
                  <input
                    onBlur={this.props.changeInput}
                    data-form='email'
                    data-required='true'
                    className={showErrorMessage(this.props.user.data.email)}
                    type='email'
                    name='email'
                    defaultValue={this.props.user.data.email} />
                  <span className='error'>{FORM_ERRORS_DEFAULT.EMAIL}</span>
                </label>
              </div>
              <SelectBirthDate />
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
  changeInput: React.PropTypes.func.isRequired
}

export default User
