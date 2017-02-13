import React from 'react'
import './Overlay.scss'

const Overlay = (props) => {
  return (
    <div className='overlay'>
      <div className='container'>
        <div className='content'>
          {props.icon === 'loading' &&
            <div className='loading'>
              <div className={props.mode} />
            </div>
            }
          <div className='icon'>
            {props.icon === 'lock' &&
            <div className='icon-lock'>
              <div className='lock-top-1' />
              <div className='lock-top-2' />
              <div className='lock-body' />
              <div className='lock-hole' />
            </div>
              }
          </div>
          <div className='message'>
            <h2>{props.header}</h2>
            <h3>{props.subheader}</h3>
            {props.button &&
            <button onClick={props.button}>{props.buttonText}</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Overlay
