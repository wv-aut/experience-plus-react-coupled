import React from 'react'
import './Overlay.scss'
import PropTypes from 'prop-types'

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
          {props.icon === 'lock' &&
          <div className='icon'>
            <div className='icon-lock'>
              <div className='lock-top-1' />
              <div className='lock-top-2' />
              <div className='lock-body' />
              <div className='lock-hole' />
            </div>
          </div>
          }
          {props.icon === 'email' &&
            <div className='letter' />
          }
          <div className='message'>
            <h2>{props.header}</h2>
            <p>{props.subheader}</p>
            {props.button &&
            <button onClick={props.button}>{props.buttonText}</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Overlay.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string
}

export default Overlay
