import React from 'react'

export const TaxReceipt = (props) => {
  console.log(props.store)
  return (
    <main className='print'>
      <div className='box'>
        <div className='right-box'>
          <p className='right'>
            <a href='http://www.worldvision.at' target='_blank'>
              <img src='/sites/worldvision.at/themes/worldvision/images/logo.png' />
            </a>
          </p>
          <p className='small'><br />1150 Wien, Graumanngasse 7/C-2<br />
                              Tel. +43 1 522 14 22-0<br />
                              Fax +43 1 522 14 22-80<br />
                              office@worldvision.at<br />
                              www.worldvision.at<br />
                              ZVR 819414678
                              <br />
          </p>
        </ div>
      </div>
      <div className='left'>
        <p>Herrn  <br /> Eldin Zlatic<br /><br /> <br /> Wien<br /></p>
      </div>
        <p className='right'>Wien, am 15. Februar 2017</p>
      <div className='center'>
        <h3><br />Zur Vorlage bei Ihrem Finanzamt<br /><br />Ihre Spendenbestätigung für das Jahr 2016<br /><br /></h3>
      </div>
      <div className='center'>
        <p>Wir bestätigen, dass   im Kalenderjahr 2015 den folgenden Betrag zugunsten der Arbeit von World Vision Österreich (Registrierungsnummer SO-1158) gespendet hat:</p>
      </div>
      <div className='center'>
        <h1>144,00 Euro</h1>
      </div>
      <div className='left'>
        <p>Wir haben diesen Betrag dankend erhalten und ihn bestimmungsgemäß für unsere Projektarbeit eingesetzt.<br /><br />Mit herzlichen Grüßen</p>
      </div>
      <div className='left'>
        <p><img src='/sites/default/files/Signature_Monika_Nnamdi.jpg' /></p>
      </div>
      <div className='left'>
        <p>Monika Nnamdi<br />World Vision Österreich</p>
      </div>
    </main>
  )
}

export default TaxReceipt
