import React from 'react'
import { IndexLink, Link } from 'react-router'
import { PROGRESS } from '../../config/routes.config'
import arrow from './assets/arrow-right.png'
import './progress.scss'


const ProgressItem = (props) => {
  const count = props.index === 0 ? 'first' : props.index === 1 ? 'second' : 'third'
  let position = 'coming'
  switch (true) {
    case (props.path.replace(/\//,'') === PROGRESS[props.index].route):
      position = 'current'
      break
    default:
      position = 'coming'
      break
  }

  let LinkOrText = null
  if (position === 'current' || position === 'coming') {
    LinkOrText = <span>{PROGRESS[props.index].description}</span>
  } else {
    LinkOrText = <Link to={`/${PROGRESS[props.index].route}`}>{PROGRESS[props.index].description}</Link>
  }

  return (
    <div className={`column-${props.columns}`}>
      <div className={`check-container ${position}`}>
        <div className={`check ${count} ${position}`}>
          <div className='inside' />
        </div>
      </div>
      <div className='link'>{LinkOrText}</div>
    </div>
  )
}

export const Progress = (props) => {
  const columns = PROGRESS.length
  return (
    <nav className='progress'>
      {PROGRESS.map((value, index) => (
        <ProgressItem key={index} index={index} columns={columns} path={props.location.pathname} />
      ))}
    </nav>
  )
}

Progress.PropTypes = {
  location: React.PropTypes.object.isRequired
}

ProgressItem.PropTypes = {
  columns: React.PropTypes.number.isRequired,
  index: React.PropTypes.number.isRequired,
  path: React.PropTypes.string.isRequired
}

export default Progress
