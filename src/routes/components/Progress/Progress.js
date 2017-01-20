import React from 'react'
import { IndexLink, Link } from 'react-router'
import './progress.scss'

export const Progress = (props) => (


  <div className='progress'>
    <div className='check active'>
      <div className='inside' />
    </div>
  </div>
)

Progress.PropTypes = {
  location: React.PropTypes.object.isRequired
}

export default Progress
