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
      return <span>{dataTemp.salutationCode === '13' ? 'Frau' : inAddress ? 'Herrn' : 'Herr'} {inAddress && <br />}{dataTemp.firstName} {dataTemp.lastName}</span>
  }
}

export const TaxReceipt = (props) => {
  return (
    <main className='print'>
      <section className='paper'>
        <div className='right'>
          <p className='sender right'><br />1150 Wien, Graumanngasse 7/C-2<br />
                                Tel. +43 1 522 14 22-0<br />
                                Fax +43 1 522 14 22-80<br />
                                office@worldvision.at<br />
                                www.worldvision.at<br />
                                ZVR 819414678
                                <br />
          </p>
        </div>
        <div className='left'>
          <p>{renderSalutation(props.dataTemp)}</p>
          <p>{props.dataTemp.address} {props.dataTemp.houseNo}<br />{props.dataTemp.postCode} {props.dataTemp.city}</p>
        </div>
        <p className='right'>Wien, am 15. Februar 2017</p>
        <div className='center'>
          <h3><br />Zur Vorlage bei Ihrem Finanzamt<br /><br />
          Ihre Spendenbestätigung für das Jahr 2016<br /><br /></h3>
        </div>
        <div className='center'>
          <p>Wir bestätigen, dass {renderSalutation(props.dataTemp, false)} im Kalenderjahr 2016 den folgenden Betrag zugunsten
          der Arbeit von World Vision Österreich (Registrierungsnummer SO-1158) gespendet hat:</p>
        </div>
        <div className='center'>
          <h1>144,00 Euro</h1>
        </div>
        <div className='left'>
          <p>Wir haben diesen Betrag dankend erhalten und ihn bestimmungsgemäß für unsere Projektarbeit
          eingesetzt.<br /><br />Mit herzlichen Grüßen</p>
        </div>
        <div className='left'>
          {<img src={monikaNnamdi} />}
        </div>
        <div className='left'>
          <p>Monika Nnamdi<br />World Vision Österreich</p>
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




