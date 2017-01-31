import React, { Component } from 'react'
import '../Auth.scss'


class Auth extends Component {

  static propTypes = {
    tempKeyIsExpired : React.PropTypes.bool,
    sendNewTempKeyRequest: React.PropTypes.func,
    newTempKeyBy: React.PropTypes.string
  }

  render () {
    return (
      <div>
        {this.props.auth.tempKeyIsExpired &&
        <div className='overlay'>
          {!this.props.auth.newTempKeyBy && !this.props.auth.isFetching &&
          <div className='overlay-content'>
            <h1>Ihr Zugangslink ist leider nicht mehr gültig.</h1>
            <h3>Kein Problem, Sie können hier einfach einen neuen anfordern.</h3>
            <p>Für die Sicherheit Ihrer Daten, können Sie Zugangslinks immer nur einmal verwenden.</p>
            <button onClick={this.props.sendNewTempKeyRequest}>Jetzt neuen Link per E-Mail anfordern</button>
          </div>}
          {this.props.auth.newTempKeyBy &&
          <div className='overlay-content'>
            <h1>Wir haben Ihnen einen neuen Link an Ihre E-Mailaddresse gesendet.</h1>
            <p>Sollten Sie diese E-Mail nicht erhalten, oder wenn Sie generelle Probleme mit dieser Seite haben, kontaktieren Sie bitte unsere Spender- und Patenbetreuung.</p>
          </div>}
        </div>}
     
      </div>
    )
  }
}

export default Auth
