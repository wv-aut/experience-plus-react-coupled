import React, { Component } from 'react'
import Overlay from '../../Overlay/components/Overlay'
import '../Auth.scss'

class Auth extends Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    tempKeyIsExpired: React.PropTypes.bool,
    sendNewTempKeyRequest: React.PropTypes.func,
    newTempKeyBy: React.PropTypes.string
  }

  render () {
    var message = null
    if (this.props.auth.networkError) {
      message = <Overlay
        header='Leider konnten wir Ihre Daten nicht aufrufen.'
        subheader='Es besteht derzeit ein Netzwerkproblem. Bitte versuchen Sie es später noch einmal.'
        text='Sollte dieses Problem länger bestehen, bitten wir Sie, mit uns in Verbindung zu treten.'
        icon='loading'
        mode='stop' />
    } else if (this.props.auth.tempKeyIsExpired) {
      if (!this.props.auth.newTempKeyBy && !this.props.auth.isFetching && this.props.auth.tempKey !== null) {
        message = <Overlay
          header='Ihr Zugangslink ist nicht mehr gültig.'
          subheader='Kein Problem, Sie können hier einfach einen neuen anfordern.'
          text='Für die Sicherheit Ihrer Daten, können Sie Zugangslinks immer nur einmal verwenden.' 
          button={() => this.props.sendNewTempKeyRequest(this.props.auth.tempKey)}
          buttonText='Zugangslink per E-Mail anfordern'
          icon='lock'
       />
      } else if (this.props.auth.tempKey === null) {
        message = message = <Overlay
          header='Sie haben keinen Berechtigung für diese Seite'
          subheader='Sie können nur mit einem gültigen Zugangslink Ihre Daten abfragen.'
          text='Für die Sicherheit Ihrer Daten, können Sie Zugangslinks immer nur einmal verwenden.'
          icon='lock'
       />
      } else {
        message = <Overlay
        header={`Wir haben Ihnen einen neuen Link an ${this.props.auth.tempKeySentToEmail} gesendet.`}
        subheader='Sollten Sie diese E-Mail nicht erhalten, oder wenn Sie generelle Probleme mit dieser Seite haben, kontaktieren Sie bitte unsere Spender- und Patenbetreuung.'
        text=''
        icon='loading'
        mode='stop' />
      }
    }

    return (
        message
    )
  }
}

export default Auth
