import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { PROGRESS } from '../../config/routes.config'
import './progress.scss'

const ProgressItems = (props) => {
  let currentIndex = 0
  for (let i = 0; i < PROGRESS.length; i++) {
    if (props.path.replace(/\//, '') === PROGRESS[i].route) {
      currentIndex = i
    }
  }

  let items = PROGRESS.map((value, index) => {
    if (PROGRESS[index].route === null) {
      return <li key={index} className='active completed no-link'><span>{PROGRESS[index].description}</span></li>
    } else if (index < currentIndex) {
      return <li key={index} className='active completed link'><span>{PROGRESS[index].description}</span></li>
    } else if (index === currentIndex) {
      return <li key={index} className='active no-link'><span>{PROGRESS[index].description}</span></li>
    } else {
      return <li key={index}><span>{PROGRESS[index].description}</span></li>
    }
  })

  return <ul className='progressbar'>{items}</ul>
}

ProgressItems.propTypes = {
  path: PropTypes.string.isRequired
}

export const Progress = (props) => {
  const columns = PROGRESS.length
  return (
    <div className='container bg-primary-grey no-print'>
      <nav className='progress'>
        <ProgressItems path={props.location.pathname} />
      </nav>
    </div>
  )
}

Progress.propTypes = {
  location: PropTypes.object.isRequired
}

export default Progress
