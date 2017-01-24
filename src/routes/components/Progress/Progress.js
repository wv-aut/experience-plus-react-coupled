import React from 'react'
import { IndexLink, Link } from 'react-router'
import { PROGRESS } from '../../config/routes.config'
import arrowImage from './assets/arrow-right.png'
import './progress.scss'

const ProgressItem = (props) => {
  const addCountCss = props.index === 0 ? 'first' : props.index === 1 ? 'second' : 'third'
  const addLastCss = (props.columns === props.index + 1) && 'last' || ''
  let addPositionCss = 'coming'
  switch (true) {
    case (props.path.replace(/\//,'') === PROGRESS[props.index].route):
      addPositionCss = 'current'
      break
    default:
      addPositionCss = 'coming'
      break
  }

  let LinkOrText = null
  if (addPositionCss === 'current' || addPositionCss === 'coming') {
    LinkOrText = <span>{PROGRESS[props.index].description}</span>
  } else {
    LinkOrText = <Link to={`/${PROGRESS[props.index].route}`}>{PROGRESS[props.index].description}</Link>
  }

  return (
    <div className={`column-${props.columns} ${addLastCss}`}>
      <div className={`check-container ${addPositionCss}`}>
        <div className={`check ${addCountCss} ${addPositionCss}`}>
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
