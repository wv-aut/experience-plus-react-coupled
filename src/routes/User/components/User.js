import React from 'react'
import './User.scss'
import check from '../assets/checked.png'

function preText() {
  return (
    <p>Ihr Daten</p>
  )
}

export const User = (props) => (
  <main>
    <h1 className='center'>Ihr Profil bei World Vision</h1>
    <h2>Um Ihre Spenden auch in Zukunft steuerlich abzusetzen,
    bitten wir Sie folgende Daten zu bestätigen, oder zu vervollständigen.</h2>
    <form className='form'>
      {preText}
      <div className='form-row'>
        <label className='grid-2-all'>
          <span>Anrede</span>
          <select className='error'>
            <option value='0'>Bitte wählen</option>
            <option value='miss'>Frau</option>
            <option value='mister'>Herr</option>
          </select>
          <span>Bitte wählen Sie Ihre Anrede.</span>
        </label>
        <label className='grid-2-all'>
          <span>Titel</span>
          <input placeholder='optional' type='text' name='title' />
        </label>
      </div>
      <div className='form-row'>
        <label className='error'>
          <span>Vorname:</span>
          <input className='error' type='text' name='first-name' />
          <span>Bitte geben Sie jenen Namen an, der auf Ihrem Meldezettel steht.</span>
        </label>
        <label>
          <span>Nachname:</span>
          <input type='text' name='last-name' />
        </label>
      </div>
      <div className='form-row'>
        <label>
          <span>E-Mail:</span>
          <input type='text' name='email' />
        </label>
      </div>
      <fieldset><legend>Geburtsdatum</legend>
        <div className='form-row'>
          <label className='grid-3-all'>
            <span>Tag:</span>
            <select>
              <option value='day'>Tag</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </label>
          <label className='grid-3-all'>
            <span>Monat:</span>
            <select>
              <option value='month'>Monat</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </label>
          <label className='grid-3-all'>
            <span>Jahr:</span>
            <input maxLength='4' type='text' name='birth-year' />
          </label>
        </div>
      </fieldset>
      <fieldset><legend>Möchten Sie auch ab 2016 Ihre Spenden absetzen?</legend>
        <div className='form-row options-2-prominent'>
          <div className='grid-2-all'>  
            <input id='accept' type='radio' name='opt-out' value='accept' />
            <label htmlFor='accept'>
              <img
                  width='32px'
                  alt='World Vision Logo'
                  className='duck'
                  src={check} />
              <h4>Ja, Ich stimme der automatischen Spendenansetzbarkeit zu.</h4>
              <p>Somit können Sie auch ab den Spendenjahr 2016 Ihre Spende steuerlich absetzen.</p>
            </label>
          </div>
          <div className='grid-2-all'>
            <input type='radio' id='opt-out' name='opt-out' value='opt-out' />
            <label htmlFor='opt-out'>
              <h4>Nein, ich möchte meine Spenden nicht absetzen und mache von meinem Widerrufsrecht Gebrauch.</h4>
              <p>Sie haben dadurch keine Möglichkeit Ihre ab 2016 geleisteten Spenden abzusetzen.</p>
            </label>
          </div> 
        </div>
      </fieldset>
      <input type='submit' value='DATEN SPEICHERN UND ABSENDEN.' />
      <p className='error'>Damit Sie Ihre Spendenbestätigung ausdrucken können, bitten wir Sie, Ihre persönlichen Daten zu vervollständigen.</p>
      <button>Spendenbestätigung 2016 ausdrucken</button>
    </form>
  </main>
)

User.propTypes = {
  user     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default User


