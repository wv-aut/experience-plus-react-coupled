import React from 'react'
import './Overlay.scss'

const Overlay = (props) => {
  return (
    <div className='overlay'>
      <div className='container'>
          <div className='content center'>
            {props.icon === 'loading' &&
              <div className='loading'>
                <div className={props.mode}></div>
              </div>
            }
            {props.icon === 'lock' &&
              <div className='icon-lock'>
                <div className='lock-top-1' ></div>
                <div className='lock-top-2'></div>
                <div className='lock-body'></div>
                <div className='lock-hole'></div>
              </div>
            }
              
              <div>
                <h1>{props.header}</h1>
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
