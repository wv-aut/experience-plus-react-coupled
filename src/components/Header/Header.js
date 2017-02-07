import React from 'react'
// import { IndexLink, Link } from 'react-router'
import './Header.scss'
import wvLogo from './assets/logo-worldvision.svg'

export const Header = () => (
  <header className='right'>
    <img
      alt='World Vision Logo'
      src={wvLogo} />
  </header>
)

export default Header
