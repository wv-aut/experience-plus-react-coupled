import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Overlay from '../../Overlay/components/Overlay'
import '../Auth.scss'

class Auth extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    tempKeyIsExpired: PropTypes.bool,
    sendNewTempKeyRequest: PropTypes.func,
    newTempKeyBy: PropTypes.string,
    unknownTempKey: PropTypes.string
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
    } else if (this.props.auth.unknownTempKey) {
      message = <Overlay
        header='Leider ist Ihr Link nicht mehr gültig.'
        subheader='Wenn Sie Ihre persönlichen Daten aktualisieren möchten, oder Ihre Spendenbescheinigung für das Jahr 2016 benötigen, senden Sie uns bitte eine E-Mail an <a href="mailto:info@worldvision.at">info@worldvision.at</a> oder rufen Sie uns an unter 01 522 14 22'
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
      } else if (this.props.auth.isFetching) {
        message = <Overlay
          header='Einen Moment bitte...'
          subheader=''
          text=''
          icon='loading'
          mode='run' />
      } else if (this.props.auth.tempKey === null) {
        message = message = <Overlay
          header='Sie haben keinen Berechtigung für diese Seite'
          subheader='Sie können nur mit einem gültigen Zugangslink Ihre Daten abfragen. Sie haben ihn per E-Mail erhalten.'
          text='Für die Sicherheit Ihrer Daten, können Sie Zugangslinks immer nur einmal verwenden.'
          icon='lock'
       />
      } else {
        message = <Overlay
          header={`Wir haben Ihnen einen neuen Zugangslink an ${this.props.auth.tempKeySentToEmail} gesendet.`}
          subheader='Sollten Sie diese E-Mail nicht erhalten, oder wenn Sie generelle Probleme mit dieser Seite haben, kontaktieren Sie bitte unsere Spender- und Patenbetreuung.'
          text=''
          icon='email'
          mode='stop' />
      }
    }

    return (
        message
    )
  }
}

export default Auth
