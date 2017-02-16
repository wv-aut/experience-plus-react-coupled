import { connect } from 'react-redux'
import React from 'react'
import './TaxReceipt.scss'
import monikaNnamdi from '../assets/Signature_Monika_Nnamdi.jpg'
// import wvLogo from 'components/Header/assets/logo-worldvision.svg'

function renderSalutation (dataTemp, inAddress = true) {
  switch (dataTemp.salutationCode) {
    case 'COMPANY':
      return <span>Firma {inAddress && <br />}{dataTemp.companyName}</span>
    case '4':
      return <span>Familie {inAddress && <br />}{dataTemp.firstName} {dataTemp.lastName}</span>
    default:
      return <span>{dataTemp.salutationCode === '14' ? 'Frau' : inAddress ? 'Herrn' : 'Herr'}{dataTemp.titleText ? ' ' + dataTemp.titleText : '' } {inAddress && <br />}{dataTemp.firstName} {dataTemp.lastName}</span>
  }
}

function formatDonation (amount) {
  const donation = amount || '0'
  const size = donation.length
  const position = donation.indexOf(',')
  let donationFormatted = '0,00'
  if (position === -1) {
    donationFormatted = `${donation},00`
  } else if (size - position === 2) {
    donationFormatted = `${donation}0`
  } else if (donation) {
    donationFormatted = donation
  }
  return donationFormatted
}

export const TaxReceipt = (props) => {
  return (
    <main className='print'>
      <section className='paper'>
        <div className='right'><img style={{ width:'120px' }} alt='World Vision Logo' src='https://secure.worldvision.at/sites/worldvision.at/themes/worldvision_new/images/icons/svg/worldvision-logo.svg' /></div>
        <div>
          <p className='sender right'><br />1150 Wien, Graumanngasse 7/C-2<br />
                                Tel. +43 1 522 14 22-0<br />
                                Fax +43 1 522 14 22-80<br />
                                office@worldvision.at<br />
                                www.worldvision.at<br />
                                ZVR 819414678
                                <br />
          </p>
        </div>
        <div>
          <p>{renderSalutation(props.dataTemp)}</p>
          <p>{props.dataTemp.address} {props.dataTemp.houseNo}<br />{props.dataTemp.postCode} {props.dataTemp.city}</p>
        </div>
        <p className='right'>Wien, am 15. Februar 2017</p>
        <div>
          <p><br />Zur Vorlage bei Ihrem Finanzamt</p><br />
          <h3 className='center'>Ihre Spendenbestätigung für das Jahr 2016<br /><br /></h3>
        </div>
        <div>
          <p>Wir bestätigen, dass {renderSalutation(props.dataTemp, false)} im Kalenderjahr 2016 den folgenden Betrag zugunsten
          der Arbeit von World Vision Österreich (Registrierungsnummer SO-1158) gespendet hat:</p>
        </div>
        <div>
          <h1 className='center'>{formatDonation(props.dataTemp.donationSum)} EURO</h1>
        </div>
        <div>
          <p>Wir haben diesen Betrag dankend erhalten und ihn bestimmungsgemäß für unsere Projektarbeit
          eingesetzt.<br /><br />Mit herzlichen Grüßen</p>
        </div>
        <div>
          {<img src={monikaNnamdi} />}
        </div>
        <div>
          <p>Monika Nnamdi<br />World Vision Österreich</p><br /><br />
        </div>
      </section>
      <aside>
        <button onClick={window.print}>Jetzt drucken oder speichern</button>
      </aside>
    </main>
  )
}

const mapStateToProps = (state) => ({
  dataTemp: state.user.dataTemp
})


export default connect(mapStateToProps)(TaxReceipt)




